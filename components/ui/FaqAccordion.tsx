import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/faqs";
import { cn } from "@/lib/utils";

export function FaqAccordion({
  items,
  idPrefix,
  className,
}: {
  items: FaqItem[];
  idPrefix: string;
  className?: string;
}) {
  return (
    <div className={cn("divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white shadow-card", className)}>
      {items.map((item) => (
        <details key={item.id} id={`${idPrefix}-${item.id}`} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left text-[0.975rem] font-semibold text-navy-900 transition-colors hover:bg-navy-50/60 sm:px-6 [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-navy-600 transition-transform duration-200 group-open:rotate-180 group-open:border-navy-200 group-open:bg-navy-50">
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </span>
          </summary>
          <div className="px-5 pb-6 text-[0.94rem] leading-relaxed text-muted sm:px-6 sm:pr-16">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
