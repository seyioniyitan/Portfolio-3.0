"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useThemeState } from "@/app/hooks/use-theme-state";
import Link from "next/link";
import { useMobileMenu } from "@/app/context/mobile-menu-context";

const AUTOPLAY_DELAY_MS = 600;

const categoryImages: { id: number; alt: string; image: string }[] = [
  { id: 1, alt: "Product", image: "/assets/product.svg" },
  { id: 2, alt: "3d", image: "/assets/3d.svg" },
  { id: 3, alt: "Visual", image: "/assets/visual.svg" },
  { id: 4, alt: "Industrial", image: "/assets/industrial.svg" },
  { id: 5, alt: "Brand", image: "/assets/brand.svg" },
];

const SHEET_TRANSITION_MS = 280;

export default function BottomSheet() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { resolvedTheme, mounted } = useThemeState();
  const { open: menuOpen } = useMobileMenu();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % categoryImages.length);
    }, AUTOPLAY_DELAY_MS);
    return () => clearInterval(interval);
  }, []);

  const { alt, image } = categoryImages[current];
  const imageSrc =
    mounted && resolvedTheme === "dark"
      ? image.replace(".svg", "-dark.svg")
      : image;

  return (
    <div
      className="fixed bottom-0 left-0 z-50 flex h-37 w-full flex-col bg-[#007AFF]"
      style={{
        transform: menuOpen ? "translateY(100%)" : "translateY(0%)",
        transition: `transform ${SHEET_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,

        pointerEvents: menuOpen ? "none" : "auto",
      }}
      aria-hidden={menuOpen}
    >
      <Link
        href="/contact"
        className="mx-4 mt-3.5 flex h-8 items-center justify-between"
      >
        <h2 className="text font-semibold text-white">Start a project</h2>
        <div className="flex h-8 w-10 items-center justify-center rounded-[23px] bg-black">
          <Image
            src="/assets/arrow-icon.svg"
            alt="arrow-icon"
            width={14}
            height={12}
          />
        </div>
      </Link>
      <div className="mt-6 flex items-center justify-center">
        <div className="flex h-11 items-center gap-3">
          <div className="flex h-5 w-[33px] items-center justify-center rounded-[23px] border-[0.8px] border-black px-2 py-0.5 text-[11px] leading-4 font-medium tracking-[0%] text-black uppercase">
            on
          </div>

          <div
            className="w-[120px] overflow-hidden"
            style={{
              transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              transform: isTransitioning
                ? "translateX(-8px)"
                : "translateX(0px)",
            }}
          >
            <Image
              key={current}
              src={imageSrc}
              alt={alt}
              width={120}
              height={63}
            />
          </div>

          <div className="flex h-5 w-16 items-center justify-center rounded-[23px] border-[0.8px] border-black px-2 py-0.5 text-[11px] leading-4 font-medium tracking-[0%] text-black uppercase">
            DESIGN™
          </div>
        </div>
      </div>
    </div>
  );
}
