export type FaqItem = {
  question: string;
  answer: string;
  id: string;
};

export const parentFaqs: FaqItem[] = [
  {
    id: "what-is-home-tuition",
    question: "What is home tuition?",
    answer:
      "Home tuition is one-to-one teaching at the student's home. A tutor visits according to an agreed schedule and works on the school syllabus, concepts, homework and exam preparation. It is different from a coaching batch because the teaching is planned around one student.",
  },
  {
    id: "which-classes",
    question: "Which classes do you support?",
    answer:
      "We accept enquiries from Nursery to Class 12, including LKG and UKG. That covers early years, primary, middle, secondary and senior secondary classes. Tutor availability for a specific class depends on the subject, board, location and schedule.",
  },
  {
    id: "which-boards",
    question: "Which education boards do you cover?",
    answer:
      "Enquiries are welcome for CBSE, ICSE, UP Board, other state boards, and IB / Cambridge. Tutor availability varies by board and subject. We will tell you honestly if we do not currently have a suitable tutor for your board.",
  },
  {
    id: "which-subjects",
    question: "Which subjects are available?",
    answer:
      "We support Mathematics, Science, English, Physics, Chemistry, Biology, Hindi, Social Science, Commerce, Computer Science, Sanskrit and other school subjects. Availability depends on your subject, class, location and preferred schedule.",
  },
  {
    id: "one-to-one",
    question: "Do you provide one-to-one tuition?",
    answer:
      "Yes. The service is built around personalised one-to-one learning at home. We do not currently offer group or online batch classes through this website.",
  },
  {
    id: "tutor-gender",
    question: "Can parents choose male or female tutors?",
    answer:
      "You can share a preference for a male or female tutor, or say that you have no preference. We will look for suitable tutors who match. Gender preference is subject to availability and cannot be guaranteed.",
  },
  {
    id: "demo-class",
    question: "Is a demo class available?",
    answer:
      "A demo class may be arranged, subject to tutor availability and schedule. The demo is a chance to assess teaching style and rapport. It is not a guarantee of a particular outcome or of continued availability.",
  },
  {
    id: "tutor-selection",
    question: "How does tutor selection work?",
    answer:
      "You share your requirement, we discuss it with you, and we shortlist tutors based on availability. You receive relevant profiles, discuss the options with us, and choose whether to attend a demo. The final decision always remains with the parent.",
  },
  {
    id: "tutor-fees",
    question: "How much do home tutors charge?",
    answer:
      "An indicative range is approximately ₹2,000–₹5,000 per month. The actual fee depends on the class, subject, location, frequency of classes and tutor experience. The final monthly fee is agreed directly between the parent and the tutor. This range is not a guaranteed price.",
  },
  {
    id: "who-receives-fees",
    question: "Who receives the monthly tuition fee?",
    answer:
      "Monthly tuition fees are paid directly by the parent to the selected tutor. Advanta Home Tutions does not collect monthly tuition fees.",
  },
  {
    id: "placement-commission",
    question: "How does the placement commission work?",
    answer:
      "A one-time placement commission equivalent to one month's tuition fee applies. It is shared between the parent and the tutor, and the exact division is agreed before the placement is finalised. It becomes payable after a successful demo and the parent's confirmation. No assumed percentage is published because the terms are confirmed for each placement.",
  },
  {
    id: "tutor-leaves",
    question: "What happens if a tutor leaves?",
    answer:
      "A replacement may be arranged if an assigned tutor leaves within the period agreed for that particular placement. Replacement arrangements depend on the specific written agreement and on tutor availability. We do not advertise a universal replacement guarantee or a fixed number of days.",
  },
  {
    id: "response-time",
    question: "How soon will you respond to my enquiry?",
    answer:
      "We do not publish a fixed response time. Enquiries are handled in the order received, and timing varies with enquiry volume and tutor availability. You are welcome to follow up using the contact details published on the Contact page.",
  },
  {
    id: "areas-covered",
    question: "Which areas of Varanasi do you cover?",
    answer:
      "We accept enquiries from families across Varanasi, and actual coverage depends on tutor availability for your subject, class and preferred schedule. We do not publish a list of localities until there is genuine coverage. Share your locality and we will tell you what is possible.",
  },
];

export const tutorFaqs: FaqItem[] = [
  {
    id: "who-can-register",
    question: "Who can register as a home tutor?",
    answer:
      "We welcome applications from graduates, postgraduates, B.Ed and D.El.Ed / BTC qualified teachers, professionally experienced teachers, freshers and experienced home tutors. Subject knowledge, communication and reliability matter more than a single prescribed background.",
  },
  {
    id: "freshers",
    question: "Can freshers apply?",
    answer:
      "Yes. Freshers are welcome to apply. During the review we look at your subject confidence, ability to explain concepts and willingness to prepare. Registration does not guarantee work.",
  },
  {
    id: "registration-free",
    question: "Is registration free initially?",
    answer:
      "Applying through this website is free. If a placement is finalised, the one-time placement commission and its sharing arrangement are explained and agreed in advance. Do not pay anything before the terms are clear to you.",
  },
  {
    id: "documents",
    question: "Which documents are required?",
    answer:
      "You may be asked for your qualification certificate, a relevant experience certificate if available, and an identity document where lawful and necessary. Documents are requested for verification, stored privately and are never shown on a public tutor profile.",
  },
  {
    id: "review-process",
    question: "How are tutor applications reviewed?",
    answer:
      "Applications may go through identity verification, qualification review, a personal interview, reference checks and appropriate lawful screening. An application is not described as verified until the relevant checks have actually been completed.",
  },
  {
    id: "opportunities",
    question: "How are tuition opportunities shared?",
    answer:
      "When a parent requirement matches your subjects, classes, area and availability, we may contact you with the details. Opportunities are shared based on fit and availability. Registration does not guarantee a fixed number of classes or a minimum income.",
  },
  {
    id: "tutor-commission",
    question: "How does the placement commission work for tutors?",
    answer:
      "The one-time placement commission is equivalent to one month's tuition fee and is shared between the parent and the tutor. Your exact share and payment obligation are communicated and agreed before you accept a placement. The terms are not published as a fixed percentage because they are confirmed for each placement.",
  },
];

export const allFaqs = [...parentFaqs, ...tutorFaqs];

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
