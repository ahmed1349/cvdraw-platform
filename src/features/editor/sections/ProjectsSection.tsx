import { DateField } from "@/components/ui/DateField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { EntryList, StringList, moveById } from "@/features/editor/components/EntryList";
import type { Project } from "@/features/cv/types/cv.types";

export function ProjectsSection({
  items,
  onAdd,
  onChange,
}: {
  items: Project[];
  onAdd: () => string;
  onChange: (items: Project[]) => void;
}) {
  return (
    <EntryList
      title="Projects"
      tip="Describe the problem, your role, the stack, and a measurable result."
      items={items}
      emptyText="No projects added yet."
      addLabel="Add Project"
      onAdd={onAdd}
      onRemove={(id) => onChange(items.filter((item) => item.id !== id))}
      onDuplicate={(id) => duplicate(items, id, onChange)}
      onMove={(id, direction) => onChange(moveById(items, id, direction))}
      summary={(item) => ({
        title: item.name.trim() || "Untitled project",
        subtitle: item.role?.trim() || item.technologies.filter(Boolean).join(", "),
      })}
    >
      {(item) => (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Name"
              value={item.name}
              onChange={(event) => patch(items, item.id, { name: event.target.value }, onChange)}
            />
            <Input
              label="Role"
              value={item.role ?? ""}
              onChange={(event) => patch(items, item.id, { role: event.target.value }, onChange)}
            />
            <DateField
              label="Start date"
              value={item.startDate}
              onChange={(startDate) => patch(items, item.id, { startDate }, onChange)}
            />
            <DateField
              label="End date"
              value={item.endDate}
              onChange={(endDate) => patch(items, item.id, { endDate }, onChange)}
            />
            <Input
              label="URL"
              value={item.url ?? ""}
              onChange={(event) => patch(items, item.id, { url: event.target.value }, onChange)}
            />
            <Input
              label="GitHub"
              value={item.github ?? ""}
              onChange={(event) => patch(items, item.id, { github: event.target.value }, onChange)}
            />
          </div>
          <Textarea
            label="Description"
            value={item.description}
            onChange={(event) => patch(items, item.id, { description: event.target.value }, onChange)}
          />
          <StringList
            label="Technologies"
            values={item.technologies}
            placeholder="TypeScript"
            onChange={(technologies) => patch(items, item.id, { technologies }, onChange)}
          />
          <StringList
            label="Achievements"
            values={item.achievements ?? [""]}
            placeholder="Shipped to 14 teams in private beta."
            onChange={(achievements) => patch(items, item.id, { achievements }, onChange)}
          />
        </>
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
