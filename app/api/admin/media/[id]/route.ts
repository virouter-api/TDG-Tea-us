import { requireAdmin } from "@/lib/server/session"
import { fail, json } from "@/lib/server/http"
import { removeMediaFile } from "@/lib/server/media"
import { getStore } from "@/lib/server/store"

export const dynamic = "force-dynamic"

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin()
    const { id } = await params
    const asset = await getStore().deleteMedia(id)
    if (asset.storedName) removeMediaFile(asset.storedName)
    return json({ ok: true, asset })
  } catch (error) {
    return fail(error)
  }
}
