"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useThemeState } from "@/app/hooks/use-theme-state";

export default function WorkTogetherLink() {
  const arrowRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const isHovered = useRef(false);
  const { resolvedTheme } = useThemeState();

  const baseColor = resolvedTheme === "dark" ? "#FFFFFF" : "#000000";

  useEffect(() => {
    if (textRef.current && !isHovered.current) {
      gsap.set(textRef.current, {
        color: baseColor,
        textDecorationColor: baseColor,
      });
    }
  }, [resolvedTheme, baseColor]);

  const handleMouseEnter = () => {
    isHovered.current = true;

    if (arrowRef.current) {
      gsap.set(arrowRef.current, {
        rotation: -45,
      });
    }

    if (textRef.current) {
      gsap.set(textRef.current, {
        color: "#007AFF",
        textDecorationColor: "#007AFF",
      });
    }
  };

  const handleMouseLeave = () => {
    isHovered.current = false;

    if (arrowRef.current) {
      gsap.set(arrowRef.current, {
        rotation: 0,
      });
    }

    if (textRef.current) {
      gsap.set(textRef.current, {
        color: baseColor,
        textDecorationColor: baseColor,
      });
    }
  };

  return (
    <Link
      href="mailto:hello@seyioniyitan.com?subject=Design%20Project"
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
