"use client"
import { useState, useEffect, Suspense, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Briefcase, Loader2, Search } from "lucide-react"
import JobCard from "@/components/jobs/JobCard"

interface Job {
  id: string; title: string; slug: string; industry: string; jobType: string
  experienceMin: number; experienceMax: number; salaryMin: number; salaryMax: number
  city: string; state: string; skills: string[]; featured: boolean
  vacancies: number; createdAt: string
}

const INDUSTRIES = ["Banking", "Insurance", "Financial Services", "Securities & Investments", "Pharma", "FMCG", "IT", "Manufacturing", "Healthcare", "Education"]

function JobsContent() {
  const searchParams = useSearchParams()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [industry, setIndustry] = useState(searchParams.get("industry") || "")
  const [city, setCity] = useState(searchParams.get("city") || "")

  const fetchJobs = useCallback(async (s = search, ind = industry, c = city) => {
    setLoading(true)
    const params = new URLSearchParams()
    if (s) params.set("search", s)
    if (ind) params.set("industry", ind)
    if (c) params.set("city", c)
    try {
      const res = await fetch(`/api/jobs?${params}`)
      const data = await res.json()
      setJobs(data.jobs || [])
    } catch { setJobs([]) }
    setLoading(false)
  }, [])

  useEffect(() => { fetchJobs() }, [fetchJobs])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    fetchJobs(search, industry, city)
  }

  function selectIndustry(ind: string) {
    setIndustry(ind)
    fetchJobs(search, ind, city)
  }

  function clearAll() {
    setSearch(""); setIndustry(""); setCity("")
    fetchJobs("", "", "")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-navy via-navy-dark to-navy pt-28 pb-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Find Your Perfect <span className="text-primary">Job</span></h1>
          <p className="text-gray-400 mb-6">{loading ? "Loading..." : `${jobs.length}+ opportunities across India`}</p>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Job title, skills..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="City or State..."
              className="sm:w-48 px-4 py-3.5 rounded-xl bg-white text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <button type="submit" className="px-8 py-3.5 bg-primary text-white rounded-xl font-semibold btn-3d">Search</button>
          </form>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex gap-2 flex-wrap mb-6">
          <button onClick={() => selectIndustry("")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${!industry ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"}`}>All</button>
          {INDUSTRIES.map(ind => (
            <button key={ind} onClick={() => selectIndustry(ind)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${industry === ind ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"}`}>{ind}</button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">No jobs found</p>
            <p className="text-gray-400 text-sm mt-1">Try different keywords or clear filters</p>
            <button onClick={clearAll} className="mt-4 px-6 py-2 bg-primary text-white rounded-xl text-sm font-medium">Clear Filters</button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Showing <strong>{jobs.length}</strong> jobs</p>
            {jobs.map(job => (
              <JobCard key={job.id} job={{
                id: job.id, slug: job.slug, title: job.title, company: "",
                location: `${job.city}, ${job.state}`,
                salary: `INR ${(job.salaryMin / 100000).toFixed(1)}L - ${(job.salaryMax / 100000).toFixed(1)}L PA`,
                type: job.jobType.replace("_", " ").replace(/\b\w/g, (l: string) => l.toUpperCase()),
                experience: `${job.experienceMin}-${job.experienceMax} yrs`,
                industry: job.industry, skills: job.skills, featured: job.featured,
                posted: new Date(job.createdAt).toLocaleDateString("en-IN"),
              }} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function JobsPage() {
  return <Suspense fallback={<div className="flex justify-center py-40"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}><JobsContent /></Suspense>
}
