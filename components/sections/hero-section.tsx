"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ResponsiveHeroImage } from "@/components/responsive-hero-image";
import { asset } from "@/lib/asset";
import { Button } from "@/components/ui/button";

const V = "8";
const src = (path: string) => asset(`${path}?v=${V}`);

const sideImages = [
  { src: src("/images/products/ca-gai-leo/lifestyle.jpg"), alt: "Cà Gai Leo and pennywort leaves", position: "left" },
  { src: src("/images/products/dinh-lang/packshot.jpg"), alt: "Đinh Lăng Lạc Tiên tea pack", position: "left" },
  { src: src("/images/products/giao-co-lam/packshot.jpg"), alt: "Giảo Cổ Lam Sương Sáo tea pack", position: "right" },
  { src: src("/images/origins/farmer.jpg"), alt: "Highland herb fields at dawn", position: "right" },
];

type SideImage = (typeof sideImages)[number];

function ImageTile({ image, className = "" }: { image: SideImage; className?: string }) {
  return (
    <div className={`relative min-h-0 flex-1 overflow-hidden rounded-[22px] bg-white ${className}`}>
      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 767px) 24vw, 22vw" className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]" />
    </div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const handleScroll = () => {
      if (!sectionRef.current || !media.matches) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setScrollProgress(Math.max(0, Math.min(1, -rect.top / (window.innerHeight * 1.45))));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    media.addEventListener("change", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      media.removeEventListener("change", handleScroll);
    };
  }, []);

  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.12) / 0.72));
  const centerWidth = 100 - imageProgress * 42;
  const centerHeight = 100 - imageProgress * 18;
  const sideWidth = imageProgress * 20;
  const sideOpacity = imageProgress;
  const textOpacity = Math.max(0, 1 - scrollProgress / 0.24);
  const gap = imageProgress * 14;
  const sideTranslateY = -(imageProgress * 8);

  return (
    <section ref={sectionRef} className="relative bg-[#090909]">
      <div className="relative flex min-h-[80svh] w-full items-stretch gap-2 overflow-hidden px-2 pb-2 pt-20 md:hidden">
        <div className="flex w-[22%] flex-col gap-2 pt-[8%]">
          <ImageTile image={sideImages[0]} />
          <ImageTile image={sideImages[1]} />
        </div>
        <div className="relative min-w-0 flex-1 overflow-hidden rounded-[22px] bg-black">
          <ResponsiveHeroImage alt="Misty highland herb garden at dawn" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" aria-hidden="true" />
          <div className="absolute inset-x-5 bottom-7 z-10 text-white">
            <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-white/75">Rooted in Vietnam</p>
            <h1 className="max-w-[12ch] text-[clamp(2rem,9vw,3.4rem)] font-medium leading-[0.95] tracking-[-0.05em]">Vietnamese herbal tea for your daily rhythm</h1>
            <div className="mt-5 flex flex-col gap-2">
              <Button asChild className="h-11 w-full rounded-full bg-white text-black hover:bg-white/90"><Link href="#collection">Shop the collection</Link></Button>
              <Button asChild variant="outline" className="h-11 w-full rounded-full border-white/50 bg-transparent text-white hover:bg-white hover:text-black"><Link href="#ritual">Explore the ritual</Link></Button>
            </div>
          </div>
        </div>
        <div className="flex w-[22%] flex-col gap-2 pt-[8%]">
          <ImageTile image={sideImages[2]} />
          <ImageTile image={sideImages[3]} />
        </div>
      </div>

      <div className="hidden md:block">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="flex h-full w-full items-center justify-center">
            <div className="relative flex h-full w-full items-stretch justify-center" style={{ gap: `${gap}px`, padding: `${imageProgress * 16}px`, paddingBottom: `${60 + imageProgress * 40}px` }}>
              <div className="flex flex-col will-change-transform" style={{ width: `${sideWidth}%`, gap: `${gap}px`, transform: `translateY(${sideTranslateY}%)`, opacity: sideOpacity }}>
                {sideImages.filter((img) => img.position === "left").map((img) => <ImageTile key={img.src} image={img} className="rounded-[var(--radius)]" />)}
              </div>
              <div className="relative overflow-hidden will-change-transform" style={{ width: `${centerWidth}%`, height: `${centerHeight}%`, flex: "0 0 auto", borderRadius: `${imageProgress * 24}px` }}>
                <ResponsiveHeroImage alt="Misty highland herb garden at dawn" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" aria-hidden="true" />
                <div className="absolute inset-x-8 bottom-10 z-10 max-w-xl text-white" style={{ opacity: textOpacity }}>
                  <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/75">Rooted in Vietnam · Made for everyday rituals</p>
                  <h1 className="text-[clamp(3.5rem,7vw,8rem)] font-medium leading-[0.86] tracking-[-0.06em]">Vietnamese herbal tea for your daily rhythm</h1>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-white/80">Thoughtful blends of Vietnamese botanicals, made to meet the pace of your day.</p>
                  <div className="mt-7 flex gap-3">
                    <Button asChild className="rounded-full bg-white px-6 text-black hover:bg-white/90"><Link href="#collection">Shop the collection</Link></Button>
                    <Button asChild variant="outline" className="rounded-full border-white/50 bg-transparent px-6 text-white hover:bg-white hover:text-black"><Link href="#ritual">Explore the ritual</Link></Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col will-change-transform" style={{ width: `${sideWidth}%`, gap: `${gap}px`, transform: `translateY(${sideTranslateY}%)`, opacity: sideOpacity }}>
                {sideImages.filter((img) => img.position === "right").map((img) => <ImageTile key={img.src} image={img} className="rounded-[var(--radius)]" />)}
              </div>
            </div>
          </div>
        </div>
        <div className="h-[145vh]" />
      </div>

      <div id="ritual" className="bg-background px-6 py-14 md:px-12 md:py-24 lg:px-20">
        <p className="mx-auto max-w-2xl text-center text-2xl leading-relaxed text-muted-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">Everyday wellness,<br />brewed from nature.</p>
      </div>
    </section>
  );
}

export default HeroSection;

