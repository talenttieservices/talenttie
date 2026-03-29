import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, Globe, ExternalLink } from "lucide-react"

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
]
const jobSeekerLinks = [
  { href: "/jobs", label: "Find Jobs" },
  { href: "/register", label: "Register Free" },
  { href: "/blog/how-to-create-a-winning-resume", label: "Resume Tips" },
  { href: "/blog/how-to-prepare-for-your-first-job-interview", label: "Interview Prep" },
  { href: "/for-employers", label: "For Employers" },
]
const socialLinks = [
  { href: "https://www.linkedin.com/company/talenttie-services", icon: Globe, label: "LinkedIn" },
  { href: "#", icon: Globe, label: "Twitter" },
  { href: "#", icon: Globe, label: "Instagram" },
  { href: "#", icon: Globe, label: "Facebook" },
]

export default function Footer() {
  return (
    <footer className="relative bg-navy text-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-light to-primary" />
      <div className="absolute inset-0 iso-grid opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <Image src="/logo-text.png" alt="TalentTie" width={160} height={50} className="h-10 w-auto brightness-0 invert" />
            <p className="text-gray-400 text-sm leading-relaxed">Connecting talent with opportunities across India. Specializing in Tier 2, Tier 3 cities and rural recruitment in Banking, Insurance, Pharma, FMCG, and IT sectors.</p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-primary hover:shadow-glow transition-all duration-300 hover:-translate-y-1" aria-label={s.label}><s.icon className="w-4 h-4" /></a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2.5">{quickLinks.map((l) => (<li key={l.href}><Link href={l.href} className="text-gray-400 text-sm hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">{l.label}</Link></li>))}</ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-primary">For Job Seekers</h3>
            <ul className="space-y-2.5">{jobSeekerLinks.map((l) => (<li key={l.href}><Link href={l.href} className="text-gray-400 text-sm hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">{l.label}</Link></li>))}</ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-primary">Contact Us</h3>
            <ul className="space-y-3">
              <li><a href="mailto:recruitment@talenttie.com" className="flex items-start gap-3 text-gray-400 text-sm hover:text-white transition-colors group"><Mail className="w-4 h-4 mt-0.5 text-primary group-hover:scale-110 transition-transform" />recruitment@talenttie.com</a></li>
              <li><a href="tel:+919913677622" className="flex items-start gap-3 text-gray-400 text-sm hover:text-white transition-colors group"><Phone className="w-4 h-4 mt-0.5 text-primary group-hover:scale-110 transition-transform" />+91 9913677622</a></li>
              <li><a href="https://api.whatsapp.com/message/KFWGL6ROBVVGM1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-[#25D366]/20 text-[#25D366] rounded-lg text-sm hover:bg-[#25D366]/30 transition-colors">Chat on WhatsApp<ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">&copy; 2026 TalentTie. All rights reserved.</p>
          <p className="text-gray-600 text-xs">TalentTie Services</p>
        </div>
      </div>
    </footer>
  )
}
