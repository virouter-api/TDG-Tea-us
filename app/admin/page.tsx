import { getStore } from "@/lib/server/store"
import { AdminDashboard } from "@/components/admin/dashboard"

export const dynamic = "force-dynamic"

export default async function AdminHomePage() {
  const snapshot = await getStore().read()
  return <AdminDashboard snapshot={snapshot} />
}
