import { HomeHeading, HomeSection } from "@/pages/home/HomeSection";

const steps = [
  { n: "01", title: "Choose a template" },
  { n: "02", title: "Add your information" },
  { n: "03", title: "Improve your CV" },
  { n: "04", title: "Export your PDF" },
];

export function HowItWorks() {
  return (
    <HomeSection id="how" className="border-y border-line bg-paper">
      <HomeHeading>How it works</HomeHeading>
      <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li key={step.n}>
            <p className="text-sm font-medium text-ink">{step.n}</p>
            <p className="mt-2 text-base font-medium text-ink-text">{step.title}</p>
          </li>
        ))}
      </ol>
    </HomeSection>
  );
}
