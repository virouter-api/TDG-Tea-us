import { getStore } from "@/lib/server/store"
import { AdminContentTable } from "@/components/admin/content-table"

export const dynamic = "force-dynamic"

export default async function AdminContentPage() {
  const snapshot = await getStore().read()
  return <AdminContentTable posts={snapshot.posts} />
}
