import type { BlogPost } from "@/lib/blog"
import type { Product } from "@/lib/catalog"

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

export type ShippingAddress = {
  fullName: string
  email: string
  phone: string
  line1: string
  line2?: string
  city: string
  state: string
  postalCode: string
  country: string
  notes?: string
}

export type Order = {
  id: string
  customer: string
  email: string
  phone?: string
  city: string
  address?: ShippingAddress
  status: OrderStatus
  placedAt: string
  total: number
  items: OrderItem[]
  notes?: string
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
  stock: number
  reserved: number
  reorderAt: number
}

export type MediaKind =
  | "Packshot"
  | "Lifestyle"
  | "Detail"
  | "Benefits"
  | "Scene"
  | "Blog"
  | "Origin"
  | "Other"

export type MediaAsset = {
  id: string
  originalName: string
  storedName: string
  url: string
  mimeType: string
  sizeBytes: number
  kind: MediaKind
  label: string
  altText?: string
  productSlug?: string
  source: "legacy" | "upload"
  createdAt: string
}

export type StoreSettings = {
  brand: string
  market: string
  currency: string
  unitPrice: number
  unitLabel: string
  contactEmail: string
}

export type StoreSnapshot = {
  products: Product[]
  posts: BlogPost[]
  orders: Order[]
  customers: Customer[]
  inventory: InventoryRow[]
  settings: StoreSettings
  mediaAssets: MediaAsset[]
}

export type CheckoutInput = {
  customer: string
  email: string
  phone?: string
  city: string
  line1?: string
  line2?: string
  state?: string
  postalCode?: string
  country?: string
  items: Array<{ slug: string; quantity: number }>
  notes?: string
}

export type ProductPatch = Partial<
  Omit<Product, "slug" | "ingredients" | "benefits" | "meta">
> & {
  slug?: string
  ingredients?: Product["ingredients"]
  benefits?: string[]
  meta?: string[]
  inventory?: Partial<InventoryRow>
}

export const DEFAULT_SETTINGS: StoreSettings = {
  brand: "TDG Tea",
  market: "United States · English",
  currency: "USD",
  unitPrice: 25,
  unitLabel: "per box",
  contactEmail: "hello@tdgtea.com",
}

export const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]
