import { randomUUID } from "node:crypto";

export function createReference(prefix: "P" | "T"): string {
  const now = new Date();
  const date = [
    String(now.getUTCFullYear()).slice(-2),
    String(now.getUTCMonth() + 1).padStart(2, "0"),
    String(now.getUTCDate()).padStart(2, "0"),
  ].join("");
  const random = randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase();
  return `AHT-${prefix}-${date}-${random}`;
}
