import { DateField } from "@/components/ui/DateField";
import { Input } from "@/components/ui/Input";
import { EntryList, moveById } from "@/features/editor/components/EntryList";
import type { Certification } from "@/features/cv/types/cv.types";

export function CertificationsSection({
  items,
  onAdd,
  onChange,
}: {
  items: Certification[];
  onAdd: () => string;
  onChange: (items: Certification[]) => void;
}) {
  return (
    <EntryList
      title="Certifications"
      items={items}
      emptyText="No certifications added yet."
      addLabel="Add Certification"
      onAdd={onAdd}
      onRemove={(id) => onChange(items.filter((item) => item.id !== id))}
      onDuplicate={(id) => duplicate(items, id, onChange)}
      onMove={(id, direction) => onChange(moveById(items, id, direction))}
      summary={(item) => ({
        title: item.name.trim() || "Certification",
        subtitle: item.issuer.trim() || "Issuer",
      })}
    >
      {(item) => (
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Name"
            value={item.name}
            onChange={(event) => patch(items, item.id, { name: event.target.value }, onChange)}
          />
          <Input
            label="Issuer"
            value={item.issuer}
            onChange={(event) => patch(items, item.id, { issuer: event.target.value }, onChange)}
          />
          <DateField
            label="Date"
            value={item.date}
            onChange={(date) => patch(items, item.id, { date }, onChange)}
          />
          <Input
            label="Credential ID"
            value={item.credentialId ?? ""}
            onChange={(event) => patch(items, item.id, { credentialId: event.target.value }, onChange)}
          />
          <div className="sm:col-span-2">
            <Input
              label="URL"
              value={item.url ?? ""}
              onChange={(event) => patch(items, item.id, { url: event.target.value }, onChange)}
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
