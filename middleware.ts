import { NextResponse, type NextRequest } from "next/server"
import { SESSION_COOKIE } from "@/lib/server/constants"

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/")
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=")
  return Uint8Array.from(atob(padded), (char) => char.charCodeAt(0))
}

function encodeBase64Url(bytes: Uint8Array) {
  let binary = ""
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)))
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")
}

async function validSession(token: string | undefined) {
  const secret = process.env.TDG_SESSION_SECRET
  if (!token || !secret || secret.length < 32) return false
  const [payloadPart, signaturePart, extra] = token.split(".")
  if (!payloadPart || !signaturePart || extra) return false
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    )
    const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payloadPart))
    if (encodeBase64Url(new Uint8Array(signature)) !== signaturePart) return false
    const payload = JSON.parse(new TextDecoder().decode(decodeBase64Url(payloadPart))) as {
      email?: string
      exp?: number
    }
    return Boolean(
      payload.email &&
        payload.email === process.env.TDG_ADMIN_EMAIL?.trim().toLowerCase() &&
        typeof payload.exp === "number" &&
        payload.exp >= Math.floor(Date.now() / 1000),
    )
  } catch {
    return false
  }
}

function isPublicAdminPath(pathname: string) {
  return pathname === "/admin/login" || pathname.startsWith("/admin/login/")
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const needsAuth = pathname.startsWith("/admin") || pathname.startsWith("/api/admin")
  if (!needsAuth || isPublicAdminPath(pathname)) return NextResponse.next()

  const valid = await validSession(request.cookies.get(SESSION_COOKIE)?.value)
  if (valid) return NextResponse.next()

  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const login = new URL("/admin/login", request.url)
  login.searchParams.set("next", pathname)
  return NextResponse.redirect(login)
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
