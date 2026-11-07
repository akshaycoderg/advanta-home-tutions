import type { Metadata } from "next";
import { siteConfig, socialLinks, hasEmail, hasPhone } from "@/lib/config";
import { BOARDS, SUBJECTS } from "@/lib/content";
import type { Crumb } from "@/components/layout/Breadcrumbs";

export function absoluteUrl(path = "/"): string {
  try {
    return new URL(path, siteConfig.url).toString();
  } catch {
    return path;
  }
}

export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  return {
    title: absoluteTitle ? { absolute: fullTitle } : title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "en_IN",
      url: path,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — home tuition in ${siteConfig.location.city}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      ...crumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: crumb.label,
        item: absoluteUrl(crumb.href ?? "/"),
      })),
    ],
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    logo: absoluteUrl(siteConfig.logo.full),
    image: absoluteUrl(siteConfig.logo.stacked),
    slogan: siteConfig.tagline,
    areaServed: {
      "@type": "City",
      name: siteConfig.location.city,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: siteConfig.location.state,
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.state,
      addressCountry: "IN",
    },
    knowsAbout: [...SUBJECTS],
    ...(hasPhone || hasEmail
      ? {
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "customer service",
              areaServed: "IN",
              availableLanguage: ["en", "hi"],
              ...(hasPhone ? { telephone: siteConfig.contact.phone } : {}),
              ...(hasEmail ? { email: siteConfig.contact.email } : {}),
            },
          ],
        }
      : {}),
    ...(socialLinks.length > 0 ? { sameAs: socialLinks.map((item) => item.href) } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    url: absoluteUrl("/"),
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "en-IN",
    publisher: { "@id": `${absoluteUrl("/")}#organization` },
  };
}

export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl("/")}#home-tuition`,
    name: `Home tuition in ${siteConfig.location.city}`,
    description:
      "Personalised one-to-one home tuition for Nursery to Class 12 students across CBSE, ICSE, UP Board and other boards, subject to tutor availability.",
    serviceType: ["Home tuition", "Private tutoring", "One-to-one tuition"],
    provider: { "@id": `${absoluteUrl("/")}#organization` },
    areaServed: {
      "@type": "City",
      name: siteConfig.location.city,
    },
    audience: {
      "@type": "ParentAudience",
      geographicArea: {
        "@type": "City",
        name: siteConfig.location.city,
      },
    },
    category: [...BOARDS].map((board) => board.name).join(", "),
  };
}
