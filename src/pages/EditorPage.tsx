import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useCurrentCV, useCVStore } from "@/app/store/cvStore";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { RightMenu } from "@/components/layout/RightMenu";
import { Button } from "@/components/ui/Button";
import { ATSPanel } from "@/features/ats/ATSPanel";
import { useAutosave } from "@/features/cv/hooks/useAutosave";
import { PreviewPane } from "@/features/editor/PreviewPane";
import { SectionNav, type EditorSectionId } from "@/features/editor/SectionNav";
import { AchievementsSection } from "@/features/editor/sections/AchievementsSection";
import { CertificationsSection } from "@/features/editor/sections/CertificationsSection";
import { CustomSectionsEditor } from "@/features/editor/sections/CustomSectionsEditor";
import { DocumentSection } from "@/features/editor/sections/DocumentSection";
import { EducationSection } from "@/features/editor/sections/EducationSection";
import { ExperienceSection } from "@/features/editor/sections/ExperienceSection";
import { LanguagesSection } from "@/features/editor/sections/LanguagesSection";
import { LinksSection } from "@/features/editor/sections/LinksSection";
import { PersonalInfoSection } from "@/features/editor/sections/PersonalInfoSection";
import { ProjectsSection } from "@/features/editor/sections/ProjectsSection";
import { SkillsSection } from "@/features/editor/sections/SkillsSection";
import { SummarySection } from "@/features/editor/sections/SummarySection";
import { openPrintView } from "@/features/pdf/exportPdf";
import { validateExport } from "@/features/pdf/validateExport";
import { getTemplateMeta } from "@/features/templates/registry";
import { TemplatePicker } from "@/features/templates/TemplatePicker";

export function EditorPage() {
  const { id } = useParams();
  const cv = useCurrentCV();
  const isLoaded = useCVStore((state) => state.isLoaded);
  const selectCV = useCVStore((state) => state.selectCV);
  const saveStatus = useCVStore((state) => state.saveStatus);
  const errorMessage = useCVStore((state) => state.errorMessage);
  const [section, setSection] = useState<EditorSectionId>("personalInfo");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [atsOpen, setAtsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useAutosave();

  useEffect(() => {
    if (id) selectCV(id);
  }, [id, selectCV]);

  if (!isLoaded) {
    return <div className="p-8 text-sm text-muted">Loading CVs…</div>;
  }

  if (!cv) {
    return (
      <div className="p-8">
        <p className="text-sm text-muted">This CV was not found.</p>
        <Link to="/cvs" className="mt-3 inline-block text-sm text-ink underline">
          Back to My CVs
        </Link>
      </div>
    );
  }

  const exportState = validateExport(cv);
  const template = getTemplateMeta(cv.templateId);
  const cvId = cv.id;

  function exportPdf() {
    void useCVStore.getState().persistCurrent().then(() => openPrintView(cvId));
  }

  return (
    <div className="grid h-screen grid-rows-[auto_1fr] bg-canvas">
      <header className="no-print flex items-center justify-between gap-3 border-b border-line bg-paper px-3 py-2 sm:px-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link to="/" aria-label="CVdraw home" className="flex shrink-0 items-center">
            <BrandLogo className="h-7" />
          </Link>
          <span className="hidden text-line sm:inline">/</span>
          <input
            aria-label="CV title"
            value={cv.title}
            onChange={(event) => useCVStore.getState().setTitle(event.target.value)}
            className="h-9 min-w-0 max-w-[9.5rem] rounded-md border border-transparent bg-transparent px-2 text-sm font-medium text-ink-text hover:border-line focus:border-ink md:max-w-xs"
          />
        </div>
        <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-2">
          <SaveLabel status={saveStatus} />
          <div className="hidden items-center gap-2 lg:flex">
            <Button variant="secondary" className="shrink-0" onClick={() => setTemplatesOpen(true)}>
              Template
            </Button>
            <Link to={`/preview/${cvId}`} className="text-sm text-muted hover:text-ink-text">
              Full preview
            </Link>
            <Button
              variant="secondary"
              className="shrink-0 whitespace-nowrap"
              onClick={exportPdf}
              title={exportState.ready ? "Ready to export" : "Review your CV before exporting"}
            >
              Print / Save as PDF
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md text-ink-text lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <RightMenu open={menuOpen} onClose={() => setMenuOpen(false)}>
        <p className="px-3 pb-2 text-xs text-muted">{saveStatusLabel(saveStatus)}</p>
        <button
          type="button"
          className="rounded-md px-3 py-2.5 text-left text-sm text-ink-text hover:bg-canvas lg:hidden"
          onClick={() => {
            setPreviewOpen((open) => !open);
            setMenuOpen(false);
          }}
        >
          {previewOpen ? "Editor" : "Preview"}
        </button>
        <button
          type="button"
          className="rounded-md px-3 py-2.5 text-left text-sm text-ink-text hover:bg-canvas"
          onClick={() => {
            setTemplatesOpen(true);
            setMenuOpen(false);
          }}
        >
          Template
        </button>
        <Link
          to={`/preview/${cvId}`}
          className="rounded-md px-3 py-2.5 text-sm text-ink-text hover:bg-canvas"
          onClick={() => setMenuOpen(false)}
        >
          Full preview
        </Link>
        <button
          type="button"
          className="rounded-md px-3 py-2.5 text-left text-sm text-ink-text hover:bg-canvas"
          onClick={() => {
            exportPdf();
            setMenuOpen(false);
          }}
        >
          Print / Save as PDF
        </button>
        <Link
          to="/cvs"
          className="rounded-md px-3 py-2.5 text-sm text-ink-text hover:bg-canvas"
          onClick={() => setMenuOpen(false)}
        >
          My CVs
        </Link>
      </RightMenu>

      <div
        className={
          previewOpen
            ? "grid min-h-0 lg:grid-cols-[248px_minmax(0,1fr)_minmax(340px,42%)]"
            : "grid min-h-0 grid-rows-[auto_minmax(0,1fr)] lg:grid-rows-1 lg:grid-cols-[248px_minmax(0,1fr)_minmax(340px,42%)]"
        }
      >
        <aside className={previewOpen ? "hidden lg:block" : "min-h-0"}>
          <SectionNav
            active={section}
            onSelect={setSection}
            hiddenSections={cv.settings.hiddenSections}
            sectionOrder={cv.settings.sectionOrder}
            onToggle={(sectionId) => useCVStore.getState().toggleSectionVisibility(sectionId)}
            onMove={(sectionId, direction) => useCVStore.getState().moveSection(sectionId, direction)}
          />
        </aside>

        <div className={previewOpen ? "hidden min-h-0 lg:flex lg:flex-col" : "flex min-h-0 flex-col"}>
          <main className="flex-1 overflow-auto p-5 lg:p-6">
            {errorMessage ? (
              <p className="mb-4 rounded-xl border border-[#f0caca] bg-[#fcecec] px-4 py-3 text-sm text-danger">
                {errorMessage}
              </p>
            ) : null}
            <p className="mb-5 text-xs text-muted">
              {template.name} · {template.layout.replace("-", " ")} · ATS-friendly
            </p>
            {!exportState.ready ? (
              <div className="mb-5 rounded-xl border border-line bg-paper px-4 py-3 text-sm text-muted">
                Review your CV before exporting: {exportState.issues.map((issue) => issue.message).join(" ")}
              </div>
            ) : (
              <div className="mb-5 rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink-text">
                Ready to export
              </div>
            )}
            <EditorBody section={section} />
          </main>
          <ATSPanel data={cv} open={atsOpen} onToggle={() => setAtsOpen((open) => !open)} />
        </div>

        <section className={previewOpen ? "min-h-0" : "hidden min-h-0 lg:block"}>
          <PreviewPane data={cv} />
        </section>
      </div>

      {templatesOpen ? (
        <TemplatePicker
          currentId={cv.templateId}
          onClose={() => setTemplatesOpen(false)}
          onSelect={(templateId) => useCVStore.getState().setTemplate(templateId)}
        />
      ) : null}
    </div>
  );
}

function saveStatusLabel(status: string) {
  if (status === "saving") return "Saving...";
  if (status === "unsaved") return "Unsaved changes";
  if (status === "error") return "Unable to save";
  return "Saved";
}

function SaveLabel({ status }: { status: string }) {
  return <span className="hidden text-xs text-muted lg:inline">{saveStatusLabel(status)}</span>;
}

function EditorBody({ section }: { section: EditorSectionId }) {
  const cv = useCurrentCV();
  if (!cv) return null;
  const store = useCVStore.getState();

  if (section === "personalInfo") {
    return <PersonalInfoSection value={cv.personalInfo} onChange={store.patchPersonalInfo} />;
  }
  if (section === "document") {
    return <DocumentSection settings={cv.settings} onChange={store.updateSettings} />;
  }
  if (section === "summary") {
    return <SummarySection value={cv.summary} onChange={store.setSummary} />;
  }
  if (section === "experience") {
    return (
      <ExperienceSection
        items={cv.experience}
        onAdd={store.addExperience}
        onUpdate={store.updateExperience}
        onRemove={store.removeExperience}
        onDuplicate={store.duplicateExperience}
        onMove={store.moveExperience}
        onAchievements={store.setExperienceAchievements}
      />
    );
  }
  if (section === "education") {
    return (
      <EducationSection
        items={cv.education}
        onAdd={store.addEducation}
        onChange={(education) => store.updateList("education", () => education)}
      />
    );
  }
  if (section === "skills") {
    return (
      <SkillsSection
        items={cv.skills}
        onAdd={store.addSkillGroup}
        onChange={(skills) => store.updateList("skills", () => skills)}
      />
    );
  }
  if (section === "projects") {
    return (
      <ProjectsSection
        items={cv.projects}
        onAdd={store.addProject}
        onChange={(projects) => store.updateList("projects", () => projects)}
      />
    );
  }
  if (section === "certifications") {
    return (
      <CertificationsSection
        items={cv.certifications}
        onAdd={store.addCertification}
        onChange={(certifications) => store.updateList("certifications", () => certifications)}
      />
    );
  }
  if (section === "achievements") {
    return (
      <AchievementsSection
        items={cv.achievements}
        onAdd={store.addAchievement}
        onChange={(achievements) => store.updateList("achievements", () => achievements)}
      />
    );
  }
  if (section === "languages") {
    return (
      <LanguagesSection
        items={cv.languages}
        onAdd={store.addLanguage}
        onChange={(languages) => store.updateList("languages", () => languages)}
      />
    );
  }
  if (section === "links") {
    return (
      <LinksSection
        items={cv.links}
        onAdd={store.addLink}
        onChange={(links) => store.updateList("links", () => links)}
      />
    );
  }
  return (
    <CustomSectionsEditor
      items={cv.customSections}
      onAdd={store.addCustomSection}
      onChange={(customSections) => store.updateList("customSections", () => customSections)}
    />
  );
}
