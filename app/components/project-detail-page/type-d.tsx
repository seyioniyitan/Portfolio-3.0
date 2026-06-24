"use client";
import CategorySlide from "@/app/components/category-slide";
import {
  ProjectShotsHeaderLeft,
  ProjectShotsHeaderRight,
} from "@/app/components/project-detail-page/project-detail-headers";
import WorkTogetherLink from "@/app/components/work-together-link";
import { useThemeState } from "@/app/hooks/use-theme-state";
import Link from "next/link";
import Header from "../header";

export default function TypeD() {
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
    <section>
      <div className="hidden min-h-screen lg:flex">
        <div className="flex w-[60%] flex-col">
          <ProjectShotsHeaderLeft />

          <div className="flex flex-1 items-start gap-12 px-6 pt-[53px]">
            <div className="w-[185px] shrink-0">
              <h2 className="text font-normal">
                Placeholder Type D Project Detail
              </h2>
              <p className="text font-normal text-[#8E8E93]">
                Project type D details
              </p>
            </div>

            <div className="w-[444px]">
              <h2 className="text indent-20 font-normal">
                This is a placeholder layout for type D projects. Replace the
                right-side image block with the correct project visuals after
                copying this stub.
              </h2>
              <h2 className="text mt-6 indent-20 font-normal">
                Use this area to describe the project, highlight the role, and
                explain the design direction. The image grid on the right will
                be the only visible difference compared to other type layouts.
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

        <div
          className="flex flex-1 flex-col bg-[#232323]"
          style={{
            backgroundImage: "url('/assets/type-d/a.png')",
            backgroundSize: "cover",
            backgroundPosition: "-166px center",
          }}
        >
          <ProjectShotsHeaderRight />
        </div>
      </div>

      <div
        className="h-screen lg:hidden"
        style={{
          backgroundImage: "url('/assets/type-d/a.png')",
          backgroundSize: "cover",
          backgroundPosition: "-110.2px center",
        }}
      >
        <Header showReturnButton />

        {/* <div className="mx-4 max-h-[calc(100vh-18rem)] overflow-y-auto px-2 py-6">
          <h2 className="text font-normal">
            Grey 3D Design System & Migration to Blender
          </h2>
          <p className="text font-normal text-[#8E8E93]">
            Generalist & 3D Design
          </p>
        </div> */}
        <div className="mx-4 px-2 py-6 pt-[75px]">
          <h2 className="text font-normal">
            Grey 3D Design System & Migration to Blender
          </h2>
          <p className="text font-normal text-[#8E8E93]">
            Generalist & 3D Design
          </p>
        </div>

        <div className="mt-[158px]">
          <CategorySlide mobile />
        </div>
      </div>
    </section>
  );
}
