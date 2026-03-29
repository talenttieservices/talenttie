"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Clock, Banknote, ArrowRight, Bookmark } from "lucide-react"

interface Job {
  id: string
  slug: string
  title: string
  company: string
  location: string
  salary: string
  experience: string
  industry: string
  industryColor: string
  skills: string[]
  postedDate: string
}

const featuredJobs: Job[] = [
  {
    id: "1",
    slug: "relationship-manager-national-trust-bank-surat",
    title: "Relationship Manager",
    company: "National Trust Bank",
    location: "Surat, Gujarat",
    salary: "INR 3.5L - 6L / year",
    experience: "1-3 years",
    industry: "Banking",
    industryColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    skills: ["Sales", "Customer Relationship", "Banking Products", "Cross-selling"],
    postedDate: "2 days ago",
  },
  {
    id: "2",
    slug: "insurance-advisor-securelife-ahmedabad",
    title: "Insurance Development Officer",
    company: "SecureLife Insurance",
    location: "Ahmedabad, Gujarat",
    salary: "INR 2.8L - 5L / year",
    experience: "0-2 years",
    industry: "Insurance",
    industryColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    skills: ["Life Insurance", "Agent Recruitment", "Business Development", "Team Building"],
    postedDate: "1 day ago",
  },
  {
    id: "3",
    slug: "asm-fastmove-vadodara",
    title: "Area Sales Manager",
    company: "FastMove FMCG",
    location: "Rajkot, Gujarat",
    salary: "INR 5L - 8L / year",
    experience: "3-5 years",
    industry: "FMCG",
    industryColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    skills: ["FMCG Sales", "Distributor Management", "Territory Planning", "Team Leadership"],
    postedDate: "3 days ago",
  },
  {
    id: "4",
    slug: "medical-representative-medcure-rajkot",
    title: "Medical Representative",
    company: "MedCure Pharma",
    location: "Vadodara, Gujarat",
    salary: "INR 2.5L - 4.5L / year",
    experience: "0-2 years",
    industry: "Pharma",
    industryColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    skills: ["Pharma Sales", "Doctor Detailing", "Product Knowledge", "Territory Coverage"],
    postedDate: "4 days ago",
  },
  {
    id: "5",
    slug: "branch-manager-premier-finance-jaipur",
    title: "Branch Manager - Insurance",
    company: "TrustShield Life",
    location: "Jaipur, Rajasthan",
    salary: "INR 4L - 7L / year",
    experience: "2-5 years",
    industry: "Insurance",
    industryColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    skills: ["Branch Operations", "Insurance Sales", "P&L Management", "Agency Development"],
    postedDate: "1 day ago",
  },
  {
    id: "6",
    slug: "wealth-management-executive-nashik",
    title: "Wealth Management Executive",
    company: "GrowWealth Securities",
    location: "Nashik, Maharashtra",
    salary: "INR 3L - 5.5L / year",
    experience: "1-3 years",
    industry: "Securities & Investments",
    industryColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    skills: ["Equity Sales", "Mutual Funds", "Client Acquisition", "Financial Advisory"],
    postedDate: "5 days ago",
  },
]

function JobCard({ job }: { job: Job }) {
  const [saved, setSaved] = useState(false)
  const router = useRouter()

  return (
    <div
      className="group relative bg-white rounded-2xl p-6 border border-gray-100 card-3d shadow-3d hover:shadow-glow transition-all duration-300 cursor-pointer"
      onClick={() => router.push(`/jobs/${job.slug}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${job.industryColor}`}>
          {job.industry}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setSaved(!saved)
          }}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Bookmark className={`w-4 h-4 ${saved ? "fill-primary text-primary" : "text-gray-400"}`} />
        </button>
      </div>

      <h3 className="text-lg font-bold text-navy mb-1 group-hover:text-primary transition-colors">
        {job.title}
      </h3>


      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Banknote className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span>{job.experience}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 text-xs rounded-lg bg-gray-50 text-gray-600 border border-gray-100"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-400">{job.postedDate}</span>
        <span className="text-sm font-semibold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          View Details <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  )
}

export default function FeaturedJobs() {
  const router = useRouter()

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium mb-4">
            Latest Openings
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
            Featured{" "}
            <span className="gradient-text bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Job Opportunities
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Handpicked roles in Banking, Insurance, Pharma, and FMCG sectors across tier 2 cities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => router.push("/jobs")}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-xl btn-3d transition-all duration-200 text-lg"
          >
            View All Jobs
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
