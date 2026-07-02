"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const AUTOPLAY_DELAY_MS = 200;

const categoryImages: {
  id: number;
  alt: string;
  image: string;
  width: number;
  height: number;
  rotate: number;
}[] = [
  {
    id: 1,
    alt: "beret",
    image: "/assets/beret.png",
    width: 75,
    height: 118,
    rotate: 3,
  },
  {
    id: 2,
    alt: "nike",
    image: "/assets/hero-b.png",
    width: 137,
    height: 84,
    rotate: 6,
  },
  {
    id: 3,
    alt: "70's hype",
    image: "/assets/slide-c.png",
    width: 140,
    height: 86,
    rotate: -6,
  },
];

const TOTAL_STEPS = categoryImages.length + 1;
const REVEAL_STEP = categoryImages.length;

export default function SeyiAnimationSlide() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % TOTAL_STEPS);
    }, AUTOPLAY_DELAY_MS);
    return () => clearInterval(interval);
  }, []);

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

        {stack.map(({ id, alt, image, width, height, rotate }) => (
          <div
            key={id}
            style={{
              width: `${width}px`,
              height: `${height}px`,
              transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
            }}
            className="absolute top-1/2 left-1/2 overflow-hidden"
          >
            <Image
              src={image}
              alt={alt}
              width={width}
              height={height}
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
