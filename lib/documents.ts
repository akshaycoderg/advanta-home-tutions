import { z } from "zod";

export const ACCEPTED_DOCUMENT_TYPES = ["application/pdf", "image/jpeg", "image/png"] as const;
export const ACCEPTED_DOCUMENT_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png"] as const;
export const MAX_DOCUMENT_BYTES = 5 * 1024 * 1024;
export const MAX_DOCUMENTS = 3;

export const documentMetaSchema = z.object({
  name: z.string().min(1).max(200),
  size: z.number().int().positive().max(MAX_DOCUMENT_BYTES),
  type: z.string().refine((value) => (ACCEPTED_DOCUMENT_TYPES as readonly string[]).includes(value), {
    message: "Unsupported file type.",
  }),
});

export function validateDocumentMeta(file: { name: string; size: number; type: string }): string | null {
  const ext = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
  if (!(ACCEPTED_DOCUMENT_EXTENSIONS as readonly string[]).includes(ext)) {
    return `${file.name}: only PDF, JPG or PNG files are accepted.`;
  }
  if (!(ACCEPTED_DOCUMENT_TYPES as readonly string[]).includes(file.type)) {
    return `${file.name}: the file type could not be verified.`;
  }
  if (file.size <= 0) {
    return `${file.name}: the file appears to be empty.`;
  }
  if (file.size > MAX_DOCUMENT_BYTES) {
    return `${file.name}: files must be 5 MB or smaller.`;
  }
  return null;
}

export function validateDocumentList(files: { name: string; size: number; type: string }[]): string | null {
  if (files.length > MAX_DOCUMENTS) {
    return `Please upload no more than ${MAX_DOCUMENTS} documents.`;
  }
  for (const file of files) {
    const error = validateDocumentMeta(file);
    if (error) return error;
  }
  return null;
}

/** Magic-byte signature checks so a renamed executable cannot pass as an image/PDF. */
export function matchesSignature(buffer: Uint8Array, mimeType: string): boolean {
  const startsWith = (bytes: number[]) => bytes.every((byte, index) => buffer[index] === byte);

  if (mimeType === "application/pdf") {
    return startsWith([0x25, 0x50, 0x44, 0x46]); // %PDF
  }
  if (mimeType === "image/jpeg") {
    return startsWith([0xff, 0xd8, 0xff]);
  }
  if (mimeType === "image/png") {
    return startsWith([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  }
  return false;
}
