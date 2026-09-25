import { asset } from "@/lib/asset";

interface ResponsiveHeroImageProps {
  alt: string;
  priority?: boolean;
  className?: string;
}

export function ResponsiveHeroImage({
  alt,
  priority = false,
  className = "object-cover",
}: ResponsiveHeroImageProps) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`${asset("/images/hero-sm.webp?v=2")} 1600w, ${asset("/images/hero.webp?v=2")} 3200w`}
        sizes="100vw"
      />
      <img
        src={asset("/images/hero.jpg?v=2")}
        alt={alt}
        className={`absolute inset-0 h-full w-full ${className}`}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}
