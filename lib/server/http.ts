import { NextResponse } from "next/server"
import { StoreError } from "@/lib/server/store"

export function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status })
}

export function fail(error: unknown) {
  if (error instanceof Error && error.name === "UnauthorizedError") {
    return json({ error: "Unauthorized" }, 401)
  }
  if (error instanceof StoreError) {
    const status = /unknown/i.test(error.message) ? 404 : 400
    return json({ error: error.message }, status)
  }
  if (error instanceof Error && /must be set/i.test(error.message)) {
    return json({ error: "Server is not configured" }, 500)
  }
  console.error(error)
  return json({ error: "Internal error" }, 500)
}

export async function readJson<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T
  } catch {
    throw new StoreError("Invalid JSON body")
  }
}
