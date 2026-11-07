import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  HeartHandshake,
  Lock,
  MessageCircle,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/config";
import { PARENT_COMMITMENTS } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Advanta Home Tutions is a new home tuition agency in Varanasi, built around personal support, honest availability and transparent placement terms.",
  path: "/about",
  keywords: ["about Advanta Home Tutions", "home tuition agency Varanasi", "home tutor agency Varanasi"],
});

const values = [
  {
    icon: MessageCircle,
    title: "Plain conversation",
    description:
      "We explain what is available and what is not. No jargon, no exaggerated claims and no pressure to make a quick decision.",
  },
  {
    icon: Users,
    title: "Parent choice",
    description:
      "You see relevant tutor profiles and decide whether to attend a demo. The placement is confirmed only when you are comfortable.",
  },
  {
    icon: Scale,
    title: "Transparent money terms",
    description:
      "Monthly tuition fees are paid directly to the tutor. Any one-time placement commission and its sharing arrangement are agreed in writing before placement.",
  },
  {
    icon: Lock,
    title: "Careful with data",
    description:
      "Enquiries are kept for the purpose they were shared. Tutor documents are stored privately and are never displayed on a public profile.",
  },
  {
    icon: Compass,
    title: "Realistic expectations",
    description:
      "A demo is subject to availability. A tutor placement depends on subject, class, board, locality and timing. We say so upfront.",
  },
  {
    icon: HeartHandshake,
    title: "Long-term fit over quick placement",
    description:
      "The aim is a tutor your child can work with consistently — not simply the fastest match we can make.",
  },
];

const processNotes = [
  "You share your child's class, board, subjects, locality and timing.",
  "We discuss the academic need and any tutor preference.",
  "We check suitable available tutors and share relevant profiles.",
  "You attend a demo where available and decide whether to proceed.",
];

export default function AboutPage() {
  const crumbs = [{ label: "About Us" }];

  return (
    <>
      <PageHero
        eyebrow="About Advanta Home Tutions"
        title={
          <>
            A new Varanasi agency built around <span className="text-orange-300">honest matching</span>
          </>
        }
        description={
          <p>
            We help parents explore suitable one-to-one home tutors for their child&apos;s class,
            board and subjects. We are new, we are building our tutor network, and we would rather
            tell you that clearly than pretend otherwise.
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
              How it works
            </Button>
          </>
        }
        aside={
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur">
            <p className="eyebrow text-orange-300">At a glance</p>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-xs font-semibold tracking-wide text-navy-200 uppercase">Based in</dt>
                <dd className="mt-1 font-semibold text-white">
                  {siteConfig.location.city}, {siteConfig.location.state}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-wide text-navy-200 uppercase">Service</dt>
                <dd className="mt-1 font-semibold text-white">
                  One-to-one home tuition, Nursery to Class 12
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-wide text-navy-200 uppercase">
                  Agency style
                </dt>
                <dd className="mt-1 font-semibold text-white">
                  Home-based · enquiries by form, phone or WhatsApp
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-wide text-navy-200 uppercase">
                  What we do not claim
                </dt>
                <dd className="mt-1 leading-relaxed text-navy-100">
                  Established customer base, verified student results or guaranteed tutor
                  availability.
                </dd>
              </div>
            </dl>
          </div>
        }
      />

      <section className="section-pad bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="eyebrow">Why we exist</p>
            <h2 className="mt-3 text-3xl leading-[1.12] font-bold text-navy-900 sm:text-4xl">
              Finding a tutor should feel clearer
            </h2>
            <div className="content-prose mt-5">
              <p>
                For many families, finding a home tutor happens through informal references,
                WhatsApp groups or a hurried conversation near school. Those routes can work, but
                they often leave parents unsure about the tutor&apos;s background, the fee structure,
                or what happens if the arrangement does not suit the child.
              </p>
              <p>
                Advanta Home Tutions was created to offer a more structured alternative in{" "}
                {siteConfig.location.city}: a real person to discuss the requirement with, a
                process for reviewing tutor applications, and written agreement on fees and
                placement terms before anything is confirmed.
              </p>
              <p>
                We are at the beginning of that work. Our tutor network is growing, and we do not
                yet have a long track record to show. What we can control is how we communicate:
                clearly, respectfully and without inventing details to look more established than
                we are.
              </p>
            </div>

            <div className="mt-7 rounded-2xl border border-orange-200 bg-orange-50 p-5 text-sm leading-relaxed text-orange-900">
              <p className="flex items-start gap-2 font-semibold">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                Our position on trust
              </p>
              <p className="mt-2 pl-6">
                Trust is earned through clear terms, careful verification and a good first teaching
                experience — not through numbers we cannot substantiate. That is why this website
                does not display invented testimonials, tutor counts or result claims.
              </p>
            </div>
          </div>

          <aside className="rounded-3xl border border-line bg-paper p-6 shadow-card sm:p-8">
            <Badge tone="navy">How we work</Badge>
            <h2 className="mt-4 text-2xl font-bold text-navy-900">A simple, personal process</h2>
            <ol className="mt-6 space-y-4">
              {processNotes.map((note, index) => (
                <li key={note} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-700 font-display text-xs font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-navy-800">{note}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 border-t border-line pt-5">
              <p className="text-xs leading-relaxed text-muted">
                Demo availability and tutor options depend on your subject, class, board, locality
                and preferred timing. We will tell you if a suitable match is not currently
                available.
              </p>
              <Link
                href="/find-a-home-tutor"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-royal-700 hover:text-royal-800"
              >
                Start an enquiry
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="container-page">
          <SectionHeading
            eyebrow="What guides us"
            title="Values that shape the service"
            description="These are working principles, not marketing slogans. They determine how enquiries, tutor reviews and placement terms are handled."
            align="center"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <article key={value.title} className="rounded-3xl border border-line bg-white p-6 shadow-card">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-royal-50 text-royal-700">
                  <value.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy-900">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Our commitments to parents</p>
            <h2 className="mt-3 text-3xl leading-[1.12] font-bold text-navy-900 sm:text-4xl">
              Clear boundaries, before money changes hands
            </h2>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">
              A home tutor arrangement involves trust, time and money. These commitments are
              written into how we work, and the specific terms of each placement are confirmed in
              writing.
            </p>
            <Button href="/how-it-works#fees" className="mt-6">
              Read fees and commission terms
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
          <ul className="grid gap-4">
            {PARENT_COMMITMENTS.map((commitment) => (
              <li
                key={commitment.title}
                className="flex items-start gap-4 rounded-2xl border border-line bg-paper p-5"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-bold text-navy-900">{commitment.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{commitment.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="container-page">
          <div className="rounded-[2rem] border border-line bg-white p-6 shadow-card sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <p className="eyebrow">For tutors</p>
                <h2 className="mt-3 text-3xl leading-tight font-bold text-navy-900">
                  We are building the network carefully
                </h2>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">
                  Tutor applications are reviewed personally. Depending on the application, the
                  review may include identity verification, qualification review, an interview,
                  reference checks and appropriate lawful screening. An application is not
                  described as verified until those checks are complete.
                </p>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
                  Registration is free, and applying does not guarantee work or a fixed income.
                  Placement terms and any commission share are explained before you accept a
                  tuition requirement.
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
              <div className="rounded-2xl border border-navy-100 bg-navy-50/70 p-5">
                <p className="flex items-center gap-2 text-sm font-bold text-navy-900">
                  <ShieldCheck className="h-4.5 w-4.5 text-navy-700" aria-hidden="true" />
                  Document privacy
                </p>
                <ul className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    Uploaded documents are stored in private storage, not a public folder.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    Only authorised staff can access them for verification.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    Identity documents, if requested, are never shown on a public tutor profile.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    You can ask about access, correction or deletion of your data.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaPanel
        eyebrow="Talk to us"
        title="Have a question before you enquire?"
        description="You do not need to have every detail ready. Tell us the class and subject, and we can work through the rest together."
        actions={
          <>
            <Button href="/contact" size="lg">
              Contact Us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/faqs" variant="white" size="lg">
              Read FAQs
            </Button>
          </>
        }
        points={[
          "A real person reviews your enquiry",
          "Honest answer if a subject or area is not covered",
          "No payment needed to enquire",
          "Privacy-respecting WhatsApp links",
        ]}
      />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
