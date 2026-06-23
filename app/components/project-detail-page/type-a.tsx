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

// const projectImages = [
//   { src: "/assets/p-a.png", alt: "Heart icon", width: 265, height: 265 },
//   { src: "/assets/p-b.png", alt: "Coin icon", width: 271, height: 271 },
//   {
//     src: "/assets/p-c.png",
//     alt: "Magnifying",
//     width: 250,
//     height: 250,
//   },
//   {
//     src: "/assets/p-d.png",
//     alt: "Magnifying",
//     width: 250,
//     height: 249,
//   },
// ];

export default function TypeA() {
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
              Grey 3D Design System &amp; Migration to Blender
            </h2>
            <p className="text h-[23px] font-normal text-[#8E8E93]">
              Generalist &amp; 3D Design
            </p>
          </div>

          <div className="w-[444px]">
            <h2 className="text indent-20 font-normal">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt.
            </h2>
            <h2 className="text mt-6 indent-20 font-normal">
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
              ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur? Quis autem vel eum iure reprehenderit qui in ea
              voluptate velit esse quam nihil molestiae consequatur, vel illum
              qui dolorem eum fugiat quo voluptas nulla pariatur
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

        <div className="mt-12">
          <div className="relative h-[408px] w-[593px]">
            <Image
              alt="rise"
              src="/assets/type-a/a.svg"
              fill
              className="mb-25 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
