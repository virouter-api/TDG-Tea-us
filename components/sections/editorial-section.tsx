"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

const specs = [
  { label: "Caffeine", value: "None" },
  { label: "Sugar", value: "Stevia" },
  { label: "Blends", value: "6" },
  { label: "Steep", value: "5–7 min" },
];

export function EditorialSection({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="bg-background">
      <div className="grid grid-cols-2 border-t border-border md:grid-cols-4">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="border-b border-r border-border p-8 text-center last:border-r-0 md:border-b-0"
          >
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              {spec.label}
            </p>
            <p className="font-medium text-foreground text-4xl">{spec.value}</p>
          </div>
        ))}
      </div>

      <div className="px-6 py-20 md:px-12 lg:px-20">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Journal</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              Wellness from the highlands
            </h2>
          </div>
          <Link href="/blog" className="hidden md:inline text-sm text-muted-foreground hover:text-foreground">
            Read the journal →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-secondary">
                <Image
                  src={post.cover}
                  alt={post.coverAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
                {post.label}
              </p>
              <h3 className="mt-2 text-xl font-medium text-foreground">{post.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
