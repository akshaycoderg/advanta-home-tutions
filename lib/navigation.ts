export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about", description: "Who we are and how we work" },
  {
    label: "Find a Home Tutor",
    href: "/find-a-home-tutor",
    description: "Share your child's requirements",
  },
  {
    label: "Classes & Subjects",
    href: "/classes-and-subjects",
    description: "Nursery to Class 12 across major boards",
  },
  { label: "How It Works", href: "/how-it-works", description: "From enquiry to demo" },
  { label: "Become a Tutor", href: "/become-a-tutor", description: "Apply to teach with us" },
  { label: "Contact Us", href: "/contact", description: "Ways to reach us" },
];

export const footerNav = {
  explore: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Classes & Subjects", href: "/classes-and-subjects" },
    { label: "FAQs", href: "/faqs" },
    { label: "Blog", href: "/blog" },
  ],
  parents: [
    { label: "Find a Home Tutor", href: "/find-a-home-tutor" },
    { label: "Request a Demo", href: "/find-a-home-tutor#enquiry-form" },
    { label: "Parent FAQs", href: "/faqs#parents" },
    { label: "Fees & Commission", href: "/how-it-works#fees" },
    { label: "Contact Us", href: "/contact" },
  ],
  tutors: [
    { label: "Become a Tutor", href: "/become-a-tutor" },
    { label: "Tutor Registration", href: "/become-a-tutor#tutor-form" },
    { label: "Tutor FAQs", href: "/faqs#tutors" },
    { label: "Verification Process", href: "/become-a-tutor#verification" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
};
