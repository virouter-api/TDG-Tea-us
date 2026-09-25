"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminTopNav } from "@/components/admin/top-nav"

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isLogin = pathname === "/admin/login" || pathname.startsWith("/admin/login/")

  if (isLogin) return <>{children}</>

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="hidden md:block">
        <AdminSidebar />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="h-16 shrink-0 border-b border-border">
          <AdminTopNav />
        </header>
        <main className="min-w-0 flex-1 overflow-auto bg-muted/30 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
