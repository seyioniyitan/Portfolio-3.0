import { ReactLenis } from "lenis/react";
import Header from "@/app/components/header";
import RecentWork from "@/app/components/recent-work";
import WorkTogetherLink from "@/app/components/work-together-link";
import EmailWithCopy from "@/app/components/email-with-copy";
import CategorySlide from "@/app/components/category-slide";

export default function Home() {
  return (
    <div>
      <ReactLenis
        root
        options={{ lerp: 0.1, duration: 1, smoothWheel: true }}
      />
      <Header />

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
  );
}
