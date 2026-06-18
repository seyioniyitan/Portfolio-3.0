"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import WorkTogetherLink from "@/app/components/work-together-link";
import ThemeToggle from "@/app/components/theme-toggle";
import { useThemeState } from "@/app/hooks/use-theme-state";

type HeaderProps = {
  showReturnButton?: boolean;
  variant?: "default" | "minimal";
};

export default function Header({
  showReturnButton = false,
  variant = "default",
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

  if (variant === "minimal") {
    return (
      <header className="relative flex w-full items-start justify-between pr-6 pl-[15px]">
        {showReturnButton ? (
          <Link
            href="/project-shots"
            className="absolute top-[29px] left-[67px] z-10 flex h-[25px] w-fit items-center justify-center rounded-[23px] border-[0.4px] border-black bg-white px-3 py-1 text-[13px] leading-4 font-medium uppercase transition-colors duration-200 hover:bg-black hover:text-white"
          >
            return
          </Link>
        ) : null}
        <div className="pt-8">
          <Image
            src="/assets/logo.svg"
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

  return (
    <header className="absolute top-0 left-0 z-20 w-full">
      {showReturnButton ? (
        <Link
          href="/"
          className="absolute top-[29px] left-[67px] z-10 flex h-[25px] w-fit items-center justify-center rounded-[23px] border-[0.4px] border-black bg-white px-3 py-1 text-[13px] leading-4 font-medium uppercase transition-colors duration-200 hover:bg-black hover:text-white"
        >
          return
        </Link>
      ) : null}
      <div className="flex w-fit items-start gap-45.5 px-4">
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
        <nav className="flex items-center gap-3 pt-[29px]">
          {menuLinks.map((link, index) => {
            const active = isLinkActive(link.href);

            const base =
              "flex h-[25px] items-center justify-center rounded-[23px] px-3 py-1 text-[13px] leading-4 font-medium uppercase antialiased transition-colors duration-200";

            const lightStyle = `
    border border-black
    hover:bg-black hover:text-white
    ${active ? "bg-black text-white" : ""}
  `;

            const darkStyle = `
    border border-white
    hover:bg-white hover:text-black
    ${active ? "bg-white text-black" : ""}
  `;

            const className =
              resolvedTheme === "dark"
                ? `${base} ${darkStyle}`
                : `${base} ${lightStyle}`;

            return (
              <Link key={index} href={link.href} className={className}>
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

const menuLinks: { label: string; href: string }[] = [
  {
    label: "Shop",
    href: "/shop",
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
