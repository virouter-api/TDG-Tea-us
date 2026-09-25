import { products } from "@/lib/catalog"
import { posts } from "@/lib/blog"
import {
  DEFAULT_SETTINGS,
  type InventoryRow,
  type MediaAsset,
  type StoreSnapshot,
} from "@/lib/server/types"

export const seedInventory: InventoryRow[] = [
  { slug: "ca-gai-leo", stock: 86, reserved: 8, reorderAt: 24 },
  { slug: "dinh-lang", stock: 18, reserved: 4, reorderAt: 20 },
  { slug: "giao-co-lam", stock: 41, reserved: 2, reorderAt: 16 },
  { slug: "bup-oi", stock: 33, reserved: 3, reorderAt: 16 },
  { slug: "gung-dang-sam", stock: 12, reserved: 5, reorderAt: 16 },
  { slug: "tia-to", stock: 47, reserved: 1, reorderAt: 16 },
]

export function legacyMediaAssets(sourceProducts = products, sourcePosts = posts): MediaAsset[] {
  const assets: MediaAsset[] = []
  const slots = [
    ["image", "Packshot"],
    ["lifestyleImage", "Lifestyle"],
    ["detailImage", "Detail"],
    ["benefitsImage", "Benefits"],
    ["sceneImage", "Scene"],
  ] as const

  for (const product of sourceProducts) {
    for (const [field, kind] of slots) {
      const url = product[field]
      if (!url) continue
      assets.push({
        id: `legacy:product:${product.slug}:${kind.toLowerCase()}`,
        originalName: url.split("/").pop()?.split("?")[0] ?? `${product.slug}-${kind.toLowerCase()}`,
        storedName: "",
        url,
        mimeType: "image/jpeg",
        sizeBytes: 0,
        kind,
        label: `${product.shortName} · ${kind}`,
        altText: product.name,
        productSlug: product.slug,
        source: "legacy",
        createdAt: "2026-01-01T00:00:00.000Z",
      })
    }
  }

  for (const post of sourcePosts) {
    assets.push({
      id: `legacy:blog:${post.slug}:cover`,
      originalName: post.cover.split("/").pop()?.split("?")[0] ?? `${post.slug}-cover`,
      storedName: "",
      url: post.cover,
      mimeType: "image/webp",
      sizeBytes: 0,
      kind: "Blog",
      label: `${post.title} · Cover`,
      altText: post.coverAlt,
      source: "legacy",
      createdAt: "2026-01-01T00:00:00.000Z",
    })
  }

  return assets
}

export function seedSnapshot(): StoreSnapshot {
  const inventory = products.map((product) => {
    const row = seedInventory.find((item) => item.slug === product.slug)
    return (
      row ?? {
        slug: product.slug,
        stock: 24,
        reserved: 0,
        reorderAt: 12,
      }
    )
  })

  return {
    products: structuredClone(products),
    posts: structuredClone(posts),
    orders: [],
    customers: [],
    inventory,
    settings: { ...DEFAULT_SETTINGS },
    mediaAssets: legacyMediaAssets(),
    tastingRequests: [],
  }
}
