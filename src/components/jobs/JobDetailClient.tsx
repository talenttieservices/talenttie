"use client"
import { useState } from "react"
import Link from "next/link"
import {
  MapPin, Clock, Banknote, Building2, Briefcase, Calendar, Users,
  ArrowLeft, MessageCircle, Send, GraduationCap, CheckCircle,
  Share2, BookmarkPlus, ExternalLink, Wifi,
} from "lucide-react"
import QuickApplyModal from "@/components/jobs/QuickApplyModal"

interface Job {
  id: string
  title: string
  slug: string
  description: string
  requirements: string | null
  skills: string[]
  industry: string | null
  functionalArea?: string | null
  roleCategory?: string | null
  jobType: string
  workMode?: string | null
  experienceMin: number
  experienceMax: number
  salaryMin: number | null
  salaryMax: number | null
  salaryHidden?: boolean
  location: string
  city: string
  state: string
  vacancies: number
  featured: boolean
  createdAt: string
  education?: string | null
  walkInDate?: string | null
  walkInVenue?: string | null
  isRemote?: boolean
  employer?: {
    companyName?: string
    website?: string | null
    industry?: string | null
    description?: string | null
    logo?: string | null
  } | null
}

const WORK_MODE_LABELS: Record<string, string> = {
  OFFICE: "Work from Office",
  WFH: "Work from Home",
  HYBRID: "Hybrid",
}

const JOB_TYPE_LABELS: Record<string, string> = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
}

const EDUCATION_LABELS: Record<string, string> = {
  ANY: "Any Graduate",
  "10TH": "10th Pass",
  "12TH": "12th Pass",
  DIPLOMA: "Diploma",
  UG: "Any UG Degree",
  UG_BCOM: "B.Com",
  UG_BBA: "BBA",
  UG_BSC: "B.Sc",
  UG_BE_BTECH: "B.E / B.Tech",
  PG: "Any PG Degree",
  PG_MBA: "MBA / PGDM",
  PG_MCA: "MCA",
  PG_MCOM: "M.Com",
  PG_MSC: "M.Sc",
  PHD: "Ph.D",
}

export default function JobDetailClient({ job }: { job: Job }) {
  const [applyOpen, setApplyOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const salaryLabel = job.salaryHidden
    ? "As per market standards"
    : (job.salaryMin && job.salaryMax)
      ? `₹${(job.salaryMin / 100000).toFixed(1)}L – ₹${(job.salaryMax / 100000).toFixed(1)}L PA`
      : (job.salaryMin ? `₹${(job.salaryMin / 100000).toFixed(1)}L+ PA` : "Not disclosed")

  const postedDate = new Date(job.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
  const daysSince = Math.floor((Date.now() - new Date(job.createdAt).getTime()) / (1000 * 60 * 60 * 24))
  const postedAgo = daysSince === 0 ? "Today" : daysSince === 1 ? "Yesterday" : `${daysSince} days ago`

  const companyName = job.employer?.companyName || "TalentTie Services"

  const whatsappText = `Hi TalentTie,\n\nI want to apply for: *${job.title}*\nCompany: ${companyName}\nLocation: ${job.city}, ${job.state}\nSalary: ${salaryLabel}\n\nPlease guide me.`

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const walkInDate = job.walkInDate ? new Date(job.walkInDate) : null

  return (
    <>
      <QuickApplyModal isOpen={applyOpen} onClose={() => setApplyOpen(false)} jobTitle={job.title} company={companyName} jobSlug={job.slug} />

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-navy via-[#1a2e40] to-navy pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/jobs" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />Back to Jobs
          </Link>

          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {/* Company logo / icon */}
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
              {job.employer?.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={job.employer.logo} alt={companyName} className="w-12 h-12 object-contain rounded-xl" />
              ) : (
                <Building2 className="w-8 h-8 text-primary" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              {job.featured && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />Featured Job
                </span>
              )}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 leading-tight">{job.title}</h1>
              <p className="text-gray-400 text-base mb-4">{companyName}</p>

              {/* Quick badges row */}
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="flex items-center gap-1.5 text-gray-300 bg-white/10 px-3 py-1.5 rounded-full">
                  <MapPin className="w-3.5 h-3.5 text-primary" />{job.city}, {job.state}
                </span>
                <span className="flex items-center gap-1.5 text-gray-300 bg-white/10 px-3 py-1.5 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-primary" />{job.experienceMin}–{job.experienceMax} yrs
                </span>
                <span className="flex items-center gap-1.5 text-gray-300 bg-white/10 px-3 py-1.5 rounded-full">
                  <Banknote className="w-3.5 h-3.5 text-primary" />{salaryLabel}
                </span>
                {job.workMode && (
                  <span className="flex items-center gap-1.5 text-gray-300 bg-white/10 px-3 py-1.5 rounded-full">
                    <Wifi className="w-3.5 h-3.5 text-primary" />{WORK_MODE_LABELS[job.workMode] || job.workMode}
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-gray-400 text-xs px-3 py-1.5 rounded-full bg-white/5">
                  Posted {postedAgo}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-5">

            {/* Apply CTAs */}
            <div className="bg-white rounded-2xl p-4 shadow-3d border border-gray-100 flex flex-wrap gap-3">
              <button onClick={() => setApplyOpen(true)}
                className="flex-1 min-w-[160px] flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl btn-3d font-semibold text-sm">
                <Send className="w-4 h-4" />Apply Now — Free
              </button>
              <a href={`https://wa.me/919913677622?text=${encodeURIComponent(whatsappText)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 bg-[#25D366]/10 text-[#25D366] rounded-xl font-medium text-sm hover:bg-[#25D366]/20 transition-colors">
                <MessageCircle className="w-4 h-4" />WhatsApp
              </a>
              <button onClick={copyLink}
                className="flex items-center gap-2 px-4 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition-colors">
                <Share2 className="w-4 h-4" />{copied ? "Copied!" : "Share"}
              </button>
            </div>

            {/* Walk-in Alert */}
            {walkInDate && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-amber-700 font-bold text-base">🚶 Walk-in Interview</span>
                </div>
                <p className="text-amber-800 text-sm font-medium">
                  {walkInDate.toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
                  {" at "}
                  {walkInDate.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </p>
                {job.walkInVenue && <p className="text-amber-700 text-sm mt-1">📍 {job.walkInVenue}</p>}
              </div>
            )}

            {/* Job Description */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-3d border border-gray-100">
              <h2 className="text-lg font-bold text-navy mb-4 pb-3 border-b border-gray-100">Job Description</h2>
              <div className="text-gray-600 whitespace-pre-line leading-relaxed text-sm sm:text-base">
                {job.description}
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-3d border border-gray-100">
                <h2 className="text-lg font-bold text-navy mb-4 pb-3 border-b border-gray-100">Requirements & Eligibility</h2>
                <div className="text-gray-600 whitespace-pre-line leading-relaxed text-sm sm:text-base">
                  {job.requirements}
                </div>
              </div>
            )}

            {/* Skills */}
            {job.skills && job.skills.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-3d border border-gray-100">
                <h2 className="text-lg font-bold text-navy mb-4 pb-3 border-b border-gray-100">Key Skills Required</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map(s => (
                    <span key={s} className="flex items-center gap-1.5 px-4 py-2 bg-primary/5 text-primary rounded-xl text-sm font-medium border border-primary/10">
                      <CheckCircle className="w-3.5 h-3.5" />{s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* About the recruiter */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-3d border border-gray-100">
              <h2 className="text-lg font-bold text-navy mb-4 pb-3 border-b border-gray-100">About the Recruiter</h2>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-navy">{companyName}</p>
                  {job.employer?.industry && <p className="text-sm text-gray-500">{job.employer.industry}</p>}
                  {job.employer?.description && <p className="text-sm text-gray-600 mt-2 leading-relaxed">{job.employer.description}</p>}
                  {job.employer?.website && (
                    <a href={job.employer.website} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary text-sm hover:underline mt-2">
                      Visit website <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
              <div className="mt-5 bg-primary/5 border border-primary/10 rounded-xl p-4 text-sm">
                <p className="text-navy font-medium mb-1">Placed by TalentTie Recruitment Services</p>
                <p className="text-gray-500">Verified recruiter • Free application • No hidden charges</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Job Overview */}
            <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100 sticky top-24">
              <h3 className="font-bold text-navy mb-5 text-base">Job Overview</h3>
              <div className="space-y-4">
                <OverviewItem icon={<Calendar className="w-4 h-4 text-primary" />} label="Posted On" value={postedDate} />
                <OverviewItem icon={<Users className="w-4 h-4 text-primary" />} label="Vacancies" value={`${job.vacancies} opening${job.vacancies > 1 ? "s" : ""}`} />
                <OverviewItem icon={<Briefcase className="w-4 h-4 text-primary" />} label="Industry" value={job.industry || "—"} />
                <OverviewItem icon={<Briefcase className="w-4 h-4 text-primary" />} label="Job Type" value={JOB_TYPE_LABELS[job.jobType] || job.jobType} />
                {job.workMode && (
                  <OverviewItem icon={<Wifi className="w-4 h-4 text-primary" />} label="Work Mode" value={WORK_MODE_LABELS[job.workMode] || job.workMode} />
                )}
                {job.functionalArea && (
                  <OverviewItem icon={<Briefcase className="w-4 h-4 text-primary" />} label="Function" value={job.functionalArea} />
                )}
                {job.roleCategory && (
                  <OverviewItem icon={<Briefcase className="w-4 h-4 text-primary" />} label="Role" value={job.roleCategory} />
                )}
                {job.education && job.education !== "ANY" && (
                  <OverviewItem icon={<GraduationCap className="w-4 h-4 text-primary" />} label="Education" value={EDUCATION_LABELS[job.education] || job.education} />
                )}
                <OverviewItem icon={<MapPin className="w-4 h-4 text-primary" />} label="Location" value={`${job.location || job.city}, ${job.state}`} />
              </div>

              <div className="mt-6 space-y-3">
                <button onClick={() => setApplyOpen(true)}
                  className="w-full py-3 rounded-xl bg-primary text-white font-semibold btn-3d text-sm flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />Apply Now
                </button>
                <a href={`https://wa.me/919913677622?text=${encodeURIComponent(whatsappText)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#25D366]/10 text-[#25D366] font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#25D366]/20 transition-colors">
                  <MessageCircle className="w-4 h-4" />Apply via WhatsApp
                </a>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400 mb-1">Questions? Call us</p>
                <a href="tel:+919913677622" className="text-primary font-bold hover:underline text-sm">
                  +91 99136 77622
                </a>
              </div>
            </div>

            {/* Apply steps */}
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5">
              <h4 className="font-bold text-navy text-sm mb-3">How to Apply</h4>
              <div className="space-y-2.5">
                {[
                  "Click 'Apply Now' above",
                  "Fill your name, phone & email",
                  "Upload resume (optional)",
                  "Our team calls you within 24 hrs",
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-xs text-gray-600">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function OverviewItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex-shrink-0">{icon}</div>
      <div>
        <div className="text-xs text-gray-400 leading-tight">{label}</div>
        <div className="text-sm text-navy font-medium mt-0.5 leading-snug">{value}</div>
      </div>
    </div>
  )
}
