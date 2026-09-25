export type CartLine = {
  slug: string
  quantity: number
}

export const CART_KEY = "tdg-cart"

export function readCart(): CartLine[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(CART_KEY)
    const parsed = raw ? (JSON.parse(raw) as CartLine[]) : []
    return parsed.filter((line) => line.slug && line.quantity > 0)
  } catch {
    return []
  }
}

export function writeCart(lines: CartLine[]) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(lines))
  window.dispatchEvent(new Event("tdg-cart"))
}

export function addToCart(slug: string, quantity: number) {
  const lines = readCart()
  const existing = lines.find((line) => line.slug === slug)
  if (existing) existing.quantity += quantity
  else lines.push({ slug, quantity })
  writeCart(lines)
  return lines
}

export function setCartQuantity(slug: string, quantity: number) {
  const lines = readCart().filter((line) => (line.slug === slug ? quantity > 0 : true))
  const existing = lines.find((line) => line.slug === slug)
  if (existing) existing.quantity = quantity
  else if (quantity > 0) lines.push({ slug, quantity })
  writeCart(lines)
  return lines
}

export function cartCount(lines = readCart()) {
  return lines.reduce((sum, line) => sum + line.quantity, 0)
}
