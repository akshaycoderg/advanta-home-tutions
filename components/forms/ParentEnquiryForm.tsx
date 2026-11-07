"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CheckboxField, Field, Input, OptionChips, Select, Textarea } from "@/components/forms/Fields";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  BOARDS,
  STUDENT_CLASSES,
  SUBJECTS,
  TUTOR_GENDERS,
} from "@/lib/content";
import { parentEnquiryDefaults, parentEnquirySchema, zodToFieldErrors, type FieldErrors, type ParentEnquiry } from "@/lib/validation";
import { buildParentEnquiryMessage } from "@/lib/whatsapp";
import { contactHelp, hasPhone, hasWhatsapp, siteConfig, telHref, whatsappHref } from "@/lib/config";
import type { ApiFailure, ApiSuccess } from "@/types";

type Outcome = {
  reference: string;
  storage: ApiSuccess["storage"];
  submitted: ParentEnquiry;
};

function GroupHeading({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-50 text-xs font-bold text-navy-700">
        {step}
      </span>
      <div>
        <h3 className="text-[1.02rem] font-bold text-navy-900">{title}</h3>
        <p className="mt-0.5 text-xs leading-relaxed text-muted">{description}</p>
      </div>
    </div>
  );
}

export function ParentEnquiryForm() {
  const [values, setValues] = useState<ParentEnquiry>({ ...parentEnquiryDefaults });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof ParentEnquiry,>(key: K, value: ParentEnquiry[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }));
  };

  const toggleSubject = (subject: string) => {
    const typed = subject as ParentEnquiry["subjects"][number];
    setValues((previous) => {
      if (previous.subjects.includes(typed)) {
        return { ...previous, subjects: previous.subjects.filter((item) => item !== typed) };
      }
      if (previous.subjects.length >= 6) return previous;
      return { ...previous, subjects: [...previous.subjects, typed] };
    });
  };

  const focusFirstError = (nextErrors: FieldErrors) => {
    const firstKey = Object.keys(nextErrors)[0];
    if (!firstKey) return;
    window.setTimeout(() => {
      const element = formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`);
      element?.focus();
      alertRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 30);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    setFormMessage("");

    const parsed = parentEnquirySchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors = zodToFieldErrors(parsed.error);
      setErrors(nextErrors);
      setFormMessage(
        `Please check ${Object.keys(nextErrors).length} highlighted field${Object.keys(nextErrors).length === 1 ? "" : "s"}.`,
      );
      focusFirstError(nextErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const payload = (await response.json().catch(() => null)) as ApiSuccess | ApiFailure | null;

      if (!response.ok || !payload || payload.ok === false) {
        const failure = payload && payload.ok === false ? payload : null;
        if (failure?.errors) setErrors(failure.errors);
        setFormMessage(
          failure?.message ??
            `We could not submit the enquiry just now. Please try again. ${contactHelp}`,
        );
        setSubmitting(false);
        alertRef.current?.focus();
        return;
      }

      setOutcome({
        reference: payload.reference,
        storage: payload.storage,
        submitted: parsed.data,
      });
      setSubmitting(false);
      window.setTimeout(() => {
        document.getElementById("enquiry-success")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    } catch {
      setSubmitting(false);
      setFormMessage(
        `We could not reach the server. Check your connection and try again. ${contactHelp}`,
      );
      alertRef.current?.focus();
    }
  };

  if (outcome) {
    const message = buildParentEnquiryMessage(outcome.submitted, outcome.reference);
    return (
      <div
        id="enquiry-success"
        role="status"
        aria-live="polite"
        className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-card sm:p-8"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-2xl font-bold text-navy-900">Enquiry received</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {outcome.storage === "google_sheets"
            ? "Your enquiry has been saved to the team's Google Sheet and is available to our team. We will contact you to discuss your child's requirements."
            : outcome.storage === "supabase"
              ? "Your enquiry has been saved and is available to our team. We will contact you to discuss your child's requirements."
              : "This development copy stored your enquiry locally so the flow could be tested. In production it will be saved to the configured Google Sheet or database."}
        </p>

        <div className="mt-5 rounded-2xl border border-line bg-paper px-4 py-3">
          <p className="text-[0.68rem] font-semibold tracking-wider text-muted uppercase">
            Your reference
          </p>
          <p className="mt-1 font-display text-lg font-bold tracking-wide text-navy-900">
            {outcome.reference}
          </p>
        </div>

        <div className="mt-5">
          <p className="text-sm font-bold text-navy-900">What happens next</p>
          <ol className="mt-2 space-y-2 text-sm text-muted">
            <li className="flex gap-2.5">
              <span className="font-bold text-orange-600">1.</span>
              We review the class, board, subjects and locality you shared.
            </li>
            <li className="flex gap-2.5">
              <span className="font-bold text-orange-600">2.</span>
              We contact you to understand the requirement and discuss tutor availability.
            </li>
            <li className="flex gap-2.5">
              <span className="font-bold text-orange-600">3.</span>
              If a suitable tutor is available, we share the profile and discuss a demo.
            </li>
          </ol>
        </div>

        <p className="mt-5 rounded-xl bg-navy-50 px-4 py-3 text-xs leading-relaxed text-navy-800">
          Enquiries are handled in the order received. Timing varies with enquiry volume and tutor
          availability, so no fixed response time is guaranteed.
        </p>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          {hasWhatsapp ? (
            <Button href={whatsappHref(message)} variant="whatsapp" size="md">
              <WhatsAppIcon className="h-4 w-4" />
              Send details on WhatsApp
            </Button>
          ) : null}
          {hasPhone ? (
            <Button href={telHref} variant="outline" size="md">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call us
            </Button>
          ) : null}
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={() => {
              setOutcome(null);
              setValues({ ...parentEnquiryDefaults });
              setErrors({});
              setFormMessage("");
            }}
          >
            Submit another enquiry
          </Button>
        </div>

        {hasWhatsapp ? (
          <p className="mt-4 flex items-start gap-1.5 text-[0.68rem] leading-relaxed text-muted">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            The WhatsApp message contains your class, board, subjects and locality. Your full home
            address is deliberately left out of the public link.
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      id="parent-enquiry-form"
      onSubmit={onSubmit}
      noValidate
      aria-describedby={formMessage ? "enquiry-form-message" : undefined}
      className="rounded-3xl border border-line bg-white p-5 shadow-card sm:p-7 lg:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
        <div>
          <Badge tone="orange">Parent enquiry</Badge>
          <h2 className="mt-3 text-2xl font-bold text-navy-900">Request a home tutor</h2>
          <p className="mt-1.5 text-sm text-muted">
            Fields marked <span className="font-semibold text-orange-600">*</span> are required.
            This usually takes 3–4 minutes.
          </p>
        </div>
        <ShieldCheck className="hidden h-10 w-10 text-navy-200 sm:block" aria-hidden="true" />
      </div>

      {formMessage ? (
        <div
          ref={alertRef}
          tabIndex={-1}
          id="enquiry-form-message"
          role="alert"
          className="mt-5 flex items-start gap-3 rounded-xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger"
        >
          <AlertCircle className="mt-0.5 h-4.5 w-4.5 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold">Please review this</p>
            <p className="mt-0.5 text-xs leading-relaxed">{formMessage}</p>
            {hasWhatsapp ? (
              <a
                href={whatsappHref(buildParentEnquiryMessage(values))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold underline underline-offset-2"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                Continue on WhatsApp instead
              </a>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="mt-6 space-y-8">
        <fieldset>
          <legend className="sr-only">Parent details</legend>
          <GroupHeading
            step="1"
            title="Parent details"
            description="So we know who to contact about this enquiry."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="parentName" label="Parent's name" required error={errors.parentName?.[0]}>
              <Input
                id="parentName"
                name="parentName"
                autoComplete="name"
                value={values.parentName}
                onChange={(event) => set("parentName", event.target.value)}
                invalid={Boolean(errors.parentName)}
                error={errors.parentName?.[0]}
                placeholder="e.g., Anjali Sharma"
                maxLength={80}
              />
            </Field>
            <Field
              id="parentPhone"
              label="Parent's mobile number"
              required
              hint="We will call or message this number."
              error={errors.parentPhone?.[0]}
            >
              <Input
                id="parentPhone"
                name="parentPhone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={values.parentPhone}
                onChange={(event) => set("parentPhone", event.target.value)}
                invalid={Boolean(errors.parentPhone)}
                error={errors.parentPhone?.[0]}
                hint="We will call or message this number."
                placeholder="10-digit mobile number"
                maxLength={20}
              />
            </Field>
            <Field
              id="parentEmail"
              label="Email address"
              hint="Optional"
              error={errors.parentEmail?.[0]}
              className="sm:col-span-2"
            >
              <Input
                id="parentEmail"
                name="parentEmail"
                type="email"
                autoComplete="email"
                value={values.parentEmail}
                onChange={(event) => set("parentEmail", event.target.value)}
                invalid={Boolean(errors.parentEmail)}
                error={errors.parentEmail?.[0]}
                placeholder="you@example.com"
                maxLength={120}
              />
            </Field>
          </div>
        </fieldset>

        <fieldset className="border-t border-line pt-7">
          <legend className="sr-only">Student details</legend>
          <GroupHeading
            step="2"
            title="Student details"
            description="The class, board and subjects help us judge tutor fit."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="studentName" label="Student's name" required error={errors.studentName?.[0]}>
              <Input
                id="studentName"
                name="studentName"
                autoComplete="off"
                value={values.studentName}
                onChange={(event) => set("studentName", event.target.value)}
                invalid={Boolean(errors.studentName)}
                error={errors.studentName?.[0]}
                placeholder="Student's first name"
                maxLength={80}
              />
            </Field>
            <Field id="studentClass" label="Class" required error={errors.studentClass?.[0]}>
              <Select
                id="studentClass"
                name="studentClass"
                value={values.studentClass}
                onChange={(event) => set("studentClass", event.target.value as ParentEnquiry["studentClass"])}
                invalid={Boolean(errors.studentClass)}
                error={errors.studentClass?.[0]}
              >
                {STUDENT_CLASSES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Field>
            <Field id="board" label="Education board" required error={errors.board?.[0]}>
              <Select
                id="board"
                name="board"
                value={values.board}
                onChange={(event) => set("board", event.target.value as ParentEnquiry["board"])}
                invalid={Boolean(errors.board)}
                error={errors.board?.[0]}
              >
                {BOARDS.map((board) => (
                  <option key={board.name} value={board.name}>
                    {board.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field
              id="tutorGender"
              label="Preferred tutor gender"
              hint="Subject to availability"
              error={errors.tutorGender?.[0]}
            >
              <Select
                id="tutorGender"
                name="tutorGender"
                value={values.tutorGender}
                onChange={(event) => set("tutorGender", event.target.value as ParentEnquiry["tutorGender"])}
                invalid={Boolean(errors.tutorGender)}
                error={errors.tutorGender?.[0]}
              >
                {TUTOR_GENDERS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Field>
            <div className="sm:col-span-2">
              <OptionChips
                name="subjects"
                legend="Subject(s) required"
                required
                options={SUBJECTS}
                selected={values.subjects}
                onToggle={toggleSubject}
                error={errors.subjects?.[0]}
                hint="Select up to 6 subjects."
                columns="sm:grid-cols-2 lg:grid-cols-3"
              />
            </div>
            <Field
              id="challenges"
              label="Current academic challenges"
              hint="Optional"
              error={errors.challenges?.[0]}
              className="sm:col-span-2"
            >
              <Textarea
                id="challenges"
                name="challenges"
                rows={3}
                value={values.challenges}
                onChange={(event) => set("challenges", event.target.value)}
                invalid={Boolean(errors.challenges)}
                error={errors.challenges?.[0]}
                placeholder="e.g., Needs help with Maths numericals and exam revision."
                maxLength={1200}
              />
            </Field>
          </div>
        </fieldset>

        <fieldset className="border-t border-line pt-7">
          <legend className="sr-only">Location and schedule</legend>
          <GroupHeading
            step="3"
            title="Location and schedule"
            description="Coverage and timing depend on tutor availability."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="locality" label="Locality / area" required error={errors.locality?.[0]}>
              <Input
                id="locality"
                name="locality"
                value={values.locality}
                onChange={(event) => set("locality", event.target.value)}
                invalid={Boolean(errors.locality)}
                error={errors.locality?.[0]}
                placeholder="e.g., Your locality in Varanasi"
                maxLength={100}
              />
            </Field>
            <Field
              id="preferredTiming"
              label="Preferred timing"
              required
              hint="Days and approximate time"
              error={errors.preferredTiming?.[0]}
            >
              <Input
                id="preferredTiming"
                name="preferredTiming"
                value={values.preferredTiming}
                onChange={(event) => set("preferredTiming", event.target.value)}
                invalid={Boolean(errors.preferredTiming)}
                error={errors.preferredTiming?.[0]}
                hint="Days and approximate time"
                placeholder="e.g., Weekdays after 5 PM"
                maxLength={120}
              />
            </Field>
            <Field
              id="address"
              label="Full address"
              required
              hint="Used for coverage checks and scheduling."
              error={errors.address?.[0]}
              className="sm:col-span-2"
            >
              <Textarea
                id="address"
                name="address"
                rows={3}
                value={values.address}
                onChange={(event) => set("address", event.target.value)}
                invalid={Boolean(errors.address)}
                error={errors.address?.[0]}
                hint="Used for coverage checks and scheduling."
                placeholder="House / flat, street, landmark, locality, Varanasi"
                maxLength={400}
              />
            </Field>
            <Field
              id="additionalRequirements"
              label="Additional requirements"
              hint="Optional"
              error={errors.additionalRequirements?.[0]}
              className="sm:col-span-2"
            >
              <Textarea
                id="additionalRequirements"
                name="additionalRequirements"
                rows={2}
                value={values.additionalRequirements}
                onChange={(event) => set("additionalRequirements", event.target.value)}
                invalid={Boolean(errors.additionalRequirements)}
                error={errors.additionalRequirements?.[0]}
                placeholder="Anything else we should know?"
                maxLength={1200}
              />
            </Field>
          </div>
        </fieldset>
      </div>

      <div className="mt-7 space-y-4 border-t border-line pt-6">
        <CheckboxField
          id="consent"
          checked={values.consent}
          onChange={(checked) => set("consent", checked)}
          error={errors.consent?.[0]}
        >
          I agree to be contacted by {siteConfig.name} about this enquiry. I have read the{" "}
          <Link href="/privacy-policy" className="font-semibold text-navy-800 underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </CheckboxField>

        <p className="text-[0.7rem] leading-relaxed text-muted">
          Your enquiry is submitted over a secure connection and is available only to authorised
          staff. We do not sell personal information. Full address details are not included in
          WhatsApp links.
        </p>

        <Button type="submit" size="lg" fullWidth disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending enquiry…
            </>
          ) : (
            <>
              Request a Home Tutor
              <Send className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>

        <p className="text-center text-[0.68rem] leading-relaxed text-muted">
          Prefer to talk first?{" "}
          {hasWhatsapp ? (
            <a
              href={whatsappHref(buildParentEnquiryMessage(values))}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-navy-800 underline underline-offset-2"
            >
              Message us on WhatsApp
            </a>
          ) : (
            <Link href="/contact" className="font-semibold text-navy-800 underline underline-offset-2">
              See contact options
            </Link>
          )}
          .
        </p>
      </div>

      {/* Honeypot: hidden from people, visible to naive bots. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="companyWebsite">Company website</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
          value={values.companyWebsite}
          onChange={(event) => set("companyWebsite", event.target.value)}
        />
      </div>
    </form>
  );
}
