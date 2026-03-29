"use client"
import Link from "next/link"
import { Briefcase, CheckCircle2, Clock, User, ArrowRight, FileText } from "lucide-react"

const stats = [
  { label: "Applications", value: "12", icon: FileText, color: "bg-blue-100 text-blue-700" },
  { label: "Shortlisted", value: "3", icon: CheckCircle2, color: "bg-green-100 text-green-700" },
  { label: "Interviews", value: "1", icon: Clock, color: "bg-orange-100 text-orange-700" },
  { label: "Profile", value: "75%", icon: User, color: "bg-purple-100 text-purple-700" },
]

const recentApps = [
  { title: "Relationship Manager", company: "National Trust Bank", status: "SHORTLISTED", date: "27-Mar-2026" },
  { title: "Insurance Advisor", company: "SecureLife Insurance", status: "APPLIED", date: "25-Mar-2026" },
  { title: "Area Sales Manager", company: "HUL", status: "VIEWED", date: "23-Mar-2026" },
]

const statusColors: Record<string, string> = { APPLIED: "bg-blue-100 text-blue-700", SHORTLISTED: "bg-green-100 text-green-700", VIEWED: "bg-purple-100 text-purple-700", INTERVIEW: "bg-orange-100 text-orange-700" }

export default function CandidateDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">Welcome back!</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-3d border border-gray-100 card-3d">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}><s.icon className="w-5 h-5" /></div>
            <div className="text-2xl font-bold text-navy">{s.value}</div>
            <div className="text-sm text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100">
          <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold text-navy">Recent Applications</h2><Link href="/candidate/applications" className="text-sm text-primary hover:underline flex items-center gap-1">View All<ArrowRight className="w-3 h-3" /></Link></div>
          <div className="space-y-3">
            {recentApps.map(app => (
              <div key={app.title} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div><div className="font-medium text-navy text-sm">{app.title}</div><div className="text-xs text-gray-400">{app.company} &middot; {app.date}</div></div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[app.status] || "bg-gray-100 text-gray-700"}`}>{app.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100">
          <h2 className="text-lg font-bold text-navy mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/candidate/profile" className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10 hover:bg-primary/10 transition-colors"><User className="w-5 h-5 text-primary" /><div><div className="font-medium text-navy text-sm">Complete Your Profile</div><div className="text-xs text-gray-400">Add experience, skills, and resume</div></div></Link>
            <Link href="/jobs" className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors"><Briefcase className="w-5 h-5 text-blue-600" /><div><div className="font-medium text-navy text-sm">Browse Jobs</div><div className="text-xs text-gray-400">5,000+ opportunities across India</div></div></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
