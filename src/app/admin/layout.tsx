"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Building2, Briefcase, FileText, Target, FileCheck, BarChart3, Settings, Menu, X, LogOut, ClipboardList } from "lucide-react"
import { signOut } from "next-auth/react"

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/employers", label: "Employers", icon: Building2 },
  { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { href: "/admin/applications", label: "Applications", icon: ClipboardList },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/leads", label: "Leads", icon: Target },
  { href: "/admin/agreements", label: "Agreements", icon: FileCheck },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <aside className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-navy z-40 transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4 border-b border-white/10 flex items-center justify-between"><span className="text-white font-semibold text-sm">Admin Panel</span><button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white"><X className="w-5 h-5" /></button></div>
        <nav className="p-3 space-y-0.5">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${pathname === item.href || pathname.startsWith(item.href + "/") ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
              <item.icon className="w-4 h-4" />{item.label}
            </Link>
          ))}
          <button onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 w-full mt-4"><LogOut className="w-4 h-4" />Sign Out</button>
        </nav>
      </aside>
      <button onClick={() => setSidebarOpen(true)} className="fixed top-20 left-4 z-30 lg:hidden p-2 bg-white rounded-xl shadow-md"><Menu className="w-5 h-5" /></button>
      {sidebarOpen && <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <div className="lg:ml-64 p-4 sm:p-8">{children}</div>
    </div>
  )
}
