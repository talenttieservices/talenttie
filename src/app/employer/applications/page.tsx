"use client"
import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import {
  Users, Loader2, Search, X, FileText,
  ChevronDown, Mail, Phone, Download, StickyNote, ExternalLink,
} from "lucide-react"
import { GUEST_APP_STATUS } from "@/lib/constants"

interface Application {
  id: string
  jobId: string
  name: string
  email: string
  phone: string
  experience: string
  salaryExpectation: string
  message: string
  status: string
  notes: string | null
  appliedAt: string
  resumeUrl: string | null
  resumeFilename: string | null
  jobTitle: string
  jobSlug: string
  jobCity: string
}

const statusInfo = Object.fromEntries(GUEST_APP_STATUS.map(s => [s.value, s]))

export default function EmployerApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [bulkStatus, setBulkStatus] = useState("")
  const [activeApp, setActiveApp] = useState<Application | null>(null)
  const [noteText, setNoteText] = useState("")
  const [savingNote, setSavingNote] = useState(false)
  const [jobs, setJobs] = useState<{ id: string; title: string }[]>([])
  const [jobFilter, setJobFilter] = useState("ALL")

  // Load employer's jobs for filter
  useEffect(() => {
    fetch("/api/employer/my-jobs")
      .then(r => r.json())
      .then(d => setJobs((d.jobs || []).map((j: { id: string; title: string }) => ({ id: j.id, title: j.title }))))
      .catch(() => {})
  }, [])

  const fetchApplications = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter !== "ALL") params.set("status", statusFilter)
      if (search) params.set("search", search)
      if (jobFilter !== "ALL") params.set("jobId", jobFilter)
      const res = await fetch(`/api/employer/applications?${params}`)
      const data = await res.json()
      setApplications(data.applications || [])
    } catch {
      setApplications([])
    } finally {
      setLoading(false)
    }
  }, [statusFilter, search, jobFilter])

  useEffect(() => {
    fetchApplications()
  }, [fetchApplications])

  async function updateStatus(appId: string, jobId: string, status: string) {
    await fetch(`/api/employer/jobs/${jobId}/applicants`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appId, status }),
    })
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status } : a))
    if (activeApp?.id === appId) setActiveApp(prev => prev ? { ...prev, status } : null)
  }

  async function applyBulkStatus() {
    if (!bulkStatus || selected.size === 0) return
    // Group by jobId
    const grouped: Record<string, string[]> = {}
    applications.filter(a => selected.has(a.id)).forEach(a => {
      if (!grouped[a.jobId]) grouped[a.jobId] = []
      grouped[a.jobId].push(a.id)
    })
    await Promise.all(Object.entries(grouped).map(([jobId, ids]) =>
      fetch(`/api/employer/jobs/${jobId}/applicants`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids, status: bulkStatus }),
      })
    ))
    const ids = Array.from(selected)
    setApplications(prev => prev.map(a => ids.includes(a.id) ? { ...a, status: bulkStatus } : a))
    setSelected(new Set())
    setBulkStatus("")
  }

  async function saveNote() {
    if (!activeApp) return
    setSavingNote(true)
    await fetch(`/api/employer/jobs/${activeApp.jobId}/applicants`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appId: activeApp.id, notes: noteText }),
    })
    setApplications(prev => prev.map(a => a.id === activeApp.id ? { ...a, notes: noteText } : a))
    setActiveApp(prev => prev ? { ...prev, notes: noteText } : null)
    setSavingNote(false)
  }

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const openPanel = (app: Application) => {
    setActiveApp(app)
    setNoteText(app.notes || "")
  }

  const totalByStatus = GUEST_APP_STATUS.reduce((acc, s) => {
    acc[s.value] = applications.filter(a => a.status === s.value).length
    return acc
  }, {} as Record<string, number>)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">All Applications</h1>
          <p className="text-sm text-gray-500 mt-0.5">{applications.length} total application{applications.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 flex-wrap mb-4">
        <button onClick={() => setStatusFilter("ALL")}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${statusFilter === "ALL" ? "bg-navy text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
          All ({applications.length})
        </button>
        {GUEST_APP_STATUS.map(s => (
          <button key={s.value} onClick={() => setStatusFilter(s.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${statusFilter === s.value ? "bg-navy text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            {s.label} ({totalByStatus[s.value] || 0})
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email or phone..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {jobs.length > 0 && (
          <select value={jobFilter} onChange={e => setJobFilter(e.target.value)}
            className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option value="ALL">All Jobs</option>
            {jobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
          </select>
        )}

        {selected.size > 0 && (
          <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-xl px-3 py-1.5">
            <span className="text-sm text-primary font-medium">{selected.size} selected</span>
            <select value={bulkStatus} onChange={e => setBulkStatus(e.target.value)}
              className="text-sm border-0 bg-transparent text-gray-600 focus:outline-none">
              <option value="">Change status...</option>
              {GUEST_APP_STATUS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            {bulkStatus && (
              <button onClick={applyBulkStatus}
                className="px-3 py-1 bg-primary text-white rounded-lg text-xs font-medium">
                Apply
              </button>
            )}
            <button onClick={() => setSelected(new Set())} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : applications.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-3d border border-gray-100 text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-navy mb-2">No applications yet</h3>
          <p className="text-gray-500">Applications will appear here once candidates apply to your jobs.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-3d overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-3 px-4 text-left">
                  <input type="checkbox"
                    checked={selected.size === applications.length && applications.length > 0}
                    onChange={() => {
                      if (selected.size === applications.length) setSelected(new Set())
                      else setSelected(new Set(applications.map(a => a.id)))
                    }}
                    className="w-4 h-4 accent-primary" />
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-500">Candidate</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500 hidden md:table-cell">Job</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500 hidden lg:table-cell">Experience</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500">Status</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500 hidden sm:table-cell">Applied</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500">Resume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {applications.map(app => {
                const si = statusInfo[app.status] || { label: app.status, color: "bg-gray-100 text-gray-600" }
                return (
                  <tr key={app.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="py-3 px-4">
                      <input type="checkbox" checked={selected.has(app.id)} onChange={() => toggleSelect(app.id)}
                        className="w-4 h-4 accent-primary" onClick={e => e.stopPropagation()} />
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-left w-full" onClick={() => openPanel(app)}>
                        <div className="font-medium text-navy group-hover:text-primary transition-colors">{app.name}</div>
                        <div className="text-xs text-gray-400 flex items-center gap-3 mt-0.5">
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{app.email}</span>
                        </div>
                      </button>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <Link href={`/employer/jobs/${app.jobId}/applicants`}
                        className="text-primary hover:underline text-xs font-medium flex items-center gap-1">
                        {app.jobTitle}
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                      <div className="text-xs text-gray-400">{app.jobCity}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 hidden lg:table-cell">
                      {app.experience ? `${app.experience} yrs` : "-"}
                    </td>
                    <td className="py-3 px-4">
                      <div className="relative">
                        <select value={app.status}
                          onChange={e => updateStatus(app.id, app.jobId, e.target.value)}
                          className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none pr-6 ${si.color}`}>
                          {GUEST_APP_STATUS.map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-60" />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs hidden sm:table-cell">
                      {new Date(app.appliedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="py-3 px-4">
                      {app.resumeUrl ? (
                        <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 text-primary text-xs font-medium hover:underline">
                          <FileText className="w-3.5 h-3.5" />View
                        </a>
                      ) : (
                        <span className="text-gray-300 text-xs">No resume</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Profile Slide-over */}
      {activeApp && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setActiveApp(null)} />
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-start justify-between shrink-0">
              <div>
                <h2 className="font-bold text-navy text-lg">{activeApp.name}</h2>
                <p className="text-sm text-gray-500">{activeApp.email}</p>
                {activeApp.phone && <p className="text-sm text-gray-500">{activeApp.phone}</p>}
                <Link href={`/employer/jobs/${activeApp.jobId}/applicants`}
                  className="text-xs text-primary hover:underline flex items-center gap-1 mt-1">
                  {activeApp.jobTitle} <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
              <button onClick={() => setActiveApp(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Status</label>
                <select value={activeApp.status} onChange={e => updateStatus(activeApp.id, activeApp.jobId, e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                  {GUEST_APP_STATUS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {activeApp.experience && (
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500 mb-1">Experience</p>
                    <p className="text-sm font-semibold text-navy">{activeApp.experience} yrs</p>
                  </div>
                )}
                {activeApp.salaryExpectation && (
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500 mb-1">Expected CTC</p>
                    <p className="text-sm font-semibold text-navy">₹{activeApp.salaryExpectation}</p>
                  </div>
                )}
              </div>

              {activeApp.message && (
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Cover Letter</label>
                  <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto">
                    {activeApp.message}
                  </div>
                </div>
              )}

              {activeApp.resumeUrl && (
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Resume</label>
                  <a href={activeApp.resumeUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-xl hover:bg-primary/10 transition-colors">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-navy truncate">{activeApp.resumeFilename || "Resume"}</p>
                    </div>
                    <Download className="w-4 h-4 text-primary shrink-0" />
                  </a>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                  <StickyNote className="w-3.5 h-3.5" />Internal Notes
                </label>
                <textarea value={noteText} onChange={e => setNoteText(e.target.value)} rows={3}
                  placeholder="Add internal notes..."
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                <button onClick={saveNote} disabled={savingNote}
                  className="mt-2 px-4 py-2 bg-primary text-white text-xs font-medium rounded-xl hover:bg-primary/90 disabled:opacity-60">
                  {savingNote ? "Saving..." : "Save Note"}
                </button>
              </div>

              <div className="flex gap-3">
                <a href={`mailto:${activeApp.email}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />Email
                </a>
                {activeApp.phone && (
                  <a href={`tel:${activeApp.phone}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors">
                    <Phone className="w-4 h-4" />Call
                  </a>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
