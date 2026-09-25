import { mkdirSync, renameSync, unlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { randomUUID } from "node:crypto"
import type { MediaKind } from "@/lib/server/types"

export const MEDIA_MAX_BYTES = 10 * 1024 * 1024

export const MEDIA_MIME_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
}

export function mediaDirectory() {
  const dataDir = process.env.TDG_DATA_DIR || join(process.cwd(), "data")
  const directory = join(dataDir, "media")
  mkdirSync(directory, { recursive: true })
  return directory
}

export function mediaPath(storedName: string) {
  return join(mediaDirectory(), storedName)
}

export function writeMediaFile(storedName: string, buffer: Buffer) {
  const destination = mediaPath(storedName)
  const temporary = `${destination}.${process.pid}.tmp`
  writeFileSync(temporary, buffer)
  renameSync(temporary, destination)
  return destination
}

export function removeMediaFile(storedName: string) {
  try {
    unlinkSync(mediaPath(storedName))
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error
  }
}

export function mediaStoredName(mimeType: string) {
  const extension = MEDIA_MIME_TYPES[mimeType]
  if (!extension) throw new Error("Unsupported image type")
  return `${randomUUID()}.${extension}`
}

export function isMediaKind(value: string): value is MediaKind {
  return ["Packshot", "Lifestyle", "Detail", "Benefits", "Scene", "Blog", "Origin", "Other"].includes(value)
}

export function imageSignatureMatches(buffer: Buffer, mimeType: string) {
  if (mimeType === "image/jpeg") return buffer.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))
  if (mimeType === "image/png") return buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  if (mimeType === "image/webp") return buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP"
  if (mimeType === "image/avif") return buffer.subarray(4, 12).toString("ascii").includes("ftyp")
  return false
}
