/**
 * Optional private webhook for notifying the operator of a new lead
 * (for example a Google Apps Script, Make, Zapier or n8n workflow).
 * Never log the payload or the webhook URL.
 */
export async function notifyOperator(payload: {
  type: "parent_enquiry" | "tutor_application";
  reference: string;
  storage: "google_sheets" | "supabase" | "local";
  summary: Record<string, unknown>;
}): Promise<void> {
  const url = (process.env.LEAD_NOTIFICATION_WEBHOOK_URL ?? "").trim();
  if (!url) return;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_SECRET
          ? { "X-Webhook-Secret": process.env.LEAD_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: "no-store",
    });
  } catch {
    // Notification failure must never turn a successfully stored lead into an error.
  } finally {
    clearTimeout(timeout);
  }
}
