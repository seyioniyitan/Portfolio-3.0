"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import WorkTogetherLink from "@/app/components/work-together-link";
import ContactModal from "@/app/components/contact-modal";
import ThemeToggle from "@/app/components/theme-toggle";
import { useThemeState } from "@/app/hooks/use-theme-state";
import Header from "@/app/components/header";

export default function ProjectShots() {
  const [activeView, setActiveView] = useState<
    "case-studies" | "project-shots"
  >("project-shots");

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

        {activeView === "project-shots" ? (
          <ProjectShotsGrid />
        ) : (
          <CaseStudies />
        )}
        <div className="fixed bottom-7 px-6">
          <ContactModal />
        </div>
      </div>
    </section>
  );
}

export const ProjectShotsHeader = () => {
  const { resolvedTheme, mounted } = useThemeState();
  const imageSrc =
    mounted && resolvedTheme === "dark"
      ? "/assets/prjsht-dark.svg"
      : "/assets/prjsht-light.svg";

  const lightStyle = `border border-black hover:bg-black hover:text-white`;

  const darkStyle = `border border-white hover:bg-white hover:text-black`;
  const base =
    "flex h-[25px] items-center justify-center rounded-[23px] px-3 py-1 text-[13px] leading-4 font-medium uppercase antialiased transition-colors duration-200";

  const className =
    mounted && resolvedTheme === "dark"
      ? `${base} ${darkStyle}`
      : `${base} ${lightStyle}`;
  return (
    <header className="flex justify-between pr-6 pl-[15px]">
      <div className="mt-4.5 flex h-17 items-center justify-center gap-6">
        <div className="relative mt-4.5 h-[68px] w-[200px]">
          <Image src={imageSrc} alt="projects&shots" fill />
        </div>
        <Link href="/" className={className}>
          home
        </Link>
      </div>

      <nav className="hidden gap-3 pt-10 md:flex">
        {menuLinks?.map((link, index) => (
          <Link key={index} href={link.href} className={className}>
            {link.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
};

const ProjectShotsMobileHeader = () => {
  const { resolvedTheme, mounted } = useThemeState();
  const imageSrc =
    mounted && resolvedTheme === "dark"
      ? "/assets/prjsht-dark.svg"
      : "/assets/prjsht-light.svg";

  const lightStyle = `border border-black hover:bg-black hover:text-white`;

  const darkStyle = `border border-white hover:bg-white hover:text-black`;
  const base =
    "flex h-[25px] items-center justify-center rounded-[23px] px-3 py-1 text-[13px] leading-4 font-medium uppercase antialiased transition-colors duration-200";

  const className =
    mounted && resolvedTheme === "dark"
      ? `${base} ${darkStyle}`
      : `${base} ${lightStyle}`;
  return (
    <header className="mt-6 mr-4 ml-2 flex h-[49px] items-center justify-between">
      <div className="relative mt-4.5 h-full w-[143px]">
        <Image src={imageSrc} alt="projects&shots" fill />
      </div>

      <div className="flex items-center gap-4">
        <Link href="/" className={className}>
          home
        </Link>
        <Link href="/" className={className}>
          more
        </Link>
        <ThemeToggle width={32} />
      </div>
    </header>
  );
};

const shuffleButtons: {
  id: number;
  title: string;
  view?: "case-studies" | "project-shots";
}[] = [
  { id: 1, title: "case studies", view: "case-studies" },
  { id: 2, title: "project shots ", view: "project-shots" },
  { id: 3, title: "shuffle" },
];

// const ProjectShotsGrid = () => {
//   return (
//     <div className="grid auto-rows-[280px] grid-cols-6 gap-4 px-6 pt-10">
//       <BentoImage src="/assets/hero-a.png" className="col-span-2 row-span-2" />
//       <BentoImage src="/assets/hero-b.png" className="col-span-2" />
//       <div className="col-span-2 row-span-3 flex min-h-0 flex-col gap-5">
//         <BentoImage src="/assets/hero-a.png" className="h-[370px] flex-none" />
//         <BentoImage src="/assets/hero-b.png" className="h-[350px] flex-none" />
//       </div>
//       <BentoImage src="/assets/hero-b.png" className="col-span-2" />
//       <BentoImage src="/assets/hero-a.png" className="col-span-3 h-[350px]" />
//     </div>
//   );
// };

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
      <div className="grid grid-cols-2 gap-2 px-4 pt-8 md:hidden">
        <BentoImage src="/assets/hero-a.png" className="col-span-1 h-[220px]" />
        <BentoImage src="/assets/hero-b.png" className="col-span-1 h-[220px]" />
        <BentoImage src="/assets/hero-b.png" className="col-span-2 h-[200px]" />
        <BentoImage src="/assets/hero-a.png" className="col-span-1 h-[220px]" />
        <BentoImage src="/assets/hero-b.png" className="col-span-1 h-[220px]" />
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
          href={`/project-detail/ssjska12`}
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

const caseStudyData = [
  {
    title: "Rise 3.0",
    role: "Product Design Lead",
    tag: ["Video", "App Store"],
    image: "/assets/hero-a.png",
  },
  {
    title: "Alien Ware",
    role: "Product Design Lead",
    tag: ["Website", "Case Study"],
    image: "/assets/hero-b.png",
  },
  {
    title: "Rise 3.0",
    role: "Product Design Lead",
    tag: ["Pdf", "Resume"],
    image: "/assets/hero-a.png",
  },
  {
    title: "Alien Ware",
    role: "Product Design Lead",
    tag: ["Website", "Case Study"],
    image: "/assets/hero-b.png",
  },
];

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
