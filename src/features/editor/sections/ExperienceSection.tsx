import { DateField } from "@/components/ui/DateField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { EntryList, StringList } from "@/features/editor/components/EntryList";
import type { Experience } from "@/features/cv/types/cv.types";

interface ExperienceSectionProps {
  items: Experience[];
  onAdd: () => string;
  onUpdate: (id: string, patch: Partial<Experience>) => void;
  onRemove: (id: string) => void;
  onDuplicate: (id: string) => void;
  onMove: (id: string, direction: "up" | "down") => void;
  onAchievements: (id: string, achievements: string[]) => void;
}

export function ExperienceSection({
  items,
  onAdd,
  onUpdate,
  onRemove,
  onDuplicate,
  onMove,
  onAchievements,
}: ExperienceSectionProps) {
  return (
    <EntryList
      title="Experience"
      tip="Start bullets with strong action verbs: Developed, Designed, Implemented, Optimized, Automated, Led, Architected, Reduced, Improved."
      items={items}
      emptyText="No experience added yet."
      addLabel="Add Experience"
      onAdd={onAdd}
      onRemove={onRemove}
      onDuplicate={onDuplicate}
      onMove={onMove}
      summary={(item) => ({
        title: item.position.trim() || "Untitled role",
        subtitle: item.company.trim() || "Company",
      })}
    >
      {(item) => (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Position"
              value={item.position}
              onChange={(event) => onUpdate(item.id, { position: event.target.value })}
            />
            <Input
              label="Company"
              value={item.company}
              onChange={(event) => onUpdate(item.id, { company: event.target.value })}
            />
            <Input
              label="Location"
              value={item.location ?? ""}
              onChange={(event) => onUpdate(item.id, { location: event.target.value })}
            />
            <label className="flex items-end gap-2 pb-2 text-sm text-ink-text">
              <input
                type="checkbox"
                checked={item.current}
                onChange={(event) =>
                  onUpdate(item.id, {
                    current: event.target.checked,
                    endDate: event.target.checked ? "" : item.endDate,
                  })
                }
              />
              Current role
            </label>
            <DateField
              label="Start date"
              value={item.startDate}
              onChange={(startDate) => onUpdate(item.id, { startDate })}
            />
            <DateField
              label="End date"
              value={item.endDate}
              disabled={item.current}
              onChange={(endDate) => onUpdate(item.id, { endDate })}
            />
          </div>
          <Textarea
            label="Description"
            hint="Prefer measurable achievements over a paragraph when you can."
            value={item.description}
            onChange={(event) => onUpdate(item.id, { description: event.target.value })}
          />
          <StringList
            label="Achievements"
            values={item.achievements}
            placeholder="Reduced page load time by 35%."
            onChange={(achievements) => onAchievements(item.id, achievements)}
          />
        </>
      )}
    </EntryList>
  );
}
