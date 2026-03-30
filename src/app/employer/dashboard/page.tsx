"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Briefcase, Users, CheckCircle2, UserCheck, PlusCircle,
  ArrowRight, Loader2, Building2, Phone, CalendarDays, BarChart3,
} from "lucide-react"
import { GUEST_APP_STATUS } from "@/lib/constants"

interface Stats {
  activeJobs: number
  totalJobs: number
  applications: number
  shortlisted: number
  hired: number
  teamSize: number
}

interface Application {
  id: string
  name: string
  jobTitle: string
  phone: string
  appliedAt: string
  status: string
}

interface Job {
  id: string
  title: string
  city: string
  applicationCount: number
  status: string
}

interface RecentData {
  applications: Application[]
  jobs: Job[]
}

function StatusBadge({ status }: { status: string }) {
  const match = GUEST_APP_STATUS.find(s => s.value === status)
  const color = match?.color ?? "bg-gray-100 text-gray-600"
  const label = match?.label ?? status
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  )
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
  } catch {
    return iso
  }
}

export default function EmployerDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recent, setRecent] = useState<RecentData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const statsP = fetch("/api/employer/stats").then(r => r.json()).catch(() => null)
    const recentP = fetch("/api/employer/recent-applications").then(r => r.json()).catch(() => null)
    Promise.all([statsP, recentP]).then(([s, r]) => {
      if (s) setStats(s)
      if (r) setRecent(r)
    }).finally(() => setLoading(false))
  }, [])

  const statCards = stats ? [
    {
      label: "Active Jobs", value: stats.activeJobs, icon: Briefcase,
      color: "bg-blue-100 text-blue-700", href: "/employer/jobs",
    },
    {
      label: "Total Applications", value: stats.applications, icon: Users,
      color: "bg-green-100 text-green-700", href: "/employer/applications",
    },
    {
      label: "Shortlisted", value: stats.shortlisted, icon: CheckCircle2,
      color: "bg-orange-100 text-orange-700", href: "/employer/applications",
    },
    {
      label: "Hired", value: stats.hired, icon: UserCheck,
      color: "bg-purple-100 text-purple-700", href: "/employer/applications",
    },
    {
      label: "Team Size", value: stats.teamSize, icon: Users,
      color: "bg-teal-100 text-teal-700", href: "/employer/team",
    },
  ] : []

  const quickActions = [
    {
      href: "/employer/jobs/new", label: "Post a Job",
      desc: "Reach thousands of candidates", icon: PlusCircle, primary: true,
    },
    {
      href: "/employer/applications", label: "Applications",
      desc: "Review & shortlist candidates", icon: Users, primary: false,
    },
    {
      href: "/employer/team", label: "Team",
      desc: "Manage recruiters & managers", icon: Users, primary: false,
    },
    {
      href: "/employer/company-profile", label: "Company Profile",
      desc: "Update branding & details", icon: Building2, primary: false,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Welcome back — here&apos;s your recruitment overview</p>
        </div>
        <Link
          href="/employer/jobs/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl btn-3d text-sm font-medium"
        >
          <PlusCircle className="w-4 h-4" />
          Post New Job
        </Link>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {statCards.map(s => (
            <Link
              key={s.label}
              href={s.href}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 card-3d hover:border-primary/20 transition-colors group"
            >
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-navy">{s.value ?? 0}</div>
              <div className="text-xs text-gray-500 mt-0.5 group-hover:text-primary transition-colors">{s.label}</div>
            </Link>
          ))}
        </div>
      )}

      {/* Main grid */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Recent Applications */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-green-700" />
              </div>
              <h2 className="text-base font-bold text-navy">Recent Applications</h2>
            </div>
            <Link
              href="/employer/applications"
              className="text-xs text-primary hover:underline flex items-center gap-1 font-medium"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : !recent?.applications?.length ? (
            <div className="flex flex-col items-center py-12 text-gray-400">
              <Users className="w-10 h-10 mb-2 opacity-30" />
              <p className="text-sm">No applications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recent.applications.slice(0, 6).map(app => (
                <div key={app.id} className="px-6 py-3.5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-navy truncate">{app.name}</span>
                        <StatusBadge status={app.status} />
                      </div>
                      <p className="text-xs text-gray-500 truncate">{app.jobTitle}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Phone className="w-3 h-3" />{app.phone}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <CalendarDays className="w-3 h-3" />{formatDate(app.appliedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My Jobs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-blue-700" />
              </div>
              <h2 className="text-base font-bold text-navy">My Jobs</h2>
            </div>
            <Link
              href="/employer/jobs"
              className="text-xs text-primary hover:underline flex items-center gap-1 font-medium"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : !recent?.jobs?.length ? (
            <div className="flex flex-col items-center py-12 text-gray-400">
              <Briefcase className="w-10 h-10 mb-2 opacity-30" />
              <p className="text-sm">No jobs posted yet</p>
              <Link href="/employer/jobs/new" className="mt-3 text-xs text-primary font-medium hover:underline">
                Post your first job →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recent.jobs.slice(0, 5).map(job => (
                <div key={job.id} className="px-6 py-3.5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-navy truncate">{job.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-400">{job.city}</span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Users className="w-3 h-3" />{job.applicationCount} applicant{job.applicationCount !== 1 ? "s" : ""}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          job.status === "ACTIVE" ? "bg-green-100 text-green-700" :
                          job.status === "CLOSED" ? "bg-red-100 text-red-700" :
                          "bg-gray-100 text-gray-600"
                        }`}>
                          {job.status === "ACTIVE" ? "Active" : job.status === "CLOSED" ? "Closed" : job.status}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/employer/jobs/${job.id}`}
                      className="text-xs text-primary font-medium hover:underline whitespace-nowrap"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-base font-bold text-navy">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map(action => (
            <Link
              key={action.href}
              href={action.href}
              className={`flex flex-col gap-2 p-4 rounded-xl border transition-all group ${
                action.primary
                  ? "border-primary/20 bg-primary/5 hover:bg-primary/10"
                  : "border-gray-200 hover:border-primary/20 hover:bg-gray-50"
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                action.primary ? "bg-primary/15" : "bg-gray-100 group-hover:bg-primary/10"
              }`}>
                <action.icon className={`w-4 h-4 ${action.primary ? "text-primary" : "text-gray-500 group-hover:text-primary"}`} />
              </div>
              <div>
                <div className={`text-sm font-semibold ${action.primary ? "text-primary" : "text-navy"}`}>
                  {action.label}
                </div>
                <div className="text-xs text-gray-400 mt-0.5 leading-snug">{action.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
