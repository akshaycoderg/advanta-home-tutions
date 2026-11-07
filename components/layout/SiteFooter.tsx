import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { footerNav } from "@/lib/navigation";
import {
  defaultWhatsappMessage,
  hasEmail,
  hasHours,
  hasPhone,
  hasWhatsapp,
  mailtoHref,
  siteConfig,
  socialLinks,
  telHref,
  whatsappHref,
} from "@/lib/config";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="text-xs font-bold tracking-[0.18em] text-navy-200 uppercase">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link
              href={link.href}
              className="text-sm text-navy-100/85 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="container-page py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_2.6fr]">
          <div className="max-w-sm">
            <div className="inline-flex rounded-2xl bg-white p-3 shadow-soft">
              <Logo showTagline />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-navy-100/85">
              Personalised one-to-one home tuition in {siteConfig.location.city}, helping
              parents explore suitable tutor options for their child&apos;s class, board and
              subjects.
            </p>

            <address className="mt-6 space-y-3 text-sm not-italic">
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" aria-hidden="true" />
                <span>
                  {siteConfig.location.city}, {siteConfig.location.state}
                  <br />
                  {siteConfig.location.country}
                  <span className="mt-1 block text-xs text-navy-200/80">
                    Home-based agency · no walk-in office
                  </span>
                </span>
              </p>
              {hasPhone ? (
                <p>
                  <a href={telHref} className="inline-flex items-center gap-2.5 hover:text-white">
                    <Phone className="h-4 w-4 text-orange-300" aria-hidden="true" />
                    {siteConfig.contact.phone}
                  </a>
                </p>
              ) : null}
              {hasEmail ? (
                <p>
                  <a
                    href={mailtoHref}
                    className="inline-flex items-center gap-2.5 break-all hover:text-white"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-orange-300" aria-hidden="true" />
                    {siteConfig.contact.email}
                  </a>
                </p>
              ) : null}
              {hasWhatsapp ? (
                <p>
                  <a
                    href={whatsappHref(defaultWhatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 hover:text-white"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-[#4ade80]" />
                    WhatsApp: {siteConfig.contact.whatsapp}
                  </a>
                </p>
              ) : null}
              {hasHours ? (
                <p className="text-xs leading-relaxed text-navy-200">
                  <span className="font-semibold text-navy-100">Hours:</span> {siteConfig.hours}
                </p>
              ) : null}
            </address>

            {socialLinks.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-navy-100 transition-colors hover:border-white/30 hover:text-white"
                  >
                    {social.label}
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterColumn title="Explore" links={footerNav.explore} />
            <FooterColumn title="For Parents" links={footerNav.parents} />
            <FooterColumn title="For Tutors" links={footerNav.tutors} />
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="text-sm font-semibold text-white">
              Not sure where to start? Share your child&apos;s requirements.
            </p>
            <p className="mt-1 text-xs leading-relaxed text-navy-200">
              We will discuss the class, board, subjects and availability honestly.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 sm:mt-0 sm:shrink-0">
            <Link
              href="/find-a-home-tutor"
              className="inline-flex h-10 items-center rounded-full bg-orange-500 px-4 text-sm font-semibold text-navy-950 transition-colors hover:bg-orange-400"
            >
              Find a Tutor
            </Link>
            <Link
              href="/become-a-tutor"
              className="inline-flex h-10 items-center rounded-full border border-white/20 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Become a Tutor
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-navy-200/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-white">
              Terms &amp; Conditions
            </Link>
            <Link href="/faqs" className="hover:text-white">
              FAQs
            </Link>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-[0.7rem] leading-relaxed text-navy-200/60">
          {siteConfig.name} is a new home tuition agency in {siteConfig.location.city}. We are
          building our tutor network and do not claim an established customer base, verified
          results or guaranteed availability. Fees, commission terms and replacement
          arrangements are confirmed for each placement.
        </p>
      </div>
    </footer>
  );
}
