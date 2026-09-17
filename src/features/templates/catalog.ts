import type { TemplateMetadata } from "@/features/templates/types";

export type VisualTheme =
  | "classic"
  | "modern"
  | "minimal"
  | "compact"
  | "technical"
  | "executive"
  | "creator";

export interface TemplateDefinition {
  meta: TemplateMetadata;
  visual: VisualTheme;
}

function se(
  id: string,
  name: string,
  description: string,
  visual: VisualTheme,
  layout: TemplateMetadata["layout"],
  tags: TemplateMetadata["tags"],
  recommendedFor: string[],
): TemplateDefinition {
  return {
    visual,
    meta: {
      id,
      name,
      category: "software-engineer",
      layout,
      atsLevel: "high",
      description,
      recommendedFor,
      tags,
    },
  };
}

function cc(
  id: string,
  name: string,
  description: string,
  visual: VisualTheme,
  layout: TemplateMetadata["layout"],
  tags: TemplateMetadata["tags"],
): TemplateDefinition {
  return {
    visual,
    meta: {
      id,
      name,
      category: "content-creator",
      layout,
      atsLevel: "high",
      description,
      recommendedFor: ["content", "creator", "media"],
      tags,
    },
  };
}

export const templateCatalog: TemplateDefinition[] = [
  se("se-01", "Classic Engineer", "Traditional one-column professional CV.", "classic", "one-column", ["classic"], ["software engineering", "general technical roles"]),
  se("se-02", "Modern Engineer", "Modern spacing with strong headings.", "modern", "one-column", ["modern"], ["software engineering"]),
  se("se-03", "Minimal Code", "Minimal monochrome technical layout.", "minimal", "one-column", ["minimal"], ["software engineering"]),
  se("se-04", "Technical Professional", "Strong technical skills hierarchy.", "technical", "one-column", ["classic"], ["backend", "platform"]),
  se("se-05", "Full Stack", "Optimized for full-stack developers.", "modern", "one-column", ["modern"], ["full-stack"]),
  se("se-06", "Backend Engineer", "Experience and technical stack focused.", "technical", "one-column", ["classic"], ["backend"]),
  se("se-07", "Frontend Engineer", "Projects, frontend technologies and experience focused.", "modern", "one-column", ["modern"], ["frontend"]),
  se("se-08", "AI Engineer", "AI/ML/project-oriented layout.", "technical", "one-column", ["modern"], ["AI", "ML"]),
  se("se-09", "Data Engineer", "Data stack and project emphasis.", "technical", "one-column", ["classic"], ["data engineering"]),
  se("se-10", "DevOps Engineer", "Cloud, infrastructure and tooling emphasis.", "technical", "two-column", ["modern"], ["DevOps"]),
  se("se-11", "Cloud Engineer", "Cloud certifications and infrastructure emphasis.", "technical", "two-column", ["classic"], ["cloud"]),
  se("se-12", "Cybersecurity", "Security skills and certifications emphasis.", "technical", "one-column", ["classic"], ["cybersecurity"]),
  se("se-13", "Mobile Engineer", "Mobile technologies and application projects.", "modern", "one-column", ["modern"], ["mobile"]),
  se("se-14", "QA Engineer", "Testing experience and automation emphasis.", "classic", "one-column", ["classic"], ["QA", "testing"]),
  se("se-15", "Software Architect", "Architecture, leadership and experience focused.", "executive", "one-column", ["classic"], ["architecture"]),
  se("se-16", "Senior Engineer", "Experience-heavy senior profile.", "executive", "one-column", ["classic"], ["senior engineering"]),
  se("se-17", "Engineering Lead", "Leadership and technical achievements.", "executive", "one-column", ["classic"], ["leadership"]),
  se("se-18", "Startup Engineer", "Compact modern startup CV.", "compact", "one-column", ["compact", "modern"], ["startups"]),
  se("se-19", "Product Engineer", "Engineering + product experience.", "modern", "one-column", ["modern"], ["product engineering"]),
  se("se-20", "Open Source", "Projects and GitHub contribution emphasis.", "modern", "two-column", ["modern"], ["open source"]),
  se("se-21", "Academic Engineer", "Education/research/project focused.", "classic", "one-column", ["classic"], ["research", "academia"]),
  se("se-22", "Graduate Engineer", "Entry-level / graduate optimized.", "compact", "one-column", ["compact"], ["graduates"]),
  se("se-23", "Internship Engineer", "Internship and project focused.", "compact", "one-column", ["compact"], ["internships"]),
  se("se-24", "International Engineer", "Designed for international applications.", "classic", "one-column", ["classic"], ["international"]),
  se("se-25", "Compact Engineer", "High information density while maintaining readability.", "compact", "one-column", ["compact"], ["dense profiles"]),
  se("se-26", "Executive Technical", "Senior technical professional.", "executive", "one-column", ["classic"], ["executive"]),
  se("se-27", "Research Engineer", "Research/project oriented.", "classic", "one-column", ["classic"], ["research"]),
  se("se-28", "AI Research", "Research papers, projects and technical skills.", "technical", "two-column", ["modern"], ["AI research"]),
  se("se-29", "Developer Portfolio", "Projects receive stronger visual hierarchy while remaining ATS-readable.", "modern", "two-column", ["modern"], ["portfolio"]),
  se("se-30", "Universal Engineer", "General software engineering CV suitable for most roles.", "classic", "one-column", ["classic"], ["general software engineering"]),
  cc("cc-01", "Modern Creator", "Clean creator CV with room for portfolio and brand links.", "creator", "one-column", ["modern"]),
  cc("cc-02", "Social Media Creator", "Social-facing layout with links kept as readable text.", "creator", "two-column", ["modern"]),
  cc("cc-03", "Digital Creator", "Digital work and content projects first.", "creator", "one-column", ["modern"]),
  cc("cc-04", "Content Strategist", "Strategy, campaigns, and measurable content results.", "classic", "one-column", ["classic"]),
  cc("cc-05", "Creative Professional", "Subtle accent with still-extractable headings.", "creator", "one-column", ["modern"]),
  cc("cc-06", "Brand Creator", "Brand, collaborations, and portfolio links.", "creator", "two-column", ["modern"]),
  cc("cc-07", "Marketing Creator", "Campaign experience and channel skills.", "modern", "one-column", ["modern"]),
  cc("cc-08", "Media Creator", "Production, media, and publishing experience.", "classic", "one-column", ["classic"]),
  cc("cc-09", "Influencer Professional", "Audience work described in text, not graphics.", "creator", "two-column", ["modern"]),
  cc("cc-10", "Creator Executive", "Leadership-focused creator and brand CV.", "executive", "one-column", ["classic"]),
];

export function getTemplateDefinition(id: string) {
  return templateCatalog.find((item) => item.meta.id === id) ?? templateCatalog[0]!;
}
