"use client"
import { useState } from "react"
import Link from "next/link"
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || "Something went wrong"); return }
      setSent(true)
    } catch { setError("Something went wrong. Please try again.") }
    finally { setLoading(false) }
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-navy mb-2">Check Your Email</h1>
        <p className="text-gray-500 mb-2">We&apos;ve sent a password reset link to</p>
        <p className="font-semibold text-navy mb-6">{email}</p>
        <p className="text-sm text-gray-400 mb-8">The link expires in 1 hour. Check your spam folder if you don&apos;t see it.</p>
        <Link href="/login" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link href="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-navy mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Login
      </Link>
      <h1 className="text-3xl font-bold text-navy mb-2">Forgot Password?</h1>
      <p className="text-gray-500 mb-8">Enter your email and we&apos;ll send you a reset link.</p>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-primary text-white rounded-xl btn-3d font-semibold flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Reset Link"}
        </button>
      </form>
    </div>
  )
}
