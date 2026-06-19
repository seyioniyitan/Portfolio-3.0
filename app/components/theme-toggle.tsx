"use client";

import { useThemeState } from "@/app/hooks/use-theme-state";
import Image from "next/image";

export default function ThemeToggle({
  width,
  height,
}: {
  width?: number;
  height?: number;
}) {
  const { resolvedTheme, setTheme, mounted } = useThemeState();

  const toggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const imageSrc =
    mounted && resolvedTheme === "dark"
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
