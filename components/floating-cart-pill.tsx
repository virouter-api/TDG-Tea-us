"use client"

import { useEffect, useState } from "react"
import { ArrowRight, ShoppingBag } from "lucide-react"
import { CartDrawer } from "@/components/cart-drawer"
import { cartCount, readCart } from "@/lib/cart"

export function FloatingCartPill() {
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(false)
  const [buyBoxVisible, setBuyBoxVisible] = useState(false)

  useEffect(() => {
    const buyBox = document.querySelector("[data-cart-buy-box]")
    if (!buyBox) return
    const observer = new IntersectionObserver(
      ([entry]) => setBuyBoxVisible(entry.isIntersecting),
      { threshold: 0.15 },
    )
    observer.observe(buyBox)
    return () => observer.disconnect()
  }, [])

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

  if (!count || buyBoxVisible) return null

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex items-center justify-between rounded-full bg-foreground px-5 py-3.5 text-background shadow-xl shadow-black/20 md:hidden"
        aria-label="Open your shopping bag"
      >
        <span className="flex items-center gap-2 text-sm font-medium">
          <ShoppingBag className="size-4" />
          {count} {count === 1 ? "item" : "items"} in your bag
        </span>
        <span className="flex items-center gap-1 text-sm font-semibold">
          Review bag <ArrowRight className="size-4" />
        </span>
      </button>
      <CartDrawer open={open} onOpenChange={setOpen} />
    </>
  )
}
