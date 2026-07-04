"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export type ProjectView = "case-studies" | "project-shots";

type ShuffleButtonsProps = {
  activeView: ProjectView;
};

export default function ShuffleButtons({ activeView }: ShuffleButtonsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isShuffleActive = !!searchParams.get("shuffle");

  const handleShuffle = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", "project-shots");
    params.set("shuffle", String(Date.now()));
    router.push(`/project-shots?${params.toString()}`);
  };

  return (
    <div className="flex w-full items-center gap-2 pt-6 md:w-auto md:justify-normal md:pt-7 lg:gap-3">
      {shuffleButtons
        .filter(
          ({ view }) => activeView === "project-shots" || view !== undefined,
        )
        .map(({ title, view }, index) => {
          const isActive =
            view !== undefined
              ? view === activeView && !isShuffleActive
              : isShuffleActive;

          const className = `flex h-[25px] items-center rounded-[23px] border-[0.4px] px-3 py-1 text-[13px] leading-4 font-medium tracking-[0%] uppercase cursor-pointer transition-colors ${
            isActive
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black"
          }`;

          const href = view ? `/project-shots?view=${view}` : "/project-shots";

          if (!view) {
            return (
              <button
                key={index}
                type="button"
                onClick={handleShuffle}
                className={className}
              >
                {title}
              </button>
            );
          }

          return (
            <Link key={index} href={href} className={className}>
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
  view?: ProjectView;
}[] = [
  { id: 1, title: "case studies", view: "case-studies" },
  { id: 2, title: "project shots", view: "project-shots" },
  { id: 3, title: "shuffle" },
];
