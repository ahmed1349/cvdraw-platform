import type { CVData } from "@/features/cv/types/cv.types";

export interface CVStorage {
  getCV(id: string): Promise<CVData | null>;
  getAllCVs(): Promise<CVData[]>;
  createCV(cv: CVData): Promise<void>;
  updateCV(cv: CVData): Promise<void>;
  deleteCV(id: string): Promise<void>;
}
