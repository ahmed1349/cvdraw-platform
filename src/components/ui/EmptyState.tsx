import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("rounded-xl border border-line bg-paper px-6 py-10", className)}>
      <h2 className="text-lg font-medium text-ink-text">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
