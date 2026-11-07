export type ApiSuccess = {
  ok: true;
  reference: string;
  storage: "google_sheets" | "supabase" | "local";
  documentsStored?: number;
  message: string;
};

export type ApiFailure = {
  ok: false;
  code:
    | "validation_error"
    | "not_configured"
    | "rate_limited"
    | "server_error"
    | "upload_rejected"
    | "forbidden"
    | "payload_too_large";
  message: string;
  errors?: Record<string, string[]>;
};

export type EnquiryStatus = "new" | "contacted" | "matched" | "demo_scheduled" | "placed" | "closed";

export type TutorApplicationStatus =
  | "new"
  | "reviewing"
  | "interview"
  | "verified"
  | "rejected"
  | "placed";

export type StoredDocument = {
  field: string;
  originalName: string;
  path: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
};
