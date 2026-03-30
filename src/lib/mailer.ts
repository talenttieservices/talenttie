import nodemailer from "nodemailer"

// Office 365 SMTP - correct config for cloud deployment
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.office365.com",
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,        // false = STARTTLS (required for port 587)
  requireTLS: true,     // force TLS upgrade - prevents fallback to plaintext
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    ciphers: "TLSv1.2", // Office 365 requires TLS 1.2+ (SSLv3 is rejected)
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000,  // 10s timeout
  greetingTimeout: 10000,
  socketTimeout: 15000,
})

export const FROM = `"TalentTie" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`
export const TO_JOBS = process.env.SMTP_FROM || process.env.SMTP_USER || "jobs@talenttie.com"

// Application notification email HTML
export function applicationEmailHtml(opts: {
  jobTitle: string
  name: string
  email: string
  phone: string
  experience?: number
  salaryExpectation?: number
  message?: string
  hasResume: boolean
}) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9fafb;padding:0;border-radius:12px;overflow:hidden;">
      <div style="background:#2ECA7F;padding:24px 32px;">
        <img src="https://talenttie.com/logo-symbol.png" alt="TalentTie" style="height:40px;" />
      </div>
      <div style="padding:32px;">
        <h2 style="color:#1C2E3D;margin:0 0 4px;">New Application Received</h2>
        <p style="color:#6b7280;margin:0 0 24px;">Someone applied for <strong>${opts.jobTitle}</strong></p>

        <table style="width:100%;border-collapse:collapse;">
          <tr style="border-bottom:1px solid #e5e7eb;">
            <td style="padding:10px 0;color:#6b7280;font-size:14px;width:140px;">Job Position</td>
            <td style="padding:10px 0;color:#1C2E3D;font-weight:600;">${opts.jobTitle}</td>
          </tr>
          <tr style="border-bottom:1px solid #e5e7eb;">
            <td style="padding:10px 0;color:#6b7280;font-size:14px;">Applicant Name</td>
            <td style="padding:10px 0;color:#1C2E3D;font-weight:600;">${opts.name}</td>
          </tr>
          <tr style="border-bottom:1px solid #e5e7eb;">
            <td style="padding:10px 0;color:#6b7280;font-size:14px;">Email</td>
            <td style="padding:10px 0;"><a href="mailto:${opts.email}" style="color:#2ECA7F;">${opts.email}</a></td>
          </tr>
          <tr style="border-bottom:1px solid #e5e7eb;">
            <td style="padding:10px 0;color:#6b7280;font-size:14px;">Phone</td>
            <td style="padding:10px 0;"><a href="tel:${opts.phone}" style="color:#2ECA7F;">${opts.phone}</a></td>
          </tr>
          ${opts.experience !== undefined ? `
          <tr style="border-bottom:1px solid #e5e7eb;">
            <td style="padding:10px 0;color:#6b7280;font-size:14px;">Experience</td>
            <td style="padding:10px 0;color:#1C2E3D;">${opts.experience === 0 ? "Fresher" : `${opts.experience} years`}</td>
          </tr>` : ""}
          ${opts.salaryExpectation ? `
          <tr style="border-bottom:1px solid #e5e7eb;">
            <td style="padding:10px 0;color:#6b7280;font-size:14px;">Expected Salary</td>
            <td style="padding:10px 0;color:#1C2E3D;">INR ${(opts.salaryExpectation / 100000).toFixed(1)}L PA</td>
          </tr>` : ""}
          ${opts.message ? `
          <tr style="border-bottom:1px solid #e5e7eb;">
            <td style="padding:10px 0;color:#6b7280;font-size:14px;vertical-align:top;">Message</td>
            <td style="padding:10px 0;color:#1C2E3D;">${opts.message}</td>
          </tr>` : ""}
          <tr>
            <td style="padding:10px 0;color:#6b7280;font-size:14px;">Resume</td>
            <td style="padding:10px 0;color:#1C2E3D;">${opts.hasResume ? "✅ Attached to this email" : "Not uploaded"}</td>
          </tr>
        </table>

        <div style="margin-top:24px;padding:16px;background:#fff;border-radius:8px;border:1px solid #e5e7eb;">
          <p style="margin:0;color:#6b7280;font-size:13px;">
            Reply to this email to contact the applicant directly, or log in to
            <a href="https://talenttie.com/admin/applications" style="color:#2ECA7F;">TalentTie Admin</a>
            to manage this application.
          </p>
        </div>
      </div>
      <div style="padding:16px 32px;background:#f3f4f6;text-align:center;">
        <p style="margin:0;color:#9ca3af;font-size:12px;">TalentTie Services | jobs@talenttie.com | +91 9913677622</p>
      </div>
    </div>
  `
}
