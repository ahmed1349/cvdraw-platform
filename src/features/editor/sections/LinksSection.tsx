import { Input } from "@/components/ui/Input";
import { EntryList, moveById } from "@/features/editor/components/EntryList";
import type { SocialLink } from "@/features/cv/types/cv.types";

export function LinksSection({
  items,
  onAdd,
  onChange,
}: {
  items: SocialLink[];
  onAdd: () => string;
  onChange: (items: SocialLink[]) => void;
}) {
  return (
    <EntryList
      title="Links"
      items={items}
      emptyText="No additional links added yet."
      addLabel="Add Link"
      onAdd={onAdd}
      onRemove={(id) => onChange(items.filter((item) => item.id !== id))}
      onDuplicate={(id) => duplicate(items, id, onChange)}
      onMove={(id, direction) => onChange(moveById(items, id, direction))}
      summary={(item) => ({
        title: item.label.trim() || "Link",
        subtitle: item.url.trim(),
      })}
    >
      {(item) => (
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Label"
            value={item.label}
            onChange={(event) =>
              onChange(items.map((entry) => (entry.id === item.id ? { ...entry, label: event.target.value } : entry)))
            }
          />
          <Input
            label="URL"
            value={item.url}
            onChange={(event) =>
              onChange(items.map((entry) => (entry.id === item.id ? { ...entry, url: event.target.value } : entry)))
            }
          />
        </div>
      )}
    </EntryList>
  );
}

function duplicate<T extends { id: string }>(items: T[], id: string, onChange: (items: T[]) => void) {
  const source = items.find((item) => item.id === id);
  if (!source) return;
  const copy = { ...structuredClone(source), id: crypto.randomUUID() };
  const index = items.findIndex((item) => item.id === id);
  const next = [...items];
  next.splice(index + 1, 0, copy);
  onChange(next);
}
