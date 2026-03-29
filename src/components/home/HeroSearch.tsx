"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Briefcase, TrendingUp, Users, Building2, ArrowRight } from "lucide-react"
import { useCountUp } from "@/hooks/useCountUp"

const popularSearches = ["Banking Jobs", "Insurance Advisor", "FMCG Sales", "Pharma Rep", "Data Entry", "Telecaller", "Accountant", "HR Executive"]
const stats = [
  { label: "Active Jobs", value: 5000, suffix: "+", icon: Briefcase },
  { label: "Candidates Placed", value: 15000, suffix: "+", icon: Users },
  { label: "Companies", value: 200, suffix: "+", icon: Building2 },
  { label: "Cities Covered", value: 500, suffix: "+", icon: TrendingUp },
]

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { count, ref } = useCountUp(stat.value)
  return (
    <div ref={ref} className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center card-3d cursor-default" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
        <stat.icon className="w-6 h-6 text-primary" />
      </div>
      <div className="text-3xl font-bold text-white mb-1">{count.toLocaleString()}{stat.suffix}</div>
      <div className="text-sm text-gray-400">{stat.label}</div>
    </div>
  )
}

export default function HeroSearch() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.set("search", searchQuery)
    if (location) params.set("city", location)
    router.push(`/jobs?${params.toString()}`)
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-navy-light" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-[15%] w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute inset-0 iso-grid opacity-20" />
        <div className="absolute top-[15%] right-[8%] w-20 h-20 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 animate-float" style={{ animationDelay: "1s", transform: "perspective(500px) rotateY(-15deg) rotateX(10deg)" }} />
        <div className="absolute bottom-[25%] left-[5%] w-16 h-16 rounded-xl bg-primary/10 backdrop-blur-sm border border-primary/20 animate-float" style={{ animationDelay: "3s", transform: "perspective(500px) rotateY(10deg) rotateX(-5deg)" }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-primary-light text-sm font-medium mb-6 shadow-3d">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            India&apos;s Growing Job Platform for Every City
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your <span className="relative inline-block"><span className="gradient-text bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">Dream Job</span><span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-light rounded-full" /></span><br /><span className="text-gray-300">Anywhere in India</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10">From metros to villages — connecting talent with opportunities in Banking, Insurance, Pharma, FMCG & IT across 500+ cities</p>
        </div>
        <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-8">
          <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-2 border border-white/20 shadow-3d hover:shadow-glow transition-all duration-500" style={{ transform: "perspective(1000px) rotateX(2deg)" }}>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-inner">
                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input type="text" placeholder="Job title, skills, or company..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full text-navy placeholder:text-gray-400 outline-none text-base bg-transparent" />
              </div>
              <div className="flex-1 sm:max-w-[240px] flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-inner">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input type="text" placeholder="City or State..." value={location} onChange={(e) => setLocation(e.target.value)} className="w-full text-navy placeholder:text-gray-400 outline-none text-base bg-transparent" />
              </div>
              <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-xl btn-3d flex items-center justify-center gap-2 transition-all duration-200 whitespace-nowrap">Search Jobs<ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        </form>
        <div className="flex flex-wrap justify-center gap-2 mb-16 max-w-3xl mx-auto">
          <span className="text-gray-500 text-sm py-1">Popular:</span>
          {popularSearches.map((term) => (<button key={term} onClick={() => router.push(`/jobs?search=${encodeURIComponent(term)}`)} className="px-3 py-1 text-sm rounded-full bg-white/10 text-gray-300 hover:bg-primary/20 hover:text-primary-light border border-white/10 hover:border-primary/30 transition-all duration-200">{term}</button>))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((stat, i) => (<StatCard key={stat.label} stat={stat} index={i} />))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full"><path d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H0Z" fill="white"/></svg>
      </div>
    </section>
  )
}
