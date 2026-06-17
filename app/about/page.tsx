import Header from "@/app/components/header";
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
        <Header showReturnButton />
        <section className="flex items-start gap-[322px] overflow-hidden">
          <div className="shrink-0 pt-[140px] pl-6">
            <div className="w-[447px] pt-13 pr-6 md:pr-0">
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

            <div className="mt-27 space-y-2">
              {contactDetails.map((item) => (
                <ContactDetailRow
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </div>

            <div className="mt-[282px]">
              <CategorySlide />
              <h2 className="mt-6 mb-[45px] text-[14px] leading-[150%] font-normal tracking-[0%]">
                ©2026 All rights reserved.
              </h2>
            </div>
          </div>

          <div className="min-w-0 flex-1 space-y-4 overflow-hidden pt-4">
            <div className="relative h-[429px] w-[296px]">
              <Image
                src="/assets/about-a.png"
                alt="Seyi Oniyitan"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative mr-3 ml-40 h-[551px] w-[470px]">
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
