import Image from "next/image";
import Link from "next/link";

type HeroSlide = {
  id: string;
  topImage: string;
  bottomImage: string;
  labelImage: string;
  labelAlt: string;
};

const slides: HeroSlide[] = [
  {
    id: "projects-shots",
    topImage: "/assets/hero-a.png",
    bottomImage: "/assets/hero-b.png",
    labelImage: "/assets/test.svg",
    labelAlt: "Projects & Shots",
  },
];

const TOP_IMAGE = { width: 418, height: 593 } as const;
const BOTTOM_IMAGE = { width: 872, height: 581 } as const;
const LABEL = { width: 273, height: 64 } as const;

const IMAGE_GAP = 20;
const BOTTOM_LEFT_OFFSET = 77;

const BRIDGE_LEFT_OFFSET = -10;

export default function HeroSlider() {
  const slide = slides[0];
  const bottomTop = TOP_IMAGE.height + IMAGE_GAP;
  const bridgeTop = bottomTop - LABEL.height + 15;
  const sectionWidth = BOTTOM_LEFT_OFFSET + BOTTOM_IMAGE.width;
  const sectionHeight = bottomTop + BOTTOM_IMAGE.height;

  return (
    <section
      className="relative ml-56 shrink-0 overflow-hidden"
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
          src={slide.topImage}
          alt="projects&shots"
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
          src={slide.bottomImage}
          alt="projects&shots"
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
          src={slide.labelImage}
          alt={slide.labelAlt}
          width={LABEL.width}
          height={LABEL.height}
          priority
        />
      </Link>
    </section>
  );
}
