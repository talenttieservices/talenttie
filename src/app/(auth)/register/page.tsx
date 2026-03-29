"use client"
import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle, Building2, UserCheck } from "lucide-react"

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultRole = searchParams.get("role") === "employer" ? "EMPLOYER" : "CANDIDATE"
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "", role: defaultRole })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const updateField = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) })
      const data = await res.json()
      if (!res.ok) { setError(data.error || "Registration failed."); return }
      const { signIn } = await import("next-auth/react")
      await signIn("credentials", { email: formData.email, password: formData.password, redirect: false })
      router.push(formData.role === "EMPLOYER" ? "/employer/dashboard" : "/candidate/dashboard")
      router.refresh()
    } catch { setError("Something went wrong.") } finally { setLoading(false) }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-2">Create Account</h1>
      <p className="text-gray-500 mb-6">Join TalentTie — it&apos;s completely free</p>
      <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
        <button type="button" onClick={() => updateField("role", "CANDIDATE")} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${formData.role === "CANDIDATE" ? "bg-white shadow-3d text-primary" : "text-gray-500 hover:text-navy"}`}><UserCheck className="w-4 h-4" />Job Seeker</button>
        <button type="button" onClick={() => updateField("role", "EMPLOYER")} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${formData.role === "EMPLOYER" ? "bg-white shadow-3d text-primary" : "text-gray-500 hover:text-navy"}`}><Building2 className="w-4 h-4" />Employer</button>
      </div>
      {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"><AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><p className="text-sm text-red-600">{error}</p></div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><label className="block text-sm font-medium text-navy mb-1.5">Full Name</label><div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" value={formData.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Your full name" required minLength={2} className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" /></div></div>
        <div><label className="block text-sm font-medium text-navy mb-1.5">Email Address</label><div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} placeholder="you@example.com" required className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" /></div></div>
        <div><label className="block text-sm font-medium text-navy mb-1.5">Phone Number</label><div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="tel" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="+91 9876543210" required className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" /></div></div>
        <div><label className="block text-sm font-medium text-navy mb-1.5">Password</label><div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => updateField("password", e.target.value)} placeholder="Minimum 6 characters" required minLength={6} className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button></div></div>
        <p className="text-xs text-gray-400">By registering, you agree to our <Link href="/terms-of-service" className="text-primary hover:underline">Terms</Link> and <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link></p>
        <button type="submit" disabled={loading} className="w-full py-3.5 bg-primary text-white rounded-xl btn-3d font-semibold flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors disabled:opacity-50">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Create Account<ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-500">Already have an account? <Link href="/login" className="text-primary font-medium hover:underline">Sign In</Link></p>
    </div>
  )
}

export default function RegisterPage() {
  return <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}><RegisterForm /></Suspense>
}
