"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LayoutDashboard, User, FileText, Bookmark, Settings, Menu, X, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

const navItems = [
  { href: "/candidate/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/candidate/profile", label: "My Profile", icon: User },
  { href: "/candidate/applications", label: "Applications", icon: FileText },
  { href: "/candidate/saved-jobs", label: "Saved Jobs", icon: Bookmark },
  { href: "/candidate/settings", label: "Settings", icon: Settings },
]

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <aside className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-3d border-r border-gray-100 z-40 transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between lg:hidden"><span className="font-semibold text-navy">Menu</span><button onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button></div>
        <nav className="p-4 space-y-1">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${pathname === item.href ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50 hover:text-navy"}`}>
              <item.icon className="w-5 h-5" />{item.label}
            </Link>
          ))}
          <button onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all w-full"><LogOut className="w-5 h-5" />Sign Out</button>
        </nav>
      </aside>
      <button onClick={() => setSidebarOpen(true)} className="fixed top-20 left-4 z-30 lg:hidden p-2 bg-white rounded-xl shadow-md"><Menu className="w-5 h-5" /></button>
      {sidebarOpen && <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <div className="lg:ml-64 p-4 sm:p-8">{children}</div>
    </div>
  )
}
