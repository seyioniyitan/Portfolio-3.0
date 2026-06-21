"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useThemeState } from "@/app/hooks/use-theme-state";
import WorkTogetherLink from "@/app/components/work-together-link";
import ThemeToggle from "@/app/components/theme-toggle";
import MobileMenu from "@/app/components/mobile-menu";

type MobileExtraLink = {
  label: string;
  href: string;
};

type HeaderProps = {
  showReturnButton?: boolean;
  variant?: "default" | "minimal" | "project-shots";
  mobileLinks?: MobileExtraLink[];
};

const menuLinks: { label: string; href: string }[] = [
  { label: "Shop", href: "/shop" },
  { label: "Articles", href: "/articles" },
  { label: "About", href: "/about" },
];

export default function Header({
  showReturnButton = false,
  variant = "default",
  mobileLinks = [],
}: HeaderProps) {
  const pathname = usePathname();
  const { resolvedTheme, mounted } = useThemeState();

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
    "flex h-[25px] items-center justify-center rounded-[23px] px-3 py-1 text-[13px] leading-4 font-medium uppercase antialiased transition-colors duration-200";

  const pillClass = (active = false) => {
    if (mounted && resolvedTheme === "dark") {
      return `${navPillBase} border-[0.4px] border-white hover:bg-white hover:text-black ${active ? "bg-white text-black" : ""}`;
    }
    return `${navPillBase} border-[0.4px] border-black hover:bg-black hover:text-white ${active ? "bg-black text-white" : ""}`;
  };

  // ─── Project-shots variant ────────────────────────────────────────────────
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
          <nav className="flex gap-3 pt-10">
            {menuLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={pillClass(isLinkActive(link.href))}
              >
                {link.label}
              </Link>
            ))}
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
            <ThemeToggle width={32} />
          </div>
        </div>
      </header>
    );
  }

  // ─── Minimal variant ──────────────────────────────────────────────────────
  if (variant === "minimal") {
    return (
      <header className="relative flex w-full items-start justify-between pr-6 pl-[15px]">
        {showReturnButton && (
          <Link
            href="/project-shots"
            className="absolute top-[29px] left-[67px] z-10 flex h-[25px] w-fit items-center justify-center rounded-[23px] border-[0.4px] border-black bg-white px-3 py-1 text-[13px] leading-4 font-medium uppercase transition-colors duration-200 hover:bg-black hover:text-white"
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
          className="absolute top-[25px] left-[67px] z-10 flex h-[25px] w-fit items-center justify-center rounded-[23px] border-[0.4px] border-black bg-transparent px-3 py-1 text-[13px] leading-4 font-medium uppercase transition-colors duration-200 hover:text-white md:hidden dark:border-white dark:bg-[#232323]"
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
              className="absolute top-0 left-[67px] flex h-[25px] w-fit items-center justify-center rounded-[23px] border-[0.4px] border-black bg-white px-3 py-1 text-[13px] leading-4 font-medium uppercase transition-colors duration-200 hover:text-white dark:border-white dark:bg-[#232323]"
            >
              home
            </Link>
          )}
        </div>
        <nav className="flex items-center gap-3">
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={pillClass(isLinkActive(link.href))}
            >
              {link.label}
            </Link>
          ))}
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
              className={pillClass(isLinkActive(link.href))}
            >
              {link.label}
            </Link>
          ))}
          <MobileMenu />
          <ThemeToggle width={32} />
        </div>
      </div>
    </header>
  );
}
