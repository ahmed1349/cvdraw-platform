import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCVStore } from "@/app/store/cvStore";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatUpdatedAt } from "@/features/cv/utils/dates";
import { openPrintView } from "@/features/pdf/exportPdf";
import { getTemplateMeta } from "@/features/templates/registry";
import { TemplatePicker } from "@/features/templates/TemplatePicker";

export function MyCVsPage() {
  const navigate = useNavigate();
  const cvs = useCVStore((state) => state.cvs);
  const isLoaded = useCVStore((state) => state.isLoaded);
  const errorMessage = useCVStore((state) => state.errorMessage);
  const [pickerId, setPickerId] = useState<string | null>(null);

  if (!isLoaded) {
    return <main className="px-5 py-12 text-sm text-muted">Loading CVs…</main>;
  }

  const picking = cvs.find((cv) => cv.id === pickerId);

  return (
    <main className="mx-auto max-w-[1200px] px-5 py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-ink-text">My CVs</h1>
          <p className="mt-2 text-sm text-muted">Saved in this browser until a backend is connected.</p>
        </div>
        <Link
          to="/create"
          className="inline-flex h-10 items-center rounded-lg bg-ink px-3.5 text-sm font-medium text-white"
        >
          Create CV
        </Link>
      </div>

      {errorMessage ? <p className="mt-4 text-sm text-danger">{errorMessage}</p> : null}

      {cvs.length === 0 ? (
        <EmptyState
          className="mt-8"
          title="No CVs yet"
          description="Create your first professional CV and start building your career profile."
          action={
            <Link
              to="/create"
              className="inline-flex h-10 items-center rounded-lg bg-ink px-3.5 text-sm font-medium text-white"
            >
              Create CV
            </Link>
          }
        />
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {cvs.map((cv) => {
            const template = getTemplateMeta(cv.templateId);
            return (
              <article key={cv.id} className="rounded-xl border border-line bg-paper p-5">
                <input
                  aria-label="Rename CV"
                  defaultValue={cv.title}
                  className="w-full border-0 bg-transparent text-base font-medium text-ink-text"
                  onBlur={(event) => {
                    const title = event.target.value.trim();
                    if (title && title !== cv.title) {
                      void useCVStore.getState().renameCV(cv.id, title);
                    }
                  }}
                />
                <p className="mt-1 text-sm text-muted">{template.name}</p>
                <p className="mt-3 text-xs text-muted">Last updated: {formatUpdatedAt(cv.updatedAt)}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button onClick={() => navigate(`/editor/${cv.id}`)}>Edit</Button>
                  <Button variant="secondary" onClick={() => void useCVStore.getState().duplicateCV(cv.id)}>
                    Duplicate
                  </Button>
                  <Button variant="secondary" onClick={() => setPickerId(cv.id)}>
                    Change Template
                  </Button>
                  <Button variant="secondary" onClick={() => openPrintView(cv.id)}>
                    Download
                  </Button>
                  <Button variant="danger" onClick={() => void useCVStore.getState().deleteCV(cv.id)}>
                    Delete
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {picking ? (
        <TemplatePicker
          currentId={picking.templateId}
          onClose={() => setPickerId(null)}
          onSelect={(templateId) => {
            void useCVStore.getState().changeTemplate(picking.id, templateId);
          }}
        />
      ) : null}
    </main>
  );
}
