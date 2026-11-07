import type { ParentEnquiry, TutorApplication } from "@/lib/validation";
import { siteConfig } from "@/lib/config";

/**
 * WhatsApp messages intentionally exclude the student's full home address and
 * uploaded documents so that sensitive details are not placed in a public URL.
 */
export function buildParentEnquiryMessage(
  data: Pick<
    ParentEnquiry,
    | "parentName"
    | "studentName"
    | "studentClass"
    | "board"
    | "subjects"
    | "locality"
    | "preferredTiming"
    | "tutorGender"
  >,
  reference?: string,
): string {
  const lines = [
    `Hello ${siteConfig.name},`,
    "",
    reference
      ? `I have submitted a parent enquiry on your website (reference: ${reference}).`
      : "I would like to enquire about a home tutor in Varanasi.",
    "",
    `Parent: ${data.parentName}`,
    `Student: ${data.studentName}`,
    `Class: ${data.studentClass}`,
    `Board: ${data.board}`,
    `Subject(s): ${data.subjects.join(", ")}`,
    `Locality: ${data.locality}`,
    `Preferred timing: ${data.preferredTiming}`,
    `Tutor preference: ${data.tutorGender}`,
    "",
    "The full address can be shared with you directly for scheduling.",
  ];
  return lines.join("\n");
}

export function buildTutorApplicationMessage(
  data: Pick<
    TutorApplication,
    | "fullName"
    | "qualification"
    | "subjects"
    | "classes"
    | "boards"
    | "areas"
    | "availableDays"
    | "experienceLevel"
  >,
  reference?: string,
): string {
  const lines = [
    `Hello ${siteConfig.name},`,
    "",
    reference
      ? `I have submitted a tutor application on your website (reference: ${reference}).`
      : "I would like to apply as a home tutor in Varanasi.",
    "",
    `Name: ${data.fullName}`,
    `Qualification: ${data.qualification}`,
    `Experience: ${data.experienceLevel}`,
    `Subjects: ${data.subjects.join(", ")}`,
    `Classes: ${data.classes.join(", ")}`,
    `Boards: ${data.boards.join(", ")}`,
    `Areas: ${data.areas}`,
    `Available days: ${data.availableDays.join(", ")}`,
    "",
    "I understand that documents are shared only through the secure application process.",
  ];
  return lines.join("\n");
}
