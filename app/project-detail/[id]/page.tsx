"use client";
import Image from "next/image";
import CategorySlide from "@/app/components/category-slide";
import { useThemeState } from "@/app/hooks/use-theme-state";
import Link from "next/link";
import ThemeToggle from "@/app/components/theme-toggle";
import { menuLinks } from "@/app/project-shots/page";
import WorkTogetherLink from "@/app/components/work-together-link";

const projectImages = [
  { src: "/assets/heart.png", alt: "Heart icon", width: 110, height: 110 },
  { src: "/assets/oval.png", alt: "Coin icon", width: 104, height: 100 },
  {
    src: "/assets/mag.png",
    alt: "Magnifying glass icon",
    width: 90,
    height: 90,
  },
];

export default function ProjectDetail() {
  return (
    <section className="flex min-h-screen">
      <div className="flex w-[60%] flex-col">
        <ProjectShotsHeaderLeft />

        <div className="flex flex-1 items-start gap-12 px-6 pt-[53px]">
          <div className="w-[185px] shrink-0">
            <h2 className="text h-11.5 font-normal">
              Grey 3D Design System &amp; Migration to Blender
            </h2>
            <p className="text h-[23px] font-normal text-[#8E8E93]">
              Generalist &amp; 3D Design
            </p>
          </div>

          <div className="w-[444px]">
            <h2 className="text indent-20 font-normal">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt.
            </h2>
            <h2 className="text mt-6 indent-20 font-normal">
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
              ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur? Quis autem vel eum iure reprehenderit qui in ea
              voluptate velit esse quam nihil molestiae consequatur, vel illum
              qui dolorem eum fugiat quo voluptas nulla pariatur
            </h2>
            <h2 className="text my-6 font-normal">
              Send an email to learn more about this project.
            </h2>
            <WorkTogetherLink />
          </div>
        </div>
        <div className="mt-[211px] mb-[45px] ml-6">
          <CategorySlide />
          <p className="mt-6 text-[14px] leading-[150%] font-normal tracking-[0%]">
            ©2026 All rights reserved.
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col bg-[#232323]"></div>
    </section>
  );
}

const ProjectShotsHeaderLeft = () => {
  const { resolvedTheme, mounted } = useThemeState();
  const imageSrc =
    mounted && resolvedTheme === "dark"
      ? "/assets/prjsht-dark.svg"
      : "/assets/prjsht-light.svg";

  const lightStyle = `border border-black hover:bg-black hover:text-white`;

  const darkStyle = `border border-white hover:bg-white hover:text-black`;
  const base =
    "flex h-[25px] w-16 items-center justify-center rounded-[23px] px-3 py-1 text-[13px] leading-4 font-medium uppercase antialiased transition-colors duration-200";

  const className =
    mounted && resolvedTheme === "dark"
      ? `${base} ${darkStyle}`
      : `${base} ${lightStyle}`;
  return (
    <header className="mt-4.5 ml-[15px] w-fit">
      <div className="flex items-center gap-6">
        <div className="relative h-[68px] w-[200px]">
          <Image src={imageSrc} alt="projects&shots" fill />
        </div>
        <Link href="/" className={className}>
          home
        </Link>
      </div>
    </header>
  );
};
const ProjectShotsHeaderRight = () => {
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
      <nav className="flex gap-3 pt-10">
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
