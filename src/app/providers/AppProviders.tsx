import { useEffect, type ReactNode } from "react";
import { useCVStore } from "@/app/store/cvStore";
import { BrandLogo } from "@/components/brand/BrandLogo";

export function AppProviders({ children }: { children: ReactNode }) {
  const hydrate = useCVStore((state) => state.hydrate);
  const isLoaded = useCVStore((state) => state.isLoaded);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen flex-col items-start justify-center gap-3 bg-canvas px-6">
        <BrandLogo className="h-9" />
        <p className="text-sm text-muted">Loading CVdraw…</p>
      </div>
    );
  }

  return children;
}
