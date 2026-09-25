import { requireAdmin } from "@/lib/server/session"
import { getStore } from "@/lib/server/store"
import { fail, json, readJson } from "@/lib/server/http"
import type { BlogPost } from "@/lib/blog"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    await requireAdmin()
    const snapshot = await getStore().read()
    return json({ posts: snapshot.posts })
  } catch (error) {
    return fail(error)
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin()
    const post = await readJson<BlogPost>(request)
    const saved = await getStore().upsertPost(post)
    return json({ post: saved }, 201)
  } catch (error) {
    return fail(error)
  }
}
