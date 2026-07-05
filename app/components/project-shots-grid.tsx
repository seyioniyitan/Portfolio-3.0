"use client";

import { bentoImageUrl } from "@/sanity/lib/image";
import { ProjectShot } from "@/types";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const BentoImage = ({
  shot,
  className = "",
}: {
  shot: ProjectShot;
  className?: string;
}) => (
  <div className={`relative min-h-0 overflow-hidden ${className}`}>
    {shot.image?.asset && (
      <Image
        src={bentoImageUrl(shot.image.asset)}
        alt={shot.image.alt ?? shot.title}
        fill
        unoptimized
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
    )}
  </div>
);

function chunk<T>(arr: T[], n: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += n) {
    chunks.push(arr.slice(i, i + n));
  }
  return chunks;
}

const DesktopChunk = ({ shots }: { shots: ProjectShot[] }) => {
  const [a, b, c, d, e, f] = shots;
  // Total height: right column = 370 + 20 (gap-5) + 350 = 740px
  return (
    <div
      className="grid grid-cols-6 gap-4"
      style={{ gridTemplateRows: "280px 280px 180px" }}
    >
      {a && <BentoImage shot={a} className="col-span-2 row-span-2" />}
      {b && <BentoImage shot={b} className="col-span-2 row-span-1" />}
      {(c || d) && (
        <div className="col-span-2 row-span-3 flex min-h-0 flex-col gap-5">
          {c && <BentoImage shot={c} className="h-[370px] flex-none" />}
          {d && <BentoImage shot={d} className="h-[350px] flex-none" />}
        </div>
      )}
      {e && <BentoImage shot={e} className="col-span-2 row-span-1" />}
      {f && <BentoImage shot={f} className="col-span-3 row-span-14" />}
    </div>
  );
};

const MobileChunk = ({ shots }: { shots: ProjectShot[] }) => {
  const [a, b, c, d, e] = shots;
  return (
    <div className="row-span-3 grid grid-cols-2 gap-2">
      {a && <BentoImage shot={a} className="col-span-1 row-span-2 h-full" />}
      {b && <BentoImage shot={b} className="col-span-1 row-span-1 h-[137px]" />}
      {c && <BentoImage shot={c} className="col-span-1 h-[155px]" />}
      {d && <BentoImage shot={d} className="col-span-1 h-[260px]" />}
      {e && <BentoImage shot={e} className="col-span-1 h-[230px]" />}
    </div>
  );
};

export default function ProjectShotsGrid({ shots }: { shots: ProjectShot[] }) {
  const [displayShots, setDisplayShots] = useState(shots);

  useEffect(() => {
    setDisplayShots(shots);
  }, [shots]);

  const shuffledShots = useMemo(() => {
    const shuffled = [...displayShots];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [displayShots]);

  const desktopChunks = chunk(shuffledShots, 6);
  const mobileChunks = chunk(shuffledShots, 5);

  return (
    <>
      {/* Desktop */}
      <div className="hidden flex-col gap-8 px-6 pt-10 md:flex">
        {desktopChunks.map((group, i) => (
          <DesktopChunk key={i} shots={group} />
        ))}
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <div className="flex flex-col gap-2 px-4 pt-6">
          {mobileChunks.map((group, i) => (
            <MobileChunk key={i} shots={group} />
          ))}
        </div>
      </div>
    </>
  );
}
