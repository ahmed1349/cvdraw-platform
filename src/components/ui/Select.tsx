import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export function Select({ label, className, children, ...props }: SelectProps) {
  return (
    <label className="block">
      {label ? (
        <span className="mb-1.5 block text-sm font-medium text-ink-text">{label}</span>
      ) : null}
      <select
        className={cn(
          "h-10 w-full rounded-md border border-line bg-paper px-3 text-sm text-ink-text",
          "focus:border-ink",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}
