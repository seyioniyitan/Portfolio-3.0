"use client";

import { useEffect, useState } from "react";

/**
 * Subscribes to a CSS media query. Returns `null` until the client has mounted
 * so callers can avoid rendering viewport-specific UI during SSR.
 */
export function useMediaQuery(query: string): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);

    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
