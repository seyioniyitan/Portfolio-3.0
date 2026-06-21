"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import WorkTogetherLink from "@/app/components/work-together-link";
import ThemeToggle from "@/app/components/theme-toggle";
import { useThemeState } from "@/app/hooks/use-theme-state";

type MobileExtraLink = {
  label: string;
  href: string;
};

type HeaderProps = {
  showReturnButton?: boolean;
  variant?: "default" | "minimal";
  /** Links rendered to the left of the "more" button on mobile */
  mobileLinks?: MobileExtraLink[];
};

const menuLinks: { label: string; href: string }[] = [
  { label: "Shop", href: "/shop" },
  { label: "Articles", href: "/articles" },
  { label: "About", href: "/about" },
];

export default function TestHeader({
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

  // ─── Minimal variant (project-shots page etc.) ───────────────────────────
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

      {/* ── Desktop nav ── */}
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
              className="absolute top-0 left-[67px] h-[25px] w-fit items-center justify-center rounded-[23px] border-[0.4px] border-black bg-white px-3 py-1 text-[13px] leading-4 font-medium uppercase transition-colors duration-200 hover:text-white md:flex dark:border-white dark:bg-[#232323]"
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

      {/* ── Mobile nav ── */}
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
          {/* "more" is always present on mobile */}
          <button className={pillClass()}>more</button>
          <ThemeToggle width={32} />
        </div>
      </div>
    </header>
  );
}
