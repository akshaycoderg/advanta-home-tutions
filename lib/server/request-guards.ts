import type { NextRequest } from "next/server";
import { siteConfig } from "@/lib/config";

type Entry = { count: number; resetAt: number };

const globalStore = globalThis as unknown as {
  __ahtRateLimit?: Map<string, Entry>;
};

const store: Map<string, Entry> = globalStore.__ahtRateLimit ?? new Map();
globalStore.__ahtRateLimit = store;

/**
 * Basic in-process rate limiting. This is a first line of defence and is not
 * shared across serverless instances. Add a durable limiter (for example
 * Upstash) if the site receives sustained abusive traffic.
 */
export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (entry.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }

  entry.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // Non-browser clients (e.g. server-to-server, curl).
  try {
    const originHost = new URL(origin).host;
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    if (host && originHost === host) return true;
    return originHost === new URL(siteConfig.url).host;
  } catch {
    return false;
  }
}
