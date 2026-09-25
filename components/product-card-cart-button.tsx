"use client"

import { useState, type MouseEvent } from "react"
import { Check, ShoppingCart } from "lucide-react"
import { addToCart } from "@/lib/cart"
import { Button } from "@/components/ui/button"

export function ProductCardCartButton({ slug, name }: { slug: string; name: string }) {
  const [added, setAdded] = useState(false)

  function handleAdd(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()
    addToCart(slug, 1)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1400)
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      onClick={handleAdd}
      aria-label={added ? `${name} added to bag` : `Add ${name} to bag`}
      title={added ? "Added to bag" : "Add to bag"}
      className="size-10 rounded-full bg-white/95 text-foreground shadow-sm backdrop-blur transition-transform hover:scale-105 hover:bg-white"
    >
      {added ? <Check className="size-4" /> : <ShoppingCart className="size-4" />}
    </Button>
  )
}
