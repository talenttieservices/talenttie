"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, PlusCircle, Briefcase, Building2,
  Settings, Menu, X, LogOut, Users, ChevronDown,
} from "lucide-react"
import { signOut, useSession } from "next-auth/react"

const navItems = [
  { href: "/employer/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/employer/jobs/new", label: "Post New Job", icon: PlusCircle },
  { href: "/employer/jobs", label: "My Jobs", icon: Briefcase },
  { href: "/employer/applications", label: "Applications", icon: Users },
  { href: "/employer/team", label: "Team Members", icon: Users },
  { href: "/employer/company-profile", label: "Company Profile", icon: Building2 },
  { href: "/employer/settings", label: "Settings", icon: Settings },
]

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [companyLogo, setCompanyLogo] = useState<string | null>(null)
  const [companyName, setCompanyName] = useState("My Company")
  const { data: session } = useSession() ?? {}

  useEffect(() => {
    fetch("/api/employer/profile")
      .then(r => r.json())
      .then(d => {
        if (d.employer) {
          setCompanyName(d.employer.companyName || "My Company")
          setCompanyLogo(d.employer.logoUrl || null)
        }
      })
      .catch(() => {})
  }, [])

  const currentPage = navItems.find(i => pathname === i.href || pathname.startsWith(i.href + "/"))

  return (
    <div className="fixed inset-0 z-[200] bg-[#f0f2f5] flex flex-col overflow-hidden">

      {/* ── TOP HEADER ── */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100">
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/employer/dashboard" className="flex items-center gap-2.5">
            {companyLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={companyLogo} alt={companyName} className="w-8 h-8 object-contain rounded-lg border border-gray-100" />
            ) : (
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Building2 className="w-4 h-4 text-primary" />
              </div>
            )}
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-navy leading-tight truncate max-w-40">{companyName}</div>
              <div className="text-xs text-gray-400">Employer Portal</div>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center text-sm text-gray-400 gap-2">
          <span>Portal</span><span>/</span>
          <span className="text-navy font-medium">{currentPage?.label || "Dashboard"}</span>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/" target="_blank" className="px-3 py-1.5 text-xs text-gray-500 hover:text-primary border border-gray-200 hover:border-primary rounded-lg transition-colors hidden sm:block">
            View Site ↗
          </Link>
          <div className="relative">
            <button onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                {session?.user?.name?.[0]?.toUpperCase() || "E"}
              </div>
              <span className="text-sm font-medium text-navy hidden sm:block max-w-28 truncate">
                {session?.user?.name || "Employer"}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 top-10 bg-white rounded-xl shadow-xl border border-gray-100 w-48 z-20 py-1">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-navy truncate">{session?.user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{session?.user?.email}</p>
                  </div>
                  <Link href="/employer/company-profile" onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50">
                    <Building2 className="w-4 h-4" />Company Profile
                  </Link>
                  <Link href="/employer/settings" onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50">
                    <Settings className="w-4 h-4" />Settings
                  </Link>
                  <button onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full text-left">
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

        {/* Sidebar */}
        {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
        <aside className={`
          fixed lg:static top-14 left-0 h-[calc(100vh-3.5rem)] lg:h-full
          w-56 bg-white border-r border-gray-200 z-40 flex flex-col shrink-0
          transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          {/* Company card in sidebar */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              {companyLogo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={companyLogo} alt={companyName} className="w-10 h-10 rounded-xl object-contain border border-gray-100 bg-white" />
              ) : (
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-bold text-navy truncate">{companyName}</p>
                <p className="text-xs text-gray-400">Employer Account</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
            {navItems.map(item => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    active ? "bg-primary text-white shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-navy"
                  }`}>
                  <item.icon className={`w-4 h-4 shrink-0 ${active ? "text-white" : "text-gray-400 group-hover:text-primary"}`} />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="p-3 border-t border-gray-100">
            <button onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all w-full">
              <LogOut className="w-4 h-4" />Sign Out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-5 sm:p-7 max-w-[1400px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
