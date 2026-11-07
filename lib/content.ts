export const CLASS_GROUPS = [
  {
    slug: "nursery-to-ukg",
    label: "Nursery to UKG",
    short: "Early years",
    description:
      "Early-years learning support focused on phonics, number sense, reading readiness and building a positive routine at home.",
    subjects: ["Early literacy", "Numbers & counting", "Rhymes & conversation", "Handwriting readiness"],
    focus: "Gentle, play-based support that keeps young learners engaged.",
  },
  {
    slug: "classes-1-5",
    label: "Classes 1–5",
    short: "Primary",
    description:
      "Foundational learning in core subjects, with attention to reading fluency, arithmetic and confident written expression.",
    subjects: ["Mathematics", "English", "Hindi", "Environmental Studies", "Computer basics"],
    focus: "Strong basics, regular practice and parent-visible progress.",
  },
  {
    slug: "classes-6-8",
    label: "Classes 6–8",
    short: "Middle school",
    description:
      "Concept building across school subjects as the syllabus widens, with support for homework, projects and exam preparation.",
    subjects: ["Mathematics", "Science", "English", "Hindi", "Social Science", "Sanskrit", "Computer Science"],
    focus: "Understanding concepts instead of memorising answers.",
  },
  {
    slug: "classes-9-10",
    label: "Classes 9–10",
    short: "Secondary",
    description:
      "Board-focused support for CBSE, ICSE and UP Board students, including chapter revision, numericals and answer-writing practice.",
    subjects: ["Mathematics", "Science", "English", "Social Science", "Hindi", "Sanskrit", "Computer Science"],
    focus: "Board syllabus coverage with structured revision.",
  },
  {
    slug: "classes-11-12",
    label: "Classes 11–12",
    short: "Senior secondary",
    description:
      "Subject-specialist support for Science, Commerce and Arts streams, including board exam preparation and concept clarity.",
    subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "English", "Accountancy", "Business Studies", "Economics", "Computer Science"],
    focus: "Subject-depth and exam-oriented practice.",
  },
] as const;

export const BOARDS = [
  {
    name: "CBSE",
    description: "Central Board of Secondary Education",
  },
  {
    name: "ICSE",
    description: "Council for the Indian School Certificate Examinations",
  },
  {
    name: "UP Board",
    description: "Uttar Pradesh Madhyamik Shiksha Parishad",
  },
  {
    name: "Other State Board",
    description: "State boards other than UP Board",
  },
  {
    name: "IB / Cambridge",
    description: "International Baccalaureate and Cambridge programmes",
  },
] as const;

export const SUBJECTS = [
  "Mathematics",
  "Science",
  "English",
  "Physics",
  "Chemistry",
  "Biology",
  "Hindi",
  "Social Science",
  "Commerce",
  "Computer Science",
  "Sanskrit",
  "Other school subjects",
] as const;

export const STUDENT_CLASSES = [
  "Nursery",
  "LKG",
  "UKG",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
] as const;

export const TUTOR_GENDERS = ["No preference", "Male tutor", "Female tutor"] as const;

export const TUTOR_GENDER_OPTIONS = ["Female", "Male", "Prefer not to say"] as const;

export const AVAILABLE_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const QUALIFICATIONS = [
  "Graduate",
  "Postgraduate",
  "B.Ed",
  "D.El.Ed / BTC",
  "Pursuing graduation",
  "Other",
] as const;

export const EXPERIENCE_LEVELS = [
  "Fresher",
  "Less than 1 year",
  "1–3 years",
  "3–5 years",
  "5+ years",
] as const;

export const BENEFITS = [
  {
    icon: "target",
    title: "Personalised tutor matching",
    description:
      "We start with your child's class, board, subjects and learning needs, then look for tutors who fit that brief.",
  },
  {
    icon: "home",
    title: "One-to-one learning at home",
    description:
      "Focused, individual attention in a familiar environment, without the distractions of a large batch.",
  },
  {
    icon: "book",
    title: "Multiple classes and subjects",
    description:
      "From early years through Class 12, across core school subjects and popular boards.",
  },
  {
    icon: "users",
    title: "Male and female tutor options",
    description:
      "Share your preference and we will look for suitable available tutors. Options depend on subject and area.",
  },
  {
    icon: "presentation",
    title: "Demo class",
    description:
      "Where a tutor is available, we can arrange a demo so you can judge the teaching style before deciding.",
  },
  {
    icon: "headset",
    title: "Direct parent support",
    description:
      "Talk to a real person about your requirements, the options shared and the next steps — no automated matching.",
  },
] as const;

export const HOW_IT_WORKS_FOUR = [
  {
    step: "01",
    title: "Share your requirements",
    description:
      "Tell us your child's class, board, subjects, locality and preferred timings using the enquiry form or WhatsApp.",
  },
  {
    step: "02",
    title: "We discuss the academic needs",
    description:
      "We personally go through the learning goals, current challenges and any tutor preference you have.",
  },
  {
    step: "03",
    title: "We share suitable tutor profiles",
    description:
      "Based on availability, we shortlist tutors who match the subject, class, area and schedule.",
  },
  {
    step: "04",
    title: "Attend a demo and choose",
    description:
      "Where available, a demo is arranged. You decide whether the tutor is right before confirming the placement.",
  },
] as const;

export const HOW_IT_WORKS_DETAILED = [
  {
    step: "01",
    title: "You contact Advanta Home Tutions",
    description:
      "Send a parent enquiry through the website, WhatsApp or a phone call. Share the class, board, subjects, locality and preferred timing.",
    parent: "Use the enquiry form or WhatsApp. No payment is needed to enquire.",
  },
  {
    step: "02",
    title: "We discuss your child's needs",
    description:
      "We ask about current academic challenges, the kind of support you want, any tutor gender preference and your schedule.",
    parent: "Be specific about the subject and the support you are looking for.",
  },
  {
    step: "03",
    title: "We look for suitable available tutors",
    description:
      "We check our available tutor network against your requirement. Availability varies by subject, class, board and area.",
    parent: "We will be clear if a suitable match is not currently available.",
  },
  {
    step: "04",
    title: "We share relevant tutor profiles",
    description:
      "You receive information about the shortlisted tutors, including qualification, subjects, experience and availability.",
    parent: "Ask questions about teaching style and experience before deciding.",
  },
  {
    step: "05",
    title: "You discuss the options with us",
    description:
      "We help you compare the options and clarify expectations. The final choice always remains with the parent.",
    parent: "No tutor is assigned automatically.",
  },
  {
    step: "06",
    title: "A demo class is arranged",
    description:
      "Where the tutor is available, we arrange a demo class. Demo availability is not guaranteed for every subject or schedule.",
    parent: "Use the demo to assess clarity, patience and rapport with your child.",
  },
  {
    step: "07",
    title: "You choose your preferred tutor",
    description:
      "After the demo, you confirm whether you would like to proceed with that tutor.",
    parent: "There is no obligation to continue if the match is not right.",
  },
  {
    step: "08",
    title: "Tuition and commission terms are confirmed",
    description:
      "The monthly tuition fee is agreed directly with the tutor. The one-time placement commission is discussed openly and agreed before the placement is finalised.",
    parent: "Commission terms are confirmed in writing before they become payable.",
  },
] as const;

export const TUTOR_ELIGIBILITY = [
  "Graduates",
  "Postgraduates",
  "B.Ed qualified teachers",
  "D.El.Ed / BTC qualified teachers",
  "Professionally experienced teachers",
  "Freshers",
  "Experienced home tutors",
] as const;

export const VERIFICATION_STEPS = [
  {
    title: "Identity verification",
    description:
      "We may ask for a government-issued identity document where lawful and necessary for verification.",
  },
  {
    title: "Qualification document review",
    description:
      "Certificates are reviewed to understand your academic and teaching background.",
  },
  {
    title: "Personal interview",
    description:
      "A conversation about your subjects, teaching approach, availability and expectations.",
  },
  {
    title: "Reference checks",
    description:
      "Where relevant, we may contact references you provide.",
  },
  {
    title: "Appropriate lawful screening",
    description:
      "Any further background checks are carried out only where lawful, relevant and with your knowledge.",
  },
] as const;

export const PARENT_COMMITMENTS = [
  {
    title: "Clear communication",
    description: "You will know what is available, what is not, and what happens next.",
  },
  {
    title: "No automatic assignment",
    description: "You review tutor profiles and choose whether to proceed after the demo.",
  },
  {
    title: "Transparent commission terms",
    description:
      "The one-time placement commission and how it is shared are agreed before placement.",
  },
  {
    title: "Fees paid to the tutor",
    description:
      "Monthly tuition fees are paid directly to the selected tutor. The agency does not collect them.",
  },
] as const;

export const COMMISSION_TERMS = [
  "The agency charges a one-time placement commission equivalent to one month's tuition fee.",
  "The commission is shared between the parent and the tutor. The exact division is agreed before the placement is finalised.",
  "The commission becomes payable after a successful demo and the parent's confirmation, according to the agreed terms.",
  "Monthly tuition fees are paid directly by the parent to the tutor.",
  "UPI and bank transfer are the expected payment methods. Exact details are confirmed with the agreed terms.",
  "Occasional parent discounts may be offered at the agency's discretion. They are not a standard entitlement.",
  "A replacement may be arranged if an assigned tutor leaves within the period agreed for that particular placement. Replacement terms depend on the specific written agreement.",
] as const;

export const TUTOR_FAQS_COUNT = 7;

export const SITE_LAST_UPDATED = "6 November 2026";
