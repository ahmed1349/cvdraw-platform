import { lazy, Suspense } from "react";
import type { CVData } from "@/features/cv/types/cv.types";
import { templateCatalog } from "@/features/templates/catalog";
import type { CVTemplateProps } from "@/features/templates/types";

const ThemedCV = lazy(() =>
  import("@/features/templates/engine/ThemedCV").then((module) => ({ default: module.ThemedCV })),
);

export const templateMetadata = templateCatalog.map((item) => item.meta);

export function getTemplateMeta(id: string) {
  return templateMetadata.find((item) => item.id === id) ?? templateMetadata[0]!;
}

export function TemplateRenderer({
  data,
  mode = "preview",
}: {
  data: CVData;
  mode?: CVTemplateProps["mode"];
}) {
  return (
    <Suspense fallback={<div className="cv-page" />}>
      <ThemedCV data={data} mode={mode} />
    </Suspense>
  );
}
