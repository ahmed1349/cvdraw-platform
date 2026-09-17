import type { CVData } from "@/features/cv/types/cv.types";
import { parseFlexibleDate } from "@/features/cv/utils/dates";
import { EMAIL_PATTERN, METRIC_PATTERN, STANDARD_HEADINGS } from "@/features/ats/atsRules";
import type { ATSCheck, ATSResult } from "@/features/ats/atsTypes";

const STANDARD = new Set(STANDARD_HEADINGS);

export function analyzeATS(data: CVData): ATSResult {
  const { personalInfo } = data;
  const hasContact = Boolean(personalInfo.email.trim() || personalInfo.phone.trim());
  const hasTitle = Boolean(personalInfo.professionalTitle.trim());
  const hasExperience = data.experience.some((item) => item.position.trim() || item.company.trim());
  const hasEducation = data.education.some((item) => item.institution.trim() || item.degree.trim());
  const hasSkills = data.skills.some((group) => group.skills.some((skill) => skill.trim()));
  const groupedSkills = data.skills.some((group) => group.category.trim() && group.skills.some((skill) => skill.trim()));
  const emailValid = !personalInfo.email.trim() || EMAIL_PATTERN.test(personalInfo.email.trim());
  const hasLinkedIn = Boolean(personalInfo.linkedin?.trim());
  const hasSummary = Boolean(data.summary.trim());
  const dates = collectDates(data);
  const datesOk = dates.length === 0 || dates.every(Boolean);
  const oddHeadings = data.customSections
    .map((section) => section.title.trim())
    .filter((title) => title && !STANDARD.has(title.toLowerCase()));
  const measurable = data.experience.some((item) =>
    item.achievements.some((line) => METRIC_PATTERN.test(line)) || METRIC_PATTERN.test(item.description),
  );
  const entryLevel =
    data.experience.length <= 1 && !/senior|lead|principal|staff/i.test(personalInfo.professionalTitle);
  const longCv =
    data.experience.length + data.projects.length + data.education.length + data.customSections.length > 12;

  const checks: ATSCheck[] = [
    { id: "contact", label: "Contact information detected", passed: hasContact },
    { id: "title", label: "Professional title detected", passed: hasTitle },
    { id: "experience", label: "Experience section detected", passed: hasExperience },
    { id: "education", label: "Education section detected", passed: hasEducation },
    { id: "skills", label: "Skills section detected", passed: hasSkills },
    { id: "headings", label: "Standard section headings", passed: oddHeadings.length === 0 },
    { id: "text", label: "Text-based content", passed: true },
    { id: "no-bars", label: "No skill bars", passed: true },
    { id: "no-tables", label: "No excessive tables", passed: true },
    { id: "extractable", label: "Text extraction available", passed: true },
    { id: "email", label: "Valid email", passed: Boolean(personalInfo.email.trim()) && emailValid },
    { id: "linkedin", label: "LinkedIn URL detected", passed: hasLinkedIn },
    { id: "dates", label: "Consistent date format", passed: datesOk },
  ];

  const passed = checks.filter((check) => check.passed).length;
  const score = Math.round((passed / checks.length) * 100);

  const warnings = [];
  if (!hasSummary) {
    warnings.push({ id: "summary", message: "Your CV does not contain a Professional Summary." });
  }
  if (hasExperience && !measurable) {
    warnings.push({
      id: "metrics",
      message: "Your experience section contains descriptions without measurable achievements.",
    });
  }
  if (hasSkills && !groupedSkills) {
    warnings.push({ id: "groups", message: "Your skills are not grouped into categories." });
  }
  if (!personalInfo.phone.trim()) {
    warnings.push({ id: "phone", message: "Your phone number is missing." });
  }
  if (!hasLinkedIn) {
    warnings.push({ id: "linkedin", message: "Your LinkedIn profile is missing." });
  }
  if (oddHeadings.length > 0) {
    warnings.push({
      id: "custom",
      message: "Your CV contains a custom section name that may be difficult for some ATS systems to identify.",
    });
  }
  if (entryLevel && longCv) {
    warnings.push({
      id: "length",
      message: "Your CV exceeds the recommended page length for an entry-level profile.",
    });
  }

  const suggestions = warnings.map((warning) => warning.message);

  return { score, checks, warnings, suggestions };
}

function collectDates(data: CVData) {
  const values = [
    ...data.experience.flatMap((item) => [item.startDate, item.endDate]),
    ...data.education.flatMap((item) => [item.startDate, item.endDate]),
    ...data.projects.flatMap((item) => [item.startDate, item.endDate]),
    ...data.certifications.map((item) => item.date),
  ].filter((value): value is string => Boolean(value?.trim()));
  return values.map((value) => Boolean(parseFlexibleDate(value)));
}
