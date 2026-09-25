"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ResponsiveHeroImage } from "@/components/responsive-hero-image";
import { asset } from "@/lib/asset";
<<<<<<< HEAD

const V = "8";
const src = (path: string) => asset(`${path}?v=${V}`);

=======
const V = "7";
const src = (path: string) => asset(`${path}?v=${V}`);


const word = "TDG TEA";

>>>>>>> origin/main
const sideImages = [
  {
    src: src("/images/products/ca-gai-leo/lifestyle.jpg"),
    alt: "Cà Gai Leo Rau Má over highland fields",
    position: "left",
<<<<<<< HEAD
=======
    span: 1,
>>>>>>> origin/main
  },
  {
    src: src("/images/products/dinh-lang/packshot.jpg"),
    alt: "Đinh Lăng Lạc Tiên packshot",
    position: "left",
<<<<<<< HEAD
=======
    span: 1,
>>>>>>> origin/main
  },
  {
    src: src("/images/products/giao-co-lam/packshot.jpg"),
    alt: "Giảo Cổ Lam Sương Sáo packshot",
    position: "right",
<<<<<<< HEAD
=======
    span: 1,
>>>>>>> origin/main
  },
  {
    src: src("/images/origins/farmer.jpg"),
    alt: "Highland herb fields at dawn",
    position: "right",
<<<<<<< HEAD
  },
];

function ImageTile({ image, className = "" }: { image: (typeof sideImages)[number]; className?: string }) {
  return (
    <div className={`relative min-h-0 flex-1 overflow-hidden rounded-[22px] bg-white ${className}`}>
      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 767px) 24vw, 22vw" className="object-cover" />
    </div>
  );
}

=======
    span: 1,
  },
];

>>>>>>> origin/main
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
<<<<<<< HEAD
    const handleScroll = () => {
      if (!sectionRef.current || window.innerWidth < 768) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (window.innerHeight * 2)));
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
=======
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

      setScrollProgress(progress);
    };

    const syncMotionMode = () => {
      window.removeEventListener("scroll", handleScroll);

      if (mediaQuery.matches) {
        setScrollProgress(0);
        return;
      }

      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
    };

    syncMotionMode();
    mediaQuery.addEventListener("change", syncMotionMode);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", syncMotionMode);
    };
>>>>>>> origin/main
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
<<<<<<< HEAD
    <section ref={sectionRef} className="relative bg-[#090909]">
      {/* Mobile: one stable hero image. Side imagery and scroll animation stay desktop-only. */}
      <div className="relative h-[80svh] min-h-[520px] w-full overflow-hidden px-4 pb-4 pt-20 md:hidden">
        <div className="relative h-full overflow-hidden rounded-[22px] bg-black">
          <ResponsiveHeroImage alt="Misty highland herb garden at dawn" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" aria-hidden="true" />
          <div className="absolute inset-x-6 bottom-8 z-10 text-white">
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-white/75">Rooted in Vietnam · Made for everyday rituals</p>
            <h1 className="max-w-[11ch] text-[clamp(2.7rem,11vw,4.4rem)] font-medium leading-[0.88] tracking-[-0.06em]">Vietnamese herbal tea for your daily rhythm</h1>
            <p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-white/80">Thoughtful blends of Vietnamese botanicals, made to meet the pace of your day.</p>
            <div className="mt-5 flex flex-col gap-2">
              <a href="#collection" className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-black">Shop the collection</a>
              <a href="#ritual" className="inline-flex h-11 items-center justify-center rounded-full border border-white/50 px-6 text-sm font-medium text-white">Explore the ritual</a>
            </div>
          </div>
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
                  <div className="w-full px-6 pb-8 text-white md:px-8 md:pb-10">
                    <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-white/75">Rooted in Vietnam · Made for everyday rituals</p>
                    <h1 className="max-w-[11ch] text-[clamp(3.5rem,6.7vw,7rem)] font-medium leading-[0.88] tracking-[-0.06em]">Vietnamese herbal tea for your daily rhythm</h1>
                    <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-white/80">Thoughtful blends of Vietnamese botanicals, made to meet the pace of your day.</p>
                    <div className="mt-5 flex gap-3">
                      <a href="#collection" className="inline-flex h-10 items-center justify-center rounded-full bg-white px-5 text-xs font-medium text-black">Shop the collection</a>
                      <a href="#ritual" className="inline-flex h-10 items-center justify-center rounded-full border border-white/50 px-5 text-xs font-medium text-white">Explore the ritual</a>
                    </div>
                  </div>
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
=======
    <section ref={sectionRef} className="relative bg-background">
      <div className="relative h-[calc(100svh-64px)] min-h-[640px] overflow-hidden md:hidden">
        <ResponsiveHeroImage
          alt="Misty highland herb garden at dawn"
          priority
          className="object-cover object-center"
        />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent px-6 pb-10 pt-32">
          <h1 className="text-[20vw] font-medium leading-[0.8] tracking-tighter text-white">
            {word.split("").map((letter, index) => (
              <span
                key={index}
                className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                style={{
                  animationDelay: `${index * 0.08}s`,
                  transition: "all 1.5s",
                  transitionTimingFunction: "cubic-bezier(0.86, 0, 0.07, 1)",
                  width: letter === " " ? "0.28em" : undefined,
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>
        </div>
      </div>

      <div className="sticky top-0 hidden h-screen overflow-hidden md:block">
        <div className="flex h-full w-full items-center justify-center">
          <div
            className="relative flex h-full w-full items-stretch justify-center"
            style={{
              gap: `${gap}px`,
              padding: `${imageProgress * 16}px`,
              paddingBottom: `${60 + imageProgress * 40}px`,
            }}
          >
            <div
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages
                .filter((img) => img.position === "left")
                .map((img, idx) => (
                  <div
                    key={idx}
                    className="relative overflow-hidden will-change-transform"
                    style={{
                      flex: img.span,
                      borderRadius: `${borderRadius}px`,
                    }}
                  >
                    <Image src={img.src} alt={img.alt} fill className="object-cover" />
                  </div>
                ))}
            </div>

            <div
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: `${centerHeight}%`,
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              <ResponsiveHeroImage
                alt="Misty highland herb garden at dawn"
                priority
              />

              <div
                className="absolute inset-0 flex items-end overflow-hidden"
                style={{ opacity: textOpacity }}
              >
                <h1 className="w-full text-[18vw] font-medium leading-[0.8] tracking-tighter text-white md:text-[16vw]">
                  {word.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                      style={{
                        animationDelay: `${index * 0.08}s`,
                        transition: "all 1.5s",
                        transitionTimingFunction: "cubic-bezier(0.86, 0, 0.07, 1)",
                        width: letter === " " ? "0.28em" : undefined,
                      }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  ))}
                </h1>
              </div>
            </div>

            <div
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages
                .filter((img) => img.position === "right")
                .map((img, idx) => (
                  <div
                    key={idx}
                    className="relative overflow-hidden will-change-transform"
                    style={{
                      flex: img.span,
                      borderRadius: `${borderRadius}px`,
                    }}
                  >
                    <Image src={img.src} alt={img.alt} fill className="object-cover" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden h-[200vh] md:block" />

      <div className="px-6 pt-32 pb-28 md:pt-48 md:px-12 md:pb-36 lg:px-20 lg:pt-56 lg:pb-44">
>>>>>>> origin/main
        <p className="mx-auto max-w-2xl text-center text-2xl leading-relaxed text-muted-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          Everyday wellness,
          <br />
          brewed from nature.
        </p>
      </div>
    </section>
  );
}
<<<<<<< HEAD

export default HeroSection;

=======
>>>>>>> origin/main
