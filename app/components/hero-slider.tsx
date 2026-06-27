"use client";
import { useThemeState } from "@/app/hooks/use-theme-state";
import { urlFor } from "@/sanity/lib/image";
import { ProjectShot } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const TOP_IMAGE = { width: 418, height: 593 } as const;
const BOTTOM_IMAGE = { width: 872, height: 581 } as const;
const LABEL = { width: 273, height: 64 } as const;

const IMAGE_GAP = 20;
const BOTTOM_LEFT_OFFSET = 77;
const BRIDGE_LEFT_OFFSET = -10;
const ROTATE_INTERVAL_MS = 1500;

const buildImageUrl = (shot: ProjectShot) => {
  if (!shot.image?.asset) return "/assets/hero-a.png";
  try {
    return urlFor(shot.image.asset).url();
  } catch {
    return "/assets/hero-a.png";
  }
};

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

  const slides = useMemo(
    () =>
      projectShots.map((shot) => ({
        id: shot._id,
        image: buildImageUrl(shot),
        alt: shot.image?.alt ?? shot.title ?? "Project shot",
      })),
    [projectShots],
  );

  const [pair, setPair] = useState<[number, number]>([0, 1]);

  useEffect(() => {
    if (slides.length < 2) return;
    const interval = window.setInterval(() => {
      setPair((prev) => pickTwoRandomIndices(slides.length, prev));
    }, ROTATE_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [slides.length]);

  const topImage = slides[pair[0]] ?? slides[0];
  const bottomImage = slides[pair[1]] ?? slides[0];

  if (mobile) {
    return (
      <div
        key={`${pair[0]}-${pair[1]}`}
        className="flex items-start gap-[17px]"
      >
        <div className="relative h-[289px] w-1/2 overflow-hidden">
          <Image
            src={topImage.image}
            alt={topImage.alt}
            className="object-cover"
            fill
          />
        </div>
        <div className="relative h-[356px] w-1/2 overflow-hidden">
          <Image
            src={bottomImage.image}
            alt={bottomImage.alt}
            className="translate-x-1/2 object-cover"
            fill
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
      <div
        className="absolute top-0 left-0 z-1 overflow-hidden"
        style={{
          width: TOP_IMAGE.width,
          height: TOP_IMAGE.height,
        }}
      >
        <Image
          src={topImage.image}
          alt={topImage.alt}
          fill
          className="object-cover"
          sizes={`${TOP_IMAGE.width}px`}
          priority
        />
      </div>

      <div
        className="absolute z-1 overflow-hidden"
        style={{
          top: bottomTop,
          left: BOTTOM_LEFT_OFFSET,
          width: BOTTOM_IMAGE.width,
          height: BOTTOM_IMAGE.height,
        }}
      >
        <Image
          src={bottomImage.image}
          alt={bottomImage.alt}
          fill
          className="object-cover"
          sizes={`${BOTTOM_IMAGE.width}px`}
          priority
        />
      </div>

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
