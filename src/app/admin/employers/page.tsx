"use client"
import { useEffect, useState, useCallback } from "react"
import { Search, Building2, Loader2, CheckCircle2, XCircle, ExternalLink } from "lucide-react"

interface Employer {
  id: string
  companyName: string
  industry: string | null
  website: string | null
  verified: boolean
  createdAt: string
  user: { name: string; email: string; phone: string | null; emailVerified: boolean }
  _count: { jobs: number }
}

export default function AdminEmployersPage() {
  const [employers, setEmployers] = useState<Employer[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [toggling, setToggling] = useState<string | null>(null)

  const load = useCallback(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    fetch(`/api/admin/employers?${params}`)
      .then(r => r.json())
      .then(d => setEmployers(d.employers || []))
      .catch(() => setEmployers([]))
      .finally(() => setLoading(false))
  }, [search])

  useEffect(() => { load() }, [load])

  async function toggleVerified(e: Employer) {
    setToggling(e.id)
    await fetch("/api/admin/employers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: e.id, verified: !e.verified }),
    })
    setToggling(null)
    load()
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-navy">
          Employers <span className="text-base font-normal text-gray-400 ml-1">({employers.length})</span>
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employers..."
            className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 w-64" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-3d border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : employers.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Building2 className="w-12 h-12 mx-auto mb-3 text-gray-200" />
            <p>No employers registered yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Company</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Contact Person</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Email / Phone</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Industry</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Jobs</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Joined</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {employers.map(emp => (
                  <tr key={emp.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="font-medium text-navy">{emp.companyName}</div>
                      {emp.website && (
                        <a href={emp.website} target="_blank" rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center gap-0.5 mt-0.5">
                          <ExternalLink className="w-3 h-3" />{emp.website.replace(/https?:\/\//, "")}
                        </a>
                      )}
                    </td>
                    <td className="px-5 py-3 text-gray-700">{emp.user.name}</td>
                    <td className="px-5 py-3">
                      <div className="text-gray-500 text-xs">{emp.user.email}</div>
                      {emp.user.phone && <div className="text-gray-400 text-xs">{emp.user.phone}</div>}
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{emp.industry || "—"}</td>
                    <td className="px-5 py-3 font-semibold text-navy">{emp._count.jobs}</td>
                    <td className="px-5 py-3 text-gray-400 text-xs">
                      {new Date(emp.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3">
                      <button onClick={() => toggleVerified(emp)} disabled={toggling === emp.id}
                        className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                          emp.verified
                            ? "bg-green-50 text-green-700 border-green-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                            : "bg-orange-50 text-orange-600 border-orange-200 hover:bg-green-50 hover:text-green-700 hover:border-green-200"
                        }`}
                        title="Click to toggle verification">
                        {toggling === emp.id
                          ? <Loader2 className="w-3 h-3 animate-spin" />
                          : emp.verified ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {emp.verified ? "Verified" : "Pending"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
