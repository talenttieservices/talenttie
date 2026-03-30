export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getEmployerForUser } from "@/lib/employer-auth"

// GET applicants for a specific job (employer must own the job)
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const employer = await getEmployerForUser(session.user.email)
    if (!employer) return NextResponse.json({ error: "No employer profile" }, { status: 404 })

    // Verify job belongs to this employer
    const job = await prisma.job.findFirst({
      where: { id: params.id, employerId: employer.id },
      select: { id: true, title: true, city: true, status: true, vacancies: true },
    })
    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 })

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status") || "ALL"
    const search = searchParams.get("search") || ""

    const where: Record<string, unknown> = { jobId: params.id }
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
        id: true, name: true, email: true, phone: true,
        experience: true, salaryExpectation: true, message: true,
        status: true, notes: true, appliedAt: true,
        resumeUrl: true, resumeFilename: true,
      },
    })

    return NextResponse.json({ job, applications })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to load applicants" }, { status: 500 })
  }
}

// PATCH — update single or bulk application status/notes
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const employer = await getEmployerForUser(session.user.email)
    if (!employer) return NextResponse.json({ error: "No employer profile" }, { status: 404 })

    // Verify job belongs to this employer
    const job = await prisma.job.findFirst({
      where: { id: params.id, employerId: employer.id },
      select: { id: true },
    })
    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 })

    const body = await req.json()

    // Bulk update: { ids: string[], status: string }
    if (Array.isArray(body.ids)) {
      await prisma.guestApplication.updateMany({
        where: { id: { in: body.ids }, jobId: params.id },
        data: { status: body.status },
      })
      return NextResponse.json({ success: true, updated: body.ids.length })
    }

    // Single update: { appId: string, status?: string, notes?: string }
    if (body.appId) {
      const updated = await prisma.guestApplication.update({
        where: { id: body.appId },
        data: {
          ...(body.status ? { status: body.status } : {}),
          ...(body.notes !== undefined ? { notes: body.notes } : {}),
        },
      })
      return NextResponse.json({ application: updated })
    }

    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
