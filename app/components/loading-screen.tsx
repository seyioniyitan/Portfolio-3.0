"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const COLS = 6;
const ROWS = 5;

export default function LoadingScreen({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const total = COLS * ROWS;
    const panes = Array.from(
      container.querySelectorAll<HTMLDivElement>(".pane"),
    );

    // Build a randomised order so panes reveal in scattered batches
    const indices = Array.from({ length: total }, (_, i) => i);
    // Shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const BATCH_SIZE = 6;
    const BATCH_DELAY = 0.1; // seconds between each batch
    const PANE_DURATION = 0.55;

    const tl = gsap.timeline({
      delay: 0.4,
      onComplete: () => {
        // Hide the whole overlay after all panes are gone
        gsap.set(container, { display: "none" });
        onComplete?.();
      },
    });

    for (let b = 0; b < Math.ceil(total / BATCH_SIZE); b++) {
      const batch = indices.slice(b * BATCH_SIZE, (b + 1) * BATCH_SIZE);
      const batchPanes = batch.map((i) => panes[i]).filter(Boolean);

      tl.to(
        batchPanes,
        {
          scaleY: 0,
          transformOrigin: "top center",
          duration: PANE_DURATION,
          ease: "expo.inOut",
          stagger: 0.03,
        },
        b * BATCH_DELAY,
      );
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
      {Array.from({ length: COLS * ROWS }).map((_, i) => (
        <div
          key={i}
          className="pane"
          style={{
            backgroundColor: "#007AFF",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
