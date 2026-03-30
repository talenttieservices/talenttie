export const dynamic = "force-dynamic"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"

const guestApplySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  experience: z.number().min(0).optional(),
  salaryExpectation: z.number().min(0).optional(),
  resumeUrl: z.string().url("Invalid resume link").optional().or(z.literal("")),
  message: z.string().optional(),
})

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await req.json()
    const data = guestApplySchema.parse(body)

    await prisma.guestApplication.create({
      data: {
        jobId: params.slug,
        name: data.name,
        email: data.email,
        phone: data.phone,
        experience: data.experience,
        salaryExpectation: data.salaryExpectation,
        resumeUrl: data.resumeUrl || null,
        message: data.message,
      },
    })

    return NextResponse.json({ success: true, message: "Application submitted successfully!" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error("Guest apply error:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}
