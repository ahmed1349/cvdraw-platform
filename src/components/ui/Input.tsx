import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

export function Input({ label, hint, id, className, ...props }: InputProps) {
  return (
    <label className="block">
      {label ? (
        <span className="mb-1.5 block text-sm font-medium text-ink-text">{label}</span>
      ) : null}
      <input
        id={id}
        className={cn(
          "h-10 w-full rounded-md border border-line bg-paper px-3 text-sm text-ink-text",
          "placeholder:text-muted",
          "focus:border-ink",
          className,
        )}
        {...props}
      />
      {hint ? <span className="mt-1.5 block text-xs text-muted">{hint}</span> : null}
    </label>
  );
}
