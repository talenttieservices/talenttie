"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, LogIn, User } from "lucide-react"
import MobileNav from "./MobileNav"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Find Jobs" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass shadow-3d py-2" : "bg-transparent py-4"}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Image src="/logo-symbol.png" alt="TalentTie" width={140} height={48} className="h-10 w-auto transition-transform group-hover:scale-105" priority />
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${pathname === link.href ? "text-primary bg-primary/10" : "text-navy hover:text-primary hover:bg-primary/5"}`}>
                {link.label}
                {pathname === link.href && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login" className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-navy border-2 border-navy/20 rounded-xl hover:border-primary hover:text-primary transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <LogIn className="w-4 h-4" />Login
            </Link>
            <Link href="/register" className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-primary rounded-xl btn-3d hover:-translate-y-0.5 transition-all duration-200">
              <User className="w-4 h-4" />Register Free
            </Link>
          </div>
          <button onClick={() => setIsMobileOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors" aria-label="Open menu">
            <Menu className="w-6 h-6 text-navy" />
          </button>
        </nav>
      </header>
      <MobileNav isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} links={navLinks} pathname={pathname} />
    </>
  )
}
