import { AppFooter, AppHeader } from "@/components/layout/AppHeader";
import { ATSSection } from "@/pages/home/ATSSection";
import { CareerSection } from "@/pages/home/CareerSection";
import { CTA } from "@/pages/home/CTA";
import { Features } from "@/pages/home/Features";
import { Hero } from "@/pages/home/Hero";
import { HowItWorks } from "@/pages/home/HowItWorks";
import { TemplateShowcase } from "@/pages/home/TemplateShowcase";
import { VersionsSection } from "@/pages/home/VersionsSection";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <AppHeader />
      <main>
        <Hero />
        <TemplateShowcase />
        <Features />
        <ATSSection />
        <HowItWorks />
        <CareerSection />
        <VersionsSection />
        <CTA />
      </main>
      <AppFooter />
    </div>
  );
}
