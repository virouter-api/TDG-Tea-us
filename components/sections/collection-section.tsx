"use client";

import Link from "next/link";
import { FadeImage } from "@/components/fade-image";
import { products } from "@/lib/catalog";

export function CollectionSection() {
  return (
    <section id="collection" className="bg-background">
      <div className="px-6 py-20 md:px-12 lg:px-20 md:py-10">
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          The Collection
        </h2>
      </div>

      <div className="pb-24">
        <div className="flex gap-6 overflow-x-auto px-6 pb-4 md:hidden snap-x snap-mandatory scrollbar-hide">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/product/${product.slug}`}
              className="group flex-shrink-0 w-[75vw] snap-center"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-50">
                <FadeImage
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-1 group-hover:scale-105"
                />
              </div>
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {product.shortName}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{product.tagline}</p>
                  </div>
                  <span className="text-lg font-medium text-foreground">{product.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-8 md:px-12 lg:px-20">
          {products.map((product) => (
            <Link key={product.slug} href={`/product/${product.slug}`} className="group">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-50">
                <FadeImage
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-1 group-hover:scale-105"
                />
              </div>
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {product.shortName}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{product.tagline}</p>
                  </div>
                  <span className="font-medium text-foreground text-2xl">{product.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
