"use client";
import CategorySlide from "@/app/components/category-slide";
import EmailWithCopy from "@/app/components/email-with-copy";
import Header from "@/app/components/header";
import RecentWork from "@/app/components/recent-work";
import WorkTogetherLink from "@/app/components/work-together-link";
import HeroSlider from "./components/hero-slider";
import LoadingScreen from "./components/loading-screen";
import { useState } from "react";
import MobileHeader from "./components/mobile-header";
import Image from "next/image";
import Link from "next/link";
import { useThemeState } from "@/app/hooks/use-theme-state";

export default function Home() {
  const [done, setDone] = useState(false);
  const { resolvedTheme, mounted } = useThemeState();
  const imageSrc =
    mounted && resolvedTheme === "dark"
      ? "/assets/prj-shots-mobile-dark.svg"
      : "/assets/prj-shots-mobile.svg";
  const base =
    "flex h-[25px] items-center justify-center rounded-[23px] px-3 py-1 text-[13px] leading-4 font-medium uppercase antialiased transition-colors duration-200";

  const lightStyle = `
    border border-black
    hover:bg-black hover:text-white
  `;

  const darkStyle = `
    border border-white
    hover:bg-white hover:text-black
  `;

  const className =
    mounted && resolvedTheme === "dark"
      ? `${base} ${darkStyle}`
      : `${base} ${lightStyle}`;

  return (
    <>
      {/* {!done && <LoadingScreen onComplete={() => setDone(true)} />} */}
      <div className="relative overflow-hidden">
        <div className="hidden md:block">
          <Header />
        </div>
        <div className="md:hidden">
          <MobileHeader />
        </div>
        <section className="flex items-start">
          <div className="md:shrink-0 md:pt-[104px]">
            <div className="mb-5 px-4 md:mb-0 md:px-0 md:pl-6">
              <div className="mt-10 w-full md:mt-13 md:w-[443px]">
                <h2 className="text h-[138px] indent-16 font-normal md:h-[115px] md:indent-20">
                  Seyi Oniyitan | Generalist designer transforming ideas into
                  products, maximising business impact and the friend of your
                  ambitious imaginations. I am transforming and defining design
                  values in the AI era.
                </h2>
              </div>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-5">
                <WorkTogetherLink />
                <EmailWithCopy />
              </div>
            </div>

            <div className="md:hidden">
              <div className="mr-4 ml-2 flex h-[45px] items-center justify-between">
                <div className="relative h-[54px] w-[156px] overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt="project_image"
                    className="h-full w-full object-cover"
                    fill
                  />
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
              <div className="md:hidden">
                <CategorySlide mobile />
              </div>
              <div className="hidden md:block">
                <CategorySlide />
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
