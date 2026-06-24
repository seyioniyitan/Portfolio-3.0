"use client";

import ContactModal from "@/app/components/contact-modal";
import Header from "@/app/components/header";
import WorkTogetherLink from "@/app/components/work-together-link";
import { caseStudyData } from "@/app/lib/project-data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CategorySlide from "../components/category-slide";

export default function ProjectShots() {
  const [activeView, setActiveView] = useState<
    "case-studies" | "project-shots"
  >("case-studies");

  return (
    <section>
      <Header variant="project-shots" />

      <div className="relative pb-20 md:mt-0">
        <div className="flex items-center justify-between px-4 lg:px-6">
          <div className="flex w-full items-center justify-between gap-2 pt-6 md:w-auto md:justify-normal md:pt-7 lg:gap-3">
            {shuffleButtons.map(({ title, view }, index) => (
              <button
                key={index}
                onClick={() => view && setActiveView(view)}
                className={`h-[25px] rounded-[23px] border-[0.4px] px-3 py-1 text-[13px] leading-4 font-medium tracking-[0%] uppercase ${
                  view === activeView ? "bg-black text-white" : ""
                } ${!view ? "opacity-60" : ""}`}
              >
                {title}
              </button>
            ))}
          </div>
          <div className="hidden md:block">
            <WorkTogetherLink />
          </div>
        </div>

        {activeView === "case-studies" ? <CaseStudies /> : <ProjectShotsGrid />}
        <div className="fixed bottom-7 hidden px-6 lg:block">
          <ContactModal />
        </div>
      </div>
    </section>
  );
}

const shuffleButtons: {
  id: number;
  title: string;
  view?: "case-studies" | "project-shots";
}[] = [
  { id: 1, title: "case studies", view: "case-studies" },
  { id: 2, title: "project shots ", view: "project-shots" },
  { id: 3, title: "shuffle" },
];

const ProjectShotsGrid = () => {
  return (
    <>
      {/* Desktop */}
      <div className="hidden auto-rows-[280px] grid-cols-6 gap-4 px-6 pt-10 md:grid">
        <BentoImage
          src="/assets/hero-a.png"
          className="col-span-2 row-span-2"
        />
        <BentoImage src="/assets/hero-b.png" className="col-span-2" />
        <div className="col-span-2 row-span-3 flex min-h-0 flex-col gap-5">
          <BentoImage
            src="/assets/hero-a.png"
            className="h-[370px] flex-none"
          />
          <BentoImage
            src="/assets/hero-b.png"
            className="h-[350px] flex-none"
          />
        </div>
        <BentoImage src="/assets/hero-b.png" className="col-span-2" />
        <BentoImage src="/assets/hero-a.png" className="col-span-3 h-[350px]" />
      </div>

      {/* Mobile */}

      <div className="lg:hidden">
        <div className="row-span-3 grid grid-cols-2 gap-2 px-4 pt-6">
          <BentoImage
            src="/assets/hero-a.png"
            className="col-span-1 row-span-2 h-full"
          />

          <BentoImage
            src="/assets/hero-b.png"
            className="col-span-1 row-span-1 h-[137px]"
          />

          <BentoImage
            src="/assets/hero-a.png"
            className="col-span-1 h-[155px]"
          />

          <BentoImage
            src="/assets/hero-a.png"
            className="col-span-1 h-[260px]"
          />

          <BentoImage
            src="/assets/hero-b.png"
            className="col-span-1 h-[230px]"
          />
        </div>
        <CategorySlide mobile />
      </div>
    </>
  );
};

const BentoImage = ({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) => (
  <div className={`relative min-h-0 overflow-hidden ${className}`}>
    <Image src={src} alt="" fill className="object-cover" sizes="33vw" />
  </div>
);

const CaseStudies = () => {
  return (
    <div className="grid grid-cols-1 gap-4 p-6 lg:grid-cols-2">
      {caseStudyData.map((study, index) => (
        <Link
          href={`/project-detail/${study.id}`}
          key={`${study.title}-${index}`}
          className="space-y-4"
        >
          <div className="relative h-[242px] overflow-hidden lg:h-[458px]">
            <Image
              src={study.image}
              alt={study.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="mb-7 flex h-[87px] flex-col items-center justify-center gap-4 pr-4 pl-2 md:justify-between lg:mb-0 lg:h-[46px] lg:flex-row">
            <div>
              <h3 className="text text-center lg:text-left">{study.title}</h3>
              <p className="text text-[#8E8E93]">{study.role}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {study.tag.map((item) => (
                <span
                  key={item}
                  className="flex h-[25px] items-center justify-center rounded-[23px] border-[0.4px] border-black px-3 py-1 text-[13px] leading-4 font-medium tracking-[0%] uppercase"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export const menuLinks: { label: string; href: string }[] = [
  {
    label: "Shop",
    href: "/",
  },
  {
    label: "Articles",
    href: "/articles",
  },
  {
    label: "About",
    href: "/about",
  },
];
