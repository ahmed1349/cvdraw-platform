import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "mint" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-[#0d2c21]",
  secondary: "bg-paper text-ink-text border border-line hover:bg-canvas",
  ghost: "bg-transparent text-ink-text hover:bg-canvas",
  mint: "bg-mint text-ink hover:bg-mint-dark",
  danger: "bg-transparent text-danger hover:bg-[#fcecec]",
};

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-3.5 text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
