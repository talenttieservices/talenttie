"use client"
import { FileText, Building2, MapPin, Calendar } from "lucide-react"

const applications = [
  { id: "1", title: "Relationship Manager", company: "National Trust Bank", location: "Surat", status: "SHORTLISTED", date: "27-Mar-2026" },
  { id: "2", title: "Insurance Advisor", company: "SecureLife Insurance", location: "Ahmedabad", status: "APPLIED", date: "25-Mar-2026" },
  { id: "3", title: "Area Sales Manager", company: "HUL", location: "Vadodara", status: "VIEWED", date: "23-Mar-2026" },
  { id: "4", title: "Branch Manager", company: "Premier Finance Bank", location: "Jaipur", status: "REJECTED", date: "20-Mar-2026" },
]
const statusColors: Record<string, string> = { APPLIED: "bg-blue-100 text-blue-700", VIEWED: "bg-purple-100 text-purple-700", SHORTLISTED: "bg-green-100 text-green-700", INTERVIEW: "bg-orange-100 text-orange-700", OFFERED: "bg-emerald-100 text-emerald-700", HIRED: "bg-primary/10 text-primary", REJECTED: "bg-red-100 text-red-700" }

export default function ApplicationsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">My Applications</h1>
      <div className="space-y-4">
        {applications.map(app => (
          <div key={app.id} className="bg-white rounded-2xl p-5 shadow-3d border border-gray-100 flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><FileText className="w-6 h-6 text-primary" /></div>
              <div>
                <h3 className="font-semibold text-navy">{app.title}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1"><span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" />{app.company}</span><span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{app.location}</span><span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{app.date}</span></div>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[app.status] || "bg-gray-100 text-gray-700"}`}>{app.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
