import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Find Jobs in Banking, Insurance, Pharma & FMCG — All India",
  description: "Browse 5,000+ job openings across India. Filter by industry, city, experience level. Apply for jobs in Banking, Insurance, BFSI, Pharma, FMCG, IT — no account needed.",
  keywords: [
    "find jobs india", "banking jobs near me", "insurance jobs india", "BFSI recruitment",
    "pharma sales jobs", "FMCG jobs", "area sales manager jobs", "relationship manager jobs",
    "branch manager jobs india", "fresher jobs 2026", "private sector jobs india",
    "jobs in surat", "jobs in ahmedabad", "jobs in jaipur", "jobs in pune", "jobs in lucknow",
  ],
  alternates: { canonical: "https://talenttie.com/jobs" },
  openGraph: {
    title: "Find Jobs in Banking, Insurance, Pharma & FMCG | TalentTie",
    description: "5,000+ jobs across India in Banking, Insurance, Pharma, FMCG, IT. Apply free — no registration needed.",
    url: "https://talenttie.com/jobs",
    type: "website",
  },
}

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return children
}
