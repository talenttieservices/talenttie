"use client"
import { useState } from "react"
import { Save, ArrowLeft, Loader2, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { INDUSTRIES, JOB_TYPES, INDIAN_STATES } from "@/lib/constants"

export default function NewJobPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: "", description: "", requirements: "", industry: "", jobType: "FULL_TIME",
    experienceMin: 0, experienceMax: 0, salaryMin: "", salaryMax: "",
    location: "", city: "", state: "", skills: "", vacancies: 1,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const update = (f: string, v: string | number) => setForm(p => ({ ...p, [f]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/employer/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          salaryMin: parseInt(form.salaryMin) || 0,
          salaryMax: parseInt(form.salaryMax) || 0,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Failed to post job")
      } else {
        setSuccess(true)
        setTimeout(() => router.push("/employer/jobs"), 2000)
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-navy mb-2">Job Posted Successfully!</h2>
        <p className="text-gray-500">Redirecting to your jobs...</p>
      </div>
    )
  }

  return (
    <div>
      <Link href="/employer/jobs" className="inline-flex items-center gap-2 text-gray-500 hover:text-navy text-sm mb-4">
        <ArrowLeft className="w-4 h-4" />Back to Jobs
      </Link>
      <h1 className="text-2xl font-bold text-navy mb-6">Post a New Job</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-3d border border-gray-100 space-y-5">
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Job Title *</label>
          <input type="text" value={form.title} onChange={e => update("title", e.target.value)} required
            placeholder="e.g. Relationship Manager"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Description *</label>
          <textarea value={form.description} onChange={e => update("description", e.target.value)} required rows={6}
            placeholder="Detailed job description..."
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Requirements</label>
          <textarea value={form.requirements} onChange={e => update("requirements", e.target.value)} rows={4}
            placeholder="Required qualifications, experience, skills..."
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Industry *</label>
            <select value={form.industry} onChange={e => update("industry", e.target.value)} required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option value="">Select Industry</option>
              {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Job Type</label>
            <select value={form.jobType} onChange={e => update("jobType", e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30">
              {JOB_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Min Experience (years)</label>
            <input type="number" value={form.experienceMin} onChange={e => update("experienceMin", parseInt(e.target.value) || 0)}
              min={0} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Max Experience (years)</label>
            <input type="number" value={form.experienceMax} onChange={e => update("experienceMax", parseInt(e.target.value) || 0)}
              min={0} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Min Salary (annual INR)</label>
            <input type="number" value={form.salaryMin} onChange={e => update("salaryMin", e.target.value)}
              placeholder="e.g. 300000"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Max Salary (annual INR)</label>
            <input type="number" value={form.salaryMax} onChange={e => update("salaryMax", e.target.value)}
              placeholder="e.g. 600000"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">City *</label>
            <input type="text" value={form.city} onChange={e => update("city", e.target.value)} required
              placeholder="e.g. Surat"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">State *</label>
            <select value={form.state} onChange={e => update("state", e.target.value)} required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option value="">Select State</option>
              {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Vacancies</label>
            <input type="number" value={form.vacancies} onChange={e => update("vacancies", parseInt(e.target.value) || 1)}
              min={1} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Skills (comma separated)</label>
          <input type="text" value={form.skills} onChange={e => update("skills", e.target.value)}
            placeholder="e.g. Sales, Banking, Communication, Leadership"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>

        <button type="submit" disabled={loading}
          className="px-8 py-3.5 bg-primary text-white rounded-xl btn-3d font-semibold flex items-center gap-2 disabled:opacity-60">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  )
}
