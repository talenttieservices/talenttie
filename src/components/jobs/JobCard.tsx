import Link from "next/link"
import { MapPin, Clock, Banknote, ArrowRight } from "lucide-react"

interface JobCardProps { job: { id: string; title: string; slug: string; company: string; location: string; salary: string; type: string; experience: string; industry: string; posted: string; skills: string[]; featured?: boolean } }
const industryColors: Record<string, string> = { Banking: "bg-blue-100 text-blue-700", Insurance: "bg-indigo-100 text-indigo-700", "Financial Services": "bg-sky-100 text-sky-700", "Securities & Investments": "bg-violet-100 text-violet-700", Pharma: "bg-purple-100 text-purple-700", FMCG: "bg-orange-100 text-orange-700", IT: "bg-cyan-100 text-cyan-700", Manufacturing: "bg-emerald-100 text-emerald-700", Healthcare: "bg-rose-100 text-rose-700", Education: "bg-pink-100 text-pink-700" }

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job.slug}`} className={`group block bg-white rounded-2xl border p-6 card-3d shadow-3d transition-all ${job.featured ? "border-primary/30 ring-1 ring-primary/10" : "border-gray-100"}`}>
      {job.featured && <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium mb-3"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Featured</div>}
      <div className="flex items-start justify-between mb-3">
        <div><h3 className="text-lg font-semibold text-navy group-hover:text-primary transition-colors mb-1">{job.title}</h3></div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${industryColors[job.industry] || "bg-gray-100 text-gray-700"}`}>{job.industry}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center gap-1.5 text-sm text-gray-500"><MapPin className="w-4 h-4 text-primary/60 flex-shrink-0" /><span className="truncate">{job.location}</span></div>
        <div className="flex items-center gap-1.5 text-sm text-gray-500"><Banknote className="w-4 h-4 text-primary/60" />INR {job.salary}</div>
        <div className="flex items-center gap-1.5 text-sm text-gray-500"><Clock className="w-4 h-4 text-primary/60" />{job.experience}</div>
        <div className="text-sm text-gray-500 truncate">{job.type.replace("_", " ")}</div>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">{job.skills.slice(0, 4).map(s => <span key={s} className="px-2 py-0.5 bg-gray-50 text-gray-600 rounded text-xs">{s}</span>)}</div>
      <div className="flex items-center justify-between pt-3 border-t border-gray-50"><span className="text-xs text-gray-400">{job.posted}</span><span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">View Details<ArrowRight className="w-3.5 h-3.5" /></span></div>
    </Link>
  )
}
