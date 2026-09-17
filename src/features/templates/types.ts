import type { CVData } from "@/features/cv/types/cv.types";

export interface CVTemplateProps {
  data: CVData;
  mode?: "preview" | "print";
}

export interface TemplateMetadata {
  id: string;
  name: string;
  category: "software-engineer" | "content-creator";
  layout: "one-column" | "two-column";
  atsLevel: "high";
  description: string;
  recommendedFor: string[];
  tags: Array<"minimal" | "modern" | "classic" | "compact">;
}
