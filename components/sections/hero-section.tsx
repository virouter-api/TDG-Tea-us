"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ResponsiveHeroImage } from "@/components/responsive-hero-image";
import { asset } from "@/lib/asset";
const V = "7";
const src = (path: string) => asset(`${path}?v=${V}`);


const word = "TDG TEA";

const sideImages = [
  {
    src: src("/images/products/ca-gai-leo/lifestyle.jpg"),
    alt: "Cà Gai Leo Rau Má over highland fields",
    position: "left",
    span: 1,
  },
  {
    src: src("/images/products/dinh-lang/packshot.jpg"),
    alt: "Đinh Lăng Lạc Tiên packshot",
    position: "left",
    span: 1,
  },
  {
    src: src("/images/products/giao-co-lam/packshot.jpg"),
    alt: "Giảo Cổ Lam Sương Sáo packshot",
    position: "right",
    span: 1,
  },
  {
    src: src("/images/origins/farmer.jpg"),
    alt: "Highland herb fields at dawn",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
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
    <section ref={sectionRef} className="relative bg-background">
      <div className="relative h-[72svh] min-h-[500px] overflow-hidden md:hidden">
        <ResponsiveHeroImage
          alt="Misty highland herb garden at dawn"
          priority
          className="object-cover object-center"
        />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent px-6 pb-10 pt-32">
          <h1 className="text-[20vw] font-medium leading-[0.8] tracking-tighter text-white">
            {word}
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
        <p className="mx-auto max-w-2xl text-center text-2xl leading-relaxed text-muted-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          Everyday wellness,
          <br />
          brewed from nature.
        </p>
      </div>
    </section>
  );
}
