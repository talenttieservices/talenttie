import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  tls: { ciphers: "SSLv3" },
})

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const applicantName = formData.get("name") as string || "Applicant"
    const applicantEmail = formData.get("email") as string || ""
    const applicantPhone = formData.get("phone") as string || ""
    const jobTitle = formData.get("jobTitle") as string || "Job"

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 })

    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    if (!allowed.includes(file.type)) return NextResponse.json({ error: "Only PDF and Word documents are allowed" }, { status: 400 })
    if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "File must be under 5MB" }, { status: 400 })

    const buffer = Buffer.from(await file.arrayBuffer())

    await transporter.sendMail({
      from: `"TalentTie Applications" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_FROM,
      replyTo: applicantEmail || undefined,
      subject: `Resume: ${applicantName} applied for ${jobTitle}`,
      html: `
        <p><strong>New Resume Received</strong></p>
        <p>Name: ${applicantName}</p>
        <p>Email: ${applicantEmail}</p>
        <p>Phone: ${applicantPhone}</p>
        <p>Applied for: ${jobTitle}</p>
      `,
      attachments: [{
        filename: file.name,
        content: buffer,
        contentType: file.type,
      }],
    })

    return NextResponse.json({ url: `email:${applicantName}`, success: true })
  } catch (err) {
    console.error("Resume email error:", err)
    return NextResponse.json({ error: "Failed to process resume" }, { status: 500 })
  }
}
