import { getStore } from "@/lib/server/store"
import type { InventoryRow, Order, StoreSnapshot } from "@/lib/server/types"
import type { Product } from "@/lib/catalog"
import { products as fallbackProducts, getProduct as getSeedProduct } from "@/lib/catalog"
import { posts as fallbackPosts, getPost as getSeedPost } from "@/lib/blog"

export async function loadSnapshot(): Promise<StoreSnapshot | null> {
  try {
    return await getStore().read()
  } catch {
    return null
  }
}

export async function loadProducts(): Promise<Product[]> {
  const snapshot = await loadSnapshot()
  return snapshot?.products ?? fallbackProducts
}

export async function loadProduct(slug: string) {
  const snapshot = await loadSnapshot()
  if (snapshot) return snapshot.products.find((product) => product.slug === slug)
  return getSeedProduct(slug)
}

export async function loadPosts() {
  const snapshot = await loadSnapshot()
  return snapshot?.posts ?? fallbackPosts
}

export async function loadPost(slug: string) {
  const snapshot = await loadSnapshot()
  if (snapshot) return snapshot.posts.find((post) => post.slug === slug)
  return getSeedPost(slug)
}

export function inventoryStatus(row: InventoryRow) {
  const available = row.stock - row.reserved
  if (available <= 0) return "Reorder" as const
  if (available <= row.reorderAt) return "Low" as const
  return "In stock" as const
}

export function openOrders(orders: Order[]) {
  return orders.filter((order) => order.status === "pending" || order.status === "processing")
}

export function monthRevenue(orders: Order[]) {
  const prefix = new Date().toISOString().slice(0, 7)
  return orders
    .filter((order) => order.status !== "cancelled" && order.placedAt.startsWith(prefix))
    .reduce((sum, order) => sum + order.total, 0)
}

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
