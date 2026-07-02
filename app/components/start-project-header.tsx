"use client";

import Image from "next/image";
import Link from "next/link";

interface StartProjectHeaderProps {
  imageSrc: string;
  wrapperClassName: string;
}

export default function StartProjectHeader({
  imageSrc,
  wrapperClassName,
}: StartProjectHeaderProps) {
  return (
    <div className={wrapperClassName}>
      <Image
        src={imageSrc}
        alt="Start Project"
        height={75}
        width={172}
        className="object-cover"
        priority
        quality={100}
      />
      <Link
        href="/"
        className="flex h-[25px] w-fit items-center justify-center rounded-[23px] border-[0.8px] border-black bg-white px-3 py-1 text-[13px] leading-4 font-medium uppercase hover:bg-black hover:text-white dark:border-white dark:bg-[#232323] dark:hover:bg-white dark:hover:text-black"
      >
        home
      </Link>
    </div>
  );
}
