import React from "react";
import { Link } from "react-router-dom";
import type { Project } from "@/types";
import { ProjectStatus } from "./project-status";
import { buttonVariants } from "@/components/ui/button";

export interface ProjectCardProps {
  project: Project;
}

/** O rótulo da categoria, em texto normal — a caixa alta saiu na troca de 15/10. */
const CATEGORIA: Record<string, string> = {
  product: "produto · marketplace",
};

/**
 * O cartão de um projeto — a forma da tela 16: categoria e estado no topo,
 * título, descrição, papel e stack numa lista curta, e o estudo de caso.
 *
 * Até a v4 existia aqui uma variante "ocioso" (os cartões "Aguardando commits
 * futuros"). Saiu com o design de 15/10: cada projeto diz em que pé está, sem
 * cartão de "em breve".
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <article className="flex h-full flex-col gap-4 rounded-lg border border-border bg-surface p-6 transition-[border-color,box-shadow] duration-300 hover:border-primary/50 glow-border">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="font-mono text-[11px] text-muted-foreground">
        {CATEGORIA[project.category] ?? project.category}
      </span>
      <ProjectStatus status={project.status} />
    </div>

    <h3 className="titulo-serif text-[26px] leading-tight text-foreground">{project.title}</h3>
    <p className="text-sm leading-relaxed text-muted-foreground">{project.shortDescription}</p>

    <dl className="m-0 grid grid-cols-[72px_minmax(0,1fr)] gap-x-4 gap-y-1.5 text-[13px]">
      <dt className="font-mono text-[11px] leading-5 text-muted-foreground">papel</dt>
      <dd className="m-0 text-foreground">{project.role.join(" · ")}</dd>
      <dt className="font-mono text-[11px] leading-5 text-muted-foreground">stack</dt>
      <dd className="m-0 text-foreground">{project.stack.join(" · ")}</dd>
    </dl>

    <Link to={`/projetos/${project.slug}`} className={buttonVariants("outline", "md") + " mt-auto self-start"}>
      Ver estudo de caso →
    </Link>
  </article>
);

export default ProjectCard;
