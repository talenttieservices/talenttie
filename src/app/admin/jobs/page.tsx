"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, PlusCircle, Eye, Trash2 } from "lucide-react"

interface Job {
  id: string
  title: string
  industry: string
  city: string
  state: string
  status: string
  createdAt: string
  _count?: { applications: number }
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/jobs")
      .then(r => r.json())
      .then(d => { setJobs(d.jobs || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = jobs.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.city?.toLowerCase().includes(search.toLowerCase()) ||
    j.industry?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy">Jobs</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 w-52"
            />
          </div>
          <Link
            href="/employer/jobs/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl btn-3d text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            <PlusCircle className="w-4 h-4" /> Post New Job
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-3d border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-gray-400">Loading jobs...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-400 mb-4">No jobs found</p>
            <Link href="/employer/jobs/new" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold">
              <PlusCircle className="w-4 h-4" /> Post Your First Job
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 font-medium text-gray-500">Title</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500">Industry</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500">Location</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500">Applications</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500">Posted</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500">Status</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(j => (
                <tr key={j.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-navy">{j.title}</td>
                  <td className="px-5 py-3 text-gray-500">{j.industry}</td>
                  <td className="px-5 py-3 text-gray-500">{j.city}, {j.state}</td>
                  <td className="px-5 py-3 text-navy font-medium">{j._count?.applications ?? 0}</td>
                  <td className="px-5 py-3 text-gray-500">{new Date(j.createdAt).toLocaleDateString("en-IN")}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${j.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {j.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/jobs/${j.id}`} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-navy transition-colors">
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
