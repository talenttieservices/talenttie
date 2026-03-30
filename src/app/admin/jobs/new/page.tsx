"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Loader2, Plus, X } from "lucide-react"
import Link from "next/link"
import {
  INDUSTRIES, JOB_TYPES, INDIAN_STATES, POPULAR_CITIES,
  WORK_MODES, FUNCTIONAL_AREAS, ROLE_CATEGORIES, EDUCATION_LEVELS, CITY_STATE_MAP,
} from "@/lib/constants"

const STATUSES = [
  { value: "ACTIVE", label: "Active (Live)" },
  { value: "DRAFT", label: "Draft (Hidden)" },
  { value: "PAUSED", label: "Paused" },
]

export default function AdminPostJobPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [skillInput, setSkillInput] = useState("")

  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    industry: "",
    functionalArea: "",
    roleCategory: "",
    jobType: "FULL_TIME",
    workMode: "OFFICE",
    city: "",
    state: "",
    location: "",
    isRemote: false,
    experienceMin: "0",
    experienceMax: "2",
    salaryMin: "",
    salaryMax: "",
    salaryHidden: false,
    education: "ANY",
    skills: [] as string[],
    vacancies: "1",
    status: "ACTIVE",
    featured: false,
    expiresAt: "",
    walkInDate: "",
    walkInVenue: "",
  })

  const [availableRoles, setAvailableRoles] = useState<string[]>([])

  useEffect(() => {
    if (form.functionalArea) {
      const cat = ROLE_CATEGORIES.find(r => r.area === form.functionalArea)
      setAvailableRoles(cat?.roles || [])
      setForm(f => ({ ...f, roleCategory: "" }))
    }
  }, [form.functionalArea])

  function setField(field: string, value: unknown) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function addSkill() {
    const s = skillInput.trim()
    if (s && !form.skills.includes(s)) {
      setForm(f => ({ ...f, skills: [...f.skills, s] }))
      setSkillInput("")
    }
  }

  function removeSkill(skill: string) {
    setForm(f => ({ ...f, skills: f.skills.filter(s => s !== skill) }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const payload = {
        ...form,
        experienceMin: parseInt(form.experienceMin) || 0,
        experienceMax: parseInt(form.experienceMax) || 0,
        salaryMin: form.salaryMin ? Math.round(parseFloat(form.salaryMin) * 100000) : null,
        salaryMax: form.salaryMax ? Math.round(parseFloat(form.salaryMax) * 100000) : null,
        vacancies: parseInt(form.vacancies) || 1,
        location: form.location || `${form.city}, ${form.state}`,
      }

      const res = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to post job")
      setSuccess(`Job "${data.job.title}" posted successfully!`)
      setTimeout(() => router.push("/admin/jobs"), 1500)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/jobs" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-navy">Post New Job</h1>
          <p className="text-sm text-gray-500">All fields marked * are required</p>
        </div>
      </div>

      {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}
      {success && <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-3d p-6">
          <h2 className="font-bold text-navy mb-4 text-base border-b pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Job Title *</label>
              <input required type="text" value={form.title} onChange={e => setField("title", e.target.value)}
                placeholder="e.g. Sales Manager - Banking"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Industry *</label>
              <select required value={form.industry} onChange={e => setField("industry", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                <option value="">Select Industry</option>
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Functional Area</label>
              <select value={form.functionalArea} onChange={e => setField("functionalArea", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                <option value="">Select Functional Area</option>
                {FUNCTIONAL_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Role / Designation</label>
              {availableRoles.length > 0 ? (
                <select value={form.roleCategory} onChange={e => setField("roleCategory", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                  <option value="">Select Role</option>
                  {availableRoles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              ) : (
                <input type="text" value={form.roleCategory} onChange={e => setField("roleCategory", e.target.value)}
                  placeholder="e.g. Sales Executive"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Job Type *</label>
              <select required value={form.jobType} onChange={e => setField("jobType", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                {JOB_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Work Mode *</label>
              <select required value={form.workMode} onChange={e => setField("workMode", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                {WORK_MODES.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Number of Vacancies</label>
              <input type="number" min="1" max="500" value={form.vacancies} onChange={e => setField("vacancies", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
              <select value={form.status} onChange={e => setField("status", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => setField("featured", e.target.checked)}
                  className="w-4 h-4 accent-primary" />
                <span className="text-sm text-gray-700">Featured Job</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isRemote} onChange={e => setField("isRemote", e.target.checked)}
                  className="w-4 h-4 accent-primary" />
                <span className="text-sm text-gray-700">Remote / WFH</span>
              </label>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-3d p-6">
          <h2 className="font-bold text-navy mb-4 text-base border-b pb-2">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">City *</label>
              <input required list="cities-admin" type="text" value={form.city}
                onChange={e => {
                  const city = e.target.value
                  const autoState = CITY_STATE_MAP[city]
                  setField("city", city)
                  if (autoState) setField("state", autoState)
                }}
                placeholder="e.g. Mumbai"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <datalist id="cities-admin">{POPULAR_CITIES.map(c => <option key={c} value={c} />)}</datalist>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">State *</label>
              <select required value={form.state} onChange={e => setField("state", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                <option value="">Select State</option>
                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Full Location Display</label>
              <input type="text" value={form.location} onChange={e => setField("location", e.target.value)}
                placeholder={form.city && form.state ? `${form.city}, ${form.state}` : "e.g. Andheri West, Mumbai"}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
        </section>

        {/* Experience & Salary */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-3d p-6">
          <h2 className="font-bold text-navy mb-4 text-base border-b pb-2">Experience & Salary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Min Experience (yrs)</label>
              <input type="number" min="0" max="30" value={form.experienceMin} onChange={e => setField("experienceMin", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Max Experience (yrs)</label>
              <input type="number" min="0" max="40" value={form.experienceMax} onChange={e => setField("experienceMax", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Min Salary (LPA)</label>
              <input type="number" min="0" step="0.1" value={form.salaryMin} onChange={e => setField("salaryMin", e.target.value)}
                placeholder="e.g. 3.5"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Max Salary (LPA)</label>
              <input type="number" min="0" step="0.1" value={form.salaryMax} onChange={e => setField("salaryMax", e.target.value)}
                placeholder="e.g. 8.5"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
          <div className="mt-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.salaryHidden} onChange={e => setField("salaryHidden", e.target.checked)}
                className="w-4 h-4 accent-primary" />
              <span className="text-sm text-gray-600">Hide salary from candidates (show "As per market standards")</span>
            </label>
          </div>
        </section>

        {/* Education & Skills */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-3d p-6">
          <h2 className="font-bold text-navy mb-4 text-base border-b pb-2">Education & Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Education Requirement</label>
              <select value={form.education} onChange={e => setField("education", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                {EDUCATION_LEVELS.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Application Deadline</label>
              <input type="date" value={form.expiresAt} onChange={e => setField("expiresAt", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs font-medium text-gray-600 mb-1">Key Skills</label>
            <div className="flex gap-2 mb-2">
              <input type="text" value={skillInput} onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addSkill() } }}
                placeholder="Type skill and press Enter or click Add"
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <button type="button" onClick={addSkill}
                className="px-4 py-2.5 bg-primary/10 text-primary rounded-xl text-sm font-medium hover:bg-primary/20 flex items-center gap-1">
                <Plus className="w-4 h-4" />Add
              </button>
            </div>
            {form.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.skills.map(skill => (
                  <span key={skill} className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-500 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Walk-in (conditional) */}
        {form.jobType === "WALK_IN" || form.walkInDate ? (
          <section className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
            <h2 className="font-bold text-navy mb-4 text-base border-b pb-2">Walk-in Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Walk-in Date</label>
                <input type="datetime-local" value={form.walkInDate} onChange={e => setField("walkInDate", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Walk-in Venue</label>
                <input type="text" value={form.walkInVenue} onChange={e => setField("walkInVenue", e.target.value)}
                  placeholder="Full address for walk-in"
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white" />
              </div>
            </div>
          </section>
        ) : (
          <div className="text-center">
            <button type="button" onClick={() => setField("walkInDate", " ")}
              className="text-sm text-gray-400 hover:text-primary transition-colors underline">
              + Add Walk-in Details (optional)
            </button>
          </div>
        )}

        {/* Job Description */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-3d p-6">
          <h2 className="font-bold text-navy mb-4 text-base border-b pb-2">Job Description *</h2>
          <textarea required rows={8} value={form.description} onChange={e => setField("description", e.target.value)}
            placeholder="Describe the role, responsibilities, what the candidate will do day-to-day..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
        </section>

        {/* Requirements */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-3d p-6">
          <h2 className="font-bold text-navy mb-4 text-base border-b pb-2">Requirements / Eligibility</h2>
          <textarea rows={5} value={form.requirements} onChange={e => setField("requirements", e.target.value)}
            placeholder="List the requirements, qualifications, must-haves for the role..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
        </section>

        {/* Submit */}
        <div className="flex items-center gap-4 pb-8">
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl btn-3d font-semibold text-sm disabled:opacity-60">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {loading ? "Posting..." : "Post Job"}
          </button>
          <Link href="/admin/jobs" className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
