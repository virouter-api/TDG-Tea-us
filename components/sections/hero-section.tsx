"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ResponsiveHeroImage } from "@/components/responsive-hero-image";
import { asset } from "@/lib/asset";

const V = "8";
const src = (path: string) => asset(`${path}?v=${V}`);

const sideImages = [
  {
    src: src("/images/products/ca-gai-leo/lifestyle.jpg"),
    alt: "Cà Gai Leo Rau Má over highland fields",
    position: "left",
  },
  {
    src: src("/images/products/dinh-lang/packshot.jpg"),
    alt: "Đinh Lăng Lạc Tiên packshot",
    position: "left",
  },
  {
    src: src("/images/products/giao-co-lam/packshot.jpg"),
    alt: "Giảo Cổ Lam Sương Sáo packshot",
    position: "right",
  },
  {
    src: src("/images/origins/farmer.jpg"),
    alt: "Highland herb fields at dawn",
    position: "right",
  },
];

function ImageTile({ image, className = "" }: { image: (typeof sideImages)[number]; className?: string }) {
  return (
    <div className={`relative min-h-0 flex-1 overflow-hidden rounded-[22px] bg-white ${className}`}>
      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 767px) 24vw, 22vw" className="object-cover" />
    </div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || window.innerWidth < 768) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (window.innerHeight * 2)));
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textOpacity = Math.max(0, 1 - scrollProgress / 0.2);
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  const centerWidth = 100 - imageProgress * 58;
  const centerHeight = 100 - imageProgress * 30;
  const sideWidth = imageProgress * 22;
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + imageProgress * 100;
  const sideTranslateRight = 100 - imageProgress * 100;
  const borderRadius = imageProgress * 24;
  const gap = imageProgress * 16;
  const sideTranslateY = -(imageProgress * 15);

  return (
    <section ref={sectionRef} className="relative bg-[#090909]">
      {/* Mobile: one stable hero image. Side imagery and scroll animation stay desktop-only. */}
      <div className="relative h-[80svh] min-h-[520px] w-full overflow-hidden px-4 pb-4 pt-20 md:hidden">
        <div className="relative h-full overflow-hidden rounded-[22px] bg-black">
          <ResponsiveHeroImage alt="Misty highland herb garden at dawn" priority />
          <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
        </div>
      </div>

      {/* Desktop: editorial expansion with smooth scroll-driven animations. */}
      <div className="hidden md:block">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="flex h-full w-full items-center justify-center">
            <div className="relative flex h-full w-full items-stretch justify-center" style={{ gap: `${gap}px`, padding: `${imageProgress * 16}px`, paddingBottom: `${60 + imageProgress * 40}px` }}>
              <div className="flex flex-col will-change-transform" style={{ width: `${sideWidth}%`, gap: `${gap}px`, transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`, opacity: sideOpacity }}>
                {sideImages.filter((img) => img.position === "left").map((img) => <ImageTile key={img.src} image={img} className="rounded-[var(--radius)]" />)}
              </div>
              <div className="relative overflow-hidden will-change-transform" style={{ width: `${centerWidth}%`, height: `${centerHeight}%`, flex: "0 0 auto", borderRadius: `${borderRadius}px` }}>
                <ResponsiveHeroImage alt="Misty highland herb garden at dawn" priority />
                <div className="absolute inset-0 flex items-end overflow-hidden" style={{ opacity: textOpacity }}>
                  <h1 className="w-full text-[18vw] font-medium leading-[0.8] tracking-tighter text-white md:text-[16vw]">TDG TEA</h1>
                </div>
              </div>
              <div className="flex flex-col will-change-transform" style={{ width: `${sideWidth}%`, gap: `${gap}px`, transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`, opacity: sideOpacity }}>
                {sideImages.filter((img) => img.position === "right").map((img) => <ImageTile key={img.src} image={img} className="rounded-[var(--radius)]" />)}
              </div>
            </div>
          </div>
        </div>
        <div className="h-[200vh]" />
      </div>

      <div className="bg-background px-6 py-20 md:pt-48 md:pb-36 md:px-12 lg:px-20">
        <p className="mx-auto max-w-2xl text-center text-2xl leading-relaxed text-muted-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          Everyday wellness,
          <br />
          brewed from nature.
        </p>
      </div>
    </section>
  );
}

export default HeroSection;

