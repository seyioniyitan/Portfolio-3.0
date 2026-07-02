"use client";

import clsx from "clsx";

interface SubmitButtonProps {
  isSubmitting: boolean;
  isFormValid: boolean;
}

export default function SubmitButton({
  isSubmitting,
  isFormValid,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={clsx(
        "flex w-fit cursor-pointer items-center gap-2 font-semibold select-none disabled:opacity-55",
        isFormValid ? "text-black dark:text-white" : "text-[#BFBFBF]",
      )}
    >
      <span
        className={clsx(
          "flex h-6 w-6 items-center justify-center rounded-full",
          isFormValid ? "bg-[#0088FF]" : "bg-[#8E8E93] dark:bg-neutral-600",
        )}
      >
        <span className="inline-flex">
          {isSubmitting ? (
            <span className="h-2.5 w-2.5 rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 5.67236H10M5.45956 10.6724L10 5.67236L5.45956 0.672363"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          )}
        </span>
      </span>
      <span className="underline decoration-1 underline-offset-[22%]">
        {isSubmitting ? "Sending..." : "Send project detail"}
      </span>
    </button>
  );
}
