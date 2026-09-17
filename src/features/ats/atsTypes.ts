export interface ATSCheck {
  id: string;
  label: string;
  passed: boolean;
}

export interface ATSWarning {
  id: string;
  message: string;
}

export interface ATSResult {
  score: number;
  checks: ATSCheck[];
  warnings: ATSWarning[];
  suggestions: string[];
}
