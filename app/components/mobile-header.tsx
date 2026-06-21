"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/app/components/theme-toggle";
import { useThemeState } from "@/app/hooks/use-theme-state";

export default function MobileHeader() {
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
  const base =
    "flex h-[25px] items-center justify-center rounded-[23px] px-3 py-1 text-[13px] leading-4 font-medium uppercase antialiased transition-colors duration-200";

  const lightStyle = `
    border border-black
    hover:bg-black hover:text-white
  `;

  const darkStyle = `
    border border-white
    hover:bg-white hover:text-black
  `;

  const className =
    mounted && resolvedTheme === "dark"
      ? `${base} ${darkStyle}`
      : `${base} ${lightStyle}`;
  return (
    <div className="mt-6 flex w-full justify-between pr-4 pl-2">
      <Image
        src={imageSrc}
        alt="Seyi Oniyitan"
        height={72}
        width={172}
        className="object-cover"
        priority
        quality={100}
      />
      <div className="flex gap-4">
        <Link href="" className={className}>
          more
        </Link>
        <ThemeToggle width={32} />
      </div>
    </div>
  );
}
