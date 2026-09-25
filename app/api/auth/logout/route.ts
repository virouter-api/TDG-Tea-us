import { cookies } from "next/headers"
import { sessionCookieOptions } from "@/lib/server/session"
import { SESSION_COOKIE } from "@/lib/server/constants"
import { json } from "@/lib/server/http"

export const dynamic = "force-dynamic"

export async function POST() {
  const jar = await cookies()
  jar.set({ ...sessionCookieOptions(0), name: SESSION_COOKIE, value: "" })
  return json({ ok: true })
}
