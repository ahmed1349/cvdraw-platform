import { HomeHeading, HomeLead, HomeSection, PrimaryCta } from "@/pages/home/HomeSection";
import { TemplateCard } from "@/pages/home/TemplateCard";

const roles = [
  "Software Engineer",
  "Frontend Engineer",
  "Backend Engineer",
  "Full Stack Engineer",
  "AI Engineer",
  "Data Engineer",
  "DevOps Engineer",
  "Cloud Engineer",
  "Mobile Developer",
];

const creatorRoles = [
  "Content Creator",
  "Social Media",
  "Digital Marketing",
  "Brand Content",
  "Media",
  "Creative Strategy",
];

export function CareerSection() {
  return (
    <>
      <HomeSection id="engineers">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div>
            <HomeHeading>Built for technical careers</HomeHeading>
            <HomeLead>
              Professional CV layouts designed around the information recruiters look for in technical
              candidates.
            </HomeLead>
            <div className="mt-6 flex flex-wrap gap-2">
              {roles.map((role) => (
                <span
                  key={role}
                  className="rounded-md border border-line bg-paper px-2.5 py-1 text-xs text-ink-text"
                >
                  {role}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <PrimaryCta to="/templates">Explore Engineer Templates</PrimaryCta>
            </div>
          </div>
          <TemplateCard templateId="se-01" />
        </div>
      </HomeSection>

      <HomeSection id="creators" className="border-t border-line bg-paper">
        <HomeHeading>Creative enough to stand out. Structured enough to be read.</HomeHeading>
        <HomeLead>
          Creator templates stay text-readable for ATS tools, with room for portfolio, brand, and
          social links.
        </HomeLead>
        <div className="mt-6 flex flex-wrap gap-2">
          {creatorRoles.map((role) => (
            <span
              key={role}
              className="rounded-md border border-line bg-canvas px-2.5 py-1 text-xs text-ink-text"
            >
              {role}
            </span>
          ))}
        </div>
        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
          <TemplateCard templateId="cc-01" compact />
          <TemplateCard templateId="cc-02" compact />
          <TemplateCard templateId="cc-03" compact />
        </div>
      </HomeSection>
    </>
  );
}
