import React, { useState, useEffect, lazy, Suspense } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Link } from "react-router-dom";
import PageShell from "@/components/layout/page-shell";
import { buttonVariants } from "@/components/ui/button";
import TerminalWindow from "@/components/terminal/terminal-window";
import ProjectCard from "@/components/project/project-card";
import CodeRain from "@/components/background/code-rain";
import { tiposDeSite } from "@/content/tambem-construi";

// A Rei é interativa e carrega o próprio roteiro de respostas. Nada nela
// precisa existir no primeiro desenho, então ela sai do caminho crítico. O
// espaço reservado tem a altura do painel, para a página não pular quando
// ele chega.
const ReiChat = lazy(() => import("@/components/rei/rei-chat"));
import { servicosResumo } from "@/content/servicos-resumo";
import { contactLinks } from "@/content/contacts";
import { projects } from "@/content/projects";
import {
  ArrowRight,
  Terminal as TerminalIcon,
  Code2,
  Layers,
  Cpu,
  ShoppingBag,
  Store,
  Boxes,
  Utensils,
  Link as LinkIcon,
  CalendarCheck,
} from "lucide-react";

const ICONES_TIPO = {
  "shopping-bag": ShoppingBag,
  store: Store,
  boxes: Boxes,
  utensils: Utensils,
  link: LinkIcon,
  "calendar-check": CalendarCheck,
} as const;

export const HomePage: React.FC = () => {
  const repoBrain = contactLinks.publicRepos?.find(
    (r) => r.status === "public" && r.url,
  );
  const semMovimento = useReducedMotion();
  const [brandName, setBrandName] = useState(() =>
    semMovimento ? "Cadu Azeredo" : "Cadu Azeredx /",
  );

  // Atualizar título para SEO
  useEffect(() => {
    document.title = "Cadu Azeredo — Front-end Developer & Product Builder";
  }, []);

  // Animação do nome da marca: Cadu Azeredx / -> Cadu Azeredo
  useEffect(() => {
    if (semMovimento) return;

    const timer = setTimeout(() => {
      setBrandName("Cadu Azeredo");
    }, 2000);

    return () => clearTimeout(timer);
  }, [semMovimento]);

  // Encontra o DiáriaBr para destacar
  const diariaBrProject = projects.find((p) => p.slug === "diariabr");

  return (
    <PageShell>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-24 md:space-y-36">
        {/* ═══ HERO ═══
            A chuva vive só aqui. Espalhada pela página ela some; concentrada
            no topo, é a primeira coisa que se vê e desaparece ao rolar. */}
        <section className="relative -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 pt-4 pb-8">
          <CodeRain />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-status-live"
                  aria-hidden="true"
                />
                <span className="font-mono text-[11px] text-muted-foreground">
                  aceitando projetos
                </span>
              </span>

              <h1 className="font-sans text-[42px] sm:text-[56px] lg:text-[64px] font-extrabold leading-[1.03] tracking-[-0.045em] text-foreground">
                {brandName === "Cadu Azeredo" ? (
                  <>
                    Cadu Azeredo
                    <span className="font-light text-primary">&nbsp;/</span>
                  </>
                ) : (
                  <span className="glow-text">{brandName}</span>
                )}
              </h1>

              <p className="max-w-[44ch] text-base sm:text-lg leading-relaxed text-muted-foreground">
                Construo produtos e ponho ordem em bases que cresceram rápido
                demais. Publico o método que uso — aberto, sem dependências,
                verificável por quem não acredita.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link to="/produtos" className={buttonVariants("primary", "lg")}>
                  Ver a consultoria
                </Link>
                <Link to="/projetos" className={buttonVariants("outline", "lg")}>
                  O que eu construo
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Suspense
                fallback={
                  <div
                    className="min-h-[336px] rounded-xl border border-border bg-surface"
                    aria-hidden="true"
                  />
                }
              >
                <ReiChat />
              </Suspense>
            </div>
          </div>
        </section>

        {/* ═══ O QUE EU CONSTRUO ═══ */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight">
              O que eu construo
            </h2>
            <Link
              to="/projetos"
              className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              ver todos ↗
            </Link>
          </div>

          {/* O Brain, elevado: e o unico com prova publica verificavel hoje. */}
          <div className="overflow-hidden rounded-xl border border-border-accent bg-surface">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 flex flex-col gap-4 p-7 sm:p-9">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-border-accent bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-primary">
                    no ar · v0.2.1
                  </span>
                  <span className="rounded border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground">
                    Apache 2.0
                  </span>
                  <span className="rounded border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground">
                    zero dependências
                  </span>
                </div>

                <h3 className="font-sans text-xl sm:text-2xl font-bold tracking-tight">
                  Brain Framework
                </h3>

                <p className="max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
                  Governança para agentes de IA: contexto confiável, decisões
                  registradas e validadores que reprovam a própria estrutura
                  quando ela está errada. Aberto, e verificável sem instalar
                  nada.
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 font-mono text-[11px] text-muted-foreground">
                  <span>60 arquivos</span>
                  <span aria-hidden="true">·</span>
                  <span>5 verificadores verdes</span>
                  <span aria-hidden="true">·</span>
                  <span>1 commit público</span>
                </div>

                <div className="flex flex-wrap gap-3 pt-3">
                  <Link to="/produtos/brain" className={buttonVariants("primary", "md")}>
                    Aplicar no meu projeto
                  </Link>
                  {repoBrain?.url && (
                    <a
                      href={repoBrain.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants("outline", "md")}
                    >
                      Clonar de graça ↗
                    </a>
                  )}
                </div>
              </div>

              <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-border bg-surface-elevated/40 p-6 flex items-center">
                <TerminalWindow title="doctor" className="w-full">
                  <div className="space-y-1.5 font-mono text-[11px] leading-relaxed">
                    {[
                      "estrutura",
                      "links",
                      "refs em prosa",
                      "estado da governança",
                      "export (dry-run)",
                    ].map((v) => (
                      <p key={v} className="text-muted-foreground">
                        <span className="text-primary">OK</span>
                        {"   "}
                        {v}
                      </p>
                    ))}
                    <p className="pt-2 text-foreground">
                      os 5 verificadores passaram
                    </p>
                  </div>
                </TerminalWindow>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TAMBÉM CONSTRUÍ ═══ */}
        <section className="space-y-5">
          <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight">
            Também construí
          </h2>
          <p className="max-w-[66ch] text-sm leading-relaxed text-muted-foreground">
            Trabalho de cliente, quase todo sem autorização para citar nome ou
            link. O que dá para mostrar é a stack e o tipo de problema — se o
            seu site é parecido com algum destes, já foi feito antes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tiposDeSite.map((t) => {
              const Icone = ICONES_TIPO[t.icone];
              return (
                <article
                  key={t.slug}
                  className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5"
                >
                  <div className="flex items-center gap-2.5">
                    <Icone
                      className="h-4 w-4 text-primary"
                      aria-hidden="true"
                    />
                    <h3 className="text-sm font-semibold text-foreground">
                      {t.titulo}
                    </h3>
                  </div>
                  <p className="text-[12.5px] leading-relaxed text-muted-foreground">
                    {t.descricao}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                    {t.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          <p className="pt-1 font-mono text-[11.5px] leading-relaxed text-muted-foreground">
            Não achou o seu tipo aqui?{" "}
            <Link to="/contato" className="text-primary hover:underline">
              Descreve o caso
            </Link>{" "}
            — o trabalho é o mesmo: entender antes, escrever o escopo, entregar
            com o que você precisa para tocar sozinho depois.
          </p>
        </section>

        {/* ═══ O QUE EU RESOLVO ═══ */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight">
              O que eu resolvo
            </h2>
            <Link
              to="/produtos"
              className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              escopo e fluxo ↗
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {servicosResumo.map((s, i) => (
              <article
                key={s.slug}
                className="flex flex-col gap-2.5 rounded-xl border border-border bg-surface p-5"
              >
                <span
                  className={`font-mono text-lg font-bold ${i === 0 ? "text-primary" : "text-muted-foreground"}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-semibold text-foreground">
                  {s.nome}
                </h3>
                <p className="text-[12.5px] leading-relaxed text-muted-foreground">
                  {s.resumo}
                </p>
              </article>
            ))}
          </div>
        </section>


        {/* SEÇÃO B: MANIFESTO */}
        <section className="text-left max-w-3xl space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
            Construo interfaces para ideias que precisam sair do papel.
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed font-sans">
            Acredito que um excelente código perde o valor se a interface for
            confusa, assim como um design incrível falha sem uma engenharia
            robusta. Como desenvolvedor front-end e builder de produtos, atuo na
            intersecção entre código limpo, usabilidade (UX/UI) e pragmatismo
            comercial, usando Inteligência Artificial como catalisadora de
            produtividade para entregar soluções de alta qualidade.
          </p>
        </section>

        {/* SEÇÃO C: TRABALHO EM DESTAQUE */}
        <section className="space-y-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold font-sans">
                Em construção e em produção
              </h2>
              <p className="text-sm text-muted-foreground">
                Destaque para o projeto autoral em desenvolvimento ativo e
                próximos passos do laboratório.
              </p>
            </div>
            <Link
              to="/projetos"
              className="inline-flex items-center space-x-2 text-xs font-mono text-primary hover:text-primary-muted transition-colors"
            >
              <span>Explorar todos os projetos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* DiáriaBr - Protagonista Absoluto */}
            <div className="md:col-span-2">
              {diariaBrProject ? (
                <ProjectCard project={diariaBrProject} />
              ) : (
                <div className="p-6 rounded-lg bg-surface border border-border text-center font-mono text-sm text-muted-foreground">
                  Carregando projeto principal...
                </div>
              )}
            </div>

            {/* Placeholders Discretos de Roadmap (Não competem com o DiáriaBr) */}
            <div className="flex flex-col gap-6">
              <ProjectCard
                isPlaceholder
                placeholderTitle="Laboratório de Interfaces"
                placeholderDescription="Protótipos rápidos de componentes e experimentos visuais."
              />
              <ProjectCard
                isPlaceholder
                placeholderTitle="Automações com IA"
                placeholderDescription="Scripts e agentes locais para otimização de workflow de código."
              />
            </div>
          </div>
        </section>

        {/* SEÇÃO D: TRAJETÓRIA */}
        <section className="space-y-12 text-left">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-sans">
              Do WordPress aos produtos digitais
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              Uma evolução profissional honesta baseada em aprendizado prático e
              adaptação tecnológica.
            </p>
          </div>

          <div className="relative border-l border-border pl-6 ml-3 space-y-12">
            {/* Etapa 1 */}
            <div className="relative">
              <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-background border-2 border-border flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60" />
              </span>
              <div className="space-y-2">
                <span className="inline-block px-2 py-0.5 rounded bg-surface border border-border text-[10px] font-mono text-muted-foreground font-semibold">
                  WordPress & Web Base
                </span>
                <h3 className="font-sans text-lg font-bold text-foreground">
                  Início Prático na Web
                </h3>
                <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                  Iniciei minha jornada criando portais e sites institucionais
                  utilizando WordPress. Essa fase foi essencial para compreender
                  conceitos de HTML, CSS, layouts adaptáveis e a dinâmica real
                  de colocar sistemas no ar para clientes.
                </p>
              </div>
            </div>

            {/* Etapa 2 */}
            <div className="relative">
              <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              </span>
              <div className="space-y-2">
                <span className="inline-block px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-[10px] font-mono text-primary font-semibold">
                  React & TypeScript
                </span>
                <h3 className="font-sans text-lg font-bold text-foreground">
                  Front-end Moderno e Componentização
                </h3>
                <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                  Evoluí para o ecossistema Javascript moderno. Adotei React e
                  TypeScript como principais ferramentas de trabalho,
                  desenvolvendo interfaces mais dinâmicas, escaláveis e com
                  tipagem robusta, focadas em aplicações de página única (SPA)
                  de alta performance.
                </p>
              </div>
            </div>

            {/* Etapa 3 */}
            <div className="relative">
              <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-background border-2 border-secondary flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              </span>
              <div className="space-y-2">
                <span className="inline-block px-2 py-0.5 rounded bg-secondary/15 border border-secondary/20 text-[10px] font-mono text-secondary font-semibold">
                  Produto & IA
                </span>
                <h3 className="font-sans text-lg font-bold text-foreground">
                  Construção de SaaS e Eficiência
                </h3>
                <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                  Hoje, alio minha formação técnica com foco comercial. Construo
                  projetos próprios, utilizo práticas de UX/UI para refinar a
                  usabilidade e integro IA em todas as etapas do ciclo de
                  desenvolvimento para acelerar entregas e criar aplicações
                  inteligentes baseadas em problemas práticos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO E: FORMA DE TRABALHAR */}
        <section className="space-y-12 text-left">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-sans">
              Do problema ao produto
            </h2>
            <p className="text-sm text-muted-foreground">
              Minha abordagem pragmática para projetar e codificar soluções
              funcionais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Passo 1 */}
            <div className="p-6 rounded-lg bg-surface border border-border space-y-4">
              <div className="w-10 h-10 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-sans text-lg font-bold text-foreground">
                1. Entender o Problema
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Antes de escrever a primeira linha de código, investigo a
                necessidade real. Entendo quem é o usuário, quais as restrições
                técnicas e como o produto agregará valor prático.
              </p>
            </div>

            {/* Passo 2 */}
            <div className="p-6 rounded-lg bg-surface border border-border space-y-4">
              <div className="w-10 h-10 rounded bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-sans text-lg font-bold text-foreground">
                2. Desenhar a Experiência
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Esboço a arquitetura de informação e a usabilidade. Crio layouts
                limpos, tipografia consistente e fluxos que guiam o usuário sem
                gerar fricção cognitiva.
              </p>
            </div>

            {/* Passo 3 */}
            <div className="p-6 rounded-lg bg-surface border border-border space-y-4">
              <div className="w-10 h-10 rounded bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-foreground">
                <Cpu
                  className="w-5 h-5"
                  style={{ color: "var(--accent-blue)" }}
                />
              </div>
              <h3 className="font-sans text-lg font-bold text-foreground">
                3. Construir e Iterar
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Implemento com TypeScript estrito, React e Tailwind CSS. Coloco
                no ar rapidamente e uso feedback real ou logs de monitoramento
                para refinar o código e a usabilidade continuamente.
              </p>
            </div>
          </div>
        </section>

        {/* SEÇÃO F: STACK ATUAL */}
        <section className="space-y-8 text-left">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-sans">
              Ferramentas do meu workspace
            </h2>
            <p className="text-sm text-muted-foreground">
              Tecnologias que utilizo diariamente para construir e testar
              interfaces e fluxos de dados.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 select-none">
            {[
              { name: "React", desc: "Interfaces dinâmicas" },
              { name: "TypeScript", desc: "Tipagem estrita" },
              { name: "Vite", desc: "Bundler ultrarrápido" },
              { name: "Bun", desc: "Runtime e scripts" },
              { name: "Tailwind CSS v4", desc: "Estilização moderna" },
              { name: "Supabase", desc: "BaaS & Autenticação" },
              { name: "UX/UI Design", desc: "Navegação e fluxos" },
              { name: "IA Aplicada", desc: "Eficiência de código" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="p-4 rounded bg-surface/60 border border-border hover:border-primary/30 transition-colors"
              >
                <span className="block font-sans text-sm font-bold text-foreground">
                  {tech.name}
                </span>
                <span className="block font-mono text-[10px] text-muted-foreground">
                  {tech.desc}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SEÇÃO G: CTA FINAL */}
        <section className="w-full">
          <TerminalWindow title="cadu@azeredo: ~">
            <div className="space-y-6 py-4 text-center md:text-left md:px-6">
              <div className="space-y-2">
                <p className="text-primary-muted font-bold font-mono text-sm">
                  $ <span className="text-foreground">next_step --contact</span>
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold font-sans text-foreground">
                  Tem uma ideia para construir?
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-xl font-sans">
                  Se você tem uma ideia de produto digital, precisa de um
                  front-end moderno ou quer trocar ideias sobre tecnologia,
                  vamos conversar.
                </p>
              </div>

              <div>
                <Link
                  to="/contato"
                  className={
                    buttonVariants("primary", "lg") +
                    " mx-auto md:mx-0 w-fit space-x-2"
                  }
                >
                  <TerminalIcon className="w-4 h-4" />
                  <span>Iniciar conversa</span>
                </Link>
              </div>
            </div>
          </TerminalWindow>
        </section>
      </div>
    </PageShell>
  );
};

export default HomePage;
