"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const COLS = 6;
const ROWS = 5;

type Cell = {
  col: number;
  row: number;
  colSpan?: number;
  rowSpan?: number;
  group: number;
};

// Hand-crafted layout: mix of 1×1, 1×2, 2×1, and L-shapes (two cells, same group)
const CELLS: Cell[] = [
  // Row 1
  { col: 1, row: 1, colSpan: 2, rowSpan: 1, group: 0 }, // wide
  { col: 3, row: 1, colSpan: 1, rowSpan: 2, group: 1 }, // tall — top of L
  { col: 4, row: 1, colSpan: 1, rowSpan: 1, group: 2 },
  { col: 5, row: 1, colSpan: 2, rowSpan: 1, group: 3 }, // wide

  // Row 2
  { col: 1, row: 2, colSpan: 1, rowSpan: 1, group: 4 },
  { col: 2, row: 2, colSpan: 1, rowSpan: 1, group: 5 },
  // col 3 row 2 filled by group 1 (tall)
  { col: 4, row: 2, colSpan: 2, rowSpan: 1, group: 6 }, // wide — bottom of L with group 3? no, independent
  { col: 6, row: 2, colSpan: 1, rowSpan: 1, group: 7 },

  // Row 3
  { col: 1, row: 3, colSpan: 1, rowSpan: 2, group: 8 }, // tall
  { col: 2, row: 3, colSpan: 2, rowSpan: 1, group: 9 }, // wide
  { col: 4, row: 3, colSpan: 1, rowSpan: 1, group: 10 },
  { col: 5, row: 3, colSpan: 1, rowSpan: 2, group: 11 }, // tall
  { col: 6, row: 3, colSpan: 1, rowSpan: 1, group: 12 },

  // Row 4
  // col 1 filled by group 8
  { col: 2, row: 4, colSpan: 1, rowSpan: 1, group: 13 },
  { col: 3, row: 4, colSpan: 2, rowSpan: 1, group: 14 }, // wide
  // col 5 filled by group 11
  { col: 6, row: 4, colSpan: 1, rowSpan: 1, group: 15 },

  // Row 5
  { col: 1, row: 5, colSpan: 3, rowSpan: 1, group: 16 }, // very wide
  { col: 4, row: 5, colSpan: 1, rowSpan: 1, group: 17 },
  { col: 5, row: 5, colSpan: 2, rowSpan: 1, group: 18 }, // wide

  // L-shapes: pair a wide with a 1×1 sharing a group number
  // L group A: group 3 (wide top-right) + group 7 (single below-right) — animate together
  // Re-assign group 7 to 3:
];

// Re-map so L-shapes share a group: group 3 (cols 5-6 row1) + col6 row2 → same group
const LAYOUT: Cell[] = [
  { col: 1, row: 1, colSpan: 2, rowSpan: 1, group: 0 },
  { col: 3, row: 1, colSpan: 1, rowSpan: 2, group: 1 },
  { col: 4, row: 1, colSpan: 1, rowSpan: 1, group: 2 },
  { col: 5, row: 1, colSpan: 2, rowSpan: 1, group: 3 }, // L top
  { col: 1, row: 2, colSpan: 1, rowSpan: 1, group: 4 },
  { col: 2, row: 2, colSpan: 1, rowSpan: 1, group: 5 },
  { col: 4, row: 2, colSpan: 2, rowSpan: 1, group: 6 },
  { col: 6, row: 2, colSpan: 1, rowSpan: 1, group: 3 }, // L bottom (same as top)
  { col: 1, row: 3, colSpan: 1, rowSpan: 2, group: 7 },
  { col: 2, row: 3, colSpan: 2, rowSpan: 1, group: 8 },
  { col: 4, row: 3, colSpan: 1, rowSpan: 1, group: 9 },
  { col: 5, row: 3, colSpan: 1, rowSpan: 2, group: 10 },
  { col: 6, row: 3, colSpan: 1, rowSpan: 1, group: 11 }, // L top
  { col: 2, row: 4, colSpan: 1, rowSpan: 1, group: 12 },
  { col: 3, row: 4, colSpan: 2, rowSpan: 1, group: 13 },
  { col: 6, row: 4, colSpan: 1, rowSpan: 1, group: 11 }, // L bottom (same as above)
  { col: 1, row: 5, colSpan: 3, rowSpan: 1, group: 14 },
  { col: 4, row: 5, colSpan: 1, rowSpan: 1, group: 15 },
  { col: 5, row: 5, colSpan: 2, rowSpan: 1, group: 16 },
];

export default function LoadingScreen({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Group cell elements by group id
    const cellEls = Array.from(
      container.querySelectorAll<HTMLDivElement>("[data-group]"),
    );

    const groupMap = new Map<number, HTMLDivElement[]>();
    cellEls.forEach((el) => {
      const g = Number(el.dataset.group);
      if (!groupMap.has(g)) groupMap.set(g, []);
      groupMap.get(g)!.push(el);
    });

    const groups = Array.from(groupMap.entries()); // [groupId, els[]]

    // Shuffle group order
    for (let i = groups.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [groups[i], groups[j]] = [groups[j], groups[i]];
    }

    const BATCH_SIZE = 3;
    const BATCH_DELAY = 0.09;
    const PANE_DURATION = 0.5;

    const tl = gsap.timeline({
      delay: 0.3,
      onComplete: () => {
        gsap.set(container, { display: "none" });
        onComplete?.();
      },
    });

    for (let b = 0; b < Math.ceil(groups.length / BATCH_SIZE); b++) {
      const batch = groups.slice(b * BATCH_SIZE, (b + 1) * BATCH_SIZE);
      // For L-shapes, all cells in the group must collapse together
      batch.forEach(([, els], i) => {
        tl.to(
          els,
          {
            scaleY: 0,
            transformOrigin: "top center",
            duration: PANE_DURATION,
            ease: "expo.inOut",
          },
          b * BATCH_DELAY + i * 0.025,
        );
      });
    }

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
        display: "grid",
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        pointerEvents: "none",
      }}
    >
      {LAYOUT.map((cell, i) => (
        <div
          key={i}
          data-group={cell.group}
          style={{
            gridColumn: `${cell.col} / span ${cell.colSpan ?? 1}`,
            gridRow: `${cell.row} / span ${cell.rowSpan ?? 1}`,
            backgroundColor: "#007AFF",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
