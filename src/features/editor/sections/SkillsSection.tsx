import { Input } from "@/components/ui/Input";
import { EntryList, StringList, moveById } from "@/features/editor/components/EntryList";
import type { SkillGroup } from "@/features/cv/types/cv.types";

export function SkillsSection({
  items,
  onAdd,
  onChange,
}: {
  items: SkillGroup[];
  onAdd: () => string;
  onChange: (items: SkillGroup[]) => void;
}) {
  return (
    <EntryList
      title="Skills"
      tip="Group skills by category as text. Do not use percentages or bars."
      items={items}
      emptyText="No skill groups added yet."
      addLabel="Add skill group"
      onAdd={onAdd}
      onRemove={(id) => onChange(items.filter((item) => item.id !== id))}
      onDuplicate={(id) => duplicate(items, id, onChange)}
      onMove={(id, direction) => onChange(moveById(items, id, direction))}
      summary={(item) => ({
        title: item.category.trim() || "Skill group",
        subtitle: item.skills.filter((skill) => skill.trim()).join(", ") || "No skills yet",
      })}
    >
      {(item) => (
        <>
          <Input
            label="Category"
            placeholder="Frontend"
            value={item.category}
            onChange={(event) =>
              onChange(items.map((entry) => (entry.id === item.id ? { ...entry, category: event.target.value } : entry)))
            }
          />
          <StringList
            label="Skills"
            values={item.skills}
            placeholder="React"
            onChange={(skills) =>
              onChange(items.map((entry) => (entry.id === item.id ? { ...entry, skills } : entry)))
            }
          />
        </>
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
