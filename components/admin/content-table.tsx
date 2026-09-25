"use client"

import Link from "next/link"
import { contentRows } from "@/lib/admin"
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

export function AdminContentTable() {
  const rows = contentRows()

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Journal</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Posts already live at <code>/blog</code>, sourced from <code>lib/blog.ts</code>.
        </p>
      </div>
      <div className="overflow-hidden rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Cover</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Label</TableHead>
              <TableHead>Words</TableHead>
              <TableHead className="pr-4 text-right"> </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((post) => (
              <TableRow key={post.slug}>
                <TableCell className="pl-4">
                  <img
                    src={post.cover}
                    alt=""
                    className="h-12 w-20 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell>
                  <p className="font-medium">{post.title}</p>
                  <p className="max-w-md truncate text-xs text-muted-foreground">{post.lede}</p>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{post.label}</Badge>
                </TableCell>
                <TableCell>{post.words}</TableCell>
                <TableCell className="pr-4 text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      View
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
