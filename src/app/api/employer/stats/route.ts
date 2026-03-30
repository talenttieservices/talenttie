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
      return NextResponse.json({ activeJobs: 0, totalJobs: 0, applications: 0, shortlisted: 0, hired: 0, teamSize: 0 })
    }

    const jobIds = (await prisma.job.findMany({
      where: { employerId: employer.id },
      select: { id: true },
    })).map(j => j.id)

    const teamSize = await prisma.employerMember.count({ where: { employerId: employer.id } })

    const [activeJobs, totalJobs, applications, shortlisted, hired] = await Promise.all([
      prisma.job.count({ where: { employerId: employer.id, status: "ACTIVE" } }),
      prisma.job.count({ where: { employerId: employer.id } }),
      jobIds.length > 0 ? prisma.guestApplication.count({ where: { jobId: { in: jobIds } } }) : 0,
      jobIds.length > 0 ? prisma.guestApplication.count({ where: { jobId: { in: jobIds }, status: "SHORTLISTED" } }) : 0,
      jobIds.length > 0 ? prisma.guestApplication.count({ where: { jobId: { in: jobIds }, status: "HIRED" } }) : 0,
    ])

    return NextResponse.json({ activeJobs, totalJobs, applications, shortlisted, hired, teamSize: teamSize + 1 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ activeJobs: 0, totalJobs: 0, applications: 0, shortlisted: 0, hired: 0, teamSize: 1 })
  }
}
