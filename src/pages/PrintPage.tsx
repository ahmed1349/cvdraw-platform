import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCurrentCV, useCVStore } from "@/app/store/cvStore";
import { TemplateRenderer } from "@/features/templates/registry";

export function PrintPage() {
  const { id } = useParams();
  const cv = useCurrentCV();
  const selectCV = useCVStore((state) => state.selectCV);
  const isLoaded = useCVStore((state) => state.isLoaded);

  useEffect(() => {
    if (id) selectCV(id);
  }, [id, selectCV]);

  useEffect(() => {
    if (!cv) return;
    const timer = window.setTimeout(() => window.print(), 400);
    return () => window.clearTimeout(timer);
  }, [cv]);

  if (!isLoaded || !cv) {
    return <div className="p-8 text-sm text-muted">Preparing PDF…</div>;
  }

  return (
    <div className="print-root bg-white">
      <TemplateRenderer data={cv} mode="print" />
    </div>
  );
}
