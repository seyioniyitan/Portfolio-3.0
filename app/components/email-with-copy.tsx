"use client";

import { useState, useEffect, useRef } from "react";

const EMAIL = "hello@seyioniyitan.com";
const COPIED_DURATION_MS = 1500;

export default function EmailWithCopy() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, COPIED_DURATION_MS);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="flex items-center justify-between gap-2 md:justify-normal">
      <h2>{EMAIL}</h2>
      <button
        type="button"
        onClick={handleCopy}
        className={`flex h-5 min-w-12 cursor-pointer items-center justify-center rounded-[23px] border-[0.6px] px-2 py-0.5 text-[11px] leading-4 font-medium tracking-[0%] transition-colors duration-150 ${
          copied
            ? "border-[#007AFF] text-[#007AFF]"
            : "border-foreground text-foreground"
        }`}
      >
        <span>{copied ? "COPIED!" : "COPY"}</span>
      </button>
    </div>
  );
}
