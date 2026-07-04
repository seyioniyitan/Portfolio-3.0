"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { animationSliderQuery } from "../lib/queries";
import { animationSliderData } from "@/types";

const AUTOPLAY_DELAY_MS = 200;

export default function SeyiAnimationSlide() {
  const [step, setStep] = useState(0);
  const [categoryImages, setCategoryImages] = useState<animationSliderData[]>(
    [],
  );

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data: animationSliderData[] = await client.fetch(
          animationSliderQuery,
          {},
          { cache: "force-cache" },
        );

        setCategoryImages(data);
      } catch (error) {
        console.error("Failed to fetch animation slides:", error);
      }
    };

    fetchSlides();
  }, []);

  const TOTAL_STEPS = categoryImages.length + 1;
  const REVEAL_STEP = categoryImages.length;

  useEffect(() => {
    if (!categoryImages.length) return;

    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % TOTAL_STEPS);
    }, AUTOPLAY_DELAY_MS);

    return () => clearInterval(interval);
  }, [categoryImages.length, TOTAL_STEPS]);

  const isReveal = step === REVEAL_STEP;
  const stack = isReveal ? [] : categoryImages.slice(0, step + 1);

  return (
    <div className="flex items-center">
      <div className="mr-3 flex h-7.5 items-center justify-center rounded-[34.5px] border-[0.9px] border-black">
        <span className="px-3 py-[3px] text-[16.5px] leading-6 font-medium tracking-[0%] text-black">
          ON
        </span>
      </div>

      <div className="relative h-[75px] w-[152px]">
        <Image
          src="/assets/seyi-name.svg"
          width={152}
          height={75}
          alt="seyi_name"
          className="object-cover"
        />

        {stack.map(({ _id, image, width, height, rotate }) => (
          <div
            key={_id}
            style={{
              width: `${width}px`,
              height: `${height}px`,
              transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
            }}
            className="absolute top-1/2 left-1/2 overflow-hidden"
          >
            <Image
              src={image ? urlFor(image).url() : "/assets/a.jpg"}
              alt={image?.alt ?? "slide-image"}
              width={width}
              height={height}
              unoptimized
              style={{
                width: `${width}px`,
                height: `${height}px`,
              }}
              className="max-w-none -scale-x-100 object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex h-7.5 items-center justify-center rounded-[34.5px] border-[0.9px] border-black">
        <span className="px-3 py-[3px] text-[16.5px] leading-6 font-medium tracking-[0%] text-black">
          DESIGN™
        </span>
      </div>
    </div>
  );
}
