"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Clock, Banknote, ArrowRight, Bookmark, Loader2 } from "lucide-react"

interface Job {
  id: string
  slug: string
  title: string
  location: string
  salary: string
  experience: string
  industry: string
  skills: string[]
  createdAt: string
}

const industryColors: Record<string, string> = {
  Banking: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Insurance: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  "Financial Services": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "Securities & Investments": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Pharma: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  FMCG: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  IT: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Manufacturing: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Healthcare: "bg-green-500/10 text-green-400 border-green-500/20",
  Education: "bg-pink-500/10 text-pink-400 border-pink-500/20",
}

function JobCard({ job }: { job: Job }) {
  const [saved, setSaved] = useState(false)
  const router = useRouter()
  const color = industryColors[job.industry] || "bg-gray-500/10 text-gray-400 border-gray-500/20"

  const daysAgo = Math.floor((Date.now() - new Date(job.createdAt).getTime()) / (1000 * 60 * 60 * 24))
  const postedLabel = daysAgo === 0 ? "Today" : daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`

  return (
    <div
      className="group relative bg-white rounded-2xl p-6 border border-gray-100 card-3d shadow-3d hover:shadow-glow transition-all duration-300 cursor-pointer"
      onClick={() => router.push(`/jobs/${job.slug}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${color}`}>
          {job.industry}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); setSaved(!saved) }}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Bookmark className={`w-4 h-4 ${saved ? "fill-primary text-primary" : "text-gray-400"}`} />
        </button>
      </div>

      <h3 className="text-lg font-bold text-navy mb-1 group-hover:text-primary transition-colors">{job.title}</h3>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Banknote className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span>{job.experience}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {job.skills.slice(0, 4).map((skill) => (
          <span key={skill} className="px-2.5 py-1 text-xs rounded-lg bg-gray-50 text-gray-600 border border-gray-100">
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-400">{postedLabel}</span>
        <span className="text-sm font-semibold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          View Details <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  )
}

export default function FeaturedJobs() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/jobs?featured=true&limit=6")
      .then(r => r.json())
      .then(data => {
        const raw = data.jobs || []
        const mapped = raw.map((j: {
          id: string; slug: string; title: string; city: string; state: string;
          salaryMin: number; salaryMax: number; experienceMin: number; experienceMax: number;
          industry: string; skills: string[]; createdAt: string
        }) => ({
          id: j.id,
          slug: j.slug,
          title: j.title,
          location: `${j.city}, ${j.state}`,
          salary: `INR ${(j.salaryMin / 100000).toFixed(1)}L - ${(j.salaryMax / 100000).toFixed(1)}L PA`,
          experience: `${j.experienceMin}-${j.experienceMax} yrs`,
          industry: j.industry,
          skills: j.skills,
          createdAt: j.createdAt,
        }))
        setJobs(mapped)
      })
      .catch(() => setJobs([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium mb-4">
            Latest Openings
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
            Featured{" "}
            <span className="gradient-text bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Job Opportunities
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Handpicked roles in Banking, Insurance, Pharma, and FMCG sectors across tier 2 cities
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p>No featured jobs right now. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <button
            onClick={() => router.push("/jobs")}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-xl btn-3d transition-all duration-200 text-lg"
          >
            View All Jobs
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
