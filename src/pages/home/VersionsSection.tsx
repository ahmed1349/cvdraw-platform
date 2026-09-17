import { Link } from "react-router-dom";
import { HomeHeading, HomeLead, HomeSection } from "@/pages/home/HomeSection";

const versions = [
  { title: "Software Engineer — General", template: "Classic Engineer", updated: "17 Sep 2026" },
  { title: "Software Engineer — AI", template: "AI Engineer", updated: "12 Sep 2026" },
  { title: "Frontend Engineer", template: "Modern Engineer", updated: "4 Sep 2026" },
  { title: "Backend Engineer", template: "Technical Professional", updated: "28 Aug 2026" },
];

export function VersionsSection() {
  return (
    <HomeSection id="versions">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <HomeHeading>One profile. Multiple opportunities.</HomeHeading>
          <HomeLead>Create targeted versions of your CV without starting over.</HomeLead>
        </div>
        <div className="overflow-hidden rounded-xl border border-line bg-paper">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <p className="text-sm font-medium text-ink-text">My CVs</p>
            <Link to="/cvs" className="text-sm text-ink hover:text-ink-text">
              Open
            </Link>
          </div>
          <ul>
            {versions.map((cv, index) => (
              <li
                key={cv.title}
                className={index === versions.length - 1 ? "px-4 py-4" : "border-b border-line px-4 py-4"}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-ink-text">{cv.title}</p>
                    <p className="mt-1 text-xs text-muted">
                      {cv.template} · Last updated {cv.updated}
                    </p>
                  </div>
                  <div className="flex gap-3 text-xs text-muted">
                    <span>Edit</span>
                    <span>Duplicate</span>
                    <span>Download</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </HomeSection>
  );
}
