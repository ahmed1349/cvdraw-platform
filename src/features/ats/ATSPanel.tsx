import { analyzeATS } from "@/features/ats/atsAnalyzer";
import type { CVData } from "@/features/cv/types/cv.types";

export function ATSPanel({ data, open, onToggle }: { data: CVData; open: boolean; onToggle: () => void }) {
  const result = analyzeATS(data);

  return (
    <section className="border-t border-line bg-paper">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3 text-left"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-ink-text">ATS readability</span>
        <span className="text-sm text-muted">{result.score} / 100</span>
      </button>
      {open ? (
        <div className="max-h-48 space-y-4 overflow-auto px-4 pb-4">
          <p className="text-xs leading-5 text-muted">
            This is an internal structural score, not a guarantee of ATS performance.
          </p>
          <ul className="space-y-1.5 text-sm">
            {result.checks.map((check) => (
              <li key={check.id} className={check.passed ? "text-ink-text" : "text-muted"}>
                {check.passed ? "✓" : "○"} {check.label}
              </li>
            ))}
          </ul>
          {result.suggestions.length > 0 ? (
            <div>
              <p className="mb-1.5 text-sm font-medium text-ink-text">Suggestions</p>
              <ul className="space-y-1.5 text-sm text-muted">
                {result.suggestions.map((suggestion) => (
                  <li key={suggestion}>! {suggestion}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
