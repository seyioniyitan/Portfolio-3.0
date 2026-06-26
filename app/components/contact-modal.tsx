import Image from "next/image";
import ProjectShotsCategorySlide from "./project-shots-category-slide";

export default function ContactModal() {
  return (
    <div className="w-[393px]">
      <div className="relative flex h-[63px] items-center justify-between rounded-t-[12px] bg-white dark:bg-[#232323]">
        <div className="flex items-center gap-2 py-5 pl-4">
          <h2 className="text font-normal dark:text-white">Download resume</h2>
          <p className="text text-[12px] font-medium text-[#8E8E93]">805kB</p>
        </div>

        <Image
          src="/assets/file-type.svg"
          alt="file_type_img"
          width={95}
          height={84}
          priority
          quality={100}
          className="absolute right-3 bottom-0"
        />
      </div>

      <div className="h-37 rounded-b-[12px] bg-[#007AFF]">
        <div className="flex items-center justify-between px-4 pt-3.5 pb-6">
          <h2 className="text font-semibold text-white">Let’s work together</h2>

          <div className="flex h-8 w-10 items-center justify-center rounded-3xl bg-black">
            <Image
              src="/assets/right-arrow-light.svg"
              alt="file_type_img"
              width={14}
              height={12}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <ProjectShotsCategorySlide variant />
        </div>
      </div>
    </div>
  );
}
