"use client";

import clsx from "clsx";

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  optional?: boolean;
}

export default function FormField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  optional,
}: FormFieldProps) {
  return (
    <div className="relative flex h-[69px] flex-col">
      <label htmlFor={id} className="form-text mb-3">
        {label}{" "}
        {optional && (
          <span className="ml-2 text-[13px] font-normal text-[#727272] dark:text-[#BFBFBF]">
            (Optional)
          </span>
        )}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={clsx(
          "input-field",
          error ? "input-field-error" : "input-field-default",
        )}
      />
      {error ? (
        <div className="absolute top-[73px] text-[13px] font-medium text-[#FF5F57]">
          {error}
        </div>
      ) : null}
    </div>
  );
}
