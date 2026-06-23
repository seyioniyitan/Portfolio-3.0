"use client";
import CategorySlide from "@/app/components/category-slide";
import EmailWithCopy from "@/app/components/email-with-copy";
import HeroSlider from "@/app/components/hero-slider";
import LoadingScreen from "@/app/components/loading-screen";
import RecentWork from "@/app/components/recent-work";
import WorkTogetherLink from "@/app/components/work-together-link";
import { useThemeState } from "@/app/hooks/use-theme-state";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "@/app/components/header";
import { HomePageData } from "@/types";
import ProjectShotsSvg from "./svgs/projects-shots-svg";

export default function HomePage({ data }: { data: HomePageData }) {
  const { hero, projects } = data;

  const [done, setDone] = useState(false);
  const { resolvedTheme, mounted } = useThemeState();

  const base =
    "flex h-5 items-center justify-center rounded-[23px] px-2 py-0.5 text-[11px] leading-4 font-medium uppercase antialiased transition-colors duration-200";

  const lightStyle = `
    border-[0.6px] border-black
    hover:bg-black hover:text-white
  `;

  const darkStyle = `
    border-[0.6px] border-white
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
        <section className="mt-[75px] flex items-start md:mt-0">
          <div className="md:shrink-0 md:pt-[104px]">
            <div className="mb-5 px-4 md:mb-0 md:px-0 md:pl-6">
              <div className="mt-10 w-full md:mt-13 md:w-[443px]">
                <h2 className="text h-[138px] indent-16 font-normal md:h-[115px] md:indent-20">
                  <span className="underline decoration-1 underline-offset-[17%]">
                    Seyi Oniyitan
                  </span>{" "}
                  | {hero?.headline}
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
                <HeroSlider mobile />
              </div>
            </div>

            <RecentWork />
            <div className="md:pb-10 md:pl-6">
              <div className="hidden md:block">
                <CategorySlide />
              </div>
              <div className="mt-[188px] md:hidden">
                <CategorySlide mobile />
              </div>
              <p className="mt-6 hidden text-[14px] leading-[150%] font-normal tracking-[0%] md:block">
                ©2026 All rights reserved.
              </p>
            </div>
          </div>

          <div className="hidden min-w-0 flex-1 overflow-hidden pt-5 md:block">
            <HeroSlider />
          </div>
        </section>
      </div>
    </>
  );
}
