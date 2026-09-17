import { DateField } from "@/components/ui/DateField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { EntryList, moveById } from "@/features/editor/components/EntryList";
import type { Education } from "@/features/cv/types/cv.types";

export function EducationSection({
  items,
  onAdd,
  onChange,
}: {
  items: Education[];
  onAdd: () => string;
  onChange: (items: Education[]) => void;
}) {
  return (
    <EntryList
      title="Education"
      tip="Include institution, degree, and dates. Grade is optional."
      items={items}
      emptyText="No education added yet."
      addLabel="Add Education"
      onAdd={onAdd}
      onRemove={(id) => onChange(items.filter((item) => item.id !== id))}
      onDuplicate={(id) => {
        const source = items.find((item) => item.id === id);
        if (!source) return;
        const copy = { ...structuredClone(source), id: crypto.randomUUID() };
        const index = items.findIndex((item) => item.id === id);
        const next = [...items];
        next.splice(index + 1, 0, copy);
        onChange(next);
      }}
      onMove={(id, direction) => onChange(moveById(items, id, direction))}
      summary={(item) => ({
        title: item.degree.trim() || "Degree",
        subtitle: item.institution.trim() || "Institution",
      })}
    >
      {(item) => (
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Institution"
            value={item.institution}
            onChange={(event) => patch(items, item.id, { institution: event.target.value }, onChange)}
          />
          <Input
            label="Degree"
            value={item.degree}
            onChange={(event) => patch(items, item.id, { degree: event.target.value }, onChange)}
          />
          <Input
            label="Field"
            value={item.field ?? ""}
            onChange={(event) => patch(items, item.id, { field: event.target.value }, onChange)}
          />
          <Input
            label="Location"
            value={item.location ?? ""}
            onChange={(event) => patch(items, item.id, { location: event.target.value }, onChange)}
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
            label="Grade"
            value={item.grade ?? ""}
            onChange={(event) => patch(items, item.id, { grade: event.target.value }, onChange)}
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
