import { createHmac, timingSafeEqual } from "node:crypto"

export type AuthConfig = {
  email: string
  password: string
  secret: string
  ttlSeconds?: number
  now?: () => number
}

export type AuthOk = { ok: true; email: string }
export type AuthFail = { ok: false }
export type AuthResult = AuthOk | AuthFail

type SessionPayload = {
  email: string
  exp: number
}

function safeEqual(left: string, right: string) {
  const a = createHmac("sha256", "tdg-cmp").update(left).digest()
  const b = createHmac("sha256", "tdg-cmp").update(right).digest()
  return timingSafeEqual(a, b)
}

function sign(secret: string, data: string) {
  return createHmac("sha256", secret).update(data).digest("base64url")
}

export function createAuth(config: AuthConfig) {
  const ttlSeconds = config.ttlSeconds ?? 60 * 60 * 12
  const now = config.now ?? (() => Math.floor(Date.now() / 1000))
  const expectedEmail = config.email.trim().toLowerCase()

  return {
    verifyCredentials(email: string, password: string): AuthResult {
      const normalized = email.trim().toLowerCase()
      const emailOk = safeEqual(normalized, expectedEmail)
      const passwordOk = safeEqual(password, config.password)
      if (!emailOk || !passwordOk) return { ok: false }
      return { ok: true, email: expectedEmail }
    },

    signSession(email: string) {
      const payload: SessionPayload = {
        email: email.trim().toLowerCase(),
        exp: now() + ttlSeconds,
      }
      const data = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url")
      return `${data}.${sign(config.secret, data)}`
    },

    readSession(token: string | undefined | null): SessionPayload | null {
      if (!token) return null
      const [data, signature] = token.split(".")
      if (!data || !signature) return null
      const expected = sign(config.secret, data)
      if (!safeEqual(signature, expected)) return null
      try {
        const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as SessionPayload
        if (!payload?.email || typeof payload.exp !== "number") return null
        if (payload.exp < now()) return null
        return payload
      } catch {
        return null
      }
    },
  }
}

export type Auth = ReturnType<typeof createAuth>
