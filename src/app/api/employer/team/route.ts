export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getEmployerForUser } from "@/lib/employer-auth"
import bcrypt from "bcryptjs"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const employer = await getEmployerForUser(session.user.email)
    if (!employer) return NextResponse.json({ error: "No employer profile" }, { status: 404 })

    // Get owner
    const owner = await prisma.user.findUnique({
      where: { id: employer.userId },
      select: { id: true, name: true, email: true, phone: true, createdAt: true },
    })

    // Get team members
    const members = await prisma.employerMember.findMany({
      where: { employerId: employer.id },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true, emailVerified: true, createdAt: true } },
      },
      orderBy: { addedAt: "asc" },
    })

    const team = [
      owner ? { ...owner, memberRole: "OWNER", memberId: null } : null,
      ...members.map(m => ({ ...m.user, memberRole: m.memberRole, memberId: m.id })),
    ].filter(Boolean)

    return NextResponse.json({ team })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ team: [] })
  }
}

// POST — add team member (by email — user must exist OR create new)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const employer = await getEmployerForUser(session.user.email)
    if (!employer) return NextResponse.json({ error: "No employer profile" }, { status: 404 })

    const { email, name, phone, password, memberRole = "RECRUITER" } = await req.json()
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 })

    let user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      // Create new user
      if (!name || !password) {
        return NextResponse.json({ error: "Name and password required for new user" }, { status: 400 })
      }
      const hashed = await bcrypt.hash(password, 10)
      user = await prisma.user.create({
        data: { name, email, phone: phone || null, password: hashed, role: "EMPLOYER", emailVerified: true },
      })
    }

    // Check not already a member
    const existing = await prisma.employerMember.findFirst({
      where: { employerId: employer.id, userId: user.id },
    })
    if (existing) return NextResponse.json({ error: "User is already a team member" }, { status: 409 })

    // Don't add the owner again
    if (user.id === employer.userId) {
      return NextResponse.json({ error: "This user is the account owner" }, { status: 409 })
    }

    const member = await prisma.employerMember.create({
      data: { employerId: employer.id, userId: user.id, memberRole },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true, emailVerified: true, createdAt: true } },
      },
    })

    return NextResponse.json({ member: { ...member.user, memberRole: member.memberRole, memberId: member.id } })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to add member" }, { status: 500 })
  }
}
