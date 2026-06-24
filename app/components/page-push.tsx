"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useMobileMenu } from "@/app/context/mobile-menu-context";
import { MENU_HEIGHT } from "@/app/components/mobile-menu";

export default function PagePushWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open } = useMobileMenu();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    gsap.to(el, {
      marginTop: open ? MENU_HEIGHT : 0,
      duration: open ? 0.7 : 0.45,
      ease: open ? "elastic.out(0.8, 0.5)" : "power3.inOut",
    });
  }, [open]);

  return (
    <div ref={wrapperRef} style={{ marginTop: 0 }}>
      {children}
    </div>
  );
}
