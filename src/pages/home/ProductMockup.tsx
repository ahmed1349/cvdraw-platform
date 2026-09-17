import { useMemo, useState, type ReactNode } from "react";
import {
  Briefcase,
  FileText,
  GraduationCap,
  TextAlignStart,
  User,
  Wrench,
} from "lucide-react";
import { analyzeATS } from "@/features/ats/atsAnalyzer";
import { createDemoCV } from "@/features/cv/utils/demoCv";
import { PreviewPane } from "@/features/editor/PreviewPane";
import { cn } from "@/lib/cn";

const mockSections = [
  { id: "personal", label: "Personal", icon: User },
  { id: "summary", label: "Summary", icon: TextAlignStart },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "document", label: "Document", icon: FileText },
] as const;

const templates = [
  { id: "se-01", label: "Classic Engineer" },
  { id: "se-02", label: "Modern Engineer" },
  { id: "se-03", label: "Minimal Code" },
];

export function ProductMockup() {
  const [section, setSection] = useState<(typeof mockSections)[number]["id"]>("personal");
  const [templateId, setTemplateId] = useState("se-01");
  const demo = useMemo(() => ({ ...createDemoCV(), templateId }), [templateId]);
  const ats = analyzeATS(demo);

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-[0_2px_8px_rgba(23,32,28,0.06)]">
      <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2">
        <div className="flex min-w-0 gap-1 overflow-x-auto">
          {templates.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTemplateId(item.id)}
              className={cn(
                "shrink-0 rounded-md px-2 py-1 text-[11px]",
                templateId === item.id ? "bg-mint text-ink" : "text-muted hover:text-ink-text",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="shrink-0 rounded-md border border-line bg-canvas px-2 py-1 text-[11px] font-medium text-ink-text">
          ATS {ats.score}/100
        </p>
      </div>

      <div className="hidden min-h-[520px] grid-cols-[118px_minmax(0,0.9fr)_minmax(0,1.15fr)] lg:grid">
        <div className="border-r border-line bg-paper p-2">
          <p className="mb-2 px-1 text-[11px] font-medium text-muted">Sections</p>
          <ul className="space-y-0.5">
            {mockSections.map((item) => {
              const Icon = item.icon;
              const active = section === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setSection(item.id)}
                    className={cn(
                      "flex w-full items-center gap-1.5 rounded-md px-1.5 py-1.5 text-left text-[11px]",
                      active ? "bg-mint text-ink" : "text-muted hover:text-ink-text",
                    )}
                  >
                    <Icon size={13} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-r border-line bg-paper p-4">
          <MockForm section={section} />
        </div>

        <div className="min-h-[520px] bg-[#eceee9]">
          <PreviewPane data={demo} label="" />
        </div>
      </div>

      <div className="h-[420px] bg-[#eceee9] lg:hidden">
        <PreviewPane data={demo} label="" />
      </div>
    </div>
  );
}

function MockForm({ section }: { section: (typeof mockSections)[number]["id"] }) {
  if (section === "summary") {
    return (
      <FieldBlock title="Professional Summary">
        <p className="min-h-[120px] rounded-md border border-line px-3 py-2 text-sm leading-6 text-ink-text">
          Software engineer with 8 years of experience building reliable product platforms.
        </p>
      </FieldBlock>
    );
  }

  if (section === "experience") {
    return (
      <FieldBlock title="Experience">
        <p className="text-sm font-medium text-ink-text">Senior Software Engineer</p>
        <p className="mt-1 text-xs text-muted">Northwind Labs · 2022 — Present</p>
        <p className="mt-3 rounded-md border border-line px-3 py-2 text-sm leading-6 text-ink-text">
          Led a platform rewrite that reduced p95 API latency by 41%.
        </p>
      </FieldBlock>
    );
  }

  if (section === "education") {
    return (
      <FieldBlock title="Education">
        <FakeInput label="Institution" value="University of Edinburgh" />
        <FakeInput label="Degree" value="BSc Computer Science" />
      </FieldBlock>
    );
  }

  if (section === "skills") {
    return (
      <FieldBlock title="Skills">
        <p className="rounded-md border border-line px-3 py-2 text-sm leading-6 text-ink-text">
          React, TypeScript, Python, Django, PostgreSQL, Docker, AWS
        </p>
      </FieldBlock>
    );
  }

  if (section === "document") {
    return (
      <FieldBlock title="Document">
        <FakeInput label="Template" value="Classic Engineer" />
        <FakeInput label="Page size" value="A4" />
      </FieldBlock>
    );
  }

  return (
    <FieldBlock title="Personal Information">
      <FakeInput label="Full name" value="Samira Noor" />
      <FakeInput label="Professional title" value="Senior Software Engineer" />
      <FakeInput label="Email" value="samira.noor@email.com" />
    </FieldBlock>
  );
}

function FieldBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-sm font-medium text-ink-text">{title}</p>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function FakeInput({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-muted">{label}</p>
      <p className="mt-1 rounded-md border border-line px-3 py-2 text-sm text-ink-text">{value}</p>
    </div>
  );
}
