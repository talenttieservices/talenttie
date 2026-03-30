export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "EMPLOYER")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const app = await prisma.guestApplication.findUnique({
      where: { id: params.id },
      select: { resumeData: true, resumeMimeType: true, resumeFilename: true },
    })

    if (!app || !app.resumeData) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 })
    }

    const buffer = Buffer.from(app.resumeData, "base64")
    const filename = app.resumeFilename || "resume.pdf"
    const mimeType = app.resumeMimeType || "application/pdf"

    return new Response(buffer, {
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `inline; filename="${filename}"`,
        "Content-Length": buffer.length.toString(),
        "Cache-Control": "private, no-cache",
      },
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to load resume" }, { status: 500 })
  }
}
