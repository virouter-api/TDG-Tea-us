"use client"

import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { getProduct } from "@/lib/catalog"
import {
  boxesSold,
  formatUsd,
  getInventory,
  getProductOrders,
  productSku,
} from "@/lib/admin"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { StatusBadge } from "@/components/admin/status-badge"

export function AdminProductEditor({ slug }: { slug: string }) {
  const product = getProduct(slug)
  if (!product) {
    return <p className="text-sm text-muted-foreground">Unknown blend.</p>
  }

  const stock = getInventory(product.slug)
  const relatedOrders = getProductOrders(product.slug)
  const gallery = [
    { src: product.image, label: "Packshot" },
    { src: product.lifestyleImage, label: "Lifestyle" },
    { src: product.detailImage, label: "Detail" },
    { src: product.benefitsImage, label: "Benefits" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {productSku(product)} · {product.category}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">{product.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/product/${product.slug}`} target="_blank">
              <ExternalLink className="h-3.5 w-3.5" />
              View PDP
            </Link>
          </Button>
          <Button size="sm" disabled>
            Save (static catalog)
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Copy</CardTitle>
            <CardDescription>Fields already driving the storefront PDP.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label>Display name</Label>
              <Input defaultValue={product.name} readOnly />
            </div>
            <div className="space-y-2">
              <Label>ASCII name</Label>
              <Input defaultValue={product.nameAscii} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Price</Label>
              <Input defaultValue={`${product.price} / ${product.unit}`} readOnly />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Summary</Label>
              <Textarea defaultValue={product.summary} readOnly rows={3} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Audience</Label>
              <Textarea defaultValue={product.audience} readOnly rows={3} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
            <CardDescription>Demo warehouse counts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">On hand</span>
              <span className="font-medium">{stock?.stock ?? 0} boxes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reserved</span>
              <span>{stock?.reserved ?? 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reorder at</span>
              <span>{stock?.reorderAt ?? 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Boxes in demo orders</span>
              <span>{boxesSold(product.slug)}</span>
            </div>
            <Badge variant="secondary">{stock?.status}</Badge>
            {product.bestSeller ? <Badge>Best seller</Badge> : null}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gallery</CardTitle>
          <CardDescription>Slots used by the Shopify-style PDP</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {gallery.map((shot) => (
            <figure key={shot.label} className="overflow-hidden rounded-lg border bg-white">
              <div className="aspect-[4/5]">
                <img src={shot.src} alt="" className="h-full w-full object-cover" />
              </div>
              <figcaption className="px-2 py-1.5 text-xs text-muted-foreground">{shot.label}</figcaption>
            </figure>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ingredients</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {product.ingredients.map((item) => (
              <div key={item.vn} className="flex justify-between gap-4 border-b py-1 last:border-0">
                <span>{item.vn}</span>
                <span className="text-muted-foreground">{item.en}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
              {product.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Orders containing this blend</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {relatedOrders.length === 0 ? (
            <p className="text-sm text-muted-foreground">No demo orders yet.</p>
          ) : (
            relatedOrders.map((order) => (
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
