export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title: string; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: "For Parents" | "Study Support" | "Tutor Guidance";
  date: string;
  readingTime: string;
  blocks: PostBlock[];
};

/**
 * Original, evergreen content maintained in-repo. Add a post here and it
 * automatically appears on /blog, in the sitemap and on its own page.
 */
export const posts: BlogPost[] = [
  {
    slug: "how-to-choose-a-home-tutor-in-varanasi",
    title: "How to Choose the Right Home Tutor for Your Child in Varanasi",
    description:
      "A practical checklist for parents comparing home tutors in Varanasi — from clarifying the learning goal to using the demo class well.",
    category: "For Parents",
    date: "2026-10-22",
    readingTime: "7 min read",
    blocks: [
      {
        type: "p",
        text: "Finding a home tutor is not only about the subject. The right tutor needs to understand how your child learns, communicate clearly with you, and be reliable with the schedule. In a city like Varanasi, families have many options — school teachers, college students, coaching centres and agencies. A little preparation before you start comparing will make the decision much easier.",
      },
      {
        type: "h2",
        text: "Start with one clear learning goal",
      },
      {
        type: "p",
        text: "Before you speak to any tutor, write down what you actually want to change. It could be understanding a difficult chapter, finishing homework on time, building reading confidence, or preparing for board exams. A single clear goal helps you judge whether a tutor's approach fits.",
      },
      {
        type: "p",
        text: "Avoid the vague brief of 'teach everything'. If the need is broad, prioritise. For example: 'Class 9 CBSE Mathematics, with extra attention to geometry and regular practice papers.' That is far more useful to a tutor than a general request for tuition.",
      },
      {
        type: "h2",
        text: "Match the class and board, not just the subject name",
      },
      {
        type: "p",
        text: "A tutor who is excellent with primary students may not be the best fit for Class 12 Physics. CBSE, ICSE, UP Board and IB / Cambridge each have different assessment styles. Ask specifically which classes and boards the tutor has taught. Experience with the board matters, especially in Classes 9–12.",
      },
      {
        type: "h3",
        text: "Questions that reveal real fit",
      },
      {
        type: "ul",
        items: [
          "Which classes and boards have you taught recently?",
          "How do you plan a month of lessons for this subject?",
          "How do you check whether the student has actually understood a concept?",
          "How do you handle a student who is reluctant to study?",
          "What do you expect from parents between classes?",
        ],
      },
      {
        type: "h2",
        text: "Use the demo class as an assessment, not a formality",
      },
      {
        type: "p",
        text: "A demo is most useful when it is treated like a real lesson. Share one specific topic in advance. Observe how the tutor explains it, whether your child feels comfortable asking questions, and whether the tutor checks understanding rather than simply lecturing. Where a demo is available, it is also reasonable to discuss the proposed weekly schedule and homework expectations.",
      },
      {
        type: "callout",
        title: "Availability note",
        text: "A demo class is subject to tutor availability. Not every subject, class or locality will have a suitable tutor immediately. A transparent agency should tell you that clearly rather than promise an instant match.",
      },
      {
        type: "h2",
        text: "Be clear about money before classes begin",
      },
      {
        type: "p",
        text: "Ask for the monthly tuition fee, how many classes are included, what happens if a class is missed, and how fees are paid. For home tuition in Varanasi, an indicative range is around ₹2,000–₹5,000 per month, depending on class, subject, frequency, location and experience. Treat that as a starting point, not a fixed price.",
      },
      {
        type: "p",
        text: "If you use an agency, ask about any one-time placement commission separately. The monthly tuition fee is normally paid directly to the tutor. A commission should be explained in writing before a placement is confirmed. Do not agree to a vague 'extra charge' after the demo.",
      },
      {
        type: "h2",
        text: "Check reliability and safety",
      },
      {
        type: "p",
        text: "For a tutor visiting your home, punctuality and conduct matter as much as teaching. Confirm the schedule, the expected duration, and who will be present during classes. Ask whether identity and qualification documents have been reviewed. Keep communication in writing where possible. These are normal, reasonable checks — not a sign of distrust.",
      },
      {
        type: "h2",
        text: "A simple decision checklist",
      },
      {
        type: "ol",
        items: [
          "Define the subject, class, board and one main learning goal.",
          "Confirm the tutor's recent experience with that exact combination.",
          "Use the demo to judge explanation quality and rapport.",
          "Agree the schedule, fee, payment method and notice period in writing.",
          "Review progress after four to six weeks and adjust the plan if needed.",
        ],
      },
      {
        type: "p",
        text: "A good home tutor is a partner in your child's learning, not a replacement for school or parental involvement. If you would like help shortlisting suitable available tutors in Varanasi, share your requirements through our parent enquiry form. We will discuss the options honestly, including what is not currently available.",
      },
    ],
  },
  {
    slug: "class-10-board-exam-weekly-plan",
    title: "Class 10 Board Exam Preparation: A Simple Weekly Plan for Parents",
    description:
      "How parents can support a Class 10 student with a realistic weekly study plan across CBSE, ICSE or UP Board — without adding pressure.",
    category: "Study Support",
    date: "2026-10-08",
    readingTime: "6 min read",
    blocks: [
      {
        type: "p",
        text: "Class 10 is the first board year for most students, and the pressure often shows up at home before it shows up in marks. The aim of a weekly plan is not to fill every hour. It is to make study predictable, visible and manageable across all subjects.",
      },
      {
        type: "h2",
        text: "Begin with the syllabus, not the timetable",
      },
      {
        type: "p",
        text: "Download the current syllabus for your board and keep a simple subject-wise checklist. Split each subject into chapters, and mark three states: not started, revised once, and confident. This gives you an honest picture. Many students spend hours on the subject they like and avoid the one they fear. The checklist exposes that imbalance quickly.",
      },
      {
        type: "h2",
        text: "A realistic weekday structure",
      },
      {
        type: "p",
        text: "A weekday plan should fit around school, travel and rest. A practical template looks like this:",
      },
      {
        type: "ul",
        items: [
          "After school: 20–30 minutes of rest and a snack, no screens if possible.",
          "Block 1 (45 minutes): the most difficult subject or homework that needs concentration.",
          "Short break (10 minutes): walk, water, no scrolling.",
          "Block 2 (45 minutes): a second subject, preferably written practice.",
          "Evening: 20 minutes of revision from the previous day, then free time.",
        ],
      },
      {
        type: "p",
        text: "Two focused blocks are usually better than four distracted hours. Adjust the length for your child. The important part is that the plan is repeatable on ordinary days, not only on motivated ones.",
      },
      {
        type: "h2",
        text: "Give each week a theme",
      },
      {
        type: "p",
        text: "Instead of revising everything every week, choose one or two chapters per subject to revisit. For example: Mathematics — trigonometry and quadratic equations; Science — chemical reactions and life processes; Social Science — one history unit and one geography unit. End the week with a short self-test, even 10 questions, so the student practises retrieving answers rather than only rereading notes.",
      },
      {
        type: "callout",
        title: "One honest marker of progress",
        text: "Rereading feels productive but is hard to measure. A short closed-book test, checked the same day, gives you and the tutor something concrete to discuss.",
      },
      {
        type: "h2",
        text: "Keep sample papers for the right stage",
      },
      {
        type: "p",
        text: "Sample papers are most useful after a reasonable part of the syllabus has been covered. In the months before boards, a full paper once every two to three weeks is enough for most students. Between papers, work on the specific mistakes. Doing ten papers without reviewing errors mostly builds fatigue.",
      },
      {
        type: "h2",
        text: "What parents can do — and what to avoid",
      },
      {
        type: "ul",
        items: [
          "Do: help protect sleep, meals and a consistent study space.",
          "Do: ask 'What is the plan for today?' instead of 'Have you finished everything?'",
          "Do: keep the tutor informed about what is not working.",
          "Avoid: comparing your child with cousins or classmates.",
          "Avoid: adding new tuition for every subject in the final months.",
          "Avoid: negotiating bedtime away in exchange for more study hours.",
        ],
      },
      {
        type: "p",
        text: "If one subject is consistently blocking progress, targeted home tuition can be more useful than another general study app. A tutor can watch the student solve problems, identify the exact gap and adjust the next lesson. Ask the tutor to share a short monthly note on topics covered, practice done and what needs attention at home.",
      },
      {
        type: "h2",
        text: "A note on board-specific details",
      },
      {
        type: "p",
        text: "CBSE, ICSE and UP Board differ in marking patterns and internal assessment. Make sure the study plan reflects the current official syllabus and sample paper for your board. Schools usually share circulars; check them with your child rather than relying on last year's pattern.",
      },
      {
        type: "p",
        text: "The plan should reduce anxiety, not become another performance target. If your child is regularly unable to follow it, simplify the plan. Consistency matters more than a perfect timetable. For personalised help, you can request a home tutor for Class 10 in Varanasi through our enquiry form.",
      },
    ],
  },
  {
    slug: "home-tuition-vs-coaching-classes",
    title: "Home Tuition vs. Coaching Classes: What Works Better?",
    description:
      "A balanced comparison of one-to-one home tuition and group coaching for Varanasi families, with questions to help you decide.",
    category: "For Parents",
    date: "2026-09-24",
    readingTime: "5 min read",
    blocks: [
      {
        type: "p",
        text: "Families often ask whether home tuition is worth it when coaching classes are cheaper per month. The honest answer is that it depends on the student, the subject and the kind of support needed. Both formats can work well. They solve different problems.",
      },
      {
        type: "h2",
        text: "What coaching classes do well",
      },
      {
        type: "ul",
        items: [
          "A structured batch schedule and regular tests.",
          "Peer competition, which can motivate some students.",
          "A lower cost per student for general syllabus coverage.",
          "Access to a larger question bank and full-length tests.",
        ],
      },
      {
        type: "p",
        text: "For a self-driven student who follows lectures well and mainly needs exposure to tests, a good coaching batch can be very effective. The weakness appears when a student is quietly falling behind. In a large batch, it is difficult for a teacher to notice one student's specific gap.",
      },
      {
        type: "h2",
        text: "What one-to-one home tuition does well",
      },
      {
        type: "ul",
        items: [
          "The tutor can slow down, repeat or change the explanation immediately.",
          "Lessons can focus on the exact chapters or skills that are weak.",
          "The student can ask a 'basic' question without hesitation.",
          "Parents can discuss progress directly with the tutor.",
          "No travel time, which matters for younger students and tight schedules.",
        ],
      },
      {
        type: "p",
        text: "The trade-off is cost and dependence. One-to-one teaching is usually more expensive per hour, and a weak tutor can become a crutch if the student is not learning to work independently. Home tuition works best when the tutor builds habits, not just answers.",
      },
      {
        type: "h2",
        text: "Three questions to help you decide",
      },
      {
        type: "ol",
        items: [
          "Is the problem conceptual, or is it practice and exam exposure? Conceptual gaps often benefit from one-to-one attention; test exposure may benefit from a batch.",
          "Can the student ask questions comfortably in a group? If not, a home tutor may help unlock the subject.",
          "What is the total cost, including travel and time? A cheaper class that consumes two hours of travel may not be cheaper in practice.",
        ],
      },
      {
        type: "callout",
        title: "A blend is often practical",
        text: "Some students use coaching for general test practice and a home tutor for one difficult subject. That can work, provided the total workload is realistic.",
      },
      {
        type: "h2",
        text: "What to check before choosing either option",
      },
      {
        type: "ul",
        items: [
          "Who actually teaches the class, and what is their subject background?",
          "How many students are in the batch?",
          "How is progress measured and shared with parents?",
          "What is the fee, and what is included?",
          "What happens if a class is missed?",
        ],
      },
      {
        type: "p",
        text: "For a home tutor, add a trial or demo where possible, confirm the teaching plan, and agree the schedule and fee in writing. For coaching, ask to observe a class or speak to the teacher before committing to a long fee cycle.",
      },
      {
        type: "p",
        text: "There is no universally better option. The best choice is the one that fits your child's learning gap, your family's schedule and a budget you can sustain for the whole academic year. If you are considering personalised home tuition in Varanasi, share your requirements and we will help you explore suitable available tutor options.",
      },
    ],
  },
  {
    slug: "questions-before-finalising-a-home-tutor",
    title: "10 Questions to Ask Before Finalising a Home Tutor",
    description:
      "A practical list of questions for parents before confirming a home tutor — covering teaching approach, schedule, fees and safety.",
    category: "For Parents",
    date: "2026-11-02",
    readingTime: "6 min read",
    blocks: [
      {
        type: "p",
        text: "Most parents ask about qualification and fee. Those matter, but they do not tell you how the tutoring will actually work week to week. These ten questions will give you a clearer picture before you confirm a placement.",
      },
      {
        type: "h2",
        text: "About teaching and fit",
      },
      {
        type: "ol",
        items: [
          "Have you taught this class and board before? Ask for a recent example, not a general years-of-experience number.",
          "How will you find out what my child already knows? A good tutor usually starts with a short diagnostic conversation or worksheet.",
          "How do you explain a topic that the student did not understand in school? Ask them to demonstrate with a real example during the demo.",
          "How do you check understanding? Look for quick retrieval questions, worked examples and feedback, not only completed notes.",
          "What will you assign between classes, and how will you follow up?",
        ],
      },
      {
        type: "h2",
        text: "About schedule and expectations",
      },
      {
        type: "ol",
        items: [
          "How many classes are included each month, and how long is each class?",
          "What happens if we need to reschedule? Is there a notice period?",
          "What do you expect from me as a parent?",
          "How will you share progress updates, and how often?",
          "What are the fee, payment method and any one-time charges?",
        ],
      },
      {
        type: "callout",
        title: "Put the important terms in writing",
        text: "A short WhatsApp message confirming the fee, schedule, notice period and any commission is enough. Clarity at the start prevents most disagreements later.",
      },
      {
        type: "h2",
        text: "Questions specific to an agency",
      },
      {
        type: "ul",
        items: [
          "Is there a one-time placement commission, and exactly how is it shared?",
          "When does the commission become payable?",
          "Are the tutor's identity and qualification documents reviewed?",
          "What happens if the tutor leaves, and what does the written agreement say?",
          "Who receives the monthly tuition fee?",
        ],
      },
      {
        type: "p",
        text: "At Advanta Home Tutions, monthly tuition fees are paid directly to the tutor. A one-time placement commission equivalent to one month's fee applies and is shared between the parent and tutor, with the division agreed before placement. We do not publish a fixed percentage because the terms are confirmed for each placement.",
      },
      {
        type: "h2",
        text: "A final safety check",
      },
      {
        type: "p",
        text: "For a tutor visiting your home, confirm identity and qualifications through the agency, agree who will be present during classes, and keep the first few sessions in a shared space. These checks are reasonable and should be welcomed by any professional tutor.",
      },
      {
        type: "p",
        text: "If you would like to discuss suitable tutor options for your child in Varanasi, send us an enquiry with the class, board, subjects and locality. We will be transparent about what is available.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));
