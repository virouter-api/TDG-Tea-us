"use client";

import Link from "next/link";
import { FadeImage } from "@/components/fade-image";
import { ProductCardCartButton } from "@/components/product-card-cart-button";
import type { Product } from "@/lib/catalog";

export function FeaturedProductsSection({ products }: { products: Product[] }) {
  return (
    <section id="ritual" className="bg-background">
      <div className="px-6 py-20 text-center md:px-12 md:py-28 lg:px-20 lg:py-32 lg:pb-20">
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Six blends.
          <br />
          One daily ritual.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">
          Crafted for every need
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 px-6 pb-20 md:grid-cols-3 md:px-12 lg:px-20">
        {products.map((product) => (
          <Link key={product.slug} href={`/product/${product.slug}`} className="group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
              <FadeImage
                src={product.sceneImage}
                alt={product.name}
                fill
                className="object-cover object-center group-hover:scale-105"
              />
              {product.bestSeller ? (
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground shadow-sm backdrop-blur">
                  Best seller
                </span>
              ) : null}
              <div className="absolute bottom-4 right-4">
                <ProductCardCartButton slug={product.slug} name={product.shortName} />
              </div>
            </div>
            <div className="py-6">
              <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                {product.label}
              </p>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-foreground text-xl font-semibold">{product.shortName}</h3>
                <span className="shrink-0 text-sm font-medium text-foreground">{product.price}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {product.tastingNotes.join(" · ")}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {product.ingredients.slice(0, 3).map((ingredient) => ingredient.vn).join(" · ")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
