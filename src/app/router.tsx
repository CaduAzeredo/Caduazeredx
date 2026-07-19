import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/home-page";

// Lazy Loading das páginas menos críticas
const ProjectsPage = lazy(() => import("@/pages/projects-page"));
const ProjectDetailPage = lazy(() => import("@/pages/project-detail-page"));
const AboutPage = lazy(() => import("@/pages/about-page"));
const ContactPage = lazy(() => import("@/pages/contact-page"));
const NotFoundPage = lazy(() => import("@/pages/not-found-page"));

// Loader temático do terminal para transições do Suspense
const TerminalLoader = () => (
  <div className="flex-grow flex items-center justify-center min-h-[50vh] font-mono text-xs text-muted-foreground select-none">
    <div className="flex items-center space-x-2">
      <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
      <span>$ loading --chunk_data...</span>
    </div>
  </div>
);

export const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<TerminalLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projetos" element={<ProjectsPage />} />
        <Route path="/projetos/:slug" element={<ProjectDetailPage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/contato" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
