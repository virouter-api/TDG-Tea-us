import { cookies } from "next/headers"
import { getAuth, sessionCookieOptions } from "@/lib/server/session"
import { fail, json, readJson } from "@/lib/server/http"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = await readJson<{ email?: string; password?: string }>(request)
    const auth = getAuth()
    const result = auth.verifyCredentials(body.email ?? "", body.password ?? "")
    if (!result.ok) return json({ error: "Invalid email or password" }, 401)
    const token = auth.signSession(result.email)
    const options = sessionCookieOptions()
    const jar = await cookies()
    jar.set({ ...options, value: token })
    return json({ email: result.email })
  } catch (error) {
    return fail(error)
  }
}
