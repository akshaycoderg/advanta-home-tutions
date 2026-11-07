/**
 * Google Sheets lead storage.
 *
 * The website posts a small JSON record to a Google Apps Script web app, which
 * appends it to a private spreadsheet. Each form has its own webhook URL so the
 * parent and tutor data stay in two separate Google Sheets.
 *
 * Required server-side variables:
 *   GOOGLE_SHEETS_PARENT_WEBHOOK_URL
 *   GOOGLE_SHEETS_TUTOR_WEBHOOK_URL
 *   GOOGLE_SHEETS_WEBHOOK_SECRET
 *
 * These values are never exposed to the browser. The secret is sent in the JSON
 * body because Apps Script does not expose custom request headers to `doPost`.
 */

export type GoogleSheetKind = "parent" | "tutor";

const webhookEnvKey: Record<GoogleSheetKind, string> = {
  parent: "GOOGLE_SHEETS_PARENT_WEBHOOK_URL",
  tutor: "GOOGLE_SHEETS_TUTOR_WEBHOOK_URL",
};

function getWebhookUrl(kind: GoogleSheetKind): string {
  const raw = (process.env[webhookEnvKey[kind]] ?? "").trim();
  if (!raw) return "";

  // Production only accepts HTTPS. Development may call a local mock server.
  if (/^https:\/\/[^\s]+$/i.test(raw)) return raw;
  if (
    process.env.NODE_ENV !== "production" &&
    /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//i.test(raw)
  ) {
    return raw;
  }
  return "";
}

function getSecret(): string {
  return (process.env.GOOGLE_SHEETS_WEBHOOK_SECRET ?? "").trim();
}

export function isGoogleSheetsConfigured(kind: GoogleSheetKind): boolean {
  return Boolean(getWebhookUrl(kind) && getSecret());
}

/**
 * Returns true only when the Apps Script webhook explicitly confirms the row was
 * appended. A network error, an HTML response or an unconfirmed 200 must never
 * be reported to the visitor as a successful save.
 */
export async function sendToGoogleSheet(
  kind: GoogleSheetKind,
  payload: Record<string, unknown>,
): Promise<boolean> {
  const url = getWebhookUrl(kind);
  const secret = getSecret();
  if (!url || !secret) return false;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, secret }),
      signal: controller.signal,
      cache: "no-store",
      redirect: "follow",
    });

    if (!response.ok) return false;

    const text = await response.text();
    if (!text) return false;

    try {
      const result = JSON.parse(text) as { ok?: unknown };
      return result.ok === true;
    } catch {
      return false;
    }
  } catch {
    // Never log the URL, secret or submitted personal data.
    return false;
  } finally {
    clearTimeout(timeout);
  }
}
