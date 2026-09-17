import type { ReactNode } from "react";
import type { PersonalInfo } from "@/features/cv/types/cv.types";

function compact(...values: Array<string | undefined>) {
  return values.map((value) => value?.trim()).filter(Boolean) as string[];
}

export function CVHeader({ info }: { info: PersonalInfo }) {
  const contacts = compact(
    info.email,
    info.phone,
    info.website,
    info.linkedin,
    info.github,
    info.portfolio,
  );

  return (
    <header className="cv-header">
      <h1>{info.fullName.trim() || "Your Name"}</h1>
      {info.professionalTitle.trim() ? <p className="cv-title">{info.professionalTitle}</p> : null}
      {contacts.length > 0 ? (
        <p className="cv-contacts">
          {contacts.map((item, index) => (
            <span key={item}>
              {index > 0 ? <span className="cv-sep"> · </span> : null}
              {item}
            </span>
          ))}
        </p>
      ) : null}
    </header>
  );
}

export function CVSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="cv-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
