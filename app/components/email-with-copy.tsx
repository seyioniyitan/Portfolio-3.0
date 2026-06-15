"use client";

import { useCallback, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const EMAIL = "hello@seyioniyitan.com";
const COPIED_DURATION_MS = 2500;

export default function EmailWithCopy() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetButton = useCallback(() => {
    const button = buttonRef.current;
    const label = labelRef.current;
    if (!button || !label) return;

    gsap.to(button, {
      borderColor: "#000000",
      duration: 0.25,
      ease: "power2.out",
    });
    gsap.to(label, {
      color: "#000000",
      opacity: 0,
      duration: 0.15,
      ease: "power2.in",
      onComplete: () => {
        label.textContent = "COPY";
        gsap.to(label, {
          color: "#000000",
          opacity: 1,
          duration: 0.15,
          ease: "power2.out",
        });
      },
    });
  }, []);

  const handleCopy = useCallback(async () => {
    const button = buttonRef.current;
    const label = labelRef.current;
    if (!button || !label) return;

    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    gsap.fromTo(
      button,
      { scale: 0.96 },
      { scale: 1, duration: 0.3, ease: "back.out(1.7)" },
    );
    gsap.to(button, {
      borderColor: "#007AFF",
      duration: 0.25,
      ease: "power2.out",
    });
    gsap.to(label, {
      color: "#007AFF",
      opacity: 0,
      duration: 0.15,
      ease: "power2.in",
      onComplete: () => {
        label.textContent = "COPIED!";
        gsap.to(label, {
          color: "#007AFF",
          opacity: 1,
          duration: 0.15,
          ease: "power2.out",
        });
      },
    });

    timeoutRef.current = setTimeout(resetButton, COPIED_DURATION_MS);
  }, [resetButton]);

  return (
    <div className="flex items-center gap-2">
      <h2>{EMAIL}</h2>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleCopy}
        className="flex h-5 min-w-12 items-center justify-center rounded-[23px] border-[0.6px] border-black px-2 py-0.5 text-[11px] leading-4 font-medium tracking-[0%]"
      >
        <span ref={labelRef}>COPY</span>
      </button>
    </div>
  );
}
