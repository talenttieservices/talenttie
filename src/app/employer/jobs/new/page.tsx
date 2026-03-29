"use client"
import { useState } from "react"
import { Save, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { INDUSTRIES, JOB_TYPES, INDIAN_STATES } from "@/lib/constants"

export default function NewJobPage() {
  const [form, setForm] = useState({ title: "", description: "", requirements: "", industry: "", jobType: "FULL_TIME", experienceMin: 0, experienceMax: 0, salaryMin: "", salaryMax: "", location: "", city: "", state: "", skills: "", vacancies: 1 })
  const update = (f: string, v: string | number) => setForm(p => ({ ...p, [f]: v }))

  return (
    <div>
      <Link href="/employer/jobs" className="inline-flex items-center gap-2 text-gray-500 hover:text-navy text-sm mb-4"><ArrowLeft className="w-4 h-4" />Back to Jobs</Link>
      <h1 className="text-2xl font-bold text-navy mb-6">Post a New Job</h1>
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-3d border border-gray-100 space-y-5">
        <div><label className="block text-sm font-medium text-navy mb-1.5">Job Title *</label><input type="text" value={form.title} onChange={e => update("title", e.target.value)} placeholder="e.g. Relationship Manager" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
        <div><label className="block text-sm font-medium text-navy mb-1.5">Description *</label><textarea value={form.description} onChange={e => update("description", e.target.value)} rows={6} placeholder="Detailed job description..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" /></div>
        <div><label className="block text-sm font-medium text-navy mb-1.5">Requirements</label><textarea value={form.requirements} onChange={e => update("requirements", e.target.value)} rows={4} placeholder="Required qualifications..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" /></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-navy mb-1.5">Industry *</label><select value={form.industry} onChange={e => update("industry", e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"><option value="">Select Industry</option>{INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}</select></div>
          <div><label className="block text-sm font-medium text-navy mb-1.5">Job Type *</label><select value={form.jobType} onChange={e => update("jobType", e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30">{JOB_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select></div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div><label className="block text-sm font-medium text-navy mb-1.5">City *</label><input type="text" value={form.city} onChange={e => update("city", e.target.value)} placeholder="e.g. Surat" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
          <div><label className="block text-sm font-medium text-navy mb-1.5">State *</label><select value={form.state} onChange={e => update("state", e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"><option value="">Select State</option>{INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
          <div><label className="block text-sm font-medium text-navy mb-1.5">Vacancies</label><input type="number" value={form.vacancies} onChange={e => update("vacancies", parseInt(e.target.value) || 1)} min={1} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
        </div>
        <div><label className="block text-sm font-medium text-navy mb-1.5">Skills (comma separated)</label><input type="text" value={form.skills} onChange={e => update("skills", e.target.value)} placeholder="e.g. Sales, Banking, Communication" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
        <button className="px-8 py-3.5 bg-primary text-white rounded-xl btn-3d font-semibold flex items-center gap-2"><Save className="w-4 h-4" />Post Job</button>
      </div>
    </div>
  )
}
