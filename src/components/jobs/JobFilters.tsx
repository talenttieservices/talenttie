"use client"
import { useState } from "react"
import { Search, MapPin, Filter, X } from "lucide-react"
import { INDUSTRIES, JOB_TYPES, EXPERIENCE_RANGES } from "@/lib/constants"

interface JobFiltersProps { onFilter: (filters: Record<string, string>) => void; initialFilters?: Record<string, string> }

export default function JobFilters({ onFilter, initialFilters = {} }: JobFiltersProps) {
  const [filters, setFilters] = useState(initialFilters)
  const [showMobile, setShowMobile] = useState(false)
  const updateFilter = (key: string, value: string) => { const f = { ...filters }; if (value) f[key] = value; else delete f[key]; setFilters(f); onFilter(f) }
  const activeCount = Object.keys(filters).filter(k => k !== "search").length

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1 relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" placeholder="Job title, skills, or company..." value={filters.search || ""} onChange={e => updateFilter("search", e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-3d" /></div>
        <button onClick={() => setShowMobile(!showMobile)} className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-3d relative"><Filter className="w-5 h-5" />{activeCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">{activeCount}</span>}</button>
      </div>
      <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 ${showMobile ? "block" : "hidden lg:grid"}`}>
        <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" /><input type="text" placeholder="City..." value={filters.city || ""} onChange={e => updateFilter("city", e.target.value)} className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
        <select value={filters.industry || ""} onChange={e => updateFilter("industry", e.target.value)} className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"><option value="">All Industries</option>{INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}</select>
        <select value={filters.jobType || ""} onChange={e => updateFilter("jobType", e.target.value)} className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"><option value="">All Types</option>{JOB_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select>
        <select value={filters.experience || ""} onChange={e => updateFilter("experience", e.target.value)} className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"><option value="">Any Experience</option>{EXPERIENCE_RANGES.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}</select>
      </div>
      {activeCount > 0 && <div className="flex items-center gap-2 flex-wrap"><span className="text-sm text-gray-500">Filters:</span>{Object.entries(filters).filter(([k]) => k !== "search").map(([k, v]) => <button key={k} onClick={() => updateFilter(k, "")} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{v}<X className="w-3 h-3" /></button>)}<button onClick={() => { setFilters({}); onFilter({}) }} className="text-sm text-red-500 hover:underline">Clear all</button></div>}
    </div>
  )
}
