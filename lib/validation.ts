import { z } from "zod";
import {
  AVAILABLE_DAYS,
  BOARDS,
  EXPERIENCE_LEVELS,
  QUALIFICATIONS,
  STUDENT_CLASSES,
  SUBJECTS,
  TUTOR_GENDERS,
  TUTOR_GENDER_OPTIONS,
} from "@/lib/content";

const BOARD_VALUES = BOARDS.map((board) => board.name) as [
  (typeof BOARDS)[number]["name"],
  ...(typeof BOARDS)[number]["name"][],
];

const phoneSchema = z
  .string()
  .trim()
  .min(10, "Enter your mobile number.")
  .max(20, "That mobile number looks too long.")
  .refine((value) => {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 15;
  }, "Enter a valid mobile number with 10–15 digits.");

const nameSchema = (label: string) =>
  z
    .string()
    .trim()
    .min(2, `Enter the ${label}.`)
    .max(80, `The ${label} is too long.`)
    .refine((value) => /^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u.test(value), `Enter a valid ${label}.`);

const optionalText = (max: number, message: string) =>
  z
    .string()
    .trim()
    .max(max, message)
    .optional()
    .transform((value) => value || "");

export const parentEnquirySchema = z.object({
  parentName: nameSchema("parent's name"),
  parentPhone: phoneSchema,
  parentEmail: z
    .string()
    .trim()
    .max(120, "That email address is too long.")
    .optional()
    .transform((value) => value || "")
    .refine((value) => value === "" || z.string().email().safeParse(value).success, "Enter a valid email address."),
  studentName: nameSchema("student's name"),
  studentClass: z.enum(STUDENT_CLASSES, { error: "Select the student's class." }),
  board: z.enum(BOARD_VALUES, { error: "Select the education board." }),
  subjects: z
    .array(z.enum(SUBJECTS))
    .min(1, "Select at least one subject.")
    .max(6, "Please select up to 6 subjects."),
  locality: z
    .string()
    .trim()
    .min(2, "Enter your locality or area.")
    .max(100, "That locality name is too long."),
  address: z
    .string()
    .trim()
    .min(10, "Enter the full tuition address.")
    .max(400, "That address is too long."),
  preferredTiming: z
    .string()
    .trim()
    .min(2, "Tell us your preferred timing.")
    .max(120, "That timing description is too long."),
  tutorGender: z.enum(TUTOR_GENDERS).default("No preference"),
  challenges: optionalText(1200, "Please keep this under 1,200 characters."),
  additionalRequirements: optionalText(1200, "Please keep this under 1,200 characters."),
  consent: z.boolean().refine((value) => value === true, {
    message: "Please confirm that you agree to be contacted about this enquiry.",
  }),
  /** Honeypot — must stay empty. */
  companyWebsite: z.string().max(0).optional().default(""),
});

export type ParentEnquiry = z.infer<typeof parentEnquirySchema>;

const multiSelect = (label: string) =>
  z
    .array(z.enum(SUBJECTS))
    .min(1, `Select at least one ${label}.`)
    .max(12, `Select up to 12 ${label}.`);

export const tutorApplicationSchema = z.object({
  fullName: nameSchema("full name"),
  mobile: phoneSchema,
  whatsapp: phoneSchema,
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .max(120, "That email address is too long.")
    .refine((value) => z.string().email().safeParse(value).success, "Enter a valid email address."),
  gender: z.enum(TUTOR_GENDER_OPTIONS, { error: "Select an option." }),
  qualification: z.enum(QUALIFICATIONS, { error: "Select your highest qualification." }),
  college: z
    .string()
    .trim()
    .min(2, "Enter your college or university.")
    .max(150, "That name is too long."),
  experienceLevel: z.enum(EXPERIENCE_LEVELS, { error: "Select your experience level." }),
  experienceDetails: optionalText(800, "Please keep this under 800 characters."),
  subjects: multiSelect("subject"),
  classes: z
    .array(z.enum(STUDENT_CLASSES))
    .min(1, "Select at least one class you can teach.")
    .max(15, "Select up to 15 classes."),
  boards: z
    .array(z.enum(BOARD_VALUES))
    .min(1, "Select at least one board you are familiar with.")
    .max(5, "Select up to 5 boards."),
  areas: z
    .string()
    .trim()
    .min(2, "Tell us where you can teach.")
    .max(250, "Please keep this under 250 characters."),
  availableDays: z
    .array(z.enum(AVAILABLE_DAYS))
    .min(1, "Select at least one available day.")
    .max(7, "Select up to 7 days."),
  preferredTimings: z
    .string()
    .trim()
    .min(2, "Enter your preferred teaching timings.")
    .max(150, "Please keep this under 150 characters."),
  expectedMonthlyFee: z
    .string()
    .trim()
    .max(8, "Enter a realistic monthly amount.")
    .refine(
      (value) => value === "" || (/^\d+$/.test(value) && Number(value) >= 500 && Number(value) <= 100000),
      "Enter a monthly fee between ₹500 and ₹1,00,000, or leave it blank.",
    ),
  consent: z.boolean().refine((value) => value === true, {
    message: "Please give consent to submit your application.",
  }),
  declaration: z.boolean().refine((value) => value === true, {
    message: "Please confirm that the information provided is accurate.",
  }),
  companyWebsite: z.string().max(0).optional().default(""),
});

export type TutorApplication = z.infer<typeof tutorApplicationSchema>;

export const parentEnquiryDefaults: ParentEnquiry = {
  parentName: "",
  parentPhone: "",
  parentEmail: "",
  studentName: "",
  studentClass: "Class 6",
  board: "CBSE",
  subjects: [],
  locality: "",
  address: "",
  preferredTiming: "",
  tutorGender: "No preference",
  challenges: "",
  additionalRequirements: "",
  consent: false,
  companyWebsite: "",
};

export const tutorApplicationDefaults: TutorApplication = {
  fullName: "",
  mobile: "",
  whatsapp: "",
  email: "",
  gender: "Prefer not to say",
  qualification: "Graduate",
  college: "",
  experienceLevel: "Fresher",
  experienceDetails: "",
  subjects: [],
  classes: [],
  boards: [],
  areas: "",
  availableDays: [],
  preferredTimings: "",
  expectedMonthlyFee: "",
  consent: false,
  declaration: false,
  companyWebsite: "",
};

export type FieldErrors = Record<string, string[]>;

export function zodToFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path.map(String).join(".") || "form";
    if (!errors[key]) errors[key] = [];
    errors[key].push(issue.message);
  }
  return errors;
}
