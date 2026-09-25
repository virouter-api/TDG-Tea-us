import { requireAdmin } from "@/lib/server/session"
import { getStore } from "@/lib/server/store"
import { fail, json } from "@/lib/server/http"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    await requireAdmin()
    const snapshot = await getStore().read()
    return json({ customers: snapshot.customers })
  } catch (error) {
    return fail(error)
  }
}
