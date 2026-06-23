"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useThemeState } from "@/app/hooks/use-theme-state";

const menuLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Articles", href: "/articles" },
  { label: "About", href: "/about" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const { resolvedTheme, mounted } = useThemeState();

  const base =
    "flex h-[25px] items-center justify-center rounded-[23px] px-3 py-1 text-[13px] leading-4 font-medium uppercase antialiased transition-colors duration-200";

  const lightStyle = `bg-white text-black`;

  const darkStyle = `
      bg-black text-white`;

  const className =
    mounted && resolvedTheme === "dark"
      ? `${base} ${darkStyle}`
      : `${base} ${lightStyle}`;

  //   useEffect(() => {
  //     const overlay = overlayRef.current;
  //     if (!overlay) return;

  //     if (open) {
  //       // Make visible before animating in
  //       gsap.set(overlay, { display: "flex", yPercent: -100 });
  //       gsap.to(overlay, {
  //         yPercent: 0,
  //         duration: 0.4,
  //         ease: "back.out(1.6)",
  //       });
  //       gsap.fromTo(
  //         itemsRef.current,
  //         { y: 0, opacity: 0 },
  //         {
  //           y: 0,
  //           opacity: 1,
  //           duration: 0.4,
  //           ease: "power2.out",
  //           stagger: 0.07,
  //           delay: 0.25,
  //         },
  //       );
  //     } else {
  //       gsap.to(overlay, {
  //         yPercent: -100,
  //         duration: 0.45,
  //         ease: "power3.inOut",
  //         onComplete: () => gsap.set(overlay, { display: "none" }),
  //       });
  //     }
  //   }, [open]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (open) {
      gsap.set(overlay, { display: "flex", yPercent: -100 });
      gsap.to(overlay, {
        yPercent: 0,
        duration: 0.7,
        ease: "elastic.out(0.8, 0.5)",
      });
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1.2, 0.5)",
          stagger: 0.06,
          delay: 0.15,
        },
      );
    } else {
      gsap.to(overlay, {
        yPercent: -100,
        duration: 0.45,
        ease: "power3.inOut",
        onComplete: () => gsap.set(overlay, { display: "none" }),
      });
    }
  }, [open]);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-[25px] items-center justify-center rounded-[23px] border-[0.4px] border-black px-3 py-1 text-[13px] leading-4 font-medium uppercase antialiased transition-colors duration-200 hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
      >
        more
      </button>

      <div
        ref={overlayRef}
        style={{ display: "none", backgroundColor: "#007AFF" }}
        className="fixed inset-0 z-50 flex h-44 w-full justify-between px-4 pt-6 pb-[35px]"
      >
        <div className="relative h-[51px] w-[77px]">
          <Image
            src="/assets/menu.svg"
            alt="Menu"
            fill
            className="object-contain"
            priority
          />
        </div>

        <nav className="flex flex-col gap-3">
          {menuLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              onClick={() => setOpen(false)}
              className={className}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button onClick={() => setOpen(false)} className={className}>
          Close
        </button>
      </div>
    </>
  );
}
