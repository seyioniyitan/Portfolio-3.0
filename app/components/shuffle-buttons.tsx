import Link from "next/link";

export type ProjectView = "case-studies" | "project-shots";

type ShuffleButtonsProps = {
  activeView: ProjectView;
};

export default function ShuffleButtons({ activeView }: ShuffleButtonsProps) {
  return (
    <div className="flex w-full items-center justify-between gap-2 pt-6 md:w-auto md:justify-normal md:pt-7 lg:gap-3">
      {shuffleButtons.map(({ title, view }, index) => {
        const isActive = view === activeView;
        const href = view ? `/project-shots?view=${view}` : "/project-shots";

        return (
          <Link
            key={index}
            href={href}
            className={`flex h-[25px] items-center rounded-[23px] border-[0.4px] px-3 py-1 text-[13px] leading-4 font-medium tracking-[0%] uppercase ${
              isActive ? "bg-black text-white" : ""
            } ${!view ? "pointer-events-none opacity-60" : ""}`}
          >
            {title}
          </Link>
        );
      })}
    </div>
  );
}

const shuffleButtons: {
  id: number;
  title: string;
  view?: "case-studies" | "project-shots";
}[] = [
  { id: 1, title: "case studies", view: "case-studies" },
  { id: 2, title: "project shots ", view: "project-shots" },
  { id: 3, title: "shuffle" },
];
