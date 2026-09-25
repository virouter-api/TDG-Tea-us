"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Check, Clipboard, ImagePlus, Search, Trash2, Upload } from "lucide-react"
import type { MediaAsset, MediaKind } from "@/lib/server/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export const MEDIA_KINDS: Array<MediaKind | "All"> = [
  "All",
  "Packshot",
  "Lifestyle",
  "Detail",
  "Benefits",
  "Scene",
  "Blog",
  "Origin",
  "Other",
]

type MediaLibraryProps = {
  selectionMode?: boolean
  onSelect?: (asset: MediaAsset) => void
  productSlug?: string
}

export function MediaLibrary({ selectionMode = false, onSelect, productSlug }: MediaLibraryProps) {
  const [kind, setKind] = useState<MediaKind | "All">("All")
  const [search, setSearch] = useState("")
  const [assets, setAssets] = useState<MediaAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [uploadOpen, setUploadOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadKind, setUploadKind] = useState<MediaKind>(productSlug ? "Packshot" : "Other")
  const [label, setLabel] = useState("")
  const [altText, setAltText] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const query = useMemo(() => {
    const params = new URLSearchParams()
    if (kind !== "All") params.set("kind", kind)
    if (search.trim()) params.set("search", search.trim())
    return params.toString()
  }, [kind, search])

  const loadAssets = useCallback(async () => {
    setLoading(true)
    setError("")
    try {
      const response = await fetch(`/api/admin/media${query ? `?${query}` : ""}`, { cache: "no-store" })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || "Could not load media")
      setAssets(payload.assets ?? [])
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not load media")
    } finally {
      setLoading(false)
    }
  }, [query])

  useEffect(() => {
    const timer = window.setTimeout(() => void loadAssets(), search ? 180 : 0)
    return () => window.clearTimeout(timer)
  }, [loadAssets, search])

  async function upload() {
    if (!selectedFile) {
      setError("Choose an image first.")
      return
    }
    setUploading(true)
    setError("")
    try {
      const body = new FormData()
      body.set("file", selectedFile)
      body.set("kind", uploadKind)
      body.set("label", label.trim() || selectedFile.name)
      body.set("altText", altText.trim())
      if (productSlug) body.set("productSlug", productSlug)
      const response = await fetch("/api/admin/media", { method: "POST", body })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || "Upload failed")
      setSelectedFile(null)
      setLabel("")
      setAltText("")
      setUploadOpen(false)
      await loadAssets()
      if (selectionMode && payload.asset && onSelect) onSelect(payload.asset)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  async function remove(asset: MediaAsset) {
    if (asset.source !== "upload") return
    if (!window.confirm(`Delete ${asset.label || asset.originalName}?`)) return
    setError("")
    try {
      const response = await fetch(`/api/admin/media/${encodeURIComponent(asset.id)}`, { method: "DELETE" })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || "Delete failed")
      await loadAssets()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Delete failed")
    }
  }

  async function copyUrl(asset: MediaAsset) {
    const absolute = new URL(asset.url, window.location.origin).toString()
    await navigator.clipboard?.writeText(absolute)
    setCopiedId(asset.id)
    window.setTimeout(() => setCopiedId(null), 1400)
  }

  return (
    <div className="space-y-5">
      {!selectionMode ? (
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Media</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload and manage persistent product and journal images. New files are stored outside the deploy source.
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-wrap gap-2">
          {MEDIA_KINDS.map((item) => (
            <Button key={item} size="sm" variant={kind === item ? "default" : "outline"} onClick={() => setKind(item)}>
              {item}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="relative min-w-56 flex-1 md:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search media" className="pl-9" />
          </div>
          <Button onClick={() => setUploadOpen((value) => !value)}>
            <Upload className="size-4" /> Upload
          </Button>
        </div>
      </div>

      {uploadOpen ? (
        <Card className="rounded-2xl border-dashed">
          <CardHeader>
            <CardTitle>Upload image</CardTitle>
            <CardDescription>JPEG, PNG, WebP, or AVIF up to 10 MB.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="media-file">Image file</Label>
              <Input
                ref={fileRef}
                id="media-file"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
              />
              {selectedFile ? <p className="text-xs text-muted-foreground">Selected: {selectedFile.name}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="media-kind">Kind</Label>
              <select
                id="media-kind"
                value={uploadKind}
                onChange={(event) => setUploadKind(event.target.value as MediaKind)}
                className="h-9 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
              >
                {MEDIA_KINDS.filter((item): item is MediaKind => item !== "All").map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="media-label">Label</Label>
              <Input id="media-label" value={label} onChange={(event) => setLabel(event.target.value)} placeholder="Product packshot" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="media-alt">Alt text</Label>
              <Input id="media-alt" value={altText} onChange={(event) => setAltText(event.target.value)} placeholder="Describe the image for accessibility" />
            </div>
            <div className="flex justify-end gap-2 md:col-span-2">
              <Button variant="outline" onClick={() => setUploadOpen(false)}>Cancel</Button>
              <Button onClick={upload} disabled={uploading || !selectedFile}>{uploading ? "Uploading…" : "Upload image"}</Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {loading ? <p className="text-sm text-muted-foreground">Loading media…</p> : null}
      {!loading && assets.length === 0 ? <p className="py-10 text-center text-sm text-muted-foreground">No media matches this filter.</p> : null}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {assets.map((asset) => (
          <figure key={asset.id} className="overflow-hidden rounded-2xl border bg-card">
            <button type="button" className="block w-full text-left" onClick={() => selectionMode && onSelect?.(asset)} disabled={!selectionMode}>
              <div className="aspect-[4/5] bg-white">
                <img src={asset.url} alt={asset.altText || asset.label} className="h-full w-full object-cover" />
              </div>
              <figcaption className="space-y-1 p-3">
                <p className="truncate text-sm font-medium">{asset.label}</p>
                <p className="truncate text-xs text-muted-foreground">{asset.kind} · {asset.source === "upload" ? "Uploaded" : "Existing"}</p>
              </figcaption>
            </button>
            <div className="flex items-center justify-between border-t px-3 py-2">
              <button type="button" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground" onClick={() => void copyUrl(asset)}>
                {copiedId === asset.id ? <Check className="size-3.5" /> : <Clipboard className="size-3.5" />}
                {copiedId === asset.id ? "Copied" : "Copy URL"}
              </button>
              {asset.source === "upload" ? (
                <button type="button" className="text-muted-foreground hover:text-destructive" onClick={() => void remove(asset)} aria-label={`Delete ${asset.label}`}>
                  <Trash2 className="size-4" />
                </button>
              ) : <ImagePlus className="size-4 text-muted-foreground" aria-hidden="true" />}
            </div>
          </figure>
        ))}
      </div>
    </div>
  )
}

export function MediaPickerDialog({
  open,
  onOpenChange,
  onSelect,
  productSlug,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (asset: MediaAsset) => void
  productSlug?: string
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] max-w-5xl overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle>Choose media</DialogTitle>
          <DialogDescription>Select an existing image or upload a new one.</DialogDescription>
        </DialogHeader>
        <MediaLibrary selectionMode onSelect={(asset) => { onSelect(asset); onOpenChange(false) }} productSlug={productSlug} />
      </DialogContent>
    </Dialog>
  )
}
