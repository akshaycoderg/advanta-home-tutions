import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  IndianRupee,
  Info,
  MessageCircle,
  RefreshCcw,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/config";
import { COMMISSION_TERMS, HOW_IT_WORKS_DETAILED, PARENT_COMMITMENTS } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How Home Tutor Matching Works",
  description:
    "See the step-by-step process for finding a home tutor in Varanasi, plus clear information on indicative fees, the one-time placement commission, demos and replacements.",
  path: "/how-it-works",
  keywords: [
    "how home tuition works Varanasi",
    "home tutor process",
    "home tuition fees Varanasi",
    "placement commission home tutor",
  ],
});

const timelineIcons = [
  MessageCircle,
  ClipboardList,
  Users,
  BadgeCheck,
  CalendarCheck,
  ShieldCheck,
  Users,
  IndianRupee,
];

export default function HowItWorksPage() {
  const crumbs = [{ label: "How It Works" }];

  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={
          <>
            A clear path from enquiry to <span className="text-orange-300">the right demo</span>
          </>
        }
        description={
          <p>
            No automated matching and no obligation to confirm. Here is exactly what happens, what
            it costs and what we need from you at each stage.
          </p>
        }
        crumbs={crumbs}
        actions={
          <>
            <Button href="/find-a-home-tutor" size="lg">
              Start an enquiry
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="#fees" variant="white" size="lg">
              Fees &amp; commission
            </Button>
          </>
        }
        aside={
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur">
            <p className="eyebrow text-orange-300">The short version</p>
            <ol className="mt-4 space-y-3 text-sm text-navy-100">
              {[
                "Share the class, subjects, board and locality.",
                "We discuss the academic need with you.",
                "We check suitable available tutors.",
                "You review profiles and attend a demo where available.",
                "You decide before any placement is confirmed.",
              ].map((step, index) => (
                <li key={step} className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500 text-[0.62rem] font-bold text-navy-950">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        }
      />

      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Step by step"
            title="What to expect, in order"
            description="Each stage is designed to keep you informed before a tutor placement is confirmed."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {HOW_IT_WORKS_DETAILED.map((item, index) => {
              const Icon = timelineIcons[index] ?? CheckCircle2;
              return (
                <article
                  key={item.step}
                  className="relative rounded-3xl border border-line bg-paper p-6 shadow-card"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-navy-700 shadow-sm">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[0.68rem] font-extrabold tracking-wider text-orange-600 uppercase">
                          Step {item.step}
                        </span>
                        {index === 5 ? (
                          <Badge tone="orange">Subject to availability</Badge>
                        ) : null}
                      </div>
                      <h3 className="mt-1.5 text-lg leading-snug font-bold text-navy-900">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                      <p className="mt-3 rounded-xl border border-navy-100 bg-white px-3.5 py-2.5 text-xs leading-relaxed text-navy-800">
                        <span className="font-bold">For parents:</span> {item.parent}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <p className="flex items-start gap-3 text-sm leading-relaxed text-orange-900">
              <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <span>
                A demo class is arranged only where a suitable tutor is available for your subject,
                class and schedule. We do not promise a demo before checking.
              </span>
            </p>
            <Link
              href="/find-a-home-tutor"
              className="mt-4 inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-orange-800 underline underline-offset-2 sm:mt-0"
            >
              Start an enquiry
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-navy-950 text-white" id="fees">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="eyebrow text-orange-300">Fees &amp; commission</p>
              <h2 className="mt-3 text-3xl leading-[1.12] font-bold sm:text-4xl">
                No hidden charges, no assumed percentage
              </h2>
              <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-navy-100">
                Monthly tuition fees are paid directly to the tutor. The agency charges a one-time
                placement commission equivalent to one month&apos;s tuition fee, shared between the
                parent and the tutor. The exact division is agreed before the placement is
                finalised.
              </p>

              <div className="mt-7 rounded-3xl border border-white/10 bg-white/[0.06] p-6">
                <p className="text-xs font-bold tracking-wider text-orange-300 uppercase">
                  Indicative monthly tuition range
                </p>
                <p className="mt-3 font-display text-4xl font-extrabold text-white sm:text-5xl">
                  ₹{siteConfig.fees.min.toLocaleString("en-IN")}–₹
                  {siteConfig.fees.max.toLocaleString("en-IN")}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-navy-200">{siteConfig.fees.note}</p>
                <p className="mt-4 rounded-xl border border-white/10 bg-navy-900/70 px-4 py-3 text-xs leading-relaxed text-navy-100">
                  This is an indicative range, not a guaranteed price. The final monthly fee is
                  agreed directly between the parent and the tutor.
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs font-bold text-orange-300 uppercase">Paid to</p>
                  <p className="mt-1 text-sm font-semibold text-white">Tutor, directly</p>
                  <p className="mt-1 text-xs text-navy-200">Monthly tuition fee</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs font-bold text-orange-300 uppercase">One-time commission</p>
                  <p className="mt-1 text-sm font-semibold text-white">1 month&apos;s fee</p>
                  <p className="mt-1 text-xs text-navy-200">Shared parent / tutor, agreed in writing</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 sm:p-8">
              <p className="text-sm font-bold text-white">Commission and payment terms</p>
              <ul className="mt-4 space-y-4">
                {COMMISSION_TERMS.map((term) => (
                  <li key={term} className="flex items-start gap-2.5 text-sm leading-relaxed text-navy-100">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-orange-300" aria-hidden="true" />
                    {term}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl border border-orange-400/30 bg-orange-500/10 p-4 text-xs leading-relaxed text-orange-100">
                <p className="flex items-start gap-2 font-bold text-orange-200">
                  <RefreshCcw className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  Replacement terms
                </p>
                <p className="mt-2">
                  A replacement may be arranged if an assigned tutor leaves within the period agreed
                  for that particular placement. There is no universal replacement guarantee or
                  fixed number of days advertised, because terms depend on the written agreement
                  for each placement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="eyebrow">Working together</p>
            <h2 className="mt-3 text-3xl leading-[1.12] font-bold text-navy-900 sm:text-4xl">
              What we ask of each other
            </h2>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">
              A tuition placement works best when expectations are clear on both sides. These are
              the commitments we make to parents, and the information we ask parents to share.
            </p>

            <div className="mt-6 rounded-2xl border border-line bg-paper p-5">
              <p className="text-sm font-bold text-navy-900">What we need from you</p>
              <ul className="mt-3 space-y-2.5 text-sm text-muted">
                {[
                  "Accurate class, board and subject details",
                  "The locality and a usable address for scheduling",
                  "A realistic preferred schedule",
                  "Prompt communication if plans change",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Button href="/terms-and-conditions" variant="outline" className="mt-6">
              Read the terms &amp; conditions
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {PARENT_COMMITMENTS.map((commitment, index) => (
              <article
                key={commitment.title}
                className="rounded-2xl border border-line bg-white p-5 shadow-card"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 font-display text-xs font-extrabold text-navy-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-sm font-bold text-navy-900">{commitment.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  {commitment.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="container-page">
          <div className="rounded-[2rem] border border-line bg-white p-6 shadow-card sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="eyebrow">For tutors</p>
                <h2 className="mt-3 text-3xl leading-tight font-bold text-navy-900">
                  Understand the placement terms before you accept
                </h2>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">
                  Applying is free. If a parent requirement matches your subject, classes, area and
                  availability, we will contact you with the details. Your exact commission share
                  and payment obligation are communicated and agreed before you accept a placement.
                </p>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
                  Registration does not guarantee a fixed number of classes, a minimum income or
                  automatic verification. Documents are stored privately and never displayed on a
                  public profile.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/become-a-tutor">
                    Apply as a tutor
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button href="/faqs#tutors" variant="outline">
                    Tutor FAQs
                  </Button>
                </div>
              </div>
              <ul className="grid gap-3 text-sm">
                {[
                  "One-time placement commission, not a monthly cut of your fee",
                  "Monthly fees are paid directly by the parent",
                  "Exact sharing agreed before placement",
                  "Written replacement terms for each placement",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5 rounded-xl bg-navy-50 px-4 py-3 text-navy-800">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaPanel
        eyebrow="Ready to begin?"
        title="Tell us about your child's learning needs"
        description="Share the details you have. We will respond with the next steps and an honest view of tutor availability."
        actions={
          <>
            <Button href="/find-a-home-tutor" size="lg">
              Find a Home Tutor
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/contact" variant="white" size="lg">
              Ask a question
            </Button>
          </>
        }
        points={[
          "No payment needed to enquire",
          "Demo where a suitable tutor is available",
          "Transparent one-time commission",
          "Monthly fees paid directly to the tutor",
        ]}
      />

      <JsonLd data={[breadcrumbJsonLd(crumbs), serviceJsonLd()]} />
    </>
  );
}
