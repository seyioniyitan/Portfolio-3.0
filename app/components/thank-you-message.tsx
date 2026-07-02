"use client";

import Image from "next/image";
import Link from "next/link";

interface ThankYouMessageProps {
  thankYouImgSrc: string;
}

export default function ThankYouMessage({
  thankYouImgSrc,
}: ThankYouMessageProps) {
  return (
    <div className="mt-8 flex w-full flex-col items-start gap-6 lg:w-[422px]">
      <Image
        src={thankYouImgSrc}
        alt="thank_you"
        height={115}
        width={140}
        className="object-cover"
        priority
        quality={100}
      />

      <p className="text w-[361px] lg:w-full">
        Thank you for reaching out. I’ve received your project details and will
        review them carefully. If it looks like a good fit, I’ll get back to you
        within 48 hours.
      </p>
      <div className="mt-2 flex items-center gap-4">
        <Link
          href="/project-shots"
          className="flex h-[25px] w-fit items-center justify-center rounded-[23px] border-[0.8px] border-black bg-white px-3 py-1 text-[13px] leading-4 font-medium uppercase hover:bg-black hover:text-white dark:border-white dark:bg-[#232323] dark:hover:bg-white dark:hover:text-black"
        >
          View Projects
        </Link>
        <Link
          href="/"
          className="flex h-[25px] w-fit items-center justify-center rounded-[23px] border-[0.8px] border-black bg-white px-3 py-1 text-[13px] leading-4 font-medium uppercase hover:bg-black hover:text-white dark:border-white dark:bg-[#232323] dark:hover:bg-white dark:hover:text-black"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
