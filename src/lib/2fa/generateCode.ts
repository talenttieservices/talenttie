import crypto from "crypto"

export function generateOtpCode(): string {
    const n = crypto.randomInt(0, 1_000_000)
    return n.toString().padStart(6, "0")
}

export function generateBackupCode(): string {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    let out = ""
    for (let i = 0; i < 10; i++) {
          out += alphabet[crypto.randomInt(0, alphabet.length)]
    }
    return `${out.slice(0, 5)}-${out.slice(5)}`
}

export function normalizeBackupCode(input: string): string {
    return input.replace(/[^A-Za-z0-9]/g, "").toUpperCase()
}
