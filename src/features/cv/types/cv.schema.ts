import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string(),
  professionalTitle: z.string(),
  email: z.string(),
  phone: z.string(),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  portfolio: z.string().optional(),
});

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  position: z.string(),
  location: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  current: z.boolean(),
  description: z.string(),
  achievements: z.array(z.string()),
});

export const educationSchema = z.object({
  id: z.string(),
  institution: z.string(),
  degree: z.string(),
  field: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  grade: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
});

export const skillGroupSchema = z.object({
  id: z.string(),
  category: z.string(),
  skills: z.array(z.string()),
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string().optional(),
  description: z.string(),
  technologies: z.array(z.string()),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  url: z.string().optional(),
  github: z.string().optional(),
  achievements: z.array(z.string()).optional(),
});

export const certificationSchema = z.object({
  id: z.string(),
  name: z.string(),
  issuer: z.string(),
  date: z.string().optional(),
  credentialId: z.string().optional(),
  url: z.string().optional(),
});

export const achievementSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  date: z.string().optional(),
});

export const languageSchema = z.object({
  id: z.string(),
  name: z.string(),
  proficiency: z.string(),
});

export const socialLinkSchema = z.object({
  id: z.string(),
  label: z.string(),
  url: z.string(),
});

export const customSectionItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  date: z.string().optional(),
  description: z.string().optional(),
  bullets: z.array(z.string()).optional(),
});

export const customSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  items: z.array(customSectionItemSchema),
});

export const sectionIdSchema = z.enum([
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
]);

export const cvSettingsSchema = z.object({
  accentColor: z.string(),
  fontFamily: z.string(),
  fontSize: z.enum(["small", "medium", "large"]),
  spacing: z.enum(["compact", "normal", "comfortable"]),
  showIcons: z.boolean(),
  pageSize: z.literal("A4"),
  sectionOrder: z.array(sectionIdSchema),
  hiddenSections: z.array(sectionIdSchema),
});

export const cvDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  templateId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  personalInfo: personalInfoSchema,
  summary: z.string(),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillGroupSchema),
  projects: z.array(projectSchema),
  certifications: z.array(certificationSchema),
  achievements: z.array(achievementSchema),
  languages: z.array(languageSchema),
  links: z.array(socialLinkSchema),
  customSections: z.array(customSectionSchema),
  settings: cvSettingsSchema,
});

export const cvListSchema = z.array(cvDataSchema);
