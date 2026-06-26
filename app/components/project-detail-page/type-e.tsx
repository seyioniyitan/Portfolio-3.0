"use client";
import CategorySlide from "@/app/components/category-slide";
import {
  ProjectShotsHeaderLeft,
  ProjectShotsHeaderRight,
} from "@/app/components/project-detail-page/project-detail-headers";
import WorkTogetherLink from "@/app/components/work-together-link";
import { useThemeState } from "@/app/hooks/use-theme-state";
import Link from "next/link";
import Header from "@/app/components/header";

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
    <section>
      <div className="hidden min-h-screen lg:flex">
        <div className="flex w-[60%] flex-col">
          <ProjectShotsHeaderLeft />

          <div className="flex flex-1 items-start gap-12 px-6 pt-[53px]">
            <div className="w-[185px] shrink-0">
              <h2 className="text font-normal">title mobile</h2>
              <p className="text font-normal text-[#8E8E93]">subtitle</p>
            </div>

            <div className="w-[444px]">
              <h2 className="text indent-17.5 font-normal">
                This project detail is now rendered from the fetched Sanity
                data.
              </h2>
              <h2 className="text mt-6 indent-17.5 font-normal">
                content here too
              </h2>
              <h2 className="text my-6 font-normal">
                Send an email to learn more about this project.
              </h2>
              <WorkTogetherLink />

              <div className="mt-8 flex items-center gap-2">
                website link here
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
            backgroundImage: "url('/assets/type-e.svg')",
            backgroundSize: "cover",
            backgroundPosition: "left 848px",
          }}
        >
          <ProjectShotsHeaderRight />
        </div>
      </div>

      {/* Mobile */}
      <div className="relative lg:hidden">
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: "url('/assets/type-e.svg')",
            backgroundSize: "cover",
            backgroundPosition: "left 848px",
          }}
        />

        <div
          className="fixed top-0 left-0 z-10 w-full"
          style={{ height: "100px" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              maskImage:
                "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              maskImage:
                "linear-gradient(to bottom, transparent 30%, black 50%, transparent 90%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 30%, black 50%, transparent 90%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              maskImage:
                "linear-gradient(to bottom, transparent 60%, black 80%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 60%, black 80%, transparent 100%)",
            }}
          />
        </div>

        <div className="fixed top-0 left-0 z-20 w-full pt-6">
          <Header showReturnButton backgroundImage />
        </div>

        <div className="h-[60vh]" />

        <div className="relative z-0 mx-4 mb-40 bg-white px-4 py-6 [transition:background-color_0.3s_ease-in-out,color_0.1s_ease-in-out] dark:bg-[#232323]">
          <div className="mx-auto w-[209px]">
            <h2 className="text font-normal">title mobile</h2>
            <p className="text font-normal text-[#8E8E93]">subtitle mobile</p>
          </div>

          <div className="mt-6">
            <h2 className="text font-normal">
              This project detail is now rendered from the fetched Sanity data.
            </h2>
            <h2 className="text mt-6 font-normal">link</h2>
            <h2 className="text my-6 font-normal">
              Send an email to learn more about this project.
            </h2>
            <WorkTogetherLink />

            <div className="mt-8 flex items-center gap-2">
              website
              <Link href="/" className={`${className} flex-1`}>
                open behance
              </Link>
            </div>
          </div>

          <div className="mt-4 flex h-32 flex-col justify-center">
            <CategorySlide />
            <p className="mt-6 text-[14px] leading-[150%] font-normal tracking-[0%]">
              ©2026 All rights reserved.
            </p>
          </div>
        </div>

        <div className="pb-10">
          <CategorySlide mobile />
        </div>
      </div>
    </section>
  );
}
