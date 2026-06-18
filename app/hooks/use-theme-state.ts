"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export function useThemeState() {
  const [mounted, setMounted] = useState(false);
  const themeProps = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    ...themeProps,
    mounted,
  };
}
