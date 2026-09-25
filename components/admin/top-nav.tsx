"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ExternalLink, LogOut, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { AdminSidebar } from "@/components/admin/sidebar"

const titles: Record<string, { title: string; subtitle: string }> = {
  "/admin": { title: "Dashboard", subtitle: "Sales, inventory and catalog at a glance" },
  "/admin/products": { title: "Products", subtitle: "Six TDG herbal blends from the live catalog" },
  "/admin/orders": { title: "Orders", subtitle: "Live fulfillment queue from the storefront" },
  "/admin/customers": { title: "Customers", subtitle: "Tasting list and returning buyers" },
  "/admin/content": { title: "Journal", subtitle: "Editorial posts published on the storefront" },
  "/admin/media": { title: "Media", subtitle: "Packshots, lifestyle, benefits and blog covers" },
  "/admin/settings": { title: "Settings", subtitle: "Storefront, currency and demo auth" },
}

function resolveMeta(pathname: string) {
  if (pathname.startsWith("/admin/products/") && pathname !== "/admin/products") {
    return { title: "Product", subtitle: "Edit copy, price and gallery slots" }
  }
  return titles[pathname.replace(/\/$/, "") || "/admin"] ?? titles["/admin"]
}

export function AdminTopNav() {
  const pathname = usePathname()
  const router = useRouter()
  const meta = resolveMeta(pathname)

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon-sm" className="md:hidden">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Admin navigation</SheetTitle>
          <AdminSidebar />
        </SheetContent>
      </Sheet>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{meta.title}</p>
        <p className="hidden truncate text-xs text-muted-foreground sm:block">{meta.subtitle}</p>
      </div>

      <div className="relative hidden w-64 md:block">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input className="h-8 pl-8 text-sm" placeholder="Search SKUs, orders…" readOnly />
      </div>

      <Button variant="outline" size="sm" asChild>
        <Link href="/" target="_blank">
          <ExternalLink className="h-3.5 w-3.5" />
          Storefront
        </Link>
      </Button>
      <Button variant="ghost" size="sm" onClick={signOut}>
        <LogOut className="h-3.5 w-3.5" />
        Sign out
      </Button>
    </div>
  )
}
