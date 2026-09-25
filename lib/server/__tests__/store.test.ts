import { mkdtempSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import assert from "node:assert/strict"
import { products as seedProducts } from "@/lib/catalog"
import { posts as seedPosts } from "@/lib/blog"
import { createStore } from "@/lib/server/store"

function withStore() {
  const dir = mkdtempSync(join(tmpdir(), "tdg-store-"))
  const store = createStore({ dataDir: dir })
  return {
    store,
    cleanup() {
      rmSync(dir, { recursive: true, force: true })
    },
  }
}

async function testSeedsCatalogAndJournal() {
  const { store, cleanup } = withStore()
  try {
    const snapshot = await store.read()
    assert.equal(snapshot.products.length, seedProducts.length)
    assert.equal(snapshot.posts.length, seedPosts.length)
    assert.equal(snapshot.inventory.length, seedProducts.length)
    assert.ok(snapshot.products.some((p) => p.slug === "ca-gai-leo"))
  } finally {
    cleanup()
  }
}

async function testUpdateProductCopyPersists() {
  const { store, cleanup } = withStore()
  try {
    const updated = await store.updateProduct("ca-gai-leo", {
      price: "$29",
      tagline: "Updated tagline for liver blend.",
    })
    assert.equal(updated.price, "$29")
    assert.equal(updated.tagline, "Updated tagline for liver blend.")
    const again = await store.read()
    const found = again.products.find((p) => p.slug === "ca-gai-leo")
    assert.equal(found?.price, "$29")
    assert.equal(found?.tagline, "Updated tagline for liver blend.")
  } finally {
    cleanup()
  }
}

async function testUnknownProductPatchThrows() {
  const { store, cleanup } = withStore()
  try {
    await assert.rejects(() => store.updateProduct("no-such-tea", { price: "$1" }), /unknown product/i)
  } finally {
    cleanup()
  }
}

async function testCheckoutDecrementsStockAndCreatesCustomer() {
  const { store, cleanup } = withStore()
  try {
    const before = await store.read()
    const stockBefore = before.inventory.find((row) => row.slug === "ca-gai-leo")!.stock
    const order = await store.checkout({
      customer: "Ava Nguyen",
      email: "ava@example.com",
      city: "Los Angeles",
      items: [{ slug: "ca-gai-leo", quantity: 2 }],
    })
    assert.equal(order.status, "pending")
    assert.equal(order.total, 50)
    assert.equal(order.items[0].quantity, 2)
    assert.match(order.id, /^TDG-\d+$/)

    const after = await store.read()
    const stockAfter = after.inventory.find((row) => row.slug === "ca-gai-leo")!.stock
    assert.equal(stockAfter, stockBefore - 2)
    const customer = after.customers.find((c) => c.email === "ava@example.com")
    assert.ok(customer)
    assert.equal(customer?.orders, 1)
    assert.equal(customer?.spent, 50)
    assert.equal(customer?.segment, "New")
  } finally {
    cleanup()
  }
}

async function testCheckoutRejectsWhenStockTooLow() {
  const { store, cleanup } = withStore()
  try {
    await store.updateProduct("tia-to", { inventory: { stock: 1, reserved: 0, reorderAt: 4 } })
    await assert.rejects(
      () =>
        store.checkout({
          customer: "Owen Wright",
          email: "owen@example.com",
          city: "Denver",
          items: [{ slug: "tia-to", quantity: 3 }],
        }),
      /insufficient stock/i,
    )
    const after = await store.read()
    assert.equal(after.orders.length, 0)
    assert.equal(after.inventory.find((row) => row.slug === "tia-to")?.stock, 1)
  } finally {
    cleanup()
  }
}

async function testUpdateOrderStatus() {
  const { store, cleanup } = withStore()
  try {
    const order = await store.checkout({
      customer: "Maya Chen",
      email: "maya@example.com",
      city: "San Francisco",
      items: [{ slug: "dinh-lang", quantity: 1 }],
    })
    const shipped = await store.updateOrderStatus(order.id, "shipped")
    assert.equal(shipped.status, "shipped")

    const pending = await store.checkout({
      customer: "Maya Chen",
      email: "maya@example.com",
      city: "San Francisco",
      items: [{ slug: "dinh-lang", quantity: 1 }],
    })
    const mid = await store.read()
    const stockBeforeCancel = mid.inventory.find((row) => row.slug === "dinh-lang")!.stock
    const cancelled = await store.updateOrderStatus(pending.id, "cancelled")
    assert.equal(cancelled.status, "cancelled")
    const after = await store.read()
    const stock = after.inventory.find((row) => row.slug === "dinh-lang")!
    assert.equal(stock.stock, stockBeforeCancel + 1, "cancelling a pending order restores stock")
    assert.equal(after.orders.find((item) => item.id === shipped.id)?.status, "shipped")
  } finally {
    cleanup()
  }
}

async function testCreateAndUpdateJournalPost() {
  const { store, cleanup } = withStore()
  try {
    const created = await store.upsertPost({
      slug: "morning-ritual",
      index: "03",
      label: "Article 03 · Ritual",
      title: "A quieter morning",
      lede: "How a five-minute steep becomes a daily pause.",
      cover: "/images/blog/caring-for-your-liver/cover.webp",
      coverAlt: "Tea cup",
      blocks: [{ type: "p", text: "Start with boiled water." }],
    })
    assert.equal(created.slug, "morning-ritual")
    const updated = await store.upsertPost({
      ...created,
      title: "A quieter morning, rewritten",
    })
    assert.equal(updated.title, "A quieter morning, rewritten")
    const after = await store.read()
    assert.equal(after.posts.length, seedPosts.length + 1)
  } finally {
    cleanup()
  }
}

async function testSettingsPersist() {
  const { store, cleanup } = withStore()
  try {
    const settings = await store.updateSettings({ unitPrice: 28, contactEmail: "orders@tdgtea.com" })
    assert.equal(settings.unitPrice, 28)
    assert.equal(settings.contactEmail, "orders@tdgtea.com")
    assert.equal(settings.brand, "TDG Tea")
  } finally {
    cleanup()
  }
}

async function testReturningCustomerSegment() {
  const { store, cleanup } = withStore()
  try {
    await store.checkout({
      customer: "James Okafor",
      email: "james@example.com",
      city: "Brooklyn",
      items: [{ slug: "giao-co-lam", quantity: 2 }],
    })
    await store.checkout({
      customer: "James Okafor",
      email: "james@example.com",
      city: "Brooklyn",
      items: [{ slug: "giao-co-lam", quantity: 2 }],
    })
    const after = await store.read()
    const customer = after.customers.find((c) => c.email === "james@example.com")
    assert.equal(customer?.orders, 2)
    assert.equal(customer?.spent, 100)
    assert.equal(customer?.segment, "Returning")
  } finally {
    cleanup()
  }
}

async function run() {
  const cases = [
    testSeedsCatalogAndJournal,
    testUpdateProductCopyPersists,
    testUnknownProductPatchThrows,
    testCheckoutDecrementsStockAndCreatesCustomer,
    testCheckoutRejectsWhenStockTooLow,
    testUpdateOrderStatus,
    testCreateAndUpdateJournalPost,
    testSettingsPersist,
    testReturningCustomerSegment,
  ]
  for (const test of cases) {
    await test()
    process.stdout.write(`ok ${test.name}\n`)
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
