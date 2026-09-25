"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import type { Order, OrderStatus } from "@/lib/server/types"
import { formatUsd } from "@/lib/admin-view"
import { adminFetch, AdminApiError } from "@/lib/admin-client"
import { StatusBadge } from "@/components/admin/status-badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const filters: Array<{ id: "all" | OrderStatus; label: string }> = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
]

const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  pending: "processing",
  processing: "shipped",
  shipped: "delivered",
}

export function AdminOrdersTable({ orders }: { orders: Order[] }) {
  const router = useRouter()
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState<string | null>(null)
  const rows = useMemo(
    () => (filter === "all" ? orders : orders.filter((order) => order.status === filter)),
    [filter, orders],
  )

  async function setStatus(id: string, status: OrderStatus) {
    setBusy(id)
    setError("")
    try {
      await adminFetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      })
      router.refresh()
    } catch (caught) {
      setError(caught instanceof AdminApiError ? caught.message : "Could not update order")
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Created by the storefront checkout. Cancelling a pending order restores stock.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <Button
            key={item.id}
            size="sm"
            variant={filter === item.id ? "default" : "outline"}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="overflow-hidden rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Placed</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="pr-4 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-sm text-muted-foreground">
                  No orders in this view.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((order) => {
                const advance = nextStatus[order.status]
                return (
                  <TableRow key={order.id}>
                    <TableCell className="pl-4 font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>{order.customer}</div>
                      <div className="text-xs text-muted-foreground">
                        {order.email} · {order.city}
                      </div>
                      {order.address ? (
                        <details className="mt-1 text-xs text-muted-foreground">
                          <summary className="cursor-pointer">Ship to</summary>
                          <div className="mt-1 space-y-0.5">
                            <div>{order.address.line1}</div>
                            {order.address.line2 ? <div>{order.address.line2}</div> : null}
                            <div>
                              {order.address.city}, {order.address.state} {order.address.postalCode}
                            </div>
                            <div>{order.address.country}</div>
                            {order.address.phone ? <div>{order.address.phone}</div> : null}
                          </div>
                        </details>
                      ) : null}
                    </TableCell>
                    <TableCell className="max-w-xs text-sm text-muted-foreground">
                      {order.items.map((item) => `${item.quantity}× ${item.name}`).join(", ")}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell>{order.placedAt}</TableCell>
                    <TableCell className="text-right">{formatUsd(order.total)}</TableCell>
                    <TableCell className="pr-4 text-right">
                      <div className="flex justify-end gap-2">
                        {advance ? (
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={busy === order.id}
                            onClick={() => setStatus(order.id, advance)}
                          >
                            Mark {advance}
                          </Button>
                        ) : null}
                        {order.status === "pending" || order.status === "processing" ? (
                          <Button
                            size="sm"
                            variant="ghost"
                            disabled={busy === order.id}
                            onClick={() => setStatus(order.id, "cancelled")}
                          >
                            Cancel
                          </Button>
                        ) : null}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
