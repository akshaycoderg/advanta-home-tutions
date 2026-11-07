import { NextResponse, type NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { tutorApplicationSchema, zodToFieldErrors } from "@/lib/validation";
import {
  MAX_DOCUMENTS,
  MAX_DOCUMENT_BYTES,
  matchesSignature,
  validateDocumentMeta,
} from "@/lib/documents";
import { contactHelp } from "@/lib/config";
import { isGoogleSheetsConfigured, sendToGoogleSheet } from "@/lib/server/google-sheets";
import { createReference } from "@/lib/server/reference";
import { getClientIp, isSameOrigin, rateLimit } from "@/lib/server/request-guards";
import {
  isLocalStoreEnabled,
  saveLocalTutorApplication,
  type LocalUpload,
} from "@/lib/server/local-store";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  supabaseBucket,
} from "@/lib/server/supabase";
import { notifyOperator } from "@/lib/server/notify";
import type { ApiFailure, ApiSuccess, StoredDocument } from "@/types";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 20 * 1024 * 1024;
const MAX_PAYLOAD_CHARS = 60_000;

const extensionByMime: Record<string, string> = {
  "application/pdf": ".pdf",
  "image/jpeg": ".jpg",
  "image/png": ".png",
};

function failure(
  code: ApiFailure["code"],
  message: string,
  status: number,
  errors?: Record<string, string[]>,
) {
  return NextResponse.json(
    { ok: false, code, message, ...(errors ? { errors } : {}) } satisfies ApiFailure,
    { status },
  );
}

function cleanOriginalName(name: string): string {
  return path.basename(name).replace(/[\u0000-\u001f]/g, "").slice(0, 180) || "document";
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return failure("forbidden", "This request could not be verified.", 403);
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(length) && length > MAX_REQUEST_BYTES) {
    return failure("payload_too_large", "The uploaded files are too large.", 413);
  }

  const limit = rateLimit(`tutor:${getClientIp(request)}`, 3, 15 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        code: "rate_limited",
        message:
          "Too many application attempts were made from this connection. Please wait a little while before trying again.",
      } satisfies ApiFailure,
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return failure("validation_error", "The application could not be read. Please try again.", 400);
  }

  const rawPayload = formData.get("payload");
  if (typeof rawPayload !== "string" || rawPayload.length === 0) {
    return failure("validation_error", "The application details are missing.", 400);
  }
  if (rawPayload.length > MAX_PAYLOAD_CHARS) {
    return failure("validation_error", "The application details are too long.", 400);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawPayload);
  } catch {
    return failure("validation_error", "The application details could not be read.", 400);
  }

  const parsed = tutorApplicationSchema.safeParse(payload);
  if (!parsed.success) {
    return failure(
      "validation_error",
      "Please check the highlighted fields and try again.",
      400,
      zodToFieldErrors(parsed.error),
    );
  }

  if (parsed.data.companyWebsite) {
    return failure("validation_error", "This submission could not be accepted.", 400);
  }

  const fileEntries = formData
    .getAll("documents")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (fileEntries.length > MAX_DOCUMENTS) {
    return failure("upload_rejected", `Please upload no more than ${MAX_DOCUMENTS} documents.`, 400);
  }

  const uploads: LocalUpload[] = [];
  for (const file of fileEntries) {
    const metaError = validateDocumentMeta({ name: file.name, size: file.size, type: file.type });
    if (metaError) {
      return failure("upload_rejected", metaError, 400);
    }
    if (file.size > MAX_DOCUMENT_BYTES) {
      return failure("upload_rejected", `${file.name}: files must be 5 MB or smaller.`, 400);
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    if (!matchesSignature(buffer, file.type)) {
      return failure(
        "upload_rejected",
        `${file.name}: the file content does not match an accepted PDF, JPG or PNG document.`,
        400,
      );
    }

    uploads.push({
      buffer,
      mimeType: file.type,
      originalName: cleanOriginalName(file.name),
      size: file.size,
    });
  }

  const reference = createReference("T");
  const record = {
    reference,
    full_name: parsed.data.fullName,
    mobile: parsed.data.mobile,
    whatsapp: parsed.data.whatsapp,
    email: parsed.data.email,
    gender: parsed.data.gender,
    qualification: parsed.data.qualification,
    college: parsed.data.college,
    experience_level: parsed.data.experienceLevel,
    experience_details: parsed.data.experienceDetails || null,
    subjects: parsed.data.subjects,
    classes: parsed.data.classes,
    boards: parsed.data.boards,
    areas: parsed.data.areas,
    available_days: parsed.data.availableDays,
    preferred_timings: parsed.data.preferredTimings,
    expected_monthly_fee: parsed.data.expectedMonthlyFee
      ? Number(parsed.data.expectedMonthlyFee)
      : null,
    consent: true,
    declaration: true,
    consent_at: new Date().toISOString(),
    status: "new",
    source: "website",
  };

  try {
    let storage: ApiSuccess["storage"] | null = null;
    let documents: StoredDocument[] = [];
    let sheetAttempted = false;
    const sheetsConfigured = isGoogleSheetsConfigured("tutor");
    const sheetPayload = {
      type: "tutor_application",
      submittedAt: new Date().toISOString(),
      reference,
      fullName: parsed.data.fullName,
      mobile: parsed.data.mobile,
      whatsapp: parsed.data.whatsapp,
      email: parsed.data.email,
      gender: parsed.data.gender,
      qualification: parsed.data.qualification,
      college: parsed.data.college,
      experienceLevel: parsed.data.experienceLevel,
      experienceDetails: parsed.data.experienceDetails,
      subjects: parsed.data.subjects.join(", "),
      classes: parsed.data.classes.join(", "),
      boards: parsed.data.boards.join(", "),
      areas: parsed.data.areas,
      availableDays: parsed.data.availableDays.join(", "),
      preferredTimings: parsed.data.preferredTimings,
      expectedMonthlyFee: parsed.data.expectedMonthlyFee,
      documentsStored: uploads.length,
      source: "website",
    };

    if (uploads.length > 0 && !isSupabaseConfigured && !isLocalStoreEnabled) {
      return failure(
        "not_configured",
        `Uploaded documents need private storage, which is not connected yet. Remove the documents and submit again, or send the application without them. ${contactHelp}`,
        503,
      );
    }

    if (uploads.length > 0) {
      if (isSupabaseConfigured) {
        const supabase = getSupabaseAdmin();
        const uploadedPaths: string[] = [];

        for (const upload of uploads) {
          const extension = extensionByMime[upload.mimeType] ?? "";
          const objectPath = `applications/${reference}/${randomUUID()}${extension}`;
          const { error } = await supabase.storage
            .from(supabaseBucket)
            .upload(objectPath, upload.buffer, {
              contentType: upload.mimeType,
              upsert: false,
            });

          if (error) {
            if (uploadedPaths.length > 0) {
              await supabase.storage.from(supabaseBucket).remove(uploadedPaths).catch(() => undefined);
            }
            console.error("[tutor-applications] Private document upload failed.");
            return failure(
              "server_error",
              `We could not store your documents securely. Please try again. ${contactHelp}`,
              500,
            );
          }

          uploadedPaths.push(objectPath);
          documents.push({
            field: "documents",
            originalName: upload.originalName,
            path: objectPath,
            mimeType: upload.mimeType,
            size: upload.size,
            uploadedAt: new Date().toISOString(),
          });
        }

        const { error } = await supabase
          .from("tutor_applications")
          .insert({ ...record, documents });

        if (error) {
          if (uploadedPaths.length > 0) {
            await supabase.storage.from(supabaseBucket).remove(uploadedPaths).catch(() => undefined);
          }
          console.error("[tutor-applications] Database insert failed.");
          return failure(
            "server_error",
            `We could not save the application. Please try again. ${contactHelp}`,
            500,
          );
        }

        storage = "supabase";
      } else {
        documents = await saveLocalTutorApplication(record, uploads);
        storage = "local";
      }
    } else {
      if (sheetsConfigured) {
        sheetAttempted = true;
        const savedToSheet = await sendToGoogleSheet("tutor", sheetPayload);
        if (savedToSheet) {
          storage = "google_sheets";
        } else {
          console.error("[tutor-applications] Google Sheets write failed; trying fallback storage.");
        }
      }

      if (!storage && isSupabaseConfigured) {
        const supabase = getSupabaseAdmin();
        const { error } = await supabase
          .from("tutor_applications")
          .insert({ ...record, documents: [] });

        if (error) {
          console.error("[tutor-applications] Database insert failed.");
          return failure(
            "server_error",
            `We could not save the application. Please try again. ${contactHelp}`,
            500,
          );
        }

        storage = "supabase";
      }

      if (!storage && isLocalStoreEnabled) {
        documents = await saveLocalTutorApplication(record, []);
        storage = "local";
      }
    }

    if (!storage) {
      return failure(
        sheetsConfigured ? "server_error" : "not_configured",
        sheetsConfigured
          ? `We could not save the application just now. Please try again. ${contactHelp}`
          : `Online tutor applications are not connected yet, so your application was not saved. ${contactHelp}`,
        sheetsConfigured ? 500 : 503,
      );
    }

    if (sheetsConfigured && !sheetAttempted) {
      const mirroredToSheet = await sendToGoogleSheet("tutor", sheetPayload);
      if (!mirroredToSheet) {
        console.error(
          "[tutor-applications] Google Sheets mirror failed; the application remains in primary storage.",
        );
      }
    }

    await notifyOperator({
      type: "tutor_application",
      reference,
      storage,
      summary: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        mobile: parsed.data.mobile,
        qualification: parsed.data.qualification,
        subjects: parsed.data.subjects,
        classes: parsed.data.classes,
        areas: parsed.data.areas,
        documentsStored: documents.length,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        reference,
        storage,
        documentsStored: documents.length,
        message: "Application received.",
      } satisfies ApiSuccess,
      { status: 200 },
    );
  } catch {
    console.error("[tutor-applications] Storage failure.");
    return failure(
      "server_error",
      `We could not save the application. Please try again. ${contactHelp}`,
      500,
    );
  }
}
