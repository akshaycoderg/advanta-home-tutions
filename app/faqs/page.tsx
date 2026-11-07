import type { Metadata } from "next";
import { ArrowRight, HelpCircle, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { parentFaqs, tutorFaqs, allFaqs, faqJsonLd } from "@/lib/faqs";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "FAQs for Parents & Tutors",
  description:
    "Answers about home tuition in Varanasi: classes, boards, fees, demo classes, placement commission, tutor verification and document privacy.",
  path: "/faqs",
  keywords: [
    "home tuition FAQs Varanasi",
    "home tutor fees Varanasi",
    "tutor verification documents",
    "home tuition demo class",
  ],
});

export default function FaqsPage() {
  const crumbs = [{ label: "FAQs" }];

  return (
    <>
      <PageHero
        eyebrow="Frequently asked questions"
        title={
          <>
            Straight answers, <span className="text-orange-300">including the awkward ones</span>
          </>
        }
        description={
          <p>
            Fees, availability, demos, commission, documents and privacy. If your question is not
            covered here, contact us and we will answer honestly.
          </p>
        }
        crumbs={crumbs}
        actions={
          <>
            <Button href="/find-a-home-tutor" size="lg">
              Parent enquiry
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/contact" variant="white" size="lg">
              Ask a question
            </Button>
          </>
        }
        aside={
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur">
            <p className="eyebrow text-orange-300">Jump to</p>
            <nav aria-label="FAQ sections" className="mt-4 space-y-2">
              <a
                href="#parents"
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 px-3.5 py-3 text-sm font-semibold text-navy-50 hover:bg-white/10"
              >
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-orange-300" aria-hidden="true" />
                  Parent questions
                </span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#tutors"
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 px-3.5 py-3 text-sm font-semibold text-navy-50 hover:bg-white/10"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-orange-300" aria-hidden="true" />
                  Tutor questions
                </span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </nav>
            <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-relaxed text-navy-200">
              We do not claim guaranteed tutor availability, guaranteed results or a universal
              replacement period.
            </p>
          </div>
        }
      />

      <section className="section-pad bg-white" id="parents">
        <div className="container-page grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Badge tone="orange">
              <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {parentFaqs.length} answers
            </Badge>
            <h2 className="mt-4 text-3xl leading-tight font-bold text-navy-900">
              For parents and guardians
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              What the service covers, how tutor selection works and what the fees and commission
              actually mean.
            </p>
            <Button href="/find-a-home-tutor" size="sm" className="mt-5">
              Find a Home Tutor
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
          <FaqAccordion items={parentFaqs} idPrefix="faq-parent" />
        </div>
      </section>

      <section className="section-pad bg-paper" id="tutors">
        <div className="container-page grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Badge tone="navy">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              {tutorFaqs.length} answers
            </Badge>
            <h2 className="mt-4 text-3xl leading-tight font-bold text-navy-900">
              For tutors
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Eligibility, registration, documents, verification and how placement terms are
              communicated.
            </p>
            <Button href="/become-a-tutor" size="sm" className="mt-5">
              Apply as a Tutor
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
          <FaqAccordion items={tutorFaqs} idPrefix="faq-tutor" />
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="rounded-[2rem] border border-line bg-paper p-6 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="eyebrow">Still unsure?</p>
                <h2 className="mt-3 text-3xl leading-tight font-bold text-navy-900">
                  Ask us the specific question
                </h2>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">
                  Generic answers only go so far. Tell us the class, subject, board and locality,
                  and we can discuss what is actually available for your situation.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/contact">
                    Contact options
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button href="/how-it-works" variant="outline">
                    Read the process
                  </Button>
                </div>
              </div>
              <div className="rounded-2xl border border-navy-100 bg-white p-5">
                <p className="flex items-start gap-2.5 text-sm leading-relaxed text-navy-800">
                  <MessageCircle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-orange-500" aria-hidden="true" />
                  <span>
                    <span className="font-bold">Before you contact us:</span> if you are a parent,
                    keep the class, board, subjects and locality ready. If you are a tutor, keep
                    your subjects, classes, areas and available days ready.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaPanel
        eyebrow="Next step"
        title="Ready to share your requirement?"
        description="A parent enquiry takes a few minutes. There is no payment needed to enquire, and nothing is assigned automatically."
        actions={
          <>
            <Button href="/find-a-home-tutor" size="lg">
              Request a Home Tutor
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/become-a-tutor" variant="white" size="lg">
              Become a Tutor
            </Button>
          </>
        }
        points={[
          "Parent and tutor forms validated on both sides",
          "Tutor documents stored privately",
          "Transparent, one-time placement commission",
          "Fees paid directly to the selected tutor",
        ]}
      />

      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(allFaqs)]} />
    </>
  );
}
