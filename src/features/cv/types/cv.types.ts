export type TemplateCategory = "software-engineer" | "content-creator";

export type FontSize = "small" | "medium" | "large";

export type Spacing = "compact" | "normal" | "comfortable";

export type SectionId =
  | "summary"
  | "skills"
  | "experience"
  | "projects"
  | "education"
  | "certifications"
  | "achievements"
  | "languages"
  | "links"
  | "customSections";

export interface PersonalInfo {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  website?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  grade?: string;
  location?: string;
  description?: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  skills: string[];
}

export interface Project {
  id: string;
  name: string;
  role?: string;
  description: string;
  technologies: string[];
  startDate?: string;
  endDate?: string;
  url?: string;
  github?: string;
  achievements?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  credentialId?: string;
  url?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description?: string;
  date?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
  bullets?: string[];
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface CVSettings {
  accentColor: string;
  fontFamily: string;
  fontSize: FontSize;
  spacing: Spacing;
  showIcons: boolean;
  pageSize: "A4";
  sectionOrder: SectionId[];
  hiddenSections: SectionId[];
}

export interface CVData {
  id: string;
  title: string;
  templateId: string;
  createdAt: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: SkillGroup[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  languages: Language[];
  links: SocialLink[];
  customSections: CustomSection[];
  settings: CVSettings;
}
