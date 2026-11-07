import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "sky",
  className,
}: {
  children: ReactNode;
  tone?: "sky" | "orange" | "navy" | "white" | "green";
  className?: string;
}) {
  const tones = {
    sky: "border-navy-100 bg-navy-50 text-navy-700",
    orange: "border-orange-200 bg-orange-50 text-orange-700",
    navy: "border-navy-700 bg-navy-700 text-white",
    white: "border-white/20 bg-white/10 text-white",
    green: "border-emerald-200 bg-emerald-50 text-emerald-800",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
