import { Select } from "@/components/ui/Select";
import type { CVSettings } from "@/features/cv/types/cv.types";

const FONTS = ["Inter", "Georgia", "Times New Roman", "Arial", "Calibri", "Helvetica"];
const ACCENTS = ["#12372A", "#17201C", "#3D4F46", "#5C4A32", "#2C3E35"];

export function DocumentSection({
  settings,
  onChange,
}: {
  settings: CVSettings;
  onChange: (patch: Partial<CVSettings>) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-medium text-ink-text">Document</h2>
        <p className="mt-1 text-sm text-muted">
          These options apply to the current CV. Templates stay ATS-readable.
        </p>
      </div>
      <Select
        label="Font"
        value={settings.fontFamily}
        onChange={(event) => onChange({ fontFamily: event.target.value })}
      >
        {FONTS.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </Select>
      <Select
        label="Font size"
        value={settings.fontSize}
        onChange={(event) => onChange({ fontSize: event.target.value as CVSettings["fontSize"] })}
      >
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </Select>
      <Select
        label="Spacing"
        value={settings.spacing}
        onChange={(event) => onChange({ spacing: event.target.value as CVSettings["spacing"] })}
      >
        <option value="compact">Compact</option>
        <option value="normal">Normal</option>
        <option value="comfortable">Comfortable</option>
      </Select>
      <div>
        <p className="mb-1.5 text-sm font-medium text-ink-text">Accent color</p>
        <div className="flex gap-2">
          {ACCENTS.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={`Use ${color}`}
              onClick={() => onChange({ accentColor: color })}
              className="h-8 w-8 rounded-md border border-line"
              style={{
                background: color,
                outline: settings.accentColor === color ? "2px solid #12372A" : undefined,
                outlineOffset: 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
