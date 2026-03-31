"use client"
import { useState, useEffect, useCallback } from "react"
import {
  Search, Download, RefreshCw, ChevronDown, X, FileText,
  Mail, Phone, MessageSquare, Clock, User, ExternalLink,
  Filter, Users, Briefcase, CheckSquare, Square, StickyNote,
} from "lucide-react"
import Link from "next/link"
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
  jobId: string
  jobTitle: string
  jobSlug: string
  jobCity: string
}

const STATUS_MAP = Object.fromEntries(GUEST_APP_STATUS.map(s => [s.value, s]))

function CandidatePanel({
  app,
  onClose,
  onStatusChange,
  onNotesUpdate,
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
      <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white z-50 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#1C2E3D] px-6 py-5 flex items-start justify-between gap-4 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-white">{app.name}</h2>
            <p className="text-white/60 text-sm mt-0.5">
              Applied for <span className="text-primary font-medium">{app.jobTitle}</span>
              {app.jobCity && <span> · {app.jobCity}</span>}
            </p>
            <p className="text-white/40 text-xs mt-1">
              {new Date(app.appliedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
            </p>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white mt-0.5">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status row */}
        <div className="bg-gray-50 border-b border-gray-100 px-6 py-3 flex items-center gap-3 shrink-0 flex-wrap">
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

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">

          {/* Contact */}
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />Contact Information
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2.5">
              <a href={`mailto:${app.email}`} className="flex items-center gap-3 text-sm hover:text-primary transition-colors group">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-primary/10">
                  <Mail className="w-4 h-4 text-blue-500 group-hover:text-primary" />
                </div>
                <span className="text-gray-700">{app.email}</span>
              </a>
              {app.phone && (
                <a href={`tel:${app.phone}`} className="flex items-center gap-3 text-sm hover:text-primary transition-colors group">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-primary/10">
                    <Phone className="w-4 h-4 text-green-500 group-hover:text-primary" />
                  </div>
                  <span className="text-gray-700">{app.phone}</span>
                </a>
              )}
              {app.phone && (
                <a href={`https://wa.me/${app.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${app.name}, we received your application for ${app.jobTitle}. - TalentTie`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm hover:text-[#1da851] transition-colors group">
                  <div className="w-8 h-8 bg-[#25D366]/10 rounded-lg flex items-center justify-center group-hover:bg-[#25D366]/20">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.505 3.927 1.395 5.594L0 24l6.615-1.733A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.671-.525-5.188-1.437l-.372-.221-3.852 1.01 1.027-3.756-.243-.389A10 10 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                  </div>
                  <span className="text-gray-700">WhatsApp</span>
                  <ExternalLink className="w-3 h-3 text-gray-400 ml-auto" />
                </a>
              )}
            </div>
          </section>

          {/* Application Details */}
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />Application Details
            </h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <p className="text-xs text-gray-400 mb-0.5">Job Applied For</p>
                  <a href={`/jobs/${app.jobSlug}`} target="_blank"
                    className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                    {app.jobTitle} <ExternalLink className="w-3 h-3" />
                  </a>
                  {app.jobCity && <p className="text-xs text-gray-400">{app.jobCity}</p>}
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Experience</p>
                  <p className="text-sm font-medium text-navy">
                    {app.experience !== null ? `${app.experience} yr${app.experience !== 1 ? "s" : ""}` : "Not specified"}
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
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Current Status</p>
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo?.color || "bg-gray-100 text-gray-500"}`}>
                    {statusInfo?.label || app.status}
                  </span>
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
                  <p className="text-xs text-gray-400">Resume Document</p>
                </div>
                <a href={`/api/admin/resumes/${app.id}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shrink-0">
                  <Download className="w-4 h-4" />View
                </a>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-4 text-center text-gray-400 text-sm">No resume uploaded</div>
            )}
          </section>

          {/* Internal Notes */}
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <StickyNote className="w-3.5 h-3.5" />Internal Notes
            </h3>
            <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="Add private notes about this candidate..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
            <button onClick={saveNotes} disabled={savingNotes}
              className="mt-2 px-4 py-2 bg-navy text-white rounded-lg text-sm font-medium hover:bg-navy/90 disabled:opacity-50 transition-colors">
              {savingNotes ? "Saving..." : "Save Notes"}
            </button>
          </section>
        </div>

        {/* Footer */}
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

export default function AdminCandidatesPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [jobFilter, setJobFilter] = useState("ALL")
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [bulkStatus, setBulkStatus] = useState("")
  const [bulkLoading, setBulkLoading] = useState(false)
  const [activeProfile, setActiveProfile] = useState<Application | null>(null)
  const [jobs, setJobs] = useState<{ id: string; title: string; city: string }[]>([])
  const [openStatusMenu, setOpenStatusMenu] = useState<string | null>(null)

  // Load jobs list for filter
  useEffect(() => {
    fetch("/api/admin/jobs?limit=100")
      .then(r => r.json())
      .then(d => setJobs((d.jobs || []).map((j: {id: string; title: string; city: string}) => ({ id: j.id, title: j.title, city: j.city }))))
      .catch(() => {})
  }, [])

  const load = useCallback(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (statusFilter !== "ALL") params.set("status", statusFilter)
    if (jobFilter !== "ALL") params.set("jobId", jobFilter)
    fetch(`/api/admin/applications?${params}`)
      .then(r => r.json())
      .then(d => { setApplications(d.applications || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [search, statusFilter, jobFilter])

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
      const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n
    })
  }

  const selectAll = () => {
    if (selected.size === applications.length) setSelected(new Set())
    else setSelected(new Set(applications.map(a => a.id)))
  }

  const exportCSV = () => {
    const rows = [
      ["Name", "Email", "Phone", "Experience", "Expected Salary", "Job", "Location", "Status", "Applied Date", "Notes"],
      ...applications.map(a => [
        a.name, a.email, a.phone,
        a.experience !== null ? `${a.experience} yrs` : "",
        a.salaryExpectation ? `${(a.salaryExpectation / 100000).toFixed(1)} LPA` : "",
        a.jobTitle, a.jobCity, a.status,
        new Date(a.appliedAt).toLocaleDateString("en-IN"),
        a.notes || "",
      ])
    ]
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = "candidates.csv"; a.click()
    URL.revokeObjectURL(url)
  }

  const statusCounts: Record<string, number> = { ALL: applications.length }
  for (const a of applications) statusCounts[a.status] = (statusCounts[a.status] || 0) + 1

  const newCount = statusCounts["NEW"] || 0

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-2xl font-bold text-navy flex items-center gap-3">
            Candidates
            {newCount > 0 && (
              <span className="px-2.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                {newCount} NEW
              </span>
            )}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">{applications.length} candidate{applications.length !== 1 ? "s" : ""} found</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Name, email, phone..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 w-48" />
          </div>
          <select value={jobFilter} onChange={e => setJobFilter(e.target.value)}
            className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none max-w-44">
            <option value="ALL">All Jobs</option>
            {jobs.map(j => <option key={j.id} value={j.id}>{j.title} - {j.city}</option>)}
          </select>
          <button onClick={load} className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-navy transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors">
            <Download className="w-4 h-4" />Export
          </button>
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {["ALL", ...GUEST_APP_STATUS.map(s => s.value)].map(key => {
          const info = key === "ALL" ? null : GUEST_APP_STATUS.find(s => s.value === key)
          return (
            <button key={key} onClick={() => setStatusFilter(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${statusFilter === key ? "bg-primary text-white shadow-sm" : "bg-white text-gray-500 border border-gray-200 hover:border-primary hover:text-primary"}`}>
              {key === "ALL" ? "ALL" : info?.label || key}
              <span className="ml-1 opacity-70">({statusCounts[key] || 0})</span>
            </button>
          )
        })}
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="mb-4 flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 flex-wrap">
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

      {/* Table */}
      {loading ? (
        <div className="py-16 text-center text-gray-400">Loading candidates...</div>
      ) : applications.length === 0 ? (
        <div className="py-16 text-center">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400">No candidates found</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <th className="px-4 py-3">
                    <button onClick={selectAll}>
                      {selected.size === applications.length && applications.length > 0
                        ? <CheckSquare className="w-4 h-4 text-primary" />
                        : <Square className="w-4 h-4 text-gray-400" />}
                    </button>
                  </th>
                  <th className="px-4 py-3">Candidate</th>
                  <th className="px-4 py-3 hidden lg:table-cell">Job Applied</th>
                  <th className="px-4 py-3 hidden md:table-cell">Experience</th>
                  <th className="px-4 py-3 hidden lg:table-cell">Expected CTC</th>
                  <th className="px-4 py-3 hidden md:table-cell">Applied</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Resume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {applications.map(app => {
                  const statusInfo = STATUS_MAP[app.status]
                  return (
                    <tr key={app.id}
                      className={`hover:bg-gray-50/60 transition-colors cursor-pointer ${selected.has(app.id) ? "bg-primary/5" : ""}`}
                      onClick={() => setActiveProfile(app)}>
                      <td className="px-4 py-3.5" onClick={e => { e.stopPropagation(); toggleSelect(app.id) }}>
                        {selected.has(app.id)
                          ? <CheckSquare className="w-4 h-4 text-primary" />
                          : <Square className="w-4 h-4 text-gray-300 hover:text-primary transition-colors" />}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xs shrink-0">
                            {app.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-navy text-sm flex items-center gap-1.5">
                              {app.name}
                              {app.resumeFilename && (
                                <span className="text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                  <FileText className="w-2.5 h-2.5" />CV
                                </span>
                              )}
                              {app.notes && (
                                <span className="text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                  <StickyNote className="w-2.5 h-2.5" />Note
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                              <span>{app.email}</span>
                              {app.phone && <span className="hidden sm:block">{app.phone}</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 hidden lg:table-cell">
                        <div className="text-sm text-primary font-medium truncate max-w-[160px]">{app.jobTitle}</div>
                        <div className="text-xs text-gray-400">{app.jobCity}</div>
                      </td>
                      <td className="px-4 py-3.5 text-sm text-gray-600 hidden md:table-cell">
                        {app.experience !== null ? `${app.experience} yr${app.experience !== 1 ? "s" : ""}` : "—"}
                      </td>
                      <td className="px-4 py-3.5 text-sm text-gray-600 hidden lg:table-cell">
                        {app.salaryExpectation ? `${(app.salaryExpectation / 100000).toFixed(1)} LPA` : "—"}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-gray-400 hidden md:table-cell">
                        {new Date(app.appliedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                        <div className="relative">
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
                      </td>
                      <td className="px-4 py-3.5 hidden sm:table-cell">
                        {app.resumeFilename ? (
                          <a href={`/api/admin/resumes/${app.id}`} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="flex items-center gap-1 text-primary text-xs font-medium hover:underline">
                            <FileText className="w-3.5 h-3.5" />View
                          </a>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {openStatusMenu && <div className="fixed inset-0 z-10" onClick={() => setOpenStatusMenu(null)} />}

      {activeProfile && (
        <CandidatePanel
          app={activeProfile}
          onClose={() => setActiveProfile(null)}
          onStatusChange={updateStatus}
          onNotesUpdate={updateNotes}
        />
      )}
    </div>
  )
}
