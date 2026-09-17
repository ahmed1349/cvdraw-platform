import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCVStore } from "@/app/store/cvStore";
import type { TemplateCategory } from "@/features/cv/types/cv.types";
import { templateMetadata } from "@/features/templates/registry";
import { cn } from "@/lib/cn";

export function CreateCVPage() {
  const navigate = useNavigate();
  const createCV = useCVStore((state) => state.createCV);
  const errorMessage = useCVStore((state) => state.errorMessage);
  const [step, setStep] = useState<1 | 2>(1);
  const [category, setCategory] = useState<TemplateCategory>("software-engineer");
  const [pendingId, setPendingId] = useState<string | null>(null);

  const templates = useMemo(
    () => templateMetadata.filter((item) => item.category === category),
    [category],
  );

  function openCategory(nextCategory: TemplateCategory) {
    setCategory(nextCategory);
    setStep(2);
  }

  async function handleCreate(templateId: string) {
    setPendingId(templateId);
    try {
      const title =
        category === "software-engineer" ? "Software Engineer — General" : "Content Creator — General";
      const cv = await createCV({
        title,
        templateId,
        category,
      });
      navigate(`/editor/${cv.id}`);
    } catch {
      setPendingId(null);
    }
  }

  return (
    <main className="mx-auto max-w-[860px] px-5 py-8 md:py-12">
      <h1 className="text-2xl font-medium text-ink-text">Create a CV</h1>
      <p className="mt-2 text-sm text-muted">
        {step === 1 ? "What type of CV are you creating?" : "Choose a template"}
      </p>

      {step === 2 ? (
        <button
          type="button"
          className="mt-4 text-sm text-muted hover:text-ink-text"
          onClick={() => {
            setStep(1);
            setPendingId(null);
          }}
        >
          Back
        </button>
      ) : null}

      {step === 1 ? (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <CategoryCard
            title="Software Engineer"
            description="Technical skills, projects, and experience for engineering roles."
            onSelect={() => openCategory("software-engineer")}
          />
          <CategoryCard
            title="Content Creator"
            description="Portfolio, brand, and social-facing experience for creator roles."
            onSelect={() => openCategory("content-creator")}
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {templates.map((template) => (
            <button
              key={template.id}
              type="button"
              disabled={pendingId !== null}
              onClick={() => void handleCreate(template.id)}
              className={cn(
                "rounded-xl border border-line bg-paper p-5 text-left transition-colors duration-150 hover:border-ink disabled:opacity-60",
                pendingId === template.id && "border-ink",
              )}
            >
              <p className="text-sm font-medium text-ink-text">{template.name}</p>
              <p className="mt-1 text-xs text-muted">
                {template.category === "software-engineer" ? "Software Engineer" : "Content Creator"} ·{" "}
                {template.layout.replace("-", " ")} · ATS-friendly
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">{template.description}</p>
              {pendingId === template.id ? (
                <p className="mt-3 text-sm text-ink-text">Starting editor…</p>
              ) : null}
            </button>
          ))}
        </div>
      )}

      {errorMessage ? <p className="mt-4 text-sm text-danger">{errorMessage}</p> : null}
    </main>
  );
}

function CategoryCard({
  title,
  description,
  onSelect,
}: {
  title: string;
  description: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="rounded-xl border border-line bg-paper p-5 text-left transition-colors duration-150 hover:border-ink"
    >
      <p className="text-base font-medium text-ink-text">{title}</p>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
    </button>
  );
}
