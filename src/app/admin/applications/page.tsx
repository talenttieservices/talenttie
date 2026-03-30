"use client"
import { useState, useEffect, useCallback, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  Search, Phone, Mail, Briefcase, Calendar, Download, RefreshCw,
  CheckSquare, Square, Filter, ChevronDown, X, FileText,
  ExternalLink, MessageSquare, Clock, User,
} from "lucide-react"
import { GUEST_APP_STATUS } from "@/lib/constants"

interface Application {
  id: string
  name: string
  email: string
  phone: string
  experience: number | null
  salaryExpectation: number | null
  resumeUrl: string | null
  resumeFilename: string | null
  message: string | null
  notes: string | null
  status: string
  appliedAt: string
  updatedAt: string
  jobId: string
  jobTitle: string
  jobSlug: string
  jobCity: string
}

const STATUS_MAP = Object.fromEntries(GUEST_APP_STATUS.map(s => [s.value, s]))

// ── Profile Slide-over Panel ──────────────────────────────────────────────────
function ProfilePanel({
  app, onClose, onStatusChange, onNotesUpdate,
}: {
  app: Application
  onClose: () => void
  onStatusChange: (id: string, status: string) => void
  onNotesUpdate: (id: string, notes: string) => void
}) {
  const [notes, setNotes] = useState(app.notes || "")
  const [savingNotes, setSavingNotes] = useState(false)

  async function saveNotes() {
    setSavingNotes(true)
    await fetch(`/api/admin/applications/${app.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    })
    onNotesUpdate(app.id, notes)
    setSavingNotes(false)
  }

  const statusInfo = STATUS_MAP[app.status]

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={onClose} />

      {/* Slide-over */}
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white z-50 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#1C2E3D] px-6 py-5 flex items-start justify-between gap-4 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-white">{app.name}</h2>
            <p className="text-white/60 text-sm mt-0.5">
              Applied for <span className="text-primary font-medium">{app.jobTitle}</span> · {app.jobCity}
            </p>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white mt-0.5">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status bar */}
        <div className="bg-gray-50 border-b border-gray-100 px-6 py-3 flex items-center gap-3 shrink-0">
          <span className="text-xs text-gray-500 font-medium">STATUS:</span>
          <div className="flex flex-wrap gap-2">
            {GUEST_APP_STATUS.map(s => (
              <button key={s.value} onClick={() => onStatusChange(app.id, s.value)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  app.status === s.value
                    ? s.color + " ring-2 ring-offset-1 ring-current"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">

          {/* Contact */}
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />Contact Information
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2.5">
              <a href={`mailto:${app.email}`}
                className="flex items-center gap-3 text-sm hover:text-primary transition-colors group">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-primary/10">
                  <Mail className="w-4 h-4 text-blue-500 group-hover:text-primary" />
                </div>
                <span className="text-gray-700">{app.email}</span>
              </a>
              <a href={`tel:${app.phone}`}
                className="flex items-center gap-3 text-sm hover:text-primary transition-colors group">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-primary/10">
                  <Phone className="w-4 h-4 text-green-500 group-hover:text-primary" />
                </div>
                <span className="text-gray-700">{app.phone}</span>
              </a>
              <a href={`https://wa.me/${app.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                `Hi ${app.name}, we received your application for ${app.jobTitle}. We'd like to discuss further. - TalentTie`
              )}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm hover:text-[#1da851] transition-colors group">
                <div className="w-8 h-8 bg-[#25D366]/10 rounded-lg flex items-center justify-center group-hover:bg-[#25D366]/20">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.505 3.927 1.395 5.594L0 24l6.615-1.733A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.671-.525-5.188-1.437l-.372-.221-3.852 1.01 1.027-3.756-.243-.389A10 10 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                </div>
                <span className="text-gray-700">WhatsApp Message</span>
                <ExternalLink className="w-3 h-3 text-gray-400 ml-auto" />
              </a>
            </div>
          </section>

          {/* Application Details */}
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />Application Details
            </h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Job Applied For</p>
                  <a href={`/jobs/${app.jobSlug}`} target="_blank"
                    className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                    {app.jobTitle} <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-xs text-gray-400">{app.jobCity}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Experience</p>
                  <p className="text-sm font-medium text-navy">
                    {app.experience !== null ? `${app.experience} ${app.experience === 1 ? "year" : "years"}` : "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Expected Salary</p>
                  <p className="text-sm font-medium text-navy">
                    {app.salaryExpectation ? `INR ${(app.salaryExpectation / 100000).toFixed(1)} LPA` : "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Applied On</p>
                  <p className="text-sm font-medium text-navy">
                    {new Date(app.appliedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cover Message */}
          {app.message && (
            <section>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />Cover Message
              </h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{app.message}</p>
              </div>
            </section>
          )}

          {/* Resume */}
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />Resume / CV
            </h3>
            {app.resumeFilename ? (
              <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-navy truncate">{app.resumeFilename}</p>
                  <p className="text-xs text-gray-400">PDF / Word Document</p>
                </div>
                <a href={`/api/admin/resumes/${app.id}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shrink-0">
                  <Download className="w-4 h-4" />View
                </a>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-4 text-center text-gray-400 text-sm">
                No resume uploaded
              </div>
            )}
          </section>

          {/* Internal Notes */}
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />Internal Notes
            </h3>
            <textarea
              rows={3}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Add private notes about this candidate (visible only to admin)..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
            <button onClick={saveNotes} disabled={savingNotes}
              className="mt-2 px-4 py-2 bg-navy text-white rounded-lg text-sm font-medium hover:bg-navy-dark disabled:opacity-50 transition-colors">
              {savingNotes ? "Saving..." : "Save Notes"}
            </button>
          </section>
        </div>

        {/* Footer actions */}
        <div className="border-t border-gray-100 px-6 py-4 shrink-0 flex gap-3 bg-white">
          <a href={`mailto:${app.email}?subject=Regarding your application for ${app.jobTitle}`}
            className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
            <Mail className="w-4 h-4" />Send Email
          </a>
          <button onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
            Close
          </button>
        </div>
      </div>
    </>
  )
}

// ── Main Applications Page ─────────────────────────────────────────────────────
function ApplicationsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [applications, setApplications] = useState<Application[]>([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("ALL")
  const [jobFilter] = useState(searchParams.get("jobId") || "")
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [bulkStatus, setBulkStatus] = useState("")
  const [bulkLoading, setBulkLoading] = useState(false)
  const [openStatusMenu, setOpenStatusMenu] = useState<string | null>(null)
  const [activeProfile, setActiveProfile] = useState<Application | null>(null)

  const load = useCallback(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (filter !== "ALL") params.set("status", filter)
    if (jobFilter) params.set("jobId", jobFilter)
    fetch(`/api/admin/applications?${params}`)
      .then(r => r.json())
      .then(d => { setApplications(d.applications || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [search, filter, jobFilter])

  useEffect(() => { load() }, [load])

  const updateStatus = async (id: string, status: string) => {
    setOpenStatusMenu(null)
    await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    if (activeProfile?.id === id) setActiveProfile(prev => prev ? { ...prev, status } : prev)
  }

  const updateNotes = (id: string, notes: string) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, notes } : a))
    if (activeProfile?.id === id) setActiveProfile(prev => prev ? { ...prev, notes } : prev)
  }

  const bulkUpdate = async () => {
    if (!bulkStatus || selected.size === 0) return
    setBulkLoading(true)
    await fetch("/api/admin/applications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: Array.from(selected), status: bulkStatus }),
    })
    setApplications(prev => prev.map(a => selected.has(a.id) ? { ...a, status: bulkStatus } : a))
    setSelected(new Set())
    setBulkStatus("")
    setBulkLoading(false)
  }

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const selectAll = () => {
    if (selected.size === applications.length) setSelected(new Set())
    else setSelected(new Set(applications.map(a => a.id)))
  }

  const statusCounts: Record<string, number> = { ALL: applications.length }
  for (const a of applications) statusCounts[a.status] = (statusCounts[a.status] || 0) + 1

  const exportCSV = () => {
    const rows = [
      ["Name", "Email", "Phone", "Experience", "Expected Salary", "Job", "City", "Status", "Applied Date", "Message"],
      ...applications.map(a => [
        a.name, a.email, a.phone,
        a.experience !== null ? `${a.experience} yrs` : "",
        a.salaryExpectation ? `${(a.salaryExpectation / 100000).toFixed(1)} LPA` : "",
        a.jobTitle, a.jobCity, a.status,
        new Date(a.appliedAt).toLocaleDateString("en-IN"),
        a.message || "",
      ])
    ]
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = "applications.csv"; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h1 className="text-2xl font-bold text-navy">Applications</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Name, email, phone..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 w-56" />
          </div>
          <button onClick={load} className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-navy transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {["ALL", ...GUEST_APP_STATUS.map(s => s.value)].map(key => (
          <button key={key} onClick={() => setFilter(key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${filter === key ? "bg-primary text-white shadow-sm" : "bg-white text-gray-500 border border-gray-200 hover:border-primary hover:text-primary"}`}>
            {key} <span className="opacity-70">({statusCounts[key] || 0})</span>
          </button>
        ))}
      </div>

      {/* Job filter banner */}
      {jobFilter && (
        <div className="mb-4 flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-xl px-4 py-2 text-sm">
          <Filter className="w-4 h-4 text-primary" />
          <span className="text-navy font-medium">Filtered by Job ID: {jobFilter}</span>
          <button onClick={() => router.push("/admin/applications")} className="ml-auto text-gray-400 hover:text-red-500 text-xs underline">Clear</button>
        </div>
      )}

      {/* Bulk action */}
      {selected.size > 0 && (
        <div className="mb-4 flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
          <span className="text-sm font-medium text-navy">{selected.size} selected</span>
          <select value={bulkStatus} onChange={e => setBulkStatus(e.target.value)}
            className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm">
            <option value="">Change status to...</option>
            {GUEST_APP_STATUS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <button onClick={bulkUpdate} disabled={!bulkStatus || bulkLoading}
            className="px-4 py-1.5 bg-primary text-white rounded-lg text-sm font-medium disabled:opacity-50">
            {bulkLoading ? "Updating..." : "Apply to All"}
          </button>
          <button onClick={() => setSelected(new Set())} className="ml-auto text-xs text-gray-400 hover:text-red-500">Clear</button>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="py-16 text-center text-gray-400">Loading applications...</div>
      ) : applications.length === 0 ? (
        <div className="py-16 text-center text-gray-400">No applications found</div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[2rem_1fr_auto_auto_auto] lg:grid-cols-[2rem_2fr_1.5fr_1fr_1fr_auto] items-center gap-3 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
            <button onClick={selectAll}>
              {selected.size === applications.length && applications.length > 0
                ? <CheckSquare className="w-4 h-4 text-primary" />
                : <Square className="w-4 h-4" />}
            </button>
            <span>Candidate</span>
            <span className="hidden lg:block">Job Applied</span>
            <span className="hidden lg:block">Experience</span>
            <span className="hidden lg:block">Salary Exp.</span>
            <span>Status</span>
          </div>

          <div className="divide-y divide-gray-50">
            {applications.map(app => {
              const statusInfo = STATUS_MAP[app.status]
              return (
                <div key={app.id} className={`grid grid-cols-[2rem_1fr_auto_auto_auto] lg:grid-cols-[2rem_2fr_1.5fr_1fr_1fr_auto] items-center gap-3 px-5 py-4 hover:bg-gray-50/60 transition-colors cursor-pointer ${selected.has(app.id) ? "bg-primary/5" : ""}`}
                  onClick={() => setActiveProfile(app)}>
                  {/* Checkbox */}
                  <div onClick={e => { e.stopPropagation(); toggleSelect(app.id) }}>
                    {selected.has(app.id)
                      ? <CheckSquare className="w-4 h-4 text-primary" />
                      : <Square className="w-4 h-4 text-gray-300 hover:text-primary transition-colors" />}
                  </div>

                  {/* Candidate info */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-navy text-sm">{app.name}</span>
                      {app.resumeFilename && (
                        <span className="flex items-center gap-0.5 text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded-md">
                          <FileText className="w-2.5 h-2.5" />CV
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                      <span>{app.email}</span>
                      <span>{app.phone}</span>
                    </div>
                    {app.message && (
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 italic">&quot;{app.message}&quot;</p>
                    )}
                  </div>

                  {/* Job */}
                  <div className="hidden lg:block">
                    <span className="text-sm text-primary font-medium">{app.jobTitle}</span>
                    <div className="text-xs text-gray-400">{app.jobCity}</div>
                  </div>

                  {/* Experience */}
                  <div className="hidden lg:block text-sm text-gray-600">
                    {app.experience !== null ? `${app.experience} yr${app.experience !== 1 ? "s" : ""}` : "—"}
                  </div>

                  {/* Salary */}
                  <div className="hidden lg:block text-sm text-gray-600">
                    {app.salaryExpectation ? `${(app.salaryExpectation / 100000).toFixed(1)} LPA` : "—"}
                  </div>

                  {/* Status dropdown */}
                  <div className="relative" onClick={e => e.stopPropagation()}>
                    <button onClick={() => setOpenStatusMenu(openStatusMenu === app.id ? null : app.id)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${statusInfo?.color || "bg-gray-100 text-gray-500"}`}>
                      {statusInfo?.label || app.status}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    {openStatusMenu === app.id && (
                      <div className="absolute right-0 top-9 bg-white border border-gray-200 rounded-xl shadow-lg z-20 min-w-40 py-1 overflow-hidden">
                        {GUEST_APP_STATUS.map(s => (
                          <button key={s.value} onClick={() => updateStatus(app.id, s.value)}
                            className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-50 flex items-center gap-2 ${app.status === s.value ? "font-bold text-navy" : "text-gray-600"}`}>
                            <span className={`w-2 h-2 rounded-full inline-block ${s.color.split(" ")[0]}`} />
                            {s.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Close status dropdown on outside click */}
      {openStatusMenu && <div className="fixed inset-0 z-10" onClick={() => setOpenStatusMenu(null)} />}

      {/* Profile Panel */}
      {activeProfile && (
        <ProfilePanel
          app={activeProfile}
          onClose={() => setActiveProfile(null)}
          onStatusChange={updateStatus}
          onNotesUpdate={updateNotes}
        />
      )}
    </div>
  )
}

export default function AdminApplicationsPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-gray-400">Loading...</div>}>
      <ApplicationsContent />
    </Suspense>
  )
}
