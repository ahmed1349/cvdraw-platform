import type { CSSProperties } from "react";
import type { CVData, FontSize, SectionId, Spacing } from "@/features/cv/types/cv.types";
import { formatDateRange, formatMonthYear } from "@/features/cv/utils/dates";
import { SECTION_LABELS } from "@/features/cv/utils/defaults";
import { getTemplateDefinition } from "@/features/templates/catalog";
import { CVHeader, CVSection } from "@/features/templates/components/CVPrimitives";
import type { CVTemplateProps } from "@/features/templates/types";
import "@/features/templates/engine/cv.css";

const fontSizeMap: Record<FontSize, string> = {
  small: "9.5pt",
  medium: "10.5pt",
  large: "11.5pt",
};

const spacingMap: Record<Spacing, string> = {
  compact: "0.85",
  normal: "1",
  comfortable: "1.15",
};

const SIDEBAR_SECTIONS: SectionId[] = ["skills", "languages", "links", "certifications"];

function isVisible(data: CVData, id: SectionId) {
  return !data.settings.hiddenSections.includes(id);
}

function hasText(value?: string) {
  return Boolean(value?.trim());
}

export function ThemedCV({ data, mode = "preview" }: CVTemplateProps) {
  const definition = getTemplateDefinition(data.templateId);
  const { settings } = data;
  const twoCol = definition.meta.layout === "two-column";
  const style = {
    fontFamily: `${settings.fontFamily}, Inter, Helvetica, Arial, sans-serif`,
    fontSize: fontSizeMap[settings.fontSize],
    "--cv-accent": settings.accentColor,
    "--cv-density": spacingMap[settings.spacing],
  } as CSSProperties;

  const visible = settings.sectionOrder.filter((id) => isVisible(data, id));
  const sidebar = twoCol ? visible.filter((id) => SIDEBAR_SECTIONS.includes(id)) : [];
  const main = twoCol ? visible.filter((id) => !SIDEBAR_SECTIONS.includes(id)) : visible;

  return (
    <article
      className={`cv-page theme-${definition.visual} ${twoCol ? "two-col" : ""} ${mode}`}
      style={style}
    >
      <CVHeader info={data.personalInfo} />
      {twoCol ? (
        <div className="cv-columns">
          <div className="cv-sidebar">
            {sidebar.map((sectionId) => (
              <TemplateSection key={sectionId} sectionId={sectionId} data={data} />
            ))}
          </div>
          <div className="cv-main">
            {main.map((sectionId) => (
              <TemplateSection key={sectionId} sectionId={sectionId} data={data} />
            ))}
          </div>
        </div>
      ) : (
        main.map((sectionId) => <TemplateSection key={sectionId} sectionId={sectionId} data={data} />)
      )}
    </article>
  );
}

function TemplateSection({ sectionId, data }: { sectionId: SectionId; data: CVData }) {
  switch (sectionId) {
    case "summary":
      if (!hasText(data.summary)) return null;
      return (
        <CVSection title={SECTION_LABELS.summary}>
          <p>{data.summary}</p>
        </CVSection>
      );
    case "skills": {
      const groups = data.skills.filter((group) => group.skills.some((skill) => hasText(skill)));
      if (groups.length === 0) return null;
      return (
        <CVSection title="Technical Skills">
          <ul className="cv-skill-list">
            {groups.map((group) => (
              <li key={group.id}>
                {hasText(group.category) ? <strong>{group.category}: </strong> : null}
                {group.skills.filter((skill) => hasText(skill)).join(", ")}
              </li>
            ))}
          </ul>
        </CVSection>
      );
    }
    case "experience": {
      const items = data.experience.filter(
        (item) => hasText(item.position) || hasText(item.company) || item.achievements.some(hasText),
      );
      if (items.length === 0) return null;
      return (
        <CVSection title={SECTION_LABELS.experience}>
          {items.map((item) => (
            <article key={item.id} className="cv-entry">
              <div className="cv-entry-head">
                <h3>{[item.position, item.company].filter((part) => hasText(part)).join(" — ")}</h3>
                <span>{formatDateRange(item.startDate, item.endDate, item.current)}</span>
              </div>
              {hasText(item.location) ? <p className="cv-meta">{item.location}</p> : null}
              {hasText(item.description) ? <p>{item.description}</p> : null}
              {item.achievements.some(hasText) ? (
                <ul>
                  {item.achievements.filter(hasText).map((achievement, index) => (
                    <li key={`${item.id}-${index}`}>{achievement}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </CVSection>
      );
    }
    case "projects": {
      const items = data.projects.filter((item) => hasText(item.name));
      if (items.length === 0) return null;
      return (
        <CVSection title={SECTION_LABELS.projects}>
          {items.map((item) => (
            <article key={item.id} className="cv-entry">
              <div className="cv-entry-head">
                <h3>{item.name}</h3>
                <span>{formatDateRange(item.startDate, item.endDate)}</span>
              </div>
              {hasText(item.role) ? <p className="cv-meta">{item.role}</p> : null}
              {hasText(item.description) ? <p>{item.description}</p> : null}
              {item.technologies.some(hasText) ? (
                <p className="cv-meta">{item.technologies.filter(hasText).join(", ")}</p>
              ) : null}
              {item.achievements?.some(hasText) ? (
                <ul>
                  {item.achievements.filter(hasText).map((achievement, index) => (
                    <li key={`${item.id}-${index}`}>{achievement}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </CVSection>
      );
    }
    case "education": {
      const items = data.education.filter((item) => hasText(item.institution) || hasText(item.degree));
      if (items.length === 0) return null;
      return (
        <CVSection title={SECTION_LABELS.education}>
          {items.map((item) => (
            <article key={item.id} className="cv-entry">
              <div className="cv-entry-head">
                <h3>
                  {[item.degree, item.field].filter((part) => hasText(part)).join(" in ") || item.institution}
                </h3>
                <span>{formatDateRange(item.startDate, item.endDate)}</span>
              </div>
              <p className="cv-meta">
                {[item.institution, item.location, item.grade].filter((part) => hasText(part)).join(" · ")}
              </p>
              {hasText(item.description) ? <p>{item.description}</p> : null}
            </article>
          ))}
        </CVSection>
      );
    }
    case "certifications": {
      const items = data.certifications.filter((item) => hasText(item.name));
      if (items.length === 0) return null;
      return (
        <CVSection title={SECTION_LABELS.certifications}>
          {items.map((item) => (
            <article key={item.id} className="cv-entry">
              <div className="cv-entry-head">
                <h3>{item.name}</h3>
                <span>{item.date ? formatMonthYear(item.date) : ""}</span>
              </div>
              <p className="cv-meta">
                {[item.issuer, item.credentialId].filter((part) => hasText(part)).join(" · ")}
              </p>
            </article>
          ))}
        </CVSection>
      );
    }
    case "achievements": {
      const items = data.achievements.filter((item) => hasText(item.title));
      if (items.length === 0) return null;
      return (
        <CVSection title={SECTION_LABELS.achievements}>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.title}
                {item.date ? ` (${formatMonthYear(item.date)})` : ""}
                {hasText(item.description) ? ` — ${item.description}` : ""}
              </li>
            ))}
          </ul>
        </CVSection>
      );
    }
    case "languages": {
      const items = data.languages.filter((item) => hasText(item.name));
      if (items.length === 0) return null;
      return (
        <CVSection title={SECTION_LABELS.languages}>
          <p>{items.map((item) => `${item.name} — ${item.proficiency}`).join("; ")}</p>
        </CVSection>
      );
    }
    case "links": {
      const items = data.links.filter((item) => hasText(item.url));
      if (items.length === 0) return null;
      return (
        <CVSection title={SECTION_LABELS.links}>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {hasText(item.label) ? `${item.label}: ` : ""}
                {item.url}
              </li>
            ))}
          </ul>
        </CVSection>
      );
    }
    case "customSections":
      return (
        <>
          {data.customSections.map((section) => {
            if (!hasText(section.title) || section.items.length === 0) return null;
            return (
              <CVSection key={section.id} title={section.title}>
                {section.items.map((item) => (
                  <article key={item.id} className="cv-entry">
                    <div className="cv-entry-head">
                      <h3>{item.title}</h3>
                      <span>{item.date ? formatMonthYear(item.date) : ""}</span>
                    </div>
                    {hasText(item.subtitle) ? <p className="cv-meta">{item.subtitle}</p> : null}
                    {hasText(item.description) ? <p>{item.description}</p> : null}
                    {item.bullets?.some(hasText) ? (
                      <ul>
                        {item.bullets.filter(hasText).map((bullet, index) => (
                          <li key={`${item.id}-${index}`}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                ))}
              </CVSection>
            );
          })}
        </>
      );
    default:
      return null;
  }
}
