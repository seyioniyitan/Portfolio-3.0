"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useThemeState } from "@/app/hooks/use-theme-state";
import WorkTogetherLink from "@/app/components/work-together-link";
import ThemeToggle from "@/app/components/theme-toggle";
import MobileMenu from "@/app/components/mobile-menu";
import { useMobileMenu } from "@/app/context/mobile-menu-context";
import type { ContrastVariant } from "@/app/hooks/use-adaptive-contrast";

type MobileExtraLink = {
  label: string;
  href: string;
};

type HeaderProps = {
  showReturnButton?: boolean;
  variant?: "default" | "minimal" | "project-shots";
  mobileLinks?: MobileExtraLink[];
  backgroundImage?: boolean;
  contrastVariant?: ContrastVariant;
};

const menuLinks: { label: string; href: string }[] = [
  { label: "Store", href: "https://seyioniyitan.gumroad.com" },
  { label: "Articles", href: "https://www.medium.com/@seyioniyitan" },
  { label: "About", href: "/about" },
];

export default function Header({
  showReturnButton = false,
  variant = "default",
  mobileLinks = [],
  backgroundImage = false,
  contrastVariant,
}: HeaderProps) {
  const pathname = usePathname();
  const { resolvedTheme, mounted } = useThemeState();
  const { open } = useMobileMenu();

  const imageSrc =
    mounted && resolvedTheme === "dark"
      ? "/assets/logo-dark.svg"
      : "/assets/logo-light.svg";

  const projectShotsImageSrc =
    mounted && resolvedTheme === "dark"
      ? "/assets/prjsht-dark.svg"
      : "/assets/prjsht-light.svg";

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const navPillBase =
    "flex h-[25px] items-center justify-center rounded-[23px] px-3 py-1 text-[13px] leading-4 font-medium uppercase antialiased";

  const pillClass = (active = false) => {
    if (mounted && resolvedTheme === "dark") {
      return `${navPillBase} border-[0.8px] border-white hover:bg-white hover:text-black ${active ? "bg-white text-black" : ""}`;
    }
    return `${navPillBase} border-[0.8px] border-black hover:bg-black hover:text-white ${active ? "bg-black text-white" : ""}`;
  };

  const isDarkBackdrop = contrastVariant === "dark-bg";
  const pillClassOnImage = (active = false) => {
    if (isDarkBackdrop) {
      return `${navPillBase} border-[0.8px] border-white text-white hover:bg-white hover:text-black ${active ? "bg-white text-black" : ""}`;
    }
    return `${navPillBase} border-[0.8px] border-black text-black hover:bg-black hover:text-white ${active ? "bg-black text-white" : ""}`;
  };

  const useBackdropStyling = backgroundImage && !!contrastVariant;

  if (variant === "project-shots") {
    return (
      <header className="w-full">
        {/* Desktop */}
        <div className="hidden justify-between pr-6 pl-[15px] md:flex">
          <div className="mt-4.5 flex h-17 items-center justify-center gap-6">
            <div className="relative mt-4.5 h-[68px] w-[200px]">
              <Image src={projectShotsImageSrc} alt="projects&shots" fill />
            </div>
            <Link href="/" className={pillClass()}>
              home
            </Link>
          </div>
          <nav className="flex items-center gap-3 pt-10">
            {menuLinks.map((link, index) => {
              const isExternal = /^https?:\/\//i.test(link.href);

              return (
                <Link
                  key={index}
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className={pillClass(isLinkActive(link.href))}
                >
                  {link.label}
                </Link>
              );
            })}
            <ThemeToggle />
          </nav>
        </div>

        {/* Mobile */}
        <div className="mt-6 mr-4 ml-2 flex h-[49px] items-center justify-between md:hidden">
          <div className="relative mt-4.5 h-full w-[143px]">
            <Image src={projectShotsImageSrc} alt="projects&shots" fill />
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className={pillClass()}>
              home
            </Link>
            <MobileMenu />
            <div className={open ? "hidden" : ""}>
              <ThemeToggle width={32} />
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (variant === "minimal") {
    return (
      <header className="relative flex w-full items-start justify-between pr-6 pl-[15px]">
        {showReturnButton && (
          <Link
            href="/project-shots"
            className="absolute top-[29px] left-[67px] z-10 flex h-[25px] w-fit items-center justify-center rounded-[23px] border-[0.8px] border-black bg-white px-3 py-1 text-[13px] leading-4 font-medium uppercase hover:bg-black hover:text-white"
          >
            home
          </Link>
        )}
        <div className="pt-8">
          <Image
            src={imageSrc}
            alt="Seyi Oniyitan"
            height={72}
            width={172}
            className="object-cover"
            priority
            quality={100}
          />
        </div>
        <div className="pt-[29px]">
          <WorkTogetherLink />
        </div>
      </header>
    );
  }

  // ─── Default variant ──────────────────────────────────────────────────────
  return (
    <header className="absolute top-0 left-0 z-20 mr-10 ml-[5px] w-full md:mt-8 md:ml-4 md:pr-0">
      {showReturnButton && (
        <Link
          href="/"
          className={
            useBackdropStyling
              ? `absolute top-[25px] left-[67px] z-10 flex h-[25px] w-fit items-center justify-center rounded-[23px] border-[0.8px] px-3 py-1 text-[13px] leading-4 font-medium uppercase md:hidden ${
                  isDarkBackdrop
                    ? "border-white bg-black/25 text-white backdrop-blur-md hover:bg-white hover:text-black"
                    : "border-black bg-white/25 text-black backdrop-blur-md hover:bg-black hover:text-white"
                }`
              : "absolute top-[25px] left-[67px] z-10 flex h-[25px] w-fit items-center justify-center rounded-[23px] border-[0.8px] border-black bg-white px-3 py-1 text-[13px] leading-4 font-medium uppercase hover:text-white md:hidden dark:border-white dark:bg-[#232323]"
          }
        >
          home
        </Link>
      )}

      {/* Desktop */}
      <div className="hidden w-full items-start gap-[133px] md:flex">
        <div className="relative">
          <Image
            src={imageSrc}
            alt="Seyi Oniyitan"
            height={75}
            width={172}
            className="object-cover"
            priority
            quality={100}
          />
          {showReturnButton && (
            <Link
              href="/"
              className="absolute top-0 left-[67px] flex h-[25px] w-fit items-center justify-center rounded-[23px] border-[0.8px] border-black bg-white px-3 py-1 text-[13px] leading-4 font-medium uppercase hover:bg-black hover:text-white dark:border-white dark:bg-[#232323] dark:hover:bg-white dark:hover:text-black"
            >
              home
            </Link>
          )}
        </div>
        <nav className="flex items-center gap-3">
          {menuLinks.map((link, index) => {
            const isExternal = /^https?:\/\//i.test(link.href);

            return (
              <Link
                key={index}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={pillClass(isLinkActive(link.href))}
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>

      {/* Mobile */}
      <div className="mt-[25px] flex w-full items-start justify-between pr-4 pl-2 md:hidden">
        <Image
          src={imageSrc}
          alt="Seyi Oniyitan"
          height={72}
          width={172}
          className="object-cover"
          priority
          quality={100}
        />
        <div className="flex items-center gap-3">
          {mobileLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={
                useBackdropStyling
                  ? pillClassOnImage(isLinkActive(link.href))
                  : pillClass(isLinkActive(link.href))
              }
            >
              {link.label}
            </Link>
          ))}
          <MobileMenu />
          <div className={open ? "hidden" : ""}>
            <ThemeToggle
              width={24}
              height={24}
              contrastVariant={useBackdropStyling ? contrastVariant : undefined}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
