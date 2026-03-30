export const dynamic = "force-dynamic"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search") || ""

    const where: Record<string, unknown> = {}
    if (search) {
      where.OR = [
        { companyName: { contains: search, mode: "insensitive" } },
        { user: { email: { contains: search, mode: "insensitive" } } },
      ]
    }

    const employers = await prisma.employer.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true, phone: true, emailVerified: true } },
        _count: { select: { jobs: true } },
      },
    })

    return NextResponse.json({ employers })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ employers: [] })
  }
}

// PATCH — toggle employer verified status
export async function PATCH(req: NextRequest) {
  try {
    const { id, verified } = await req.json()
    const employer = await prisma.employer.update({
      where: { id },
      data: { verified },
    })
    return NextResponse.json({ success: true, employer })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to update employer" }, { status: 500 })
  }
}
