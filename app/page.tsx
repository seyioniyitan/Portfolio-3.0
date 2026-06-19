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

export default function Home() {
  const [done, setDone] = useState(false);

  return (
    <>
      {!done && <LoadingScreen onComplete={() => setDone(true)} />}
      <div className="relative overflow-hidden">
        <div className="hidden md:block">
          <Header />
        </div>
        <div className="md:hidden">
          <MobileHeader />
        </div>
        <section className="flex items-start">
          <div className="md:shrink-0 md:pt-[104px]">
            <div className="px-4 md:px-0 md:pl-6">
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

            <RecentWork />
            <div className="md:pb-10 md:pl-6">
              <CategorySlide mobile />
              <p className="mt-6 hidden text-[14px] leading-[150%] font-normal tracking-[0%] md:block">
                ©2026 All rights reserved.
              </p>
            </div>
          </div>

          <div className="min-w-0 flex-1 overflow-hidden pt-5">
            <HeroSlider />
          </div>
        </section>
      </div>
    </>
  );
}
