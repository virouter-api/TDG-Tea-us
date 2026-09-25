import { posts, type BlogPost } from "@/lib/blog"
import { products, type Product } from "@/lib/catalog"

export const ADMIN_SESSION_KEY = "tdg-admin-session"
export const ADMIN_DEMO_EMAIL = "admin@tdg-tea.com"
export const ADMIN_DEMO_PASSWORD = "tdg-admin"

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"

export type OrderItem = {
  slug: string
  name: string
  quantity: number
  unitPrice: number
}

export type Order = {
  id: string
  customer: string
  email: string
  city: string
  status: OrderStatus
  placedAt: string
  total: number
  items: OrderItem[]
}

export type Customer = {
  id: string
  name: string
  email: string
  city: string
  orders: number
  spent: number
  lastOrderAt: string
  segment: "VIP" | "New" | "Returning"
}

export type InventoryRow = {
  slug: string
  name: string
  sku: string
  stock: number
  reserved: number
  reorderAt: number
  status: "In stock" | "Low" | "Reorder"
}

export type MediaAsset = {
  src: string
  label: string
  kind: "Packshot" | "Lifestyle" | "Detail" | "Benefits" | "Blog" | "Origin"
  product?: string
}

const UNIT_PRICE = 25

export const orders: Order[] = [
  {
    id: "TDG-1048",
    customer: "Maya Chen",
    email: "maya.chen@example.com",
    city: "San Francisco",
    status: "processing",
    placedAt: "2026-09-23",
    total: 75,
    items: [
      { slug: "ca-gai-leo", name: "Cà Gai Leo Rau Má", quantity: 2, unitPrice: UNIT_PRICE },
      { slug: "dinh-lang", name: "Đinh Lăng Lạc Tiên", quantity: 1, unitPrice: UNIT_PRICE },
    ],
  },
  {
    id: "TDG-1047",
    customer: "Daniel Park",
    email: "daniel.park@example.com",
    city: "Seattle",
    status: "shipped",
    placedAt: "2026-09-22",
    total: 50,
    items: [
      { slug: "gung-dang-sam", name: "Gừng Đẳng Sâm", quantity: 1, unitPrice: UNIT_PRICE },
      { slug: "tia-to", name: "Tía Tô Tầm Bóp", quantity: 1, unitPrice: UNIT_PRICE },
    ],
  },
  {
    id: "TDG-1046",
    customer: "Sofia Alvarez",
    email: "sofia.alvarez@example.com",
    city: "Austin",
    status: "pending",
    placedAt: "2026-09-22",
    total: 25,
    items: [{ slug: "bup-oi", name: "Búp Ổi Thìa Canh", quantity: 1, unitPrice: UNIT_PRICE }],
  },
  {
    id: "TDG-1045",
    customer: "James Okafor",
    email: "james.okafor@example.com",
    city: "Brooklyn",
    status: "delivered",
    placedAt: "2026-09-20",
    total: 100,
    items: [
      { slug: "ca-gai-leo", name: "Cà Gai Leo Rau Má", quantity: 2, unitPrice: UNIT_PRICE },
      { slug: "giao-co-lam", name: "Giảo Cổ Lam Sương Sáo", quantity: 2, unitPrice: UNIT_PRICE },
    ],
  },
  {
    id: "TDG-1044",
    customer: "Hannah Lee",
    email: "hannah.lee@example.com",
    city: "Portland",
    status: "delivered",
    placedAt: "2026-09-18",
    total: 50,
    items: [{ slug: "dinh-lang", name: "Đinh Lăng Lạc Tiên", quantity: 2, unitPrice: UNIT_PRICE }],
  },
  {
    id: "TDG-1043",
    customer: "Owen Wright",
    email: "owen.wright@example.com",
    city: "Denver",
    status: "cancelled",
    placedAt: "2026-09-17",
    total: 25,
    items: [{ slug: "tia-to", name: "Tía Tô Tầm Bóp", quantity: 1, unitPrice: UNIT_PRICE }],
  },
]

export const customers: Customer[] = [
  {
    id: "CUS-201",
    name: "Maya Chen",
    email: "maya.chen@example.com",
    city: "San Francisco",
    orders: 6,
    spent: 375,
    lastOrderAt: "2026-09-23",
    segment: "VIP",
  },
  {
    id: "CUS-202",
    name: "James Okafor",
    email: "james.okafor@example.com",
    city: "Brooklyn",
    orders: 4,
    spent: 250,
    lastOrderAt: "2026-09-20",
    segment: "Returning",
  },
  {
    id: "CUS-203",
    name: "Daniel Park",
    email: "daniel.park@example.com",
    city: "Seattle",
    orders: 3,
    spent: 150,
    lastOrderAt: "2026-09-22",
    segment: "Returning",
  },
  {
    id: "CUS-204",
    name: "Hannah Lee",
    email: "hannah.lee@example.com",
    city: "Portland",
    orders: 2,
    spent: 100,
    lastOrderAt: "2026-09-18",
    segment: "Returning",
  },
  {
    id: "CUS-205",
    name: "Sofia Alvarez",
    email: "sofia.alvarez@example.com",
    city: "Austin",
    orders: 1,
    spent: 25,
    lastOrderAt: "2026-09-22",
    segment: "New",
  },
  {
    id: "CUS-206",
    name: "Owen Wright",
    email: "owen.wright@example.com",
    city: "Denver",
    orders: 1,
    spent: 25,
    lastOrderAt: "2026-09-17",
    segment: "New",
  },
]

const stockBySlug: Record<string, { stock: number; reserved: number; reorderAt: number }> = {
  "ca-gai-leo": { stock: 86, reserved: 8, reorderAt: 24 },
  "dinh-lang": { stock: 18, reserved: 4, reorderAt: 20 },
  "giao-co-lam": { stock: 41, reserved: 2, reorderAt: 16 },
  "bup-oi": { stock: 33, reserved: 3, reorderAt: 16 },
  "gung-dang-sam": { stock: 12, reserved: 5, reorderAt: 16 },
  "tia-to": { stock: 47, reserved: 1, reorderAt: 16 },
}

export const inventory: InventoryRow[] = products.map((product) => {
  const row = stockBySlug[product.slug] ?? { stock: 24, reserved: 0, reorderAt: 12 }
  const available = row.stock - row.reserved
  const status: InventoryRow["status"] =
    available <= 0 ? "Reorder" : available <= row.reorderAt ? "Low" : "In stock"
  return {
    slug: product.slug,
    name: product.shortName,
    sku: `TDG-${product.index}`,
    stock: row.stock,
    reserved: row.reserved,
    reorderAt: row.reorderAt,
    status,
  }
})

export const revenueByMonth = [
  { month: "Apr", revenue: 1425 },
  { month: "May", revenue: 1875 },
  { month: "Jun", revenue: 2100 },
  { month: "Jul", revenue: 2475 },
  { month: "Aug", revenue: 2725 },
  { month: "Sep", revenue: 3125 },
]

export const channelMix = [
  { channel: "Storefront", share: 62 },
  { channel: "Wholesale", share: 23 },
  { channel: "Tasting events", share: 15 },
]

export function getInventory(slug: string) {
  return inventory.find((row) => row.slug === slug)
}

export function getProductOrders(slug: string) {
  return orders.filter((order) => order.items.some((item) => item.slug === slug))
}

export function boxesSold(slug: string) {
  return orders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => {
      const item = order.items.find((entry) => entry.slug === slug)
      return sum + (item?.quantity ?? 0)
    }, 0)
}

export function openOrderCount() {
  return orders.filter((order) => order.status === "pending" || order.status === "processing").length
}

export function monthRevenue() {
  return revenueByMonth[revenueByMonth.length - 1]?.revenue ?? 0
}

export function lowStockCount() {
  return inventory.filter((row) => row.status !== "In stock").length
}

export function mediaLibrary(): MediaAsset[] {
  const productAssets: MediaAsset[] = products.flatMap((product) => [
    { src: product.image, label: `${product.shortName} packshot`, kind: "Packshot", product: product.shortName },
    { src: product.lifestyleImage, label: `${product.shortName} lifestyle`, kind: "Lifestyle", product: product.shortName },
    { src: product.detailImage, label: `${product.shortName} detail`, kind: "Detail", product: product.shortName },
    { src: product.benefitsImage, label: `${product.shortName} benefits`, kind: "Benefits", product: product.shortName },
  ])

  const blogAssets: MediaAsset[] = posts.map((post) => ({
    src: post.cover,
    label: post.title,
    kind: "Blog",
  }))

  const origins: MediaAsset[] = [
    { src: "/images/origins/farmer.jpg", label: "Highland harvest", kind: "Origin" },
    { src: "/images/origins/cup.jpg", label: "Still-life cup", kind: "Origin" },
  ]

  return [...productAssets, ...blogAssets, ...origins]
}

export function statusLabel(status: OrderStatus) {
  return status[0].toUpperCase() + status.slice(1)
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

export function contentRows(): Array<BlogPost & { words: number }> {
  return posts.map((post) => ({
    ...post,
    words: post.blocks.reduce((count, block) => {
      if (block.type === "p" || block.type === "h2" || block.type === "h3" || block.type === "note") {
        return count + block.text.split(/\s+/).length
      }
      if (block.type === "ul") {
        return count + block.items.join(" ").split(/\s+/).length
      }
      return count
    }, 0),
  }))
}
