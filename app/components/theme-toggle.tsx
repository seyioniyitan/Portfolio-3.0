"use client";

import { useThemeState } from "@/app/hooks/use-theme-state";
import Image from "next/image";
import type { ContrastVariant } from "@/app/hooks/use-adaptive-contrast";

export default function ThemeToggle({
  width,
  height,
  contrastVariant,
}: {
  width?: number;
  height?: number;
  contrastVariant?: ContrastVariant;
}) {
  const { resolvedTheme, setTheme, mounted } = useThemeState();

  const toggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  // When sitting on a background image, pick the icon based on the
  // sampled brightness underneath it rather than the site's theme —
  // a bright photo still needs the dark-toned icon even in dark mode.
  const isDarkBackdrop = contrastVariant
    ? contrastVariant === "dark-bg"
    : mounted && resolvedTheme === "dark";

  const imageSrc = isDarkBackdrop
    ? "/assets/theme-toggle-light.svg"
    : "/assets/theme-toggle-dark.svg";

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="flex h-[25px] cursor-pointer items-center justify-center"
    >
      <Image
        src={imageSrc}
        width={`${width ? width : "24"}`}
        height={`${height ? height : "24"}`}
        alt="theme_toggle"
        priority
      />
    </button>
  );
}
