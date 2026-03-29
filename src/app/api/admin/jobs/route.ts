import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true, title: true, industry: true, city: true, state: true,
        status: true, createdAt: true,
        _count: { select: { applications: true } },
      },
    })
    return NextResponse.json({ jobs })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ jobs: [] })
  }
}
