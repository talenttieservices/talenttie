export const dynamic = "force-dynamic"
import { prisma } from "@/lib/prisma"

// Serve employer logo — public endpoint (no auth needed, logo is public)
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const employer = await prisma.employer.findUnique({
      where: { id: params.id },
      select: { logoData: true, logoMimeType: true, companyName: true },
    })

    if (!employer?.logoData) {
      return new Response("Not found", { status: 404 })
    }

    const buffer = Buffer.from(employer.logoData, "base64")
    return new Response(buffer, {
      headers: {
        "Content-Type": employer.logoMimeType || "image/png",
        "Cache-Control": "public, max-age=3600",
        "Content-Length": buffer.length.toString(),
      },
    })
  } catch {
    return new Response("Error", { status: 500 })
  }
}
