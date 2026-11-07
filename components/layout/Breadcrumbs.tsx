import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({
  items,
  tone = "light",
  className,
}: {
  items: Crumb[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-xs">
        <li>
          <Link
            href="/"
            className={cn(
              "inline-flex items-center gap-1.5 rounded transition-colors",
              tone === "dark"
                ? "text-navy-200 hover:text-white"
                : "text-muted hover:text-navy-800",
            )}
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              <ChevronRight
                className={cn("h-3.5 w-3.5", tone === "dark" ? "text-navy-400" : "text-navy-300")}
                aria-hidden="true"
              />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "rounded transition-colors",
                    tone === "dark"
                      ? "text-navy-200 hover:text-white"
                      : "text-muted hover:text-navy-800",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    "font-medium",
                    tone === "dark" ? "text-white" : "text-navy-800",
                  )}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
