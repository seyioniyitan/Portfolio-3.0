"use client";

import { useEffect, useState } from "react";

export type ContrastVariant = "light-bg" | "dark-bg";

interface UseAdaptiveContrastOptions {
  /** The exact background-position x offset in px, e.g. -166 for "-166px". */
  positionX?: number;
  /** Height in px of the region to sample (matches your header's height). */
  sampleHeight?: number;
  /** Fallback used before the image loads or if sampling fails. */
  fallback?: ContrastVariant;
}

function relativeLuminance(r: number, g: number, b: number) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Samples the actual pixels of `imageSrc` as they'd render under
 * background-size: cover + the given position, within a container of
 * `containerWidth` x `containerHeight`, and returns which text variant
 * ("light-bg" = image is bright, use dark text / "dark-bg" = image is
 * dark, use light text) gives the best contrast.
 */
export function useAdaptiveContrast(
  imageSrc: string,
  containerWidth: number,
  containerHeight: number,
  options: UseAdaptiveContrastOptions = {},
): { variant: ContrastVariant; ready: boolean } {
  const { positionX, sampleHeight = 120, fallback = "dark-bg" } = options;
  const [variant, setVariant] = useState<ContrastVariant>(fallback);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!imageSrc || containerWidth === 0 || containerHeight === 0) return;
    let cancelled = false;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      if (cancelled) return;
      try {
        const canvas = document.createElement("canvas");
        canvas.width = containerWidth;
        canvas.height = Math.min(sampleHeight, containerHeight);
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) throw new Error("no 2d context");

        // Replicate CSS `background-size: cover` scaling exactly.
        const scale = Math.max(
          containerWidth / img.naturalWidth,
          containerHeight / img.naturalHeight,
        );
        const scaledW = img.naturalWidth * scale;
        const scaledH = img.naturalHeight * scale;

        // Replicate `background-position`. Horizontal is a literal px
        // offset in your usage; vertical "center" centers the scaled
        // image within the full container height.
        const offsetX = positionX ?? (containerWidth - scaledW) / 2;
        const offsetY = (containerHeight - scaledH) / 2;

        ctx.drawImage(img, offsetX, offsetY, scaledW, scaledH);

        const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

        let total = 0;
        let count = 0;
        // Stride-sample every 8th pixel — plenty accurate for an
        // average brightness read, far cheaper than every pixel.
        for (let i = 0; i < data.length; i += 4 * 8) {
          total += relativeLuminance(data[i], data[i + 1], data[i + 2]);
          count++;
        }
        const avg = count > 0 ? total / count : 128;

        if (!cancelled) {
          setVariant(avg > 150 ? "light-bg" : "dark-bg");
          setReady(true);
        }
      } catch {
        // CORS-tainted canvas or any other sampling failure — fall
        // back to the safe default rather than throwing.
        if (!cancelled) {
          setVariant(fallback);
          setReady(true);
        }
      }
    };

    img.onerror = () => {
      if (!cancelled) {
        setVariant(fallback);
        setReady(true);
      }
    };

    return () => {
      cancelled = true;
    };
  }, [
    imageSrc,
    containerWidth,
    containerHeight,
    positionX,
    sampleHeight,
    fallback,
  ]);

  return { variant, ready };
}
