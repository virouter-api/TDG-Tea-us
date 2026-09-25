"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { asset } from "@/lib/asset";
import { CartLink } from "@/components/cart-link";

const navLinks = [
  { href: "/#products", label: "Products" },
  { href: "/#collection", label: "Collection" },
  { href: "/#origins", label: "Origins" },
  { href: "/blog", label: "Journal" },
];

export function InnerHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 text-lg font-medium tracking-tight">
          <Image
            src={asset("/brand/logo-mark.png?v=3")}
            alt="TDG Tea"
            width={62}
            height={62}
            className="h-14 w-14 object-contain md:h-[62px] md:w-[62px]"
          />
          <span>TDG TEA</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#reserve"
            className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background"
          >
            Book a tasting
          </Link>
          <CartLink className="text-foreground" />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <CartLink className="text-foreground" />
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="flex flex-col gap-4 border-t border-border px-6 py-6 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
