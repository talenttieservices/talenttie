export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { contactSchema } from "@/lib/validations"
import { transporter, FROM, TO_JOBS } from "@/lib/mailer"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = contactSchema.parse(body)

    await prisma.contactMessage.create({ data: validated })
    await prisma.lead.create({
      data: {
        companyName: "Individual",
        contactName: validated.name,
        email: validated.email,
        phone: validated.phone || "",
        source: "Contact Form",
      },
    })

    // Send email notification (non-blocking)
    transporter.sendMail({
      from: FROM,
      to: TO_JOBS,
      replyTo: validated.email,
      subject: `New Contact Form: ${validated.name} - ${validated.subject || "General Inquiry"}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9fafb;padding:0;border-radius:12px;overflow:hidden;">
          <div style="background:#2ECA7F;padding:24px 32px;">
            <img src="https://talenttie.com/logo-symbol.png" alt="TalentTie" style="height:40px;" />
          </div>
          <div style="padding:32px;">
            <h2 style="color:#1C2E3D;margin:0 0 4px;">New Contact Form Submission</h2>
            <p style="color:#6b7280;margin:0 0 24px;">Someone filled out the contact form on talenttie.com</p>
            <table style="width:100%;border-collapse:collapse;">
              <tr style="border-bottom:1px solid #e5e7eb;">
                <td style="padding:10px 0;color:#6b7280;font-size:14px;width:120px;">Name</td>
                <td style="padding:10px 0;color:#1C2E3D;font-weight:600;">${validated.name}</td>
              </tr>
              <tr style="border-bottom:1px solid #e5e7eb;">
                <td style="padding:10px 0;color:#6b7280;font-size:14px;">Email</td>
                <td style="padding:10px 0;"><a href="mailto:${validated.email}" style="color:#2ECA7F;">${validated.email}</a></td>
              </tr>
              ${validated.phone ? `
              <tr style="border-bottom:1px solid #e5e7eb;">
                <td style="padding:10px 0;color:#6b7280;font-size:14px;">Phone</td>
                <td style="padding:10px 0;"><a href="tel:${validated.phone}" style="color:#2ECA7F;">${validated.phone}</a></td>
              </tr>` : ""}
              ${validated.subject ? `
              <tr style="border-bottom:1px solid #e5e7eb;">
                <td style="padding:10px 0;color:#6b7280;font-size:14px;">Subject</td>
                <td style="padding:10px 0;color:#1C2E3D;">${validated.subject}</td>
              </tr>` : ""}
              <tr>
                <td style="padding:10px 0;color:#6b7280;font-size:14px;vertical-align:top;">Message</td>
                <td style="padding:10px 0;color:#1C2E3D;">${validated.message}</td>
              </tr>
            </table>
            <div style="margin-top:24px;padding:16px;background:#fff;border-radius:8px;border:1px solid #e5e7eb;">
              <p style="margin:0;color:#6b7280;font-size:13px;">Reply to this email to respond directly, or view in
                <a href="https://talenttie.com/admin/leads" style="color:#2ECA7F;">TalentTie Admin → Leads</a>
              </p>
            </div>
          </div>
        </div>
      `,
    }).catch(err => console.error("Contact email failed:", err))

    return NextResponse.json({ success: true, message: "Message sent successfully" })
  } catch {
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 })
  }
}
