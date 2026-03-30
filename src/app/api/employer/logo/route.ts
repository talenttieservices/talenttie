export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getEmployerForUser } from "@/lib/employer-auth"

// POST — upload logo (base64 stored in DB)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const employer = await getEmployerForUser(session.user.email)
    if (!employer) return NextResponse.json({ error: "No employer profile" }, { status: 404 })

    const formData = await req.formData()
    const file = formData.get("logo") as File | null
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 })

    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml"]
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: "Only PNG, JPG, WebP images allowed" }, { status: 400 })
    }
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be under 2MB" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    await prisma.employer.update({
      where: { id: employer.id },
      data: {
        logoData: buffer.toString("base64"),
        logoMimeType: file.type,
        logo: `/api/employer/logo/${employer.id}`,
      },
    })

    return NextResponse.json({ success: true, logoUrl: `/api/employer/logo/${employer.id}` })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
