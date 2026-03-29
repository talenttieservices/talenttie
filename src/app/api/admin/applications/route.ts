import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const applications = await prisma.guestApplication.findMany({
      orderBy: { appliedAt: "desc" },
    })
    return NextResponse.json({ applications })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ applications: [] })
  }
}
