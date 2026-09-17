import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCVStore } from "@/app/store/cvStore";
import { Button } from "@/components/ui/Button";
import { createDemoCV } from "@/features/cv/utils/demoCv";
import { PreviewPane } from "@/features/editor/PreviewPane";
import { templateMetadata } from "@/features/templates/registry";
import { cn } from "@/lib/cn";

const filters = [
  "All",
  "Software Engineer",
  "Content Creator",
  "One Column",
  "Two Column",
  "Minimal",
  "Modern",
  "Classic",
  "Compact",
] as const;

type Filter = (typeof filters)[number];

export function TemplatesPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const navigate = useNavigate();
  const createCV = useCVStore((state) => state.createCV);
  const demo = createDemoCV();

  const items = useMemo(() => {
    return templateMetadata.filter((template) => {
      if (filter === "All") return true;
      if (filter === "Software Engineer") return template.category === "software-engineer";
      if (filter === "Content Creator") return template.category === "content-creator";
      if (filter === "One Column") return template.layout === "one-column";
      if (filter === "Two Column") return template.layout === "two-column";
      return template.tags.includes(filter.toLowerCase() as "classic");
    });
  }, [filter]);

  async function useTemplate(templateId: string) {
    const meta = templateMetadata.find((item) => item.id === templateId);
    const category = meta?.category ?? "software-engineer";
    const cv = await createCV({
      title: category === "content-creator" ? "Content Creator — General" : "Software Engineer — General",
      templateId,
      category,
    });
    navigate(`/editor/${cv.id}`);
  }

  return (
    <main className="mx-auto max-w-[1200px] px-5 py-8 md:py-12">
      <h1 className="text-2xl font-medium text-ink-text">Templates</h1>
      <p className="mt-2 text-sm text-muted">
        All templates use the same CV data. Switching layouts never asks you to re-enter information.
      </p>

      <div className="mt-6 flex gap-4 overflow-auto border-b border-line">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={cn(
              "shrink-0 border-b-2 pb-2 text-sm",
              filter === item ? "border-ink text-ink-text" : "border-transparent text-muted",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="mt-10 text-sm text-muted">No templates in this filter yet.</p>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((template) => (
            <article key={template.id} className="overflow-hidden rounded-xl border border-line bg-paper">
              <div className="h-[280px] overflow-hidden border-b border-line">
                <PreviewPane data={{ ...demo, templateId: template.id }} label="" />
              </div>
              <div className="p-4">
                <h2 className="text-sm font-medium text-ink-text">{template.name}</h2>
                <p className="mt-1 text-xs text-muted">
                  {template.category === "software-engineer" ? "Software Engineer" : "Content Creator"} ·{" "}
                  {template.layout.replace("-", " ")} · ATS-friendly
                </p>
                <p className="mt-3 text-sm leading-6 text-muted">{template.description}</p>
                <div className="mt-4 flex gap-2">
                  <Button onClick={() => void useTemplate(template.id)}>Use Template</Button>
                  <Link
                    to="/create"
                    className="inline-flex h-10 items-center rounded-lg border border-line bg-paper px-3.5 text-sm font-medium text-ink-text"
                  >
                    Create flow
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
