"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useThemeState } from "@/app/hooks/use-theme-state";
import type { ContrastVariant } from "@/app/hooks/use-adaptive-contrast";

type ThemeOption = "system" | "light" | "dark";

const OPTIONS: { value: ThemeOption; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

const DARK_BUTTON_BG = "#232323";

const ICON_SRC: Record<ThemeOption, string> = {
  system: "/assets/theme-system.svg",
  light: "/assets/theme-light.svg",
  dark: "/assets/theme-dark.svg",
};

const SLANT_OFFSET = 50 * Math.tan((15 * Math.PI) / 180);

const LEFT_HALF_POLYGON = `polygon(0 0, ${48 + SLANT_OFFSET}px 0, ${48 - SLANT_OFFSET}px 50px, 0 50px)`;
const RIGHT_HALF_POLYGON = `polygon(${48 + SLANT_OFFSET}px 0, 96px 0, 96px 50px, ${48 - SLANT_OFFSET}px 50px)`;

function CheckBadge() {
  return (
    <span
      className="absolute flex items-center justify-center rounded-full bg-[#007AFF]"
      style={{ width: 20, height: 20, top: 3, left: 73 }}
    >
      <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
        <path
          d="M1 4.5L4 7.5L10 1"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function ThemeOptionButton({
  value,
  label,
  isActive,
  onSelect,
}: {
  value: ThemeOption;
  label: string;
  isActive: boolean;
  onSelect: (value: ThemeOption) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const highlighted = isActive || isHovered;

  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-pressed={isActive}
      aria-label={`Set theme: ${label}`}
      className="flex w-full cursor-pointer items-center justify-between"
    >
      <span
        className={`text-[14px] font-normal ${
          highlighted ? "text-white" : "text-[#B0B0B5]"
        }`}
      >
        {label}
      </span>

      <div
        className="flex items-center justify-center rounded-[15px] transition-none"
        style={{
          width: 100,
          height: 54,
          padding: 2,
          border: `1px solid ${highlighted ? "#007AFF" : "#3D3D3D"}`,
          boxShadow: highlighted ? "0 0 0 2px #007AFF66" : "none",
        }}
      >
        <div
          className="relative overflow-hidden rounded-[12px]"
          style={{ width: 96, height: 50 }}
        >
          {value === "system" ? (
            <div className="relative h-full w-full">
              <div
                className="absolute inset-0"
                style={{
                  clipPath: RIGHT_HALF_POLYGON,
                  backgroundColor: DARK_BUTTON_BG,
                }}
              >
                <div className="absolute top-1/2 left-1/2 h-8.5 w-14 -translate-x-1/2 -translate-y-1/2">
                  <Image
                    src={ICON_SRC.system}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div
                className="absolute inset-0"
                style={{
                  clipPath: LEFT_HALF_POLYGON,
                  backgroundColor: "#ffffff",
                }}
              >
                <div className="absolute top-1/2 left-1/2 h-8.5 w-14 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="absolute inset-0 bg-black"
                    style={{
                      WebkitMaskImage: `url(${ICON_SRC.system})`,
                      maskImage: `url(${ICON_SRC.system})`,
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                backgroundColor: value === "light" ? "#ffffff" : DARK_BUTTON_BG,
              }}
            >
              <div className="relative h-8.5 w-14">
                <Image
                  src={ICON_SRC[value]}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}

          {isActive && <CheckBadge />}
        </div>
      </div>
    </button>
  );
}

export default function ThemeToggle({
  width,
  height,
  contrastVariant,
}: {
  width?: number;
  height?: number;
  contrastVariant?: ContrastVariant;
}) {
  const { theme, mounted, setTheme, resolvedTheme } = useThemeState();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleImage = "/assets/theme-toggle.svg";
  const imageSrc =
    mounted && resolvedTheme === "dark"
      ? toggleImage.replace(".svg", "-light.svg")
      : toggleImage.replace(".svg", "-dark.svg");

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleSelect = (value: ThemeOption) => {
    setTheme(value);
    setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-8 w-8 shrink-0 items-center justify-center"
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open theme settings"
        aria-expanded={open}
        className="relative flex h-7.5 w-7.5 shrink-0 items-center justify-center"
      >
        <div
          className="relative h-full w-full"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <Image
            src={imageSrc}
            alt="theme_toggle"
            fill
            priority
            sizes="32px"
            className="object-contain"
            style={{
              opacity: open ? 0 : 1,
              transition: "opacity 320ms ease",
            }}
          />

          <Image
            src="/assets/theme-toggle-open.svg"
            alt=""
            fill
            priority
            sizes="32px"
            className="object-contain"
            style={{
              opacity: open ? 1 : 0,
              transition: "opacity 320ms ease",
            }}
          />
        </div>
      </button>

      <div
        className="absolute top-full right-0 z-50 mt-4.5 lg:right-[-16.5px] lg:mt-[15px]"
        style={{
          opacity: open ? 1 : 0,
          transform: open
            ? "translateY(0) scale(1)"
            : "translateY(-6px) scale(0.96)",
          transformOrigin: "top right",
          transition:
            "opacity 220ms ease, transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          pointerEvents: open ? "auto" : "none",
        }}
        aria-hidden={!open}
      >
        <div className="absolute top-[-8px] right-0 lg:right-[9.5px]">
          <Image
            src="/assets/dropdown-arrow.svg"
            width={37}
            height={18}
            alt="arrow"
            aria-hidden="true"
          />
        </div>

        <div
          className="flex flex-col items-center justify-center gap-2 rounded-[4px] bg-black px-[11px] py-[12px]"
          style={{ width: 218, height: 202 }}
        >
          {OPTIONS.map(({ value, label }) => (
            <ThemeOptionButton
              key={value}
              value={value}
              label={label}
              isActive={mounted && theme === value}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
