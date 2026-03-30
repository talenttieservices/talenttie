export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getEmployerForUser } from "@/lib/employer-auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const employer = await getEmployerForUser(session.user.email)
    if (!employer) return NextResponse.json({ error: "No employer profile" }, { status: 404 })

    // Don't send logo binary data in GET — just indicate if logo exists
    const { logoData, logoMimeType, ...rest } = employer
    return NextResponse.json({
      employer: {
        ...rest,
        hasLogo: !!logoData,
        logoUrl: logoData ? `/api/employer/logo/${employer.id}` : null,
      }
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const employer = await getEmployerForUser(session.user.email)
    if (!employer) return NextResponse.json({ error: "No employer profile" }, { status: 404 })

    const body = await req.json()
    const allowedFields = ["companyName", "industry", "website", "description", "size", "locations", "phone", "address", "linkedin"]
    const data: Record<string, unknown> = {}
    for (const field of allowedFields) {
      if (field in body) data[field] = body[field]
    }

    const updated = await prisma.employer.update({
      where: { id: employer.id },
      data,
    })
    const { logoData: _ld, logoMimeType: _lm, ...rest } = updated
    return NextResponse.json({ employer: { ...rest, hasLogo: !!_ld, logoUrl: _ld ? `/api/employer/logo/${updated.id}` : null } })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
