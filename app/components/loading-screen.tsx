"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const OVERLAY_COLOR = "#007AFF";
const REVEAL_DURATION = 2.8;
const MOBILE_BREAKPOINT = 768;

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * "vertical" = the reveal progresses top-to-bottom (mobile — screen is
 * taller than it is wide): rows stack down the height, and each
 * individual stroke sweeps left-to-right across the width.
 *
 * "horizontal" = the reveal progresses left-to-right (desktop — screen
 * is wider than it is tall): rows stack across the width, and each
 * individual stroke sweeps top-to-bottom down the height.
 */
function buildScribble(
  width: number,
  height: number,
  seed: number,
  direction: "vertical" | "horizontal",
) {
  const rand = mulberry32(seed);

  // crossLength = the axis rows stack along (the progression direction).
  // primaryLength = the axis each individual stroke sweeps along.
  const crossLength = direction === "vertical" ? height : width;
  const primaryLength = direction === "vertical" ? width : height;

  const strokeWidth = Math.max(70, crossLength * 0.11);
  const overshoot = strokeWidth * 1.2;
  const rowStep = strokeWidth * 0.5; // tight overlap between rows
  const rows = Math.ceil((crossLength + overshoot * 2) / rowStep) + 1;
  const segs = 6;

  const minPrimary = -overshoot;
  const maxPrimary = primaryLength + overshoot;
  const minCross = -overshoot;

  let d = "";
  let goingForward = true;

  for (let i = 0; i < rows; i++) {
    const crossPos = minCross + i * rowStep + (rand() - 0.5) * rowStep * 0.3;

    for (let s = 0; s <= segs; s++) {
      const t = s / segs;
      const primaryPos = goingForward
        ? minPrimary + t * (maxPrimary - minPrimary)
        : maxPrimary - t * (maxPrimary - minPrimary);

      const cross =
        crossPos +
        Math.sin(t * Math.PI * 2.2 + i * 1.4) * (rowStep * 0.35) +
        (rand() - 0.5) * rowStep * 0.25;

      const x = direction === "vertical" ? primaryPos : cross;
      const y = direction === "vertical" ? cross : primaryPos;

      if (i === 0 && s === 0) d += `M ${x.toFixed(1)} ${y.toFixed(1)} `;
      else d += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
    }
    goingForward = !goingForward;
  }

  return { d, strokeWidth };
}

export default function LoadingScreen({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!container || !path || !svg) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    const direction = width < MOBILE_BREAKPOINT ? "vertical" : "horizontal";

    const { d, strokeWidth } = buildScribble(
      width,
      height,
      Date.now() % 100000,
      direction,
    );
    path.setAttribute("d", d);
    path.setAttribute("stroke-width", String(strokeWidth));

    const length = path.getTotalLength();
    path.setAttribute("stroke-dasharray", String(length));
    path.setAttribute("stroke-dashoffset", String(length));

    const tl = gsap.timeline({
      delay: 0.3,
      onComplete: () => {
        gsap.set(container, { display: "none" });
        onComplete?.();
      },
    });

    tl.to(path, {
      attr: { "stroke-dashoffset": 0 },
      duration: REVEAL_DURATION,
      ease: "power3.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <svg ref={svgRef} width="100%" height="100%" style={{ display: "block" }}>
        <mask id="scribble-reveal-mask" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <path
            ref={pathRef}
            fill="none"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </mask>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill={OVERLAY_COLOR}
          mask="url(#scribble-reveal-mask)"
        />
      </svg>
    </div>
  );
}
