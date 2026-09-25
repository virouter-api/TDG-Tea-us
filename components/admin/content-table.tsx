"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { BlogPost } from "@/lib/blog"
import { adminFetch, AdminApiError } from "@/lib/admin-client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function wordCount(post: BlogPost) {
  return post.blocks.reduce((count, block) => {
    if (block.type === "p" || block.type === "h2" || block.type === "h3" || block.type === "note") {
      return count + block.text.split(/\s+/).length
    }
    if (block.type === "ul") return count + block.items.join(" ").split(/\s+/).length
    return count
  }, 0)
}

export function AdminContentTable({ posts }: { posts: BlogPost[] }) {
  const router = useRouter()
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    slug: "",
    title: "",
    lede: "",
    cover: "/images/blog/caring-for-your-liver/cover.webp",
    body: "",
  })

  async function createPost() {
    setSaving(true)
    setError("")
    try {
      const slug = form.slug.trim()
      if (!slug || !form.title.trim()) throw new AdminApiError("Slug and title are required", 400)
      await adminFetch("/api/admin/posts", {
        method: "POST",
        body: JSON.stringify({
          slug,
          index: String(posts.length + 1).padStart(2, "0"),
          label: `Article ${String(posts.length + 1).padStart(2, "0")} · Journal`,
          title: form.title.trim(),
          lede: form.lede.trim(),
          cover: form.cover.trim(),
          coverAlt: form.title.trim(),
          blocks: form.body
            .split(/\n\n+/)
            .map((text) => text.trim())
            .filter(Boolean)
            .map((text) => ({ type: "p", text })),
        }),
      })
      setForm({ slug: "", title: "", lede: "", cover: form.cover, body: "" })
      router.refresh()
    } catch (caught) {
      setError(caught instanceof AdminApiError ? caught.message : "Could not publish")
    } finally {
      setSaving(false)
    }
  }

  async function remove(slug: string) {
    setError("")
    try {
      await adminFetch(`/api/admin/posts/${slug}`, { method: "DELETE" })
      router.refresh()
    } catch (caught) {
      setError(caught instanceof AdminApiError ? caught.message : "Could not delete")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Journal</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Posts published here appear on the public /blog pages.
        </p>
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}

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
            {posts.map((post) => (
              <TableRow key={post.slug}>
                <TableCell className="pl-4">
                  <img src={post.cover} alt="" className="h-12 w-20 rounded-md object-cover" />
                </TableCell>
                <TableCell>
                  <p className="font-medium">{post.title}</p>
                  <p className="max-w-md truncate text-xs text-muted-foreground">{post.lede}</p>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{post.label}</Badge>
                </TableCell>
                <TableCell>{wordCount(post)}</TableCell>
                <TableCell className="pr-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        View
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => remove(post.slug)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New article</CardTitle>
          <CardDescription>Paragraphs are split on blank lines.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Slug</Label>
            <Input value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Lede</Label>
            <Input value={form.lede} onChange={(event) => setForm({ ...form, lede: event.target.value })} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Cover path</Label>
            <Input value={form.cover} onChange={(event) => setForm({ ...form, cover: event.target.value })} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Body</Label>
            <Textarea rows={8} value={form.body} onChange={(event) => setForm({ ...form, body: event.target.value })} />
          </div>
          <div>
            <Button onClick={createPost} disabled={saving}>
              {saving ? "Publishing…" : "Publish"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
