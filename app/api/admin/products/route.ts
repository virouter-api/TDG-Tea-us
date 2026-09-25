import { requireAdmin } from "@/lib/server/session"
import { getStore } from "@/lib/server/store"
import { fail, json } from "@/lib/server/http"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    await requireAdmin()
    const snapshot = await getStore().read()
    return json({
      products: snapshot.products,
      inventory: snapshot.inventory,
      settings: snapshot.settings,
    })
  } catch (error) {
    return fail(error)
  }
}
