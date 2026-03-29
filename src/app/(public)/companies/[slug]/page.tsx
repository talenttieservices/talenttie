import Link from "next/link"
import { Building2, Globe, MapPin, Briefcase, ArrowLeft, ArrowRight } from "lucide-react"

export default function CompanyDetailPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-navy via-navy-dark to-navy pt-28 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/companies" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6"><ArrowLeft className="w-4 h-4" />Back to Companies</Link>
          <div className="flex items-center gap-6"><div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center"><Building2 className="w-10 h-10 text-primary" /></div><div><h1 className="text-3xl font-bold text-white">National Trust Bank</h1><p className="text-gray-400">BFSI &middot; PAN India</p></div></div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-3d border border-gray-100 mb-8"><h2 className="text-xl font-bold text-navy mb-4">About</h2><p className="text-gray-600">A leading private sector bank in India offering a wide range of banking and financial services.</p></div>
        <h2 className="text-xl font-bold text-navy mb-4">Open Positions (45)</h2>
        <div className="text-center py-12 bg-white rounded-2xl shadow-3d border border-gray-100"><p className="text-gray-500 mb-4">View all open positions at this company</p><Link href="/jobs?search=Axis%20Bank" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl btn-3d font-medium">Browse Jobs<ArrowRight className="w-4 h-4" /></Link></div>
      </div>
    </div>
  )
}
