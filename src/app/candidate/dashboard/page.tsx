"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Briefcase, CheckCircle2, Clock, User, ArrowRight, FileText, Loader2 } from "lucide-react"

interface Application {
  id: string
  status: string
  appliedAt: string
  job: { title: string; city: string; state: string; slug: string; employer: { companyName: string } }
}

const statusColors: Record<string, string> = {
  APPLIED: "bg-blue-100 text-blue-700",
  SHORTLISTED: "bg-green-100 text-green-700",
  VIEWED: "bg-purple-100 text-purple-700",
  INTERVIEW: "bg-orange-100 text-orange-700",
  HIRED: "bg-primary/10 text-primary",
  REJECTED: "bg-red-100 text-red-700",
}

export default function CandidateDashboard() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/candidate/applications")
      .then(r => r.json())
      .then(data => setApplications(data.applications || []))
      .catch(() => setApplications([]))
      .finally(() => setLoading(false))
  }, [])

  const shortlisted = applications.filter(a => a.status === "SHORTLISTED").length
  const interviews = applications.filter(a => a.status === "INTERVIEW").length
  const recent = applications.slice(0, 3)

  const statCards = [
    { label: "Applications", value: applications.length, icon: FileText, color: "bg-blue-100 text-blue-700" },
    { label: "Shortlisted", value: shortlisted, icon: CheckCircle2, color: "bg-green-100 text-green-700" },
    { label: "Interviews", value: interviews, icon: Clock, color: "bg-orange-100 text-orange-700" },
    { label: "Profile", value: "—", icon: User, color: "bg-purple-100 text-purple-700" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">
        Welcome back!
      </h1>

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-5 shadow-3d border border-gray-100 card-3d">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-navy">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-navy">Recent Applications</h2>
            <Link href="/candidate/applications" className="text-sm text-primary hover:underline flex items-center gap-1">
              View All<ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-6"><Loader2 className="w-5 h-5 animate-spin text-primary" /></div>
          ) : recent.length === 0 ? (
            <div className="text-center py-6 text-gray-400 text-sm">
              No applications yet. <Link href="/jobs" className="text-primary hover:underline">Browse jobs</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recent.map(app => (
                <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-medium text-navy text-sm">{app.job.title}</div>
                    <div className="text-xs text-gray-400">
                      {app.job.employer?.companyName} &middot; {new Date(app.appliedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[app.status] || "bg-gray-100 text-gray-700"}`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100">
          <h2 className="text-lg font-bold text-navy mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/candidate/profile" className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10 hover:bg-primary/10 transition-colors">
              <User className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium text-navy text-sm">Complete Your Profile</div>
                <div className="text-xs text-gray-400">Add experience, skills, and resume</div>
              </div>
            </Link>
            <Link href="/jobs" className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium text-navy text-sm">Browse Jobs</div>
                <div className="text-xs text-gray-400">Find your next opportunity</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
