import { ReactLenis } from "lenis/react";
import Header from "@/app/components/header";
import RecentWork from "@/app/components/recent-work";
import WorkTogetherLink from "@/app/components/work-together-link";
import EmailWithCopy from "@/app/components/email-with-copy";
import CategorySlide from "@/app/components/category-slide";
import HeroSlider from "./components/hero-slider";

export default function Home() {
  return (
    <>
      <ReactLenis
        root
        options={{ lerp: 0.1, duration: 1, smoothWheel: true }}
      />

      <div className="relative overflow-hidden">
        <Header />
        <section className="flex items-start overflow-hidden">
          <div className="shrink-0 pt-[104px]">
            <div className="pl-6">
              <div className="w-[443px] pt-13">
                <h2 className="h-23 text-[15px] leading-[150%] font-normal tracking-[0%]">
                  Seyi Oniyitan | Generalist designer transforming ideas into
                  products, maximising business impact and the friend of your
                  ambitious imaginations.
                </h2>
              </div>
              <div className="flex items-center gap-5">
                <WorkTogetherLink />
                <EmailWithCopy />
              </div>
            </div>

            <RecentWork />
            <div className="pb-10 pl-6">
              <CategorySlide />
              <h2 className="mt-6 text-[14px] leading-[150%] font-normal tracking-[0%]">
                ©2026 All rights reserved.
              </h2>
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
