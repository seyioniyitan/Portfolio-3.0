import Image from "next/image";
import Link from "next/link";
import { menuLinks } from "../components/header";
import WorkTogetherLink from "../components/work-together-link";

export default function ProjectShots() {
  return (
    <div>
      <Header />

      <div className="flex items-center justify-between px-6">
        <div className="flex items-center gap-3 pt-7">
          {shuffleButtons.map(({ title }, index) => (
            <button
              key={index}
              className="h-[25px] rounded-[23px] border-[0.4px] px-3 py-1 text-[13px] leading-4 font-medium tracking-[0%] uppercase"
            >
              {title}
            </button>
          ))}
        </div>
        <WorkTogetherLink />
      </div>

      <div className="grid auto-rows-[280px] grid-cols-3 gap-5 px-6 pt-10">
        <BentoImage src="/assets/hero-a.png" className="row-span-2" />
        <BentoImage src="/assets/hero-b.png" />
        <div className="row-span-2 flex min-h-0 flex-col gap-5">
          <BentoImage src="/assets/hero-a.png" className="flex-2" />
          <BentoImage src="/assets/hero-b.png" className="flex-1" />
        </div>
        <BentoImage src="/assets/hero-b.png" />
        <BentoImage src="/assets/hero-a.png" className="col-span-2" />
      </div>

      <div className="grid grid-cols-2 gap-5 px-6 pt-10">
        <CaseStudies />
      </div>
    </div>
  );
}

const Header = () => {
  return (
    <header className="flex justify-between pr-6 pl-[15px]">
      <div className="flex items-center gap-6">
        <div className="relative mt-4.5 h-[68px] w-[200px]">
          <Image src="/assets/prjsht.svg" alt="projects&shots" fill />
        </div>
        <Link
          href="/"
          className="flex h-[25px] w-[77px] items-center justify-center rounded-[23px] border-[0.4px] border-black px-3 py-1 text-[13px] leading-4 font-medium uppercase"
        >
          Return
        </Link>
      </div>

      <nav className="flex gap-3 pt-10">
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
};

const shuffleButtons = [
  { id: 1, title: "case studies" },
  { id: 2, title: "project shots " },
  { id: 3, title: "shuffle" },
];

const BentoImage = ({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) => (
  <div className={`relative min-h-0 overflow-hidden ${className}`}>
    <Image src={src} alt="" fill className="object-cover" sizes="33vw" />
  </div>
);

const CaseStudies = () => {
  return <div>case</div>;
};

const caseStudyData = [
  {
    title: "Rise 3.0",
    role: "Product Design Lead",
    tag: ["Video", "App Store"],
    image: "/assets/hero-a.png",
  },
  {
    title: "Rise 3.0",
    role: "Product Design Lead",
    tag: ["Video", "App Store"],
    image: "/assets/hero-b.png",
  },
  {
    title: "Alien Ware",
    role: "Product Design Lead",
    tag: ["Video", "App Store"],
    image: "/assets/hero-a.png",
  },
  {
    title: "Rise 3.0",
    role: "Product Design Lead",
    tag: ["Video", "App Store"],
    image: "/assets/hero-b.png",
  },
];
