import type { Metadata } from "next"
import HomePageClient from "@/components/home/HomePageClient"

export const metadata: Metadata = {
  title: "TalentTie — Find Jobs in Banking, Insurance, Pharma & FMCG Across India",
  description: "India's fastest-growing job portal for Tier 2 & Tier 3 cities. Find jobs in Banking, Insurance, Pharma, FMCG, IT sectors. 5,000+ openings. Apply free in 30 seconds.",
  keywords: [
    "jobs in india 2026", "banking jobs india", "insurance jobs", "pharma jobs",
    "FMCG sales jobs", "relationship manager jobs", "area sales manager",
    "jobs in tier 2 cities india", "fresher jobs india", "private job portal india",
  ],
  alternates: { canonical: "https://talenttie.com" },
  openGraph: {
    title: "TalentTie — Find Jobs in Banking, Insurance, Pharma & FMCG",
    description: "5,000+ job openings across India. Apply in 30 seconds — no account needed.",
    url: "https://talenttie.com",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TalentTie Job Portal" }],
  },
}

export default function HomePage() {
  return <HomePageClient />
}
