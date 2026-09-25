"use client"

import { ADMIN_DEMO_EMAIL, ADMIN_DEMO_PASSWORD } from "@/lib/admin"
import { products as catalog } from "@/lib/catalog"
import { posts } from "@/lib/blog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export function AdminSettingsPanel() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Storefront is still a static export. These values document the current demo, they are not saved.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Store</CardTitle>
            <CardDescription>Public shop identity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Brand</Label>
              <Input defaultValue="TDG Tea" readOnly />
            </div>
            <div className="space-y-2">
              <Label>Market</Label>
              <Input defaultValue="United States · English" readOnly />
            </div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <Input defaultValue="USD · $25 / box" readOnly />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{catalog.length} SKUs</Badge>
              <Badge variant="secondary">{posts.length} journal posts</Badge>
              <Badge variant="secondary">Static export</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Demo auth</CardTitle>
            <CardDescription>localStorage gate for /admin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue={ADMIN_DEMO_EMAIL} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input defaultValue={ADMIN_DEMO_PASSWORD} readOnly />
            </div>
            <p className="text-xs text-muted-foreground">
              Replace with a real session (NextAuth / Cognito) before this console is public. Static
              export cannot keep a server cookie.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
