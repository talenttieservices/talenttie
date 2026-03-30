import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact TalentTie — Get in Touch",
  description: "Reach out to TalentTie for recruitment services, job posting, or career guidance. Call +91-9913677622 or email recruitment@talenttie.com. Offices in Ahmedabad, Gujarat.",
  keywords: ["contact talenttie", "recruitment agency india", "hire employees india", "post job india", "recruitment services gujarat"],
  alternates: { canonical: "https://talenttie.com/contact" },
  openGraph: {
    title: "Contact TalentTie — Recruitment Services India",
    description: "Get in touch with TalentTie for hiring solutions or career guidance. +91-9913677622 | recruitment@talenttie.com",
    url: "https://talenttie.com/contact",
    type: "website",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
