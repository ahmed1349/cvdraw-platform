import { DateField } from "@/components/ui/DateField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { EntryList, StringList, moveById } from "@/features/editor/components/EntryList";
import { emptyCustomSectionItem } from "@/features/cv/utils/defaults";
import type { CustomSection } from "@/features/cv/types/cv.types";

export function CustomSectionsEditor({
  items,
  onAdd,
  onChange,
}: {
  items: CustomSection[];
  onAdd: () => string;
  onChange: (items: CustomSection[]) => void;
}) {
  return (
    <EntryList
      title="Custom Sections"
      tip="Use standard names where you can: Publications, Awards, Volunteer Experience, Professional Memberships."
      items={items}
      emptyText="No custom sections yet."
      addLabel="Add custom section"
      onAdd={onAdd}
      onRemove={(id) => onChange(items.filter((item) => item.id !== id))}
      onDuplicate={(id) => duplicate(items, id, onChange)}
      onMove={(id, direction) => onChange(moveById(items, id, direction))}
      summary={(item) => ({
        title: item.title.trim() || "Custom section",
        subtitle: `${item.items.length} item${item.items.length === 1 ? "" : "s"}`,
      })}
    >
      {(section) => (
        <div className="space-y-4">
          <Input
            label="Section title"
            value={section.title}
            onChange={(event) =>
              onChange(
                items.map((entry) => (entry.id === section.id ? { ...entry, title: event.target.value } : entry)),
              )
            }
          />
          {section.items.map((item) => (
            <div key={item.id} className="space-y-3 rounded-lg border border-line p-3">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Title"
                  value={item.title}
                  onChange={(event) => updateItem(items, section.id, item.id, { title: event.target.value }, onChange)}
                />
                <Input
                  label="Subtitle"
                  value={item.subtitle ?? ""}
                  onChange={(event) =>
                    updateItem(items, section.id, item.id, { subtitle: event.target.value }, onChange)
                  }
                />
                <DateField
                  label="Date"
                  value={item.date}
                  onChange={(date) => updateItem(items, section.id, item.id, { date }, onChange)}
                />
              </div>
              <Textarea
                label="Description"
                value={item.description ?? ""}
                onChange={(event) =>
                  updateItem(items, section.id, item.id, { description: event.target.value }, onChange)
                }
              />
              <StringList
                label="Bullets"
                values={item.bullets ?? [""]}
                onChange={(bullets) => updateItem(items, section.id, item.id, { bullets }, onChange)}
              />
              <Button
                variant="danger"
                onClick={() =>
                  onChange(
                    items.map((entry) =>
                      entry.id === section.id
                        ? { ...entry, items: entry.items.filter((row) => row.id !== item.id) }
                        : entry,
                    ),
                  )
                }
              >
                Remove item
              </Button>
            </div>
          ))}
          <Button
            variant="secondary"
            onClick={() =>
              onChange(
                items.map((entry) =>
                  entry.id === section.id
                    ? { ...entry, items: [...entry.items, emptyCustomSectionItem()] }
                    : entry,
                ),
              )
            }
          >
            Add item
          </Button>
        </div>
      )}
    </EntryList>
  );
}

function updateItem(
  items: CustomSection[],
  sectionId: string,
  itemId: string,
  patch: Partial<CustomSection["items"][number]>,
  onChange: (items: CustomSection[]) => void,
) {
  onChange(
    items.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            items: section.items.map((item) => (item.id === itemId ? { ...item, ...patch } : item)),
          }
        : section,
    ),
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
