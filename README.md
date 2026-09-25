# TDG Tea — Evasion template reskin

Next.js 16 + Tailwind v4 landing, reskinned from the Evasion outdoor template onto TDG Tea content.

## Scope

- Homepage (hero, two featured blends, six-blend grid, origins, gallery, collection, journal, testimonials, tasting form)
- Product detail: `/product/[slug]` for all 6 SKUs
- Journal: `/blog` + 2 articles
- Admin: `/admin` (login `/admin/login`) — CMSFullForm dashboard reskinned for TDG Tea. Catalog and journal read from `lib/catalog.ts` / `lib/blog.ts`; orders/customers are demo data. Static export, so auth is a localStorage gate (`admin@tdg-tea.com` / `tdg-admin`), not a server session. Do not ship this URL publicly without real auth.
- Skin: keep Evasion black/white editorial. Sage/orange only on the logo mark.
- Hero image: highland mist photo supplied by the owner (`public/images/hero.jpg`)

## Run

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

`next` does not run on iSH; preview on a real Mac/Linux/Windows machine.

## Content notes

- Price `$25 / box` is demo pricing.
- Book a tasting is a mock form (no CRM/email).
- Health-related copy is inherited from the TDG Tea demo and still needs owner/legal review before production.
- Contact details (`hello@tdgtea.com`, Hanoi address) are demo placeholders.

## Catalog

| Slug | Blend |
|---|---|
| `ca-gai-leo` | Cà Gai Leo Rau Má (best seller) |
| `dinh-lang` | Đinh Lăng Lạc Tiên |
| `giao-co-lam` | Giảo Cổ Lam Sương Sáo |
| `bup-oi` | Búp Ổi Thìa Canh |
| `gung-dang-sam` | Gừng Đẳng Sâm |
| `tia-to` | Tía Tô Tầm Bóp |

Source of copy: https://github.com/virouter-api/TDG-Tea
