"use client"
import Link from "next/link"
import Image from "next/image"
import { X, LogIn, User, Phone } from "lucide-react"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  links: { href: string; label: string }[]
  pathname: string
}

export default function MobileNav({ isOpen, onClose, links, pathname }: MobileNavProps) {
  return (
    <>
      <div className={`fixed inset-0 bg-navy/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={onClose} />
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-3d transform transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <Image src="/logo-text.png" alt="TalentTie" width={120} height={40} className="h-8 w-auto" />
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Close menu"><X className="w-5 h-5" /></button>
          </div>
          <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={onClose} className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${pathname === link.href ? "bg-primary/10 text-primary" : "text-navy hover:bg-gray-50"}`}>{link.label}</Link>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-100 space-y-3">
            <Link href="/login" onClick={onClose} className="flex items-center justify-center gap-2 w-full px-4 py-3 text-navy border-2 border-navy/20 rounded-xl font-medium hover:border-primary hover:text-primary transition-all"><LogIn className="w-4 h-4" />Login</Link>
            <Link href="/register" onClick={onClose} className="flex items-center justify-center gap-2 w-full px-4 py-3 text-white bg-primary rounded-xl font-medium btn-3d"><User className="w-4 h-4" />Register Free</Link>
            <a href="tel:+919913677622" className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm text-gray-500 hover:text-primary transition-colors"><Phone className="w-3.5 h-3.5" />Call: 9913677622</a>
          </div>
        </div>
      </div>
    </>
  )
}
