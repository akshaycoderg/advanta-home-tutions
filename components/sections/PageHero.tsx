import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  actions,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  crumbs: Crumb[];
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            "radial-gradient(55% 70% at 8% 10%, rgba(21,89,183,0.55) 0%, transparent 60%), radial-gradient(40% 50% at 95% 15%, rgba(254,111,9,0.16) 0%, transparent 60%), radial-gradient(50% 60% at 70% 110%, rgba(29,99,216,0.28) 0%, transparent 60%)",
        }}
      />
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-full border border-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -bottom-28 h-56 w-56 rounded-full border border-white/10"
      />

      <div className="container-page relative py-10 sm:py-14 lg:py-18">
        <Breadcrumbs items={crumbs} tone="dark" />
        <div
          className={
            aside
              ? "mt-7 grid items-center gap-10 lg:grid-cols-[1.45fr_0.85fr] lg:gap-14"
              : "mt-7 max-w-3xl"
          }
        >
          <div>
            <p className="eyebrow text-orange-300">{eyebrow}</p>
            <h1 className="mt-4 text-[2.15rem] leading-[1.08] font-bold text-white sm:text-5xl lg:text-[3.35rem]">
              {title}
            </h1>
            <div className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-navy-100 sm:text-lg">
              {description}
            </div>
            {actions ? <div className="mt-7 flex flex-wrap items-center gap-3">{actions}</div> : null}
          </div>
          {aside ? <div className="lg:justify-self-end">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
