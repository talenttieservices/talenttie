export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const data: Record<string, unknown> = {}
    if ("status" in body) data.status = body.status
    if ("notes" in body) data.notes = body.notes

    const application = await prisma.guestApplication.update({
      where: { id: params.id },
      data,
    })
    return NextResponse.json({ application })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
