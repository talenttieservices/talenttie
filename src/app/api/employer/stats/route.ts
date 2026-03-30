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
      return NextResponse.json({ activeJobs: 0, applications: 0, shortlisted: 0, hired: 0 })
    }

    const employerId = user.employer.id

    // Get job IDs for this employer
    const myJobs = await prisma.job.findMany({
      where: { employerId },
      select: { id: true },
    })
    const jobIds = myJobs.map(j => j.id)

    const [activeJobs, applications, shortlisted, hired] = await Promise.all([
      prisma.job.count({ where: { employerId, status: "ACTIVE" } }),
      jobIds.length > 0 ? prisma.guestApplication.count({ where: { jobId: { in: jobIds } } }) : 0,
      jobIds.length > 0 ? prisma.guestApplication.count({ where: { jobId: { in: jobIds }, status: "SHORTLISTED" } }) : 0,
      jobIds.length > 0 ? prisma.guestApplication.count({ where: { jobId: { in: jobIds }, status: "HIRED" } }) : 0,
    ])

    return NextResponse.json({ activeJobs, applications, shortlisted, hired })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ activeJobs: 0, applications: 0, shortlisted: 0, hired: 0 })
  }
}
