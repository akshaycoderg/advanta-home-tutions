import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Clock3,
  FileText,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  defaultWhatsappMessage,
  hasEmail,
  hasHours,
  hasPhone,
  hasWhatsapp,
  mailtoHref,
  siteConfig,
  telHref,
  whatsappHref,
} from "@/lib/config";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Advanta Home Tutions in Varanasi about a parent home tuition enquiry, tutor application, or privacy request. Website forms, phone, email or WhatsApp where configured.",
  path: "/contact",
  keywords: ["contact Advanta Home Tutions", "home tuition contact Varanasi"],
});

const enquiryRoutes = [
  {
    icon: Users,
    title: "For parents",
    description:
      "Request a home tutor for your child. Share the class, board, subjects, locality and preferred timing.",
    href: "/find-a-home-tutor",
    action: "Find a Home Tutor",
  },
  {
    icon: FileText,
    title: "For tutors",
    description:
      "Apply to join the tutor network. Share your qualifications, subjects, classes and availability.",
    href: "/become-a-tutor",
    action: "Become a Tutor",
  },
  {
    icon: ShieldCheck,
    title: "Privacy or data request",
    description:
      "Ask about access, correction or deletion of personal data you have shared with us.",
    href: hasEmail ? mailtoHref : "/privacy-policy#your-rights",
    action: hasEmail ? "Email us" : "Read your rights",
  },
];

const hasAnyDirectContact = hasPhone || hasWhatsapp || hasEmail;

export default function ContactPage() {
  const crumbs = [{ label: "Contact Us" }];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            A real conversation, <span className="text-orange-300">not a call centre</span>
          </>
        }
        description={
          <p>
            Ask about a parent enquiry, a tutor application or how the process works. Use the
            website forms or whichever direct channel is available below.
          </p>
        }
        crumbs={crumbs}
        actions={
          <>
            <Button href="/find-a-home-tutor" size="lg">
              Parent enquiry
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/become-a-tutor" variant="white" size="lg">
              Tutor application
            </Button>
          </>
        }
        aside={
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur">
            <p className="eyebrow text-orange-300">Location</p>
            <p className="mt-3 flex items-start gap-2.5 text-sm font-semibold text-white">
              <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-orange-300" aria-hidden="true" />
              {siteConfig.location.city}, {siteConfig.location.state}, {siteConfig.location.country}
            </p>
            <p className="mt-2 pl-7 text-xs leading-relaxed text-navy-200">
              Home-based agency. There is no public walk-in office or map pin to visit.
            </p>
            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="text-xs leading-relaxed text-navy-200">
                <span className="font-semibold text-white">Response times:</span> enquiries are
                handled in the order received. Timing varies with enquiry volume and tutor
                availability, so no fixed response time is guaranteed.
              </p>
            </div>
          </div>
        }
      />

      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Ways to reach us</p>
            <h2 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">
              Choose the route that fits
            </h2>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">
              The website forms are the most reliable way to share detailed requirements. Direct
              contact details are shown only when configured and available.
            </p>
          </div>

          {!hasAnyDirectContact ? (
            <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-orange-200 bg-orange-50 p-6 text-center sm:p-8">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-orange-600 shadow-sm">
                <Clock3 className="h-5.5 w-5.5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-xl font-bold text-orange-950">
                Direct contact details are being finalised
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-orange-900">
                A phone number, WhatsApp number and email address have not been published yet. You
                can review the enquiry forms, but online submissions cannot be saved until the
                website&apos;s lead storage is connected. Please check back, or use any direct contact
                details once they appear here.
              </p>
              <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">
                <Button href="/find-a-home-tutor">
                  Parent enquiry
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button href="/become-a-tutor" variant="outline">
                  Tutor application
                </Button>
              </div>
            </div>
          ) : (
            <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {hasPhone ? (
                <a
                  href={telHref}
                  className="card-hover rounded-3xl border border-line bg-paper p-6 text-center shadow-card"
                >
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-navy-700 shadow-sm">
                    <Phone className="h-5.5 w-5.5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-navy-900">Call</h3>
                  <p className="mt-1.5 text-sm break-all text-muted">{siteConfig.contact.phone}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-royal-700">
                    Call now
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </a>
              ) : null}

              {hasWhatsapp ? (
                <a
                  href={whatsappHref(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-hover rounded-3xl border border-line bg-paper p-6 text-center shadow-card"
                >
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#128C4A] text-white shadow-sm">
                    <WhatsAppIcon className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-navy-900">WhatsApp</h3>
                  <p className="mt-1.5 text-sm break-all text-muted">
                    {siteConfig.contact.whatsapp}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-royal-700">
                    Start a chat
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </a>
              ) : null}

              {hasEmail ? (
                <a
                  href={mailtoHref}
                  className="card-hover rounded-3xl border border-line bg-paper p-6 text-center shadow-card"
                >
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-navy-700 shadow-sm">
                    <Mail className="h-5.5 w-5.5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-navy-900">Email</h3>
                  <p className="mt-1.5 text-sm break-all text-muted">{siteConfig.contact.email}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-royal-700">
                    Send an email
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </a>
              ) : null}
            </div>
          )}

          {hasHours ? (
            <p className="mt-6 text-center text-sm text-muted">
              <span className="font-semibold text-navy-800">Business hours:</span> {siteConfig.hours}
            </p>
          ) : null}
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="container-page">
          <div className="grid gap-5 md:grid-cols-3">
            {enquiryRoutes.map((route) => (
              <article
                key={route.title}
                className="flex flex-col rounded-3xl border border-line bg-white p-6 shadow-card"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-royal-50 text-royal-700">
                  <route.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 text-lg font-bold text-navy-900">{route.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{route.description}</p>
                <Button href={route.href} variant="outline" size="sm" className="mt-5 w-full">
                  {route.action}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-navy-100 bg-navy-50/70 p-5 text-sm leading-relaxed text-navy-800">
            <p className="flex items-start gap-2.5">
              <MessageCircle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-navy-700" aria-hidden="true" />
              <span>
                <span className="font-bold">Please do not send identity documents by WhatsApp or email.</span>{" "}
                If a document is needed for tutor verification, use the secure upload in the tutor
                application form or the private channel we confirm with you. Never send an Aadhaar
                number to a public or unverified contact.
              </span>
            </p>
          </div>

          <div className="mt-5 rounded-2xl border border-line bg-white p-5 text-xs leading-relaxed text-muted">
            <p>
              <span className="font-bold text-navy-800">Privacy requests:</span> you can ask about
              access, correction or deletion of the personal data you have shared. If an email is
              configured, use the address above; otherwise read the{" "}
              <Link href="/privacy-policy" className="font-semibold text-royal-700 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for the current contact route. A dedicated privacy contact will be published once the
              business details are confirmed.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-line bg-paper p-6 sm:p-8">
            <Badge tone="sky">Before you contact us</Badge>
            <h2 className="mt-4 text-2xl font-bold text-navy-900">Helpful details to include</h2>
            <ul className="mt-5 space-y-3 text-sm text-navy-800">
              {[
                "For parents: class, board, subjects, locality and preferred timing.",
                "For tutors: subjects, classes, boards, areas and available days.",
                "For privacy requests: the reference number from your enquiry or application.",
                "For any issue: a short description and the best way to reach you.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-line bg-paper p-6 sm:p-8">
            <Badge tone="orange">A note on WhatsApp</Badge>
            <h2 className="mt-4 text-2xl font-bold text-navy-900">You stay in control</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              WhatsApp links on this site open only when you choose to tap them. We do not
              automatically message you, add you to a group or publish your number. The pre-filled
              message deliberately leaves out your full home address.
            </p>
            <Link
              href="/privacy-policy#whatsapp"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-royal-700 hover:text-royal-800"
            >
              Read the WhatsApp privacy note
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
