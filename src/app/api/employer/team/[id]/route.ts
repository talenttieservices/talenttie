export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getEmployerForUser } from "@/lib/employer-auth"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const employer = await getEmployerForUser(session.user.email)
    if (!employer) return NextResponse.json({ error: "No employer profile" }, { status: 404 })

    const { memberRole } = await req.json()
    const member = await prisma.employerMember.update({
      where: { id: params.id, employerId: employer.id },
      data: { memberRole },
    })
    return NextResponse.json({ member })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const employer = await getEmployerForUser(session.user.email)
    if (!employer) return NextResponse.json({ error: "No employer profile" }, { status: 404 })

    await prisma.employerMember.delete({
      where: { id: params.id, employerId: employer.id },
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to remove member" }, { status: 500 })
  }
}
