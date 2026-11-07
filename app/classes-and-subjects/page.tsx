import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Layers,
  Search,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { BOARDS, CLASS_GROUPS, SUBJECTS } from "@/lib/content";
import { parentFaqs, faqJsonLd } from "@/lib/faqs";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Classes & Subjects",
  description:
    "Home tuition support from Nursery to Class 12 in Varanasi across CBSE, ICSE, UP Board and other boards. Explore classes, subjects and availability notes.",
  path: "/classes-and-subjects",
  keywords: [
    "home tuition classes Varanasi",
    "Class 9 home tutor Varanasi",
    "Class 12 tuition Varanasi",
    "CBSE ICSE UP Board home tuition",
    "home tutor subjects Varanasi",
  ],
});

const pageFaqs = [parentFaqs[1], parentFaqs[2], parentFaqs[3], parentFaqs[13]];

const boardNotes: Record<string, string> = {
  CBSE: "Central syllabus, CBSE sample papers and board-pattern practice.",
  ICSE: "Detailed ICSE syllabus support, including internal assessment patterns.",
  "UP Board": "UP Board syllabus, Hindi-medium support where available, and board exam practice.",
  "Other State Board": "Share the board and syllabus details so tutor fit can be checked.",
  "IB / Cambridge": "Subject-specialist support where an appropriate tutor is available.",
};

export default function ClassesPage() {
  const crumbs = [{ label: "Classes & Subjects" }];

  return (
    <>
      <PageHero
        eyebrow="Classes & subjects"
        title={
          <>
            From first reading steps to <span className="text-orange-300">board-exam confidence</span>
          </>
        }
        description={
          <p>
            One-to-one home tuition for Nursery to Class 12 across core school subjects. Explore
            the stages below, then share your exact requirement so tutor availability can be
            checked.
          </p>
        }
        crumbs={crumbs}
        actions={
          <>
            <Button href="/find-a-home-tutor" size="lg">
              Find a Home Tutor
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/how-it-works" variant="white" size="lg">
              How matching works
            </Button>
          </>
        }
        aside={
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur">
            <p className="eyebrow text-orange-300">Quick jump</p>
            <nav aria-label="Class stages" className="mt-4">
              <ul className="space-y-2">
                {CLASS_GROUPS.map((group) => (
                  <li key={group.slug}>
                    <a
                      href={`#${group.slug}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/10 px-3.5 py-2.5 text-sm font-semibold text-navy-50 transition-colors hover:border-white/25 hover:bg-white/10"
                    >
                      {group.label}
                      <ArrowRight className="h-4 w-4 text-orange-300" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-relaxed text-navy-200">
              Availability varies by subject, board, locality and timing. A stage being listed does
              not guarantee an immediate tutor match.
            </p>
          </div>
        }
      />

      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Choose a stage"
            title="Learning support that grows with the student"
            description="Each stage has a different academic focus. The tutor brief should reflect that, not just the subject name."
          />

          <div className="mt-10 space-y-5">
            {CLASS_GROUPS.map((group, index) => (
              <article
                key={group.slug}
                id={group.slug}
                className="scroll-mt-28 overflow-hidden rounded-3xl border border-line bg-white shadow-card"
              >
                <div className="grid gap-0 lg:grid-cols-[0.85fr_1.4fr]">
                  <div className="flex flex-col justify-between gap-6 border-b border-line bg-navy-950 p-6 text-white lg:border-r lg:border-b-0 lg:p-8">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 font-display text-sm font-extrabold text-orange-300">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <Badge tone="white">{group.short}</Badge>
                      </div>
                      <h3 className="mt-5 text-2xl font-bold">{group.label}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-navy-200">{group.description}</p>
                    </div>
                    <Link
                      href="/find-a-home-tutor"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-300 hover:text-orange-200"
                    >
                      Enquire for this stage
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>

                  <div className="p-6 lg:p-8">
                    <div className="flex items-start gap-3 rounded-2xl border border-orange-100 bg-orange-50/70 p-4">
                      <Sparkles className="mt-0.5 h-4.5 w-4.5 shrink-0 text-orange-600" aria-hidden="true" />
                      <p className="text-sm leading-relaxed text-orange-900">
                        <span className="font-semibold">Focus:</span> {group.focus}
                      </p>
                    </div>

                    <div className="mt-6">
                      <p className="flex items-center gap-2 text-xs font-bold tracking-wider text-navy-700 uppercase">
                        <BookOpen className="h-4 w-4" aria-hidden="true" />
                        Subjects commonly requested
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {group.subjects.map((subject) => (
                          <li
                            key={subject}
                            className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-navy-800"
                          >
                            {subject}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="mt-5 text-xs leading-relaxed text-muted">
                      Subject availability depends on the specific class, board and timing. Share
                      the exact requirement and we will confirm what is possible.
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="container-page">
          <SectionHeading
            eyebrow="Boards"
            title="Board-aware preparation"
            description="The board affects syllabus, assessment style and exam practice. We look for tutors familiar with the board you study."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BOARDS.map((board) => (
              <article key={board.name} className="rounded-2xl border border-line bg-white p-5 shadow-card">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <Badge tone="sky">Board</Badge>
                </div>
                <h3 className="mt-4 text-base font-bold text-navy-900">{board.name}</h3>
                <p className="mt-1 text-xs font-medium text-navy-600">{board.description}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{boardNotes[board.name]}</p>
              </article>
            ))}
            <article className="rounded-2xl border border-dashed border-navy-200 bg-navy-50/60 p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-navy-700 shadow-sm">
                <Search className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-bold text-navy-900">Another board?</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Tell us the board and syllabus in your enquiry. We will check whether a suitable
                tutor is available.
              </p>
              <Link
                href="/find-a-home-tutor"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-royal-700 hover:text-royal-800"
              >
                Ask about your board
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <Badge tone="orange">
              <Layers className="h-3.5 w-3.5" aria-hidden="true" />
              Subject coverage
            </Badge>
            <h2 className="mt-4 text-3xl leading-[1.12] font-bold text-navy-900 sm:text-4xl">
              Core school subjects, matched to the class
            </h2>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">
              The list below shows the subjects we accept enquiries for. It does not mean every
              subject is available for every class, board or locality at all times.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-navy-800">
              {[
                "Subject-specific tutor matching",
                "Support with concepts, homework and exam preparation",
                "Hindi-medium support where an appropriate tutor is available",
                "Flexible discussion of weekly frequency and timing",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-paper p-6 shadow-card sm:p-8">
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {SUBJECTS.map((subject) => (
                <span
                  key={subject}
                  className="rounded-xl border border-line bg-white px-3 py-2.5 text-center text-xs font-semibold text-navy-800"
                >
                  {subject}
                </span>
              ))}
            </div>
            <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-muted">
              Need a subject not listed? Mention it in the enquiry form. We will tell you honestly
              whether we can help.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Good to know</p>
            <h2 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">
              Classes, boards and availability
            </h2>
          </div>
          <FaqAccordion items={pageFaqs} idPrefix="classes-faq" className="mx-auto mt-8 max-w-3xl" />
        </div>
      </section>

      <CtaPanel
        eyebrow="Not sure where to start?"
        title="Share the class and subject. We'll discuss the rest."
        description="You do not need to know the exact tutor profile you want. Tell us what is happening at school and what you would like to improve."
        actions={
          <>
            <Button href="/find-a-home-tutor" size="lg">
              Request a Home Tutor
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/contact" variant="white" size="lg">
              Contact Us
            </Button>
          </>
        }
        points={[
          "Nursery to Class 12 enquiries welcome",
          "CBSE, ICSE, UP Board and other boards",
          "Tutor gender preference subject to availability",
          "No payment needed to enquire",
        ]}
      />

      <JsonLd
        data={[breadcrumbJsonLd(crumbs), serviceJsonLd(), faqJsonLd(pageFaqs)]}
      />
    </>
  );
}
