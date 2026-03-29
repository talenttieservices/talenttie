import Link from "next/link"
import { Building2, MapPin, Briefcase } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Browse Companies - Top Employers on TalentTie" }

const companies = [
  { name: "National Trust Bank", industry: "Banking", jobs: 45, location: "PAN India", slug: "national-trust-bank" },
  { name: "SecureLife Insurance", industry: "Banking", jobs: 32, location: "PAN India", slug: "securelife-insurance" },
  { name: "Premier Finance Bank", industry: "Banking", jobs: 28, location: "PAN India", slug: "premier-finance" },
  { name: "MedCure Pharma", industry: "Pharma", jobs: 18, location: "Gujarat, Maharashtra", slug: "medcure-pharma" },
  { name: "FastMove FMCG", industry: "FMCG", jobs: 22, location: "PAN India", slug: "hul" },
  { name: "GrowWealth Securities", industry: "Banking", jobs: 15, location: "Maharashtra, Gujarat", slug: "growwealth-securities" },
  { name: "TechBridge Solutions", industry: "IT", jobs: 12, location: "Pune, Bangalore", slug: "techbridge" },
  { name: "TalentTie Services", industry: "IT", jobs: 8, location: "Surat, Gujarat", slug: "talenttie" },
]

export default function CompaniesPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-navy via-navy-dark to-navy pt-28 pb-12 px-4"><div className="max-w-7xl mx-auto text-center"><h1 className="text-4xl font-bold text-white mb-4">Browse <span className="text-primary">Companies</span></h1><p className="text-gray-400 text-lg">Explore top employers hiring on TalentTie</p></div></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {companies.map(c => (
            <Link key={c.slug} href={`/companies/${c.slug}`} className="bg-white rounded-2xl p-6 card-3d shadow-3d border border-gray-100 text-center group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors"><Building2 className="w-8 h-8 text-primary" /></div>
              <h3 className="font-bold text-navy mb-1 group-hover:text-primary transition-colors">{c.name}</h3>
              <p className="text-xs text-gray-400 mb-3">{c.industry}</p>
              <div className="flex items-center justify-center gap-3 text-xs text-gray-500"><span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{c.jobs} jobs</span><span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.location}</span></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
