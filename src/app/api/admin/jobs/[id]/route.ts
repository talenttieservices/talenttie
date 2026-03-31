export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const job = await prisma.job.findUnique({
      where: { id: params.id },
      include: { employer: { select: { companyName: true } } },
    })
    if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ job })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const body = await req.json()
    const allowedFields = ["status", "featured", "approvedByAdmin", "title", "description",
      "requirements", "industry", "jobType", "experienceMin", "experienceMax",
      "salaryMin", "salaryMax", "salaryHidden", "location", "city", "state",
      "skills", "vacancies", "workMode", "functionalArea", "roleCategory",
      "education", "walkInDate", "walkInVenue", "expiresAt", "isRemote"]

    const data: Record<string, unknown> = {}
    for (const key of allowedFields) {
      if (key in body) {
        if (key === "walkInDate" || key === "expiresAt") {
          data[key] = body[key] ? new Date(body[key]) : null
        } else {
          data[key] = body[key]
        }
      }
    }

    const job = await prisma.job.update({
      where: { id: params.id },
      data,
    })
    return NextResponse.json({ job })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    await prisma.job.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 })
  }
}
