export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { transporter, FROM } from "@/lib/mailer"
import crypto from "crypto"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 })

    const user = await prisma.user.findUnique({ where: { email } })
    // Always return success to prevent email enumeration
    if (!user) return NextResponse.json({ success: true })

    await prisma.passwordResetToken.deleteMany({ where: { email } })

    const token = crypto.randomBytes(32).toString("hex")
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000)
    await prisma.passwordResetToken.create({ data: { email, token, expiresAt } })

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`

    await transporter.sendMail({
      from: FROM,
      to: email,
      subject: "Reset Your TalentTie Password",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#f9fafb;border-radius:12px;">
          <div style="background:#2ECA7F;padding:20px;border-radius:8px;margin-bottom:24px;text-align:center;">
            <img src="https://talenttie.com/logo-symbol.png" alt="TalentTie" style="height:40px;" />
          </div>
          <h2 style="color:#1C2E3D;margin-bottom:8px;">Reset Your Password</h2>
          <p style="color:#6b7280;margin-bottom:24px;">We received a request to reset the password for your TalentTie account associated with <strong>${email}</strong>.</p>
          <a href="${resetUrl}" style="display:inline-block;background:#2ECA7F;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px;">Reset Password</a>
          <p style="color:#9ca3af;margin-top:24px;font-size:13px;">This link expires in <strong>1 hour</strong>. If you did not request this, you can safely ignore this email.</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
          <p style="color:#9ca3af;font-size:12px;">TalentTie Services | jobs@talenttie.com | +91 9913677622</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Forgot password error:", err)
    return NextResponse.json({ error: "Failed to send reset email" }, { status: 500 })
  }
}
