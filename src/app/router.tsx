import React, { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/home-page";
import { cn } from "@/lib/utils";

// Lazy Loading das páginas menos críticas
const ProjectsPage = lazy(() => import("@/pages/projects-page"));
const ProjectDetailPage = lazy(() => import("@/pages/project-detail-page"));
const ProductsPage = lazy(() => import("@/pages/products-page"));
const ProductDetailPage = lazy(() => import("@/pages/product-detail-page"));
const NovidadesPage = lazy(() => import("@/pages/novidades-page"));
const AboutPage = lazy(() => import("@/pages/about-page"));
const ContactPage = lazy(() => import("@/pages/contact-page"));
const PrivacyPage = lazy(() => import("@/pages/privacy-page"));
const TermsPage = lazy(() => import("@/pages/terms-page"));
const NotFoundPage = lazy(() => import("@/pages/not-found-page"));

// Loader temático do terminal para transições do Suspense
const TerminalLoader = () => {
  // Inicialização dinâmica do estado evita chamadas síncronas de setState em useEffect
  const [prefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  return (
    <div className="flex-grow flex items-center justify-center min-h-[50vh] font-mono text-xs text-muted-foreground select-none">
      <div className="flex items-center">
        {/* Leitores de tela obtêm o texto completo imediatamente */}
        <span className="sr-only">$ loading --chunk_data...</span>
        <span aria-hidden="true" className="flex items-center">
          <span>$ loading --chunk_data</span>
          {prefersReducedMotion ? (
            <span>...</span>
          ) : (
            <span className="inline-flex items-center ml-0.5">
              <span
                className="terminal-dot w-1 h-1 rounded-full bg-muted-foreground"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="terminal-dot w-1 h-1 rounded-full bg-muted-foreground ml-1"
                style={{ animationDelay: "200ms" }}
              />
              <span
                className="terminal-dot w-1 h-1 rounded-full bg-muted-foreground ml-1"
                style={{ animationDelay: "400ms" }}
              />
            </span>
          )}
          <span
            className={cn(
              "inline-block w-1.5 h-3.5 bg-primary ml-1.5",
              !prefersReducedMotion && "terminal-cursor",
            )}
          />
        </span>
      </div>
    </div>
  );
};

export const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<TerminalLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projetos" element={<ProjectsPage />} />
        <Route path="/projetos/:slug" element={<ProjectDetailPage />} />
        <Route path="/produtos" element={<ProductsPage />} />
        <Route path="/produtos/:slug" element={<ProductDetailPage />} />
        <Route path="/novidades" element={<NovidadesPage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/contato" element={<ContactPage />} />
        <Route path="/privacidade" element={<PrivacyPage />} />
        <Route path="/termos" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
