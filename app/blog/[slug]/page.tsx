import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Info,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/config";
import { getPost, sortedPosts, type PostBlock } from "@/lib/blog";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return sortedPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const base = pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: [post.category.toLowerCase(), "home tuition Varanasi", "parent guide"],
    type: "article",
  });

  return {
    ...base,
    openGraph: {
      ...(base.openGraph ?? {}),
      type: "article",
      publishedTime: `${post.date}T00:00:00+05:30`,
      authors: [siteConfig.name],
      section: post.category,
    },
  };
}

function formatDate(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function ArticleBlock({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "p":
      return <p>{block.text}</p>;
    case "ul":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div className="not-prose rounded-2xl border border-orange-200 bg-orange-50 p-5">
          <p className="flex items-center gap-2 text-sm font-bold text-orange-900">
            <Info className="h-4.5 w-4.5" aria-hidden="true" />
            {block.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-orange-900/90">{block.text}</p>
        </div>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const headings = post.blocks
    .filter((block): block is Extract<PostBlock, { type: "h2" }> => block.type === "h2")
    .map((block) => block.text);

  const related = sortedPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const crumbs = [{ label: "Blog", href: "/blog" }, { label: post.title }];

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={<p>{post.description}</p>}
        crumbs={crumbs}
        actions={
          <Button href="/find-a-home-tutor" variant="white" size="lg">
            Find a Home Tutor
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        }
        aside={
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur">
            <p className="text-xs font-bold tracking-wider text-orange-300 uppercase">
              Article details
            </p>
            <ul className="mt-4 space-y-3 text-sm text-navy-100">
              <li className="flex items-center gap-2.5">
                <CalendarDays className="h-4 w-4 text-orange-300" aria-hidden="true" />
                {formatDate(post.date)}
              </li>
              <li className="flex items-center gap-2.5">
                <Clock3 className="h-4 w-4 text-orange-300" aria-hidden="true" />
                {post.readingTime}
              </li>
              <li className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-orange-300" aria-hidden="true" />
                By {siteConfig.name}
              </li>
            </ul>
            <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-navy-200">
              General educational guidance. It is not a promise of results or a substitute for
              advice from your child&apos;s school.
            </p>
          </div>
        }
      />

      <section className="section-pad bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[0.68fr_0.32fr] lg:items-start">
          <article className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="sky">{post.category}</Badge>
              <Badge tone="green">Original article</Badge>
            </div>

            <div className="content-prose mt-6 max-w-none">
              {post.blocks.map((block, index) => (
                <ArticleBlock key={`${block.type}-${index}`} block={block} />
              ))}
            </div>

            <div className="mt-9 rounded-2xl border border-navy-100 bg-navy-50/70 p-5">
              <p className="flex items-start gap-2.5 text-sm leading-relaxed text-navy-800">
                <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>
                  <span className="font-bold">A note on accuracy:</span> syllabus, board patterns and
                  school processes can change. Check the current official syllabus or school
                  circular for your child&apos;s board rather than relying on an older article.
                </span>
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-navy-900"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                All articles
              </Link>
              <Button href="/find-a-home-tutor" size="sm">
                Discuss your requirement
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-28">
            {headings.length > 0 ? (
              <div className="rounded-3xl border border-line bg-paper p-6">
                <p className="text-xs font-bold tracking-wider text-navy-700 uppercase">In this article</p>
                <nav aria-label="Article sections" className="mt-3">
                  <ul className="space-y-2">
                    {headings.map((heading, index) => (
                      <li key={heading} className="flex gap-2 text-sm leading-snug text-muted">
                        <span className="font-display text-[0.68rem] font-bold text-orange-600">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {heading}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ) : null}

            <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
              <p className="eyebrow">Need a tutor?</p>
              <h2 className="mt-3 text-xl font-bold text-navy-900">
                Share the class and subject
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                We will discuss the requirement and tell you honestly what is currently available.
              </p>
              <Button href="/find-a-home-tutor" className="mt-5 w-full">
                Find a Home Tutor
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href="/how-it-works" variant="outline" className="mt-2.5 w-full">
                How it works
              </Button>
            </div>

            {related.length > 0 ? (
              <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
                <p className="text-xs font-bold tracking-wider text-navy-700 uppercase">
                  Related reading
                </p>
                <ul className="mt-4 space-y-4">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/blog/${item.slug}`}
                        className="text-sm font-semibold leading-snug text-navy-900 hover:text-royal-700"
                      >
                        {item.title}
                      </Link>
                      <p className="mt-1 text-[0.68rem] text-muted">{item.readingTime}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      <CtaPanel
        eyebrow="From reading to action"
        title="Talk through your child's situation"
        description="Every child's gap is different. Tell us the class, board, subjects and locality, and we can discuss a suitable next step."
        actions={
          <>
            <Button href="/find-a-home-tutor" size="lg">
              Request a Home Tutor
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/blog" variant="white" size="lg">
              More articles
            </Button>
          </>
        }
        points={[
          "No payment needed to enquire",
          "Demo where a suitable tutor is available",
          "Tutor options depend on availability",
          "Transparent one-time commission",
        ]}
      />

      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: `${post.date}T00:00:00+05:30`,
            dateModified: `${post.date}T00:00:00+05:30`,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": absoluteUrl(`/blog/${post.slug}`),
            },
            author: {
              "@type": "Organization",
              name: siteConfig.name,
              url: absoluteUrl("/"),
            },
            publisher: { "@id": `${absoluteUrl("/")}#organization` },
            image: [absoluteUrl("/opengraph-image")],
            articleSection: post.category,
            inLanguage: "en-IN",
          },
        ]}
      />
    </>
  );
}
