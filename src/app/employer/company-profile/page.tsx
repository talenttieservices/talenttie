"use client"
import { useEffect, useRef, useState } from "react"
import {
  Building2, Save, Upload, Loader2, CheckCircle2,
  AlertCircle, Globe, Phone, MapPin, Link2, X,
} from "lucide-react"
import { INDUSTRIES } from "@/lib/constants"

interface ProfileForm {
  companyName: string
  industry: string
  website: string
  size: string
  description: string
  phone: string
  address: string
  linkedin: string
}

const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"]

const defaultForm: ProfileForm = {
  companyName: "",
  industry: "",
  website: "",
  size: "",
  description: "",
  phone: "",
  address: "",
  linkedin: "",
}

export default function CompanyProfilePage() {
  const [form, setForm] = useState<ProfileForm>(defaultForm)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [logoUploading, setLogoUploading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch existing profile
  useEffect(() => {
    fetch("/api/employer/profile")
      .then(r => r.json())
      .then(data => {
        const emp = data.employer
        if (emp) {
          setForm({
            companyName: emp.companyName ?? "",
            industry: emp.industry ?? "",
            website: emp.website ?? "",
            size: emp.size ?? "",
            description: emp.description ?? "",
            phone: emp.phone ?? "",
            address: emp.address ?? "",
            linkedin: emp.linkedin ?? "",
          })
          setLogoUrl(emp.logoUrl ?? null)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  function set(field: keyof ProfileForm, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function clearAlert() {
    setSuccess(null)
    setError(null)
  }

  // Logo upload
  async function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      setError("Logo must be under 2 MB.")
      return
    }
    clearAlert()
    setLogoUploading(true)
    try {
      const fd = new FormData()
      fd.append("logo", file)
      const res = await fetch("/api/employer/logo", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Upload failed")
      setLogoUrl(data.logoUrl)
      setSuccess("Logo uploaded successfully.")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Logo upload failed.")
    } finally {
      setLogoUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  // Save profile
  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    clearAlert()
    if (!form.companyName.trim()) {
      setError("Company name is required.")
      return
    }
    setSaving(true)
    try {
      const res = await fetch("/api/employer/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Save failed")
      setSuccess("Profile saved successfully.")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save profile.")
    } finally {
      setSaving(false)
    }
  }

  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 text-sm text-navy placeholder-gray-400 transition"
  const labelClass = "block text-sm font-medium text-navy mb-1.5"

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Company Profile</h1>
          <p className="text-sm text-gray-500 mt-0.5">Keep your company information up to date for candidates</p>
        </div>
      </div>

      {/* Alerts */}
      {success && (
        <div className="flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span className="flex-1">{success}</span>
          <button onClick={() => setSuccess(null)} className="text-green-600 hover:text-green-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      {error && (
        <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span className="flex-1">{error}</span>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Logo Upload */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-base font-bold text-navy mb-4">Company Logo</h2>
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt="Company logo" className="w-full h-full object-contain p-1" />
            ) : (
              <Building2 className="w-8 h-8 text-gray-300" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-navy mb-1">
              {logoUrl ? "Replace logo" : "Upload company logo"}
            </p>
            <p className="text-xs text-gray-400 mb-3">PNG, JPG or WebP · Max 2 MB · Recommended 400×400px</p>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpg,.jpeg,.webp"
                className="hidden"
                onChange={handleLogoChange}
                id="logo-input"
              />
              <label
                htmlFor="logo-input"
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition ${
                  logoUploading
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              >
                {logoUploading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Uploading...</>
                ) : (
                  <><Upload className="w-4 h-4" />Choose File</>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-5">
        <h2 className="text-base font-bold text-navy">Company Details</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Company Name *</label>
            <input
              type="text"
              placeholder="e.g. Acme Technologies Pvt Ltd"
              value={form.companyName}
              onChange={e => set("companyName", e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Industry</label>
            <select
              value={form.industry}
              onChange={e => set("industry", e.target.value)}
              className={inputClass}
            >
              <option value="">Select Industry</option>
              {INDUSTRIES.map(i => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-gray-400" />Website</span>
            </label>
            <input
              type="url"
              placeholder="https://yourcompany.com"
              value={form.website}
              onChange={e => set("website", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Company Size</label>
            <select
              value={form.size}
              onChange={e => set("size", e.target.value)}
              className={inputClass}
            >
              <option value="">Select Size</option>
              {COMPANY_SIZES.map(s => (
                <option key={s} value={s}>{s} employees</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Company Description</label>
          <textarea
            rows={5}
            placeholder="Tell candidates about your company, culture, mission and what makes it a great place to work..."
            value={form.description}
            onChange={e => set("description", e.target.value)}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="pt-1">
          <h3 className="text-sm font-semibold text-navy mb-4">Contact Information</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-400" />Phone</span>
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={e => set("phone", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                <span className="flex items-center gap-1.5"><Link2 className="w-3.5 h-3.5 text-gray-400" />LinkedIn</span>
              </label>
              <input
                type="url"
                placeholder="https://linkedin.com/company/..."
                value={form.linkedin}
                onChange={e => set("linkedin", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div>
          <label className={labelClass}>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gray-400" />Address</span>
          </label>
          <textarea
            rows={3}
            placeholder="Office address..."
            value={form.address}
            onChange={e => set("address", e.target.value)}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-7 py-3 bg-primary text-white rounded-xl btn-3d font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {saving ? (
              <><Loader2 className="w-4 h-4 animate-spin" />Saving...</>
            ) : (
              <><Save className="w-4 h-4" />Save Profile</>
            )}
          </button>
          {success && !saving && (
            <span className="text-sm text-green-600 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />Saved
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
