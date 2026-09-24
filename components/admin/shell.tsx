"use client"

import { useEffect, useState, type ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminTopNav } from "@/components/admin/top-nav"
import { ADMIN_SESSION_KEY } from "@/lib/admin"

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const isLogin = pathname === "/admin/login" || pathname === "/admin/login/"

  useEffect(() => {
    const authed = window.localStorage.getItem(ADMIN_SESSION_KEY) === "1"
    if (!authed && !isLogin) {
      router.replace("/admin/login")
      return
    }
    if (authed && isLogin) {
      router.replace("/admin")
      return
    }
    setReady(true)
  }, [isLogin, router])

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Loading console…
      </div>
    )
  }

  if (isLogin) {
    return <>{children}</>
  }

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
