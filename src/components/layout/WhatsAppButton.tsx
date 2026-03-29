"use client"
import { useState } from "react"
import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className={`absolute bottom-full right-0 mb-3 px-3 py-1.5 bg-navy text-white text-sm rounded-lg whitespace-nowrap shadow-3d transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
        Chat with us
        <div className="absolute -bottom-1 right-4 w-2 h-2 bg-navy rotate-45" />
      </div>
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      <div className="absolute -inset-1 rounded-full bg-[#25D366] animate-pulse opacity-10" />
      <a href="https://api.whatsapp.com/message/KFWGL6ROBVVGM1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 animate-bounce-soft" aria-label="Chat on WhatsApp">
        <MessageCircle className="w-7 h-7" fill="white" />
      </a>
    </div>
  )
}
