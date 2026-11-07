import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { getServiceArea, publishedAreas } from "@/lib/areas";
import { siteConfig } from "@/lib/config";
import { CLASS_GROUPS } from "@/lib/content";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedAreas.map((area) => ({ area: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area: slug } = await params;
  const area = getServiceArea(slug);
  if (!area) return {};

  return pageMetadata({
    title: `Home Tuition in ${area.name}`,
    description: `${area.intro} Enquire about a suitable one-to-one home tutor in ${area.name}, Varanasi, subject to availability.`,
    path: `/home-tutor/${area.slug}`,
    keywords: [
      `home tutor ${area.name}`,
      `home tuition ${area.name}`,
      `private tutor ${area.name} Varanasi`,
    ],
  });
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area: slug } = await params;
  const area = getServiceArea(slug);
  if (!area) notFound();

  const crumbs = [{ label: `Home Tuition in ${area.name}` }];

  return (
    <>
      <PageHero
        eyebrow="Local home tuition"
        title={
          <>
            Home tuition in <span className="text-orange-300">{area.name}</span>
          </>
        }
        description={<p>{area.intro}</p>}
        crumbs={crumbs}
        actions={
          <>
            <Button href="/find-a-home-tutor" size="lg">
              Request a Home Tutor
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/classes-and-subjects" variant="white" size="lg">
              Classes &amp; subjects
            </Button>
          </>
        }
        aside={
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur">
            <p className="eyebrow text-orange-300">Coverage note</p>
            <p className="mt-3 text-sm leading-relaxed text-navy-100">
              {area.coverageNote ??
                "Tutor availability is confirmed case by case for the class, subject, board and preferred timing."}
            </p>
            <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-relaxed text-navy-200">
              A published area page does not mean every subject or class has an immediately
              available tutor.
            </p>
          </div>
        }
      />

      <section className="section-pad bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <Badge tone="orange">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {area.name}, {siteConfig.location.city}
            </Badge>
            <h2 className="mt-4 text-3xl leading-[1.12] font-bold text-navy-900 sm:text-4xl">
              Personal tuition, close to home
            </h2>
            <div className="content-prose mt-5">
              <p>
                Families in {area.name} can send a home tuition enquiry for Nursery to Class 12,
                across core school subjects and major boards. The aim is a one-to-one arrangement
                that fits the student&apos;s class, syllabus and routine.
              </p>
              <p>
                Coverage is not automatic. We check whether a suitable tutor is available for the
                exact subject, class, board and timing before discussing a demo. If we cannot
                currently support the requirement, we will say so.
              </p>
            </div>

            {area.landmarks && area.landmarks.length > 0 ? (
              <div className="mt-6 rounded-2xl border border-line bg-paper p-5">
                <p className="text-sm font-bold text-navy-900">Local reference points</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {area.landmarks.map((landmark) => (
                    <li
                      key={landmark}
                      className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-navy-800"
                    >
                      {landmark}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  These reference points are for orientation only. They are not a claim of an office
                  or a guaranteed service boundary.
                </p>
              </div>
            ) : null}

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {CLASS_GROUPS.slice(1, 5).map((group) => (
                <div key={group.slug} className="rounded-2xl border border-line bg-white p-5 shadow-card">
                  <p className="flex items-center gap-2 text-sm font-bold text-navy-900">
                    <BookOpen className="h-4 w-4 text-orange-500" aria-hidden="true" />
                    {group.label}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {group.subjects.slice(0, 4).join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
              <p className="eyebrow">What to share</p>
              <ul className="mt-4 space-y-3 text-sm text-navy-800">
                {[
                  "Class and education board",
                  "Subjects needing support",
                  "Your locality and full address",
                  "Preferred days and timing",
                  "Any tutor gender preference",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button href="/find-a-home-tutor" className="mt-5 w-full">
                Start an enquiry
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            <div className="rounded-3xl border border-navy-100 bg-navy-50/70 p-6">
              <p className="flex items-center gap-2 text-sm font-bold text-navy-900">
                <ShieldCheck className="h-4.5 w-4.5" aria-hidden="true" />
                Privacy reminder
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Your full home address is used for coverage checks and scheduling. It is deliberately
                left out of the pre-filled WhatsApp message.
              </p>
              <Link
                href="/privacy-policy"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-royal-700 hover:text-royal-800"
              >
                Read the Privacy Policy
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
              <p className="flex items-center gap-2 text-sm font-bold text-navy-900">
                <MessageCircle className="h-4.5 w-4.5 text-orange-500" aria-hidden="true" />
                Prefer to ask first?
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Use the contact page for the currently available contact options. No payment is
                needed to ask a question or send an enquiry.
              </p>
              <Button href="/contact" variant="outline" size="sm" className="mt-4 w-full">
                Contact options
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <CtaPanel
        eyebrow={area.name}
        title="Discuss a home tutor for your child"
        description="Share the requirement and we will check suitable tutor availability for your class, subject, board and timing."
        actions={
          <>
            <Button href="/find-a-home-tutor" size="lg">
              Request a Home Tutor
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/how-it-works" variant="white" size="lg">
              How it works
            </Button>
          </>
        }
        points={[
          "One-to-one learning at home",
          "Demo where a suitable tutor is available",
          "No automatic tutor assignment",
          "Transparent one-time commission",
        ]}
      />

      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `Home tuition in ${area.name}`,
            description: area.intro,
            serviceType: "Home tuition",
            provider: { "@id": `${absoluteUrl("/")}#organization` },
            areaServed: {
              "@type": "Place",
              name: area.name,
              containedInPlace: {
                "@type": "City",
                name: siteConfig.location.city,
              },
            },
          },
        ]}
      />
    </>
  );
}
