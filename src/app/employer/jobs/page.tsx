"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { PlusCircle, Briefcase, Loader2, MapPin, Users, Eye, Star, ExternalLink } from "lucide-react"

interface Job {
  id: string
  title: string
  slug: string
  status: string
  city: string
  state: string
  industry: string
  jobType: string
  workMode: string
  createdAt: string
  featured: boolean
  vacancies: number
  approvedByAdmin: boolean
  salaryMin: number
  salaryMax: number
  salaryHidden: boolean
  experienceMin: number
  experienceMax: number
  _count: { applications: number }
}

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  PAUSED: "bg-yellow-100 text-yellow-700",
  CLOSED: "bg-gray-100 text-gray-600",
  DRAFT: "bg-blue-100 text-blue-700",
}

function formatSalary(min: number, max: number, hidden: boolean) {
  if (hidden) return "As per market standards"
  if (!min && !max) return "Not disclosed"
  const fmt = (n: number) => `${(n / 100000).toFixed(1)} LPA`
  if (min && max) return `${fmt(min)} – ${fmt(max)}`
  if (min) return `From ${fmt(min)}`
  return `Up to ${fmt(max)}`
}

export default function EmployerJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/employer/my-jobs")
      .then(r => r.json())
      .then(data => setJobs(data.jobs || []))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">My Jobs</h1>
          <p className="text-sm text-gray-500 mt-0.5">{jobs.length} job{jobs.length !== 1 ? "s" : ""} posted</p>
        </div>
        <Link href="/employer/jobs/new" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl btn-3d text-sm font-medium">
          <PlusCircle className="w-4 h-4" />Post New Job
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : jobs.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-3d border border-gray-100 text-center">
          <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-navy mb-2">No jobs posted yet</h3>
          <p className="text-gray-500 mb-6">Create your first job posting and start receiving applications.</p>
          <Link href="/employer/jobs/new" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl btn-3d font-medium">
            <PlusCircle className="w-4 h-4" />Post Your First Job
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map(job => {
            const appCount = job._count.applications
            const isLive = job.status === "ACTIVE" && job.approvedByAdmin
            return (
              <div key={job.id} className="bg-white rounded-2xl p-5 shadow-3d border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Title row */}
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <h3 className="font-bold text-navy text-base">{job.title}</h3>
                      {job.featured && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">
                          <Star className="w-3 h-3" />Featured
                        </span>
                      )}
                      <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${statusColors[job.status] || "bg-gray-100 text-gray-600"}`}>
                        {job.status}
                      </span>
                      {isLive ? (
                        <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full font-medium flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />Live
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full font-medium">
                          {job.status === "ACTIVE" ? "Pending Approval" : "Not Live"}
                        </span>
                      )}
                    </div>

                    {/* Meta row */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />{job.city}, {job.state}
                      </span>
                      <span>{job.industry}</span>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{job.jobType.replace("_", " ")}</span>
                      {job.workMode && (
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{job.workMode}</span>
                      )}
                      <span>{job.experienceMin}–{job.experienceMax} yrs exp</span>
                    </div>

                    {/* Salary + vacancies */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1.5 flex-wrap">
                      <span className="font-medium text-navy text-sm">
                        {formatSalary(job.salaryMin, job.salaryMax, job.salaryHidden)}
                      </span>
                      <span>{job.vacancies} vacanc{job.vacancies === 1 ? "y" : "ies"}</span>
                      <span className="text-xs text-gray-400">
                        Posted {new Date(job.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0 flex-wrap sm:flex-col sm:items-end">
                    <Link href={`/employer/jobs/${job.id}/applicants`}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                      <Users className="w-4 h-4" />
                      Applicants
                      {appCount > 0 && (
                        <span className="bg-white/30 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                          {appCount}
                        </span>
                      )}
                    </Link>
                    <div className="flex items-center gap-2">
                      <Link href={`/jobs/${job.slug}`} target="_blank"
                        className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-colors">
                        <Eye className="w-3.5 h-3.5" />Preview
                      </Link>
                      <Link href={`/employer/jobs/${job.id}/edit`}
                        className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-colors">
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
