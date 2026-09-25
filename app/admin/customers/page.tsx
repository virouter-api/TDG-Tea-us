import { getStore } from "@/lib/server/store"
import { AdminCustomersTable } from "@/components/admin/customers-table"

export const dynamic = "force-dynamic"

export default async function AdminCustomersPage() {
  const snapshot = await getStore().read()
  return <AdminCustomersTable customers={snapshot.customers} />
}
