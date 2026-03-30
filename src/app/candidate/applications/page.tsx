"use client"
import { useEffect, useState } from "react"
import { FileText, Building2, MapPin, Calendar, Loader2 } from "lucide-react"
import Link from "next/link"

interface Application {
  id: string
  status: string
  appliedAt: string
  job: {
    title: string
    city: string
    state: string
    industry: string
    slug: string
    employer: { companyName: string }
  }
}

const statusColors: Record<string, string> = {
  APPLIED: "bg-blue-100 text-blue-700",
  VIEWED: "bg-purple-100 text-purple-700",
  SHORTLISTED: "bg-green-100 text-green-700",
  INTERVIEW: "bg-orange-100 text-orange-700",
  OFFERED: "bg-emerald-100 text-emerald-700",
  HIRED: "bg-primary/10 text-primary",
  REJECTED: "bg-red-100 text-red-700",
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/candidate/applications")
      .then(r => r.json())
      .then(data => setApplications(data.applications || []))
      .catch(() => setApplications([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">My Applications</h1>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : applications.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-3d border border-gray-100 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-navy mb-2">No applications yet</h3>
          <p className="text-gray-500 mb-6">Start applying to jobs and track your applications here.</p>
          <Link href="/jobs" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl btn-3d font-medium">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app.id} className="bg-white rounded-2xl p-5 shadow-3d border border-gray-100 flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <Link href={`/jobs/${app.job.slug}`} className="font-semibold text-navy hover:text-primary transition-colors">
                    {app.job.title}
                  </Link>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" />{app.job.employer?.companyName || "Company"}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{app.job.city}, {app.job.state}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(app.appliedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusColors[app.status] || "bg-gray-100 text-gray-700"}`}>
                {app.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
