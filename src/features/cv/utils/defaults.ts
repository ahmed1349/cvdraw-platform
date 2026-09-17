import type {
  Achievement,
  Certification,
  CVData,
  CVSettings,
  CustomSection,
  CustomSectionItem,
  Education,
  Experience,
  Language,
  Project,
  SectionId,
  SkillGroup,
  SocialLink,
  TemplateCategory,
} from "@/features/cv/types/cv.types";
import { createId, nowIso } from "@/features/cv/utils/ids";

export const SOFTWARE_ENGINEER_SECTION_ORDER: SectionId[] = [
  "summary",
  "skills",
  "experience",
  "projects",
  "education",
  "certifications",
  "achievements",
  "languages",
  "links",
  "customSections",
];

export const CONTENT_CREATOR_SECTION_ORDER: SectionId[] = [
  "summary",
  "experience",
  "projects",
  "skills",
  "achievements",
  "education",
  "certifications",
  "languages",
  "links",
  "customSections",
];

export const SECTION_LABELS: Record<SectionId, string> = {
  summary: "Professional Summary",
  skills: "Skills",
  experience: "Experience",
  projects: "Projects",
  education: "Education",
  certifications: "Certifications",
  achievements: "Achievements",
  languages: "Languages",
  links: "Links",
  customSections: "Custom Sections",
};

export const DEFAULT_ACCENT = "#12372A";
export const DEFAULT_FONT = "Inter";

export function defaultSettings(category: TemplateCategory): CVSettings {
  return {
    accentColor: DEFAULT_ACCENT,
    fontFamily: DEFAULT_FONT,
    fontSize: "medium",
    spacing: "normal",
    showIcons: false,
    pageSize: "A4",
    sectionOrder:
      category === "content-creator"
        ? [...CONTENT_CREATOR_SECTION_ORDER]
        : [...SOFTWARE_ENGINEER_SECTION_ORDER],
    hiddenSections: [],
  };
}

export function emptyExperience(): Experience {
  return {
    id: createId(),
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    achievements: [""],
  };
}

export function emptyEducation(): Education {
  return {
    id: createId(),
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    grade: "",
    location: "",
    description: "",
  };
}

export function emptySkillGroup(): SkillGroup {
  return {
    id: createId(),
    category: "",
    skills: [""],
  };
}

export function emptyProject(): Project {
  return {
    id: createId(),
    name: "",
    role: "",
    description: "",
    technologies: [""],
    startDate: "",
    endDate: "",
    url: "",
    github: "",
    achievements: [""],
  };
}

export function emptyCertification(): Certification {
  return {
    id: createId(),
    name: "",
    issuer: "",
    date: "",
    credentialId: "",
    url: "",
  };
}

export function emptyAchievement(): Achievement {
  return {
    id: createId(),
    title: "",
    description: "",
    date: "",
  };
}

export function emptyLanguage(): Language {
  return {
    id: createId(),
    name: "",
    proficiency: "Professional Working Proficiency",
  };
}

export function emptySocialLink(): SocialLink {
  return {
    id: createId(),
    label: "",
    url: "",
  };
}

export function emptyCustomSectionItem(): CustomSectionItem {
  return {
    id: createId(),
    title: "",
    subtitle: "",
    date: "",
    description: "",
    bullets: [""],
  };
}

export function emptyCustomSection(): CustomSection {
  return {
    id: createId(),
    title: "",
    items: [emptyCustomSectionItem()],
  };
}

export function createEmptyCV(input: {
  title: string;
  templateId: string;
  category: TemplateCategory;
}): CVData {
  const timestamp = nowIso();
  return {
    id: createId(),
    title: input.title,
    templateId: input.templateId,
    createdAt: timestamp,
    updatedAt: timestamp,
    personalInfo: {
      fullName: "",
      professionalTitle: "",
      email: "",
      phone: "",
      website: "",
      linkedin: "",
      github: "",
      portfolio: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    achievements: [],
    languages: [],
    links: [],
    customSections: [],
    settings: defaultSettings(input.category),
  };
}
