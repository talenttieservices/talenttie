"use client"
import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Briefcase, Loader2 } from "lucide-react"
import JobCard from "@/components/jobs/JobCard"
import JobFilters from "@/components/jobs/JobFilters"

const allJobs = [
  { id: "1", title: "Relationship Manager", slug: "relationship-manager-national-trust-bank-surat", company: "National Trust Bank", location: "Surat, Gujarat", salary: "3L - 5L PA", type: "Full Time", experience: "1-3 yrs", industry: "Banking", posted: "2 days ago", skills: ["Sales", "Banking", "Customer Service"], featured: true },
  { id: "2", title: "Insurance Advisor", slug: "insurance-advisor-securelife-insurance", company: "SecureLife Insurance", location: "Ahmedabad, Gujarat", salary: "2.5L - 4L PA", type: "Full Time", experience: "0-2 yrs", industry: "Insurance", posted: "1 day ago", skills: ["Insurance", "Sales", "Hindi"], featured: true },
  { id: "3", title: "Medical Representative", slug: "medical-rep-medcure-pharma", company: "MedCure Pharma", location: "Rajkot, Gujarat", salary: "3.5L - 6L PA", type: "Full Time", experience: "1-4 yrs", industry: "Pharma", posted: "3 days ago", skills: ["Pharma Sales", "Medical Knowledge"], featured: false },
  { id: "4", title: "Area Sales Manager", slug: "asm-fastmove-vadodara", company: "FastMove FMCG", location: "Vadodara, Gujarat", salary: "5L - 8L PA", type: "Full Time", experience: "3-6 yrs", industry: "FMCG", posted: "1 day ago", skills: ["FMCG", "Team Management"], featured: false },
  { id: "5", title: "Branch Manager", slug: "branch-manager-premier-finance-jaipur", company: "Premier Finance Bank", location: "Jaipur, Rajasthan", salary: "6L - 10L PA", type: "Full Time", experience: "5-8 yrs", industry: "Banking", posted: "4 days ago", skills: ["Branch Ops", "Leadership"], featured: true },
  { id: "6", title: "Telecaller Executive", slug: "telecaller-growwealth-nashik", company: "GrowWealth Securities", location: "Nashik, Maharashtra", salary: "1.8L - 2.5L PA", type: "Full Time", experience: "0-1 yr", industry: "Securities & Investments", posted: "Today", skills: ["Telecalling", "Communication"], featured: false },
  { id: "7", title: "Software Developer", slug: "developer-techbridge-pune", company: "TechBridge Solutions", location: "Pune, Maharashtra", salary: "6L - 12L PA", type: "Full Time", experience: "2-5 yrs", industry: "IT", posted: "2 days ago", skills: ["Java", "Spring Boot"], featured: false },
  { id: "8", title: "HR Executive", slug: "hr-exec-talenttie-surat", company: "TalentTie Services", location: "Surat, Gujarat", salary: "3L - 4.5L PA", type: "Full Time", experience: "1-3 yrs", industry: "IT", posted: "Today", skills: ["HR", "Recruitment"], featured: false },
]

function JobSearchContent() {
  const searchParams = useSearchParams()
  const [filteredJobs, setFilteredJobs] = useState(allJobs)
  const initialFilters: Record<string, string> = {}
  if (searchParams.get("search")) initialFilters.search = searchParams.get("search")!
  if (searchParams.get("city")) initialFilters.city = searchParams.get("city")!
  if (searchParams.get("industry")) initialFilters.industry = searchParams.get("industry")!

  const handleFilter = (filters: Record<string, string>) => {
    let jobs = [...allJobs]
    if (filters.search) { const q = filters.search.toLowerCase(); jobs = jobs.filter(j => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.skills.some(s => s.toLowerCase().includes(q))) }
    if (filters.city) { jobs = jobs.filter(j => j.location.toLowerCase().includes(filters.city.toLowerCase())) }
    if (filters.industry) { jobs = jobs.filter(j => j.industry === filters.industry) }
    setFilteredJobs(jobs)
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-gradient-to-br from-navy via-navy-dark to-navy pt-28 pb-12 px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto"><h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Find Your Perfect <span className="text-primary">Job</span></h1><p className="text-gray-400 mb-8">{allJobs.length}+ opportunities across India</p><JobFilters onFilter={handleFilter} initialFilters={initialFilters} /></div></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-gray-500 mb-6">Showing <span className="font-semibold text-navy">{filteredJobs.length}</span> jobs</p>
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">{filteredJobs.map(job => <JobCard key={job.id} job={job} />)}</div>
        ) : (
          <div className="text-center py-20"><Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" /><h3 className="text-xl font-semibold text-navy mb-2">No jobs found</h3><p className="text-gray-500">Try adjusting your search filters</p></div>
        )}
      </div>
    </div>
  )
}

export default function JobsPage() {
  return <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}><JobSearchContent /></Suspense>
}
