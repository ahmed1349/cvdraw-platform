import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
}

export function Textarea({ label, hint, className, ...props }: TextareaProps) {
  return (
    <label className="block">
      {label ? (
        <span className="mb-1.5 block text-sm font-medium text-ink-text">{label}</span>
      ) : null}
      <textarea
        className={cn(
          "min-h-28 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink-text",
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
