import {
  Award,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  FileText,
  FolderKanban,
  GraduationCap,
  LayoutList,
  Link2,
  type LucideIcon,
  Languages,
  TextAlignStart,
  Trophy,
  User,
  Wrench,
} from "lucide-react";
import type { SectionId } from "@/features/cv/types/cv.types";
import { SECTION_LABELS } from "@/features/cv/utils/defaults";
import { cn } from "@/lib/cn";

export type EditorSectionId = "personalInfo" | "document" | SectionId;

const EDITOR_SECTIONS: Array<{ id: EditorSectionId; label: string; icon: LucideIcon }> = [
  { id: "personalInfo", label: "Personal Information", icon: User },
  { id: "document", label: "Document", icon: FileText },
  { id: "summary", label: SECTION_LABELS.summary, icon: TextAlignStart },
  { id: "experience", label: SECTION_LABELS.experience, icon: Briefcase },
  { id: "education", label: SECTION_LABELS.education, icon: GraduationCap },
  { id: "skills", label: SECTION_LABELS.skills, icon: Wrench },
  { id: "projects", label: SECTION_LABELS.projects, icon: FolderKanban },
  { id: "certifications", label: SECTION_LABELS.certifications, icon: Award },
  { id: "achievements", label: SECTION_LABELS.achievements, icon: Trophy },
  { id: "languages", label: SECTION_LABELS.languages, icon: Languages },
  { id: "links", label: SECTION_LABELS.links, icon: Link2 },
  { id: "customSections", label: SECTION_LABELS.customSections, icon: LayoutList },
];

interface SectionNavProps {
  active: EditorSectionId;
  onSelect: (id: EditorSectionId) => void;
  hiddenSections: SectionId[];
  sectionOrder: SectionId[];
  onToggle: (id: SectionId) => void;
  onMove: (id: SectionId, direction: "up" | "down") => void;
}

export function SectionNav({
  active,
  onSelect,
  hiddenSections,
  sectionOrder,
  onToggle,
  onMove,
}: SectionNavProps) {
  const ordered: typeof EDITOR_SECTIONS = [
    EDITOR_SECTIONS[0]!,
    EDITOR_SECTIONS[1]!,
    ...sectionOrder
      .map((id) => EDITOR_SECTIONS.find((section) => section.id === id))
      .filter((section): section is (typeof EDITOR_SECTIONS)[number] => Boolean(section)),
  ];

  return (
    <nav className="flex h-full flex-col border-b border-line bg-paper lg:border-r lg:border-b-0">
      <div className="hidden border-b border-line px-4 py-3 lg:block">
        <h2 className="text-sm font-medium text-ink-text">CV Sections</h2>
      </div>
      <ul className="section-nav-scroll flex flex-1 gap-0.5 overflow-x-auto p-1.5 lg:flex-col lg:overflow-auto lg:p-2">
        {ordered.map((section, index) => {
          const sectionId = section.id;
          const Icon = section.icon;
          const isActive = active === sectionId;
          const isFixed = sectionId === "personalInfo" || sectionId === "document";

          if (isFixed) {
            return (
              <li key={sectionId} className="shrink-0 lg:mb-0.5 lg:w-full">
                <div className={cn("rounded-lg", isActive && "bg-mint")}>
                  <button
                    type="button"
                    onClick={() => onSelect(sectionId)}
                    title={section.label}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={section.label}
                    className="flex size-10 items-center justify-center text-ink-text lg:h-auto lg:w-full lg:justify-start lg:gap-2 lg:px-3 lg:py-2"
                  >
                    <Icon size={16} />
                    <span className="hidden min-w-0 truncate text-sm lg:inline">{section.label}</span>
                  </button>
                </div>
              </li>
            );
          }

          const hidden = hiddenSections.includes(sectionId);
          const bodyIndex = index - 2;
          return (
            <li key={sectionId} className="shrink-0 lg:mb-0.5 lg:w-full">
              <div
                className={cn(
                  "flex items-center rounded-lg",
                  isActive && "bg-mint",
                )}
              >
                <button
                  type="button"
                  onClick={() => onSelect(sectionId)}
                  title={section.label}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={section.label}
                  className="flex size-10 min-w-0 items-center justify-center text-ink-text lg:h-auto lg:flex-1 lg:justify-start lg:gap-2 lg:px-3 lg:py-2 lg:pr-1"
                >
                  <Icon size={16} className="shrink-0" />
                  <span className="hidden min-w-0 truncate text-sm lg:inline">{section.label}</span>
                </button>
                <div className="hidden shrink-0 items-center pr-1 lg:flex">
                  <button
                    type="button"
                    aria-label={hidden ? `Show ${section.label}` : `Hide ${section.label}`}
                    className="rounded p-1 text-muted hover:text-ink-text"
                    onClick={() => onToggle(sectionId)}
                  >
                    {hidden ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button
                    type="button"
                    aria-label={`Move ${section.label} up`}
                    className="rounded p-1 text-muted hover:text-ink-text disabled:opacity-30"
                    disabled={bodyIndex <= 0}
                    onClick={() => onMove(sectionId, "up")}
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    type="button"
                    aria-label={`Move ${section.label} down`}
                    className="rounded p-1 text-muted hover:text-ink-text disabled:opacity-30"
                    disabled={bodyIndex >= sectionOrder.length - 1}
                    onClick={() => onMove(sectionId, "down")}
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
