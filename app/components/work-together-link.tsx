"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

export default function WorkTogetherLink() {
  const arrowRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

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
      gsap.to(textRef.current, {
        color: "#000000",
        textDecorationColor: "#000000",
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
      <span ref={textRef} className="underline">
        Let&apos;s work together
      </span>
    </Link>
  );
}
