import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InnerHeader } from "@/components/inner-header";
import { FooterSection } from "@/components/sections/footer-section";
import { getPost, posts, type BlogBlock } from "@/lib/blog";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Journal — TDG Tea" };
  return {
    title: `${post.title} — TDG Tea Journal`,
    description: post.lede,
  };
}

function Block({ block }: { block: BlogBlock }) {
  if (block.type === "p") {
    return <p className="mb-5 leading-relaxed text-muted-foreground">{block.text}</p>;
  }
  if (block.type === "h2") {
    return <h2 className="mt-12 mb-4 text-3xl font-medium tracking-tight text-foreground">{block.text}</h2>;
  }
  if (block.type === "h3") {
    return <h3 className="mt-8 mb-3 text-xl font-medium text-foreground">{block.text}</h3>;
  }
  if (block.type === "ul") {
    return (
      <ul className="mb-6 list-disc space-y-3 pl-5 text-muted-foreground">
        {block.items.map((item) => (
          <li key={item.slice(0, 48)}>{item}</li>
        ))}
      </ul>
    );
  }
  if (block.type === "note") {
    return (
      <p className="my-8 rounded-2xl border border-border bg-secondary px-5 py-4 text-sm text-muted-foreground">
        <strong className="text-foreground">Note: </strong>
        {block.text}
      </p>
    );
  }
  return (
    <div className={`my-10 grid gap-4 ${block.images.length > 1 ? "md:grid-cols-2" : ""}`}>
      {block.images.map((image) => (
        <figure key={image.src}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary">
            <Image src={image.src} alt={image.alt} fill className="object-cover" />
          </div>
          <figcaption className="mt-2 text-xs text-muted-foreground">{image.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-background">
      <InnerHeader />
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{post.label}</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight md:text-6xl">{post.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{post.lede}</p>
        <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-3xl bg-secondary">
          <Image src={post.cover} alt={post.coverAlt} fill className="object-cover" priority />
        </div>
        <div className="mt-12">
          {post.blocks.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div>
        <div className="mt-16 border-t border-border pt-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">More in the journal</p>
          <div className="mt-4 flex flex-col gap-3">
            {posts
              .filter((item) => item.slug !== post.slug)
              .map((item) => (
                <Link key={item.slug} href={`/blog/${item.slug}`} className="text-lg hover:text-muted-foreground">
                  {item.title} →
                </Link>
              ))}
          </div>
        </div>
      </article>
      <FooterSection />
    </main>
  );
}
