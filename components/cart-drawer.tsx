"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { readCart, setCartQuantity, type CartLine } from "@/lib/cart"
import type { Product } from "@/lib/catalog"

export function CartDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const sync = () => setLines(readCart())
    sync()
    window.addEventListener("tdg-cart", sync)
    window.addEventListener("storage", sync)
    return () => {
      window.removeEventListener("tdg-cart", sync)
      window.removeEventListener("storage", sync)
    }
  }, [])

  useEffect(() => {
    if (!open || products.length) return
    setLoading(true)
    fetch("/api/catalog", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload) => setProducts(payload.products ?? []))
      .finally(() => setLoading(false))
  }, [open, products.length])

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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[min(92vw,420px)] gap-0 rounded-l-2xl border-l-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b px-6 py-5 pr-14">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <ShoppingBag className="size-5" /> Your bag
          </SheetTitle>
          <SheetDescription>
            {lines.length ? `${lines.reduce((sum, line) => sum + line.quantity, 0)} items` : "Your bag is empty"}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {loading ? <p className="text-sm text-muted-foreground">Loading your bag…</p> : null}
          {!loading && rows.length === 0 ? (
            <div className="space-y-4 py-10 text-center">
              <ShoppingBag className="mx-auto size-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Your bag is empty.</p>
              <Button asChild variant="outline" onClick={() => onOpenChange(false)}>
                <Link href="/#collection">Explore the collection</Link>
              </Button>
            </div>
          ) : null}
          <div className="space-y-4">
            {rows.map(({ line, product }) => (
              <div key={line.slug} className="flex gap-3 border-b border-border pb-4">
                <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-white">
                  <img src={product!.image} alt={product!.name} className="h-full w-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <Link href={`/product/${product!.slug}`} onClick={() => onOpenChange(false)} className="text-sm font-medium hover:underline">
                    {product!.shortName}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">{product!.price} / {product!.unit}</p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center rounded-full border border-border">
                      <Button variant="ghost" size="icon-sm" onClick={() => update(line.slug, Math.max(0, line.quantity - 1))} aria-label="Decrease quantity">
                        <Minus className="size-3.5" />
                      </Button>
                      <span className="w-7 text-center text-xs tabular-nums">{line.quantity}</span>
                      <Button variant="ghost" size="icon-sm" onClick={() => update(line.slug, line.quantity + 1)} aria-label="Increase quantity">
                        <Plus className="size-3.5" />
                      </Button>
                    </div>
                    <button type="button" className="text-muted-foreground transition-colors hover:text-foreground" onClick={() => update(line.slug, 0)} aria-label={`Remove ${product!.shortName}`}>
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
                <p className="text-right text-sm font-medium">${(numericPrice(product!.price) * line.quantity).toFixed(0)}</p>
              </div>
            ))}
          </div>
        </div>

        {rows.length ? (
          <SheetFooter className="border-t px-6 py-5">
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal</span><span>${total.toFixed(0)} USD</span>
            </div>
            <p className="text-xs text-muted-foreground">Sales tax calculated at checkout.</p>
            <Button className="w-full rounded-xl" size="lg" asChild onClick={() => onOpenChange(false)}>
              <Link href="/checkout">Checkout</Link>
            </Button>
            <Button variant="ghost" className="w-full" asChild onClick={() => onOpenChange(false)}>
              <Link href="/cart">View full bag</Link>
            </Button>
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}

function numericPrice(value: string) {
  const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ""))
  return Number.isFinite(parsed) ? parsed : 0
}
