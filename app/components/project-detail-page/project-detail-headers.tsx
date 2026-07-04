"use client";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/app/components/theme-toggle";
import { useThemeState } from "@/app/hooks/use-theme-state";
import { menuLinks } from "@/app/project-shots/page";
import type { ContrastVariant } from "@/app/hooks/use-adaptive-contrast";

export function ProjectShotsHeaderLeft() {
  const { resolvedTheme, mounted } = useThemeState();
  const imageSrc =
    mounted && resolvedTheme === "dark"
      ? "/assets/prjsht-dark.svg"
      : "/assets/prjsht-light.svg";

  const lightStyle = `border-[0.8px] border-black hover:bg-black hover:text-white`;
  const darkStyle = `border-[0.8px] border-white hover:bg-white hover:text-black`;
  const base =
    "flex h-[25px] w-16 items-center justify-center rounded-[23px] px-3 py-1 text-[13px] leading-4 font-medium uppercase antialiased ";

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

export function ProjectShotsHeaderRight({
  contrastVariant = "dark-bg",
}: {
  contrastVariant?: ContrastVariant;
}) {
  const isLightBg = contrastVariant === "light-bg";

  return (
    <header className="mt-10 mr-6 flex justify-end">
      <nav className="flex items-center gap-3">
        {menuLinks?.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`flex h-[25px] items-center justify-center rounded-[23px] border-[0.8px] px-3 py-1 text-[13px] leading-4 font-medium uppercase antialiased backdrop-blur-md ${
              isLightBg
                ? "border-black/70 bg-white/25 text-black hover:bg-black hover:text-white"
                : "border-white/70 bg-black/25 text-white hover:bg-white hover:text-black"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
