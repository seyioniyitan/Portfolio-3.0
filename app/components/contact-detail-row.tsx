"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

type ContactDetailRowProps = {
  label: string;
  value: string;
};

export default function ContactDetailRow({
  label,
  value,
}: ContactDetailRowProps) {
  const [copied, setCopied] = useState(false);
  console.log(label);

  useEffect(() => {
    if (!copied) return;
    const timeoutId = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeoutId);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {}
  };

  const href =
    label === "Email address"
      ? `mailto:${value}`
      : value.startsWith("http://") || value.startsWith("https://")
        ? value
        : `https://${value}`;

  return (
    <div className="group relative flex h-[23px] w-fit min-w-[346px] items-center">
      <div className="text w-[151px] shrink-0 font-normal text-[#8E8E93]">
        {label}
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-4">
        {label === "Email address" ? (
          <a
            href={href}
            className="text font-normal whitespace-nowrap decoration-1 underline-offset-[20%] hover:underline"
            onClick={() => redirect(`mailto:${value}`)}
          >
            {value}
          </a>
        ) : (
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text font-normal whitespace-nowrap decoration-1 underline-offset-[20%] hover:underline"
          >
            {value}
          </Link>
        )}

        <button
          type="button"
          onClick={handleCopy}
          className={`pointer-events-none flex h-[23px] items-center justify-center rounded-[23px] border-[0.8px] px-2 text-[11px] leading-4 font-medium tracking-[0%] opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 ${
            copied
              ? "border-[#007AFF] text-[#007AFF]"
              : "border-black text-black dark:border-white dark:text-white"
          }`}
        >
          {copied ? "COPIED!" : "COPY"}
        </button>
      </div>
    </div>
  );
}
