import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, CalendarDays, Clock3, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { sortedPosts } from "@/lib/blog";
import { breadcrumbJsonLd, pageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Home Tuition Blog",
  description:
    "Practical, original articles for Varanasi parents on choosing a home tutor, supporting board exam preparation and comparing tuition options.",
  path: "/blog",
  keywords: [
    "home tuition blog",
    "choosing a home tutor",
    "Class 10 study plan",
    "home tuition vs coaching",
  ],
});

function formatDate(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPage() {
  const crumbs = [{ label: "Blog" }];
  const [featured, ...rest] = sortedPosts;

  return (
    <>
      <PageHero
        eyebrow="Advanta journal"
        title={
          <>
            Practical guidance for <span className="text-orange-300">parents and tutors</span>
          </>
        }
        description={
          <p>
            Original articles about choosing a home tutor, building study habits and understanding
            tuition fees — written for families in Varanasi, without inflated promises.
          </p>
        }
        crumbs={crumbs}
        actions={
          <>
            <Button href="/find-a-home-tutor" size="lg">
              Find a Home Tutor
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/faqs" variant="white" size="lg">
              Read FAQs
            </Button>
          </>
        }
      />

      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Latest articles"
            title="Start with the decision in front of you"
            description="These articles are evergreen guides, not news or claims about our own results. They are maintained in the website content file."
          />

          {featured ? (
            <article className="mt-10 overflow-hidden rounded-[2rem] border border-line bg-white shadow-card">
              <div className="grid lg:grid-cols-[1fr_0.85fr]">
                <div className="border-b border-line bg-navy-950 p-6 text-white sm:p-8 lg:border-r lg:border-b-0 lg:p-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="white">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                      Featured
                    </Badge>
                    <Badge tone="orange">{featured.category}</Badge>
                  </div>
                  <h2 className="mt-5 text-2xl leading-tight font-bold sm:text-3xl lg:text-[2.1rem]">
                    <Link href={`/blog/${featured.slug}`} className="hover:text-orange-200">
                      {featured.title}
                    </Link>
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-navy-100 sm:text-[0.98rem]">
                    {featured.description}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-navy-200">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {formatDate(featured.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                      {featured.readingTime}
                    </span>
                  </div>
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="mt-7 inline-flex items-center gap-1.5 text-sm font-bold text-orange-300 hover:text-orange-200"
                  >
                    Read the article
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <p className="text-xs font-bold tracking-wider text-navy-700 uppercase">In this article</p>
                  <ul className="mt-4 space-y-3">
                    {featured.blocks
                      .filter((block) => block.type === "h2")
                      .slice(0, 5)
                      .map((block) => (
                        <li key={block.text} className="flex items-start gap-2.5 text-sm text-navy-800">
                          <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" aria-hidden="true" />
                          {block.text}
                        </li>
                      ))}
                  </ul>
                  <p className="mt-6 rounded-xl bg-paper px-4 py-3 text-xs leading-relaxed text-muted">
                    Written and maintained by {`Advanta Home Tutions`}. General educational
                    guidance — not a guarantee of results.
                  </p>
                </div>
              </div>
            </article>
          ) : null}

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <article
                key={post.slug}
                className="card-hover flex flex-col rounded-3xl border border-line bg-white p-6 shadow-card"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="sky">{post.category}</Badge>
                  <span className="text-[0.68rem] text-muted">{post.readingTime}</span>
                </div>
                <h2 className="mt-4 flex-1 text-lg leading-snug font-bold text-navy-900">
                  <Link href={`/blog/${post.slug}`} className="hover:text-royal-700">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{post.description}</p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                    {formatDate(post.date)}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal-700 hover:text-royal-800"
                  >
                    Read
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-line bg-paper p-5 text-center text-xs leading-relaxed text-muted">
            Articles are for general information. For advice about your child&apos;s specific class,
            board or subject, send an enquiry and we can discuss the available options.
          </div>
        </div>
      </section>

      <CtaPanel
        eyebrow="Beyond reading"
        title="Want to discuss your child's needs?"
        description="Tell us the class, board and subjects. We will discuss suitable tutor options and the next steps, including a demo where available."
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
          "Original, practical guidance",
          "No invented results or testimonials",
          "Clear fees and commission information",
          "Private handling of tutor documents",
        ]}
      />

      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Advanta Home Tutions Blog",
            url: absoluteUrl("/blog"),
            inLanguage: "en-IN",
            blogPost: sortedPosts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              description: post.description,
              datePublished: post.date,
              url: absoluteUrl(`/blog/${post.slug}`),
            })),
          },
        ]}
      />
    </>
  );
}
