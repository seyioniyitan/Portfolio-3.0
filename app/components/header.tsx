import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-start gap-45.5 px-4">
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
            className="flex h-[25px] items-center justify-center rounded-[23px] border-[0.4px] border-black px-3 py-1 text-[13px] leading-4 font-medium uppercase"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

const menuLinks: { label: string; href: string }[] = [
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
