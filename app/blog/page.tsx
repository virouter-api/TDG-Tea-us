import Image from "next/image";
import Link from "next/link";
import { InnerHeader } from "@/components/inner-header";
import { FooterSection } from "@/components/sections/footer-section";
import { getStore } from "@/lib/server/store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "TDG Tea Journal — Herbal Wellness",
  description: "Thoughtful stories about Vietnamese herbs, daily rituals, and caring for your body.",
};

export default async function BlogIndexPage() {
  const { posts } = await getStore().read();
  return (
    <main className="min-h-screen bg-background">
      <InnerHeader />
      <section className="px-6 py-20 text-center md:px-12 md:py-28">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">TDG Tea Journal</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight md:text-6xl">
          Wellness from the highlands
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
          Thoughtful stories about Vietnamese herbs, daily rituals, and the gentle work of caring
          for your body.
        </p>
      </section>
      <section className="grid gap-10 px-6 pb-24 md:grid-cols-2 md:px-12 lg:px-20">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-secondary">
              <Image
                src={post.cover}
                alt={post.coverAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <p className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">
              {post.label}
            </p>
            <h2 className="mt-2 text-2xl font-medium tracking-tight">{post.title}</h2>
            <p className="mt-3 text-muted-foreground">{post.lede}</p>
          </Link>
        ))}
      </section>
      <FooterSection />
    </main>
  );
}
