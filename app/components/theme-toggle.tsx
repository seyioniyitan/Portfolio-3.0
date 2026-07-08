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

// -15deg diagonal cut across a 96x50 box, expressed as a polygon.
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
    <div className="flex w-full items-center justify-between">
      <span className="text-[14px] font-normal text-[#B0B0B5]">{label}</span>

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
        <button
          type="button"
          onClick={() => onSelect(value)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-pressed={isActive}
          aria-label={`Set theme: ${label}`}
          className="relative cursor-pointer overflow-hidden rounded-[12px]"
          style={{ width: 96, height: 50 }}
        >
          {value === "system" ? (
            <div className="relative h-full w-full">
              {/* Right half: image and background render exactly as
                  the source asset intends — untouched. */}
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

              {/* Left half: white background. A solid black layer is
                  masked using the same PNG's alpha channel, so black
                  only paints exactly where the icon's ink is — the icon
                  reads as a black silhouette against white, as if the
                  image became transparent there and black showed
                  through from behind. */}
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
        </button>
      </div>
    </div>
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
  const { theme, mounted, setTheme } = useThemeState();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open theme settings"
        aria-expanded={open}
        className="flex h-[25px] cursor-pointer items-center justify-center"
      >
        <Image
          src="/assets/theme-toggle.svg"
          width={width ? width : 24}
          height={height ? height : 24}
          alt="theme_toggle"
          priority
        />
      </button>

      {open && (
        <div className="absolute top-full right-2 z-50 mt-4.5 lg:right-[-16.5px] lg:mt-[15px]">
          <div className="absolute top-[-8px] right-[9.5px]">
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
      )}
    </div>
  );
}
