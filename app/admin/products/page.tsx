import { getStore } from "@/lib/server/store"
import { AdminProductsTable } from "@/components/admin/products-table"

export const dynamic = "force-dynamic"

export default async function AdminProductsPage() {
  const snapshot = await getStore().read()
  return (
    <AdminProductsTable
      products={snapshot.products}
      inventory={snapshot.inventory}
      orders={snapshot.orders}
    />
  )
}
