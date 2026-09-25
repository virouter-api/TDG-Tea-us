import { getStore } from "@/lib/server/store"
import { AdminOrdersTable } from "@/components/admin/orders-table"

export const dynamic = "force-dynamic"

export default async function AdminOrdersPage() {
  const snapshot = await getStore().read()
  return <AdminOrdersTable orders={snapshot.orders} />
}
