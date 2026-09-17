import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { AuthPage } from "@/pages/AuthPage";
import { CreateCVPage } from "@/pages/CreateCVPage";
import { EditorPage } from "@/pages/EditorPage";
import { LandingPage } from "@/pages/LandingPage";
import { MyCVsPage } from "@/pages/MyCVsPage";
import { PreviewPage } from "@/pages/PreviewPage";
import { PrintPage } from "@/pages/PrintPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { TemplatesPage } from "@/pages/TemplatesPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/editor/:id" element={<EditorPage />} />
        <Route path="/preview/:id" element={<PreviewPage />} />
        <Route path="/print/:id" element={<PrintPage />} />
        <Route element={<AppShell />}>
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/create" element={<CreateCVPage />} />
          <Route path="/cvs" element={<MyCVsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/login" element={<AuthPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
