"use client"

import { useMemo, useState } from "react"
import { mediaLibrary, type MediaAsset } from "@/lib/admin"
import { Button } from "@/components/ui/button"

const kinds: Array<MediaAsset["kind"] | "All"> = [
  "All",
  "Packshot",
  "Lifestyle",
  "Detail",
  "Benefits",
  "Blog",
  "Origin",
]

export function AdminMediaGrid() {
  const [kind, setKind] = useState<(typeof kinds)[number]>("All")
  const assets = useMemo(
    () => (kind === "All" ? mediaLibrary() : mediaLibrary().filter((asset) => asset.kind === kind)),
    [kind],
  )

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Media</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Files already shipped in <code>public/images</code>. No upload API on static export.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {kinds.map((item) => (
          <Button
            key={item}
            size="sm"
            variant={kind === item ? "default" : "outline"}
            onClick={() => setKind(item)}
          >
            {item}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {assets.map((asset) => (
          <figure key={`${asset.kind}-${asset.src}`} className="overflow-hidden rounded-xl border bg-card">
            <div className="aspect-[4/5] bg-white">
              <img src={asset.src} alt="" className="h-full w-full object-cover" />
            </div>
            <figcaption className="space-y-0.5 p-3">
              <p className="truncate text-sm font-medium">{asset.label}</p>
              <p className="text-xs text-muted-foreground">
                {asset.kind}
                {asset.product ? ` · ${asset.product}` : ""}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
