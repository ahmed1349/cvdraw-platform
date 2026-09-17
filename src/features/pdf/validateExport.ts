import type { CVData } from "@/features/cv/types/cv.types";

export interface ExportIssue {
  id: string;
  message: string;
}

export interface ExportValidation {
  ready: boolean;
  issues: ExportIssue[];
}

export function validateExport(cv: CVData): ExportValidation {
  const issues: ExportIssue[] = [];
  const { personalInfo } = cv;

  if (!personalInfo.fullName.trim()) {
    issues.push({ id: "name", message: "Add your name before exporting." });
  }

  if (!personalInfo.email.trim() && !personalInfo.phone.trim()) {
    issues.push({ id: "contact", message: "Add an email or phone number." });
  }

  const hasMajorSection =
    cv.summary.trim().length > 0 ||
    cv.experience.some((item) => item.position.trim() || item.company.trim()) ||
    cv.education.some((item) => item.institution.trim() || item.degree.trim()) ||
    cv.skills.some((group) => group.skills.some((skill) => skill.trim())) ||
    cv.projects.some((item) => item.name.trim());

  if (!hasMajorSection) {
    issues.push({
      id: "section",
      message: "Add a summary, experience, education, skills, or project before exporting.",
    });
  }

  return {
    ready: issues.length === 0,
    issues,
  };
}
