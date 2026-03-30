"use client"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  Search, PlusCircle, Eye, Trash2, Star, StarOff,
  RefreshCw, Upload, CheckSquare, Square, CheckCircle, XCircle,
  ToggleLeft, ToggleRight, ChevronDown,
} from "lucide-react"
import { INDUSTRIES } from "@/lib/constants"

interface Job {
  id: string
  title: string
  slug: string
  industry: string
  city: string
  state: string
  status: string
  featured: boolean
  approvedByAdmin: boolean
  createdAt: string
  workMode: string
  jobType: string
  vacancies: number
  employer?: { companyName: string }
  _count?: { applications: number }
}

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  DRAFT: "bg-gray-100 text-gray-500",
  PAUSED: "bg-yellow-100 text-yellow-700",
  CLOSED: "bg-red-100 text-red-700",
}

const STATUS_ORDER = ["DRAFT", "ACTIVE", "PAUSED", "CLOSED"]

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [bulkAction, setBulkAction] = useState("")
  const [bulkLoading, setBulkLoading] = useState(false)
  const [bulkFile, setBulkFile] = useState<File | null>(null)
  const [bulkUploadLoading, setBulkUploadLoading] = useState(false)
  const [bulkResult, setBulkResult] = useState("")

  const load = useCallback(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (statusFilter !== "ALL") params.set("status", statusFilter)
    fetch(`/api/admin/jobs?${params}`)
      .then(r => r.json())
      .then(d => { setJobs(d.jobs || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [search, statusFilter])

  useEffect(() => { load() }, [load])

  const updateJob = async (id: string, data: Record<string, unknown>) => {
    const res = await fetch(`/api/admin/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      const { job } = await res.json()
      setJobs(prev => prev.map(j => j.id === id ? { ...j, ...job } : j))
    }
  }

  const deleteJob = async (id: string) => {
    const res = await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" })
    if (res.ok) {
      setJobs(prev => prev.filter(j => j.id !== id))
      setDeleteId(null)
      setSelected(prev => { const n = new Set(prev); n.delete(id); return n })
    }
  }

  const bulkUpdate = async () => {
    if (!bulkAction || selected.size === 0) return
    setBulkLoading(true)
    const payload: Record<string, unknown> = { ids: Array.from(selected) }
    if (bulkAction === "ACTIVATE") { payload.status = "ACTIVE"; payload.approvedByAdmin = true }
    else if (bulkAction === "DEACTIVATE") payload.status = "PAUSED"
    else if (bulkAction === "REJECT") { payload.status = "CLOSED"; payload.approvedByAdmin = false }
    else if (bulkAction === "APPROVE") payload.approvedByAdmin = true
    else if (bulkAction === "FEATURE") payload.featured = true
    else if (bulkAction === "UNFEATURE") payload.featured = false
    else if (bulkAction === "DELETE") {
      // delete one by one
      for (const id of Array.from(selected)) await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" })
      setJobs(prev => prev.filter(j => !selected.has(j.id)))
      setSelected(new Set())
      setBulkAction("")
      setBulkLoading(false)
      return
    }
    await fetch("/api/admin/jobs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    setBulkLoading(false)
    setBulkAction("")
    setSelected(new Set())
    load()
  }

  const handleBulkUpload = async () => {
    if (!bulkFile) return
    setBulkUploadLoading(true)
    setBulkResult("")
    const fd = new FormData()
    fd.append("file", bulkFile)
    const res = await fetch("/api/admin/jobs/bulk", { method: "POST", body: fd })
    const data = await res.json()
    setBulkResult(data.message || data.error || "Done")
    setBulkUploadLoading(false)
    setBulkFile(null)
    if (res.ok) load()
  }

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n
    })
  }

  const selectAll = () => {
    if (selected.size === jobs.length) setSelected(new Set())
    else setSelected(new Set(jobs.map(j => j.id)))
  }

  const cycleStatus = (current: string) => STATUS_ORDER[(STATUS_ORDER.indexOf(current) + 1) % STATUS_ORDER.length]

  const counts = { ALL: jobs.length, ACTIVE: 0, DRAFT: 0, PAUSED: 0, CLOSED: 0 }
  for (const j of jobs) counts[j.status as keyof typeof counts] = (counts[j.status as keyof typeof counts] || 0) + 1

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h1 className="text-2xl font-bold text-navy">Jobs Management</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search jobs..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 w-48" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none">
            <option value="ALL">All Status</option>
            {STATUS_ORDER.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button onClick={load} className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-navy transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <Link href="/admin/jobs/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl btn-3d text-sm font-semibold hover:bg-primary/90 transition-colors">
            <PlusCircle className="w-4 h-4" />Post New Job
          </Link>
        </div>
      </div>

      {/* Bulk upload */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-navy flex items-center gap-1.5">
            <Upload className="w-4 h-4 text-primary" />Bulk Upload via Excel
          </span>
          <input type="file" accept=".xlsx,.xls,.csv" onChange={e => setBulkFile(e.target.files?.[0] || null)}
            className="text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:text-sm file:font-medium hover:file:bg-primary/20 cursor-pointer" />
          <button onClick={handleBulkUpload} disabled={!bulkFile || bulkUploadLoading}
            className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium disabled:opacity-50">
            {bulkUploadLoading ? "Uploading..." : "Upload"}
          </button>
          <a href="/api/admin/jobs/bulk" className="text-xs text-primary hover:underline">Download Template</a>
          {bulkResult && <span className={`text-sm font-medium ${bulkResult.includes("error") || bulkResult.includes("failed") ? "text-red-600" : "text-green-600"}`}>{bulkResult}</span>}
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {Object.entries(counts).map(([key, count]) => (
          <button key={key} onClick={() => setStatusFilter(key)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${statusFilter === key ? "bg-primary text-white shadow-sm" : "bg-white text-gray-500 border border-gray-200 hover:border-primary hover:text-primary"}`}>
            {key} ({count})
          </button>
        ))}
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="mb-4 flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 flex-wrap">
          <span className="text-sm font-semibold text-navy">{selected.size} job{selected.size > 1 ? "s" : ""} selected</span>

          {/* Quick action buttons */}
          <button onClick={() => { setBulkAction("ACTIVATE"); setTimeout(bulkUpdate, 0) }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors">
            <CheckCircle className="w-3.5 h-3.5" />Activate All
          </button>
          <button onClick={() => { setBulkAction("DEACTIVATE"); setTimeout(bulkUpdate, 0) }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-medium hover:bg-yellow-200 transition-colors">
            <ToggleLeft className="w-3.5 h-3.5" />Deactivate
          </button>
          <button onClick={() => { setBulkAction("APPROVE"); setTimeout(bulkUpdate, 0) }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200 transition-colors">
            <CheckCircle className="w-3.5 h-3.5" />Approve
          </button>
          <button onClick={() => { setBulkAction("REJECT"); setTimeout(bulkUpdate, 0) }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors">
            <XCircle className="w-3.5 h-3.5" />Reject & Close
          </button>
          <button onClick={() => { setBulkAction("FEATURE"); setTimeout(bulkUpdate, 0) }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg text-xs font-medium hover:bg-amber-200 transition-colors">
            <Star className="w-3.5 h-3.5" />Feature
          </button>
          {bulkLoading && <span className="text-xs text-gray-400 ml-1 animate-pulse">Updating...</span>}
          <button onClick={() => setSelected(new Set())} className="ml-auto text-xs text-gray-400 hover:text-red-500 transition-colors">
            ✕ Clear selection
          </button>
        </div>
      )}

      {/* Jobs table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-gray-400">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-400 mb-4">No jobs found</p>
            <Link href="/admin/jobs/new" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold">
              <PlusCircle className="w-4 h-4" />Post First Job
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <th className="px-4 py-3">
                    <button onClick={selectAll}>
                      {selected.size === jobs.length && jobs.length > 0
                        ? <CheckSquare className="w-4 h-4 text-primary" />
                        : <Square className="w-4 h-4 text-gray-400" />}
                    </button>
                  </th>
                  <th className="px-4 py-3">Job Title</th>
                  <th className="px-4 py-3">Industry</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3 text-center">Apps</th>
                  <th className="px-4 py-3">Posted</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-center">Live</th>
                  <th className="px-4 py-3 text-center">⭐</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(j => (
                  <tr key={j.id} className={`border-b border-gray-50 hover:bg-gray-50/60 transition-colors ${selected.has(j.id) ? "bg-primary/5" : ""}`}>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleSelect(j.id)}>
                        {selected.has(j.id)
                          ? <CheckSquare className="w-4 h-4 text-primary" />
                          : <Square className="w-4 h-4 text-gray-300 hover:text-primary transition-colors" />}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-navy max-w-[200px] truncate">{j.title}</div>
                      <div className="text-xs text-gray-400">{j.employer?.companyName || "TalentTie"} · {j.vacancies} vac · {j.jobType?.replace("_", " ")}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{j.industry || "—"}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{j.city}, {j.state}</td>
                    <td className="px-4 py-3 text-center">
                      <Link href={`/admin/applications?jobId=${j.id}`} className="font-bold text-primary hover:underline text-sm">
                        {j._count?.applications ?? 0}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{new Date(j.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => updateJob(j.id, { status: cycleStatus(j.status) })}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-all hover:opacity-80 ${STATUS_COLORS[j.status] || "bg-gray-100 text-gray-500"}`}
                        title="Click to cycle status">
                        {j.status}
                      </button>
                    </td>
                    {/* Live on portal = ACTIVE + approvedByAdmin */}
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => updateJob(j.id, { approvedByAdmin: !j.approvedByAdmin })}
                        className={`p-1.5 rounded-lg transition-colors ${j.approvedByAdmin && j.status === "ACTIVE" ? "text-green-500 hover:bg-green-50" : "text-gray-300 hover:text-green-500 hover:bg-green-50"}`}
                        title={j.approvedByAdmin && j.status === "ACTIVE" ? "Live on portal — click to unpublish" : "Not live — click to approve"}>
                        {j.approvedByAdmin && j.status === "ACTIVE"
                          ? <ToggleRight className="w-5 h-5" />
                          : <ToggleLeft className="w-5 h-5" />}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => updateJob(j.id, { featured: !j.featured })}
                        className={`p-1.5 rounded-lg transition-colors ${j.featured ? "text-amber-500 hover:bg-amber-50" : "text-gray-300 hover:text-amber-400 hover:bg-amber-50"}`}
                        title={j.featured ? "Remove from featured" : "Mark as featured"}>
                        {j.featured ? <Star className="w-4 h-4 fill-amber-500" /> : <StarOff className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link href={`/jobs/${j.slug}`} target="_blank"
                          className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-navy transition-colors" title="View live">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button onClick={() => setDeleteId(j.id)}
                          className="p-1.5 hover:bg-red-50 rounded-lg text-gray-300 hover:text-red-500 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="font-bold text-navy text-lg mb-2">Delete Job?</h3>
            <p className="text-gray-500 text-sm mb-5">Permanently deletes the job and all its applications. Cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm">Cancel</button>
              <button onClick={() => deleteJob(deleteId)} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
