import { MetadataRoute } from "next"
import { prisma } from "@/lib/prisma"

const BASE = "https://talenttie.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                          lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE}/jobs`,                lastModified: new Date(), changeFrequency: "hourly",  priority: 0.95 },
    { url: `${BASE}/blog`,                lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE}/for-employers`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/companies`,           lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/about`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/register`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/privacy-policy`,      lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE}/terms-of-service`,    lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE}/cookie-policy`,       lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2 },
  ]

  // Dynamic: active job listings
  let jobPages: MetadataRoute.Sitemap = []
  try {
    const jobs = await prisma.job.findMany({
      where: { status: "ACTIVE" },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    })
    jobPages = jobs.map(j => ({
      url: `${BASE}/jobs/${j.slug}`,
      lastModified: j.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }))
  } catch { /* ignore during static build */ }

  // Dynamic: published blog posts
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    })
    blogPages = posts.map(p => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  } catch { /* ignore during static build */ }

  return [...staticPages, ...jobPages, ...blogPages]
}
