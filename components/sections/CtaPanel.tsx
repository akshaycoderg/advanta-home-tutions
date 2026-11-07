import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";

export function CtaPanel({
  eyebrow,
  title,
  description,
  actions,
  points,
}: {
  eyebrow?: string;
  title: ReactNode;
  description: ReactNode;
  actions: ReactNode;
  points?: string[];
}) {
  return (
    <section className="section-pad">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy-900 px-6 py-10 text-white shadow-lift sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(50% 80% at 95% 0%, rgba(254,111,9,0.22) 0%, transparent 55%), radial-gradient(55% 70% at 0% 100%, rgba(21,89,183,0.5) 0%, transparent 60%)",
            }}
          />
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-10" aria-hidden="true" />
          <div className="relative grid gap-8 lg:grid-cols-[1.5fr_0.8fr] lg:items-center lg:gap-12">
            <div>
              {eyebrow ? <p className="eyebrow text-orange-300">{eyebrow}</p> : null}
              <h2 className="mt-3 text-3xl leading-[1.12] font-bold sm:text-4xl lg:text-[2.55rem]">
                {title}
              </h2>
              <div className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-navy-100">
                {description}
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-3">{actions}</div>
            </div>
            {points && points.length > 0 ? (
              <ul className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-sm">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-navy-50">
                    <CheckCircle2
                      className="mt-0.5 h-4.5 w-4.5 shrink-0 text-orange-300"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
