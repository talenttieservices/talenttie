import Link from "next/link"
import { Users, Target, Clock, Shield, Globe, Headphones, ArrowRight, Phone, CheckCircle2 } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "For Employers - Hire Top Talent Across India", description: "Partner with TalentTie to hire quality candidates from 500+ cities across India. Banking, Insurance, Pharma, FMCG, IT sectors." }

const benefits = [
  { icon: Globe, title: "PAN India Network", desc: "Access candidates from 500+ cities including Tier 2, Tier 3 towns and rural areas." },
  { icon: Users, title: "Quality Candidates", desc: "Verified profiles with complete education, experience, and skill information." },
  { icon: Clock, title: "Fast Turnaround", desc: "Get qualified applicants within 48 hours of posting your job." },
  { icon: Target, title: "Industry Expertise", desc: "Deep specialization in Banking, Insurance, Pharma, FMCG, IT, and Manufacturing sectors." },
  { icon: Headphones, title: "Dedicated Support", desc: "Personal account manager to help you find the right talent faster." },
  { icon: Shield, title: "Cost Effective", desc: "No upfront costs. Pay only when you find the right candidate." },
]

export default function ForEmployersPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-navy via-navy-dark to-navy pt-28 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 iso-grid opacity-20" />
        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Hire the Best Talent from <span className="text-primary">500+ Cities</span></h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">TalentTie gives you access to quality candidates from metros to villages across India. Post jobs, review applicants, and hire — all in one platform.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?role=employer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl btn-3d text-lg font-semibold">Start Hiring Now<ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+919913677622" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 text-white rounded-xl font-semibold hover:border-primary hover:text-primary transition-all"><Phone className="w-5 h-5" />Call: 9913677622</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-14"><h2 className="text-3xl font-bold text-navy mb-4">Why Choose <span className="gradient-text">TalentTie</span></h2></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {benefits.map(b => (
            <div key={b.title} className="bg-white rounded-2xl p-6 card-3d shadow-3d border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><b.icon className="w-6 h-6 text-primary" /></div>
              <h3 className="font-bold text-navy mb-2">{b.title}</h3>
              <p className="text-sm text-gray-500">{b.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-primary/5 rounded-2xl p-10 text-center border border-primary/10">
          <h2 className="text-2xl font-bold text-navy mb-4">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-8 mt-8">
            {["Register & Post Jobs", "Review Applicants", "Hire the Best"].map((step, i) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white text-xl font-bold flex items-center justify-center mx-auto mb-3">{i + 1}</div>
                <div className="font-semibold text-navy">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
