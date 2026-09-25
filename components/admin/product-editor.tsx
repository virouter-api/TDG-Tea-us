"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ExternalLink, ImagePlus } from "lucide-react"
import type { Product } from "@/lib/catalog"
import type { InventoryRow, MediaAsset, Order } from "@/lib/server/types"
import { boxesSold, formatUsd, inventoryStatus, productSku } from "@/lib/admin-view"
import { adminFetch, AdminApiError } from "@/lib/admin-client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { StatusBadge } from "@/components/admin/status-badge"
import { MediaPickerDialog } from "@/components/admin/media-library"

type GallerySlot = "image" | "lifestyleImage" | "detailImage" | "benefitsImage" | "sceneImage"

type Props = {
  product: Product
  inventory?: InventoryRow
  orders: Order[]
}

export function AdminProductEditor({ product, inventory, orders }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [mediaSlot, setMediaSlot] = useState<GallerySlot | null>(null)
  const [form, setForm] = useState({
    name: product.name,
    nameAscii: product.nameAscii,
    shortName: product.shortName,
    price: product.price,
    unit: product.unit,
    tagline: product.tagline,
    summary: product.summary,
    audience: product.audience,
    category: product.category,
    label: product.label,
    note: product.note ?? "",
    stock: inventory?.stock ?? 0,
    reserved: inventory?.reserved ?? 0,
    reorderAt: inventory?.reorderAt ?? 12,
    benefits: product.benefits.join("\n"),
    ingredients: product.ingredients.map((item) => `${item.vn} | ${item.en}`).join("\n"),
    image: product.image,
    lifestyleImage: product.lifestyleImage,
    detailImage: product.detailImage,
    benefitsImage: product.benefitsImage,
    sceneImage: product.sceneImage,
  })

  const related = orders.filter((order) => order.items.some((item) => item.slug === product.slug))
  const gallery: Array<{ slot: GallerySlot; src: string; label: string }> = [
    { slot: "image", src: form.image, label: "Packshot" },
    { slot: "lifestyleImage", src: form.lifestyleImage, label: "Lifestyle" },
    { slot: "detailImage", src: form.detailImage, label: "Detail" },
    { slot: "benefitsImage", src: form.benefitsImage, label: "Benefits" },
    { slot: "sceneImage", src: form.sceneImage, label: "Scene" },
  ]

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function selectMedia(asset: MediaAsset) {
    if (!mediaSlot) return
    set(mediaSlot, asset.url)
    setMediaSlot(null)
  }

  async function save() {
    setSaving(true)
    setError("")
    try {
      await adminFetch(`/api/admin/products/${product.slug}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: form.name,
          nameAscii: form.nameAscii,
          shortName: form.shortName,
          price: form.price,
          unit: form.unit,
          tagline: form.tagline,
          summary: form.summary,
          audience: form.audience,
          category: form.category,
          label: form.label,
          note: form.note || undefined,
          image: form.image,
          lifestyleImage: form.lifestyleImage,
          detailImage: form.detailImage,
          benefitsImage: form.benefitsImage,
          sceneImage: form.sceneImage,
          benefits: form.benefits.split("\n").map((line) => line.trim()).filter(Boolean),
          ingredients: form.ingredients
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => {
              const [vn, en] = line.split("|").map((part) => part.trim())
              return { vn: vn || line, en: en || "" }
            }),
          inventory: {
            stock: Number(form.stock),
            reserved: Number(form.reserved),
            reorderAt: Number(form.reorderAt),
          },
        }),
      })
      router.refresh()
    } catch (caught) {
      setError(caught instanceof AdminApiError ? caught.message : "Could not save")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {productSku(product)} · {form.category}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">{form.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{form.tagline}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/product/${product.slug}`} target="_blank">
              <ExternalLink className="h-3.5 w-3.5" />
              View PDP
            </Link>
          </Button>
          <Button size="sm" onClick={save} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Copy</CardTitle>
            <CardDescription>These fields render on the public PDP.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field label="Display name" value={form.name} onChange={(value) => set("name", value)} className="sm:col-span-2" />
            <Field label="ASCII name" value={form.nameAscii} onChange={(value) => set("nameAscii", value)} />
            <Field label="Short name" value={form.shortName} onChange={(value) => set("shortName", value)} />
            <Field label="Price" value={form.price} onChange={(value) => set("price", value)} />
            <Field label="Unit" value={form.unit} onChange={(value) => set("unit", value)} />
            <Field label="Category" value={form.category} onChange={(value) => set("category", value)} />
            <Field label="Label" value={form.label} onChange={(value) => set("label", value)} />
            <Area label="Tagline" value={form.tagline} onChange={(value) => set("tagline", value)} className="sm:col-span-2" />
            <Area label="Summary" value={form.summary} onChange={(value) => set("summary", value)} className="sm:col-span-2" />
            <Area label="Audience" value={form.audience} onChange={(value) => set("audience", value)} className="sm:col-span-2" />
            <Area label="Note" value={form.note} onChange={(value) => set("note", value)} className="sm:col-span-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
            <CardDescription>{inventory ? inventoryStatus(inventory) : "No row"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Field label="On hand" type="number" value={String(form.stock)} onChange={(value) => set("stock", Number(value))} />
            <Field label="Reserved" type="number" value={String(form.reserved)} onChange={(value) => set("reserved", Number(value))} />
            <Field label="Reorder at" type="number" value={String(form.reorderAt)} onChange={(value) => set("reorderAt", Number(value))} />
            <p className="text-sm text-muted-foreground">
              {boxesSold(orders, product.slug)} boxes in recorded orders
            </p>
            {product.bestSeller ? <Badge>Best seller</Badge> : null}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gallery</CardTitle>
          <CardDescription>Choose an existing media asset or upload a new image. Save to publish the selection.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {gallery.map((shot) => (
            <figure key={shot.slot} className="overflow-hidden rounded-2xl border bg-white">
              <div className="aspect-[4/5]">
                <img src={shot.src} alt={`${shot.label} preview`} className="h-full w-full object-cover" />
              </div>
              <figcaption className="space-y-2 p-3">
                <p className="text-xs font-medium">{shot.label}</p>
                <Button type="button" size="sm" variant="outline" className="w-full" onClick={() => setMediaSlot(shot.slot)}>
                  <ImagePlus className="size-3.5" /> Choose image
                </Button>
              </figcaption>
            </figure>
          ))}
        </CardContent>
      </Card>

      <MediaPickerDialog
        open={mediaSlot !== null}
        onOpenChange={(open) => { if (!open) setMediaSlot(null) }}
        onSelect={selectMedia}
        productSlug={product.slug}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ingredients</CardTitle>
            <CardDescription>One per line: Vietnamese | English</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea rows={8} value={form.ingredients} onChange={(event) => set("ingredients", event.target.value)} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Benefits</CardTitle>
            <CardDescription>One sentence per line</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea rows={8} value={form.benefits} onChange={(event) => set("benefits", event.target.value)} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Orders containing this blend</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {related.length === 0 ? (
            <p className="text-sm text-muted-foreground">No orders yet.</p>
          ) : (
            related.map((order) => (
              <div key={order.id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.customer} · {order.placedAt}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={order.status} />
                  <span>{formatUsd(order.total)}</span>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  className,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  className?: string
}) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  )
}

function Area({
  label,
  value,
  onChange,
  className,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <Label>{label}</Label>
      <Textarea rows={3} value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  )
}
