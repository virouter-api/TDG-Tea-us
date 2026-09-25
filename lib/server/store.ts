import { mkdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { DatabaseSync } from "node:sqlite"
import { products as catalogProducts } from "@/lib/catalog"
import { legacyMediaAssets, seedSnapshot } from "@/lib/server/seed"
import {
  ORDER_STATUSES,
  type CheckoutInput,
  type Customer,
  type MediaAsset,
  type Order,
  type OrderStatus,
  type ProductPatch,
  type StoreSettings,
  type StoreSnapshot,
  type TastingRequest,
  type TastingRequestInput,
} from "@/lib/server/types"
import type { BlogPost } from "@/lib/blog"
import type { Product } from "@/lib/catalog"

export type StoreOptions = {
  dataDir: string
}

function nextOrderId(orders: Order[]) {
  const numbers = orders
    .map((order) => Number.parseInt(order.id.replace(/^TDG-/, ""), 10))
    .filter((value) => Number.isFinite(value))
  const next = Math.max(1000, ...numbers) + 1
  return `TDG-${next}`
}

function nextCustomerId(customers: Customer[]) {
  const numbers = customers
    .map((customer) => Number.parseInt(customer.id.replace(/^CUS-/, ""), 10))
    .filter((value) => Number.isFinite(value))
  const next = Math.max(200, ...numbers) + 1
  return `CUS-${next}`
}

function segmentFor(orders: number, spent: number): Customer["segment"] {
  if (spent >= 250 || orders >= 5) return "VIP"
  if (orders >= 2) return "Returning"
  return "New"
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

function unitPrice(snapshot: StoreSnapshot, product: Product) {
  const numeric = Number.parseFloat(product.price.replace(/[^0-9.]/g, ""))
  if (Number.isFinite(numeric) && numeric > 0) return numeric
  return snapshot.settings.unitPrice
}

export class StoreError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "StoreError"
  }
}

export function createStore(options: StoreOptions) {
  mkdirSync(options.dataDir, { recursive: true })
  const databasePath = join(options.dataDir, "tdg.sqlite")
  const legacyFile = join(options.dataDir, "store.json")
  const db = new DatabaseSync(databasePath)
  db.exec("PRAGMA journal_mode = WAL; PRAGMA synchronous = FULL; PRAGMA busy_timeout = 5000;")
  db.exec("CREATE TABLE IF NOT EXISTS store_snapshot (id INTEGER PRIMARY KEY CHECK (id = 1), payload TEXT NOT NULL, updated_at TEXT NOT NULL)")
  const selectSnapshot = db.prepare("SELECT payload FROM store_snapshot WHERE id = 1")
  const saveSnapshot = db.prepare("INSERT INTO store_snapshot (id, payload, updated_at) VALUES (1, ?, ?) ON CONFLICT(id) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at")
  let queue: Promise<unknown> = Promise.resolve()

  function withLock<T>(fn: () => T | Promise<T>): Promise<T> {
    const run = queue.then(fn, fn)
    queue = run.then(() => undefined, () => undefined)
    return run
  }

  function readFile(): StoreSnapshot {
    const row = selectSnapshot.get() as { payload: string } | undefined
    if (row) {
      const parsed = JSON.parse(row.payload) as StoreSnapshot
      let changed = false
      for (const product of parsed.products) {
        if (!Array.isArray(product.tastingNotes)) {
          const catalogProduct = catalogProducts.find((item) => item.slug === product.slug)
          product.tastingNotes = catalogProduct?.tastingNotes ?? []
          changed = true
        }
      }
      if (!Array.isArray(parsed.mediaAssets)) {
        parsed.mediaAssets = legacyMediaAssets(parsed.products, parsed.posts)
        changed = true
      }
      if (!Array.isArray(parsed.tastingRequests)) {
        parsed.tastingRequests = []
        changed = true
      }
      if (changed) saveSnapshot.run(JSON.stringify(parsed), new Date().toISOString())
      return parsed
    }
    let seeded = seedSnapshot()
    try {
      const legacy = readFileSync(legacyFile, "utf8")
      seeded = JSON.parse(legacy) as StoreSnapshot
    } catch {
      // No legacy JSON snapshot; seed from the checked-in catalog.
    }
    for (const product of seeded.products) {
      if (!Array.isArray(product.tastingNotes)) {
        const catalogProduct = catalogProducts.find((item) => item.slug === product.slug)
        product.tastingNotes = catalogProduct?.tastingNotes ?? []
      }
    }
    if (!Array.isArray(seeded.mediaAssets)) {
      seeded.mediaAssets = legacyMediaAssets(seeded.products, seeded.posts)
    }
    if (!Array.isArray(seeded.tastingRequests)) {
      seeded.tastingRequests = []
    }
    saveSnapshot.run(JSON.stringify(seeded), new Date().toISOString())
    return seeded
  }

  function mutate<T>(fn: (snapshot: StoreSnapshot) => T): Promise<T> {
    return withLock(() => {
      db.exec("BEGIN IMMEDIATE")
      try {
        const snapshot = readFile()
        const result = fn(snapshot)
        saveSnapshot.run(JSON.stringify(snapshot), new Date().toISOString())
        db.exec("COMMIT")
        return result
      } catch (error) {
        db.exec("ROLLBACK")
        throw error
      }
    })
  }

  return {
    read(): Promise<StoreSnapshot> {
      return withLock(() => readFile())
    },

    updateProduct(slug: string, patch: ProductPatch): Promise<Product> {
      return mutate((snapshot) => {
        const product = snapshot.products.find((item) => item.slug === slug)
        if (!product) throw new StoreError(`Unknown product: ${slug}`)
        const { inventory, slug: nextSlug, ...fields } = patch
        Object.assign(product, fields)
        if (nextSlug && nextSlug !== slug) {
          throw new StoreError("Changing slug is not supported")
        }
        if (inventory) {
          const row = snapshot.inventory.find((item) => item.slug === slug)
          if (row) Object.assign(row, inventory)
        }
        return structuredClone(product)
      })
    },

    createProduct(product: Product, inventory?: { stock: number; reserved?: number; reorderAt?: number }) {
      return mutate((snapshot) => {
        if (snapshot.products.some((item) => item.slug === product.slug)) {
          throw new StoreError(`Product already exists: ${product.slug}`)
        }
        snapshot.products.push(structuredClone(product))
        snapshot.inventory.push({
          slug: product.slug,
          stock: inventory?.stock ?? 24,
          reserved: inventory?.reserved ?? 0,
          reorderAt: inventory?.reorderAt ?? 12,
        })
        return structuredClone(product)
      })
    },

    checkout(input: CheckoutInput): Promise<Order> {
      return mutate((snapshot) => {
        const name = input.customer?.trim()
        const email = input.email?.trim().toLowerCase()
        const city = input.city?.trim()
        if (!name || !email || !city) throw new StoreError("Customer name, email and city are required")
        if (!input.line1?.trim()) throw new StoreError("Street address is required")
        if (!input.postalCode?.trim()) throw new StoreError("Postal code is required")
        if (!input.items?.length) throw new StoreError("Cart is empty")

        const lines = input.items.map((item) => {
          const quantity = Math.floor(item.quantity)
          if (!Number.isFinite(quantity) || quantity < 1) {
            throw new StoreError("Quantity must be at least 1")
          }
          const product = snapshot.products.find((entry) => entry.slug === item.slug)
          if (!product) throw new StoreError(`Unknown product: ${item.slug}`)
          const stock = snapshot.inventory.find((entry) => entry.slug === item.slug)
          if (!stock || stock.stock < quantity) {
            throw new StoreError(`Insufficient stock for ${product.shortName}`)
          }
          return {
            product,
            stock,
            quantity,
            unitPrice: unitPrice(snapshot, product),
          }
        })

        let total = 0
        const orderItems = lines.map((line) => {
          line.stock.stock -= line.quantity
          total += line.unitPrice * line.quantity
          return {
            slug: line.product.slug,
            name: line.product.shortName,
            quantity: line.quantity,
            unitPrice: line.unitPrice,
          }
        })

        const order: Order = {
          id: nextOrderId(snapshot.orders),
          customer: name,
          email,
          phone: input.phone?.trim() || undefined,
          city,
          address: {
            fullName: name,
            email,
            phone: input.phone?.trim() || "",
            line1: input.line1?.trim() || "",
            line2: input.line2?.trim() || undefined,
            city,
            state: input.state?.trim() || "",
            postalCode: input.postalCode?.trim() || "",
            country: input.country?.trim() || "United States",
            notes: input.notes?.trim() || undefined,
          },
          status: "pending",
          placedAt: today(),
          total,
          items: orderItems,
          notes: input.notes?.trim() || undefined,
        }
        snapshot.orders.unshift(order)

        const existing = snapshot.customers.find((customer) => customer.email === email)
        if (existing) {
          existing.orders += 1
          existing.spent += total
          existing.lastOrderAt = order.placedAt
          existing.city = city
          existing.name = name
          existing.segment = segmentFor(existing.orders, existing.spent)
        } else {
          snapshot.customers.unshift({
            id: nextCustomerId(snapshot.customers),
            name,
            email,
            city,
            orders: 1,
            spent: total,
            lastOrderAt: order.placedAt,
            segment: "New",
          })
        }

        return structuredClone(order)
      })
    },

    updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
      if (!ORDER_STATUSES.includes(status)) {
        return Promise.reject(new StoreError(`Invalid status: ${status}`))
      }
      return mutate((snapshot) => {
        const order = snapshot.orders.find((item) => item.id === id)
        if (!order) throw new StoreError(`Unknown order: ${id}`)
        if (order.status === status) return structuredClone(order)

        if (
          status === "cancelled" &&
          (order.status === "pending" || order.status === "processing")
        ) {
          for (const item of order.items) {
            const row = snapshot.inventory.find((entry) => entry.slug === item.slug)
            if (row) row.stock += item.quantity
          }
          const customer = snapshot.customers.find((entry) => entry.email === order.email)
          if (customer) {
            customer.spent = Math.max(0, customer.spent - order.total)
            customer.orders = Math.max(0, customer.orders - 1)
            customer.segment = segmentFor(customer.orders, customer.spent)
          }
        }

        if (order.status === "cancelled" && status !== "cancelled") {
          throw new StoreError("Cancelled orders cannot be reopened")
        }

        order.status = status
        return structuredClone(order)
      })
    },

    upsertPost(post: BlogPost): Promise<BlogPost> {
      return mutate((snapshot) => {
        if (!post.slug?.trim()) throw new StoreError("Post slug is required")
        const index = snapshot.posts.findIndex((item) => item.slug === post.slug)
        const copy = structuredClone(post)
        if (index === -1) snapshot.posts.push(copy)
        else snapshot.posts[index] = copy
        return structuredClone(copy)
      })
    },

    deletePost(slug: string): Promise<void> {
      return mutate((snapshot) => {
        const index = snapshot.posts.findIndex((item) => item.slug === slug)
        if (index === -1) throw new StoreError(`Unknown post: ${slug}`)
        snapshot.posts.splice(index, 1)
      })
    },

    createMedia(asset: MediaAsset): Promise<MediaAsset> {
      return mutate((snapshot) => {
        if (snapshot.mediaAssets.some((item) => item.id === asset.id)) {
          throw new StoreError(`Media already exists: ${asset.id}`)
        }
        snapshot.mediaAssets.unshift(structuredClone(asset))
        return structuredClone(asset)
      })
    },

    deleteMedia(id: string): Promise<MediaAsset> {
      return mutate((snapshot) => {
        const index = snapshot.mediaAssets.findIndex((item) => item.id === id)
        if (index === -1) throw new StoreError(`Unknown media: ${id}`)
        const asset = snapshot.mediaAssets[index]
        if (asset.source === "legacy") {
          throw new StoreError("Legacy media cannot be deleted")
        }
        const referenced = JSON.stringify({ products: snapshot.products, posts: snapshot.posts }).includes(asset.url)
        if (referenced) throw new StoreError("Media is still assigned to a product or journal post")
        snapshot.mediaAssets.splice(index, 1)
        return structuredClone(asset)
      })
    },

    createTastingRequest(input: TastingRequestInput): Promise<TastingRequest> {
      return mutate((snapshot) => {
        const name = input.name?.trim()
        const email = input.email?.trim().toLowerCase()
        const note = input.note?.trim() || undefined
        if (!name) throw new StoreError("Full name is required")
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          throw new StoreError("A valid email is required")
        }
        if (note && note.length > 1000) throw new StoreError("Message is too long")
        const tastingRequest: TastingRequest = {
          id: `TST-${Date.now().toString(36).toUpperCase()}`,
          name,
          email,
          note,
          status: "new",
          createdAt: new Date().toISOString(),
        }
        snapshot.tastingRequests.unshift(tastingRequest)
        return structuredClone(tastingRequest)
      })
    },

    updateSettings(patch: Partial<StoreSettings>): Promise<StoreSettings> {
      return mutate((snapshot) => {
        Object.assign(snapshot.settings, patch)
        return { ...snapshot.settings }
      })
    },
  }
}

export type Store = ReturnType<typeof createStore>

let singleton: Store | null = null

export function getStore() {
  if (!singleton) {
    const dataDir = process.env.TDG_DATA_DIR || join(process.cwd(), "data")
    singleton = createStore({ dataDir })
  }
  return singleton
}

export function resetStoreForTests() {
  singleton = null
}

export function catalogFallback() {
  return catalogProducts
}
