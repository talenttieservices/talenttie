"use client"
import { Lock, Bell } from "lucide-react"
export default function EmployerSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">Settings</h1>
      <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100">
        <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2"><Lock className="w-5 h-5 text-primary" />Change Password</h2>
        <div className="space-y-4 max-w-md">
          <div><label className="block text-sm font-medium text-navy mb-1.5">Current Password</label><input type="password" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
          <div><label className="block text-sm font-medium text-navy mb-1.5">New Password</label><input type="password" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
          <button className="px-6 py-2.5 bg-primary text-white rounded-xl btn-3d font-medium text-sm">Update Password</button>
        </div>
      </div>
    </div>
  )
}
