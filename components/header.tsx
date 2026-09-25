"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { asset } from "@/lib/asset";
<<<<<<< HEAD
=======
import { CartLink } from "@/components/cart-link";
>>>>>>> origin/main

const navLinks = [
  { href: "/#products", label: "Products" },
  { href: "/#ritual", label: "Ritual" },
  { href: "/#origins", label: "Origins" },
  { href: "/#collection", label: "Collection" },
  { href: "/blog", label: "Journal" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textClass = isScrolled
    ? "text-muted-foreground hover:text-foreground"
    : "text-white/70 hover:text-white";

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-3xl transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md rounded-full" : "bg-transparent"}`}
      style={{
        boxShadow: isScrolled
          ? "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px"
          : "none",
      }}
    >
<<<<<<< HEAD
      <div className="flex items-center justify-between transition-all duration-300 px-2 pl-5 py-2">
        <Link
          href="/"
          className={`flex items-center gap-2.5 text-lg font-medium tracking-tight transition-colors duration-300 ${isScrolled ? "text-foreground" : "text-white"}`}
        >
          <Image
            src={asset("/brand/logo-mark.png?v=3")}
            alt="TDG Tea"
            width={62}
            height={62}
            className="h-14 w-14 object-contain md:h-[62px] md:w-[62px]"
          />
=======
      <div className="flex items-center justify-between transition-all duration-300 px-3 pl-4 py-1.5 md:px-2 md:pl-5 md:py-2">
        <Link
          href="/"
          className={`flex items-center gap-2 text-xl font-medium tracking-tight transition-colors duration-300 md:gap-2.5 md:text-lg ${isScrolled ? "text-foreground" : "text-white"}`}
        >
          <span className="relative h-9 w-9 shrink-0 overflow-hidden md:h-[62px] md:w-[62px]">
            <Image
              src={asset("/brand/logo-mark.png?v=3")}
              alt="TDG Tea"
              width={62}
              height={62}
              className="absolute -inset-[28%] h-[156%] w-[156%] max-w-none object-contain md:static md:h-[62px] md:w-[62px]"
            />
          </span>
>>>>>>> origin/main
          <span>TDG TEA</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`text-sm transition-colors ${textClass}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
<<<<<<< HEAD
=======
          <CartLink className={isScrolled ? "text-foreground" : "text-white"} />
>>>>>>> origin/main
          <Link
            href="/#reserve"
            className={`px-4 py-2 text-sm font-medium transition-all rounded-full ${isScrolled ? "bg-foreground text-background hover:opacity-80" : "bg-white text-foreground hover:bg-white/90"}`}
          >
            Book a tasting
          </Link>
        </div>

<<<<<<< HEAD
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`transition-colors md:hidden ${isScrolled ? "text-foreground" : "text-white"}`}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
=======
        <div className={`flex items-center gap-2 md:hidden ${isScrolled ? "text-foreground" : "text-white"}`}>
          <CartLink className="text-current" />
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
>>>>>>> origin/main
      </div>

      {isMenuOpen && (
        <div className="border-t border-border bg-background px-6 py-8 md:hidden rounded-b-2xl">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#reserve"
              className="mt-4 bg-foreground px-5 py-3 text-center text-sm font-medium text-background rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Book a tasting
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
