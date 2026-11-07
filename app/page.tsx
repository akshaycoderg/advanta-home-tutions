import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  GraduationCap,
  Headset,
  Home,
  IndianRupee,
  MapPin,
  Presentation,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { HeroIllustration } from "@/components/illustrations/HeroIllustration";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/config";
import { BENEFITS, CLASS_GROUPS, HOW_IT_WORKS_FOUR, COMMISSION_TERMS } from "@/lib/content";
import { parentFaqs, faqJsonLd } from "@/lib/faqs";
import { sortedPosts } from "@/lib/blog";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Home Tutor in Varanasi",
  description:
    "Find a suitable one-to-one home tutor in Varanasi for Nursery to Class 12. Advanta Home Tutions supports CBSE, ICSE, UP Board and more, subject to tutor availability.",
  path: "/",
  keywords: [
    "home tutor in Varanasi",
    "home tuition Varanasi",
    "private tutor Varanasi",
    "CBSE home tutor Varanasi",
    "ICSE home tutor Varanasi",
    "Class 10 tuition Varanasi",
  ],
  absoluteTitle: true,
});

const benefitIcons = {
  target: Target,
  home: Home,
  book: BookOpen,
  users: Users,
  presentation: Presentation,
  headset: Headset,
} as const;

const quickFacts = [
  {
    icon: GraduationCap,
    label: "Classes covered",
    value: "Nursery – Class 12",
    detail: "Early years to senior secondary",
  },
  {
    icon: BookOpen,
    label: "Boards",
    value: "CBSE, ICSE, UP Board",
    detail: "And other boards on request",
  },
  {
    icon: IndianRupee,
    label: "Indicative fee range",
    value: `₹${siteConfig.fees.min.toLocaleString("en-IN")}–₹${siteConfig.fees.max.toLocaleString("en-IN")}`,
    detail: "Per month, agreed with the tutor",
  },
  {
    icon: Home,
    label: "Learning format",
    value: "One-to-one at home",
    detail: "Focused, personal attention",
  },
];

const honestPoints = [
  {
    icon: ShieldCheck,
    title: "No invented reviews",
    description:
      "We are a new agency. You will not find made-up testimonials, star ratings or student results on this website.",
  },
  {
    icon: CalendarCheck,
    title: "Availability confirmed first",
    description:
      "Tutor availability depends on the class, subject, board, locality and timing. We will be clear when a match is not currently possible.",
  },
  {
    icon: Users,
    title: "You make the final choice",
    description:
      "We share suitable profiles and can arrange a demo where available. You decide whether to proceed — nothing is assigned automatically.",
  },
];

export default function HomePage() {
  const faqPreview = parentFaqs.slice(0, 5);
  const latestPosts = sortedPosts.slice(0, 3);

  return (
    <>
      <section className="hero-surface relative overflow-hidden">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden="true" />
        <div className="container-page relative grid items-center gap-12 py-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-20">
          <div className="animate-fade-up">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="orange">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                Varanasi
              </Badge>
              <Badge tone="sky">Nursery to Class 12</Badge>
              <Badge tone="sky">Home-based agency</Badge>
            </div>

            <h1 className="mt-6 text-[2.5rem] leading-[1.04] font-extrabold text-navy-950 sm:text-5xl lg:text-[3.7rem]">
              A home tutor who <span className="text-royal-700">fits your child</span> — not just
              the subject.
            </h1>

            <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-muted sm:text-lg">
              Advanta Home Tutions helps families in {siteConfig.location.city} find suitable
              one-to-one home tutors for their child&apos;s class, board and subjects. Clear
              process, honest availability and a demo class where a suitable tutor is available.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/find-a-home-tutor" size="lg">
                Find a Home Tutor
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href="/how-it-works" variant="outline" size="lg">
                See how it works
              </Button>
            </div>

            <ul className="mt-7 grid gap-x-6 gap-y-2.5 text-sm text-navy-800 sm:grid-cols-2">
              {[
                "Demo where a tutor is available",
                "Male and female tutor options",
                "No automatic tutor assignment",
                "Monthly fees paid directly to tutor",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <HeroIllustration />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="container-page grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:py-7">
          {quickFacts.map((fact) => (
            <div key={fact.label} className="flex items-start gap-3 rounded-2xl px-1 py-2">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                <fact.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[0.68rem] font-bold tracking-wider text-muted uppercase">
                  {fact.label}
                </p>
                <p className="mt-1 text-[0.95rem] leading-tight font-bold text-navy-900">
                  {fact.value}
                </p>
                <p className="mt-1 text-xs leading-snug text-muted">{fact.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why Advanta"
            title="Personal support, without the sales pitch"
            description="Choosing a tutor for your child is a serious decision. Our job is to make the process clearer — from the first conversation to the demo class."
            align="center"
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit) => {
              const Icon = benefitIcons[benefit.icon];
              return (
                <article
                  key={benefit.title}
                  className="card-hover rounded-3xl border border-line bg-white p-6 shadow-card"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-50 text-royal-700">
                    <Icon className="h-5.5 w-5.5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-navy-900">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{benefit.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Classes and subjects"
            title="Support at every stage of school"
            description="From early reading and number sense to board-exam revision, enquiries are welcome across the school years."
            action={
              <Button href="/classes-and-subjects" variant="outline">
                View all classes &amp; subjects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            }
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CLASS_GROUPS.map((group, index) => (
              <Link
                key={group.slug}
                href={`/classes-and-subjects#${group.slug}`}
                className={cn(
                  "card-hover group flex flex-col rounded-3xl border border-line bg-white p-6 shadow-card",
                  index === 0 && "sm:col-span-2 lg:col-span-1",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy-50 font-display text-sm font-extrabold text-navy-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Badge tone="sky">{group.short}</Badge>
                </div>
                <h3 className="mt-5 text-xl font-bold text-navy-900">{group.label}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{group.description}</p>
                <p className="mt-4 text-xs leading-relaxed text-navy-700">
                  <span className="font-semibold">Typical focus:</span> {group.focus}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-royal-700 transition-colors group-hover:text-royal-800">
                  Explore this stage
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-navy-950 text-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="eyebrow text-orange-300">A clear process</p>
              <h2 className="mt-3 max-w-lg text-3xl leading-[1.12] font-bold sm:text-4xl">
                From your first message to the right demo
              </h2>
              <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-navy-100">
                No automated matching, no pressure to confirm. We discuss the requirement, look
                for suitable available tutors and explain each next step.
              </p>

              <ol className="mt-8 space-y-5">
                {HOW_IT_WORKS_FOUR.map((step, index) => (
                  <li key={step.step} className="relative flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 font-display text-xs font-extrabold text-navy-950">
                        {step.step}
                      </span>
                      {index < HOW_IT_WORKS_FOUR.length - 1 ? (
                        <span className="mt-1 w-px flex-1 bg-white/15" aria-hidden="true" />
                      ) : null}
                    </div>
                    <div className="pb-1">
                      <h3 className="text-[1.02rem] font-bold text-white">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-navy-200">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/find-a-home-tutor" size="lg">
                  Share your requirement
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button href="/how-it-works" variant="white" size="lg">
                  Read the full process
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-300">
                  <IndianRupee className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold tracking-wider text-orange-300 uppercase">
                    Fees at a glance
                  </p>
                  <p className="text-sm text-navy-200">Indicative monthly range</p>
                </div>
              </div>
              <p className="mt-5 font-display text-4xl font-extrabold text-white">
                ₹{siteConfig.fees.min.toLocaleString("en-IN")}–₹
                {siteConfig.fees.max.toLocaleString("en-IN")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-navy-200">
                {siteConfig.fees.note}
              </p>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm text-navy-100">
                {COMMISSION_TERMS.slice(0, 3).map((term) => (
                  <p key={term} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" aria-hidden="true" />
                    <span>{term}</span>
                  </p>
                ))}
              </div>

              <Link
                href="/how-it-works#fees"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-orange-300 hover:text-orange-200"
              >
                Read fees and commission details
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow">Honest from the start</p>
              <h2 className="mt-3 text-3xl leading-[1.12] font-bold text-navy-900 sm:text-4xl">
                A new agency should say so
              </h2>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">
                Advanta Home Tutions is building its tutor network in {siteConfig.location.city}.
                We do not claim an established customer base, verified results or guaranteed
                availability. What we can promise is a transparent process and a real person to
                talk to.
              </p>
              <Button href="/about" variant="outline" className="mt-6">
                More about us
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {honestPoints.map((point) => (
                <div key={point.title} className="rounded-2xl border border-line bg-paper p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-navy-700 shadow-sm">
                    <point.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-sm font-bold text-navy-900">{point.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="container-page">
          <SectionHeading
            eyebrow="For parents"
            title="Questions parents ask before starting"
            description="Straight answers about classes, fees, demos and what happens next."
            action={
              <Button href="/faqs" variant="outline">
                All FAQs
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            }
          />
          <FaqAccordion items={faqPreview} idPrefix="home-faq" className="mt-8 bg-paper" />
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="From the blog"
            title="Practical guidance for parents"
            description="Evergreen articles on choosing a tutor, supporting study at home and comparing tuition options."
            action={
              <Button href="/blog" variant="outline">
                Visit the blog
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            }
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <article
                key={post.slug}
                className="card-hover flex flex-col rounded-3xl border border-line bg-white p-6 shadow-card"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="sky">{post.category}</Badge>
                  <span className="text-xs text-muted">{post.readingTime}</span>
                </div>
                <h3 className="mt-4 flex-1 text-lg leading-snug font-bold text-navy-900">
                  <Link href={`/blog/${post.slug}`} className="hover:text-royal-700">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{post.description}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-royal-700 hover:text-royal-800"
                >
                  Read the article
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[2rem] border border-navy-100 bg-white p-6 shadow-card sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy-50 via-white to-orange-50/60"
            />
            <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
              <div>
                <Badge tone="orange">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Are you a teacher or graduate?
                </Badge>
                <h2 className="mt-4 text-3xl leading-tight font-bold text-navy-900">
                  Join the Advanta tutor network
                </h2>
                <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-muted">
                  We welcome graduates, postgraduates, B.Ed and D.El.Ed / BTC teachers, experienced
                  home tutors and freshers. Apply online, share your subjects and availability, and
                  upload documents securely if you have them.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/become-a-tutor">
                    Become a Tutor
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button href="/faqs#tutors" variant="outline">
                    Tutor FAQs
                  </Button>
                </div>
              </div>
              <ul className="grid gap-3 text-sm text-navy-800">
                {[
                  "Free to apply",
                  "Documents stored privately",
                  "Placement terms agreed in writing",
                  "No guaranteed work or income",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5 rounded-xl bg-white/80 px-4 py-3">
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
        eyebrow="Start with a conversation"
        title="Tell us what your child needs"
        description="Share the class, board, subjects, locality and preferred timing. We will discuss the requirement and be honest about the tutor options currently available."
        actions={
          <>
            <Button href="/find-a-home-tutor" size="lg">
              Request a Home Tutor
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/contact" variant="white" size="lg">
              Contact options
            </Button>
          </>
        }
        points={[
          "No payment is needed to enquire",
          "No fixed response time is guaranteed",
          "Demo class where a suitable tutor is available",
          "Your full address is never put in a WhatsApp link",
        ]}
      />

      <JsonLd data={[serviceJsonLd(), faqJsonLd(faqPreview)]} />
    </>
  );
}
