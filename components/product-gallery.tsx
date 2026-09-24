"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export type GallerySlot = {
  src?: string;
  alt: string;
};

export function ProductGallery({ images }: { images: GallerySlot[] }) {
  const slots = images.slice(0, 5);
  while (slots.length < 5) {
    slots.push({ alt: `Product image ${slots.length + 1}` });
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const current = slots[currentIndex];

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % slots.length);
  const previousImage = () =>
    setCurrentIndex((prev) => (prev - 1 + slots.length) % slots.length);

  return (
    <div>
      <div className="relative aspect-square">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 bg-white/80 hover:bg-white sm:h-12 sm:w-12"
          onClick={previousImage}
          type="button"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
        </Button>

        <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-neutral-100">
          {current.src ? (
            <Image
              src={current.src}
              alt={current.alt}
              fill
              priority
              className="object-contain transition-all duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-neutral-300">
              <ImageIcon className="h-16 w-16" strokeWidth={1} />
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 bg-white/80 hover:bg-white sm:h-12 sm:w-12"
          onClick={nextImage}
          type="button"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
        </Button>
      </div>

      <div className="mt-6 flex justify-center gap-3 sm:gap-4">
        {slots.map((slot, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`relative h-16 w-16 overflow-hidden rounded-lg bg-neutral-100 transition-all ${
              currentIndex === index ? "ring-2 ring-black" : "hover:ring-1 hover:ring-gray-200"
            }`}
            aria-label={`View image ${index + 1}`}
          >
            {slot.src ? (
              <Image src={slot.src} alt="" fill className="object-contain" />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-neutral-300">
                <ImageIcon className="h-5 w-5" strokeWidth={1.5} />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
