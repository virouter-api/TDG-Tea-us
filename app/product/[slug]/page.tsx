import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InnerHeader } from "@/components/inner-header";
import { FooterSection } from "@/components/sections/footer-section";
import { ProductGallery, type GallerySlot } from "@/components/product-gallery";
import { ProductBuyBox } from "@/components/product-buy-box";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { brewSteps, type Product } from "@/lib/catalog";
import { getStore } from "@/lib/server/store";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const snapshot = await getStore().read();
  const product = snapshot.products.find((item) => item.slug === slug);
  if (!product) return { title: "Product — TDG Tea" };
  return {
    title: `${product.name} — TDG Tea`,
    description: product.summary,
  };
}

function gallerySlots(product: Product): GallerySlot[] {
  return [
    { src: product.image, alt: product.name },
    { src: product.lifestyleImage, alt: `${product.shortName} lifestyle` },
    { src: product.detailImage, alt: `${product.shortName} detail` },
    { alt: `${product.shortName} — more photos coming soon` },
    { alt: `${product.shortName} — more photos coming soon` },
  ];
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const snapshot = await getStore().read();
  const product = snapshot.products.find((item) => item.slug === slug);
  if (!product) notFound();

  const related = snapshot.products.filter((item) => item.slug !== product.slug);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <InnerHeader />

      <main className="flex-grow py-10 md:py-14">
        <div className="mx-auto w-[90%] lg:w-[80%]">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:w-1/2">
              <ProductGallery images={gallerySlots(product)} />
            </div>

            <div className="space-y-8 lg:w-1/2">
              <div>
                {product.bestSeller && (
                  <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Best seller
                  </p>
                )}
                <p className="text-sm uppercase tracking-widest text-muted-foreground">
                  {product.label}
                </p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                  {product.name}
                </h1>
                <p className="mt-2 text-lg font-light text-gray-500">{product.tagline}</p>
              </div>

              <p className="text-lg leading-relaxed text-gray-700">{product.summary}</p>

              <div className="flex flex-wrap gap-2">
                {product.meta.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <ProductBuyBox slug={product.slug} price={product.price} unit={product.unit} />
            </div>
          </div>

          <div className="mt-16">
            <Tabs defaultValue="details">
              <TabsList className="h-auto w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="details"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 text-base data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="brew"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 text-base data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  How to brew
                </TabsTrigger>
                <TabsTrigger
                  value="ingredients"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 text-base data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Ingredients
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6 space-y-6">
                <p className="text-gray-700">{product.tagline}</p>
                <ul className="list-disc space-y-2 pl-5 text-gray-700">
                  {product.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    Who it&apos;s for
                  </p>
                  <p className="mt-2 text-gray-700">{product.audience}</p>
                  {product.note && (
                    <p className="mt-2 text-sm text-muted-foreground">Note: {product.note}</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="brew" className="mt-6">
                <div className="grid gap-6 md:grid-cols-3">
                  {brewSteps.map((step) => (
                    <article key={step.number}>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        {step.number}
                      </p>
                      <h3 className="mt-2 text-lg font-medium">{step.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
                    </article>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="ingredients" className="mt-6">
                <table className="w-full text-left">
                  <tbody>
                    {product.ingredients.map((ingredient) => (
                      <tr key={ingredient.vn} className="border-b border-border">
                        <th className="py-3 pr-4 font-medium">{ingredient.vn}</th>
                        <td className="py-3 text-muted-foreground">{ingredient.en}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-4 text-sm text-muted-foreground">
                  100% natural herbs. No preservatives. Naturally sweetened with stevia.
                </p>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">You may also like</h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
              {related.map((item) => (
                <Link key={item.slug} href={`/product/${item.slug}`} className="group">
                  <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-neutral-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-sm font-semibold leading-snug md:text-base">
                    {item.shortName}
                  </h3>
                  <p className="text-gray-600">{item.price}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Explore the collection</h2>
            <Link
              href="/#collection"
              className="inline-flex items-center rounded-full border border-foreground px-8 py-3 text-sm font-medium"
            >
              View all blends
            </Link>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
