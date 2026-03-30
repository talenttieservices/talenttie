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
      include: { candidateProfile: true },
    })

    if (!user?.candidateProfile) {
      return NextResponse.json({ applications: [], stats: { total: 0, shortlisted: 0, interviews: 0 } })
    }

    const applications = await prisma.application.findMany({
      where: { candidateId: user.candidateProfile.id },
      orderBy: { appliedAt: "desc" },
      include: {
        job: {
          select: {
            title: true, city: true, state: true, industry: true, slug: true,
            employer: { select: { companyName: true } },
          },
        },
      },
    })

    const stats = {
      total: applications.length,
      shortlisted: applications.filter(a => a.status === "SHORTLISTED").length,
      interviews: applications.filter(a => a.status === "INTERVIEW").length,
    }

    return NextResponse.json({ applications, stats })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ applications: [], stats: { total: 0, shortlisted: 0, interviews: 0 } })
  }
}
