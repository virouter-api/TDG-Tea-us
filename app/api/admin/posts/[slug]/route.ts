import { requireAdmin } from "@/lib/server/session"
import { getStore } from "@/lib/server/store"
import { fail, json, readJson } from "@/lib/server/http"
import type { BlogPost } from "@/lib/blog"

export const dynamic = "force-dynamic"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await requireAdmin()
    const { slug } = await params
    const body = await readJson<BlogPost>(request)
    const saved = await getStore().upsertPost({ ...body, slug })
    return json({ post: saved })
  } catch (error) {
    return fail(error)
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await requireAdmin()
    const { slug } = await params
    await getStore().deletePost(slug)
    return json({ ok: true })
  } catch (error) {
    return fail(error)
  }
}
