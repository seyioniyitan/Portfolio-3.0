"use client";

import CategorySlide from "@/app/components/category-slide";

export default function ContactFooter() {
  return (
    <div className="pointer-events-auto">
      <CategorySlide />
      <p className="mt-6 text-[14px] leading-[150%] font-normal tracking-[0%] lg:hidden">
        ©2026 Seyi Oniyitan. All rights reserved.
      </p>
      <div className="mt-[188px] md:hidden">
        <CategorySlide mobile />
      </div>
      <p className="mt-6 hidden text-[14px] leading-[150%] font-normal tracking-[0%] md:block">
        ©2026 Seyi Oniyitan. All rights reserved.
      </p>
    </div>
  );
}
