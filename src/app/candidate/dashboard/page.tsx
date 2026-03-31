"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Briefcase, CheckCircle2, Clock, User, ArrowRight, FileText,
  Loader2, MapPin, Building2, Calendar, TrendingUp,
} from "lucide-react"
import { useSession } from "next-auth/react"

interface Application {
  id: string
  status: string
  appliedAt: string
  job: {
    title: string
    city: string
    state: string
    slug: string
    industry: string
    employer: { companyName: string }
  }
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  APPLIED:     { label: "Applied",     color: "text-blue-700",    bg: "bg-blue-100" },
  VIEWED:      { label: "Viewed",      color: "text-purple-700",  bg: "bg-purple-100" },
  SHORTLISTED: { label: "Shortlisted", color: "text-green-700",   bg: "bg-green-100" },
  INTERVIEW:   { label: "Interview",   color: "text-orange-700",  bg: "bg-orange-100" },
  OFFERED:     { label: "Offered",     color: "text-emerald-700", bg: "bg-emerald-100" },
  HIRED:       { label: "Hired 🎉",    color: "text-primary",     bg: "bg-primary/10" },
  REJECTED:    { label: "Not Moved",   color: "text-red-700",     bg: "bg-red-100" },
}

export default function CandidateDashboard() {
  const { data: session } = useSession() ?? {}
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
  const offered = applications.filter(a => ["OFFERED", "HIRED"].includes(a.status)).length
  const recent = applications.slice(0, 5)

  const firstName = session?.user?.name?.split(" ")[0] || "there"

  return (
    <div>
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy">Welcome back, {firstName}! 👋</h1>
        <p className="text-gray-500 text-sm mt-1">Track your job applications and stay on top of opportunities.</p>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Applied", value: applications.length, icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Shortlisted", value: shortlisted, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
            { label: "Interviews", value: interviews, icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
            { label: "Offers", value: offered, icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-5 shadow-3d border border-gray-100 card-3d">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className="text-2xl font-bold text-navy">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Applications - wider */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-3d border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-navy">Recent Applications</h2>
            <Link href="/candidate/applications" className="text-sm text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-6"><Loader2 className="w-5 h-5 animate-spin text-primary" /></div>
          ) : recent.length === 0 ? (
            <div className="text-center py-10">
              <Briefcase className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm mb-3">No applications yet</p>
              <Link href="/jobs" className="text-primary text-sm hover:underline font-medium">Browse Jobs →</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recent.map(app => {
                const statusCfg = STATUS_CONFIG[app.status] || { label: app.status, color: "text-gray-700", bg: "bg-gray-100" }
                return (
                  <Link key={app.id} href={`/jobs/${app.job.slug}`}
                    className="flex items-start gap-3 p-3.5 bg-gray-50 hover:bg-primary/5 rounded-xl transition-colors group">
                    <div className="w-10 h-10 bg-white rounded-xl border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-navy text-sm group-hover:text-primary transition-colors truncate">
                        {app.job.title}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3 h-3" />{app.job.employer?.companyName || "Company"}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />{app.job.city}, {app.job.state}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(app.appliedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                        </span>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap shrink-0 ${statusCfg.bg} ${statusCfg.color}`}>
                      {statusCfg.label}
                    </span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-5">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100">
            <h2 className="text-base font-bold text-navy mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/jobs" className="flex items-center gap-3 p-3.5 bg-primary/5 rounded-xl border border-primary/10 hover:bg-primary/10 transition-colors">
                <Briefcase className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <div className="font-medium text-navy text-sm">Browse Jobs</div>
                  <div className="text-xs text-gray-400">Find new opportunities</div>
                </div>
              </Link>
              <Link href="/candidate/profile" className="flex items-center gap-3 p-3.5 bg-blue-50 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors">
                <User className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <div className="font-medium text-navy text-sm">Update Profile</div>
                  <div className="text-xs text-gray-400">Add experience & skills</div>
                </div>
              </Link>
              <Link href="/candidate/applications" className="flex items-center gap-3 p-3.5 bg-green-50 rounded-xl border border-green-100 hover:bg-green-100 transition-colors">
                <FileText className="w-5 h-5 text-green-600 shrink-0" />
                <div>
                  <div className="font-medium text-navy text-sm">All Applications</div>
                  <div className="text-xs text-gray-400">{applications.length} applied so far</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Application Status Legend */}
          <div className="bg-white rounded-2xl p-5 shadow-3d border border-gray-100">
            <h3 className="text-sm font-bold text-navy mb-3">Status Guide</h3>
            <div className="space-y-1.5">
              {Object.entries(STATUS_CONFIG).filter(([k]) => k !== "REJECTED").map(([, cfg]) => (
                <div key={cfg.label} className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${cfg.bg.replace("bg-", "bg-")} shrink-0`} style={{background: cfg.color.replace("text-", "")}} />
                  <span className={`text-xs px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color} font-medium`}>{cfg.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
