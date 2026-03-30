export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { employer: true },
    })

    if (!user?.employer) {
      return NextResponse.json({ jobs: [] })
    }

    const jobs = await prisma.job.findMany({
      where: { employerId: user.employer.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true, title: true, slug: true, status: true, city: true, state: true,
        industry: true, jobType: true, createdAt: true, featured: true, vacancies: true,
        _count: { select: { applications: true } },
      },
    })

    return NextResponse.json({ jobs })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ jobs: [] })
  }
}
