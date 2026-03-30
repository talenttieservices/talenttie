export const dynamic = "force-dynamic"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

// PATCH — update user (role, emailVerified, name, phone, password)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { name, phone, role, emailVerified, password } = body

    const data: Record<string, unknown> = {}
    if (name !== undefined) data.name = name
    if (phone !== undefined) data.phone = phone
    if (role !== undefined) data.role = role
    if (emailVerified !== undefined) data.emailVerified = emailVerified
    if (password) data.password = await bcrypt.hash(password, 10)

    const user = await prisma.user.update({
      where: { id: params.id },
      data,
      select: { id: true, name: true, email: true, role: true, emailVerified: true },
    })

    return NextResponse.json({ success: true, user })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

// DELETE — remove user
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.user.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
