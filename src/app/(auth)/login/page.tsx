"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle, LogIn } from "lucide-react"
import { Suspense } from "react"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/candidate/dashboard"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const result = await signIn("credentials", { email, password, redirect: false })
      if (result?.error) { setError("Invalid email or password.") } else { router.push(callbackUrl); router.refresh() }
    } catch { setError("Something went wrong.") } finally { setLoading(false) }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-2">Welcome Back</h1>
      <p className="text-gray-500 mb-8">Sign in to your TalentTie account</p>
      {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"><AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><p className="text-sm text-red-600">{error}</p></div>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-navy mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-navy">Password</label>
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required minLength={6} className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
          </div>
        </div>
        <button type="submit" disabled={loading} className="w-full py-3.5 bg-primary text-white rounded-xl btn-3d font-semibold flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors disabled:opacity-50">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><LogIn className="w-4 h-4" />Sign In</>}
        </button>
      </form>
      <div className="my-8 flex items-center gap-4"><div className="flex-1 h-px bg-gray-200" /><span className="text-sm text-gray-400">or</span><div className="flex-1 h-px bg-gray-200" /></div>
      <div className="space-y-3">
        <Link href="/register" className="block w-full py-3.5 text-center border-2 border-gray-200 rounded-xl text-navy font-medium hover:border-primary hover:text-primary transition-all hover:-translate-y-0.5 hover:shadow-md">Create Candidate Account</Link>
        <Link href="/register?role=employer" className="block w-full py-3.5 text-center border-2 border-navy/10 rounded-xl text-navy/60 font-medium hover:border-navy/30 hover:text-navy transition-all text-sm">Register as Employer</Link>
      </div>
      <p className="mt-6 text-center text-sm text-gray-400">Need help? <a href="https://api.whatsapp.com/message/KFWGL6ROBVVGM1?autoload=1&app_absent=0" className="text-primary hover:underline">WhatsApp us</a></p>
    </div>
  )
}

export default function LoginPage() {
  return <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}><LoginForm /></Suspense>
}
