"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useThemeState } from "@/app/hooks/use-theme-state";
import { ProjectShot } from "@/types";
import {
  heroBottomImageUrl,
  heroMobileImageUrl,
  heroTopImageUrl,
} from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

const TOP_IMAGE = { width: 418, height: 593 } as const;
const BOTTOM_IMAGE = { width: 872, height: 581 } as const;
const LABEL = { width: 273, height: 64 } as const;

const IMAGE_GAP = 20;
const BOTTOM_LEFT_OFFSET = 77;
const BRIDGE_LEFT_OFFSET = -10;
const ROTATE_INTERVAL_MS = 1000;

const FALLBACK = "/assets/hero-a.png";

const pickTwoRandomIndices = (length: number, exclude?: [number, number]) => {
  if (length <= 1) return [0, 0] as [number, number];
  const first = Math.floor(Math.random() * length);
  let second = Math.floor(Math.random() * (length - 1));
  if (second >= first) second += 1;
  if (exclude && exclude[0] === first && exclude[1] === second) {
    return pickTwoRandomIndices(length, exclude);
  }
  return [first, second] as [number, number];
};

const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={`animate-pulse rounded-sm bg-gray-200 dark:bg-[#2a2a2a] ${className ?? ""}`}
  />
);

// ---------------------------------------------------------------------------
// Slide shape — carries the raw asset so each render slot can request
// the correct size without re-querying.
// ---------------------------------------------------------------------------
type Slide = {
  id: string;
  /** Raw Sanity asset reference — passed to preset helpers per slot. */
  asset: SanityImageSource | null;
  /** Pre-built top-slot URL, used as cache-key for the loadedSet. */
  topUrl: string;
  alt: string;
};

function buildSlide(shot: ProjectShot): Slide {
  const asset = shot.image?.asset ?? null;
  let topUrl = FALLBACK;
  try {
    if (asset) topUrl = heroTopImageUrl(asset);
  } catch {
    topUrl = FALLBACK;
  }
  return {
    id: shot._id,
    asset,
    topUrl,
    alt: shot.image?.alt ?? shot.title ?? "Project shot",
  };
}

export default function HeroSlider({
  mobile,
  projectShots,
}: {
  mobile?: boolean;
  projectShots: ProjectShot[];
}) {
  const { resolvedTheme, mounted } = useThemeState();
  const labelImage =
    mounted && resolvedTheme === "dark"
      ? "/assets/projects&shots-dark.svg"
      : "/assets/projects&shots-light.svg";

  const slides = useMemo(() => projectShots.map(buildSlide), [projectShots]);

  const [pair, setPair] = useState<[number, number]>([0, 1]);
  // Track which top-slot URLs have been fully loaded at least once
  const loadedSet = useRef<Set<string>>(new Set());
  const [topLoaded, setTopLoaded] = useState(false);
  const [bottomLoaded, setBottomLoaded] = useState(false);

  useEffect(() => {
    if (slides.length < 2) return;
    const interval = window.setInterval(() => {
      setPair((prev) => {
        const next = pickTwoRandomIndices(slides.length, prev);
        const nextTop = slides[next[0]]?.topUrl;
        const nextBottom = slides[next[1]]?.topUrl;
        setTopLoaded(!!nextTop && loadedSet.current.has(nextTop));
        setBottomLoaded(!!nextBottom && loadedSet.current.has(nextBottom));
        return next;
      });
    }, ROTATE_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [slides]);

  const topSlide = slides[pair[0]] ?? slides[0];
  const bottomSlide = slides[pair[1]] ?? slides[0];

  // Eagerly pre-fetch all size variants so rotations feel instant.
  useEffect(() => {
    slides.forEach(({ asset }) => {
      if (!asset) return;
      [heroTopImageUrl, heroBottomImageUrl, heroMobileImageUrl].forEach(
        (fn) => {
          const img = new window.Image();
          img.src = fn(asset);
        },
      );
    });
  }, [slides]);

  if (mobile) {
    return (
      <div
        key={`${pair[0]}-${pair[1]}`}
        className="flex items-start gap-[17px]"
      >
        {/* Top — mobile half-vw */}
        <div className="relative h-[289px] w-1/2 overflow-hidden">
          {!topLoaded && <Skeleton className="absolute inset-0" />}
          <Image
            src={topSlide.asset ? heroMobileImageUrl(topSlide.asset) : FALLBACK}
            alt={topSlide.alt}
            className="object-cover"
            fill
            sizes="50vw"
            onLoad={() => {
              loadedSet.current.add(topSlide.topUrl);
              setTopLoaded(true);
            }}
          />
        </div>

        {/* Bottom — mobile half-vw */}
        <div className="relative h-[356px] w-1/2 overflow-hidden">
          {!bottomLoaded && <Skeleton className="absolute inset-0" />}
          <Image
            src={
              bottomSlide.asset
                ? heroMobileImageUrl(bottomSlide.asset)
                : FALLBACK
            }
            alt={bottomSlide.alt}
            className="object-cover"
            fill
            sizes="50vw"
            onLoad={() => {
              loadedSet.current.add(bottomSlide.topUrl);
              setBottomLoaded(true);
            }}
          />
        </div>
      </div>
    );
  }

  const bottomTop = TOP_IMAGE.height + IMAGE_GAP;
  const bridgeTop = bottomTop - LABEL.height + 15;
  const sectionWidth = BOTTOM_LEFT_OFFSET + BOTTOM_IMAGE.width;
  const sectionHeight = bottomTop + BOTTOM_IMAGE.height;

  return (
    <section
      key={`${pair[0]}-${pair[1]}`}
      className="relative shrink-0 overflow-hidden md:ml-56"
      style={{ width: sectionWidth, height: sectionHeight }}
      aria-label="Featured work"
    >
      {/* Top image — 418 px slot, 2× for HiDPI */}
      <div
        className="absolute top-0 left-0 z-1 overflow-hidden"
        style={{ width: TOP_IMAGE.width, height: TOP_IMAGE.height }}
      >
        {!topLoaded && <Skeleton className="absolute inset-0" />}
        <Image
          src={topSlide.asset ? heroTopImageUrl(topSlide.asset) : FALLBACK}
          alt={topSlide.alt}
          fill
          className="object-contain object-bottom"
          sizes={`${TOP_IMAGE.width}px`}
          priority
          onLoad={() => {
            loadedSet.current.add(topSlide.topUrl);
            setTopLoaded(true);
          }}
        />
      </div>

      {/* Bottom image — 872 px slot, 2× for HiDPI */}
      <div
        className="absolute z-1 overflow-hidden"
        style={{
          top: bottomTop,
          width: BOTTOM_IMAGE.width,
          height: BOTTOM_IMAGE.height,
        }}
      >
        {!bottomLoaded && <Skeleton className="absolute inset-0" />}
        <Image
          src={
            bottomSlide.asset ? heroBottomImageUrl(bottomSlide.asset) : FALLBACK
          }
          alt={bottomSlide.alt}
          fill
          className="object-contain object-top"
          sizes={`${BOTTOM_IMAGE.width}px`}
          priority
          onLoad={() => {
            loadedSet.current.add(bottomSlide.topUrl);
            setBottomLoaded(true);
          }}
        />
      </div>

      {/* Label */}
      <Link
        href="/project-shots"
        className="absolute z-10 flex items-end gap-3"
        style={{ top: bridgeTop, left: BRIDGE_LEFT_OFFSET }}
      >
        <Image
          src={labelImage}
          alt="Projects & Shots"
          width={LABEL.width}
          height={LABEL.height}
          priority
        />
      </Link>
    </section>
  );
}
