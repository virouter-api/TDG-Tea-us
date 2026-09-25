import type { Product } from "@/lib/catalog"
import type { InventoryRow, Order } from "@/lib/server/types"

export function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

export function productSku(product: Product) {
  return `TDG-${product.index}`
}

export function boxesSold(orders: Order[], slug: string) {
  return orders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => {
      const item = order.items.find((entry) => entry.slug === slug)
      return sum + (item?.quantity ?? 0)
    }, 0)
}

export function inventoryStatus(row: InventoryRow) {
  const available = row.stock - row.reserved
  if (available <= 0) return "Reorder" as const
  if (available <= row.reorderAt) return "Low" as const
  return "In stock" as const
}

export function stockTone(row: InventoryRow | undefined) {
  const status = row ? inventoryStatus(row) : "Reorder"
  if (status === "In stock") return "text-emerald-700"
  if (status === "Low") return "text-amber-700"
  return "text-rose-700"
}
