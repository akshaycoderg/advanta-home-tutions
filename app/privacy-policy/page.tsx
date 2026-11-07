import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_LAST_UPDATED } from "@/lib/content";
import {
  hasEmail,
  hasWhatsapp,
  mailtoHref,
  siteConfig,
} from "@/lib/config";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Advanta Home Tutions handles parent enquiry details, tutor application data and private verification documents, and how to make a privacy request.",
  path: "/privacy-policy",
  keywords: ["privacy policy", "tutor document privacy", "home tuition data protection"],
});

const sections = [
  { id: "who-we-are", label: "Who we are" },
  { id: "information-we-collect", label: "Information we collect" },
  { id: "documents", label: "Tutor documents" },
  { id: "how-we-use", label: "How we use information" },
  { id: "legal-basis", label: "Legal basis & consent" },
  { id: "sharing", label: "When information is shared" },
  { id: "whatsapp", label: "WhatsApp links" },
  { id: "cookies", label: "Cookies & logs" },
  { id: "retention", label: "Retention" },
  { id: "security", label: "Security" },
  { id: "children", label: "Children's data" },
  { id: "your-rights", label: "Your rights" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPolicyPage() {
  const crumbs = [{ label: "Privacy Policy" }];

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={
          <p>
            How we handle the details parents and tutors share with us — including private
            verification documents. Written in plain language, without hiding the important parts.
          </p>
        }
        crumbs={crumbs}
        actions={
          <Button href="#your-rights" variant="white" size="lg">
            Your privacy rights
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        }
      />

      <section className="section-pad bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <div className="rounded-2xl border border-line bg-paper p-5">
              <p className="text-xs font-bold tracking-wider text-navy-700 uppercase">On this page</p>
              <nav aria-label="Privacy policy sections" className="mt-3">
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
                <ShieldCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-navy-700" aria-hidden="true" />
                <span>
                  <span className="font-bold">Summary:</span> we collect what is needed to respond
                  to a home tuition enquiry, review a tutor application and arrange a placement. We
                  do not sell personal information. Tutor documents are stored privately and are
                  never shown on a public profile. You can ask about access, correction or deletion.
                </span>
              </p>
            </div>

            <div className="content-prose mt-8">
              <h2 id="who-we-are">1. Who we are</h2>
              <p>
                {siteConfig.name} is a home tuition agency based in {siteConfig.location.city},{" "}
                {siteConfig.location.state}, {siteConfig.location.country}. It is a home-based
                business; there is no public walk-in office. In this policy, “we”, “us” and “our”
                refer to {siteConfig.name}.
              </p>
              <p>
                The formal legal entity name, registered address and dedicated privacy contact are
                being finalised. When confirmed, they will be published here. Until then, privacy
                requests can be made through the route described in section 14.
              </p>

              <h2 id="information-we-collect">2. Information we collect</h2>
              <p>We collect information you choose to submit through the website forms.</p>
              <h3>Parent enquiry form</h3>
              <ul>
                <li>Parent or guardian name, mobile number and optional email address.</li>
                <li>Student&apos;s name, class, education board and requested subjects.</li>
                <li>Tutor gender preference, if you provide one.</li>
                <li>Locality, full tuition address and preferred timing.</li>
                <li>
                  Optional academic challenges, additional requirements and any comments you add.
                </li>
                <li>Your consent to be contacted and the date and time consent was recorded.</li>
              </ul>
              <h3>Tutor application form</h3>
              <ul>
                <li>Name, gender, mobile number, WhatsApp number and email address.</li>
                <li>
                  Highest qualification, college or university, teaching experience and experience
                  details.
                </li>
                <li>Subjects, classes, boards, preferred teaching areas and available days.</li>
                <li>Preferred timings and optional expected monthly fee.</li>
                <li>Consent, declaration and the date and time they were recorded.</li>
                <li>Optional verification documents (see section 3).</li>
              </ul>
              <h3>Technical information</h3>
              <p>
                Like most websites, the hosting infrastructure may process basic technical logs such
                as the request time, browser type, requested page and IP address for security,
                diagnostics and abuse prevention. We do not use those logs to build advertising
                profiles.
              </p>

              <h2 id="documents">3. Tutor documents and sensitive information</h2>
              <p>
                Uploading documents at application stage is optional, but they help with
                verification. Depending on the application, we may ask for a qualification
                certificate, an experience certificate if available, and an identity document where
                lawful and necessary.
              </p>
              <div className="rounded-2xl border border-line bg-paper p-5 not-prose">
                <p className="text-sm font-bold text-navy-900">How documents are handled</p>
                <ul className="mt-3 grid list-none gap-2.5 pl-0 text-sm text-muted">
                  {[
                    "Uploads are accepted only as PDF, JPG or PNG, up to 5 MB each and a maximum of three files.",
                    "The file type is checked on the server, including a magic-byte content check, not just the file name.",
                    "Files are stored in private storage with random file names — not in a public website folder.",
                    "Access is restricted to authorised staff who need the document for verification.",
                    "Documents are never displayed on a public tutor profile or included in a WhatsApp link.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <p>
                Please do not upload an Aadhaar document, Aadhaar number or other identity number
                unless it has been specifically requested through the secure process. Do not send
                identity documents by WhatsApp, social media or an unverified email address. If an
                identity document is requested, share it only through the secure upload or a private
                channel we confirm with you.
              </p>
              <p>
                Student information is provided by a parent or guardian. Please share only what is
                needed for tuition matching and scheduling. Do not include medical, financial or
                other sensitive details that are not relevant to the tuition arrangement.
              </p>

              <h2 id="how-we-use">4. How we use information</h2>
              <ul>
                <li>To respond to a parent enquiry and discuss the tuition requirement.</li>
                <li>To assess which available tutors may be suitable for the class, board, subject, area and schedule.</li>
                <li>To review tutor applications, conduct interviews and carry out verification checks where lawful and applicable.</li>
                <li>To arrange a demo and communicate about the next steps.</li>
                <li>To keep an internal record of the enquiry or application and its status.</li>
                <li>To protect the website and forms against spam, abuse and fraudulent submissions.</li>
                <li>To meet legal, tax, safety or regulatory obligations where they apply.</li>
              </ul>
              <p>
                We do not sell personal information. We do not use enquiry or application details to
                send unrelated marketing.
              </p>

              <h2 id="legal-basis">5. Legal basis and consent</h2>
              <p>
                We process enquiry and application information on the basis of your consent, given
                when you submit the relevant form. You may withdraw consent at any time by contacting
                us, subject to any legal or record-keeping obligations that may apply.
              </p>
              <p>
                Some processing may also be necessary to take steps at your request before a
                placement, to perform an agreed service, to comply with the law, or for legitimate
                safety and security purposes. Where consent is the basis, submitting a form is
                voluntary; however, we may not be able to respond to a request without the essential
                contact details.
              </p>

              <h2 id="sharing">6. When information is shared</h2>
              <p>Information is shared only as needed for the purposes described above:</p>
              <ul>
                <li>
                  <strong>With potential tutors:</strong> relevant details such as the student&apos;s
                  class, board, subjects, locality and preferred timing may be shared so a tutor can
                  assess the requirement. The full home address is shared only when necessary for
                  scheduling with a shortlisted or confirmed tutor.
                </li>
                <li>
                  <strong>With service providers:</strong> hosting, spreadsheet, database and
                  private storage providers may process data on our instructions. Access is
                  limited to what is needed to provide those services.
                </li>
                <li>
                  <strong>With WhatsApp or other linked services:</strong> only when you choose to
                  open a link or continue a conversation there. See section 7.
                </li>
                <li>
                  <strong>For legal reasons:</strong> where required by law, a valid legal request,
                  or to protect the safety and rights of a person.
                </li>
                <li>
                  <strong>In a business transfer:</strong> if the business is transferred or
                  reorganised, relevant records may be transferred subject to appropriate
                  confidentiality protections.
                </li>
              </ul>
              <p>We do not sell, rent or trade personal information.</p>

              <h2 id="whatsapp">7. WhatsApp links and external services</h2>
              <p>
                WhatsApp links on this website open only after you choose to tap them. We do not
                automatically message you, add you to a group or publish your number. The pre-filled
                message deliberately leaves out the student&apos;s full home address and never
                includes uploaded documents.
              </p>
              <p>
                WhatsApp is operated by Meta and has its own privacy terms. Information you send
                through WhatsApp is also handled under those terms. If you prefer not to use
                WhatsApp, use the website form or another available contact route.
              </p>
              {hasWhatsapp ? (
                <p>
                  A WhatsApp channel is currently configured. You can choose whether to use it; the
                  website does not start a conversation on your behalf.
                </p>
              ) : (
                <p>
                  No WhatsApp number is currently published. If a number is added later, this page
                  will be updated and the same user-initiated link behaviour will apply.
                </p>
              )}

              <h2 id="cookies">8. Cookies and technical logs</h2>
              <p>
                The current website does not set advertising cookies or use an analytics or
                behavioural-profiling service. Hosting and security infrastructure may process
                basic technical logs as described in section 2.
              </p>
              <p>
                If analytics or non-essential cookies are added in future, this policy will be
                updated and, where required, consent will be requested before non-essential cookies
                are set.
              </p>

              <h2 id="retention">9. How long information is kept</h2>
              <p>
                Enquiry records are kept while the enquiry is active and for a reasonable follow-up
                period so we can respond to questions or a later request. Tutor applications are
                kept while they are being reviewed and for a reasonable period afterwards in case a
                suitable requirement arises. Verification documents are kept only as long as needed
                for the review, any applicable verification record, or legal obligations.
              </p>
              <p>
                Retention periods are reviewed internally. Because the business is new and the
                formal retention schedule is still being documented, we do not publish a blanket
                number of years that would be inaccurate. You can ask us about the current retention
                status of your record and request deletion using section 14.
              </p>

              <h2 id="security">10. Security</h2>
              <p>
                We use reasonable technical and organisational measures, including encrypted
                transport (HTTPS), server-side validation, private document storage, restricted
                access to verification files and rate limiting on form submissions. Server secrets
                and database/webhook keys are kept server-side and are not exposed to the browser.
              </p>
              <p>
                No method of transmission or storage is perfectly secure. If you believe your
                information has been exposed, contact us promptly so it can be investigated.
              </p>

              <h2 id="children">11. Children&apos;s information</h2>
              <p>
                The service is arranged by a parent or guardian. Student information should be
                submitted by an adult responsible for the child. We use the student&apos;s name,
                class, subjects and scheduling details only for the tuition enquiry and placement.
                We do not knowingly collect personal information directly from a child or use it for
                marketing. A parent or guardian can request access, correction or deletion as set out
                below.
              </p>

              <h2 id="your-rights">12. Your rights and choices</h2>
              <p>
                Subject to applicable law, you may ask to access the personal information we hold
                about you, request correction of inaccurate details, request deletion, withdraw
                consent, or ask how your information has been used. You may also raise a concern
                about how a request has been handled.
              </p>
              <p>
                To make a request, include your name, the reference number from your enquiry or
                application if available, and the action you want. We may need to verify your
                identity before acting, so that one person cannot access another person&apos;s
                records.
              </p>

              <h2 id="changes">13. Changes to this policy</h2>
              <p>
                We may update this policy as the service, providers or legal requirements change.
                The updated version will be published on this page with a revised “last updated”
                date. If a change materially affects how existing information is used, we will take
                reasonable steps to inform affected people where we can.
              </p>

              <h2 id="contact">14. Contact us about privacy</h2>
              <p>
                For a privacy or data request, use the contact route below. Please do not send
                identity documents in the first message.
              </p>
              <div className="rounded-2xl border border-line bg-paper p-5 not-prose">
                <p className="text-sm font-bold text-navy-900">Privacy contact</p>
                {hasEmail ? (
                  <a
                    href={mailtoHref}
                    className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-royal-700 underline underline-offset-2"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    {siteConfig.contact.email}
                  </a>
                ) : (
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    A dedicated privacy email has not been published yet. Use the{" "}
                    <Link href="/contact" className="font-semibold text-royal-700 underline underline-offset-2">
                      contact page
                    </Link>{" "}
                    for the current route and mention “privacy request” in your message. The formal
                    privacy contact and legal entity details will be added here when confirmed.
                  </p>
                )}
              </div>

              <div className="mt-10 rounded-2xl border border-orange-200 bg-orange-50 p-5 not-prose">
                <Badge tone="orange">Related pages</Badge>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-orange-900">
                  <Link href="/terms-and-conditions" className="underline underline-offset-2">
                    Terms &amp; Conditions
                  </Link>
                  <Link href="/contact" className="underline underline-offset-2">
                    Contact Us
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
