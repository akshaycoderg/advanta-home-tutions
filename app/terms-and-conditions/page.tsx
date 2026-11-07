import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, FileText, Scale } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_LAST_UPDATED } from "@/lib/content";
import { siteConfig } from "@/lib/config";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "Terms for using the Advanta Home Tutions website, submitting enquiries and tutor applications, demo classes, tuition fees, the one-time placement commission and replacements.",
  path: "/terms-and-conditions",
  keywords: ["terms and conditions", "home tuition terms", "placement commission terms"],
});

const sections = [
  { id: "acceptance", label: "Using this website" },
  { id: "service", label: "The service" },
  { id: "availability", label: "Availability & no guarantee" },
  { id: "enquiries", label: "Parent enquiries" },
  { id: "applications", label: "Tutor applications" },
  { id: "verification", label: "Verification" },
  { id: "demo", label: "Demo classes" },
  { id: "fees", label: "Fees & commission" },
  { id: "replacement", label: "Replacement terms" },
  { id: "parent-obligations", label: "Parent responsibilities" },
  { id: "tutor-obligations", label: "Tutor responsibilities" },
  { id: "website-use", label: "Acceptable use" },
  { id: "liability", label: "Liability" },
  { id: "law", label: "Governing law" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  const crumbs = [{ label: "Terms & Conditions" }];

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description={
          <p>
            The basis on which this website may be used and how home tuition enquiries, tutor
            applications, demo classes, fees and placement terms are handled.
          </p>
        }
        crumbs={crumbs}
        actions={
          <Button href="#fees" variant="white" size="lg">
            Fees &amp; commission terms
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        }
      />

      <section className="section-pad bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <div className="rounded-2xl border border-line bg-paper p-5">
              <p className="text-xs font-bold tracking-wider text-navy-700 uppercase">On this page</p>
              <nav aria-label="Terms sections" className="mt-3">
                <ul className="space-y-1.5">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="block rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-white hover:text-navy-900"
                      >
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <p className="mt-4 border-t border-line pt-3 text-[0.68rem] leading-relaxed text-muted">
                Last updated: {SITE_LAST_UPDATED}
              </p>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="rounded-2xl border border-navy-100 bg-navy-50/70 p-5 text-sm leading-relaxed text-navy-800">
              <p className="flex items-start gap-2.5">
                <Scale className="mt-0.5 h-4.5 w-4.5 shrink-0 text-navy-700" aria-hidden="true" />
                <span>
                  <span className="font-bold">Read this alongside the Privacy Policy.</span> The
                  specific terms of a placement — including the exact commission split, schedule,
                  fee and replacement period — are confirmed in writing before the placement is
                  finalised. Where those written terms conflict with this general page, the
                  placement-specific written terms govern that placement.
                </span>
              </p>
            </div>

            <div className="content-prose mt-8">
              <h2 id="acceptance">1. Using this website</h2>
              <p>
                This website is operated for {siteConfig.name}, a home tuition agency based in{" "}
                {siteConfig.location.city}, {siteConfig.location.state}, India. By using the
                website, submitting a form or contacting us through a listed channel, you agree to
                these terms. If you do not agree, please do not use the forms.
              </p>
              <p>
                You must be at least 18 years old, or acting with the permission of a parent or
                guardian, to submit personal information through this website. Parent enquiries
                should be submitted by a parent, guardian or another responsible adult.
              </p>

              <h2 id="service">2. The service</h2>
              <p>
                {siteConfig.name} helps parents explore suitable one-to-one home tutors for their
                child&apos;s class, board and subjects. We accept enquiries, review tutor
                applications, discuss requirements, and may share relevant tutor profiles and
                arrange a demo where a suitable tutor is available.
              </p>
              <p>
                We are an introduction and coordination service. We do not operate a school,
                coaching centre or online classroom through this website. Tutors are independent
                service providers; nothing on this website creates an employment, partnership or
                agency relationship between a tutor and {siteConfig.name}, or between a parent and{" "}
                {siteConfig.name} beyond the placement terms agreed.
              </p>

              <h2 id="availability">3. Availability and no guarantee</h2>
              <p>
                Tutor availability varies by subject, class, board, locality, timing and the
                individual tutor&apos;s schedule. Submitting an enquiry or application does not
                guarantee:
              </p>
              <ul>
                <li>that a suitable tutor is available;</li>
                <li>that a demo can be arranged;</li>
                <li>that a placement will be offered or accepted;</li>
                <li>any particular academic result, score, rank or improvement; or</li>
                <li>a fixed number of classes, income or response time.</li>
              </ul>
              <p>
                We do not publish a fixed response time. Enquiries are handled in the order
                received, and timing varies with enquiry volume and tutor availability.
              </p>

              <h2 id="enquiries">4. Parent enquiries</h2>
              <p>
                Parent enquiries must include accurate and complete information to the best of your
                knowledge. You are responsible for ensuring that you have the authority to share the
                student&apos;s information. The full address is used for coverage and scheduling and
                is not included in the pre-filled WhatsApp message.
              </p>
              <p>
                An enquiry is not a booking or a contract for tuition. It is a request for us to
                discuss the requirement and check suitable options.
              </p>

              <h2 id="applications">5. Tutor applications</h2>
              <p>
                Tutor applicants must provide accurate information about qualifications,
                experience, subjects, classes, boards, areas and availability. You must not submit
                false documents or impersonate another person.
              </p>
              <p>
                Applying is free. Registration does not guarantee selection, verification, a
                placement, a fixed number of classes or a minimum income. We may decline or close an
                application at our discretion, including where information cannot be verified.
              </p>
              <p>
                Optional verification documents may be uploaded through the secure application
                process. Do not upload an Aadhaar document or identity number unless specifically
                requested through that secure process. Documents are handled as described in the{" "}
                <Link href="/privacy-policy#documents">Privacy Policy</Link>.
              </p>

              <h2 id="verification">6. Verification</h2>
              <p>
                Depending on the application and the requirement, our review may include identity
                verification, qualification review, a personal interview, reference checks and
                appropriate lawful screening. An application is not described as “verified” until
                the relevant checks have actually been completed.
              </p>
              <p>
                Verification reduces risk but cannot eliminate it. Parents should still make their
                own reasonable checks, discuss the schedule and expectations, and decide whether a
                tutor is suitable for their child.
              </p>

              <h2 id="demo">7. Demo classes</h2>
              <p>
                A demo class may be arranged where a suitable tutor is available and the
                schedule allows. A demo is not guaranteed. Attending a demo does not oblige a parent
                to proceed with the tutor, and it does not oblige us to offer a particular
                placement.
              </p>

              <h2 id="fees">8. Tuition fees and placement commission</h2>
              <p>
                An indicative monthly tuition range is approximately ₹
                {siteConfig.fees.min.toLocaleString("en-IN")}–₹
                {siteConfig.fees.max.toLocaleString("en-IN")}. This is indicative only. The final
                monthly fee depends on the class, subject, location, frequency of classes and tutor
                experience, and is agreed directly between the parent and the tutor.
              </p>
              <p>
                <strong>Monthly tuition fees are paid directly by the parent to the selected tutor.</strong>{" "}
                {siteConfig.name} does not collect monthly tuition fees.
              </p>
              <p>
                A one-time placement commission equivalent to one month&apos;s tuition fee applies.
                It is shared between the parent and the tutor. The exact division is agreed before
                the placement is finalised and is confirmed in writing. No fixed percentage is
                published on this website because the terms are confirmed for each placement.
              </p>
              <p>
                The commission becomes payable after a successful demo and the parent&apos;s
                confirmation, according to the agreed terms. UPI and bank transfer are the expected
                payment methods; exact payment details are confirmed with the agreed terms. Any
                occasional parent discount is offered at the agency&apos;s discretion and is not a
                standard entitlement.
              </p>

              <h2 id="replacement">9. Replacement terms</h2>
              <p>
                A replacement may be arranged if an assigned tutor leaves within the period agreed
                for that particular placement. Replacement arrangements depend on the specific
                written agreement and on tutor availability. We do not advertise a universal
                replacement guarantee or a fixed number of days because the terms depend on the
                individual placement.
              </p>

              <h2 id="parent-obligations">10. Parent responsibilities</h2>
              <ul>
                <li>Provide accurate class, board, subject, locality and scheduling information.</li>
                <li>Communicate changes to the schedule promptly and respectfully.</li>
                <li>Agree the fee, payment method and any placement terms with the tutor in writing.</li>
                <li>Provide a safe and appropriate learning environment for home classes.</li>
                <li>Do not ask a tutor to take on subjects, classes or hours outside the agreed scope without discussion.</li>
              </ul>

              <h2 id="tutor-obligations">11. Tutor responsibilities</h2>
              <ul>
                <li>Provide accurate qualifications, experience and availability information.</li>
                <li>Prepare for lessons and communicate progress honestly with the parent.</li>
                <li>Be punctual, respectful and maintain appropriate professional boundaries in a family home.</li>
                <li>Do not share a student&apos;s personal information or documents without permission.</li>
                <li>Do not collect fees or commission outside the agreed terms.</li>
              </ul>

              <h2 id="website-use">12. Acceptable use</h2>
              <p>
                You must not misuse the website, attempt to access restricted areas, upload malicious
                files, submit another person&apos;s information without authority, use the forms for
                spam, or interfere with the website&apos;s security or availability. We may restrict
                access or refuse submissions where misuse is suspected.
              </p>
              <p>
                Website content, branding, illustrations and original written material are provided
                for personal information and may not be republished commercially without permission.
                Third-party links are provided for convenience and are governed by their own terms.
              </p>

              <h2 id="liability">13. Liability</h2>
              <p>
                We take reasonable care in reviewing applications and communicating information, but
                we do not control a tutor&apos;s conduct, a parent&apos;s decisions or a
                student&apos;s academic outcomes. To the extent permitted by applicable law,{" "}
                {siteConfig.name} is not liable for indirect or consequential loss arising from a
                tuition arrangement, a tutor&apos;s acts or omissions, or reliance on general
                information on this website.
              </p>
              <p>
                Nothing in these terms excludes or limits any liability that cannot lawfully be
                excluded or limited. The specific written terms of a placement may include further
                provisions agreed by the parent and tutor.
              </p>

              <h2 id="law">14. Governing law and changes</h2>
              <p>
                These terms are governed by the laws of India. Any dispute arising from use of this
                website or the introduction service is subject to the jurisdiction of the competent
                courts at {siteConfig.location.city}, {siteConfig.location.state}, unless applicable
                law requires otherwise.
              </p>
              <p>
                We may update these terms as the service or legal requirements change. The revised
                version will be published here with a new “last updated” date. Continued use of the
                website after an update means you accept the revised terms.
              </p>

              <h2 id="contact">15. Contact</h2>
              <p>
                Questions about these terms can be sent through the{" "}
                <Link href="/contact">contact page</Link>. For privacy or data requests, use the
                route described in the <Link href="/privacy-policy#contact">Privacy Policy</Link>.
              </p>

              <div className="mt-10 rounded-2xl border border-orange-200 bg-orange-50 p-5">
                <Badge tone="orange">
                  <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                  Related pages
                </Badge>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-orange-900">
                  <Link href="/privacy-policy" className="underline underline-offset-2">
                    Privacy Policy
                  </Link>
                  <Link href="/how-it-works#fees" className="underline underline-offset-2">
                    Fees &amp; Commission
                  </Link>
                  <Link href="/faqs" className="underline underline-offset-2">
                    FAQs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
