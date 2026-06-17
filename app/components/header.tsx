"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderProps = {
  showReturnButton?: boolean;
};

export default function Header({ showReturnButton = false }: HeaderProps) {
  const pathname = usePathname();
  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

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
            src="/assets/logo.svg"
            alt="Seyi Oniyitan"
            height={72}
            width={172}
            className="object-cover"
            priority
            quality={100}
          />
        </div>
        <nav className="flex items-center gap-3 pt-[29px]">
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`flex h-[25px] items-center justify-center rounded-[23px] border-[0.4px] border-black px-3 py-1 text-[13px] leading-4 font-medium uppercase transition-colors duration-200 hover:bg-black hover:text-white ${
                isLinkActive(link.href) ? "bg-black text-white" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

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
