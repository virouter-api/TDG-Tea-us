"use client"

import { useEffect, useState } from "react"
import { ShoppingBag } from "lucide-react"
import { CartDrawer } from "@/components/cart-drawer"
import { cartCount, readCart } from "@/lib/cart"

export function CartLink({ className = "" }: { className?: string }) {
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const sync = () => setCount(cartCount(readCart()))
    sync()
    window.addEventListener("tdg-cart", sync)
    window.addEventListener("storage", sync)
    return () => {
      window.removeEventListener("tdg-cart", sync)
      window.removeEventListener("storage", sync)
    }
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`relative inline-flex items-center gap-2 rounded-full px-2.5 py-2 text-sm font-medium transition-colors hover:bg-foreground/10 ${className}`}
        aria-label={`Open bag${count ? `, ${count} items` : ""}`}
      >
        <ShoppingBag className="size-5" />
        <span className="hidden sm:inline">Bag</span>
        {count > 0 ? (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[10px] text-background">
            {count}
          </span>
        ) : null}
      </button>
      <CartDrawer open={open} onOpenChange={setOpen} />
    </>
  )
}
