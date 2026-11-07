import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  GraduationCap,
  IndianRupee,
  Lock,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/sections/PageHero";
import { TutorApplicationForm } from "@/components/forms/TutorApplicationForm";
import { TutorIllustration } from "@/components/illustrations/TutorIllustration";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/config";
import {
  COMMISSION_TERMS,
  TUTOR_ELIGIBILITY,
  VERIFICATION_STEPS,
} from "@/lib/content";
import { tutorFaqs, faqJsonLd } from "@/lib/faqs";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Become a Home Tutor in Varanasi",
  description:
    "Apply to join the Advanta Home Tutions tutor network in Varanasi. Graduates, B.Ed teachers, experienced tutors and freshers can register online; documents stay private.",
  path: "/become-a-tutor",
  keywords: [
    "become a home tutor Varanasi",
    "home tutor jobs Varanasi",
    "tuition teacher registration Varanasi",
    "B.Ed tutor job Varanasi",
  ],
});

const expectations = [
  {
    icon: BookOpen,
    title: "Subject confidence",
    description:
      "You should be able to explain the subject clearly at the class level you apply for — not only solve the questions yourself.",
  },
  {
    icon: CalendarCheck,
    title: "Reliability",
    description:
      "Home tuition depends on punctuality and consistent communication. Share availability you can realistically maintain.",
  },
  {
    icon: Users,
    title: "Respectful conduct",
    description:
      "Tutors visit family homes. Professional boundaries, patience and respectful communication are essential.",
  },
  {
    icon: GraduationCap,
    title: "Willingness to prepare",
    description:
      "A lesson plan, a short practice task and a progress note make a bigger difference than extra hours.",
  },
];

export default function BecomeTutorPage() {
  const crumbs = [{ label: "Become a Tutor" }];

  return (
    <>
      <PageHero
        eyebrow="Become a tutor"
        title={
          <>
            Teach with care. Join a network that values <span className="text-orange-300">fit</span>
          </>
        }
        description={
          <p>
            We welcome graduates, postgraduates, B.Ed and D.El.Ed / BTC teachers, experienced home
            tutors and freshers. Applications are reviewed personally, and documents stay private.
          </p>
        }
        crumbs={crumbs}
        actions={
          <>
            <Button href="#tutor-form" size="lg">
              Start your application
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="#verification" variant="white" size="lg">
              Verification process
            </Button>
          </>
        }
        aside={<TutorIllustration />}
      />

      <section className="border-y border-line bg-white">
        <div className="container-page grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Sparkles, label: "Apply online", value: "Free to register" },
            { icon: Lock, label: "Documents", value: "Private storage" },
            { icon: IndianRupee, label: "Placement fee", value: "One-time commission" },
            { icon: ShieldCheck, label: "Review", value: "Personal, step by step" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 rounded-2xl px-1 py-2">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[0.68rem] font-bold tracking-wider text-muted uppercase">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-bold text-navy-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="container-page">
          <SectionHeading
            eyebrow="Who can apply"
            title="Different backgrounds. One shared standard."
            description="Subject knowledge, communication and reliability matter more than a single prescribed qualification."
            align="center"
          />
          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {TUTOR_ELIGIBILITY.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-navy-800 shadow-sm"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {expectations.map((item) => (
              <article key={item.title} className="rounded-3xl border border-line bg-white p-5 shadow-card">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-royal-50 text-royal-700">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-bold text-navy-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl rounded-2xl border border-orange-200 bg-orange-50 px-5 py-4 text-center text-sm leading-relaxed text-orange-900">
            Applying does not guarantee selection, verification or work. We contact tutors when a
            parent requirement genuinely matches their subjects, classes, area and availability.
          </p>
        </div>
      </section>

      <section className="section-pad bg-white" id="verification">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <Badge tone="navy">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Verification
            </Badge>
            <h2 className="mt-4 text-3xl leading-[1.12] font-bold text-navy-900 sm:text-4xl">
              How applications are reviewed
            </h2>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">
              Verification is not a single checkbox. Depending on the application, the review may
              include several steps. An application is not described as verified until the
              relevant checks have actually been completed.
            </p>
            <div className="mt-6 rounded-2xl border border-navy-100 bg-navy-50/70 p-5 text-sm leading-relaxed text-navy-800">
              <p className="flex items-start gap-2 font-bold">
                <Lock className="mt-0.5 h-4.5 w-4.5 shrink-0" aria-hidden="true" />
                Documents stay private
              </p>
              <p className="mt-2 pl-6 text-muted">
                Uploaded qualification, experience and identity documents are stored in private
                storage, accessible only to authorised staff for verification. They are never
                displayed on a public tutor profile. Do not upload an Aadhaar document unless it has
                been specifically requested through the secure process.
              </p>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              Read the{" "}
              <Link href="/privacy-policy" className="font-semibold text-royal-700 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for how application data is handled.
            </p>
          </div>

          <ol className="space-y-4">
            {VERIFICATION_STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-4 rounded-2xl border border-line bg-paper p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-display text-xs font-extrabold text-navy-700 shadow-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-navy-900">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad bg-paper" id="tutor-form">
        <div className="container-page grid gap-10 lg:grid-cols-[1.45fr_0.75fr] lg:items-start">
          <div>
            <TutorApplicationForm />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
              <p className="eyebrow">What happens after you apply</p>
              <ol className="mt-4 space-y-4">
                {[
                  "Your subjects, classes, availability and documents are reviewed.",
                  "If there is a potential fit, we contact you for an interview and verification.",
                  "Verified tutors are considered for suitable parent requirements.",
                  "Terms and commission share are agreed before you accept a placement.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-50 font-display text-[0.68rem] font-extrabold text-navy-700">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-muted">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
              <p className="text-sm font-bold text-navy-900">Placement terms</p>
              <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-muted">
                {COMMISSION_TERMS.slice(0, 5).map((term) => (
                  <li key={term} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                    {term}
                  </li>
                ))}
              </ul>
              <Link
                href="/how-it-works#fees"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-royal-700 hover:text-royal-800"
              >
                Full fee and commission details
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
              <p className="text-sm font-bold text-navy-900">Contact</p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                If you have a question before applying, use the contact options page. We will
                respond as soon as possible during active business hours.
              </p>
              <Button href="/contact" variant="outline" size="sm" className="mt-4" fullWidth>
                Contact options
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Tutor FAQs</p>
            <h2 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">
              Questions tutors ask before registering
            </h2>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">
              More answers are available on the{" "}
              <Link href="/faqs#tutors" className="font-semibold text-royal-700 underline underline-offset-2">
                FAQs page
              </Link>
              .
            </p>
          </div>
          <FaqAccordion items={tutorFaqs} idPrefix="tutor-faq" className="mx-auto mt-8 max-w-3xl" />
        </div>
      </section>

      <CtaPanel
        eyebrow="Take the next step"
        title="Ready to apply?"
        description={`Join the ${siteConfig.name} tutor network. Complete the application form with accurate subjects, classes and availability so we can assess fit properly.`}
        actions={
          <>
            <Button href="#tutor-form" size="lg">
              Go to the application
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/faqs#tutors" variant="white" size="lg">
              Read tutor FAQs
            </Button>
          </>
        }
        points={[
          "Free to apply",
          "Documents stored privately",
          "No guaranteed work or income",
          "Exact commission share agreed before placement",
        ]}
      />

      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(tutorFaqs)]} />
    </>
  );
}
