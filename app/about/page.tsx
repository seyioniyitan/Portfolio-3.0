import CategorySlide from "@/app/components/category-slide";
import ContactDetailRow from "@/app/components/contact-detail-row";
import Header from "@/app/components/header";
import Image from "next/image";
import { aboutPageQuery } from "@/app/lib/queries";
import { client } from "@/app/lib/sanity";
import { AboutPageData } from "@/types";
import { aboutImageOneUrl, aboutImageTwoUrl } from "@/sanity/lib/image";

export const revalidate = 3600;

export default async function AboutPage() {
  const aboutPageData = await client.fetch<AboutPageData>(aboutPageQuery, {});
  const {
    introOne,
    introTwo,
    introThree,
    introFour,
    contactDetails,
    imageOne,
    imageTwo,
  } = aboutPageData;

  return (
    <section>
      <div className="relative overflow-hidden">
        <Header
          showReturnButton
          mobileLinks={[{ label: "About", href: "/about" }]}
        />

        {/* ── Desktop ── */}

        <section className="hidden flex-col items-start gap-8 overflow-hidden lg:flex lg:flex-row lg:gap-[322px]">
          <div className="order-2 px-4 lg:order-1 lg:shrink-0 lg:px-0 lg:pt-[140px] lg:pl-6">
            <div className="w-full lg:w-[447px] lg:pt-13">
              <h2 className="text font-normal lg:indent-17.5">{introOne}</h2>
              <h2 className="text mt-8 font-normal lg:indent-17.5">
                {introTwo}
              </h2>
              <h2 className="text mt-8 font-normal lg:indent-17.5">
                {introThree}
              </h2>
              <h2 className="text mt-8 font-normal lg:indent-17.5">
                {introFour}
              </h2>
            </div>

            <div className="mt-16 space-y-2 lg:mt-27">
              {contactDetails?.map((item) => (
                <ContactDetailRow
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </div>

            <div className="mt-[140px] lg:mt-[282px]">
              <CategorySlide />
              <h2 className="mt-6 mb-[65px] text-[14px] leading-[150%] font-normal tracking-[0%] lg:mb-[45px]">
                ©2026 Seyi Oniyitan. All rights reserved.
              </h2>
            </div>
          </div>

          <div className="lg order-1 mt-31.5 flex w-full gap-2.5 overflow-hidden lg:order-2 lg:mt-0 lg:block lg:min-w-0 lg:flex-1 lg:gap-0 lg:space-y-4 lg:pt-4">
            <div className="relative h-[266px] w-1/2 lg:h-[429px] lg:w-[296px]">
              <Image
                src={aboutImageOneUrl(imageOne!)}
                alt={imageOne?.alt!}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 296px"
              />
            </div>
            <div className="lg relative mt-[107px] h-[230px] w-1/2 lg:mt-0 lg:mr-3 lg:ml-40 lg:h-[551px] lg:w-[470px]">
              <Image
                src={aboutImageTwoUrl(imageTwo!)}
                alt={imageTwo?.alt!}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 470px"
              />
            </div>
          </div>
        </section>

        {/* ── Mobile ── */}
        <section className="flex flex-col gap-8 lg:hidden">
          <div className="mt-31.5 flex w-full gap-2.5 overflow-hidden">
            <div className="relative h-[266px] w-1/2 shrink-0">
              <Image
                src={aboutImageOneUrl(imageOne!)}
                alt={imageOne?.alt!}
                fill
                unoptimized
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="relative mt-25 h-[230px] w-1/2 shrink-0 self-end">
              <Image
                src={aboutImageTwoUrl(imageTwo!)}
                alt={imageTwo?.alt!}
                fill
                unoptimized
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>

          <div className="w-full min-w-0 px-4">
            <h2 className="text font-normal">{introOne}</h2>
            <h2 className="text mt-8 font-normal">{introTwo}</h2>
            <h2 className="text mt-8 font-normal">{introThree}</h2>
            <h2 className="text mt-8 font-normal">{introFour}</h2>

            <div className="mt-16 space-y-2">
              {contactDetails?.map((item) => (
                <ContactDetailRow
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </div>

            <div className="mt-[140px]">
              <CategorySlide />
              <h2 className="mt-6 mb-[65px] text-[14px] leading-[150%] font-normal tracking-[0%]">
                ©2026 Seyi Oniyitan. All rights reserved.
              </h2>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
