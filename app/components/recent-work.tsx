"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useThemeState } from "@/app/hooks/use-theme-state";
import PdfFileSvg from "./svgs/pdf-file-svg";
import Link from "next/link";
import { RecentWorkData } from "@/types";
import { thumbnailImageUrl } from "@/sanity/lib/image";

const PREVIEW_SIZE = 80;
const POSITION_TRANSITION_MS = 320;
const MORPH_TRANSITION_MS = 420;

function MorphingPreview({
  containerRef,
  hoveredIndex,
  itemRefs,
  images,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  hoveredIndex: number | null;
  itemRefs: React.RefObject<(HTMLElement | null)[]>;
  images: { src: string; alt: string }[];
}) {
  const [top, setTop] = useState(0);

  const [slots, setSlots] = useState<
    [{ src: string; alt: string }, { src: string; alt: string }]
  >([
    { src: "", alt: "" },
    { src: "", alt: "" },
  ]);
  const [active, setActive] = useState<0 | 1>(0);

  // Reposition the floating preview to sit over whichever row is hovered.
  useEffect(() => {
    if (hoveredIndex === null) return;
    const container = containerRef.current;
    const row = itemRefs.current?.[hoveredIndex];
    if (!container || !row) return;

    const rowTop = row.offsetTop;
    const rowHeight = row.offsetHeight;
    setTop(rowTop + rowHeight / 2 - PREVIEW_SIZE / 2);
  }, [hoveredIndex, containerRef, itemRefs]);

  useEffect(() => {
    if (hoveredIndex === null) return;
    const next = images[hoveredIndex];
    if (!next) return;

    setSlots((prev) => {
      if (prev[active].src === next.src) return prev;
      const inactive = active === 0 ? 1 : 0;
      const updated: [(typeof prev)[0], (typeof prev)[0]] = [...prev] as any;
      updated[inactive] = next;
      setActive(inactive);
      return updated;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredIndex, images]);

  const visible = hoveredIndex !== null;

  return (
    <div
      className="pointer-events-none absolute right-0 z-10 overflow-hidden"
      style={{
        width: PREVIEW_SIZE,
        height: PREVIEW_SIZE,
        top,
        opacity: visible ? 1 : 0,
        transition: `top ${POSITION_TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1), opacity ${POSITION_TRANSITION_MS}ms ease-out`,
      }}
    >
      {slots.map((slot, i) => {
        const isActive = i === active;
        return (
          <Image
            key={i}
            src={slot.src || "/assets/hero-a.png"}
            alt={slot.alt}
            fill
            unoptimized
            className="object-cover grayscale"
            style={{
              opacity: slot.src && isActive ? 1 : 0,
              transform: isActive ? "scale(1)" : "scale(1.18)",
              filter: isActive ? "blur(0px)" : "blur(10px)",
              transition: `opacity ${MORPH_TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1), transform ${MORPH_TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1), filter ${MORPH_TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1)`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function RecentWork({
  recentWork,
}: {
  recentWork: RecentWorkData[];
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const { resolvedTheme, mounted } = useThemeState();
  const imageSrc =
    mounted && resolvedTheme === "dark"
      ? "/assets/recent-work-dark.svg"
      : "/assets/recent-work-light.svg";

  const base =
    "flex h-5 items-center justify-center rounded-[23px] px-2 py-0.5 text-[11px] leading-4 font-medium uppercase antialiased ";

  const lightStyle = `
    border-[0.8px] border-black
    hover:bg-black hover:text-white
  `;

  const darkStyle = `
    border-[0.8px] border-white
    hover:bg-white hover:text-black
  `;

  const className =
    mounted && resolvedTheme === "dark"
      ? `${base} ${darkStyle}`
      : `${base} ${lightStyle}`;

  const previewImages = recentWork.map(({ company, image }) => ({
    src: image ? thumbnailImageUrl(image) : "/assets/hero-a.png",
    alt: image?.alt ?? `${company} preview`,
  }));

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
      <div ref={containerRef} className="relative px-4 md:w-[443px] md:pl-6">
        <MorphingPreview
          containerRef={containerRef}
          hoveredIndex={hoveredIndex}
          itemRefs={itemRefs}
          images={previewImages}
        />

        {recentWork.map(({ company, role, year, tag, link }, index) => {
          const isExternal =
            !!link &&
            !link.startsWith("/") &&
            (link.includes(".com") ||
              link.includes(".net") ||
              link.includes(".org") ||
              link.includes(".io"));

          const href = isExternal ? `https://${link}` : (link ?? "/");

          return (
            <Link
              href={href}
              key={index}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative flex h-18.5 cursor-default justify-between border-b border-[#F2F2F7] py-3.5 dark:border-[#7F7F7F66]/40"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text font-normal">{company}</h2>
                  {tag && (
                    <p className="flex h-3.5 w-6 items-center justify-center rounded-[4px] border-[0.8px] border-[#000000]/8 bg-[#808080]/55 px-1 py-0.5 text-[8px] leading-[100%] font-semibold tracking-[0%] text-white">
                      {tag}
                    </p>
                  )}
                </div>
                <p className="text font-normal text-[#8E8E93]">{role}</p>
              </div>
              <h2 className="text font-normal">{year}</h2>
            </Link>
          );
        })}
        <a
          href="/assets/seyis-cv.pdf"
          download
          className="relative flex h-13.75 cursor-pointer items-center justify-between border-b border-[#F2F2F7] py-3.5 dark:border-[#7F7F7F66]/40"
        >
          <div className="flex items-baseline gap-2">
            <h2 className="text font-normal">Download resume</h2>
            <p className="text-[12px] leading-[150%] font-medium tracking-[0%] text-[#8E8E93]">
              805kB
            </p>
          </div>

          <div className="absolute right-0 bottom-0">
            <PdfFileSvg />
          </div>
        </a>
      </div>
    </div>
  );
}
