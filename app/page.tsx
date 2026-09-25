import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { CollectionSection } from "@/components/sections/collection-section";
import { EditorialSection } from "@/components/sections/editorial-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FooterSection } from "@/components/sections/footer-section";
import { getStore } from "@/lib/server/store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const snapshot = await getStore().read();
  return (
    <main className="min-h-screen overflow-x-clip bg-background">
      <Header />
      <HeroSection />
      <PhilosophySection />
      <FeaturedProductsSection products={snapshot.products} />
      <TechnologySection />
      <GallerySection />
      <CollectionSection products={snapshot.products} />
      <EditorialSection posts={snapshot.posts} />
      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}
