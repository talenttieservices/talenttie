"use client"
import { useState } from "react"
import Link from "next/link"
import { MapPin, Clock, Banknote, Building2, Briefcase, Calendar, Users, ArrowLeft, MessageCircle, Send } from "lucide-react"
import QuickApplyModal from "@/components/jobs/QuickApplyModal"

interface Job {
  id: string
  title: string
  slug: string
  description: string
  requirements: string | null
  skills: string[]
  industry: string
  jobType: string
  experienceMin: number
  experienceMax: number
  salaryMin: number
  salaryMax: number
  location: string
  city: string
  state: string
  vacancies: number
  featured: boolean
  createdAt: string
}

export default function JobDetailClient({ job }: { job: Job }) {
  const [applyOpen, setApplyOpen] = useState(false)

  const salaryLabel = `INR ${(job.salaryMin / 100000).toFixed(1)}L - ${(job.salaryMax / 100000).toFixed(1)}L PA`
  const postedDate = new Date(job.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })

  return (
    <>
      <QuickApplyModal isOpen={applyOpen} onClose={() => setApplyOpen(false)} jobTitle={job.title} company="TalentTie" jobSlug={job.slug} />
      <div className="min-h-screen bg-gray-50/50">
        <div className="bg-gradient-to-br from-navy via-navy-dark to-navy pt-28 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link href="/jobs" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6"><ArrowLeft className="w-4 h-4" />Back to Jobs</Link>
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"><Building2 className="w-8 h-8 text-primary" /></div>
              <div>
                {job.featured && <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium mb-3"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Featured</span>}
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{job.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" />{job.city}, {job.state}</span>
                  <span className="flex items-center gap-1.5"><Banknote className="w-4 h-4 text-primary" />{salaryLabel}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" />{job.experienceMin}-{job.experienceMax} yrs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-4 shadow-3d border border-gray-100 flex flex-wrap gap-3">
                <button onClick={() => setApplyOpen(true)} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl btn-3d font-semibold"><Send className="w-4 h-4" />Apply Now</button>
                <a href={`https://wa.me/919913677622?text=${encodeURIComponent(`Hi TalentTie,\n\nI want to apply for: *${job.title}*\nLocation: ${job.city}, ${job.state}\n\nPlease guide me on next steps.`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 bg-[#25D366]/10 text-[#25D366] rounded-xl font-medium hover:bg-[#25D366]/20 transition-colors"><MessageCircle className="w-4 h-4" />WhatsApp Apply</a>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-3d border border-gray-100"><h2 className="text-xl font-bold text-navy mb-4">Job Description</h2><div className="text-gray-600 whitespace-pre-line leading-relaxed">{job.description}</div></div>
              {job.requirements && <div className="bg-white rounded-2xl p-8 shadow-3d border border-gray-100"><h2 className="text-xl font-bold text-navy mb-4">Requirements</h2><div className="text-gray-600 whitespace-pre-line leading-relaxed">{job.requirements}</div></div>}
              {job.skills.length > 0 && <div className="bg-white rounded-2xl p-8 shadow-3d border border-gray-100"><h2 className="text-xl font-bold text-navy mb-4">Required Skills</h2><div className="flex flex-wrap gap-2">{job.skills.map(s => <span key={s} className="px-4 py-2 bg-primary/5 text-primary rounded-xl text-sm font-medium border border-primary/10">{s}</span>)}</div></div>}
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100 sticky top-24 h-fit">
              <h3 className="font-bold text-navy mb-4">Job Overview</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3"><Calendar className="w-5 h-5 text-primary mt-0.5" /><div><div className="text-xs text-gray-400">Posted On</div><div className="text-sm text-navy font-medium">{postedDate}</div></div></div>
                <div className="flex items-start gap-3"><Users className="w-5 h-5 text-primary mt-0.5" /><div><div className="text-xs text-gray-400">Vacancies</div><div className="text-sm text-navy font-medium">{job.vacancies} positions</div></div></div>
                <div className="flex items-start gap-3"><Briefcase className="w-5 h-5 text-primary mt-0.5" /><div><div className="text-xs text-gray-400">Industry</div><div className="text-sm text-navy font-medium">{job.industry}</div></div></div>
                <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-primary mt-0.5" /><div><div className="text-xs text-gray-400">Job Type</div><div className="text-sm text-navy font-medium">{job.jobType.replace("_", " ")}</div></div></div>
              </div>
              <hr className="my-5 border-gray-100" />
              <button onClick={() => setApplyOpen(true)} className="w-full py-3 rounded-xl bg-primary text-white font-semibold btn-3d text-sm flex items-center justify-center gap-2 mb-3"><Send className="w-4 h-4" />Apply Now</button>
              <div className="bg-primary/5 rounded-xl p-4 text-center"><p className="text-sm text-navy font-medium mb-2">Need help applying?</p><a href="tel:+919913677622" className="text-primary font-semibold text-sm hover:underline">Call: +91 9913677622</a></div>
            </div>
          </div>
        </div>
        <div className="h-20" />
      </div>
    </>
  )
}
