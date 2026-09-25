import { requireAdmin } from "@/lib/server/session"
import { getStore } from "@/lib/server/store"
import { fail, json, readJson } from "@/lib/server/http"
import type { OrderStatus } from "@/lib/server/types"

export const dynamic = "force-dynamic"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin()
    const { id } = await params
    const body = await readJson<{ status?: OrderStatus }>(request)
    if (!body.status) return json({ error: "Status is required" }, 400)
    const order = await getStore().updateOrderStatus(id, body.status)
    return json({ order })
  } catch (error) {
    return fail(error)
  }
}
