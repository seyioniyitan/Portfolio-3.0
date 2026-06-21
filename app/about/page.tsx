import Header from "@/app/components/header";
import TestHeader from "@/app/components/test-header";
import ContactDetailRow from "@/app/components/contact-detail-row";
import CategorySlide from "@/app/components/category-slide";
import Image from "next/image";

const contactDetails = [
  {
    label: "Email address",
    value: "hello@seyionitan.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/seyi-oniyitan",
  },
  {
    label: "Twitter (X)",
    value: "x.com/leveredman",
  },
  {
    label: "Medium",
    value: "medium.com/@seyioniyitan",
  },
  {
    label: "Gumroad",
    value: "gumroad.com/leveredman",
  },
];

export default function AboutPage() {
  return (
    <section>
      <div className="relative overflow-hidden">
        <TestHeader
          showReturnButton
          mobileLinks={[{ label: "About", href: "/about" }]}
        />
        <section className="flex flex-col items-start gap-8 overflow-hidden lg:flex-row lg:gap-[322px]">
          <div className="order-2 px-4 lg:order-1 lg:shrink-0 lg:px-0 lg:pt-[140px] lg:pl-6">
            <div className="w-full lg:w-[447px] lg:pt-13">
              <h2 className="text indent-20 font-normal">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas.
              </h2>
              <h2 className="text mt-8 indent-20 font-normal">
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit, sed quia non numquam eius modi
                tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem.
              </h2>
            </div>

            <div className="mt-16 space-y-2 lg:mt-27">
              {contactDetails.map((item) => (
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
                ©2026 All rights reserved.
              </h2>
            </div>
          </div>

          <div className="order-1 mt-31.5 flex w-full gap-2.5 overflow-hidden lg:order-2 lg:mt-0 lg:block lg:min-w-0 lg:flex-1 lg:gap-0 lg:space-y-4 lg:pt-4">
            <div className="relative h-[266px] w-1/2 lg:h-[429px] lg:w-[296px]">
              <Image
                src="/assets/about-a.png"
                alt="Seyi Oniyitan"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative mt-[107px] h-[230px] w-1/2 lg:mt-0 lg:mr-3 lg:ml-40 lg:h-[551px] lg:w-[470px]">
              <Image
                src="/assets/about-b.jpg"
                alt="Seyi Oniyitan"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
