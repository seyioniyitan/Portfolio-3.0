"use client";

import { useThemeState } from "@/app/hooks/use-theme-state";
import SeyiAnimationSlide from "@/app/components/seyi-animation-slide";
import { useContactForm } from "@/app/hooks/use-contact-form";
import StartProjectHeader from "@/app/components/start-project-header";
import ThankYouMessage from "@/app/components/thank-you-message";
import ContactForm from "@/app/components/contact-form";
import ContactFooter from "@/app/components/contact-footer";
import CategorySlide from "@/app/components/category-slide";

export default function ContactPage() {
  const { resolvedTheme, mounted } = useThemeState();
  const { formik, isFormValid, isSubmitted, submitError } = useContactForm();
  const imageSrc =
    mounted && resolvedTheme === "dark"
      ? "/assets/start-project-dark.svg"
      : "/assets/start-project-light.svg";

  const thankYouImgSrc =
    mounted && resolvedTheme === "dark"
      ? "/assets/thank-you-dark.svg"
      : "/assets/thank-you-light.svg";

  return (
    <>
      <section className="hidden justify-between py-6 pr-5.5 pl-9.5 lg:flex">
        <div className="w-[389px]">
          {!isSubmitted && (
            <StartProjectHeader
              imageSrc={imageSrc}
              wrapperClassName="relative flex h-[83px] w-[254px] items-center justify-between"
            />
          )}

          {isSubmitted ? (
            <ThankYouMessage thankYouImgSrc={thankYouImgSrc} />
          ) : (
            <>
              <h2 className="text mt-6 font-normal">
                Kindly fill this contact form with the requested details.
                I&apos;ll respond to the email you provide.
              </h2>

              <ContactForm
                formik={formik}
                isFormValid={isFormValid}
                submitError={submitError}
              />
            </>
          )}

          <div
            className={`${isSubmitted ? "fixed bottom-15 left-9.5" : "mt-32"}`}
          >
            <ContactFooter />
          </div>
        </div>

        <div className="fixed top-[21px] right-[22px] bottom-[25px] flex h-auto w-[655px] items-center justify-center bg-[#007AFF]">
          <SeyiAnimationSlide />
        </div>
      </section>

      {/* mobile */}
      <section className="flex flex-col lg:hidden">
        <header className="sticky top-0 left-0 z-0 flex h-48 items-center justify-center bg-[#007AFF]">
          <SeyiAnimationSlide />
        </header>
        <div className="relative z-10 -mt-23.5 bg-white px-4 py-7.5 dark:bg-[#232323]">
          {!isSubmitted && (
            <>
              <StartProjectHeader
                imageSrc={imageSrc}
                wrapperClassName="relative flex h-[83px] items-center justify-between"
              />
              <h2 className="text mt-6 font-normal">
                Kindly fill this contact form with the requested details.
                I&apos;ll respond to the email you provide.
              </h2>
            </>
          )}

          {isSubmitted ? (
            <ThankYouMessage thankYouImgSrc={thankYouImgSrc} />
          ) : (
            <div className="pt-6">
              <ContactForm
                formik={formik}
                isFormValid={isFormValid}
                submitError={submitError}
              />
            </div>
          )}
          <div
            className={`${isSubmitted && "fixed bottom-12.5 left-4.5"} pointer-events-auto mt-25`}
          >
            <div>
              <CategorySlide escape />
            </div>
            <p className="mt-6 text-[14px] leading-[150%] font-normal tracking-[0%]">
              ©2026 All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
