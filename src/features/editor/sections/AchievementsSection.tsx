import { DateField } from "@/components/ui/DateField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { EntryList, moveById } from "@/features/editor/components/EntryList";
import type { Achievement } from "@/features/cv/types/cv.types";

export function AchievementsSection({
  items,
  onAdd,
  onChange,
}: {
  items: Achievement[];
  onAdd: () => string;
  onChange: (items: Achievement[]) => void;
}) {
  return (
    <EntryList
      title="Achievements"
      items={items}
      emptyText="No achievements added yet."
      addLabel="Add Achievement"
      onAdd={onAdd}
      onRemove={(id) => onChange(items.filter((item) => item.id !== id))}
      onDuplicate={(id) => duplicate(items, id, onChange)}
      onMove={(id, direction) => onChange(moveById(items, id, direction))}
      summary={(item) => ({
        title: item.title.trim() || "Achievement",
        subtitle: item.description?.trim(),
      })}
    >
      {(item) => (
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Title"
            value={item.title}
            onChange={(event) => patch(items, item.id, { title: event.target.value }, onChange)}
          />
          <DateField
            label="Date"
            value={item.date}
            onChange={(date) => patch(items, item.id, { date }, onChange)}
          />
          <div className="sm:col-span-2">
            <Textarea
              label="Description"
              value={item.description ?? ""}
              onChange={(event) => patch(items, item.id, { description: event.target.value }, onChange)}
            />
          </div>
        </div>
      )}
    </EntryList>
  );
}

function patch<T extends { id: string }>(
  items: T[],
  id: string,
  next: Partial<T>,
  onChange: (items: T[]) => void,
) {
  onChange(items.map((item) => (item.id === id ? { ...item, ...next } : item)));
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
