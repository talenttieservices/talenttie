export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search") || ""
    const industry = searchParams.get("industry") || ""
    const city = searchParams.get("city") || ""
    const type = searchParams.get("type") || ""
    const featured = searchParams.get("featured") === "true"
    const limit = parseInt(searchParams.get("limit") || "50")

    const where: Record<string, unknown> = { status: "ACTIVE" }
    if (featured) where.featured = true
    if (industry) where.industry = industry
    if (type) where.jobType = type
    if (search || city) {
      where.AND = [
        search ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { skills: { has: search } },
          ],
        } : {},
        city ? {
          OR: [
            { city: { contains: city, mode: "insensitive" } },
            { state: { contains: city, mode: "insensitive" } },
          ],
        } : {},
      ].filter(c => Object.keys(c).length > 0)
    }

    const jobs = await prisma.job.findMany({
      where,
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: limit,
      select: {
        id: true, title: true, slug: true, industry: true, jobType: true,
        experienceMin: true, experienceMax: true, salaryMin: true, salaryMax: true,
        city: true, state: true, skills: true, featured: true, vacancies: true,
        status: true, createdAt: true, pincode: true,
        _count: { select: { applications: true } },
      },
    })
    return NextResponse.json({ jobs, total: jobs.length })
  } catch (err) {
    console.error("Jobs API error:", err)
    return NextResponse.json({ jobs: [], total: 0 })
  }
}
