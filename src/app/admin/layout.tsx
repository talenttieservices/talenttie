"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, Users, Building2, Briefcase, FileText, Target,
  FileCheck, BarChart3, Settings, Menu, X, LogOut, ClipboardList, Bell, ChevronDown, UserCheck,
} from "lucide-react"
import { signOut, useSession } from "next-auth/react"

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/employers", label: "Employers", icon: Building2 },
  { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { href: "/admin/applications", label: "Applications", icon: ClipboardList, badge: true },
  { href: "/admin/candidates", label: "Candidates", icon: UserCheck, badge: true },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/leads", label: "Leads", icon: Target },
  { href: "/admin/agreements", label: "Agreements", icon: FileCheck },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [newAppsCount, setNewAppsCount] = useState(0)
  const [bellPulse, setBellPulse] = useState(false)
  const { data: session } = useSession() ?? {}

  const currentPage = navItems.find(i => pathname === i.href || pathname.startsWith(i.href + "/"))

  // Poll for new applications every 30 seconds
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/admin/notifications")
        if (res.ok) {
          const data = await res.json()
          const prev = newAppsCount
          if (data.newCount > 0 && data.newCount !== prev) {
            setBellPulse(true)
            setTimeout(() => setBellPulse(false), 3000)
          }
          setNewAppsCount(data.newCount || 0)
        }
      } catch {
        // silently fail
      }
    }

    fetchNotifications()
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Clear badge when visiting applications or candidates page
  useEffect(() => {
    if (pathname === "/admin/applications" || pathname === "/admin/candidates") {
      // Don't reset the actual count — it's real data, just stop pulsing
      setBellPulse(false)
    }
  }, [pathname])

  return (
    <div className="fixed inset-0 z-[200] bg-[#f0f2f5] flex flex-col overflow-hidden">

      {/* ── TOP HEADER BAR ── */}
      <header className="h-14 bg-[#1C2E3D] flex items-center justify-between px-4 shrink-0 shadow-md z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-symbol.png" alt="TalentTie" className="w-8 h-8 object-contain" />
            <div className="hidden sm:block">
              <span className="text-white font-bold text-sm">TalentTie</span>
              <span className="text-primary text-xs ml-1.5 font-semibold">Admin</span>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2 text-sm text-white/50">
          <span>Admin</span>
          <span>/</span>
          <span className="text-white font-medium">{currentPage?.label || "Panel"}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Bell notification */}
          <Link href="/admin/candidates" className="relative p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">
            <Bell className={`w-5 h-5 ${bellPulse ? "animate-bounce" : ""}`} />
            {newAppsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {newAppsCount > 99 ? "99+" : newAppsCount}
              </span>
            )}
          </Link>

          <Link href="/" target="_blank"
            className="px-3 py-1.5 text-xs text-white/60 hover:text-white border border-white/10 hover:border-white/30 rounded-lg transition-colors hidden sm:block">
            View Site ↗
          </Link>

          <div className="relative">
            <button onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                {session?.user?.name?.[0]?.toUpperCase() || "A"}
              </div>
              <span className="text-white text-sm font-medium hidden sm:block max-w-28 truncate">
                {session?.user?.name || "Admin"}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-white/50" />
            </button>
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 top-10 bg-white rounded-xl shadow-xl border border-gray-100 w-48 z-20 py-1 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-navy truncate">{session?.user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{session?.user?.email}</p>
                  </div>
                  <Link href="/admin/settings" onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                    <Settings className="w-4 h-4" />Settings
                  </Link>
                  <button onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left">
                    <LogOut className="w-4 h-4" />Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="flex flex-1 overflow-hidden">
        <>
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}
          <aside className={`
            fixed lg:static top-14 left-0 h-[calc(100vh-3.5rem)] lg:h-full
            w-56 bg-[#1C2E3D] z-40 flex flex-col shrink-0
            transition-transform duration-200
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}>
            <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
              {navItems.map(item => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/")
                const showBadge = item.badge && newAppsCount > 0
                return (
                  <Link key={item.href} href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                      active
                        ? "bg-primary text-white shadow-sm"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}>
                    <item.icon className={`w-4 h-4 shrink-0 ${active ? "text-white" : "text-gray-500 group-hover:text-white"}`} />
                    {item.label}
                    <div className="ml-auto flex items-center gap-1.5">
                      {showBadge && (
                        <span className="w-2 h-2 bg-red-500 rounded-full" />
                      )}
                      {active && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                  </Link>
                )
              })}
            </nav>

            <div className="p-3 border-t border-white/10">
              <button onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full">
                <LogOut className="w-4 h-4" />Sign Out
              </button>
            </div>
          </aside>
        </>

        <main className="flex-1 overflow-y-auto">
          <div className="p-5 sm:p-7 max-w-[1400px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
