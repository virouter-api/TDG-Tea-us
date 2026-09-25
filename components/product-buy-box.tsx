"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Minus, Plus, Facebook, Twitter, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { addToCart, readCart } from "@/lib/cart"

export function ProductBuyBox({
  slug,
  price,
  unit,
}: {
  slug: string
  price: string
  unit: string
}) {
  const [quantity, setQuantity] = useState(1)
  const [inBag, setInBag] = useState(0)

  useEffect(() => {
    const sync = () => setInBag(readCart().find((line) => line.slug === slug)?.quantity ?? 0)
    sync()
    window.addEventListener("tdg-cart", sync)
    window.addEventListener("storage", sync)
    return () => {
      window.removeEventListener("tdg-cart", sync)
      window.removeEventListener("storage", sync)
    }
  }, [slug])

  return (
    <div className="space-y-6" data-cart-buy-box>
      <p className="text-2xl font-semibold">
        {price}{" "}
        <span className="text-sm font-normal uppercase tracking-widest text-muted-foreground">
          {unit}
        </span>
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex w-fit items-center rounded-full border border-border">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => setQuantity((n) => Math.max(1, n - 1))}
            className="rounded-l-full"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center tabular-nums">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => setQuantity((n) => n + 1)}
            className="rounded-r-full"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button
          type="button"
          className="flex-grow rounded-xl bg-black py-6 text-lg font-medium text-white hover:bg-gray-900"
          onClick={() => addToCart(slug, quantity)}
        >
          {inBag ? "Add more to bag" : "Add to bag"}
        </Button>
      </div>

      {inBag > 0 ? (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-secondary/60 px-4 py-3">
          <p className="text-sm font-medium text-foreground">
            {inBag} {inBag === 1 ? "item" : "items"} in your bag
          </p>
          <a
            className="inline-flex items-center gap-1 text-sm font-semibold text-foreground underline underline-offset-4 hover:no-underline"
            href="/cart"
          >
            Review bag <ArrowRight className="size-3.5" />
          </a>
        </div>
      ) : null}

      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">Share:</span>
        <span className="text-gray-400"><Facebook className="h-5 w-5" /></span>
        <span className="text-gray-400"><Twitter className="h-5 w-5" /></span>
        <span className="text-gray-400"><Instagram className="h-5 w-5" /></span>
      </div>
    </div>
  )
}
