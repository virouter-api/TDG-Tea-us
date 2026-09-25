"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { InnerHeader } from "@/components/inner-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { readCart, type CartLine } from "@/lib/cart"
import {
  US_STATES,
  formatUsPhone,
  isValidUsPhone,
  isValidUsZip,
} from "@/lib/us-states"
import type { Product } from "@/lib/catalog"

type CheckoutForm = {
  fullName: string
  email: string
  phone: string
  line1: string
  line2: string
  city: string
  state: string
  postalCode: string
  country: string
  notes: string
}

type CheckoutConsent = {
  terms: boolean
  marketing: boolean
}

const emptyForm: CheckoutForm = {
  fullName: "",
  email: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "United States",
  notes: "",
}

export default function CheckoutPage() {
  const router = useRouter()
  const [lines, setLines] = useState<CartLine[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [form, setForm] = useState<CheckoutForm>(emptyForm)
  const [consent, setConsent] = useState<CheckoutConsent>({ terms: false, marketing: false })
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setLines(readCart())
    fetch("/api/catalog", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload) => setProducts(payload.products ?? []))
  }, [])

  const summary = useMemo(
    () =>
      lines
        .map((line) => ({ line, product: products.find((product) => product.slug === line.slug) }))
        .filter((row) => row.product),
    [lines, products],
  )
  const total = summary.reduce((sum, row) => sum + price(row.product!.price) * row.line.quantity, 0)

  function update<K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (lines.length === 0) {
      setError("Your bag is empty.")
      return
    }
    if (!isValidUsPhone(form.phone)) {
      setError("Please enter a 10-digit US phone number.")
      return
    }
    if (!isValidUsZip(form.postalCode)) {
      setError("Please enter a valid US ZIP code (e.g. 94103 or 94103-1234).")
      return
    }
    if (!form.state) {
      setError("Please select a state.")
      return
    }
    if (!consent.terms) {
      setError("Please accept the Terms of Sale to place your order.")
      return
    }
    setSubmitting(true)
    setError("")
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form.fullName,
          email: form.email,
          phone: form.phone,
          city: form.city,
          line1: form.line1,
          line2: form.line2,
          state: form.state,
          postalCode: form.postalCode,
          country: form.country,
          notes: form.notes,
          items: lines,
        }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || "Checkout failed")
      router.push(`/checkout/success?order=${encodeURIComponent(payload.order.id)}`)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Checkout failed")
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <InnerHeader />
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">TDG Tea</p>
          <h1 className="mt-3 text-4xl font-medium tracking-tight">Checkout</h1>
          <p className="mt-2 text-muted-foreground">
            Manual payment confirmation for the production pilot.
          </p>
        </div>

        {!submitting && summary.length === 0 ? (
          <Card>
            <CardContent className="space-y-4 py-10 text-center">
              <p className="text-muted-foreground">Your bag is empty.</p>
              <Button asChild>
                <Link href="/#collection">Explore the collection</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <form onSubmit={submit} className="space-y-8">
              <fieldset className="space-y-4" disabled={submitting}>
                <legend className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Contact
                </legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full name</Label>
                    <Input
                      id="fullName"
                      required
                      autoComplete="name"
                      value={form.fullName}
                      onChange={(event) => update("fullName", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(event) => update("email", event.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder="(555) 123-4567"
                    value={form.phone}
                    onChange={(event) => update("phone", formatUsPhone(event.target.value))}
                  />
                </div>
              </fieldset>

              <fieldset className="space-y-4" disabled={submitting}>
                <legend className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Shipping address
                </legend>
                <div className="space-y-2">
                  <Label htmlFor="line1">Street address</Label>
                  <Input
                    id="line1"
                    required
                    autoComplete="address-line1"
                    value={form.line1}
                    onChange={(event) => update("line1", event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="line2">Apartment, suite, etc. (optional)</Label>
                  <Input
                    id="line2"
                    autoComplete="address-line2"
                    value={form.line2}
                    onChange={(event) => update("line2", event.target.value)}
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      required
                      autoComplete="address-level2"
                      value={form.city}
                      onChange={(event) => update("city", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <select
                      id="state"
                      required
                      autoComplete="address-level1"
                      value={form.state}
                      onChange={(event) => update("state", event.target.value)}
                      className="h-9 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="">Select a state</option>
                      {US_STATES.map((state) => (
                        <option key={state.code} value={state.code}>
                          {state.name} ({state.code})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">ZIP code</Label>
                    <Input
                      id="postalCode"
                      required
                      inputMode="numeric"
                      autoComplete="postal-code"
                      placeholder="94103"
                      pattern={String.raw`\d{5}(-\d{4})?`}
                      value={form.postalCode}
                      onChange={(event) => update("postalCode", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      required
                      autoComplete="country-name"
                      value={form.country}
                      readOnly
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">We currently ship within the United States only.</p>
                  </div>
                </div>
              </fieldset>

              <fieldset className="space-y-4" disabled={submitting}>
                <legend className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Notes
                </legend>
                <Textarea
                  id="notes"
                  rows={4}
                  placeholder="Delivery instructions, gift note, etc. (optional)"
                  value={form.notes}
                  onChange={(event) => update("notes", event.target.value)}
                />
              </fieldset>

              <fieldset className="space-y-3" disabled={submitting}>
                <legend className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Consent
                </legend>
                <label className="flex items-start gap-3 text-sm">
                  <Checkbox
                    checked={consent.terms}
                    onCheckedChange={(checked) =>
                      setConsent((current) => ({ ...current, terms: checked === true }))
                    }
                    aria-label="Accept the Terms of Sale"
                  />
                  <span className="text-muted-foreground">
                    I agree to the Terms of Sale and understand that sales tax is calculated at checkout.
                  </span>
                </label>
                <label className="flex items-start gap-3 text-sm">
                  <Checkbox
                    checked={consent.marketing}
                    onCheckedChange={(checked) =>
                      setConsent((current) => ({ ...current, marketing: checked === true }))
                    }
                    aria-label="Receive marketing emails"
                  />
                  <span className="text-muted-foreground">
                    Email me brewing tips and new releases. You can unsubscribe at any time.
                  </span>
                </label>
              </fieldset>

              {error ? <p className="text-sm text-destructive">{error}</p> : null}

              <Button type="submit" size="lg" disabled={submitting}>
                {submitting ? "Placing order…" : `Place order · $${total.toFixed(0)} USD`}
              </Button>
              <p className="text-xs text-muted-foreground">
                Sales tax is calculated at checkout. Payment is confirmed manually by our team after the order is placed.
              </p>
            </form>

            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Order summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {summary.map(({ line, product }) => (
                  <div key={line.slug} className="flex justify-between gap-3 text-sm">
                    <span>
                      {line.quantity}× {product!.shortName}
                    </span>
                    <span>${(price(product!.price) * line.quantity).toFixed(0)}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t pt-4 font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(0)} USD</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </section>
    </main>
  )
}

function price(value: string) {
  const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ""))
  return Number.isFinite(parsed) ? parsed : 0
}
