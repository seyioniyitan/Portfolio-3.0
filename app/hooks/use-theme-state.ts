"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export function useThemeState() {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme, ...rest } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      setTheme("system");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, setTheme]);

  return {
    theme,
    resolvedTheme,
    setTheme,
    ...rest,
    mounted,
  };
}
