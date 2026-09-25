"use client"

import type { ComponentType } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  FileText,
  Home,
  ImageIcon,
  Package,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"
import { cn } from "@/lib/utils"

type NavItem = {
  href: string
  label: string
  icon: ComponentType<{ className?: string }>
  badge?: string
}

const nav: Array<{ id: string; label: string; items: NavItem[] }> = [
  {
    id: "overview",
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: Home }],
  },
  {
    id: "commerce",
    label: "Commerce",
    items: [
      { href: "/admin/products", label: "Products", icon: Package },
      {
        href: "/admin/orders",
        label: "Orders",
        icon: ShoppingCart,
      },
      { href: "/admin/customers", label: "Customers", icon: Users2 },
    ],
  },
  {
    id: "content",
    label: "Content",
    items: [
      { href: "/admin/content", label: "Journal", icon: FileText },
      { href: "/admin/media", label: "Media", icon: ImageIcon },
    ],
  },
  {
    id: "system",
    label: "System",
    items: [{ href: "/admin/settings", label: "Settings", icon: Settings }],
  },
]

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin" || pathname === "/admin/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center gap-3 border-b border-border px-5">
        <img
          src="/brand/logo-mark.png?v=2"
          alt="TDG Tea"
          className="h-8 w-8 rounded-md object-contain"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-wide">TDG TEA</p>
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Admin
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {nav.map((section) => (
          <div key={section.id} className="mb-5">
            <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {section.label}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const active = isActive(pathname, item.href)
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground/80 hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge ? (
                        <span
                          className={cn(
                            "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                            active
                              ? "bg-primary-foreground/20 text-primary-foreground"
                              : "bg-secondary text-secondary-foreground",
                          )}
                        >
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
        Live operations · catalog + orders
      </div>
    </aside>
  )
}
