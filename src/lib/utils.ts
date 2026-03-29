import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import slugify from "slugify"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSalary(min?: number | null, max?: number | null): string {
  if (!min && !max) return "Not Disclosed"
  const formatNum = (n: number) => {
    if (n >= 10000000) return `${(n / 10000000).toFixed(1)}Cr`
    if (n >= 100000) return `${(n / 100000).toFixed(1)}L`
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K`
    return n.toString()
  }
  if (min && max) return `INR ${formatNum(min)} - ${formatNum(max)} PA`
  if (min) return `INR ${formatNum(min)}+ PA`
  return `Up to INR ${formatNum(max!)} PA`
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const day = d.getDate().toString().padStart(2, "0")
  const month = months[d.getMonth()]
  const year = d.getFullYear()
  return `${day}-${month}-${year}`
}

export function generateSlug(title: string): string {
  return slugify(title, { lower: true, strict: true })
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + "..."
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function timeAgo(date: Date | string): string {
  const now = new Date()
  const d = new Date(date)
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000)
  if (seconds < 60) return "Just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return formatDate(date)
}
