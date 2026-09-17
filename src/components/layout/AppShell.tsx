import { Outlet } from "react-router-dom";
import { AppFooter, AppHeader } from "@/components/layout/AppHeader";

export function AppShell() {
  return (
    <div className="min-h-screen bg-canvas">
      <AppHeader />
      <Outlet />
      <AppFooter />
    </div>
  );
}
