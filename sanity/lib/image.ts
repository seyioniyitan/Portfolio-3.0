import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

/** Raw builder — use when you need full control over the transformation chain. */
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

// ---------------------------------------------------------------------------
// Typed options
// ---------------------------------------------------------------------------

export interface SanityImageOptions {
  /**
   * Maximum width in pixels. The image will never be upscaled beyond its
   * original size (fit: 'max').
   */
  width?: number
  /**
   * Maximum height in pixels. Applied in addition to (or instead of) width.
   */
  height?: number
  /**
   * Compression quality, 0–100. Defaults to 80.
   */
  quality?: number
}

const DEFAULT_QUALITY = 80

// ---------------------------------------------------------------------------
// Core helper
// ---------------------------------------------------------------------------

/**
 * Builds an optimised Sanity image URL with sensible defaults:
 *  - `auto('format')` — serves WebP/AVIF where the browser supports it
 *  - `fit('max')`     — never upscales beyond the source dimensions
 *  - quality 80       — good visual fidelity at roughly half the file size
 *
 * Only pass what differs per use-case (width, height, quality).
 *
 * @example
 *   buildSanityImageUrl(image.asset, { width: 400 })
 *   // → https://cdn.sanity.io/images/…?w=400&auto=format&fit=max&q=80
 */
export function buildSanityImageUrl(
  source: SanityImageSource,
  options: SanityImageOptions = {},
): string {
  const { width, height, quality = DEFAULT_QUALITY } = options

  let img = urlFor(source).auto('format').fit('max').quality(quality)

  if (width) img = img.width(width)
  if (height) img = img.height(height)

  return img.url()
}

// ---------------------------------------------------------------------------
// Preset helpers — named for their use-case so call-sites stay self-documenting
// ---------------------------------------------------------------------------

/**
 * Hero slider — top slot (418 × 593 px rendered, 2× for HiDPI).
 */
export const heroTopImageUrl = (source: SanityImageSource) =>
  buildSanityImageUrl(source, { width: 836 })

/**
 * Hero slider — bottom slot (872 × 581 px rendered, 2× for HiDPI).
 */
export const heroBottomImageUrl = (source: SanityImageSource) =>
  buildSanityImageUrl(source, { width: 1744 })

/**
 * Hero slider — mobile (half of a ~390 px viewport, 2× for HiDPI).
 */
export const heroMobileImageUrl = (source: SanityImageSource) =>
  buildSanityImageUrl(source, { width: 420 })

/**
 * Project shots bento grid cell (≈ 33 vw on desktop, 50 vw on mobile).
 */
export const bentoImageUrl = (source: SanityImageSource) =>
  buildSanityImageUrl(source, { width: 800 })

/**
 * Recent-work row thumbnail (70 × 70 px rendered, 2× for HiDPI).
 */
export const thumbnailImageUrl = (source: SanityImageSource) =>
  buildSanityImageUrl(source, { width: 140 })

/**
 * Case-studies card (up to 50 vw / 458 px tall on desktop).
 */
export const caseStudyImageUrl = (source: SanityImageSource) =>
  buildSanityImageUrl(source, { width: 900 })

/**
 * About page — first portrait slot (296 px wide on desktop, half-vw on mobile).
 */
export const aboutImageOneUrl = (source: SanityImageSource) =>
  buildSanityImageUrl(source, { width: 600 })

/**
 * About page — second portrait slot (470 px wide on desktop, half-vw on mobile).
 */
export const aboutImageTwoUrl = (source: SanityImageSource) =>
  buildSanityImageUrl(source, { width: 940 })

/**
 * Project detail background image (full-width panel, capped at 1400 px).
 */
export const projectDetailImageUrl = (source: SanityImageSource) =>
  buildSanityImageUrl(source, { width: 1400 })

