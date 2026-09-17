import { type ReactNode, useState } from "react";
import { ChevronDown, ChevronUp, Copy, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface EntryListProps<T extends { id: string }> {
  title: string;
  tip?: string;
  items: T[];
  emptyText: string;
  addLabel: string;
  onAdd: () => string;
  onRemove: (id: string) => void;
  onDuplicate: (id: string) => void;
  onMove: (id: string, direction: "up" | "down") => void;
  summary: (item: T) => { title: string; subtitle?: string };
  children: (item: T) => ReactNode;
}

export function EntryList<T extends { id: string }>({
  title,
  tip,
  items,
  emptyText,
  addLabel,
  onAdd,
  onRemove,
  onDuplicate,
  onMove,
  summary,
  children,
}: EntryListProps<T>) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-medium text-ink-text">{title}</h2>
        {tip ? <p className="mt-1 text-sm leading-6 text-muted">{tip}</p> : null}
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-line bg-paper px-4 py-6">
          <p className="text-sm text-muted">{emptyText}</p>
          <Button className="mt-4" onClick={() => setOpenId(onAdd())}>
            <Plus size={16} />
            {addLabel}
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => {
            const open = openId === item.id;
            const meta = summary(item);
            return (
              <article key={item.id} className="rounded-xl border border-line bg-paper">
                <div className="flex items-center gap-2 border-b border-line px-3 py-2">
                  <button
                    type="button"
                    className="min-w-0 flex-1 text-left"
                    onClick={() => setOpenId(open ? null : item.id)}
                  >
                    <span className="block truncate text-sm font-medium text-ink-text">{meta.title}</span>
                    {meta.subtitle ? (
                      <span className="block truncate text-xs text-muted">{meta.subtitle}</span>
                    ) : null}
                  </button>
                  <button
                    type="button"
                    className="rounded p-1 text-muted hover:text-ink-text disabled:opacity-30"
                    aria-label="Move up"
                    disabled={index === 0}
                    onClick={() => onMove(item.id, "up")}
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    type="button"
                    className="rounded p-1 text-muted hover:text-ink-text disabled:opacity-30"
                    aria-label="Move down"
                    disabled={index === items.length - 1}
                    onClick={() => onMove(item.id, "down")}
                  >
                    <ChevronDown size={16} />
                  </button>
                  <button
                    type="button"
                    className="rounded p-1 text-muted hover:text-ink-text"
                    aria-label="Duplicate"
                    onClick={() => onDuplicate(item.id)}
                  >
                    <Copy size={15} />
                  </button>
                  <button
                    type="button"
                    className="rounded p-1 text-danger hover:bg-[#fcecec]"
                    aria-label="Delete"
                    onClick={() => onRemove(item.id)}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                <div className={cn(!open && "hidden", "space-y-4 p-4")}>{children(item)}</div>
              </article>
            );
          })}
          <Button
            variant="secondary"
            onClick={() => {
              const id = onAdd();
              setOpenId(id);
            }}
          >
            <Plus size={16} />
            {addLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

export function StringList({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <p className="mb-1.5 text-sm font-medium text-ink-text">{label}</p>
      <div className="space-y-2">
        {values.map((value, index) => (
          <div key={`${label}-${index}`} className="flex gap-2">
            <input
              className="h-10 w-full rounded-md border border-line bg-paper px-3 text-sm"
              value={value}
              placeholder={placeholder}
              onChange={(event) => {
                const next = [...values];
                next[index] = event.target.value;
                onChange(next);
              }}
            />
            <Button
              variant="ghost"
              className="px-2"
              aria-label={`Remove ${label}`}
              onClick={() => onChange(values.filter((_, idx) => idx !== index))}
            >
              <Trash2 size={15} />
            </Button>
          </div>
        ))}
      </div>
      <Button variant="secondary" className="mt-3" onClick={() => onChange([...values, ""])}>
        <Plus size={16} />
        Add
      </Button>
    </div>
  );
}

export function moveById<T extends { id: string }>(items: T[], id: string, direction: "up" | "down") {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return items;
  const target = direction === "up" ? index - 1 : index + 1;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  const current = next[index];
  const swap = next[target];
  if (!current || !swap) return items;
  next[index] = swap;
  next[target] = current;
  return next;
}
