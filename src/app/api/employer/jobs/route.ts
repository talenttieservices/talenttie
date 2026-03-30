export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import slugify from "slugify"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { employer: true },
    })
    if (!user || (user.role !== "EMPLOYER" && user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Only employers can post jobs" }, { status: 403 })
    }

    const body = await req.json()
    const { title, description, requirements, industry, jobType, experienceMin, experienceMax,
      salaryMin, salaryMax, city, state, pincode, skills, vacancies, location } = body

    if (!title || !description || !industry || !city || !state) {
      return NextResponse.json({ error: "Title, description, industry, city and state are required" }, { status: 400 })
    }

    const baseSlug = slugify(`${title}-${city}`, { lower: true, strict: true })
    const slug = `${baseSlug}-${Date.now().toString().slice(-6)}`

    const job = await prisma.job.create({
      data: {
        title, description, requirements: requirements || "",
        industry, jobType: jobType || "FULL_TIME",
        experienceMin: parseInt(experienceMin) || 0,
        experienceMax: parseInt(experienceMax) || 0,
        salaryMin: parseInt(salaryMin) || 0,
        salaryMax: parseInt(salaryMax) || 0,
        city, state, pincode: pincode || "",
        location: location || `${city}, ${state}`,
        skills: skills ? skills.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
        vacancies: parseInt(vacancies) || 1,
        slug, status: "ACTIVE",
        featured: false,
        employerId: user.employer?.id || "",
      },
    })
    return NextResponse.json({ job, success: true })
  } catch (err) {
    console.error("Create job error:", err)
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 })
  }
}
