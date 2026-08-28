import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "@/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightElement?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      error,
      helperText,
      leftIcon,
      rightElement,
      className,
      required,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="
              mb-2 block text-xs font-semibold
              text-foreground
            "
          >
            {label}

            {required && <span className="ml-1 text-danger">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span
              className="
                pointer-events-none absolute left-3 top-1/2
                flex -translate-y-1/2 items-center
                text-muted
              "
            >
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            required={required}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            className={cn(
              "h-11 w-full rounded-xl border bg-white",
              "px-3 text-sm text-foreground outline-none",
              "placeholder:text-muted-light",
              "transition-all duration-200",
              "focus:border-primary focus:ring-4 focus:ring-primary/10",
              "disabled:cursor-not-allowed disabled:bg-surface-secondary",
              leftIcon && "pl-10",
              rightElement && "pr-11",
              error
                ? "border-danger focus:border-danger focus:ring-danger/10"
                : "border-border",
              className,
            )}
            {...props}
          />

          {rightElement && (
            <span
              className="
                absolute right-2 top-1/2
                flex -translate-y-1/2 items-center
              "
            >
              {rightElement}
            </span>
          )}
        </div>

        {error ? (
          <p
            id={`${id}-error`}
            role="alert"
            className="mt-1.5 text-[11px] font-medium text-danger"
          >
            {error}
          </p>
        ) : helperText ? (
          <p id={`${id}-helper`} className="mt-1.5 text-[11px] text-muted">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
