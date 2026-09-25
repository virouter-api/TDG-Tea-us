import { readAdminSession } from "@/lib/server/session"
import { json } from "@/lib/server/http"

export const dynamic = "force-dynamic"

export async function GET() {
  const session = await readAdminSession()
  if (!session) return json({ authenticated: false }, 401)
  return json({ authenticated: true, email: session.email })
}
