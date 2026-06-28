import { LoginEvent } from "@prisma/client"
import prisma from "@/lib/prisma"

export type AuditInput = {
    userId?: string | null
    email: string
    event: LoginEvent
    ipAddress?: string | null
    userAgent?: string | null
}

export async function logLoginEvent(input: AuditInput): Promise<void> {
    try {
          await prisma.loginAuditEvent.create({
                  data: {
                            userId: input.userId ?? null,
                            email: input.email.toLowerCase(),
                            event: input.event,
                            ipAddress: input.ipAddress ?? null,
                            userAgent: input.userAgent ?? null,
                  },
          })
    } catch (err) {
          console.error("[2fa.audit] failed to record event", input.event, err)
    }
}

export function extractClientInfo(req: Request): { ipAddress: string | null; userAgent: string | null } {
    const ipAddress =
          req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          req.headers.get("x-real-ip") ||
          null
    const userAgent = req.headers.get("user-agent") || null
    return { ipAddress, userAgent }
}

export function maskEmail(email: string): string {
    const [local, domain] = email.split("@")
    if (!domain) return email
    if (local.length <= 2) return `${local[0]}*@${domain}`
    return `${local[0]}${"*".repeat(Math.max(1, local.length - 2))}${local.slice(-1)}@${domain}`
}
