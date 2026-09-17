import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCVStore } from "@/app/store/cvStore";
import { Button } from "@/components/ui/Button";
import { createDemoCV } from "@/features/cv/utils/demoCv";
import { PreviewPane } from "@/features/editor/PreviewPane";
import { getTemplateMeta } from "@/features/templates/registry";

export function TemplateCard({
  templateId,
  compact = false,
}: {
  templateId: string;
  compact?: boolean;
}) {
  const navigate = useNavigate();
  const createCV = useCVStore((state) => state.createCV);
  const template = getTemplateMeta(templateId);
  const demo = useMemo(() => ({ ...createDemoCV(), templateId }), [templateId]);
  const category = template.category === "software-engineer" ? "Software Engineer" : "Content Creator";

  async function useTemplate() {
    const cv = await createCV({
      title: template.category === "content-creator" ? "Content Creator — General" : "Software Engineer — General",
      templateId,
      category: template.category,
    });
    navigate(`/editor/${cv.id}`);
  }

  return (
    <article className="flex min-w-[240px] flex-col overflow-hidden rounded-xl border border-line bg-paper transition-colors duration-150 hover:border-ink md:min-w-0">
      <div className={compact ? "h-[200px] overflow-hidden border-b border-line" : "h-[240px] overflow-hidden border-b border-line"}>
        <PreviewPane data={demo} label="" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-medium text-ink-text">{template.name}</h3>
            <p className="mt-1 text-xs text-muted">{category}</p>
          </div>
          <span className="shrink-0 rounded-md border border-line px-1.5 py-0.5 text-[11px] text-muted">
            ATS-friendly
          </span>
        </div>
        <div className="mt-4">
          <Button className="h-9" onClick={() => void useTemplate()}>
            Use template
          </Button>
        </div>
      </div>
    </article>
  );
}
