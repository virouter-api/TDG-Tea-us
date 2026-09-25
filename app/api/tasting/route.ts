import { getStore } from "@/lib/server/store"
import { fail, json, readJson } from "@/lib/server/http"
import type { TastingRequestInput } from "@/lib/server/types"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = await readJson<TastingRequestInput>(request)
    const tastingRequest = await getStore().createTastingRequest(body)
    return json({ tastingRequest }, 201)
  } catch (error) {
    return fail(error)
  }
}
