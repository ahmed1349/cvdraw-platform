import { Check } from "lucide-react";
import { HomeLead, PrimaryCta, SecondaryCta } from "@/pages/home/HomeSection";
import { ProductMockup } from "@/pages/home/ProductMockup";

const trust = ["ATS-first templates", "Selectable-text PDF", "40+ professional templates"];

export function Hero() {
  return (
    <section className="home-hero border-b border-line">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.18fr)] lg:py-16">
        <div>
          <p className="text-sm font-medium text-ink">ATS-first CV builder</p>
          <h1 className="mt-3 max-w-xl text-4xl font-medium leading-[1.12] tracking-tight text-ink-text md:text-5xl lg:text-[56px]">
            Build a CV that gets read.
          </h1>
          <HomeLead>
            Create a professional, ATS-friendly CV in minutes. Choose from modern templates built for
            technical and creative careers.
          </HomeLead>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryCta to="/create">Create My CV</PrimaryCta>
            <SecondaryCta to="/templates">Explore Templates</SecondaryCta>
          </div>
          <ul className="mt-8 space-y-2">
            {trust.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-ink-text">
                <Check size={16} className="text-ink" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <ProductMockup />
      </div>
    </section>
  );
}
