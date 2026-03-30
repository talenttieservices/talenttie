"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Briefcase, Users, CheckCircle2, UserCheck, PlusCircle, ArrowRight, Loader2 } from "lucide-react"

interface Stats {
  activeJobs: number
  applications: number
  shortlisted: number
  hired: number
}

export default function EmployerDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/employer/stats")
      .then(r => r.json())
      .then(data => setStats(data))
      .catch(() => setStats({ activeJobs: 0, applications: 0, shortlisted: 0, hired: 0 }))
      .finally(() => setLoading(false))
  }, [])

  const statCards = stats ? [
    { label: "Active Jobs", value: stats.activeJobs, icon: Briefcase, color: "bg-blue-100 text-blue-700" },
    { label: "Applications", value: stats.applications, icon: Users, color: "bg-green-100 text-green-700" },
    { label: "Shortlisted", value: stats.shortlisted, icon: CheckCircle2, color: "bg-orange-100 text-orange-700" },
    { label: "Hired", value: stats.hired, icon: UserCheck, color: "bg-purple-100 text-purple-700" },
  ] : []

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy">Employer Dashboard</h1>
        <Link href="/employer/jobs/new" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl btn-3d text-sm font-medium">
          <PlusCircle className="w-4 h-4" />Post New Job
        </Link>
      </div>

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

      <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-navy">Quick Actions</h2>
          <Link href="/employer/jobs" className="text-sm text-primary hover:underline flex items-center gap-1">
            My Jobs<ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/employer/jobs/new"
            className="flex items-center gap-3 p-4 border border-primary/20 rounded-xl hover:bg-primary/5 transition-colors">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <PlusCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-navy text-sm">Post a New Job</div>
              <div className="text-xs text-gray-500">Reach thousands of candidates</div>
            </div>
          </Link>
          <Link href="/employer/jobs"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <div className="font-semibold text-navy text-sm">View My Jobs</div>
              <div className="text-xs text-gray-500">Manage your postings</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
