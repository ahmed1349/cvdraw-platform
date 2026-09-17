import { HomeHeading, HomeLead, HomeSection, PrimaryCta, SecondaryCta } from "@/pages/home/HomeSection";

export function CTA() {
  return (
    <HomeSection className="border-t border-line bg-mint/35">
      <div className="max-w-2xl">
        <HomeHeading>Your next opportunity starts with a better CV.</HomeHeading>
        <HomeLead>Build a professional, ATS-focused CV in minutes.</HomeLead>
        <div className="mt-8 flex flex-wrap gap-3">
          <PrimaryCta to="/create">Create My CV</PrimaryCta>
          <SecondaryCta to="/templates">Explore Templates</SecondaryCta>
        </div>
      </div>
    </HomeSection>
  );
}
