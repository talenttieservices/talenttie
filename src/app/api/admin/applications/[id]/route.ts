import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json()
    const application = await prisma.guestApplication.update({
      where: { id: params.id },
      data: { status },
    })
    return NextResponse.json({ application })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
