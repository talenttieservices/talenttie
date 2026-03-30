export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getEmployerForUser } from "@/lib/employer-auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const employer = await getEmployerForUser(session.user.email)
    if (!employer) return NextResponse.json({ applications: [], jobs: [] })

    const jobs = await prisma.job.findMany({
      where: { employerId: employer.id },
      select: { id: true },
    })
    const jobIds = jobs.map(j => j.id)

    const [recentApps, recentJobs] = await Promise.all([
      jobIds.length > 0 ? prisma.guestApplication.findMany({
        where: { jobId: { in: jobIds } },
        orderBy: { appliedAt: "desc" },
        take: 8,
      }) : [],
      prisma.job.findMany({
        where: { employerId: employer.id },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, title: true, slug: true, city: true, status: true, _count: { select: { applications: true } }, createdAt: true },
      }),
    ])

    // Enrich applications with job titles
    const jobMap = Object.fromEntries(
      (await prisma.job.findMany({ where: { id: { in: Array.from(new Set(recentApps.map(a => a.jobId))) } }, select: { id: true, title: true } }))
        .map(j => [j.id, j.title])
    )

    return NextResponse.json({
      applications: recentApps.map(a => ({ ...a, jobTitle: jobMap[a.jobId] || "Unknown" })),
      jobs: recentJobs,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ applications: [], jobs: [] })
  }
}
