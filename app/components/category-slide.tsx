"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";

const TWEEN_FACTOR_BASE = 0.84;
const AUTOPLAY_DELAY_MS = 2000;
const SLIDE_GAP_PX = 32;

const categoryImages: { id: number; alt: string; image: string }[] = [
  { id: 1, alt: "Product", image: "/assets/product.svg" },
  { id: 2, alt: "3d", image: "/assets/3d.svg" },
  { id: 3, alt: "Visual", image: "/assets/visual.svg" },
  { id: 4, alt: "Industrial", image: "/assets/industrial.svg" },
  { id: 5, alt: "Brand", image: "/assets/brand.svg" },
];

export default function CategorySlide() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    duration: 28,
  });
  const tweenFactor = useRef(0);
  const [tweenValues, setTweenValues] = useState<number[]>([]);

  const setTweenFactor = useCallback((api: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length;
  }, []);

  const onScroll = useCallback((api: EmblaCarouselType) => {
    const engine = api.internalEngine();
    const scrollProgress = api.scrollProgress();

    const styles = api.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }

      return diffToTarget * (-1 * tweenFactor.current);
    });

    setTweenValues(styles);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenFactor(emblaApi);
    onScroll(emblaApi);

    emblaApi
      .on("reInit", setTweenFactor)
      .on("reInit", onScroll)
      .on("scroll", onScroll);

    return () => {
      emblaApi
        .off("reInit", setTweenFactor)
        .off("reInit", onScroll)
        .off("scroll", onScroll);
    };
  }, [emblaApi, onScroll, setTweenFactor]);

  useEffect(() => {
    if (!emblaApi) return;

    let interval: ReturnType<typeof setInterval> | null = null;

    const startAutoplay = () => {
      stopAutoplay();
      interval = setInterval(() => emblaApi.scrollNext(), AUTOPLAY_DELAY_MS);
    };

    const stopAutoplay = () => {
      if (interval) clearInterval(interval);
      interval = null;
    };

    startAutoplay();

    emblaApi.on("pointerDown", stopAutoplay);
    emblaApi.on("pointerUp", startAutoplay);

    return () => {
      stopAutoplay();
      emblaApi.off("pointerDown", stopAutoplay);
      emblaApi.off("pointerUp", startAutoplay);
    };
  }, [emblaApi]);

  return (
    <div className="flex h-11 items-center gap-3">
      <div className="flex h-5 w-[33px] items-center justify-center rounded-[23px] border-[0.6px] border-black px-2 py-0.5 text-[11px] leading-4 font-medium tracking-[0%] uppercase">
        on
      </div>

      <div className="w-[120px] overflow-hidden" ref={emblaRef}>
        <div
          className="flex touch-pan-y"
          style={{ marginLeft: `-${SLIDE_GAP_PX}px` }}
        >
          {categoryImages.map(({ id, alt, image }, index) => (
            <div
              key={id}
              className="min-w-0 flex-[0_0_100%]"
              style={{ paddingLeft: `${SLIDE_GAP_PX}px` }}
            >
              <div className="overflow-hidden">
                <div
                  className="flex items-center justify-center will-change-transform"
                  style={{
                    ...(tweenValues.length > 0 && {
                      transform: `translate3d(${tweenValues[index]}%,0px,0px)`,
                    }),
                  }}
                >
                  <Image src={image} alt={alt} width={120} height={63} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex h-5 w-16 items-center justify-center rounded-[23px] border-[0.6px] border-black px-2 py-0.5 text-[11px] leading-4 font-medium tracking-[0%]">
        DESIGN™
      </div>
    </div>
  );
}
