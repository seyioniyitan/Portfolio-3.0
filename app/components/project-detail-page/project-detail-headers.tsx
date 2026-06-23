"use client";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/app/components/theme-toggle";
import { useThemeState } from "@/app/hooks/use-theme-state";
import { menuLinks } from "@/app/project-shots/page";

export function ProjectShotsHeaderLeft() {
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
}

export function ProjectShotsHeaderRight() {
  const { resolvedTheme, mounted } = useThemeState();
  const imageSrc =
    mounted && resolvedTheme === "dark"
      ? "/assets/prjsht-dark.svg"
      : "/assets/prjsht-light.svg";

  return (
    <header className="mt-10 mr-6 flex justify-end">
      <nav className="flex gap-3">
        {menuLinks?.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="flex h-[25px] items-center justify-center rounded-[23px] border-[0.4px] border-white px-3 py-1 text-[13px] leading-4 font-medium text-white uppercase antialiased transition-colors duration-200 hover:bg-black hover:text-white"
          >
            {link.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
