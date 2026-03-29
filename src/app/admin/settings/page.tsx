"use client"
import { Settings, Globe, Mail, Save } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">Settings</h1>
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100">
          <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2"><Globe className="w-5 h-5 text-primary" />Site Settings</h2>
          <div className="space-y-4 max-w-lg">
            <div><label className="block text-sm font-medium text-navy mb-1.5">Site Name</label><input type="text" defaultValue="TalentTie" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
            <div><label className="block text-sm font-medium text-navy mb-1.5">Site Tagline</label><input type="text" defaultValue="Connect with opportunities" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
            <button className="px-6 py-2.5 bg-primary text-white rounded-xl btn-3d font-medium text-sm flex items-center gap-2"><Save className="w-4 h-4" />Save Settings</button>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100">
          <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2"><Mail className="w-5 h-5 text-primary" />Email Configuration</h2>
          <div className="space-y-4 max-w-lg">
            <div><label className="block text-sm font-medium text-navy mb-1.5">SMTP Host</label><input type="text" placeholder="smtp.example.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-navy mb-1.5">SMTP Port</label><input type="text" placeholder="587" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
              <div><label className="block text-sm font-medium text-navy mb-1.5">From Email</label><input type="email" placeholder="noreply@talenttie.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
            </div>
            <button className="px-6 py-2.5 bg-primary text-white rounded-xl btn-3d font-medium text-sm flex items-center gap-2"><Save className="w-4 h-4" />Save Email Config</button>
          </div>
        </div>
      </div>
    </div>
  )
}
