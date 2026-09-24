"use client"

import Link from "next/link"
import {
  ArrowUpRight,
  Box,
  FileText,
  Package,
  ShoppingCart,
  Users2,
  Warehouse,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { products } from "@/lib/catalog"
import { posts } from "@/lib/blog"
import {
  channelMix,
  customers,
  formatUsd,
  inventory,
  lowStockCount,
  monthRevenue,
  openOrderCount,
  orders,
  revenueByMonth,
} from "@/lib/admin"
import { StatusBadge } from "@/components/admin/status-badge"

const maxRevenue = Math.max(...revenueByMonth.map((row) => row.revenue))

export function AdminDashboard() {
  const stats = [
    {
      label: "September GMV",
      value: formatUsd(monthRevenue()),
      hint: "+15% vs August",
      icon: ShoppingCart,
    },
    {
      label: "Open orders",
      value: String(openOrderCount()),
      hint: "Pending + processing",
      icon: Box,
    },
    {
      label: "Catalog SKUs",
      value: String(products.length),
      hint: `${lowStockCount()} need reorder`,
      icon: Package,
    },
    {
      label: "Customers",
      value: String(customers.length),
      hint: `${customers.filter((c) => c.segment === "VIP").length} VIP`,
      icon: Users2,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">TDG Tea operations</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Live catalog from the storefront, demo orders for the US shop.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/products">Manage products</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/admin/orders">View orders</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="gap-3 py-4">
              <CardHeader className="px-4">
                <div className="flex items-center justify-between">
                  <CardDescription>{stat.label}</CardDescription>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent className="px-4 text-xs text-muted-foreground">{stat.hint}</CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Demo GMV by month · $25 / box</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-end gap-3">
              {revenueByMonth.map((row) => (
                <div key={row.month} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-md bg-primary/80"
                    style={{ height: `${Math.max(12, (row.revenue / maxRevenue) * 100)}%` }}
                    title={formatUsd(row.revenue)}
                  />
                  <span className="text-[11px] text-muted-foreground">{row.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Channels</CardTitle>
            <CardDescription>Where boxes are moving</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {channelMix.map((row) => (
              <div key={row.channel}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{row.channel}</span>
                  <span className="text-muted-foreground">{row.share}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full bg-primary" style={{ width: `${row.share}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Recent orders</CardTitle>
              <CardDescription>Latest US storefront checkouts</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/orders">
                All orders <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-6 text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.slice(0, 5).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="pl-6 font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>{order.customer}</div>
                      <div className="text-xs text-muted-foreground">{order.city}</div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="pr-6 text-right">{formatUsd(order.total)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
            <CardDescription>Boxes on hand vs reserved</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {inventory.map((row) => (
              <div key={row.slug} className="flex items-center justify-between text-sm">
                <div className="min-w-0">
                  <p className="truncate font-medium">{row.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {row.sku} · {row.reserved} reserved
                  </p>
                </div>
                <span
                  className={
                    row.status === "In stock"
                      ? "text-emerald-700"
                      : row.status === "Low"
                        ? "text-amber-700"
                        : "text-rose-700"
                  }
                >
                  {row.stock}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Catalog</CardTitle>
              <CardDescription>Six live SKUs on the storefront</CardDescription>
            </div>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/admin/products/${product.slug}`}
                className="overflow-hidden rounded-lg border bg-background transition-colors hover:border-primary"
              >
                <div className="aspect-[4/5] bg-white">
                  <img
                    src={product.image}
                    alt={product.shortName}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="p-2">
                  <p className="truncate text-xs font-medium">{product.shortName}</p>
                  <p className="text-[11px] text-muted-foreground">{product.price}</p>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Journal</CardTitle>
              <CardDescription>Editorial posts already on /blog</CardDescription>
            </div>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href="/admin/content"
                className="flex gap-3 rounded-lg border p-2 hover:bg-accent"
              >
                <img
                  src={post.cover}
                  alt=""
                  className="h-14 w-20 rounded-md object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{post.title}</p>
                  <p className="text-xs text-muted-foreground">{post.label}</p>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
