import { requireAdmin } from "@/lib/server/session"
import { fail, json } from "@/lib/server/http"
import { getStore } from "@/lib/server/store"
import {
  MEDIA_MAX_BYTES,
  MEDIA_MIME_TYPES,
  imageSignatureMatches,
  isMediaKind,
  mediaStoredName,
  writeMediaFile,
} from "@/lib/server/media"
import type { MediaAsset, MediaKind } from "@/lib/server/types"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    await requireAdmin()
    const snapshot = await getStore().read()
    const kind = new URL(request.url).searchParams.get("kind")
    const search = new URL(request.url).searchParams.get("search")?.toLowerCase().trim()
    const assets = snapshot.mediaAssets.filter((asset) => {
      const kindMatch = !kind || kind === "All" || asset.kind === kind
      const searchMatch = !search || `${asset.originalName} ${asset.label} ${asset.altText ?? ""}`.toLowerCase().includes(search)
      return kindMatch && searchMatch
    })
    return json({ assets })
  } catch (error) {
    return fail(error)
  }
}

export async function POST(request: Request) {
  let storedName = ""
  try {
    await requireAdmin()
    const form = await request.formData()
    const file = form.get("file")
    if (!(file instanceof File)) return json({ error: "Image file is required" }, 400)
    if (!file.size || file.size > MEDIA_MAX_BYTES) {
      return json({ error: "Image must be between 1 byte and 10 MB" }, 400)
    }
    if (!MEDIA_MIME_TYPES[file.type]) {
      return json({ error: "Supported formats: JPEG, PNG, WebP, or AVIF" }, 400)
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    if (!imageSignatureMatches(buffer, file.type)) {
      return json({ error: "The uploaded file is not a valid image" }, 400)
    }

    const rawKind = String(form.get("kind") || "Other")
    const kind: MediaKind = isMediaKind(rawKind) ? rawKind : "Other"
    storedName = mediaStoredName(file.type)
    writeMediaFile(storedName, buffer)

    const asset: MediaAsset = {
      id: `upload:${storedName}`,
      originalName: file.name || storedName,
      storedName,
      url: `/media/${storedName}`,
      mimeType: file.type,
      sizeBytes: file.size,
      kind,
      label: String(form.get("label") || file.name || storedName),
      altText: String(form.get("altText") || "").trim() || undefined,
      productSlug: String(form.get("productSlug") || "").trim() || undefined,
      source: "upload",
      createdAt: new Date().toISOString(),
    }
    const saved = await getStore().createMedia(asset)
    return json({ asset: saved }, 201)
  } catch (error) {
    if (storedName) {
      try {
        const { removeMediaFile } = await import("@/lib/server/media")
        removeMediaFile(storedName)
      } catch {
        // Best-effort cleanup after a failed metadata write.
      }
    }
    return fail(error)
  }
}
