"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { StoreSettings } from "@/lib/server/types"
import { adminFetch, AdminApiError } from "@/lib/admin-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function AdminSettingsPanel({
  settings,
  skuCount,
  postCount,
}: {
  settings: StoreSettings
  skuCount: number
  postCount: number
}) {
  const router = useRouter()
  const [form, setForm] = useState(settings)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  async function save() {
    setSaving(true)
    setError("")
    try {
      await adminFetch("/api/admin/settings", {
        method: "PATCH",
        body: JSON.stringify({
          brand: form.brand,
          market: form.market,
          currency: form.currency,
          unitPrice: Number(form.unitPrice),
          unitLabel: form.unitLabel,
          contactEmail: form.contactEmail,
        }),
      })
      router.refresh()
    } catch (caught) {
      setError(caught instanceof AdminApiError ? caught.message : "Could not save")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Store identity used on invoices and checkout.
          </p>
        </div>
        <Button size="sm" onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </Button>
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Store</CardTitle>
            <CardDescription>Public shop identity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Brand</Label>
              <Input value={form.brand} onChange={(event) => setForm({ ...form, brand: event.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Market</Label>
              <Input value={form.market} onChange={(event) => setForm({ ...form, market: event.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Contact email</Label>
              <Input
                type="email"
                value={form.contactEmail}
                onChange={(event) => setForm({ ...form, contactEmail: event.target.value })}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{skuCount} SKUs</Badge>
              <Badge variant="secondary">{postCount} journal posts</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
            <CardDescription>Fallback unit price when a SKU has no numeric price</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Currency</Label>
              <Input value={form.currency} onChange={(event) => setForm({ ...form, currency: event.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Default box price</Label>
              <Input
                type="number"
                value={form.unitPrice}
                onChange={(event) => setForm({ ...form, unitPrice: Number(event.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Unit label</Label>
              <Input
                value={form.unitLabel}
                onChange={(event) => setForm({ ...form, unitLabel: event.target.value })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
