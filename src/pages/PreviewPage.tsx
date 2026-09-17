import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCurrentCV, useCVStore } from "@/app/store/cvStore";
import { Button } from "@/components/ui/Button";
import { TemplateRenderer } from "@/features/templates/registry";
import { openPrintView } from "@/features/pdf/exportPdf";
import { validateExport } from "@/features/pdf/validateExport";

export function PreviewPage() {
  const { id } = useParams();
  const cv = useCurrentCV();
  const selectCV = useCVStore((state) => state.selectCV);
  const isLoaded = useCVStore((state) => state.isLoaded);

  useEffect(() => {
    if (id) selectCV(id);
  }, [id, selectCV]);

  if (!isLoaded) return <div className="p-8 text-sm text-muted">Loading CVs…</div>;
  if (!cv) return <div className="p-8 text-sm text-muted">CV not found.</div>;

  const exportState = validateExport(cv);

  return (
    <main className="min-h-screen bg-[#eceee9] pb-16">
      <div className="no-print mx-auto flex max-w-[900px] items-center justify-between px-5 py-4">
        <Link to={`/editor/${cv.id}`} className="text-sm text-muted hover:text-ink-text">
          Back to editor
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted">
            {exportState.ready ? "Ready to export" : "Review your CV before exporting"}
          </span>
          <Button onClick={() => openPrintView(cv.id)}>Print / Save as PDF</Button>
        </div>
      </div>
      <div className="mx-auto max-w-[900px] overflow-x-auto px-5">
        <div className="mx-auto w-[210mm] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <TemplateRenderer data={cv} mode="preview" />
        </div>
      </div>
    </main>
  );
}
