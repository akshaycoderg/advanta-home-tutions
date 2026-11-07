import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Logo({
  tone = "light",
  className,
  showTagline = false,
}: {
  tone?: "light" | "dark";
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-white shadow-sm transition-transform duration-200 group-hover:scale-[1.03] sm:h-[3.25rem] sm:w-[3.25rem]">
        {/* The supplied brand mark is used as-is; white logo backgrounds are intentional. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={siteConfig.logo.mark}
          alt=""
          width={52}
          height={52}
          className="h-full w-full object-contain p-1"
        />
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            "block font-display text-[1.28rem] leading-none font-extrabold tracking-tight sm:text-[1.4rem]",
            tone === "dark" ? "text-white" : "text-navy-800",
          )}
        >
          Advanta
        </span>
        <span
          className={cn(
            "mt-1 block text-[0.56rem] leading-none font-bold tracking-[0.2em] uppercase sm:text-[0.6rem]",
            tone === "dark" ? "text-navy-100/90" : "text-royal-700",
          )}
        >
          Home Tutions
        </span>
        {showTagline ? (
          <span
            className={cn(
              "mt-1.5 block text-[0.68rem] leading-tight",
              tone === "dark" ? "text-navy-200" : "text-muted",
            )}
          >
            {siteConfig.tagline}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
