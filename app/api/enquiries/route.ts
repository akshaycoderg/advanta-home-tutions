import { NextResponse, type NextRequest } from "next/server";
import { parentEnquirySchema, zodToFieldErrors } from "@/lib/validation";
import { createReference } from "@/lib/server/reference";
import {
  getClientIp,
  isSameOrigin,
  rateLimit,
} from "@/lib/server/request-guards";
import { contactHelp } from "@/lib/config";
import { isGoogleSheetsConfigured, sendToGoogleSheet } from "@/lib/server/google-sheets";
import { isLocalStoreEnabled, saveLocalEnquiry } from "@/lib/server/local-store";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/server/supabase";
import { notifyOperator } from "@/lib/server/notify";
import type { ApiFailure, ApiSuccess } from "@/types";

export const runtime = "nodejs";

const MAX_JSON_BYTES = 24 * 1024;

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

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return failure("forbidden", "This request could not be verified.", 403);
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(length) && length > MAX_JSON_BYTES) {
    return failure("payload_too_large", "The submitted form is too large.", 413);
  }

  const limit = rateLimit(`enquiry:${getClientIp(request)}`, 5, 10 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        code: "rate_limited",
        message:
          `Too many attempts were made from this connection. Please wait a little while. ${contactHelp}`,
      } satisfies ApiFailure,
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return failure("validation_error", "The form data could not be read. Please try again.", 400);
  }

  const parsed = parentEnquirySchema.safeParse(body);
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

  const reference = createReference("P");
  const record = {
    reference,
    parent_name: parsed.data.parentName,
    parent_phone: parsed.data.parentPhone,
    parent_email: parsed.data.parentEmail || null,
    student_name: parsed.data.studentName,
    student_class: parsed.data.studentClass,
    board: parsed.data.board,
    subjects: parsed.data.subjects,
    locality: parsed.data.locality,
    address: parsed.data.address,
    preferred_timing: parsed.data.preferredTiming,
    tutor_gender: parsed.data.tutorGender,
    academic_challenges: parsed.data.challenges || null,
    additional_requirements: parsed.data.additionalRequirements || null,
    consent: true,
    consent_at: new Date().toISOString(),
    status: "new",
    source: "website",
  };

  try {
    let storage: ApiSuccess["storage"] | null = null;
    const sheetsConfigured = isGoogleSheetsConfigured("parent");

    if (sheetsConfigured) {
      const savedToSheet = await sendToGoogleSheet("parent", {
        type: "parent_enquiry",
        submittedAt: new Date().toISOString(),
        reference,
        parentName: parsed.data.parentName,
        parentPhone: parsed.data.parentPhone,
        parentEmail: parsed.data.parentEmail,
        studentName: parsed.data.studentName,
        studentClass: parsed.data.studentClass,
        board: parsed.data.board,
        subjects: parsed.data.subjects.join(", "),
        locality: parsed.data.locality,
        address: parsed.data.address,
        preferredTiming: parsed.data.preferredTiming,
        tutorGender: parsed.data.tutorGender,
        challenges: parsed.data.challenges,
        additionalRequirements: parsed.data.additionalRequirements,
        consent: "Yes",
        source: "website",
      });

      if (savedToSheet) {
        storage = "google_sheets";
      } else {
        console.error("[enquiries] Google Sheets write failed; trying fallback storage.");
      }
    }

    if (!storage && isSupabaseConfigured) {
      const supabase = getSupabaseAdmin();
      const { error } = await supabase.from("enquiries").insert(record);
      if (error) {
        console.error("[enquiries] Database insert failed.");
        return failure(
          "server_error",
          `We could not save the enquiry. Please try again. ${contactHelp}`,
          500,
        );
      }
      storage = "supabase";
    }

    if (!storage && isLocalStoreEnabled) {
      await saveLocalEnquiry(record);
      storage = "local";
    }

    if (!storage) {
      return failure(
        sheetsConfigured ? "server_error" : "not_configured",
        sheetsConfigured
          ? `We could not save the enquiry just now. Please try again. ${contactHelp}`
          : `Online submissions are not connected yet, so your enquiry was not saved. ${contactHelp}`,
        sheetsConfigured ? 500 : 503,
      );
    }

    await notifyOperator({
      type: "parent_enquiry",
      reference,
      storage,
      summary: {
        parentName: parsed.data.parentName,
        parentPhone: parsed.data.parentPhone,
        studentName: parsed.data.studentName,
        studentClass: parsed.data.studentClass,
        board: parsed.data.board,
        subjects: parsed.data.subjects,
        locality: parsed.data.locality,
        preferredTiming: parsed.data.preferredTiming,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        reference,
        storage,
        message: "Enquiry received.",
      } satisfies ApiSuccess,
      { status: 200 },
    );
  } catch {
    console.error("[enquiries] Storage failure.");
    return failure(
      "server_error",
      `We could not save the enquiry. Please try again. ${contactHelp}`,
      500,
    );
  }
}
