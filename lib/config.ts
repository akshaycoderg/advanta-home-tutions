/**
 * Central business configuration.
 *
 * Everything an owner is likely to change lives here or in the environment
 * variables documented in `.env.example`. Missing details deliberately render
 * as honest "not yet available" states — never as invented information.
 */

/**
 * Read a public environment value.
 *
 * The `process.env.NEXT_PUBLIC_*` references below are deliberately written
 * out statically: Next.js only inlines those values into browser bundles when
 * it can see the exact property name. A dynamic `process.env[key]` lookup
 * would work on the server but silently become empty in the browser.
 */
const cleanEnv = (raw: string | undefined): string => {
  if (!raw) return "";
  const value = raw.trim();
  if (!value) return "";
  // Ignore example/placeholder values so they are never published by accident.
  if (/^(your[_-]|replace[_-]|todo|xxx|example)/i.test(value)) return "";
  return value;
};

const listEnv = (raw: string | undefined): string[] =>
  cleanEnv(raw)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const siteConfig = {
  name: "Advanta Home Tutions",
  shortName: "Advanta",
  legalName: "",
  tagline: "Your Child's Success, Our Commitment",
  description:
    "Personalised one-to-one home tuition in Varanasi. Advanta Home Tutions helps parents find suitable home tutors for their child's class, board and subjects.",
  url: cleanEnv(process.env.NEXT_PUBLIC_SITE_URL) || "http://localhost:3000",
  locale: "en_IN",
  logo: {
    mark: "/images/logo-mark.png",
    full: "/images/logo-full.png",
    stacked: "/images/logo-stacked.png",
  },
  contact: {
    phone: cleanEnv(process.env.NEXT_PUBLIC_BUSINESS_PHONE),
    whatsapp: cleanEnv(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
    email: cleanEnv(process.env.NEXT_PUBLIC_BUSINESS_EMAIL),
  },
  /** Free-text opening hours. Empty until the owner supplies them. */
  hours: cleanEnv(process.env.NEXT_PUBLIC_BUSINESS_HOURS),
  social: {
    instagram: cleanEnv(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    facebook: cleanEnv(process.env.NEXT_PUBLIC_FACEBOOK_URL),
    youtube: cleanEnv(process.env.NEXT_PUBLIC_YOUTUBE_URL),
    linkedin: cleanEnv(process.env.NEXT_PUBLIC_LINKEDIN_URL),
  },
  location: {
    city: "Varanasi",
    state: "Uttar Pradesh",
    country: "India",
    /** Only verified service areas should be published here. */
    areas: listEnv(process.env.NEXT_PUBLIC_SERVICE_AREAS),
  },
  fees: {
    min: 2000,
    max: 5000,
    currency: "INR",
    note: "Indicative monthly range. The final fee depends on class, subject, location and tutor experience, and is agreed directly with the tutor.",
  },
  brand: {
    navy: "#003F7E",
    royal: "#1559B7",
    orange: "#FE6F09",
    lightBlue: "#F1F6FD",
  },
} as const;

/** Digits-only phone number, used for `tel:` links. */
export const phoneDigits = siteConfig.contact.phone.replace(/[^\d+]/g, "");

/** Digits-only WhatsApp number (country code included, no `+`). */
export const whatsappDigits = siteConfig.contact.whatsapp.replace(/\D/g, "");

export const hasPhone = phoneDigits.replace(/\D/g, "").length >= 10;
export const hasWhatsapp = whatsappDigits.length >= 10;
export const hasEmail = Boolean(siteConfig.contact.email);
export const hasHours = Boolean(siteConfig.hours);

export const telHref = hasPhone ? `tel:${phoneDigits}` : "";
export const mailtoHref = hasEmail ? `mailto:${siteConfig.contact.email}` : "";

/**
 * Honest fallback sentence for error messages. It never points people at a
 * contact route that has not been configured.
 */
export const contactHelp = hasWhatsapp
  ? "Please contact us on WhatsApp."
  : hasEmail
    ? "Please contact us by email."
    : hasPhone
      ? "Please call us."
      : "Please check back later.";

/** Build a WhatsApp link only when a number is configured. */
export function whatsappHref(message?: string): string {
  if (!hasWhatsapp) return "";
  const base = `https://wa.me/${whatsappDigits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const socialLinks = (
  [
    ["Instagram", siteConfig.social.instagram],
    ["Facebook", siteConfig.social.facebook],
    ["YouTube", siteConfig.social.youtube],
    ["LinkedIn", siteConfig.social.linkedin],
  ] as const
)
  .filter(([, href]) => Boolean(href))
  .map(([label, href]) => ({ label, href }));

/** Homepage/evergreen WhatsApp message. */
export const defaultWhatsappMessage = `Hello ${siteConfig.name}, I would like to enquire about home tuition in ${siteConfig.location.city}.`;

export const fullAddressLine = `${siteConfig.location.city}, ${siteConfig.location.state}, ${siteConfig.location.country}`;
