import { Copy, FileCheck, LayoutTemplate, PanelRight } from "lucide-react";
import { HomeHeading, HomeSection } from "@/pages/home/HomeSection";

const features = [
  {
    icon: FileCheck,
    title: "ATS-first structure",
    body: "Standard sections, selectable text and clean document structure designed for machine readability.",
  },
  {
    icon: LayoutTemplate,
    title: "40+ professional templates",
    body: "One set of CV data. Switch templates without rewriting your CV.",
  },
  {
    icon: PanelRight,
    title: "Live editor + PDF",
    body: "See your CV update instantly and export a clean A4 PDF.",
  },
  {
    icon: Copy,
    title: "Multiple CV versions",
    body: "Create targeted versions for different roles without rebuilding your CV.",
  },
];

export function Features() {
  return (
    <HomeSection id="features" className="border-y border-line bg-paper">
      <HomeHeading>Everything you need to build a better CV.</HomeHeading>
      <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <article key={feature.title} className="max-w-md">
              <Icon size={18} className="text-ink" />
              <h3 className="mt-3 text-base font-medium text-ink-text">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{feature.body}</p>
            </article>
          );
        })}
      </div>
    </HomeSection>
  );
}
