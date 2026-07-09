"use client";
import Link from "next/link";
import { useState } from "react";
import CategorySlide from "@/app/components/category-slide";
import EmailWithCopy from "@/app/components/email-with-copy";
import Header from "@/app/components/header";
import HeroSlider from "@/app/components/hero-slider";
import LoadingScreen from "@/app/components/loading-screen";
import RecentWork from "@/app/components/recent-work";
import WorkTogetherLink from "@/app/components/work-together-link";
import ProjectShotsSvg from "@/app/components/svgs/projects-shots-svg";
import { useThemeState } from "@/app/hooks/use-theme-state";
import { HomePageData, ProjectShot, RecentWorkData } from "@/types";
import BottomSheet from "@/app/components/bottom-sheet";
import { useMobileMenu } from "../context/mobile-menu-context";

export default function HomePage({
  data,
  projectShots,
  recentWork,
}: {
  data: HomePageData;
  projectShots: ProjectShot[];
  recentWork: RecentWorkData[];
}) {
  const { hero } = data;

  const [done, setDone] = useState(false);
  const { resolvedTheme, mounted } = useThemeState();
  const { open: menuOpen } = useMobileMenu();

  const base =
    "flex h-[25px] px-3 py-1 lg:h-5 items-center justify-center rounded-[23px] lg:px-2 lg:py-0.5 text-[13px] lg:text-[11px] leading-4 font-medium uppercase antialiased ";

  const lightStyle = `
    border-[0.8px] border-black
    hover:bg-black hover:text-white
  `;

  const darkStyle = `
    border-[0.8px] border-white
    hover:bg-white hover:text-black
  `;

  const className =
    mounted && resolvedTheme === "dark"
      ? `${base} ${darkStyle}`
      : `${base} ${lightStyle}`;

  return (
    <>
      {!done && <LoadingScreen onComplete={() => setDone(true)} />}
      <div className="relative overflow-hidden">
        <Header />
        <section className="mt-[75px] flex items-start lg:mt-0">
          <div className="md:shrink-0 md:pt-[104px]">
            <div className="mb-5 px-4 md:mb-0 md:px-0 md:pl-6">
              <div className="mt-10 w-full md:mt-13 md:w-[443px]">
                <h2 className="text mb-4 indent-16 font-normal md:indent-17.5">
                  <span className="underline decoration-1 underline-offset-[20%]">
                    Seyi Oniyitan
                  </span>{" "}
                  | {hero?.headline}
                </h2>
                <h2 className="text mb-4 font-normal">
                  {hero?.secondHeadline}
                </h2>
              </div>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-5">
                <WorkTogetherLink />
                <EmailWithCopy />
              </div>
            </div>

            <div className="md:hidden">
              <div className="mt-s2 mr-4 ml-2 flex h-[45px] items-center justify-between">
                <div>
                  <ProjectShotsSvg />
                </div>
                <Link href="/project-shots" className={className}>
                  browse
                </Link>
              </div>
              <div className="mt-4.5 overflow-x-hidden">
                <HeroSlider mobile projectShots={projectShots} />
              </div>
            </div>

            <RecentWork recentWork={recentWork} />
            <div className="pointer-events-auto md:pb-10 md:pl-6">
              <div className="mt-10.5 ml-4 lg:mt-0 lg:ml-0">
                <CategorySlide />
                <p className="mt-6 text-[14px] leading-[150%] font-normal tracking-[0%]">
                  ©2026 Seyi Oniyitan. All rights reserved.
                </p>
              </div>

              <div className={`${menuOpen ? "mt-2" : "mt-[188px]"} lg:hidden`}>
                <BottomSheet />
              </div>
            </div>
          </div>

          <div className="hidden min-w-0 flex-1 md:block" aria-hidden="true" />

          <div className="fixed top-0 right-0 hidden h-screen w-[calc(100%-443px)] overflow-hidden py-5 md:block">
            <HeroSlider projectShots={projectShots} />
          </div>
        </section>
      </div>
    </>
  );
}
