"use client"
import { useState } from "react"
import { User, Briefcase, GraduationCap, Save, Plus } from "lucide-react"

export default function ProfilePage() {
  const [profile, setProfile] = useState({ headline: "", summary: "", currentLocation: "", expectedSalary: "", noticePeriod: "" })
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">My Profile</h1>
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100">
          <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2"><User className="w-5 h-5 text-primary" />Basic Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-navy mb-1.5">Headline</label><input type="text" value={profile.headline} onChange={e => setProfile(p => ({...p, headline: e.target.value}))} placeholder="e.g. Senior Sales Executive" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
            <div><label className="block text-sm font-medium text-navy mb-1.5">Current Location</label><input type="text" value={profile.currentLocation} onChange={e => setProfile(p => ({...p, currentLocation: e.target.value}))} placeholder="e.g. Surat, Gujarat" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
            <div><label className="block text-sm font-medium text-navy mb-1.5">Expected Salary (Annual)</label><input type="text" value={profile.expectedSalary} onChange={e => setProfile(p => ({...p, expectedSalary: e.target.value}))} placeholder="e.g. 500000" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
            <div><label className="block text-sm font-medium text-navy mb-1.5">Notice Period</label><input type="text" value={profile.noticePeriod} onChange={e => setProfile(p => ({...p, noticePeriod: e.target.value}))} placeholder="e.g. 30 days" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
          </div>
          <div className="mt-4"><label className="block text-sm font-medium text-navy mb-1.5">Professional Summary</label><textarea value={profile.summary} onChange={e => setProfile(p => ({...p, summary: e.target.value}))} rows={4} placeholder="Brief summary of your experience and career goals..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" /></div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100">
          <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold text-navy flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary" />Experience</h2><button className="flex items-center gap-1 text-sm text-primary font-medium hover:underline"><Plus className="w-4 h-4" />Add</button></div>
          <div className="text-center py-8 text-gray-400"><p>No experience added yet. Click &quot;Add&quot; to add your work experience.</p></div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100">
          <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold text-navy flex items-center gap-2"><GraduationCap className="w-5 h-5 text-primary" />Education</h2><button className="flex items-center gap-1 text-sm text-primary font-medium hover:underline"><Plus className="w-4 h-4" />Add</button></div>
          <div className="text-center py-8 text-gray-400"><p>No education added yet. Click &quot;Add&quot; to add your qualifications.</p></div>
        </div>
        <button className="px-8 py-3 bg-primary text-white rounded-xl btn-3d font-semibold flex items-center gap-2"><Save className="w-4 h-4" />Save Profile</button>
      </div>
    </div>
  )
}
