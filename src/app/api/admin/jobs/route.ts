export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

function generateSlug(title: string, city: string): string {
  const base = `${title}-${city}`
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
  const rand = Math.random().toString(36).substring(2, 7)
  return `${base}-${rand}`
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || ""
    const industry = searchParams.get("industry") || ""

    const where: Record<string, unknown> = {}
    if (status && status !== "ALL") where.status = status
    if (industry) where.industry = industry
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
        { industry: { contains: search, mode: "insensitive" } },
      ]
    }

    const jobs = await prisma.job.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true, title: true, slug: true, industry: true, city: true, state: true,
        status: true, featured: true, approvedByAdmin: true, createdAt: true,
        workMode: true, jobType: true, vacancies: true,
        employer: { select: { companyName: true } },
        _count: { select: { applications: true } },
      },
    })
    return NextResponse.json({ jobs })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ jobs: [] })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const {
      title, description, requirements, industry, jobType, city, state, location,
      experienceMin, experienceMax, salaryMin, salaryMax, salaryHidden,
      skills, vacancies, status, featured, workMode, functionalArea, roleCategory,
      education, walkInDate, walkInVenue, expiresAt, isRemote, pincode,
    } = body

    if (!title || !description || !city || !state) {
      return NextResponse.json({ error: "Title, description, city and state are required" }, { status: 400 })
    }

    // Admin posts as TalentTie employer — find or create it
    let employer = await prisma.employer.findFirst({
      where: { user: { email: session.user.email! } },
    })
    if (!employer) {
      // Find the admin user
      const adminUser = await prisma.user.findUnique({ where: { email: session.user.email! } })
      if (!adminUser) return NextResponse.json({ error: "Admin user not found" }, { status: 404 })
      employer = await prisma.employer.create({
        data: {
          userId: adminUser.id,
          companyName: "TalentTie",
          industry: "Recruitment",
          verified: true,
        },
      })
    }

    const slug = generateSlug(title, city)

    const job = await prisma.job.create({
      data: {
        employerId: employer.id,
        title: title.trim(),
        slug,
        description: description.trim(),
        requirements: requirements?.trim() || null,
        industry: industry || null,
        jobType: jobType || "FULL_TIME",
        experienceMin: Number(experienceMin) || 0,
        experienceMax: Number(experienceMax) || 0,
        salaryMin: salaryMin ? Number(salaryMin) : null,
        salaryMax: salaryMax ? Number(salaryMax) : null,
        salaryHidden: Boolean(salaryHidden),
        location: location || `${city}, ${state}`,
        city: city.trim(),
        state: state.trim(),
        pincode: pincode || null,
        isRemote: Boolean(isRemote),
        skills: Array.isArray(skills) ? skills : (skills ? String(skills).split(",").map((s: string) => s.trim()).filter(Boolean) : []),
        vacancies: Number(vacancies) || 1,
        status: status || "ACTIVE",
        featured: Boolean(featured),
        approvedByAdmin: true,
        workMode: workMode || "OFFICE",
        functionalArea: functionalArea || null,
        roleCategory: roleCategory || null,
        education: education || null,
        walkInDate: walkInDate ? new Date(walkInDate) : null,
        walkInVenue: walkInVenue || null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    })

    return NextResponse.json({ job })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 })
  }
}

// PATCH — bulk update multiple jobs (status, featured, approvedByAdmin)
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const { ids, status, featured, approvedByAdmin } = await req.json()
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "ids array required" }, { status: 400 })
    }
    const data: Record<string, unknown> = {}
    if (status !== undefined) data.status = status
    if (featured !== undefined) data.featured = featured
    if (approvedByAdmin !== undefined) data.approvedByAdmin = approvedByAdmin

    await prisma.job.updateMany({ where: { id: { in: ids } }, data })
    return NextResponse.json({ success: true, updated: ids.length })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to bulk update" }, { status: 500 })
  }
}
