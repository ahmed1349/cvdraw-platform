import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { templateMetadata } from "@/features/templates/registry";
import { cn } from "@/lib/cn";

export function TemplatePicker({
  currentId,
  onSelect,
  onClose,
}: {
  currentId: string;
  onSelect: (templateId: string) => void;
  onClose: () => void;
}) {
  const [filter, setFilter] = useState<"all" | "software-engineer" | "content-creator">("all");
  const items = useMemo(
    () =>
      templateMetadata.filter((item) => (filter === "all" ? true : item.category === filter)),
    [filter],
  );

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center overflow-auto bg-[#17201c]/40 p-6">
      <div className="w-full max-w-3xl rounded-xl border border-line bg-paper p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-medium text-ink-text">Templates</h2>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
        <p className="mt-1 text-sm text-muted">Your CV content stays the same. Only the layout changes.</p>
        <div className="mt-4 flex gap-3 border-b border-line">
          {(
            [
              ["all", "All"],
              ["software-engineer", "Software Engineer"],
              ["content-creator", "Content Creator"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              className={cn(
                "border-b-2 pb-2 text-sm",
                filter === id ? "border-ink text-ink-text" : "border-transparent text-muted",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid max-h-[60vh] gap-3 overflow-auto md:grid-cols-2">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelect(item.id);
                onClose();
              }}
              className={cn(
                "rounded-xl border p-4 text-left",
                currentId === item.id ? "border-ink" : "border-line",
              )}
            >
              <p className="text-sm font-medium text-ink-text">{item.name}</p>
              <p className="mt-1 text-xs text-muted">
                {item.category === "software-engineer" ? "Software Engineer" : "Content Creator"} ·{" "}
                {item.layout.replace("-", " ")} · ATS-friendly
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
