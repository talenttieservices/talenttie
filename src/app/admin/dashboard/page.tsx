"use client"
import { useEffect, useState } from "react"
import { Users, Briefcase, FileText, Building2, BookOpen, Loader2 } from "lucide-react"

interface Stats {
  users: number
  jobs: number
  applications: number
  employers: number
  blogs: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(r => r.json())
      .then(data => setStats(data))
      .catch(() => setStats({ users: 0, jobs: 0, applications: 0, employers: 0, blogs: 0 }))
      .finally(() => setLoading(false))
  }, [])

  const statCards = stats ? [
    { label: "Total Users", value: stats.users.toLocaleString(), icon: Users, color: "bg-blue-100 text-blue-700" },
    { label: "Active Jobs", value: stats.jobs.toLocaleString(), icon: Briefcase, color: "bg-green-100 text-green-700" },
    { label: "Applications", value: stats.applications.toLocaleString(), icon: FileText, color: "bg-purple-100 text-purple-700" },
    { label: "Employers", value: stats.employers.toLocaleString(), icon: Building2, color: "bg-orange-100 text-orange-700" },
    { label: "Published Blogs", value: stats.blogs.toLocaleString(), icon: BookOpen, color: "bg-cyan-100 text-cyan-700" },
  ] : []

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">Admin Dashboard</h1>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {statCards.map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-5 shadow-3d border border-gray-100 card-3d">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center`}>
                  <s.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-bold text-navy">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100">
          <h2 className="text-lg font-bold text-navy mb-4">Jobs by Industry</h2>
          <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-xl">Chart coming soon</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100">
          <h2 className="text-lg font-bold text-navy mb-4">Applications Trend</h2>
          <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-xl">Chart coming soon</div>
        </div>
      </div>
    </div>
  )
}
