"use client"

import { FormEvent, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AdminApiError, adminFetch } from "@/lib/admin-client"

export function AdminLoginForm() {
  const router = useRouter()
  const search = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError("")
    try {
      await adminFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })
      const next = search.get("next") || "/admin"
      router.replace(next.startsWith("/admin") ? next : "/admin")
      router.refresh()
    } catch (caught) {
      setError(caught instanceof AdminApiError ? caught.message : "Could not sign in")
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-zinc-950 text-zinc-50 lg:flex">
        <img
          src="/images/origins/farmer.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="relative z-10 flex flex-col justify-between p-12">
          <div className="flex items-center gap-3">
            <img src="/brand/logo-mark.png?v=2" alt="" className="h-10 w-10 rounded-md bg-white p-1" />
            <div>
              <p className="text-sm font-semibold tracking-[0.2em]">TDG TEA</p>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-300">Admin console</p>
            </div>
          </div>
          <div className="max-w-md">
            <h1 className="text-4xl font-semibold leading-tight">
              Operations for a six-blend herbal shop.
            </h1>
            <p className="mt-4 text-zinc-300">
              Catalog, orders, journal and media — signed in with an HTTP-only session cookie.
            </p>
          </div>
          <p className="text-xs text-zinc-400">Vietnamese herbs · US storefront</p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-background px-6 py-16">
        <form onSubmit={onSubmit} className="w-full max-w-sm space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">TDG Tea</p>
            <h2 className="mt-2 text-2xl font-semibold">Sign in to admin</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Use the operator credentials configured on the server.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                className="pl-9"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="px-9"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in…" : "Enter console"}
          </Button>
        </form>
      </div>
    </div>
  )
}
