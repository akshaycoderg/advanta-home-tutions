"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { mainNav } from "@/lib/navigation";
import {
  hasPhone,
  hasWhatsapp,
  siteConfig,
  telHref,
  whatsappHref,
  defaultWhatsappMessage,
} from "@/lib/config";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function SiteHeader() {
  const pathname = usePathname();
  const [openAtPath, setOpenAtPath] = useState<string | null>(null);
  const open = openAtPath !== null && openAtPath === pathname;
  const [scrolled, setScrolled] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenAtPath(null);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 50);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      window.clearTimeout(focusTimer);
      previousFocus?.focus?.();
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b border-line/80 bg-white/95 backdrop-blur-md transition-shadow duration-200",
          scrolled && "shadow-[0_8px_30px_-18px_rgba(4,26,51,0.35)]",
        )}
      >
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-3 lg:h-20">
          <Logo />

          <nav aria-label="Main navigation" className="hidden items-center lg:flex">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-2.5 py-2 text-[0.8rem] font-semibold whitespace-nowrap transition-colors xl:px-3 xl:text-[0.84rem]",
                  isActive(item.href)
                    ? "text-navy-800"
                    : "text-navy-700/80 hover:bg-navy-50 hover:text-navy-900",
                )}
              >
                {item.label === "Classes & Subjects" ? (
                  <>
                    <span className="xl:hidden">Classes</span>
                    <span className="hidden xl:inline">Classes &amp; Subjects</span>
                  </>
                ) : item.label === "Find a Home Tutor" ? (
                  <>
                    <span className="xl:hidden">Find a Tutor</span>
                    <span className="hidden xl:inline">Find a Home Tutor</span>
                  </>
                ) : (
                  item.label
                )}
                {isActive(item.href) ? (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-orange-500" />
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button href="/find-a-home-tutor" size="sm" className="hidden lg:inline-flex">
              Find a Tutor
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpenAtPath(pathname)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open navigation menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-navy-800 transition-colors hover:bg-navy-50 lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-navy-950/55 backdrop-blur-[2px]"
            aria-label="Close navigation menu"
            onClick={() => setOpenAtPath(null)}
          />
          <div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="absolute inset-y-0 right-0 flex w-[min(88vw,22rem)] flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Logo />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpenAtPath(null)}
                aria-label="Close navigation menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-navy-800 transition-colors hover:bg-navy-50"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="space-y-1">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3 text-[0.95rem] font-semibold transition-colors",
                        isActive(item.href)
                          ? "bg-navy-50 text-navy-900"
                          : "text-navy-800 hover:bg-navy-50",
                      )}
                    >
                      {item.label}
                      <ArrowRight className="h-4 w-4 text-navy-300" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-5 space-y-3 border-t border-line pt-5">
                <Button href="/find-a-home-tutor" fullWidth>
                  Find a Home Tutor
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button href="/become-a-tutor" variant="outline" fullWidth>
                  Become a Tutor
                </Button>
              </div>
            </nav>

            <div className="safe-bottom border-t border-line bg-paper px-5 py-4">
              <p className="text-xs font-semibold tracking-wide text-navy-900 uppercase">
                {siteConfig.location.city}, {siteConfig.location.state}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Home-based agency. Enquiries by form, WhatsApp or phone.
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold">
                {hasPhone ? (
                  <a href={telHref} className="inline-flex items-center gap-1.5 text-navy-700">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call
                  </a>
                ) : null}
                {hasWhatsapp ? (
                  <a
                    href={whatsappHref(defaultWhatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#0f7440]"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    WhatsApp
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
