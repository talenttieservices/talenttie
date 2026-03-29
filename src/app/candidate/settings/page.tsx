"use client"
import { Lock, Bell, Trash2 } from "lucide-react"

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">Account Settings</h1>
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100">
          <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2"><Lock className="w-5 h-5 text-primary" />Change Password</h2>
          <div className="space-y-4 max-w-md">
            <div><label className="block text-sm font-medium text-navy mb-1.5">Current Password</label><input type="password" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
            <div><label className="block text-sm font-medium text-navy mb-1.5">New Password</label><input type="password" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
            <button className="px-6 py-2.5 bg-primary text-white rounded-xl btn-3d font-medium text-sm">Update Password</button>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100">
          <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2"><Bell className="w-5 h-5 text-primary" />Notifications</h2>
          <div className="space-y-3">
            {["Job alerts via email", "Application status updates", "New job recommendations"].map(label => (
              <label key={label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
                <span className="text-sm text-navy">{label}</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary" />
              </label>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-3d border border-red-100">
          <h2 className="text-lg font-bold text-red-600 mb-2 flex items-center gap-2"><Trash2 className="w-5 h-5" />Delete Account</h2>
          <p className="text-sm text-gray-500 mb-4">Once deleted, your account and all data cannot be recovered.</p>
          <button className="px-6 py-2.5 bg-red-500 text-white rounded-xl font-medium text-sm hover:bg-red-600 transition-colors">Delete My Account</button>
        </div>
      </div>
    </div>
  )
}
