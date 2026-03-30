export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getEmployerForUser } from "@/lib/employer-auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const employer = await getEmployerForUser(session.user.email)
    if (!employer) {
      return NextResponse.json({ jobs: [] })
    }

    const jobs = await prisma.job.findMany({
      where: { employerId: employer.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true, title: true, slug: true, status: true, city: true, state: true,
        industry: true, jobType: true, workMode: true, createdAt: true,
        featured: true, vacancies: true, approvedByAdmin: true,
        salaryMin: true, salaryMax: true, salaryHidden: true,
        experienceMin: true, experienceMax: true,
        _count: { select: { applications: true } },
      },
    })

    return NextResponse.json({ jobs })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ jobs: [] })
  }
}
