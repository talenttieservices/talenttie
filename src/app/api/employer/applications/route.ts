export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getEmployerForUser } from "@/lib/employer-auth"

// GET all applications across employer's jobs
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const employer = await getEmployerForUser(session.user.email)
    if (!employer) return NextResponse.json({ applications: [] })

    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || "ALL"
    const jobId = searchParams.get("jobId") || ""

    // Get all employer's job IDs
    const employerJobs = await prisma.job.findMany({
      where: { employerId: employer.id },
      select: { id: true, title: true, slug: true, city: true },
    })
    const jobMap = Object.fromEntries(employerJobs.map(j => [j.id, j]))
    const jobIds = employerJobs.map(j => j.id)

    if (jobIds.length === 0) return NextResponse.json({ applications: [] })

    const where: Record<string, unknown> = {
      jobId: jobId && jobMap[jobId] ? jobId : { in: jobIds },
    }
    if (status !== "ALL") where.status = status
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search } },
      ]
    }

    const applications = await prisma.guestApplication.findMany({
      where,
      orderBy: { appliedAt: "desc" },
      select: {
        id: true, jobId: true, name: true, email: true, phone: true,
        experience: true, salaryExpectation: true, message: true,
        status: true, notes: true, appliedAt: true,
        resumeUrl: true, resumeFilename: true,
      },
    })

    const enriched = applications.map(a => ({
      ...a,
      jobTitle: jobMap[a.jobId]?.title || "Unknown Job",
      jobSlug: jobMap[a.jobId]?.slug || "",
      jobCity: jobMap[a.jobId]?.city || "",
    }))

    return NextResponse.json({ applications: enriched })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ applications: [] })
  }
}
