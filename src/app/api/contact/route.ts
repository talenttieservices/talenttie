import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { contactSchema } from "@/lib/validations"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = contactSchema.parse(body)
    await prisma.contactMessage.create({ data: validated })
    await prisma.lead.create({ data: { companyName: "Individual", contactName: validated.name, email: validated.email, phone: validated.phone || "", source: "Contact Form" } })
    return NextResponse.json({ success: true, message: "Message sent successfully" })
  } catch {
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 })
  }
}
