import { Target, Eye, Heart, Users, Briefcase, Building2, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About TalentTie — India's Recruitment Platform for Tier 2 & Tier 3 Cities",
  description: "TalentTie is India's fastest-growing recruitment platform connecting job seekers in Tier 2, Tier 3 cities with top employers in Banking, Insurance, Pharma, FMCG & IT. 15,000+ candidates placed.",
  keywords: ["about talenttie", "recruitment company india", "job placement india", "tier 2 city recruitment", "BFSI recruitment india"],
  alternates: { canonical: "https://talenttie.com/about" },
  openGraph: {
    title: "About TalentTie — Connecting Talent Across India",
    description: "India's fastest-growing recruitment platform. 15,000+ candidates placed across 500+ cities.",
    url: "https://talenttie.com/about",
    type: "website",
  },
}

const values = [
  { icon: Target, title: "Mission", desc: "To bridge the employment gap in underserved Indian cities by connecting quality talent with leading employers across Banking, Insurance, Pharma, FMCG, and IT sectors." },
  { icon: Eye, title: "Vision", desc: "To become India's most trusted recruitment platform for Tier 2, Tier 3 cities and rural areas, empowering millions with meaningful career opportunities." },
  { icon: Heart, title: "Values", desc: "Integrity, accessibility, and impact. We believe every candidate deserves access to quality opportunities regardless of their location." },
]

const stats = [
  { value: "5,000+", label: "Active Jobs", icon: Briefcase },
  { value: "500+", label: "Cities Covered", icon: MapPin },
  { value: "200+", label: "Partner Companies", icon: Building2 },
  { value: "15,000+", label: "Candidates Placed", icon: Users },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-navy via-navy-dark to-navy pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">About <span className="text-primary">TalentTie</span></h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Connecting talent with opportunities across India — from metros to villages</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {values.map((v) => (
            <div key={v.title} className="bg-white rounded-2xl p-8 card-3d shadow-3d border border-gray-100">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4"><v.icon className="w-7 h-7 text-primary" /></div>
              <h3 className="text-xl font-bold text-navy mb-3">{v.title}</h3>
              <p className="text-gray-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mb-12"><h2 className="text-3xl font-bold text-navy mb-4">Who We Are</h2><p className="text-gray-500 max-w-3xl mx-auto text-lg">TalentTie is a recruitment platform by <strong>TalentTie Services</strong>, designed specifically for India&apos;s underserved job markets. While major platforms focus on metro cities, we bring quality job opportunities to Tier 2, Tier 3 cities and rural areas across Banking, Insurance, Pharma, FMCG, IT, and more.</p></div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((s) => (
            <div key={s.label} className="bg-primary/5 rounded-2xl p-6 text-center card-3d border border-primary/10">
              <s.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-navy mb-1">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-navy rounded-2xl p-10 text-center shadow-3d">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-6">Join TalentTie today and take the next step in your career journey.</p>
          <Link href="/register" className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-xl btn-3d font-medium">Get Started Free<ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </div>
  )
}
