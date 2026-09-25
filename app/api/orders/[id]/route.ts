import { getStore } from "@/lib/server/store"
import { fail, json } from "@/lib/server/http"

export const dynamic = "force-dynamic"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const snapshot = await getStore().read()
    const order = snapshot.orders.find((entry) => entry.id === id)
    if (!order) return json({ error: "Order not found" }, 404)
    return json({ order })
  } catch (error) {
    return fail(error)
  }
}
