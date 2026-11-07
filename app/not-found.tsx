import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Compass, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { mainNav } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="hero-surface relative overflow-hidden">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="container-page relative flex min-h-[65vh] flex-col items-center justify-center py-16 text-center sm:py-24">
        <span className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white bg-white text-royal-700 shadow-soft">
          <Compass className="h-7 w-7" aria-hidden="true" />
        </span>
        <p className="eyebrow mt-6">404</p>
        <h1 className="mt-3 max-w-2xl text-4xl leading-tight font-extrabold text-navy-950 sm:text-5xl">
          That page could not be found
        </h1>
        <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-muted">
          The link may be out of date, or the page may not exist yet. You can use the links below to
          get back to the main parts of the website.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button href="/" size="lg">
            <Home className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </Button>
          <Button href="/find-a-home-tutor" variant="outline" size="lg">
            Find a Home Tutor
          </Button>
        </div>

        <div className="mt-10 w-full max-w-2xl rounded-2xl border border-line bg-white p-5 text-left shadow-card sm:p-6">
          <p className="flex items-center gap-2 text-xs font-bold tracking-wider text-navy-700 uppercase">
            <Search className="h-4 w-4" aria-hidden="true" />
            Popular destinations
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {mainNav
              .filter((item) => item.href !== "/")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between gap-3 rounded-xl border border-line bg-paper px-4 py-3 text-sm font-semibold text-navy-800 transition-colors hover:border-navy-200 hover:bg-navy-50"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 text-navy-300" aria-hidden="true" />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
