export const OTP_CODE_TTL_MINUTES = Number(process.env.OTP_CODE_TTL_MINUTES || 10)
export const OTP_MAX_ATTEMPTS = Number(process.env.OTP_MAX_ATTEMPTS || 5)
export const OTP_RATE_LIMIT_WINDOW_MINUTES = Number(process.env.OTP_RATE_LIMIT_WINDOW_MINUTES || 15)
export const OTP_RESEND_COOLDOWN_SECONDS = Number(process.env.OTP_RESEND_COOLDOWN_SECONDS || 60)
export const OTP_MAX_SENDS_PER_WINDOW = Number(process.env.OTP_MAX_SENDS_PER_WINDOW || 3)
export const OTP_GLOBAL_FAIL_LIMIT = Number(process.env.OTP_GLOBAL_FAIL_LIMIT || 10)
export const OTP_IP_HOURLY_SEND_LIMIT = Number(process.env.OTP_IP_HOURLY_SEND_LIMIT || 100)

export const BACKUP_CODE_COUNT = 10
export const BACKUP_CODE_LENGTH = 10

export const MANDATORY_2FA_ENFORCED_FROM = process.env.MANDATORY_2FA_ENFORCED_FROM
  ? new Date(process.env.MANDATORY_2FA_ENFORCED_FROM)
    : null

export const MANDATORY_2FA_ROLES = (process.env.MANDATORY_2FA_ROLES || "EMPLOYER,ADMIN")
  .split(",")
  .map((r) => r.trim().toUpperCase())
  .filter(Boolean)

type Role = "CANDIDATE" | "EMPLOYER" | "ADMIN"

export function isMandatoryEnforced(role?: Role): boolean {
    if (role && !MANDATORY_2FA_ROLES.includes(role)) return false
    if (!MANDATORY_2FA_ENFORCED_FROM) {
          return role ? MANDATORY_2FA_ROLES.includes(role) : false
    }
    return Date.now() >= MANDATORY_2FA_ENFORCED_FROM.getTime()
}
