"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { InnerHeader } from "@/components/inner-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { readCart, setCartQuantity, type CartLine } from "@/lib/cart"
import type { Product } from "@/lib/catalog"

export default function CartPage() {
  const [lines, setLines] = useState<CartLine[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLines(readCart())
    fetch("/api/catalog", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload) => setProducts(payload.products ?? []))
      .finally(() => setLoading(false))
  }, [])

  const rows = useMemo(
    () => lines.map((line) => ({ line, product: products.find((product) => product.slug === line.slug) })).filter((row) => row.product),
    [lines, products],
  )
  const total = rows.reduce((sum, row) => sum + numericPrice(row.product!.price) * row.line.quantity, 0)

  function update(slug: string, quantity: number) {
    setCartQuantity(slug, quantity)
    setLines(readCart())
  }

  return (
    <main className="min-h-screen bg-background">
      <InnerHeader />
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">TDG Tea</p>
          <h1 className="mt-3 text-4xl font-medium tracking-tight md:text-5xl">Your bag</h1>
        </div>
        {loading ? <p className="text-sm text-muted-foreground">Loading your bag…</p> : null}
        {!loading && rows.length === 0 ? (
          <Card>
            <CardContent className="space-y-4 py-10 text-center">
              <p className="text-muted-foreground">Your bag is empty.</p>
              <Button asChild><Link href="/#collection">Explore the collection</Link></Button>
            </CardContent>
          </Card>
        ) : null}
        {rows.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-3">
              {rows.map(({ line, product }) => (
                <Card key={line.slug}>
                  <CardContent className="flex gap-4 p-4">
                    <div className="h-28 w-24 shrink-0 rounded-lg bg-white">
                      <img src={product!.image} alt={product!.name} className="h-full w-full object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link href={`/product/${product!.slug}`} className="font-medium hover:underline">{product!.shortName}</Link>
                      <p className="mt-1 text-sm text-muted-foreground">{product!.price} / {product!.unit}</p>
                      <div className="mt-4 flex items-center justify-between gap-4">
                        <div className="flex items-center rounded-full border">
                          <Button variant="ghost" size="icon-sm" onClick={() => update(line.slug, Math.max(0, line.quantity - 1))} aria-label="Decrease quantity"><Minus className="h-4 w-4" /></Button>
                          <span className="w-8 text-center text-sm">{line.quantity}</span>
                          <Button variant="ghost" size="icon-sm" onClick={() => update(line.slug, line.quantity + 1)} aria-label="Increase quantity"><Plus className="h-4 w-4" /></Button>
                        </div>
                        <button className="text-muted-foreground hover:text-foreground" onClick={() => update(line.slug, 0)} aria-label="Remove item"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                    <p className="text-right font-medium">${(numericPrice(product!.price) * line.quantity).toFixed(0)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="h-fit">
              <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm"><span>Subtotal</span><span>${total.toFixed(0)}</span></div>
                <div className="flex justify-between border-t pt-4 font-medium"><span>Total</span><span>${total.toFixed(0)} USD</span></div>
                <Button className="w-full" asChild><Link href="/checkout">Checkout</Link></Button>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </section>
    </main>
  )
}

function numericPrice(value: string) {
  const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ""))
  return Number.isFinite(parsed) ? parsed : 0
}
