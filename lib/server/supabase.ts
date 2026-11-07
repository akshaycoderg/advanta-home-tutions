import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = (process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim();
const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();

export const supabaseBucket =
  (process.env.SUPABASE_STORAGE_BUCKET ?? "tutor-documents").trim() || "tutor-documents";

/**
 * The service-role key must only ever be used on the server. It is never
 * exposed to the browser and no public Supabase client is created here.
 */
export const isSupabaseConfigured = Boolean(
  supabaseUrl && serviceRoleKey && /^https:\/\/.+\.supabase\.co\/?$/.test(supabaseUrl),
);

let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured.");
  }
  if (!client) {
    client = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
      global: {
        headers: { "X-Client-Info": "advanta-home-tutions-server" },
      },
    });
  }
  return client;
}
