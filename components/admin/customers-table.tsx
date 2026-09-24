"use client"

import { customers, formatUsd } from "@/lib/admin"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function AdminCustomersTable() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Customers</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Seed list for tasting inquiries and returning US buyers.
        </p>
      </div>
      <div className="overflow-hidden rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Customer</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Segment</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Last order</TableHead>
              <TableHead className="pr-4 text-right">Spent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="pl-4">
                  <div className="font-medium">{customer.name}</div>
                  <div className="text-xs text-muted-foreground">{customer.email}</div>
                </TableCell>
                <TableCell>{customer.city}</TableCell>
                <TableCell>
                  <Badge variant={customer.segment === "VIP" ? "default" : "secondary"}>
                    {customer.segment}
                  </Badge>
                </TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell>{customer.lastOrderAt}</TableCell>
                <TableCell className="pr-4 text-right">{formatUsd(customer.spent)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
