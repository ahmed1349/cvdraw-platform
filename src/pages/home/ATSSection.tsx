import { analyzeATS } from "@/features/ats/atsAnalyzer";
import { createDemoCV } from "@/features/cv/utils/demoCv";
import { HomeHeading, HomeLead, HomeSection } from "@/pages/home/HomeSection";

const approach = [
  "Semantic text instead of images",
  "Standard section headings",
  "Selectable PDF text",
  "Clean document structure",
  "No skill bars",
  "No image-based content",
];

export function ATSSection() {
  const result = analyzeATS(createDemoCV());
  const passed = result.checks.filter((check) => check.passed).slice(0, 6);

  return (
    <HomeSection id="ats">
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <div className="rounded-xl border border-line bg-paper p-5 md:p-6">
          <p className="text-sm font-medium text-ink-text">ATS readability</p>
          <p className="mt-3 text-4xl font-medium tracking-tight text-ink-text">
            {result.score} <span className="text-lg text-muted">/ 100</span>
          </p>
          <p className="mt-2 text-xs leading-5 text-muted">
            Internal structural score for this example CV. Not a guarantee of ATS performance.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-ink-text">
            {passed.map((check) => (
              <li key={check.id}>✓ {check.label.replace(" detected", "")}</li>
            ))}
          </ul>
          <div className="mt-6 border-t border-line pt-5">
            <p className="text-sm font-medium text-ink-text">Suggestions</p>
            <ul className="mt-2 space-y-2 text-sm text-muted">
              <li>! Add measurable achievements where they are missing</li>
              <li>! Add a LinkedIn URL if a role expects it</li>
            </ul>
          </div>
        </div>

        <div>
          <HomeHeading>Designed for ATS. Not just pretty PDFs.</HomeHeading>
          <HomeLead>
            Your CV should look good to people and remain readable by applicant tracking systems.
          </HomeLead>
          <ul className="mt-8 space-y-3">
            {approach.map((item) => (
              <li key={item} className="text-sm leading-6 text-ink-text">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </HomeSection>
  );
}
