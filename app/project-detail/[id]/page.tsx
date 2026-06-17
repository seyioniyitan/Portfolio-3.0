import CategorySlide from "@/app/components/category-slide";
import Header from "@/app/components/header";
import Image from "next/image";

const projectImages = [
  { src: "/assets/heart.png", alt: "Heart icon", width: 110, height: 110 },
  { src: "/assets/oval.png", alt: "Coin icon", width: 104, height: 100 },
  {
    src: "/assets/mag.png",
    alt: "Magnifying glass icon",
    width: 90,
    height: 90,
  },
];

export default function ProjectDetail() {
  return (
    <section className="flex min-h-screen">
      <div className="flex w-1/2 items-center justify-center bg-[#007AFF]">
        <CategorySlide />
      </div>

      <div className="flex w-1/2 flex-col">
        <Header variant="minimal" showReturnButton />

        <div className="flex items-center justify-center gap-16 px-6 pt-16">
          {projectImages.map((image) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="object-contain"
            />
          ))}
        </div>

        <div className="flex flex-1 items-start gap-12 px-6 pt-20">
          <div className="w-[185px] shrink-0">
            <h2 className="text h-11.5 font-normal">
              Grey 3D Design System &amp; Migration to Blender
            </h2>
            <p className="text h-[23px] font-normal text-[#8E8E93]">
              Generalist &amp; 3D Design
            </p>
          </div>

          <div className="w-[447px]">
            <h2 className="text indent-20 font-normal">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas.
            </h2>
            <h2 className="text mt-8 indent-20 font-normal">
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem.
            </h2>
          </div>
        </div>

        <p className="px-6 pb-10 text-right text-[14px] leading-[150%] font-normal tracking-[0%]">
          ©2026 Seyi Oniyitan. All rights reserved.
        </p>
      </div>
    </section>
  );
}
