import { getStore } from "@/lib/server/store"
import { AdminSettingsPanel } from "@/components/admin/settings-panel"

export const dynamic = "force-dynamic"

export default async function AdminSettingsPage() {
  const snapshot = await getStore().read()
  return (
    <AdminSettingsPanel
      settings={snapshot.settings}
      skuCount={snapshot.products.length}
      postCount={snapshot.posts.length}
    />
  )
}
