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

const LABEL = { width: 273, height: 64 } as const;

const IMAGE_GAP = 20;
const BRIDGE_LEFT_OFFSET = -10;
const ROTATE_INTERVAL_MS = 1400;

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

type Slide = {
  id: string;
  asset: SanityImageSource | null;
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
        <div className="relative h-[320px] w-1/2 overflow-hidden">
          {!topLoaded && <Skeleton className="absolute inset-0" />}
          <Image
            src={topSlide.asset ? heroMobileImageUrl(topSlide.asset) : FALLBACK}
            alt={topSlide.alt}
            className="object-contain"
            fill
            sizes="50vw"
            onLoad={() => {
              loadedSet.current.add(topSlide.topUrl);
              setTopLoaded(true);
            }}
          />
        </div>

        <div className="relative h-[320px] w-1/2 overflow-hidden">
          {!bottomLoaded && <Skeleton className="absolute inset-0" />}
          <Image
            src={
              bottomSlide.asset
                ? heroMobileImageUrl(bottomSlide.asset)
                : FALLBACK
            }
            alt={bottomSlide.alt}
            className="object-contain"
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

  return (
    <section
      key={`${pair[0]}-${pair[1]}`}
      className="relative flex h-full w-full flex-col md:ml-56"
      aria-label="Featured work"
    >
      {/* Top image — takes the top half of the available space */}
      <div
        className="relative min-h-0 flex-1"
        style={{ marginBottom: IMAGE_GAP / 2 }}
      >
        {!topLoaded && <Skeleton className="absolute inset-0" />}
        <Image
          src={topSlide.asset ? heroTopImageUrl(topSlide.asset) : FALLBACK}
          alt={topSlide.alt}
          fill
          className="object-contain object-left-bottom"
          sizes="50vw"
          priority
          onLoad={() => {
            loadedSet.current.add(topSlide.topUrl);
            setTopLoaded(true);
          }}
        />
      </div>

      {/* Bridge / label — sits at the seam between the two halves */}
      <div className="relative z-10 h-0">
        <Link
          href="/project-shots"
          className="absolute flex items-end gap-3"
          style={{
            bottom: -(LABEL.height - 15),
            left: BRIDGE_LEFT_OFFSET,
          }}
        >
          <Image
            src={labelImage}
            alt="Projects & Shots"
            width={LABEL.width}
            height={LABEL.height}
            priority
          />
        </Link>
      </div>

      {/* Bottom image — takes the bottom half of the available space */}
      <div
        className="relative min-h-0 flex-1"
        style={{ marginTop: IMAGE_GAP / 2 }}
      >
        {!bottomLoaded && <Skeleton className="absolute inset-0" />}
        <Image
          src={
            bottomSlide.asset ? heroBottomImageUrl(bottomSlide.asset) : FALLBACK
          }
          alt={bottomSlide.alt}
          fill
          className="object-contain object-left-top"
          sizes="50vw"
          priority
          onLoad={() => {
            loadedSet.current.add(bottomSlide.topUrl);
            setBottomLoaded(true);
          }}
        />
      </div>
    </section>
  );
}
