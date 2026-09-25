import { requireAdmin } from "@/lib/server/session"
import { getStore } from "@/lib/server/store"
import { fail, json, readJson } from "@/lib/server/http"
import type { ProductPatch } from "@/lib/server/types"

export const dynamic = "force-dynamic"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await requireAdmin()
    const { slug } = await params
    const snapshot = await getStore().read()
    const product = snapshot.products.find((item) => item.slug === slug)
    if (!product) return json({ error: "Unknown product" }, 404)
    const inventory = snapshot.inventory.find((item) => item.slug === slug)
    return json({ product, inventory })
  } catch (error) {
    return fail(error)
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await requireAdmin()
    const { slug } = await params
    const patch = await readJson<ProductPatch>(request)
    const product = await getStore().updateProduct(slug, patch)
    const snapshot = await getStore().read()
    const inventory = snapshot.inventory.find((item) => item.slug === slug)
    return json({ product, inventory })
  } catch (error) {
    return fail(error)
  }
}
