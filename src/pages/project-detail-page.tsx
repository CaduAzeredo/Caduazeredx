import React, { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import PageShell from "@/components/layout/page-shell";
import ProjectStatus from "@/components/project/project-status";
import { projects } from "@/content/projects";
import {
  ArrowLeft,
  Code2,
  HelpCircle,
  Lightbulb,
  Compass,
  Image,
} from "lucide-react";

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  // Atualizar título para SEO
  useEffect(() => {
    if (project) {
      document.title = `${project.title} — Estudo de Caso | Cadu Azeredo`;
    }
  }, [project]);

  // Se o projeto não for encontrado, redireciona para a página 404
  if (!project) {
    return <Navigate to="/404" replace />;
  }

  return (
    <PageShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left">
        {/* Voltar para Projetos */}
        <div>
          <Link
            to="/projetos"
            className="inline-flex items-center space-x-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para projetos</span>
          </Link>
        </div>

        {/* CABEÇALHO DO CASO */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono tracking-wider uppercase text-primary font-medium">
              {project.category === "product"
                ? "Produto / Marketplace"
                : project.category}
            </span>
            <ProjectStatus status={project.status} />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-sans">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-sans max-w-3xl">
            {project.shortDescription}
          </p>

          {/* Tabela de Detalhes / Ficha Técnica */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-surface border border-border/80 select-none">
            <div>
              <span className="block text-[10px] font-mono text-muted-foreground/60 uppercase">
                Ano
              </span>
              <span className="text-xs font-sans font-medium text-foreground">
                {project.year || "2026"}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-mono text-muted-foreground/60 uppercase">
                Papel
              </span>
              <span className="text-xs font-sans font-medium text-foreground">
                {project.role.join(" / ")}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-mono text-muted-foreground/60 uppercase">
                Categoria
              </span>
              <span className="text-xs font-sans font-medium text-foreground">
                {project.category === "product"
                  ? "Marketplace / Produto"
                  : project.category}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-mono text-muted-foreground/60 uppercase">
                Workspace Stack
              </span>
              <span className="text-xs font-mono font-medium text-foreground overflow-hidden text-ellipsis block whitespace-nowrap">
                {project.stack.slice(0, 3).join(", ")}...
              </span>
            </div>
          </div>
        </header>

        <hr className="border-border/60" />

        {/* CONTEXTO */}
        {project.problem && (
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-sans flex items-center space-x-2 text-foreground">
              <HelpCircle className="w-5 h-5 text-primary-muted" />
              <span>O Problema & Origem</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
              {project.problem}
            </p>
          </section>
        )}

        {/* SOLUÇÃO */}
        {project.solution && (
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-sans flex items-center space-x-2 text-foreground">
              <Lightbulb className="w-5 h-5 text-primary" />
              <span>A Proposta de Solução</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
              {project.solution}
            </p>
          </section>
        )}

        {/* PROCESS / CONSTRUÇÃO */}
        {project.process && project.process.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-sans flex items-center space-x-2 text-foreground">
              <Code2 className="w-5 h-5 text-secondary" />
              <span>Processo de Construção do Front-end</span>
            </h2>
            <ul className="space-y-3 pl-5 list-disc text-sm sm:text-base text-muted-foreground">
              {project.process.map((step, idx) => (
                <li key={idx} className="leading-relaxed font-sans">
                  {step}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* GALERIA PLACEHOLDER (NEUTRO, SEM IMAGENS INVENTADAS) */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold font-sans flex items-center space-x-2 text-foreground">
            <Image className="w-5 h-5 text-muted-foreground/60" />
            <span>Interface & Design Visual</span>
          </h2>
          <div className="border border-dashed border-border/80 rounded-lg p-10 flex flex-col items-center justify-center bg-surface/30 select-none">
            <span className="font-mono text-xs text-muted-foreground/50">
              [Galeria: Capturas de tela da interface a definir conforme o build
              avança]
            </span>
          </div>
        </section>

        {/* APRENDIZADOS E PRÓXIMOS PASSOS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Aprendizados */}
          {project.learnings && project.learnings.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-sans text-foreground flex items-center space-x-2">
                <Compass className="w-4.5 h-4.5 text-primary-muted" />
                <span>O que aprendi</span>
              </h3>
              <ul className="space-y-2 pl-4 list-decimal text-xs sm:text-sm text-muted-foreground">
                {project.learnings.map((item, idx) => (
                  <li key={idx} className="leading-relaxed font-sans">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Próximos Passos */}
          {project.nextSteps && project.nextSteps.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-sans text-foreground flex items-center space-x-2">
                <Code2 className="w-4.5 h-4.5 text-primary" />
                <span>Próximos passos</span>
              </h3>
              <ul className="space-y-2 pl-4 list-decimal text-xs sm:text-sm text-muted-foreground">
                {project.nextSteps.map((item, idx) => (
                  <li key={idx} className="leading-relaxed font-sans">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </PageShell>
  );
};

export default ProjectDetailPage;
