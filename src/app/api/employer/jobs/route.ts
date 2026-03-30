export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getEmployerForUser } from "@/lib/employer-auth"
import slugify from "slugify"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const employer = await getEmployerForUser(session.user.email)
    if (!employer) {
      return NextResponse.json({ error: "No employer profile found" }, { status: 404 })
    }

    const body = await req.json()
    const {
      title, description, requirements, industry, functionalArea, roleCategory,
      jobType, workMode, experienceMin, experienceMax, salaryMin, salaryMax, salaryHidden,
      city, state, location, isRemote, skills, vacancies, education,
      walkInDate, walkInVenue,
    } = body

    if (!title || !description || !industry || !city || !state) {
      return NextResponse.json({ error: "Title, description, industry, city and state are required" }, { status: 400 })
    }

    const baseSlug = slugify(`${title}-${city}`, { lower: true, strict: true })
    const slug = `${baseSlug}-${Date.now().toString().slice(-6)}`

    const job = await prisma.job.create({
      data: {
        title,
        description,
        requirements: requirements || "",
        industry,
        functionalArea: functionalArea || null,
        roleCategory: roleCategory || null,
        jobType: jobType || "FULL_TIME",
        workMode: workMode || "OFFICE",
        experienceMin: parseInt(experienceMin) || 0,
        experienceMax: parseInt(experienceMax) || 0,
        salaryMin: salaryMin ? Math.round(parseFloat(salaryMin) * (salaryMin < 500 ? 100000 : 1)) : 0,
        salaryMax: salaryMax ? Math.round(parseFloat(salaryMax) * (salaryMax < 500 ? 100000 : 1)) : 0,
        salaryHidden: salaryHidden || false,
        city,
        state,
        location: location || `${city}, ${state}`,
        isRemote: isRemote || false,
        skills: Array.isArray(skills) ? skills : (skills ? String(skills).split(",").map((s: string) => s.trim()).filter(Boolean) : []),
        vacancies: parseInt(vacancies) || 1,
        education: education || "ANY",
        walkInDate: walkInDate && walkInDate.trim() ? new Date(walkInDate) : null,
        walkInVenue: walkInVenue || null,
        slug,
        status: "ACTIVE",
        featured: false,
        approvedByAdmin: false,
        employerId: employer.id,
      },
    })

    return NextResponse.json({ job, success: true })
  } catch (err) {
    console.error("Create job error:", err)
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 })
  }
}
