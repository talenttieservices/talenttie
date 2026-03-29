"use client"
import Link from "next/link"
import { Briefcase, Users, CheckCircle2, UserCheck, PlusCircle, ArrowRight } from "lucide-react"

const stats = [
  { label: "Active Jobs", value: "8", icon: Briefcase, color: "bg-blue-100 text-blue-700" },
  { label: "Applications", value: "145", icon: Users, color: "bg-green-100 text-green-700" },
  { label: "Shortlisted", value: "23", icon: CheckCircle2, color: "bg-orange-100 text-orange-700" },
  { label: "Hired", value: "5", icon: UserCheck, color: "bg-purple-100 text-purple-700" },
]

export default function EmployerDashboard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy">Employer Dashboard</h1>
        <Link href="/employer/jobs/new" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl btn-3d text-sm font-medium"><PlusCircle className="w-4 h-4" />Post New Job</Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-3d border border-gray-100 card-3d">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}><s.icon className="w-5 h-5" /></div>
            <div className="text-2xl font-bold text-navy">{s.value}</div>
            <div className="text-sm text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100">
        <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold text-navy">Recent Applications</h2><Link href="/employer/jobs" className="text-sm text-primary hover:underline flex items-center gap-1">View All<ArrowRight className="w-3 h-3" /></Link></div>
        <div className="text-center py-8 text-gray-400">No recent applications. <Link href="/employer/jobs/new" className="text-primary hover:underline">Post a job</Link> to start receiving applications.</div>
      </div>
    </div>
  )
}
