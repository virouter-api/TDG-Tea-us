import { requireAdmin } from "@/lib/server/session"
import { getStore } from "@/lib/server/store"
import { fail, json, readJson } from "@/lib/server/http"
import type { StoreSettings } from "@/lib/server/types"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    await requireAdmin()
    const snapshot = await getStore().read()
    return json({ settings: snapshot.settings })
  } catch (error) {
    return fail(error)
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdmin()
    const patch = await readJson<Partial<StoreSettings>>(request)
    const settings = await getStore().updateSettings(patch)
    return json({ settings })
  } catch (error) {
    return fail(error)
  }
}
