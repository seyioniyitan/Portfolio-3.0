"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const AUTOPLAY_DELAY_MS = 1000;

const categoryImages: { id: number; alt: string; image: string }[] = [
  { id: 1, alt: "Product", image: "/assets/product.svg" },
  { id: 2, alt: "3d", image: "/assets/3d.svg" },
  { id: 3, alt: "Visual", image: "/assets/visual.svg" },
  { id: 4, alt: "Industrial", image: "/assets/industrial.svg" },
  { id: 5, alt: "Brand", image: "/assets/brand.svg" },
];

export default function CategorySlide() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % categoryImages.length);
        setIsTransitioning(false);
      }, 150);
    }, AUTOPLAY_DELAY_MS);

    return () => clearInterval(interval);
  }, []);

  const { alt, image } = categoryImages[current];

  return (
    <div className="flex h-11 items-center gap-3">
      <div className="flex h-5 w-[33px] items-center justify-center rounded-[23px] border-[0.6px] border-black px-2 py-0.5 text-[11px] leading-4 font-medium tracking-[0%] uppercase">
        on
      </div>

      <div
        className="w-[120px] overflow-hidden"
        style={{
          transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isTransitioning ? "translateX(-8px)" : "translateX(0px)",
        }}
      >
        <Image
          key={current}
          src={image}
          alt={alt}
          width={120}
          height={63}
          style={{
            transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms",
            transform: isTransitioning ? "translateX(12px)" : "translateX(0px)",
            opacity: isTransitioning ? 0 : 1,
          }}
        />
      </div>

      <div className="flex h-5 w-16 items-center justify-center rounded-[23px] border-[0.6px] border-black px-2 py-0.5 text-[11px] leading-4 font-medium tracking-[0%]">
        DESIGN™
      </div>
    </div>
  );
}
