import { Textarea } from "@/components/ui/Textarea";

export function SummarySection({
  value,
  onChange,
}: {
  value: string;
  onChange: (summary: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-medium text-ink-text">Professional Summary</h2>
        <p className="mt-1 text-sm leading-6 text-muted">
          Keep your summary focused on your role, experience, specialization and measurable impact.
        </p>
      </div>
      <Textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={8}
        placeholder="Software engineer with 6 years of experience building..."
      />
    </div>
  );
}
