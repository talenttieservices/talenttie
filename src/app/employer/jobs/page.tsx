"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { PlusCircle, Briefcase, Loader2, MapPin, Users } from "lucide-react"

interface Job {
  id: string
  title: string
  slug: string
  status: string
  city: string
  state: string
  industry: string
  jobType: string
  createdAt: string
  featured: boolean
  vacancies: number
  _count: { applications: number }
}

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  PAUSED: "bg-yellow-100 text-yellow-700",
  CLOSED: "bg-gray-100 text-gray-600",
  DRAFT: "bg-blue-100 text-blue-700",
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
        <h1 className="text-2xl font-bold text-navy">My Jobs</h1>
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
          {jobs.map(job => (
            <div key={job.id} className="bg-white rounded-2xl p-5 shadow-3d border border-gray-100 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-semibold text-navy">{job.title}</h3>
                  {job.featured && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">Featured</span>}
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${statusColors[job.status] || "bg-gray-100 text-gray-600"}`}>{job.status}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.city}, {job.state}</span>
                  <span>{job.industry}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{job._count.applications} applicants</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link href={`/jobs/${job.slug}`} target="_blank"
                  className="px-4 py-2 text-sm border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-colors">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
