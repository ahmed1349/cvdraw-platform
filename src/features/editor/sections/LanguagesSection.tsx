import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { EntryList, moveById } from "@/features/editor/components/EntryList";
import type { Language } from "@/features/cv/types/cv.types";

const LEVELS = [
  "Native",
  "Bilingual Proficiency",
  "Professional Working Proficiency",
  "Limited Working Proficiency",
  "Elementary",
];

export function LanguagesSection({
  items,
  onAdd,
  onChange,
}: {
  items: Language[];
  onAdd: () => string;
  onChange: (items: Language[]) => void;
}) {
  return (
    <EntryList
      title="Languages"
      tip="Write proficiency as text. Do not use stars or bars."
      items={items}
      emptyText="No languages added yet."
      addLabel="Add Language"
      onAdd={onAdd}
      onRemove={(id) => onChange(items.filter((item) => item.id !== id))}
      onDuplicate={(id) => duplicate(items, id, onChange)}
      onMove={(id, direction) => onChange(moveById(items, id, direction))}
      summary={(item) => ({
        title: item.name.trim() || "Language",
        subtitle: item.proficiency,
      })}
    >
      {(item) => (
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Language"
            value={item.name}
            onChange={(event) =>
              onChange(items.map((entry) => (entry.id === item.id ? { ...entry, name: event.target.value } : entry)))
            }
          />
          <Select
            label="Proficiency"
            value={item.proficiency}
            onChange={(event) =>
              onChange(
                items.map((entry) => (entry.id === item.id ? { ...entry, proficiency: event.target.value } : entry)),
              )
            }
          >
            {LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </Select>
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
