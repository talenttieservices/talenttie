export const dynamic = "force-dynamic"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

// GET — list all users with search + role filter
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search") || ""
    const role = searchParams.get("role") || ""

    const where: Record<string, unknown> = {}
    if (role) where.role = role
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ]
    }

    const users = await prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true, name: true, email: true, phone: true,
        role: true, emailVerified: true, createdAt: true,
        employer: { select: { companyName: true, verified: true } },
      },
    })

    return NextResponse.json({ users })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ users: [] })
  }
}

// POST — create new user (with optional employer profile)
export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, role, password, companyName, industry } = await req.json()
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 })
    }
    if (role === "EMPLOYER" && !companyName) {
      return NextResponse.json({ error: "Company name is required for employer accounts" }, { status: 400 })
    }

    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) return NextResponse.json({ error: "Email already registered" }, { status: 409 })

    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { name, email, phone: phone || null, role: role || "CANDIDATE", password: hashed, emailVerified: true },
    })

    // Auto-create employer profile if role is EMPLOYER
    if (role === "EMPLOYER") {
      await prisma.employer.create({
        data: {
          userId: user.id,
          companyName: companyName.trim(),
          industry: industry || null,
          verified: true,
        },
      })
    }

    return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
