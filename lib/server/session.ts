import { cookies } from "next/headers"
import { createAuth } from "@/lib/server/auth"
import { SESSION_COOKIE } from "@/lib/server/constants"

function requireSecret() {
  const secret = process.env.TDG_SESSION_SECRET
  if (!secret || secret.length < 32) {
    throw new Error("TDG_SESSION_SECRET must be set to at least 32 characters")
  }
  return secret
}

function requireEmail() {
  const email = process.env.TDG_ADMIN_EMAIL
  if (!email) throw new Error("TDG_ADMIN_EMAIL must be set")
  return email
}

function requirePassword() {
  const password = process.env.TDG_ADMIN_PASSWORD
  if (!password || password.length < 10) {
    throw new Error("TDG_ADMIN_PASSWORD must be set to at least 10 characters")
  }
  return password
}

export function getAuth() {
  return createAuth({
    email: requireEmail(),
    password: requirePassword(),
    secret: requireSecret(),
    ttlSeconds: 60 * 60 * 12,
  })
}

export async function readAdminSession() {
  const jar = await cookies()
  const token = jar.get(SESSION_COOKIE)?.value
  return getAuth().readSession(token)
}

export async function requireAdmin() {
  const session = await readAdminSession()
  if (!session) {
    const error = new Error("Unauthorized")
    error.name = "UnauthorizedError"
    throw error
  }
  return session
}

export function sessionCookieOptions(maxAgeSeconds = 60 * 60 * 12) {
  return {
    name: SESSION_COOKIE,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds,
  }
}
