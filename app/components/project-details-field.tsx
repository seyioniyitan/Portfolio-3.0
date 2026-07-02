"use client";

import clsx from "clsx";

interface ProjectDetailsFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

export default function ProjectDetailsField({
  value,
  onChange,
  onBlur,
  error,
}: ProjectDetailsFieldProps) {
  return (
    <div className="relative flex h-[130px] flex-col">
      <label htmlFor="projectDetails" className="form-text mb-3">
        What’s your project about?
      </label>
      <div className="relative h-[101px]">
        <textarea
          id="projectDetails"
          name="projectDetails"
          placeholder="Tell me about it..."
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          className={clsx(
            "input-field textarea-field",
            error ? "input-field-error" : "input-field-default",
          )}
        />
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-2 bottom-2"
        >
          <path d="M8 0V8H0L8 0Z" fill="#C7C7CC" />
        </svg>
      </div>

      {error ? (
        <div className="absolute top-[132px] text-[13px] font-medium text-[#FF5F57]">
          {error}
        </div>
      ) : null}
    </div>
  );
}
