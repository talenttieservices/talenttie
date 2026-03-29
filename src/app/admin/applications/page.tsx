"use client"
import { useState, useEffect } from "react"
import { Search, Phone, Mail, Briefcase, Calendar, CheckCircle, XCircle, Clock } from "lucide-react"

interface Application {
  id: string
  name: string
  email: string
  phone: string
  experience: number | null
  salaryExpectation: number | null
  resumeUrl: string | null
  message: string | null
  status: string
  appliedAt: string
  jobId: string
}

const statusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  REVIEWED: "bg-yellow-100 text-yellow-700",
  SHORTLISTED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("ALL")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/applications")
      .then(r => r.json())
      .then(d => { setApplications(d.applications || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/applications/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) })
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a))
  }

  const filtered = applications.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.phone.includes(search) ||
      a.jobId.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === "ALL" || a.status === filter
    return matchSearch && matchFilter
  })

  const counts = {
    ALL: applications.length,
    NEW: applications.filter(a => a.status === "NEW").length,
    SHORTLISTED: applications.filter(a => a.status === "SHORTLISTED").length,
    REJECTED: applications.filter(a => a.status === "REJECTED").length,
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy">Applications</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 w-72"
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {Object.entries(counts).map(([key, count]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === key ? "bg-primary text-white" : "bg-white text-gray-500 border border-gray-200 hover:border-primary hover:text-primary"}`}
          >
            {key} <span className="ml-1 opacity-70">({count})</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-16 text-center text-gray-400">Loading applications...</div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-gray-400">No applications found</div>
      ) : (
        <div className="space-y-4">
          {filtered.map(app => (
            <div key={app.id} className="bg-white rounded-2xl p-5 shadow-3d border border-gray-100">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-navy text-lg">{app.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[app.status] || "bg-gray-100 text-gray-500"}`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-primary" />{app.email}</span>
                    <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-primary" />{app.phone}</span>
                    {app.experience !== null && <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-primary" />{app.experience} yrs exp</span>}
                    {app.salaryExpectation && <span className="flex items-center gap-1.5">Expected: INR {(app.salaryExpectation / 100000).toFixed(1)}L</span>}
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary" />{new Date(app.appliedAt).toLocaleDateString("en-IN")}</span>
                  </div>
                  <div className="text-xs text-gray-400">Job: {app.jobId}</div>
                  {app.message && <p className="text-sm text-gray-600 mt-2 bg-gray-50 rounded-lg px-3 py-2">{app.message}</p>}
                  {app.resumeUrl && <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 text-sm text-primary hover:underline">View Resume →</a>}
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <a href={`https://wa.me/${app.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${app.name}, we received your job application. We will get back to you shortly. - TalentTie`)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-[#25D366]/10 text-[#25D366] rounded-lg text-xs font-medium hover:bg-[#25D366]/20 transition-colors text-center">WhatsApp</a>
                  <button onClick={() => updateStatus(app.id, "SHORTLISTED")} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors flex items-center gap-1"><CheckCircle className="w-3 h-3" />Shortlist</button>
                  <button onClick={() => updateStatus(app.id, "REVIEWED")} className="px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-lg text-xs font-medium hover:bg-yellow-100 transition-colors flex items-center gap-1"><Clock className="w-3 h-3" />Reviewed</button>
                  <button onClick={() => updateStatus(app.id, "REJECTED")} className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors flex items-center gap-1"><XCircle className="w-3 h-3" />Reject</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
