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
import { StatusBadge } from "@/components/admin/status-badge"
import { formatUsd, stockTone } from "@/lib/admin-view"
import { inventoryStatus, monthRevenue, openOrders } from "@/lib/server/catalog"
import type { StoreSnapshot } from "@/lib/server/types"

export function AdminDashboard({ snapshot }: { snapshot: StoreSnapshot }) {
  const revenue = monthRevenue(snapshot.orders)
  const open = openOrders(snapshot.orders)
  const lowStock = snapshot.inventory.filter((row) => inventoryStatus(row) !== "In stock").length
  const months = lastSixMonths(snapshot)

  const stats = [
    { label: "This month GMV", value: formatUsd(revenue), hint: "Paid + pending, excluding cancelled", icon: ShoppingCart },
    { label: "Open orders", value: String(open.length), hint: "Pending + processing", icon: Box },
    { label: "Catalog SKUs", value: String(snapshot.products.length), hint: `${lowStock} need reorder`, icon: Package },
    {
      label: "Customers",
      value: String(snapshot.customers.length),
      hint: `${snapshot.customers.filter((c) => c.segment === "VIP").length} VIP`,
      icon: Users2,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">TDG Tea operations</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Live catalog, inventory and orders from the storefront.
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
            <CardDescription>GMV by month from recorded orders</CardDescription>
          </CardHeader>
          <CardContent>
            {months.every((row) => row.revenue === 0) ? (
              <p className="text-sm text-muted-foreground">No orders yet this half-year.</p>
            ) : (
              <div className="flex h-48 items-end gap-3">
                {months.map((row) => (
                  <div key={row.month} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-md bg-primary/80"
                      style={{
                        height: `${Math.max(8, (row.revenue / Math.max(...months.map((item) => item.revenue), 1)) * 100)}%`,
                      }}
                      title={formatUsd(row.revenue)}
                    />
                    <span className="text-[11px] text-muted-foreground">{row.month}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
            <CardDescription>Boxes on hand vs reserved</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {snapshot.inventory.map((row) => {
              const product = snapshot.products.find((item) => item.slug === row.slug)
              return (
                <div key={row.slug} className="flex items-center justify-between text-sm">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{product?.shortName ?? row.slug}</p>
                    <p className="text-xs text-muted-foreground">
                      {inventoryStatus(row)} · {row.reserved} reserved
                    </p>
                  </div>
                  <span className={stockTone(row)}>{row.stock}</span>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Recent orders</CardTitle>
              <CardDescription>Newest checkouts from the US storefront</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/orders">
                All orders <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="px-0">
            {snapshot.orders.length === 0 ? (
              <p className="px-6 text-sm text-muted-foreground">No orders yet.</p>
            ) : (
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
                  {snapshot.orders.slice(0, 6).map((order) => (
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
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Journal</CardTitle>
              <CardDescription>Editorial posts on /blog</CardDescription>
            </div>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-3">
            {snapshot.posts.map((post) => (
              <Link
                key={post.slug}
                href="/admin/content"
                className="flex gap-3 rounded-lg border p-2 hover:bg-accent"
              >
                <img src={post.cover} alt="" className="h-14 w-20 rounded-md object-cover" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{post.title}</p>
                  <p className="text-xs text-muted-foreground">{post.label}</p>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Tasting requests</CardTitle>
            <CardDescription>New visit requests from the storefront</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="#tasting-requests">{snapshot.tastingRequests.length} total</Link>
          </Button>
        </CardHeader>
        <CardContent id="tasting-requests" className="px-0">
          {snapshot.tastingRequests.length === 0 ? (
            <p className="px-6 text-sm text-muted-foreground">No tasting requests yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Guest</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead className="pr-6 text-right">Received</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {snapshot.tastingRequests.slice(0, 6).map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="pl-6 font-medium">{request.name}</TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell className="max-w-sm truncate">{request.note || "—"}</TableCell>
                    <TableCell className="pr-6 text-right text-muted-foreground">
                      {new Date(request.createdAt).toLocaleDateString("en-US")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Catalog</CardTitle>
            <CardDescription>SKUs currently on the storefront</CardDescription>
          </div>
          <Warehouse className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {snapshot.products.map((product) => (
            <Link
              key={product.slug}
              href={`/admin/products/${product.slug}`}
              className="overflow-hidden rounded-lg border bg-background transition-colors hover:border-primary"
            >
              <div className="aspect-[4/5] bg-white">
                <img src={product.image} alt={product.shortName} className="h-full w-full object-contain" />
              </div>
              <div className="p-2">
                <p className="truncate text-xs font-medium">{product.shortName}</p>
                <p className="text-[11px] text-muted-foreground">{product.price}</p>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function lastSixMonths(snapshot: StoreSnapshot) {
  const now = new Date()
  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (5 - index), 1))
    const key = date.toISOString().slice(0, 7)
    const revenue = snapshot.orders
      .filter((order) => order.status !== "cancelled" && order.placedAt.startsWith(key))
      .reduce((sum, order) => sum + order.total, 0)
    return { month: date.toLocaleString("en-US", { month: "short" }), revenue }
  })
}
