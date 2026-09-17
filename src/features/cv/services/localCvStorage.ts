import type { CVData } from "@/features/cv/types/cv.types";
import { cvListSchema } from "@/features/cv/types/cv.schema";
import type { CVStorage } from "@/features/cv/services/cvStorage";

const STORAGE_KEY = "grove.cvs.v1";

function readAll(): CVData[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    const result = cvListSchema.safeParse(parsed);
    if (!result.success) {
      throw new Error("Stored CV data is not valid.");
    }
    return result.data;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("Unable to read saved CVs from this browser.");
    }
    throw error;
  }
}

function writeAll(cvs: CVData[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cvs));
  } catch {
    throw new Error("Unable to save CV. This browser may be out of storage space.");
  }
}

export const localCvStorage: CVStorage = {
  async getCV(id) {
    return readAll().find((cv) => cv.id === id) ?? null;
  },

  async getAllCVs() {
    return readAll();
  },

  async createCV(cv) {
    const cvs = readAll();
    writeAll([cv, ...cvs]);
  },

  async updateCV(cv) {
    const cvs = readAll();
    const index = cvs.findIndex((item) => item.id === cv.id);
    if (index === -1) {
      writeAll([cv, ...cvs]);
      return;
    }
    const next = [...cvs];
    next[index] = cv;
    writeAll(next);
  },

  async deleteCV(id) {
    writeAll(readAll().filter((cv) => cv.id !== id));
  },
};
