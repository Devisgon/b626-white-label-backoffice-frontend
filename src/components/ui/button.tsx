import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white shadow-sm hover:bg-primary-hover focus-visible:ring-primary/25",

  secondary:
    "bg-primary-light text-primary hover:bg-[#dcefe7] focus-visible:ring-primary/20",

  outline:
    "border border-border bg-white text-foreground hover:border-primary/30 hover:bg-primary-light/50 focus-visible:ring-primary/20",

  ghost:
    "bg-transparent text-muted hover:bg-surface-secondary hover:text-foreground focus-visible:ring-primary/20",

  danger:
    "bg-danger text-white hover:bg-[#ad3945] focus-visible:ring-danger/25",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 rounded-lg px-3 text-xs",
  md: "h-10 rounded-xl px-4 text-sm",
  lg: "h-12 rounded-xl px-6 text-sm",
  icon: "size-10 rounded-xl p-0",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium",
          "transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-4",
          "disabled:pointer-events-none disabled:opacity-60",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {loading ? <LoaderCircle className="size-4 animate-spin" /> : leftIcon}

        {children}

        {!loading && rightIcon}
      </button>
    );
  },
);

Button.displayName = "Button";
