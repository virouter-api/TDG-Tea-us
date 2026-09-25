import { getStore } from "@/lib/server/store"
import { json } from "@/lib/server/http"

export const dynamic = "force-dynamic"

export async function GET() {
  const snapshot = await getStore().read()
  return json({ products: snapshot.products, settings: snapshot.settings })
}
