import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PageShell from "@/components/layout/page-shell";
import ProjectCard from "@/components/project/project-card";
import { buttonVariants } from "@/components/ui/button";
import GlifoShizune from "@/components/shizune/glifo";
import { projects } from "@/content/projects";
import { degrauAtual } from "@/content/degraus";

/**
 * A rota `/projetos` — a tela 16.
 *
 * Os produtos que eu construo e mantenho, cada um dizendo em que pé está. Os
 * dois cartões "Aguardando commits futuros" saíram com o design de 15/10. O
 * Shizune entra como projeto e aponta para a página dele, sem página duplicada;
 * o selo "agora" sai da ficha da release.
 */
export const ProjectsPage: React.FC = () => {
  useEffect(() => {
    document.title = "Projetos | Cadu Azeredo — Front-end Developer & Product Builder";
  }, []);

  const diariaBrProject = projects.find((p) => p.slug === "diariabr");
  const agora = degrauAtual();

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-14 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <h1 className="titulo-serif text-[40px] leading-[1.04] text-foreground sm:text-[56px]">Projetos</h1>
          <p className="max-w-[62ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
            Os produtos que eu construo e mantenho. Cada um diz em que pé está, sem card de “em breve”.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {diariaBrProject && <ProjectCard project={diariaBrProject} />}

          <article className="flex h-full flex-col gap-4 rounded-lg border border-tinta-deep/50 bg-surface p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-[11px] text-muted-foreground">produto · ferramenta aberta</span>
              {agora && (
                <span className="rounded-full border border-tinta-deep/60 px-2.5 py-0.5 font-mono text-[11px] text-tinta">
                  ◐ agora: {agora.nome}
                </span>
              )}
            </div>
            <h2 className="titulo-serif flex items-center gap-2.5 text-[26px] leading-tight text-foreground">
              <GlifoShizune tamanho={26} className="text-tinta" />
              Shizune
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Registro de decisão sobre o git. A máquina rascunha, você assina, o comando verifica. Aberto
              sob Apache 2.0, sem dependências.
            </p>
            <dl className="m-0 grid grid-cols-[72px_minmax(0,1fr)] gap-x-4 gap-y-1.5 text-[13px]">
              <dt className="font-mono text-[11px] leading-5 text-muted-foreground">papel</dt>
              <dd className="m-0 text-foreground">Autor e mantenedor</dd>
              <dt className="font-mono text-[11px] leading-5 text-muted-foreground">onde</dt>
              <dd className="m-0 text-foreground">
                <a href="https://shizune.dev" hrefLang="en" className="text-primary underline underline-offset-2">
                  shizune.dev
                </a>
                , em inglês ·{" "}
                <Link to="/shizune" className="text-primary underline underline-offset-2">
                  aqui
                </Link>
                , em português
              </dd>
            </dl>
            <Link to="/shizune" className={buttonVariants("outline", "md") + " mt-auto self-start"}>
              Conhecer o Shizune →
            </Link>
          </article>
        </div>
      </div>
    </PageShell>
  );
};

export default ProjectsPage;
