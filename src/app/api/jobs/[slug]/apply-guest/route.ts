export const dynamic = "force-dynamic"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { transporter, FROM, TO_JOBS, applicationEmailHtml } from "@/lib/mailer"

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const contentType = req.headers.get("content-type") || ""
    let name = "", email = "", phone = "", message = ""
    let experience: number | undefined, salaryExpectation: number | undefined
    let resumeBuffer: Buffer | undefined, resumeFilename = "", resumeContentType = ""

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData()
      name = (formData.get("name") as string) || ""
      email = (formData.get("email") as string) || ""
      phone = (formData.get("phone") as string) || ""
      message = (formData.get("message") as string) || ""
      const expVal = formData.get("experience")
      const salVal = formData.get("salaryExpectation")
      if (expVal) experience = parseInt(expVal as string)
      if (salVal) salaryExpectation = parseInt(salVal as string) * 100000

      const file = formData.get("resume") as File | null
      if (file && file.size > 0) {
        const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
        if (allowed.includes(file.type) && file.size <= 5 * 1024 * 1024) {
          resumeBuffer = Buffer.from(await file.arrayBuffer())
          resumeFilename = file.name
          resumeContentType = file.type
        }
      }
    } else {
      const body = await req.json()
      name = body.name || ""
      email = body.email || ""
      phone = body.phone || ""
      message = body.message || ""
      if (body.experience !== undefined) experience = parseInt(body.experience)
      if (body.salaryExpectation !== undefined) salaryExpectation = body.salaryExpectation
    }

    // Validate
    if (!name || name.length < 2) return NextResponse.json({ error: "Name is required" }, { status: 400 })
    if (!email || !email.includes("@")) return NextResponse.json({ error: "Valid email required" }, { status: 400 })
    if (!phone || phone.length < 10) return NextResponse.json({ error: "Valid phone number required" }, { status: 400 })

    // Find job by slug
    const job = await prisma.job.findUnique({
      where: { slug: params.slug },
      select: { id: true, title: true },
    })
    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 })

    // Save to DB first (always succeeds regardless of email)
    await prisma.guestApplication.create({
      data: {
        jobId: job.id,
        name,
        email,
        phone,
        experience,
        salaryExpectation,
        resumeUrl: resumeFilename ? `file:${resumeFilename}` : null,
        message,
      },
    })

    // Send email notification (non-blocking)
    transporter.sendMail({
      from: FROM,
      to: TO_JOBS,
      replyTo: email,
      subject: `New Application: ${name} → ${job.title}`,
      html: applicationEmailHtml({
        jobTitle: job.title,
        name,
        email,
        phone,
        experience,
        salaryExpectation,
        message,
        hasResume: !!resumeBuffer,
      }),
      attachments: resumeBuffer ? [{
        filename: resumeFilename,
        content: resumeBuffer,
        contentType: resumeContentType,
      }] : [],
    }).catch(err => console.error("Application email failed:", err))

    return NextResponse.json({ success: true, message: "Application submitted successfully!" })
  } catch (error) {
    console.error("Guest apply error:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}
