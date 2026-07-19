import React from "react";
import { Link } from "react-router-dom";
import type { Project } from "@/types";
import { ProjectStatus } from "./project-status";
import { ArrowRight, Lock } from "lucide-react";

export interface ProjectCardProps {
  project?: Project;
  isPlaceholder?: boolean;
  placeholderTitle?: string;
  placeholderDescription?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isPlaceholder = false,
  placeholderTitle = "Laboratório de Interfaces",
  placeholderDescription = "Próximo produto em desenvolvimento...",
}) => {
  if (isPlaceholder || !project) {
    return (
      <div className="h-full rounded-lg bg-surface/30 border border-border/40 p-6 flex flex-col justify-between opacity-45 relative overflow-hidden select-none">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground/60">
              [Status: Ocioso]
            </span>
            <Lock className="w-3.5 h-3.5 text-muted-foreground/40" />
          </div>
          <div className="space-y-2">
            <h4 className="font-mono text-sm font-semibold text-muted-foreground/80">
              {placeholderTitle}
            </h4>
            <p className="text-xs text-muted-foreground/60 leading-relaxed">
              {placeholderDescription}
            </p>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-border/20 flex items-center space-x-2 text-[10px] font-mono text-muted-foreground/40">
          <span>Aguardando commits futuros...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full rounded-lg bg-surface border border-border p-6 flex flex-col justify-between hover:border-primary/50 transition-all duration-300 relative group border-glow hover:shadow-[0_0_22px_rgba(246,114,128,0.08)]">
      <div className="space-y-4">
        {/* Categoria & Status */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-wider uppercase text-primary font-medium">
            {project.category === "product"
              ? "Produto / Marketplace"
              : project.category}
          </span>
          <ProjectStatus status={project.status} />
        </div>

        {/* Título & Descrição */}
        <div className="space-y-2">
          <h3 className="font-sans text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Papéis desempenhados */}
        <div className="text-xs text-muted-foreground font-mono">
          <span className="text-[10px] text-muted-foreground/60">Papel: </span>
          {project.role.join(" • ")}
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {/* Tecnologias */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded bg-surface-elevated border border-border text-[10px] font-mono text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Link / CTA */}
        <div className="pt-4 border-t border-border/80">
          <Link
            to={`/projetos/${project.slug}`}
            className="inline-flex items-center space-x-2 text-sm text-primary font-medium hover:text-primary-muted transition-colors"
          >
            <span>Ver estudo de caso</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
