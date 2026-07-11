"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useThemeState } from "@/app/hooks/use-theme-state";
import { useMobileMenu } from "@/app/context/mobile-menu-context";

const menuLinks = [
  { label: "Store", href: "https://seyioniyitan.gumroad.com" },
  { label: "Articles", href: "https://www.medium.com/@seyioniyitan" },
  { label: "About", href: "/about" },
];

export const MENU_HEIGHT = 173;

export default function MobileMenu() {
  const { open, setOpen } = useMobileMenu();
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const { resolvedTheme, mounted } = useThemeState();

  const base =
    "flex h-[25px] w-fit items-center justify-center rounded-[23px] px-3 py-1 text-[13px] leading-4 font-medium uppercase antialiased ";
  const pillClass =
    mounted && resolvedTheme === "dark"
      ? `${base} bg-black text-white`
      : `${base} bg-white text-black`;

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (open) {
      gsap.set(overlay, { display: "flex", yPercent: -100 });
      gsap.to(overlay, {
        yPercent: 0,
        duration: 0.7,
        ease: "elastic.out(0.05, 0.2)",
      });
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(0.05, 0.1)",
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
      {!open && (
        <>
          <button
            onClick={() => setOpen(true)}
            className="flex h-[25px] items-center justify-center rounded-[23px] border-[0.8px] border-black px-3 text-[13px] leading-none font-medium uppercase antialiased hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
          >
            more
          </button>
        </>
      )}

      <div
        ref={overlayRef}
        style={{
          display: "none",
          backgroundColor: "#007AFF",
          height: `${MENU_HEIGHT}px`,
        }}
        className="fixed top-0 left-0 z-50 flex h-[50px] w-full justify-between pt-6 pr-13 pl-4"
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

        <nav className="flex h-full flex-col gap-6">
          {menuLinks.map((link, i) => {
            const isExternal = /^https?:\/\//.test(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => {
                  itemsRef.current[i] = el;
                }}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className={pillClass}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button onClick={() => setOpen(false)} className={pillClass}>
          Close
        </button>
      </div>
    </>
  );
}
