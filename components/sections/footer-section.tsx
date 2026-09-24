"use client";

import Link from "next/link";

const footerLinks = {
  explore: [
    { label: "Products", href: "/#products" },
    { label: "Collection", href: "/#collection" },
    { label: "Origins", href: "/#origins" },
    { label: "Journal", href: "/blog" },
  ],
  about: [
    { label: "Our Story", href: "/#origins" },
    { label: "Book a tasting", href: "/#reserve" },
    { label: "Contact", href: "mailto:hello@tdgtea.com" },
  ],
  service: [
    { label: "FAQ", href: "/#about" },
    { label: "How to brew", href: "/product/ca-gai-leo#how-to-brew" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export function FooterSection() {
  return (
    <footer className="bg-background">
      <div className="border-t border-border px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="/" className="text-lg font-medium text-foreground">
              TDG TEA
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Proactive wellness, one sip at a time. 100% natural herbal ingredients, no
              preservatives, naturally sweetened with stevia.
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              hello@tdgtea.com
              <br />
              +84 (24) 1234 5678
              <br />
              120 Lang Street, Hanoi, Vietnam
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Service</h4>
            <ul className="space-y-3">
              {footerLinks.service.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">2026 TDG Tea. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
