import type { CVData } from "@/features/cv/types/cv.types";
import { defaultSettings } from "@/features/cv/utils/defaults";

export function createDemoCV(): CVData {
  return {
    id: "demo-classic-engineer",
    title: "Software Engineer — General",
    templateId: "se-01",
    createdAt: "2026-03-12T09:00:00.000Z",
    updatedAt: "2026-09-17T08:00:00.000Z",
    personalInfo: {
      fullName: "Samira Noor",
      professionalTitle: "Senior Software Engineer",
      email: "samira.noor@email.com",
      phone: "+1 415 555 0148",
      website: "samiranoor.dev",
      linkedin: "linkedin.com/in/samiranoor",
      github: "github.com/samiranoor",
    },
    summary:
      "Software engineer with 8 years of experience building reliable product platforms. Focused on TypeScript, distributed systems, and shipping measurable improvements to performance and delivery speed.",
    experience: [
      {
        id: "exp-1",
        company: "Northwind Labs",
        position: "Senior Software Engineer",
        location: "San Francisco, CA",
        startDate: "2022-04",
        current: true,
        description: "",
        achievements: [
          "Led a platform rewrite that reduced p95 API latency by 41% across checkout services.",
          "Designed a shared design-system pipeline used by 6 product teams.",
          "Mentored 4 engineers and introduced incident reviews that cut repeat outages by 28%.",
        ],
      },
      {
        id: "exp-2",
        company: "Harbor Systems",
        position: "Software Engineer",
        location: "Remote",
        startDate: "2019-01",
        endDate: "2022-03",
        current: false,
        description: "",
        achievements: [
          "Built a React and Django workflow tool adopted by 120 internal operators.",
          "Automated deployment checks with GitHub Actions, reducing release time from hours to minutes.",
        ],
      },
    ],
    education: [
      {
        id: "edu-1",
        institution: "University of Edinburgh",
        degree: "BSc",
        field: "Computer Science",
        startDate: "2014-09",
        endDate: "2018-06",
        location: "Edinburgh, UK",
      },
    ],
    skills: [
      {
        id: "sk-1",
        category: "Frontend",
        skills: ["React", "TypeScript", "JavaScript", "Next.js"],
      },
      {
        id: "sk-2",
        category: "Backend",
        skills: ["Python", "Node.js", "Django", "REST APIs", "PostgreSQL"],
      },
      {
        id: "sk-3",
        category: "Infrastructure",
        skills: ["Docker", "GitHub Actions", "AWS"],
      },
    ],
    projects: [
      {
        id: "pr-1",
        name: "Relayboard",
        role: "Creator",
        description:
          "Open-source incident board for on-call teams, with searchable timelines and Slack ingest.",
        technologies: ["TypeScript", "React", "PostgreSQL"],
        url: "https://relayboard.dev",
        github: "github.com/samiranoor/relayboard",
        achievements: ["Used by 14 teams in private beta."],
      },
      {
        id: "pr-2",
        name: "Careline",
        role: "Lead engineer",
        description:
          "AI-powered healthcare application for triage notes, with audit trails and clinician review queues.",
        technologies: ["TypeScript", "Python", "PostgreSQL", "AWS"],
        url: "https://careline.dev",
        achievements: ["Cut average intake documentation time by 22% in a 3-clinic pilot."],
      },
    ],
    certifications: [
      {
        id: "cert-1",
        name: "AWS Certified Developer – Associate",
        issuer: "Amazon Web Services",
        date: "2024-05",
      },
    ],
    achievements: [],
    languages: [
      { id: "lang-1", name: "English", proficiency: "Native" },
      { id: "lang-2", name: "Arabic", proficiency: "Professional Working Proficiency" },
    ],
    links: [],
    customSections: [],
    settings: defaultSettings("software-engineer"),
  };
}
