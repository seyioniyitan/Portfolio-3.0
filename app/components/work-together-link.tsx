"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

import { useThemeState } from "@/app/hooks/use-theme-state";

export default function WorkTogetherLink() {
  const arrowRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const { resolvedTheme } = useThemeState();

  const handleMouseEnter = () => {
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        rotation: -45,
        duration: 0.3,
        ease: "power2.out",
      });
    }
    if (textRef.current) {
      gsap.to(textRef.current, {
        color: "#007AFF",
        textDecorationColor: "#007AFF",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
    if (textRef.current) {
      const targetColor = resolvedTheme === "dark" ? "#FFFFFF" : "#000000";
      gsap.to(textRef.current, {
        color: targetColor,
        textDecorationColor: targetColor,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <Link
      href="/"
      className="text flex items-center gap-2 font-semibold"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#007AFF]">
        <span ref={arrowRef} className="inline-flex">
          <Image
            src="/assets/arrow-icon.svg"
            alt="arrow_icon"
            width={10}
            height={10}
          />
        </span>
      </span>
      <span
        ref={textRef}
        className="underline decoration-1 underline-offset-[20%]"
      >
        Let&apos;s work together
      </span>
    </Link>
  );
}
