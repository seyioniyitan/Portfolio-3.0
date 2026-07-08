"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function useThemeState() {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme, ...rest } = useTheme();
  const setThemeRef = useRef(setTheme);
  setThemeRef.current = setTheme;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      // Read the *current* theme value fresh at fire-time via
      // localStorage directly, rather than trusting a possibly-stale
      // closed-over `theme` from when this effect was created — this
      // guards against any scenario where `theme` drifted without this
      // effect re-running.
      const stored = window.localStorage.getItem("theme");
      if (stored === "system" || stored === null) {
        setThemeRef.current("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
    // Deliberately only depends on `mounted` — attach exactly once per
    // mount, not once per `theme` change, so there's no window where
    // rapid theme changes tear down and reattach the listener.
  }, [mounted]);

  return {
    theme,
    resolvedTheme,
    setTheme,
    ...rest,
    mounted,
  };
}
