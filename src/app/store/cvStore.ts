import { create } from "zustand";
import type {
  CVData,
  CVSettings,
  Experience,
  PersonalInfo,
  SectionId,
  TemplateCategory,
} from "@/features/cv/types/cv.types";
import { cvDataSchema } from "@/features/cv/types/cv.schema";
import type { CVStorage } from "@/features/cv/services/cvStorage";
import { localCvStorage } from "@/features/cv/services/localCvStorage";
import {
  createEmptyCV,
  emptyAchievement,
  emptyCertification,
  emptyCustomSection,
  emptyEducation,
  emptyExperience,
  emptyLanguage,
  emptyProject,
  emptySkillGroup,
  emptySocialLink,
} from "@/features/cv/utils/defaults";
import { createId, nowIso } from "@/features/cv/utils/ids";

export type SaveStatus = "saved" | "saving" | "unsaved" | "error";

interface CreateCVInput {
  title: string;
  templateId: string;
  category: TemplateCategory;
}

type ListKey =
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "achievements"
  | "languages"
  | "links"
  | "customSections";

interface CVStore {
  cvs: CVData[];
  currentId: string | null;
  isLoaded: boolean;
  saveStatus: SaveStatus;
  errorMessage: string | null;
  hydrate: () => Promise<void>;
  createCV: (input: CreateCVInput) => Promise<CVData>;
  selectCV: (id: string) => void;
  deleteCV: (id: string) => Promise<void>;
  duplicateCV: (id: string) => Promise<CVData>;
  persistCurrent: () => Promise<void>;
  setTitle: (title: string) => void;
  setTemplate: (templateId: string) => void;
  patchPersonalInfo: (patch: Partial<PersonalInfo>) => void;
  setSummary: (summary: string) => void;
  addExperience: () => string;
  updateExperience: (id: string, patch: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  duplicateExperience: (id: string) => void;
  moveExperience: (id: string, direction: "up" | "down") => void;
  setExperienceAchievements: (id: string, achievements: string[]) => void;
  updateList: <K extends ListKey>(key: K, updater: (items: CVData[K]) => CVData[K]) => void;
  addEducation: () => string;
  addSkillGroup: () => string;
  addProject: () => string;
  addCertification: () => string;
  addAchievement: () => string;
  addLanguage: () => string;
  addLink: () => string;
  addCustomSection: () => string;
  updateSettings: (patch: Partial<CVSettings>) => void;
  renameCV: (id: string, title: string) => Promise<void>;
  changeTemplate: (id: string, templateId: string) => Promise<void>;
  toggleSectionVisibility: (sectionId: SectionId) => void;
  moveSection: (sectionId: SectionId, direction: "up" | "down") => void;
  clearError: () => void;
}

const storage: CVStorage = localCvStorage;

function touch(cv: CVData): CVData {
  return { ...cv, updatedAt: nowIso() };
}

export const useCVStore = create<CVStore>((set, get) => ({
  cvs: [],
  currentId: null,
  isLoaded: false,
  saveStatus: "saved",
  errorMessage: null,

  hydrate: async () => {
    try {
      const cvs = await storage.getAllCVs();
      set({ cvs, isLoaded: true, errorMessage: null });
    } catch (error) {
      set({
        cvs: [],
        isLoaded: true,
        saveStatus: "error",
        errorMessage: error instanceof Error ? error.message : "Unable to load CVs.",
      });
    }
  },

  createCV: async (input) => {
    const cv = createEmptyCV(input);
    try {
      await storage.createCV(cv);
      set((state) => ({
        cvs: [cv, ...state.cvs],
        currentId: cv.id,
        saveStatus: "saved",
        errorMessage: null,
      }));
      return cv;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to save CV. Please try again.";
      set({ saveStatus: "error", errorMessage: message });
      throw error;
    }
  },

  selectCV: (id) => {
    set({ currentId: id });
  },

  deleteCV: async (id) => {
    try {
      await storage.deleteCV(id);
      set((state) => ({
        cvs: state.cvs.filter((cv) => cv.id !== id),
        currentId: state.currentId === id ? null : state.currentId,
        errorMessage: null,
      }));
    } catch (error) {
      set({
        saveStatus: "error",
        errorMessage: error instanceof Error ? error.message : "Unable to delete CV. Please try again.",
      });
      throw error;
    }
  },

  duplicateCV: async (id) => {
    const original = get().cvs.find((cv) => cv.id === id);
    if (!original) {
      throw new Error("CV not found.");
    }
    const copy: CVData = {
      ...structuredClone(original),
      id: createId(),
      title: `${original.title} copy`,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    try {
      await storage.createCV(copy);
      set((state) => ({
        cvs: [copy, ...state.cvs],
        errorMessage: null,
      }));
      return copy;
    } catch (error) {
      set({
        saveStatus: "error",
        errorMessage: error instanceof Error ? error.message : "Unable to duplicate CV. Please try again.",
      });
      throw error;
    }
  },

  persistCurrent: async () => {
    const { currentId, cvs } = get();
    const current = cvs.find((cv) => cv.id === currentId);
    if (!current) return;
    const parsed = cvDataSchema.safeParse(current);
    if (!parsed.success) {
      set({
        saveStatus: "error",
        errorMessage: "Unable to save CV. Please check the form and try again.",
      });
      return;
    }
    set({ saveStatus: "saving" });
    try {
      await storage.updateCV(parsed.data);
      set({ saveStatus: "saved", errorMessage: null });
    } catch (error) {
      set({
        saveStatus: "error",
        errorMessage: error instanceof Error ? error.message : "Unable to save CV. Please try again.",
      });
    }
  },

  setTitle: (title) => {
    updateCurrent(set, (cv) => ({ ...cv, title }));
  },

  setTemplate: (templateId) => {
    updateCurrent(set, (cv) => ({ ...cv, templateId }));
  },

  patchPersonalInfo: (patch) => {
    updateCurrent(set, (cv) => ({
      ...cv,
      personalInfo: { ...cv.personalInfo, ...patch },
    }));
  },

  setSummary: (summary) => {
    updateCurrent(set, (cv) => ({ ...cv, summary }));
  },

  addExperience: () => {
    const item = emptyExperience();
    updateCurrent(set, (cv) => ({
      ...cv,
      experience: [item, ...cv.experience],
    }));
    return item.id;
  },

  updateExperience: (id, patch) => {
    updateCurrent(set, (cv) => ({
      ...cv,
      experience: cv.experience.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  },

  removeExperience: (id) => {
    updateCurrent(set, (cv) => ({
      ...cv,
      experience: cv.experience.filter((item) => item.id !== id),
    }));
  },

  duplicateExperience: (id) => {
    updateCurrent(set, (cv) => {
      const index = cv.experience.findIndex((item) => item.id === id);
      if (index === -1) return cv;
      const source = cv.experience[index];
      const copy: Experience = { ...structuredClone(source), id: createId() };
      const experience = [...cv.experience];
      experience.splice(index + 1, 0, copy);
      return { ...cv, experience };
    });
  },

  moveExperience: (id, direction) => {
    updateCurrent(set, (cv) => ({
      ...cv,
      experience: moveItem(cv.experience, id, direction),
    }));
  },

  setExperienceAchievements: (id, achievements) => {
    updateCurrent(set, (cv) => ({
      ...cv,
      experience: cv.experience.map((item) => (item.id === id ? { ...item, achievements } : item)),
    }));
  },

  updateList: (key, updater) => {
    updateCurrent(set, (cv) => ({
      ...cv,
      [key]: updater(cv[key]),
    }));
  },

  addEducation: () => {
    const item = emptyEducation();
    updateCurrent(set, (cv) => ({ ...cv, education: [item, ...cv.education] }));
    return item.id;
  },

  addSkillGroup: () => {
    const item = emptySkillGroup();
    updateCurrent(set, (cv) => ({ ...cv, skills: [item, ...cv.skills] }));
    return item.id;
  },

  addProject: () => {
    const item = emptyProject();
    updateCurrent(set, (cv) => ({ ...cv, projects: [item, ...cv.projects] }));
    return item.id;
  },

  addCertification: () => {
    const item = emptyCertification();
    updateCurrent(set, (cv) => ({ ...cv, certifications: [item, ...cv.certifications] }));
    return item.id;
  },

  addAchievement: () => {
    const item = emptyAchievement();
    updateCurrent(set, (cv) => ({ ...cv, achievements: [item, ...cv.achievements] }));
    return item.id;
  },

  addLanguage: () => {
    const item = emptyLanguage();
    updateCurrent(set, (cv) => ({ ...cv, languages: [item, ...cv.languages] }));
    return item.id;
  },

  addLink: () => {
    const item = emptySocialLink();
    updateCurrent(set, (cv) => ({ ...cv, links: [item, ...cv.links] }));
    return item.id;
  },

  addCustomSection: () => {
    const item = emptyCustomSection();
    updateCurrent(set, (cv) => ({ ...cv, customSections: [item, ...cv.customSections] }));
    return item.id;
  },

  updateSettings: (patch) => {
    updateCurrent(set, (cv) => ({
      ...cv,
      settings: { ...cv.settings, ...patch },
    }));
  },

  renameCV: async (id, title) => {
    await persistPatched(set, get, id, (cv) => ({ ...cv, title }));
  },

  changeTemplate: async (id, templateId) => {
    await persistPatched(set, get, id, (cv) => ({ ...cv, templateId }));
  },

  toggleSectionVisibility: (sectionId) => {
    updateCurrent(set, (cv) => {
      const hidden = cv.settings.hiddenSections.includes(sectionId);
      return {
        ...cv,
        settings: {
          ...cv.settings,
          hiddenSections: hidden
            ? cv.settings.hiddenSections.filter((id) => id !== sectionId)
            : [...cv.settings.hiddenSections, sectionId],
        },
      };
    });
  },

  moveSection: (sectionId, direction) => {
    updateCurrent(set, (cv) => ({
      ...cv,
      settings: {
        ...cv.settings,
        sectionOrder: moveItem(cv.settings.sectionOrder, sectionId, direction),
      },
    }));
  },

  clearError: () => set({ errorMessage: null, saveStatus: get().saveStatus === "error" ? "unsaved" : get().saveStatus }),
}));

export function useCurrentCV() {
  return useCVStore((state) => state.cvs.find((cv) => cv.id === state.currentId) ?? null);
}

function updateCurrent(
  set: (partial: Partial<CVStore> | ((state: CVStore) => Partial<CVStore>)) => void,
  updater: (cv: CVData) => CVData,
) {
  set((state) => {
    const current = state.cvs.find((cv) => cv.id === state.currentId);
    if (!current) return state;
    const next = touch(updater(current));
    return {
      cvs: state.cvs.map((cv) => (cv.id === next.id ? next : cv)),
      saveStatus: "unsaved",
      errorMessage: null,
    };
  });
}

function persistPatched(
  set: (partial: Partial<CVStore> | ((state: CVStore) => Partial<CVStore>)) => void,
  get: () => CVStore,
  id: string,
  updater: (cv: CVData) => CVData,
) {
  const current = get().cvs.find((cv) => cv.id === id);
  if (!current) throw new Error("CV not found.");
  const next = touch(updater(current));
  set((state) => ({
    cvs: state.cvs.map((cv) => (cv.id === id ? next : cv)),
    saveStatus: state.currentId === id ? "saving" : state.saveStatus,
  }));
  return storage.updateCV(next).then(() => {
    set((state) => ({
      saveStatus: state.currentId === id ? "saved" : state.saveStatus,
      errorMessage: null,
    }));
  });
}

function moveItem<T extends { id: string } | string>(items: T[], id: string, direction: "up" | "down") {
  const index = items.findIndex((item) => (typeof item === "string" ? item === id : item.id === id));
  if (index === -1) return items;
  const target = direction === "up" ? index - 1 : index + 1;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  const current = next[index];
  const swap = next[target];
  if (current === undefined || swap === undefined) return items;
  next[index] = swap;
  next[target] = current;
  return next;
}
