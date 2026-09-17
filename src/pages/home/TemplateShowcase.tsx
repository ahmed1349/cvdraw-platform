import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { HomeHeading, HomeLead, HomeSection } from "@/pages/home/HomeSection";
import { TemplateCard } from "@/pages/home/TemplateCard";
import { cn } from "@/lib/cn";

const tabs = ["All", "Software Engineer", "Content Creator"] as const;
const featured = ["se-01", "se-02", "se-03", "se-04", "cc-01", "cc-02"];

export function TemplateShowcase() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const ids = useMemo(() => {
    if (tab === "Software Engineer") return featured.filter((id) => id.startsWith("se-"));
    if (tab === "Content Creator") return featured.filter((id) => id.startsWith("cc-"));
    return featured;
  }, [tab]);

  return (
    <HomeSection id="templates">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <HomeHeading>Templates built for your career</HomeHeading>
          <HomeLead>Start with a proven layout, then make it yours.</HomeLead>
        </div>
        <Link to="/templates" className="text-sm font-medium text-ink hover:text-ink-text">
          View all templates →
        </Link>
      </div>

      <div className="mt-8 flex scroll-mt-24 gap-5 border-b border-line">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={cn(
              "border-b-2 pb-2 text-sm",
              tab === item ? "border-ink text-ink-text" : "border-transparent text-muted hover:text-ink-text",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3">
        {ids.map((id) => (
          <TemplateCard key={id} templateId={id} />
        ))}
      </div>
    </HomeSection>
  );
}
