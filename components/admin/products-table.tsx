"use client"

import Link from "next/link"
import type { Product } from "@/lib/catalog"
import type { InventoryRow, Order } from "@/lib/server/types"
import { boxesSold, inventoryStatus, productSku, stockTone } from "@/lib/admin-view"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function AdminProductsTable({
  products,
  inventory,
  orders,
}: {
  products: Product[]
  inventory: InventoryRow[]
  orders: Order[]
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Edits persist to the server store and render on the live storefront.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Blend</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Sold</TableHead>
              <TableHead className="pr-4 text-right"> </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const stock = inventory.find((row) => row.slug === product.slug)
              return (
                <TableRow key={product.slug}>
                  <TableCell className="pl-4">
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-11 overflow-hidden rounded-md border bg-white">
                        <img src={product.image} alt="" className="h-full w-full object-contain" />
                      </div>
                      <div>
                        <p className="font-medium">{product.shortName}</p>
                        <p className="text-xs text-muted-foreground">{product.nameAscii}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{productSku(product)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.label}</Badge>
                  </TableCell>
                  <TableCell>
                    {product.price} <span className="text-muted-foreground">/ {product.unit}</span>
                  </TableCell>
                  <TableCell>
                    <span className={stockTone(stock)}>{stock?.stock ?? "—"}</span>
                    <span className="ml-1 text-xs text-muted-foreground">
                      {stock ? inventoryStatus(stock) : ""}
                    </span>
                  </TableCell>
                  <TableCell>{boxesSold(orders, product.slug)}</TableCell>
                  <TableCell className="pr-4 text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/products/${product.slug}`}>Edit</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
