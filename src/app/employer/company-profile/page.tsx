"use client"
import { Building2, Save } from "lucide-react"
import { INDUSTRIES } from "@/lib/constants"

export default function CompanyProfilePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">Company Profile</h1>
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-3d border border-gray-100 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-navy mb-1.5">Company Name *</label><input type="text" placeholder="Your company name" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
          <div><label className="block text-sm font-medium text-navy mb-1.5">Industry</label><select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"><option value="">Select Industry</option>{INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}</select></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-navy mb-1.5">Website</label><input type="url" placeholder="https://example.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
          <div><label className="block text-sm font-medium text-navy mb-1.5">Company Size</label><select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"><option value="">Select Size</option><option>1-50</option><option>51-200</option><option>201-500</option><option>500+</option></select></div>
        </div>
        <div><label className="block text-sm font-medium text-navy mb-1.5">Company Description</label><textarea rows={5} placeholder="Tell candidates about your company..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" /></div>
        <button className="px-8 py-3 bg-primary text-white rounded-xl btn-3d font-semibold flex items-center gap-2"><Save className="w-4 h-4" />Save Profile</button>
      </div>
    </div>
  )
}
