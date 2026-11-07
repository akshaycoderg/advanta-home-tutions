import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileCheck2,
  IndianRupee,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/sections/PageHero";
import { ParentEnquiryForm } from "@/components/forms/ParentEnquiryForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  hasPhone,
  hasWhatsapp,
  siteConfig,
  telHref,
  whatsappHref,
  defaultWhatsappMessage,
} from "@/lib/config";
import { parentFaqs, faqJsonLd } from "@/lib/faqs";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Find a Home Tutor in Varanasi",
  description:
    "Share your child's class, board, subjects, locality and timing to request a suitable home tutor in Varanasi. Validated enquiry form with a clear next-step process.",
  path: "/find-a-home-tutor",
  keywords: [
    "find home tutor Varanasi",
    "home tuition enquiry Varanasi",
    "home tutor for Class 10 Varanasi",
    "private tutor near me Varanasi",
  ],
});

const formFaqs = [parentFaqs[0], parentFaqs[4], parentFaqs[6], parentFaqs[8], parentFaqs[13]];

const checklist = [
  {
    icon: FileCheck2,
    title: "Class and board",
    description: "For example, Class 9, CBSE. The board matters for syllabus and exam style.",
  },
  {
    icon: Sparkles,
    title: "Subjects and learning goal",
    description: "Which subjects need help, and what would you like to improve first?",
  },
  {
    icon: MapPin,
    title: "Locality and full address",
    description: "The locality helps with coverage; the full address is used only for scheduling and is not included in WhatsApp links.",
  },
  {
    icon: Clock3,
    title: "Preferred days and timing",
    description: "A rough window such as weekdays after 5 PM is enough to start the discussion.",
  },
];

export default function FindTutorPage() {
  const crumbs = [{ label: "Find a Home Tutor" }];

  return (
    <>
      <PageHero
        eyebrow="Parent enquiry"
        title={
          <>
            Tell us what your child needs. We&apos;ll take it from there.
          </>
        }
        description={
          <p>
            Share the class, board, subjects, locality and preferred timing. We will discuss the
            requirement, check suitable available tutors and be honest about what is possible.
          </p>
        }
        crumbs={crumbs}
        actions={
          <>
            <Button href="#enquiry-form" size="lg">
              Start the enquiry
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/how-it-works" variant="white" size="lg">
              What happens next
            </Button>
          </>
        }
        aside={
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur">
            <p className="text-xs font-bold tracking-wider text-orange-300 uppercase">
              Before you begin
            </p>
            <ul className="mt-4 space-y-3 text-sm text-navy-100">
              {[
                "Takes about 3–4 minutes",
                "No payment needed to enquire",
                "Demo class where a suitable tutor is available",
                "Your full address is not put in WhatsApp links",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="text-xs leading-relaxed text-navy-200">
                Enquiries are handled in the order received. Timing varies with enquiry volume and
                tutor availability, so no fixed response time is guaranteed.
              </p>
            </div>
          </div>
        }
      />

      <section className="section-pad bg-paper" id="enquiry-form">
        <div className="container-page grid gap-10 lg:grid-cols-[1.45fr_0.75fr] lg:items-start">
          <div>
            <ParentEnquiryForm />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
              <p className="eyebrow">What happens next</p>
              <ol className="mt-4 space-y-4">
                {[
                  "We review the class, board, subjects and locality you shared.",
                  "We contact you to understand the academic need and discuss tutor availability.",
                  "If a suitable tutor is available, we share the profile and discuss a demo.",
                  "You choose whether to proceed after the demo. Nothing is assigned automatically.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-50 font-display text-[0.68rem] font-extrabold text-navy-700">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-muted">{step}</p>
                  </li>
                ))}
              </ol>
              <Link
                href="/how-it-works"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-royal-700 hover:text-royal-800"
              >
                Read the full process
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="rounded-3xl border border-orange-200 bg-orange-50 p-6">
              <div className="flex items-center gap-2.5">
                <IndianRupee className="h-5 w-5 text-orange-700" aria-hidden="true" />
                <p className="text-sm font-bold text-orange-900">Indicative fee range</p>
              </div>
              <p className="mt-3 font-display text-2xl font-extrabold text-orange-950">
                ₹{siteConfig.fees.min.toLocaleString("en-IN")}–₹
                {siteConfig.fees.max.toLocaleString("en-IN")}
                <span className="ml-1 font-sans text-xs font-semibold text-orange-800">/ month</span>
              </p>
              <p className="mt-2 text-xs leading-relaxed text-orange-900/90">{siteConfig.fees.note}</p>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
              <p className="flex items-center gap-2 text-sm font-bold text-navy-900">
                <ShieldCheck className="h-4.5 w-4.5 text-navy-700" aria-hidden="true" />
                Prefer to talk first?
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                You can contact us directly. WhatsApp opens only when you choose to tap the link.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                {hasWhatsapp ? (
                  <Button href={whatsappHref(defaultWhatsappMessage)} variant="whatsapp" size="sm">
                    <WhatsAppIcon className="h-4 w-4" />
                    Message on WhatsApp
                  </Button>
                ) : null}
                {hasPhone ? (
                  <Button href={telHref} variant="outline" size="sm">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call us
                  </Button>
                ) : null}
                <Button href="/contact" variant="ghost" size="sm">
                  All contact options
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <Badge tone="sky">A little preparation helps</Badge>
              <h2 className="mt-4 text-3xl leading-[1.12] font-bold text-navy-900 sm:text-4xl">
                What to have ready
              </h2>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">
                You do not need a perfect brief. These four details help us judge tutor fit and
                have a more useful first conversation.
              </p>
              <p className="mt-4 rounded-xl border border-line bg-paper px-4 py-3 text-xs leading-relaxed text-muted">
                If you are unsure about any field, share what you know and mention the rest in the
                additional requirements box.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {checklist.map((item) => (
                <div key={item.title} className="rounded-2xl border border-line bg-paper p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-navy-700 shadow-sm">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-sm font-bold text-navy-900">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Common questions</p>
            <h2 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">
              Before you submit an enquiry
            </h2>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">
              For more answers about fees, tutor selection and coverage, see the{" "}
              <Link href="/faqs" className="font-semibold text-royal-700 underline underline-offset-2">
                full FAQ page
              </Link>
              .
            </p>
          </div>
          <FaqAccordion items={formFaqs} idPrefix="find-faq" className="mx-auto mt-8 max-w-3xl" />
        </div>
      </section>

      <JsonLd
        data={[breadcrumbJsonLd(crumbs), serviceJsonLd(), faqJsonLd(formFaqs)]}
      />
    </>
  );
}
