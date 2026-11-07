"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Lock,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  CheckboxField,
  Field,
  FileField,
  Input,
  OptionChips,
  Select,
} from "@/components/forms/Fields";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  AVAILABLE_DAYS,
  BOARDS,
  EXPERIENCE_LEVELS,
  QUALIFICATIONS,
  STUDENT_CLASSES,
  SUBJECTS,
  TUTOR_GENDER_OPTIONS,
} from "@/lib/content";
import {
  tutorApplicationDefaults,
  tutorApplicationSchema,
  zodToFieldErrors,
  type FieldErrors,
  type TutorApplication,
} from "@/lib/validation";
import { buildTutorApplicationMessage } from "@/lib/whatsapp";
import { contactHelp, siteConfig, hasPhone, hasWhatsapp, telHref, whatsappHref } from "@/lib/config";
import {
  MAX_DOCUMENTS,
  validateDocumentList,
  validateDocumentMeta,
} from "@/lib/documents";
import type { ApiFailure, ApiSuccess } from "@/types";

type Outcome = {
  reference: string;
  storage: ApiSuccess["storage"];
  documentsStored: number;
  submitted: TutorApplication;
};

function GroupHeading({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
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

export function TutorApplicationForm() {
  const [values, setValues] = useState<TutorApplication>({ ...tutorApplicationDefaults });
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof TutorApplication,>(key: K, value: TutorApplication[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }));
  };

  const toggleArray = (
    key: "subjects" | "classes" | "boards" | "availableDays",
    value: string,
  ) => {
    setValues((previous) => {
      const list = previous[key] as string[];
      const next = list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value];
      return { ...previous, [key]: next } as TutorApplication;
    });
  };

  const onFiles = (nextFiles: File[]) => {
    setFileError("");
    const merged = [...files];
    for (const file of nextFiles) {
      if (merged.length >= MAX_DOCUMENTS) {
        setFileError(`You can upload up to ${MAX_DOCUMENTS} documents.`);
        break;
      }
      if (merged.some((item) => item.name === file.name && item.size === file.size)) {
        continue;
      }
      const metaError = validateDocumentMeta(file);
      if (metaError) {
        setFileError(metaError);
        continue;
      }
      merged.push(file);
    }
    const listError = validateDocumentList(merged);
    setFiles(listError ? files : merged);
    if (listError) setFileError(listError);
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

    const parsed = tutorApplicationSchema.safeParse(values);
    const nextErrors = parsed.success ? {} : zodToFieldErrors(parsed.error);
    const documentsError = validateDocumentList(files);
    if (documentsError) setFileError(documentsError);

    if (!parsed.success || documentsError) {
      setErrors(nextErrors);
      const count = Object.keys(nextErrors).length + (documentsError ? 1 : 0);
      setFormMessage(
        count > 0
          ? `Please check ${count} highlighted item${count === 1 ? "" : "s"} before submitting.`
          : "Please review the form before submitting.",
      );
      if (Object.keys(nextErrors).length > 0) focusFirstError(nextErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});
    try {
      const formData = new FormData();
      formData.append("payload", JSON.stringify(parsed.data));
      for (const file of files) {
        formData.append("documents", file, file.name);
      }

      const response = await fetch("/api/tutor-applications", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json().catch(() => null)) as ApiSuccess | ApiFailure | null;

      if (!response.ok || !payload || payload.ok === false) {
        const failure = payload && payload.ok === false ? payload : null;
        if (failure?.errors) setErrors(failure.errors);
        setFormMessage(
          failure?.message ??
            `We could not submit the application just now. Please try again. ${contactHelp}`,
        );
        setSubmitting(false);
        alertRef.current?.focus();
        return;
      }

      setOutcome({
        reference: payload.reference,
        storage: payload.storage,
        documentsStored: payload.documentsStored ?? files.length,
        submitted: parsed.data,
      });
      setSubmitting(false);
      window.setTimeout(() => {
        document.getElementById("tutor-success")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    const message = buildTutorApplicationMessage(outcome.submitted, outcome.reference);
    return (
      <div
        id="tutor-success"
        role="status"
        aria-live="polite"
        className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-card sm:p-8"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-2xl font-bold text-navy-900">Application received</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {outcome.storage === "google_sheets"
            ? "Your application has been saved to the team's Google Sheet and is available for review."
            : outcome.storage === "supabase"
              ? "Your application has been saved and is available to our team for review."
              : "This development copy stored your application locally so the flow could be tested. In production it will be saved to the configured Google Sheet or database."}
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-paper px-4 py-3">
            <p className="text-[0.68rem] font-semibold tracking-wider text-muted uppercase">
              Reference
            </p>
            <p className="mt-1 font-display text-lg font-bold tracking-wide text-navy-900">
              {outcome.reference}
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-paper px-4 py-3">
            <p className="text-[0.68rem] font-semibold tracking-wider text-muted uppercase">
              Documents stored privately
            </p>
            <p className="mt-1 text-sm font-semibold text-navy-900">
              {outcome.documentsStored} {outcome.documentsStored === 1 ? "file" : "files"}
            </p>
          </div>
        </div>

        <p className="mt-4 rounded-xl border border-navy-100 bg-navy-50 px-4 py-3 text-xs leading-relaxed text-navy-800">
          <ShieldCheck className="mr-1 inline h-4 w-4 align-[-2px]" aria-hidden="true" />
          Uploaded documents are stored in private storage. They are not publicly accessible and
          are not displayed on any tutor profile.
        </p>

        <div className="mt-5">
          <p className="text-sm font-bold text-navy-900">What happens next</p>
          <ol className="mt-2 space-y-2 text-sm text-muted">
            <li className="flex gap-2.5">
              <span className="font-bold text-orange-600">1.</span>
              Our team reviews your subjects, classes, availability and documents.
            </li>
            <li className="flex gap-2.5">
              <span className="font-bold text-orange-600">2.</span>
              If there is a potential fit, we contact you for an interview and verification.
            </li>
            <li className="flex gap-2.5">
              <span className="font-bold text-orange-600">3.</span>
              Verified tutors are considered for suitable parent requirements.
            </li>
          </ol>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-muted">
          Registration does not mean automatic selection, verification or guaranteed work. You will
          be contacted if a suitable requirement matches your profile.
        </p>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          {hasWhatsapp ? (
            <Button href={whatsappHref(message)} variant="whatsapp" size="md">
              <WhatsAppIcon className="h-4 w-4" />
              Message us on WhatsApp
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
              setValues({ ...tutorApplicationDefaults });
              setFiles([]);
              setErrors({});
              setFileError("");
              setFormMessage("");
            }}
          >
            Submit another application
          </Button>
        </div>

        <p className="mt-4 text-[0.68rem] leading-relaxed text-muted">
          {hasWhatsapp
            ? "Your documents are never included in a WhatsApp link. "
            : ""}
          If we need anything else, we will tell you through the contact details you provided.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      id="tutor-application-form"
      onSubmit={onSubmit}
      noValidate
      aria-describedby={formMessage ? "tutor-form-message" : undefined}
      className="rounded-3xl border border-line bg-white p-5 shadow-card sm:p-7 lg:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
        <div>
          <Badge tone="orange">Tutor application</Badge>
          <h2 className="mt-3 text-2xl font-bold text-navy-900">Apply to become a home tutor</h2>
          <p className="mt-1.5 text-sm text-muted">
            Fields marked <span className="font-semibold text-orange-600">*</span> are required.
            Applications are reviewed personally.
          </p>
        </div>
        <Lock className="hidden h-10 w-10 text-navy-200 sm:block" aria-hidden="true" />
      </div>

      {formMessage ? (
        <div
          ref={alertRef}
          tabIndex={-1}
          id="tutor-form-message"
          role="alert"
          className="mt-5 flex items-start gap-3 rounded-xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger"
        >
          <AlertCircle className="mt-0.5 h-4.5 w-4.5 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold">Please review this</p>
            <p className="mt-0.5 text-xs leading-relaxed">{formMessage}</p>
            {hasWhatsapp ? (
              <a
                href={whatsappHref(buildTutorApplicationMessage(values))}
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
          <legend className="sr-only">Personal details</legend>
          <GroupHeading
            step="1"
            title="Personal details"
            description="How we can reach you about your application."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="fullName" label="Full name" required error={errors.fullName?.[0]}>
              <Input
                id="fullName"
                name="fullName"
                autoComplete="name"
                value={values.fullName}
                onChange={(event) => set("fullName", event.target.value)}
                invalid={Boolean(errors.fullName)}
                error={errors.fullName?.[0]}
                placeholder="Your full name"
                maxLength={80}
              />
            </Field>
            <Field id="gender" label="Gender" required error={errors.gender?.[0]}>
              <Select
                id="gender"
                name="gender"
                value={values.gender}
                onChange={(event) => set("gender", event.target.value as TutorApplication["gender"])}
                invalid={Boolean(errors.gender)}
                error={errors.gender?.[0]}
              >
                {TUTOR_GENDER_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Field>
            <Field id="mobile" label="Mobile number" required error={errors.mobile?.[0]}>
              <Input
                id="mobile"
                name="mobile"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={values.mobile}
                onChange={(event) => set("mobile", event.target.value)}
                invalid={Boolean(errors.mobile)}
                error={errors.mobile?.[0]}
                placeholder="10-digit mobile number"
                maxLength={20}
              />
            </Field>
            <Field
              id="whatsapp"
              label="WhatsApp number"
              required
              hint="If different from your mobile"
              error={errors.whatsapp?.[0]}
            >
              <Input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                inputMode="tel"
                value={values.whatsapp}
                onChange={(event) => set("whatsapp", event.target.value)}
                invalid={Boolean(errors.whatsapp)}
                error={errors.whatsapp?.[0]}
                hint="If different from your mobile"
                placeholder="WhatsApp number"
                maxLength={20}
              />
            </Field>
            <Field id="email" label="Email address" required error={errors.email?.[0]} className="sm:col-span-2">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(event) => set("email", event.target.value)}
                invalid={Boolean(errors.email)}
                error={errors.email?.[0]}
                placeholder="you@example.com"
                maxLength={120}
              />
            </Field>
          </div>
        </fieldset>

        <fieldset className="border-t border-line pt-7">
          <legend className="sr-only">Professional information</legend>
          <GroupHeading
            step="2"
            title="Professional information"
            description="Your academic background and the subjects you can teach."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id="qualification"
              label="Highest qualification"
              required
              error={errors.qualification?.[0]}
            >
              <Select
                id="qualification"
                name="qualification"
                value={values.qualification}
                onChange={(event) => set("qualification", event.target.value as TutorApplication["qualification"])}
                invalid={Boolean(errors.qualification)}
                error={errors.qualification?.[0]}
              >
                {QUALIFICATIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Field>
            <Field
              id="college"
              label="College / university"
              required
              error={errors.college?.[0]}
            >
              <Input
                id="college"
                name="college"
                value={values.college}
                onChange={(event) => set("college", event.target.value)}
                invalid={Boolean(errors.college)}
                error={errors.college?.[0]}
                placeholder="Institution name"
                maxLength={150}
              />
            </Field>
            <Field
              id="experienceLevel"
              label="Teaching experience"
              required
              error={errors.experienceLevel?.[0]}
            >
              <Select
                id="experienceLevel"
                name="experienceLevel"
                value={values.experienceLevel}
                onChange={(event) => set("experienceLevel", event.target.value as TutorApplication["experienceLevel"])}
                invalid={Boolean(errors.experienceLevel)}
                error={errors.experienceLevel?.[0]}
              >
                {EXPERIENCE_LEVELS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Field>
            <Field
              id="experienceDetails"
              label="Experience details"
              hint="Optional"
              error={errors.experienceDetails?.[0]}
            >
              <Input
                id="experienceDetails"
                name="experienceDetails"
                value={values.experienceDetails}
                onChange={(event) => set("experienceDetails", event.target.value)}
                invalid={Boolean(errors.experienceDetails)}
                error={errors.experienceDetails?.[0]}
                placeholder="e.g., 3 years of home tuition"
                maxLength={800}
              />
            </Field>
            <div className="sm:col-span-2">
              <OptionChips
                name="subjects"
                legend="Subjects you can teach"
                required
                options={SUBJECTS}
                selected={values.subjects}
                onToggle={(value) => toggleArray("subjects", value)}
                error={errors.subjects?.[0]}
                hint="Select all that apply."
                columns="sm:grid-cols-2 lg:grid-cols-3"
              />
            </div>
            <div className="sm:col-span-2">
              <OptionChips
                name="classes"
                legend="Classes you can teach"
                required
                options={STUDENT_CLASSES}
                selected={values.classes}
                onToggle={(value) => toggleArray("classes", value)}
                error={errors.classes?.[0]}
                columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
              />
            </div>
            <div className="sm:col-span-2">
              <OptionChips
                name="boards"
                legend="Boards you are familiar with"
                required
                options={BOARDS.map((board) => board.name)}
                selected={values.boards}
                onToggle={(value) => toggleArray("boards", value)}
                error={errors.boards?.[0]}
                columns="sm:grid-cols-2 lg:grid-cols-3"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border-t border-line pt-7">
          <legend className="sr-only">Availability</legend>
          <GroupHeading
            step="3"
            title="Availability"
            description="Where and when you can teach, and your expected fee."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id="areas"
              label="Preferred teaching areas"
              required
              hint="Localities in Varanasi"
              error={errors.areas?.[0]}
              className="sm:col-span-2"
            >
              <Input
                id="areas"
                name="areas"
                value={values.areas}
                onChange={(event) => set("areas", event.target.value)}
                invalid={Boolean(errors.areas)}
                error={errors.areas?.[0]}
                hint="Localities in Varanasi"
                placeholder="e.g., localities or areas you can travel to"
                maxLength={250}
              />
            </Field>
            <div className="sm:col-span-2">
              <OptionChips
                name="availableDays"
                legend="Available days"
                required
                options={AVAILABLE_DAYS}
                selected={values.availableDays}
                onToggle={(value) => toggleArray("availableDays", value)}
                error={errors.availableDays?.[0]}
                columns="grid-cols-2 sm:grid-cols-4 lg:grid-cols-7"
              />
            </div>
            <Field
              id="preferredTimings"
              label="Preferred timings"
              required
              error={errors.preferredTimings?.[0]}
            >
              <Input
                id="preferredTimings"
                name="preferredTimings"
                value={values.preferredTimings}
                onChange={(event) => set("preferredTimings", event.target.value)}
                invalid={Boolean(errors.preferredTimings)}
                error={errors.preferredTimings?.[0]}
                placeholder="e.g., 4 PM – 8 PM"
                maxLength={150}
              />
            </Field>
            <Field
              id="expectedMonthlyFee"
              label="Expected monthly tuition fee"
              hint="Optional · in ₹"
              error={errors.expectedMonthlyFee?.[0]}
            >
              <Input
                id="expectedMonthlyFee"
                name="expectedMonthlyFee"
                inputMode="numeric"
                value={values.expectedMonthlyFee}
                onChange={(event) => set("expectedMonthlyFee", event.target.value.replace(/[^\d]/g, ""))}
                invalid={Boolean(errors.expectedMonthlyFee)}
                error={errors.expectedMonthlyFee?.[0]}
                hint="Optional · in ₹"
                placeholder="e.g., 3000"
                maxLength={8}
              />
            </Field>
          </div>
        </fieldset>

        <fieldset className="border-t border-line pt-7">
          <legend className="sr-only">Documents</legend>
          <GroupHeading
            step="4"
            title="Verification documents"
            description="Optional at application stage, but helpful for review."
          />
          <FileField
            key={`documents-${files.length}`}
            id="documents"
            label="Qualification certificate, experience certificate or identity document"
            hint="You may upload a degree/postgraduate certificate, B.Ed/D.El.Ed certificate, experience letter (if available) or a government-issued identity document where lawful. Files are stored privately."
            error={fileError || errors.documents?.[0]}
            files={files}
            onFiles={onFiles}
          />
          <div className="mt-4 rounded-2xl border border-navy-100 bg-navy-50/70 p-4 text-xs leading-relaxed text-navy-800">
            <p className="flex items-start gap-2 font-semibold">
              <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              Why we ask for documents
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
              <li>To review your qualification and teaching background.</li>
              <li>To carry out identity verification where lawful and necessary.</li>
              <li>
                Documents are stored in private storage, accessible only to authorised staff, and
                are never displayed on a public tutor profile.
              </li>
              <li>
                Do not upload Aadhaar numbers or documents in public areas. If an identity document
                is requested, share it only through the secure upload or an agreed private channel.
              </li>
            </ul>
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
          I consent to {siteConfig.name} storing and reviewing this application and any uploaded
          documents for tutor verification, as described in the{" "}
          <Link href="/privacy-policy" className="font-semibold text-navy-800 underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </CheckboxField>

        <CheckboxField
          id="declaration"
          checked={values.declaration}
          onChange={(checked) => set("declaration", checked)}
          error={errors.declaration?.[0]}
        >
          I confirm that the information provided is accurate, and I understand that registration
          does not guarantee selection, verification or work.
        </CheckboxField>

        <p className="text-[0.7rem] leading-relaxed text-muted">
          Applications are reviewed through identity, qualification, interview and reference checks
          where applicable. An application is not described as verified until those checks are
          complete. You can request access, correction or deletion of your data by contacting us.
        </p>

        <Button type="submit" size="lg" fullWidth disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Submitting application…
            </>
          ) : (
            <>
              Apply to Become a Home Tutor
              <Send className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>

        <p className="text-center text-[0.68rem] leading-relaxed text-muted">
          Prefer to ask a question first?{" "}
          {hasWhatsapp ? (
            <a
              href={whatsappHref(buildTutorApplicationMessage(values))}
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
