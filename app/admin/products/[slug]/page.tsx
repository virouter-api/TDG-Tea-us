import { notFound } from "next/navigation"
import { getStore } from "@/lib/server/store"
import { AdminProductEditor } from "@/components/admin/product-editor"

export const dynamic = "force-dynamic"

export default async function AdminProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const snapshot = await getStore().read()
  const product = snapshot.products.find((item) => item.slug === slug)
  if (!product) notFound()
  const inventory = snapshot.inventory.find((item) => item.slug === slug)
  return <AdminProductEditor product={product} inventory={inventory} orders={snapshot.orders} />
}
