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
  {
    src: "/assets/type-c/a.svg",
    alt: "Placeholder",
    width: 231,
    height: 222,
    margin: 114,
  },
  {
    src: "/assets/type-c/b.svg",
    alt: "Placeholder",
    width: 230,
    height: 230,
    margin: 66,
  },
  { src: "/assets/type-c/c.svg", alt: "Placeholder", width: 402, height: 270 },
];

export default function TypeC() {
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
            <h2 className="text font-normal">title mobile</h2>
            <p className="text font-normal text-[#8E8E93]">subtitle mobile</p>
          </div>

          <div className="w-[444px]">
            <h2 className="text indent-17.5 font-normal">
              This project detail is now rendered from the fetched Sanity data.
            </h2>
            <h2 className="text mt-6 indent-17.5 font-normal">link</h2>
            <h2 className="text my-6 font-normal">
              Send an email to learn more about this project.
            </h2>
            <WorkTogetherLink />
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

        <div className="mx-auto mt-[57px] flex w-fit flex-col items-center">
          {projectImages.map(({ alt, src, width, height, margin }, index) => (
            <Image
              key={index}
              alt={alt}
              src={src}
              width={width}
              height={height}
              className="object-cover"
              style={margin ? { marginBottom: `${margin}px` } : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
