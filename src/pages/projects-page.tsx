import React, { useEffect } from "react";
import PageShell from "@/components/layout/page-shell";
import ProjectCard from "@/components/project/project-card";
import { projects } from "@/content/projects";
import { Sparkles, HelpCircle } from "lucide-react";

export const ProjectsPage: React.FC = () => {
  // Atualizar título para SEO
  useEffect(() => {
    document.title =
      "Projetos | Cadu Azeredo — Front-end Developer & Product Builder";
  }, []);

  const diariaBrProject = projects.find((p) => p.slug === "diariabr");

  return (
    <PageShell>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Cabeçalho */}
        <div className="space-y-4 text-left border-b border-border/80 pb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-sans">
            Projetos & Laboratório
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl leading-relaxed">
            Aqui concentro meus produtos autorais e experimentos técnicos de
            front-end. O DiáriaBr é o projeto principal em desenvolvimento ativo
            nesta V1.
          </p>
        </div>

        {/* PROTAGONISTA ABSOLUTO: DiáriaBr / DiáriaPalmas */}
        <div className="space-y-6 text-left">
          <div className="flex items-center space-x-2 text-xs font-mono text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Produto Principal em Construção</span>
          </div>

          <div className="border border-primary/20 rounded-xl overflow-hidden bg-surface-elevated/45 p-1">
            {diariaBrProject ? (
              <ProjectCard project={diariaBrProject} />
            ) : (
              <div className="p-12 text-center font-mono text-sm text-muted-foreground bg-surface rounded-lg">
                Projeto principal indisponível.
              </div>
            )}
          </div>
        </div>

        {/* SEÇÃO SECUNDÁRIA: LABORATÓRIO / ROADMAP (DISCRETO) */}
        <div className="space-y-6 text-left">
          <div className="flex items-center space-x-2 text-xs font-mono text-muted-foreground/60">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Estrutura e Planejamento Futuro (Roadmap)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard
              isPlaceholder
              placeholderTitle="Laboratório de Interfaces / Sandbox"
              placeholderDescription="Biblioteca de micro-interações, estados de hover experimentais e testes de animação acessíveis."
            />
            <ProjectCard
              isPlaceholder
              placeholderTitle="IA Integrada / Automações de Workspace"
              placeholderDescription="Scripts de automação local, orquestração de testes e testes com LLMs locais de apoio ao desenvolvedor."
            />
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default ProjectsPage;
