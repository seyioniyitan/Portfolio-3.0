"use client";
import Image from "next/image";
import CategorySlide from "@/app/components/category-slide";
import { useThemeState } from "@/app/hooks/use-theme-state";
import Link from "next/link";
import ThemeToggle from "@/app/components/theme-toggle";
import WorkTogetherLink from "@/app/components/work-together-link";
import {
  ProjectShotsHeaderLeft,
  ProjectShotsHeaderRight,
} from "@/app/components/project-detail-page/project-detail-headers";

const projectImages = [
  { src: "/assets/p-d.png", alt: "Placeholder", width: 265, height: 265 },
  { src: "/assets/p-a.png", alt: "Placeholder", width: 271, height: 271 },
  { src: "/assets/p-b.png", alt: "Placeholder", width: 250, height: 250 },
  { src: "/assets/p-c.png", alt: "Placeholder", width: 250, height: 249 },
];

export default function TypeE() {
  const { resolvedTheme, mounted } = useThemeState();

  const lightStyle = `border border-black hover:bg-black hover:text-white`;
  const darkStyle = `border border-white hover:bg-white hover:text-black`;
  const base =
    "flex h-[25px] items-center justify-center rounded-[23px] px-3 py-1 text-[13px] leading-4 font-medium uppercase antialiased transition-colors duration-200";

  const className =
    mounted && resolvedTheme === "dark"
      ? `${base} ${darkStyle}`
      : `${base} ${lightStyle}`;

  return (
    <section className="flex min-h-screen">
      <div className="flex w-[60%] flex-col">
        <ProjectShotsHeaderLeft />

        <div className="flex flex-1 items-start gap-12 px-6 pt-[53px]">
          <div className="w-[185px] shrink-0">
            <h2 className="text h-11.5 font-normal">
              Placeholder Type E Project Detail
            </h2>
            <p className="text h-[23px] font-normal text-[#8E8E93]">
              Project type E details
            </p>
          </div>

          <div className="w-[444px]">
            <h2 className="text indent-20 font-normal">
              This is a placeholder layout for type E projects. Replace the
              right-side image block with the correct project visuals after
              copying this stub.
            </h2>
            <h2 className="text mt-6 indent-20 font-normal">
              Use this area to describe the project, highlight the role, and
              explain the design direction. The image grid on the right will be
              the only visible difference compared to other type layouts.
            </h2>
            <h2 className="text my-6 font-normal">
              Send an email to learn more about this project.
            </h2>
            <WorkTogetherLink />

            <div className="mt-8 flex items-center gap-2">
              <Link href="/" className={className}>
                open website
              </Link>
              <Link href="/" className={className}>
                open behance
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-[211px] mb-[45px] ml-6">
          <CategorySlide />
          <p className="mt-6 text-[14px] leading-[150%] font-normal tracking-[0%]">
            ©2026 All rights reserved.
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col bg-[#232323]">
        <ProjectShotsHeaderRight />

        <div className="mt-30 grid grid-cols-2">
          {projectImages.map(({ alt, src, width, height }, index) => (
            <Image
              key={index}
              alt={alt}
              src={src}
              width={width}
              height={height}
              className="mb-25 object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
