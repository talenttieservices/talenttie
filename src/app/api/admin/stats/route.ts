export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [users, jobs, applications, employers, blogs] = await Promise.all([
      prisma.user.count(),
      prisma.job.count({ where: { status: "ACTIVE" } }),
      prisma.guestApplication.count(),
      prisma.user.count({ where: { role: "EMPLOYER" } }),
      prisma.blogPost.count({ where: { published: true } }),
    ])
    return NextResponse.json({ users, jobs, applications, employers, blogs })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ users: 0, jobs: 0, applications: 0, employers: 0, blogs: 0 })
  }
}
