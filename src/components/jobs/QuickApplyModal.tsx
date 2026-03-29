"use client"

import { useState } from "react"
import { X, Send, CheckCircle2, Loader2, MessageCircle, Upload } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

interface QuickApplyModalProps {
  isOpen: boolean
  onClose: () => void
  jobTitle: string
  company: string
  jobSlug: string
}

export default function QuickApplyModal({ isOpen, onClose, jobTitle, company, jobSlug }: QuickApplyModalProps) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    experience: "", salaryExpectation: "", resumeUrl: "", message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  if (!isOpen) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const payload: Record<string, unknown> = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      }
      if (form.experience !== "") payload.experience = parseInt(form.experience)
      if (form.salaryExpectation !== "") payload.salaryExpectation = parseInt(form.salaryExpectation) * 100000
      if (form.resumeUrl !== "") payload.resumeUrl = form.resumeUrl

      const res = await fetch(`/api/jobs/${jobSlug}/apply-guest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to submit")
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg card-3d bg-white rounded-2xl shadow-3d-lg border border-gray-100 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-5 flex-shrink-0">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white"><X className="w-5 h-5" /></button>
          <h2 className="text-lg font-bold text-white">Apply for this Job</h2>
          <p className="text-white/80 text-sm mt-0.5">{jobTitle}</p>
        </div>

        {success ? (
          <div className="px-6 py-10 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">Application Sent!</h3>
            <p className="text-gray-500 text-sm mb-6">Our team will review your application and contact you within 1-2 business days on your phone/email.</p>
            <div className="bg-primary/5 rounded-xl p-4 text-sm text-navy">
              <p className="font-medium mb-1">Want faster response?</p>
              <a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-semibold flex items-center justify-center gap-2 hover:underline">
                <MessageCircle className="w-4 h-4" />WhatsApp us directly
              </a>
            </div>
            <button onClick={onClose} className="mt-4 w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4 overflow-y-auto">
            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Full Name *</label>
              <input type="text" required placeholder="Your full name"
                value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm transition-all"
              />
            </div>

            {/* Phone + Experience row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Phone Number *</label>
                <input type="tel" required placeholder="10-digit mobile"
                  value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Experience (Years)</label>
                <select value={form.experience} onChange={e => setForm(f => ({ ...f, experience: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-white"
                >
                  <option value="">Select</option>
                  <option value="0">Fresher</option>
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
                  <option value="4">4 years</option>
                  <option value="5">5 years</option>
                  <option value="7">6-7 years</option>
                  <option value="10">8-10 years</option>
                  <option value="15">10+ years</option>
                </select>
              </div>
            </div>

            {/* Email + Salary row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Email Address *</label>
                <input type="email" required placeholder="your@email.com"
                  value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Expected Salary (LPA)</label>
                <input type="number" placeholder="e.g. 5" min="1" max="100"
                  value={form.salaryExpectation} onChange={e => setForm(f => ({ ...f, salaryExpectation: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm transition-all"
                />
              </div>
            </div>

            {/* Resume link */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                <span className="flex items-center gap-1"><Upload className="w-3.5 h-3.5" />Resume Link <span className="text-gray-400">(Google Drive / Dropbox link)</span></span>
              </label>
              <input type="url" placeholder="https://drive.google.com/..."
                value={form.resumeUrl} onChange={e => setForm(f => ({ ...f, resumeUrl: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm transition-all"
              />
              <p className="text-xs text-gray-400 mt-1">Share a Google Drive or Dropbox link to your resume PDF</p>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Message <span className="text-gray-400">(optional)</span></label>
              <textarea rows={2} placeholder="Why are you a good fit for this role?"
                value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm resize-none transition-all"
              />
            </div>

            {error && <p className="text-red-500 text-sm bg-red-50 rounded-lg px-3 py-2">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl bg-primary text-white font-semibold btn-3d flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {loading ? "Submitting..." : "Submit Application"}
            </button>
            <p className="text-center text-xs text-gray-400 pb-2">No account needed · 100% free · Takes 30 seconds</p>
          </form>
        )}
      </div>
    </div>
  )
}
