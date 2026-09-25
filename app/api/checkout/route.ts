import { getStore } from "@/lib/server/store"
import { fail, json, readJson } from "@/lib/server/http"
import type { CheckoutInput } from "@/lib/server/types"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = await readJson<CheckoutInput>(request)
    const order = await getStore().checkout(body)
    return json({ order }, 201)
  } catch (error) {
    return fail(error)
  }
}
