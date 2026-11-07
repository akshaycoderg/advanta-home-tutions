import { appendFile, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { StoredDocument } from "@/types";

const dataDir = process.env.LOCAL_DATA_DIR
  ? path.resolve(process.env.LOCAL_DATA_DIR)
  : path.join(process.cwd(), ".data");

/**
 * Development-only fallback so the forms can be tested without credentials.
 * Production never stores leads on the local filesystem (serverless filesystems
 * are ephemeral); configure Google Sheets or Supabase instead.
 */
export const isLocalStoreEnabled =
  process.env.NODE_ENV !== "production" || process.env.LOCAL_LEAD_STORE === "true";

export type LocalUpload = {
  buffer: Buffer;
  mimeType: string;
  originalName: string;
  size: number;
};

async function ensurePrivateDir(directory: string) {
  await mkdir(directory, { recursive: true, mode: 0o700 });
}

export async function saveLocalEnquiry(record: Record<string, unknown>): Promise<void> {
  await ensurePrivateDir(dataDir);
  await appendFile(
    path.join(dataDir, "enquiries.jsonl"),
    `${JSON.stringify(record)}\n`,
    { encoding: "utf8", mode: 0o600 },
  );
}

export async function saveLocalTutorApplication(
  record: Record<string, unknown>,
  uploads: LocalUpload[],
): Promise<StoredDocument[]> {
  await ensurePrivateDir(dataDir);
  const reference = String(record.reference);
  const applicationDir = path.join(dataDir, "uploads", reference);
  const metadata: StoredDocument[] = [];

  try {
    if (uploads.length > 0) {
      await ensurePrivateDir(applicationDir);
    }

    for (const upload of uploads) {
      const extension = path.extname(upload.originalName).toLowerCase();
      const storedName = `${randomUUID()}${extension}`;
      const absolutePath = path.join(applicationDir, storedName);
      await writeFile(absolutePath, upload.buffer, { mode: 0o600 });
      metadata.push({
        field: "documents",
        originalName: upload.originalName,
        path: path.relative(process.cwd(), absolutePath),
        mimeType: upload.mimeType,
        size: upload.size,
        uploadedAt: new Date().toISOString(),
      });
    }

    await appendFile(
      path.join(dataDir, "tutor-applications.jsonl"),
      `${JSON.stringify({ ...record, documents: metadata })}\n`,
      { encoding: "utf8", mode: 0o600 },
    );

    return metadata;
  } catch (error) {
    // Remove any partially written private files before re-throwing.
    await rm(applicationDir, { recursive: true, force: true }).catch(() => undefined);
    throw error;
  }
}
