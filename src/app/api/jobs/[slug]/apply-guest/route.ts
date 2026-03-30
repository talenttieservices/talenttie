export const dynamic = "force-dynamic"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.office365.com",
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  tls: { ciphers: "SSLv3", rejectUnauthorized: false },
})

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
      // FormData submission (with file)
      const formData = await req.formData()
      name = formData.get("name") as string || ""
      email = formData.get("email") as string || ""
      phone = formData.get("phone") as string || ""
      message = formData.get("message") as string || ""
      const expVal = formData.get("experience")
      const salVal = formData.get("salaryExpectation")
      if (expVal) experience = parseInt(expVal as string)
      if (salVal) salaryExpectation = parseInt(salVal as string) * 100000

      const file = formData.get("resume") as File | null
      if (file && file.size > 0) {
        resumeBuffer = Buffer.from(await file.arrayBuffer())
        resumeFilename = file.name
        resumeContentType = file.type
      }
    } else {
      // JSON submission (no file)
      const body = await req.json()
      name = body.name || ""
      email = body.email || ""
      phone = body.phone || ""
      message = body.message || ""
      if (body.experience !== undefined) experience = parseInt(body.experience)
      if (body.salaryExpectation !== undefined) salaryExpectation = body.salaryExpectation
    }

    // Validate required fields
    if (!name || name.length < 2) return NextResponse.json({ error: "Name is required" }, { status: 400 })
    if (!email || !email.includes("@")) return NextResponse.json({ error: "Valid email required" }, { status: 400 })
    if (!phone || phone.length < 10) return NextResponse.json({ error: "Valid phone number required" }, { status: 400 })

    // Find the job by slug
    const job = await prisma.job.findUnique({
      where: { slug: params.slug },
      select: { id: true, title: true },
    })
    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 })

    // Save application to DB
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

    // Send email notification (non-blocking - don't fail application if email fails)
    try {
      const attachments = resumeBuffer ? [{
        filename: resumeFilename,
        content: resumeBuffer,
        contentType: resumeContentType,
      }] : []

      await transporter.sendMail({
        from: `"TalentTie Applications" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: process.env.SMTP_FROM || process.env.SMTP_USER,
        replyTo: email,
        subject: `New Application: ${name} → ${job.title}`,
        html: `
          <h2>New Job Application Received</h2>
          <table>
            <tr><td><strong>Job:</strong></td><td>${job.title}</td></tr>
            <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
            <tr><td><strong>Email:</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
            ${experience !== undefined ? `<tr><td><strong>Experience:</strong></td><td>${experience} years</td></tr>` : ""}
            ${salaryExpectation ? `<tr><td><strong>Expected Salary:</strong></td><td>INR ${(salaryExpectation / 100000).toFixed(1)}L PA</td></tr>` : ""}
            ${message ? `<tr><td><strong>Message:</strong></td><td>${message}</td></tr>` : ""}
          </table>
          ${resumeBuffer ? "<p>Resume attached.</p>" : "<p>No resume uploaded.</p>"}
        `,
        attachments,
      })
    } catch (emailErr) {
      console.error("Email notification failed (application still saved):", emailErr)
    }

    return NextResponse.json({ success: true, message: "Application submitted successfully!" })
  } catch (error) {
    console.error("Guest apply error:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}
