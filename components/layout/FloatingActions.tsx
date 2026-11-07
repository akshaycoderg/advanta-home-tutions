import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import {
  defaultWhatsappMessage,
  hasPhone,
  hasWhatsapp,
  telHref,
  whatsappHref,
} from "@/lib/config";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function FloatingActions() {
  return (
    <>
      {hasWhatsapp ? (
        <a
          href={whatsappHref(defaultWhatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Advanta Home Tutions on WhatsApp"
          className="group fixed right-5 bottom-24 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#0f7440] text-white shadow-lift transition-transform hover:-translate-y-1 lg:flex lg:bottom-6"
        >
          <WhatsAppIcon className="h-7 w-7" />
          <span className="pointer-events-none absolute right-full mr-3 hidden rounded-lg bg-navy-900 px-3 py-2 text-xs font-semibold whitespace-nowrap text-white opacity-0 shadow-soft transition-opacity group-hover:opacity-100 lg:block">
            WhatsApp us
          </span>
        </a>
      ) : null}

      <div className="safe-bottom fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 px-3 pt-3 shadow-[0_-8px_30px_-18px_rgba(4,26,51,0.35)] backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-2">
          <Link
            href="/find-a-home-tutor"
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-orange-500 px-4 text-sm font-semibold text-navy-950 shadow-button transition-colors hover:bg-orange-400"
          >
            Find a Tutor
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {hasWhatsapp ? (
            <a
              href={whatsappHref(defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#0f7440] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#0b5f34]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          ) : hasPhone ? (
            <a
              href={telHref}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-navy-200 bg-white px-4 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-50"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Us
            </a>
          ) : (
            <Link
              href="/contact"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-navy-200 bg-white px-4 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-50"
            >
              Contact Us
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
