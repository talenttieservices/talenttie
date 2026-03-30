export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import { transporter, FROM, TO_JOBS } from "@/lib/mailer"

export async function GET() {
  try {
    // Step 1: Verify SMTP connection
    await transporter.verify()

    // Step 2: Send test email
    const info = await transporter.sendMail({
      from: FROM,
      to: TO_JOBS,
      subject: "✅ TalentTie SMTP Test - Office 365 Working",
      html: `
        <div style="font-family:Arial,sans-serif;padding:32px;max-width:500px;">
          <h2 style="color:#2ECA7F;">✅ Email is working!</h2>
          <p>Your Office 365 SMTP setup on TalentTie is configured correctly.</p>
          <p>You will now receive email notifications for:</p>
          <ul>
            <li>New job applications</li>
            <li>Password reset requests</li>
            <li>Contact form submissions</li>
          </ul>
          <p style="color:#6b7280;font-size:13px;">Sent from: ${process.env.SMTP_USER} via ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}</p>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully",
      messageId: info.messageId,
      to: TO_JOBS,
    })
  } catch (err: unknown) {
    const error = err as Error & { code?: string; command?: string; response?: string }
    console.error("SMTP test failed:", error)
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      config: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        from: process.env.SMTP_FROM,
      },
    }, { status: 500 })
  }
}
