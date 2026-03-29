"use client"
import { useState } from "react"
import { Mail, Phone, MapPin, MessageCircle, Send, Loader2, CheckCircle2 } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const updateField = (f: string, v: string) => setFormData(p => ({ ...p, [f]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) })
      setSuccess(true)
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    } catch {} finally { setLoading(false) }
  }

  const contacts = [
    { icon: Mail, label: "Email", value: "recruitment@talenttie.com", href: "mailto:recruitment@talenttie.com" },
    { icon: Phone, label: "Phone", value: "+91 9913677622", href: "tel:+919913677622" },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://api.whatsapp.com/message/KFWGL6ROBVVGM1?autoload=1&app_absent=0" },
    { icon: MapPin, label: "Office", value: "Surat, Gujarat, India", href: "#" },
  ]

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-navy via-navy-dark to-navy pt-28 pb-16 px-4"><div className="max-w-5xl mx-auto text-center"><h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Contact <span className="text-primary">Us</span></h1><p className="text-xl text-gray-400">We&apos;d love to hear from you. Reach out anytime.</p></div></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl p-8 shadow-3d border border-gray-100">
            <h2 className="text-2xl font-bold text-navy mb-6">Send us a Message</h2>
            {success ? (
              <div className="text-center py-12"><CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" /><h3 className="text-xl font-bold text-navy mb-2">Message Sent!</h3><p className="text-gray-500">We&apos;ll get back to you within 24 hours.</p></div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-navy mb-1.5">Name</label><input type="text" value={formData.name} onChange={e => updateField("name", e.target.value)} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Your name" /></div>
                  <div><label className="block text-sm font-medium text-navy mb-1.5">Email</label><input type="email" value={formData.email} onChange={e => updateField("email", e.target.value)} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="you@example.com" /></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-navy mb-1.5">Phone</label><input type="tel" value={formData.phone} onChange={e => updateField("phone", e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="+91 9876543210" /></div>
                  <div><label className="block text-sm font-medium text-navy mb-1.5">Subject</label><input type="text" value={formData.subject} onChange={e => updateField("subject", e.target.value)} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="How can we help?" /></div>
                </div>
                <div><label className="block text-sm font-medium text-navy mb-1.5">Message</label><textarea value={formData.message} onChange={e => updateField("message", e.target.value)} required rows={5} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" placeholder="Your message..." /></div>
                <button type="submit" disabled={loading} className="w-full py-3.5 bg-primary text-white rounded-xl btn-3d font-semibold flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" />Send Message</>}
                </button>
              </form>
            )}
          </div>
          <div className="space-y-4">
            {contacts.map(c => (
              <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined} className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-3d border border-gray-100 card-3d">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"><c.icon className="w-6 h-6 text-primary" /></div>
                <div><div className="text-sm text-gray-400">{c.label}</div><div className="text-navy font-medium">{c.value}</div></div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
