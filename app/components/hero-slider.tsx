"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useThemeState } from "@/app/hooks/use-theme-state";
import { HeroShot } from "@/types";
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
  bottomUrl: string;
  mobileUrl: string;
  alt: string;
};

function buildSlide(shot: HeroShot): Slide {
  const asset = shot.image?.asset ?? null;
  let topUrl = FALLBACK;
  let bottomUrl = FALLBACK;
  let mobileUrl = FALLBACK;

  try {
    if (asset) {
      topUrl = heroTopImageUrl(asset);
      bottomUrl = heroBottomImageUrl(asset);
      mobileUrl = heroMobileImageUrl(asset);
    }
  } catch {
    topUrl = FALLBACK;
    bottomUrl = FALLBACK;
    mobileUrl = FALLBACK;
  }

  return {
    id: shot._id,
    asset,
    topUrl,
    bottomUrl,
    mobileUrl,
    alt: shot.image?.alt ?? shot.title ?? "Hero shot",
  };
}

function preloadUrls(urls: string[]) {
  for (const url of urls) {
    if (!url || url === FALLBACK) continue;
    const img = new window.Image();
    img.src = url;
  }
}

export default function HeroSlider({
  mobile,
  heroShots,
}: {
  mobile?: boolean;
  heroShots: HeroShot[];
}) {
  const { resolvedTheme, mounted } = useThemeState();
  const labelImage =
    mounted && resolvedTheme === "dark"
      ? "/assets/projects&shots-dark.svg"
      : "/assets/projects&shots-light.svg";

  const slides = useMemo(
    () => heroShots.map((shot) => buildSlide(shot)),
    [heroShots],
  );

  const [pair, setPair] = useState<[number, number]>([0, 1]);
  const loadedSet = useRef<Set<string>>(new Set());
  const [topLoaded, setTopLoaded] = useState(false);
  const [bottomLoaded, setBottomLoaded] = useState(false);
  const [hasRotated, setHasRotated] = useState(false);

  useEffect(() => {
    if (slides.length < 2) return;
    const interval = window.setInterval(() => {
      setHasRotated(true);
      setPair((prev) => {
        const next = pickTwoRandomIndices(slides.length, prev);
        const nextTop = slides[next[0]];
        const nextBottom = slides[next[1]];
        const topKey = mobile ? nextTop?.mobileUrl : nextTop?.topUrl;
        const bottomKey = mobile ? nextBottom?.mobileUrl : nextBottom?.bottomUrl;
        setTopLoaded(!!topKey && loadedSet.current.has(topKey));
        setBottomLoaded(!!bottomKey && loadedSet.current.has(bottomKey));
        return next;
      });
    }, ROTATE_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [slides, mobile]);

  const topSlide = slides[pair[0]] ?? slides[0];
  const bottomSlide = slides[pair[1]] ?? slides[0];

  const topSrc = mobile
    ? topSlide?.mobileUrl ?? FALLBACK
    : topSlide?.topUrl ?? FALLBACK;
  const bottomSrc = mobile
    ? bottomSlide?.mobileUrl ?? FALLBACK
    : bottomSlide?.bottomUrl ?? FALLBACK;

  // Preload only the two images currently on screen — never the full library.
  useEffect(() => {
    preloadUrls([topSrc, bottomSrc]);
  }, [topSrc, bottomSrc]);

  if (mobile) {
    return (
      <div className="flex items-start gap-[17px]">
        <div className="relative h-[320px] w-1/2 overflow-hidden">
          {!topLoaded && <Skeleton className="absolute inset-0" />}
          <Image
            src={topSlide?.asset ? topSrc : FALLBACK}
            alt={topSlide?.alt ?? "Hero shot"}
            className="object-contain"
            fill
            unoptimized
            sizes="50vw"
            priority={!hasRotated}
            onLoad={() => {
              loadedSet.current.add(topSrc);
              setTopLoaded(true);
            }}
          />
        </div>

        <div className="relative h-[320px] w-1/2 overflow-hidden">
          {!bottomLoaded && <Skeleton className="absolute inset-0" />}
          <Image
            src={bottomSlide?.asset ? bottomSrc : FALLBACK}
            alt={bottomSlide?.alt ?? "Hero shot"}
            className="object-contain"
            fill
            unoptimized
            sizes="50vw"
            priority={!hasRotated}
            onLoad={() => {
              loadedSet.current.add(bottomSrc);
              setBottomLoaded(true);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <section
      className="relative flex h-full w-full flex-col md:ml-56"
      aria-label="Featured work"
    >
      <div
        className="relative min-h-0 flex-1"
        style={{ marginBottom: IMAGE_GAP / 2 }}
      >
        {!topLoaded && <Skeleton className="absolute inset-0" />}
        <Image
          src={topSlide?.asset ? topSrc : FALLBACK}
          alt={topSlide?.alt ?? "Hero shot"}
          fill
          unoptimized
          className="object-contain object-bottom-left"
          sizes="50vw"
          priority={!hasRotated}
          onLoad={() => {
            loadedSet.current.add(topSrc);
            setTopLoaded(true);
          }}
        />
      </div>

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

      <div
        className="relative min-h-0 flex-1"
        style={{ marginTop: IMAGE_GAP / 2 }}
      >
        {!bottomLoaded && <Skeleton className="absolute inset-0" />}
        <Image
          src={bottomSlide?.asset ? bottomSrc : FALLBACK}
          alt={bottomSlide?.alt ?? "Hero shot"}
          fill
          unoptimized
          className="object-contain object-top-left"
          sizes="50vw"
          priority={!hasRotated}
          onLoad={() => {
            loadedSet.current.add(bottomSrc);
            setBottomLoaded(true);
          }}
        />
      </div>
    </section>
  );
}
