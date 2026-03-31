export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ count: 0 })

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (user?.role !== "ADMIN") return NextResponse.json({ count: 0 })

    // Count NEW applications (unreviewed)
    const newCount = await prisma.guestApplication.count({ where: { status: "NEW" } })

    // Count applications in the last 24 hours
    const recentCount = await prisma.guestApplication.count({
      where: { appliedAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } }
    })

    // Total count
    const totalCount = await prisma.guestApplication.count()

    return NextResponse.json({ newCount, recentCount, totalCount })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}
