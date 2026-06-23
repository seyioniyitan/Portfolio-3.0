"use client";

import Image from "next/image";
import { useState } from "react";
import { useThemeState } from "@/app/hooks/use-theme-state";
import PdfFileSvg from "./svgs/pdf-file-svg";
import Link from "next/link";

export default function RecentWork() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { resolvedTheme, mounted } = useThemeState();
  const imageSrc =
    mounted && resolvedTheme === "dark"
      ? "/assets/recent-work-dark.svg"
      : "/assets/recent-work-light.svg";

  const base =
    "flex h-5 items-center justify-center rounded-[23px] px-2 py-0.5 text-[11px] leading-4 font-medium uppercase antialiased transition-colors duration-200";

  const lightStyle = `
    border-[0.6px] border-black
    hover:bg-black hover:text-white
  `;

  const darkStyle = `
    border-[0.6px] border-white
    hover:bg-white hover:text-black
  `;

  const className =
    mounted && resolvedTheme === "dark"
      ? `${base} ${darkStyle}`
      : `${base} ${lightStyle}`;
  return (
    <div className="mt-10 mb-10 lg:mt-15 lg:mb-15">
      <div className="flex items-center gap-1">
        <Image
          src={imageSrc}
          width={235}
          height={86}
          alt="recent_work"
          className="pl-2"
        />
        <div className="hidden lg:block">
          <Link href="/project-shots" className={className}>
            browse
          </Link>
        </div>
      </div>
      <div className="px-4 md:w-[443px] md:pl-6">
        {recentWorkList.map(({ company, role, year, tag, image }, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative flex h-18.5 cursor-default justify-between border-b border-[#F2F2F7] py-3.5 dark:border-[#7F7F7F66]/40"
          >
            <div
              className="pointer-events-none absolute inset-0 z-10 ml-30 flex items-center justify-center transition-opacity duration-300"
              style={{ opacity: hoveredIndex === index ? 1 : 0 }}
            >
              <Image
                src={image}
                alt={`${company} preview`}
                width={70}
                height={70}
                className="object-cover grayscale"
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text font-normal">{company}</h2>
                {tag && (
                  <p className="flex h-3.5 w-6 items-center justify-center rounded-[4px] border-[0.4px] border-[#00000014]/8 bg-[#8080808C]/55 px-1 py-0.5 text-[8px] leading-[100%] font-semibold tracking-[0%] text-white">
                    {tag}
                  </p>
                )}
              </div>
              <p className="text font-normal text-[#8E8E93]">{role}</p>
            </div>
            <h2>{year}</h2>
          </div>
        ))}
        <div className="relative flex h-13.75 items-center justify-between border-b border-[#F2F2F7] py-3.5 dark:border-[#7F7F7F66]/40">
          <div className="flex items-center gap-2">
            <h2 className="text font-normal">Download resume</h2>
            <p className="text text-[12px] font-medium text-[#8E8E93]">805kB</p>
          </div>

          <div className="absolute right-0 bottom-0">
            <PdfFileSvg />
          </div>
        </div>
      </div>
    </div>
  );
}

const recentWorkList: {
  company: string;
  role: string;
  year: number | string;
  tag?: string;
  image: string;
}[] = [
  {
    company: "Tactile Int, Tactile Labs",
    role: "Craftsman & Co-founder",
    year: 2026,
    tag: "WIP",
    image: "/assets/hero-b.png",
  },
  {
    company: "Grey Finance 3D design system",
    role: "Senior generalist designer",
    year: 2026,
    image: "/assets/hero-b.png",
  },
  {
    company: "Rise 3.0",
    role: "Product design lead",
    year: 2025,
    image: "/assets/hero-b.png",
  },
  {
    company: "Soar Capital, Soar Money",
    role: "Identity Design, Product Design",
    year: 2025,
    image: "/assets/hero-b.png",
  },
  {
    company: "Zykband, Germany",
    role: "Industrial 3D Design",
    year: 2025,
    image: "/assets/hero-b.png",
  },
  {
    company: "Around The World",
    role: "Brand Identity Design, Events",
    year: 2025,
    image: "/assets/hero-b.png",
  },
  {
    company: "Leverdman on YouTube",
    role: "Generalist Design Channel",
    year: 2025,
    image: "/assets/hero-b.png",
  },
  {
    company: "Rolling Shots",
    role: "Multidisciplinary Design",
    year: "Continuous",
    image: "/assets/hero-b.png",
  },
];
