import React, { useCallback, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import PageShell from "@/components/layout/page-shell";
import { buttonVariants } from "@/components/ui/button";
import TerminalWindow from "@/components/terminal/terminal-window";
import TypewriterText from "@/components/terminal/typewriter-text";
import ProjectCard from "@/components/project/project-card";
import HeroBackdrop, { type EstadoCena } from "@/components/hero/hero-backdrop";
import { marcarBoot, encerrarBoot } from "@/lib/boot-shell";
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
  ArrowUpRight,
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
  // Atualizar título para SEO
  useEffect(() => {
    document.title = "Cadu Azeredo — Front-end Developer & Product Builder";
  }, []);

  // ── o que a casca de boot esta cobrindo ─────────────────────────────────
  // A home e a unica pagina com cena pesada, entao e ela quem sabe quando nao
  // ha mais o que cobrir. As etapas de tipografia e de aplicacao sao marcadas
  // pela propria casca e pelo App: aqui so entra a cena.
  const aoMudarCena = useCallback((e: EstadoCena) => {
    if (e === "pronta") {
      marcarBoot("cena");
      encerrarBoot();
    } else if (e === "leve") {
      // Sem cena pesada nao ha espera real. Manter a casca aqui seria
      // exatamente o atraso encenado que ela existe para evitar.
      encerrarBoot();
    }
  }, []);

  // Encontra o DiáriaBr para destacar
  const diariaBrProject = projects.find((p) => p.slug === "diariabr");

  return (
    <PageShell>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-24 md:space-y-36">
        {/* ═══ HERO ═══
            O elemento-assinatura da v3, e o unico lugar onde gastamos ousadia.
            O fundo vive so aqui: espalhado pela pagina ele some; concentrado no
            topo, e a primeira coisa que se ve e desaparece ao rolar.

            Quem passa pelo portao de capacidade recebe o campo de particulas em
            WebGL; todo o resto recebe a chuva em CSS, que continua completa
            sozinha. */}
        <section className="relative -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 pt-4 pb-8">
          <HeroBackdrop onEstado={aoMudarCena} />

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

              {/* A unica coisa que se digita e a linha de prompt. O <h1> e o
                  maior texto da tela — ele e o LCP da pagina, e atrasa-lo por
                  efeito seria trocar metrica real por sensacao. Ele entra
                  inteiro, de primeira. */}
              <div className="font-mono text-[13px] text-primary-muted">
                <span className="text-primary">&gt;</span>{" "}
                <TypewriterText text="whoami" speed={70} showCursor />
              </div>

              <h1 className="font-sans text-[42px] sm:text-[56px] lg:text-[64px] font-extrabold leading-[1.03] tracking-[-0.045em] text-foreground">
                Cadu Azeredo
                <span className="font-light text-primary">&nbsp;/</span>
              </h1>

              <p className="max-w-[46ch] text-base sm:text-lg leading-relaxed text-muted-foreground">
                Construo produtos e ponho ordem em bases que cresceram rápido
                demais. Aponto a ferramenta para mim antes de apontar para os
                outros: o que eu entrego — site, produto, consultoria — sai com
                registro de decisão, assinado e verificável por comando.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link to="/shizune" className={buttonVariants("primary", "lg")}>
                  Ver a ferramenta
                </Link>
                <Link
                  to="/projetos"
                  className={buttonVariants("outline", "lg")}
                >
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
        <section data-reveal className="space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <h2
              data-split
              className="font-sans text-2xl sm:text-3xl font-bold tracking-tight"
            >
              O que eu construo
            </h2>
            <Link
              to="/projetos"
              className="inline-flex items-center py-1.5 -my-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              ver todos
              <ArrowUpRight
                className="ml-1 inline h-3 w-3"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* O Shizune, elevado: e o unico com prova publica verificavel hoje.
              (Era o card do Brain Framework — o rebrand publico e a v0.3.1
              aposentaram o nome e os numeros antigos. Fonte dos numeros: a
              biblia §3, medida em 2026-09-03.) */}
          {/* O unico elemento que respira na Home e o produto. */}
          <div className="sz-glow overflow-hidden rounded-xl bg-surface">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 flex flex-col gap-4 p-7 sm:p-9">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-border-accent bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-primary">
                    no ar · v0.3.1
                  </span>
                  <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-status-wait">
                    lançamento · 2026-09-15
                  </span>
                  <span className="rounded border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground">
                    Apache 2.0
                  </span>
                  <span className="rounded border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground">
                    zero dependências
                  </span>
                </div>

                <h3 className="font-sans text-xl sm:text-2xl font-bold tracking-tight">
                  Shizune
                </h3>

                {/* As dores do cliente entram como pergunta, uma vez cada —
                    nunca como acusacao. */}
                <p className="max-w-[52ch] text-sm leading-relaxed text-foreground">
                  Quem decidiu isso? O que a IA mudou sem ninguém ver? Quem
                  assinou?
                </p>

                <p className="max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
                  Registro de decisão com autoridade: decisão numerada, commit
                  assinado, e um comando que reprova o build quando alguém cita
                  o que não foi decidido. Aberto, e verificável sem instalar
                  nada.
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 font-mono text-[11px] text-muted-foreground">
                  <span>16 decisões assinadas</span>
                  <span aria-hidden="true">·</span>
                  <span>9 verificadores</span>
                  <span aria-hidden="true">·</span>
                  <span>1 achado aberto — publicado</span>
                </div>

                <div className="flex flex-wrap gap-3 pt-3">
                  <Link
                    to="/shizune"
                    className={buttonVariants("primary", "md")}
                  >
                    Conhecer o Shizune
                  </Link>
                  {repoBrain?.url && (
                    <a
                      href={repoBrain.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants("outline", "md") + " sz-shine"}
                    >
                      Clonar de graça
                      <ArrowUpRight
                        className="ml-1 inline h-3 w-3"
                        aria-hidden="true"
                      />
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
        <section data-reveal className="space-y-5">
          <h2
            data-split
            className="font-sans text-2xl sm:text-3xl font-bold tracking-tight"
          >
            Também construí
          </h2>
          <p className="max-w-[66ch] text-sm leading-relaxed text-muted-foreground">
            Trabalho de cliente, quase todo sem autorização para citar nome ou
            link. O que dá para mostrar é a stack e o tipo de problema — se o
            seu site é parecido com algum destes, já foi feito antes.
          </p>

          <div className="anim-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tiposDeSite.map((t, i) => {
              const Icone = ICONES_TIPO[t.icone];
              return (
                <article
                  key={t.slug}
                  style={{ "--i": i } as React.CSSProperties}
                  className="sz-card flex flex-col gap-3 rounded-xl bg-surface p-5"
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
        <section data-reveal className="space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <h2
              data-split
              className="font-sans text-2xl sm:text-3xl font-bold tracking-tight"
            >
              O que eu resolvo
            </h2>
            <Link
              to="/shizune"
              className="inline-flex items-center py-1.5 -my-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              entregue com registro de decisão
              <ArrowUpRight
                className="ml-1 inline h-3 w-3"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="anim-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {servicosResumo.map((s, i) => (
              <article
                key={s.slug}
                style={{ "--i": i } as React.CSSProperties}
                className="sz-card flex flex-col gap-2.5 rounded-xl bg-surface p-5"
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
        <section data-reveal className="text-left max-w-3xl space-y-6">
          <h2
            data-split
            className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans"
          >
            Construo interfaces para ideias que precisam sair do papel.
          </h2>
          {/* A versao anterior dizia "IA como catalisadora de produtividade" —
              o discurso generico que a postura nova aposentou. O manifesto
              agora e a frase-mae: a ferramenta apontada para mim primeiro. */}
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed font-sans">
            Um código excelente perde valor se a interface for confusa, e um
            design incrível falha sem engenharia por trás. Trabalho nessa
            interseção — e aponto a ferramenta para mim antes de apontar para os
            outros: o que sai daqui sai com registro de decisão. Quem decidiu,
            assinado, verificável por comando.
          </p>
        </section>

        {/* SEÇÃO C: TRABALHO EM DESTAQUE */}
        <section data-reveal className="space-y-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2
                data-split
                className="text-2xl sm:text-3xl font-bold font-sans"
              >
                Em construção e em produção
              </h2>
              <p className="text-sm text-muted-foreground">
                Destaque para o projeto autoral em desenvolvimento ativo e
                próximos passos do laboratório.
              </p>
            </div>
            <Link
              to="/projetos"
              className="inline-flex items-center space-x-2 py-1.5 -my-1.5 text-xs font-mono text-primary hover:text-primary-muted transition-colors"
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
        <section data-reveal className="space-y-12 text-left">
          <div className="space-y-2">
            <h2 data-split className="text-2xl sm:text-3xl font-bold font-sans">
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

            {/* Etapa atual — a linha do tempo termina no produto. */}
            <div className="relative">
              <span className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <div className="space-y-2">
                <span className="inline-block rounded border border-border-accent bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-primary">
                  2026 · Shizune
                </span>
                <h3 className="font-sans text-lg font-bold text-foreground">
                  O método vira produto
                </h3>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  O jeito de trabalhar que eu usava por dentro foi publicado
                  como Shizune: registro de decisão com autoridade, aberto sob
                  Apache 2.0 — e diagnosticado contra si mesmo antes de ser
                  anunciado, com o achado que restou publicado junto.
                </p>
                <Link
                  to="/shizune"
                  className="inline-flex items-center gap-1.5 py-1.5 -my-1.5 font-mono text-xs text-primary hover:text-primary-muted"
                >
                  ver o produto
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO E: FORMA DE TRABALHAR */}
        <section data-reveal className="space-y-12 text-left">
          {/* Os tres passos genericos ("entender, desenhar, iterar") viraram o
              metodo real — a mesma triade da pagina do produto, dita como
              servico. E o que "organizar a pagina em cima do Shizune" quer
              dizer: a forma de trabalhar E o produto. */}
          <div className="space-y-2">
            <h2 data-split className="text-2xl sm:text-3xl font-bold font-sans">
              Do problema ao produto — com o método que publiquei
            </h2>
            <p className="text-sm text-muted-foreground">
              O mesmo ciclo do Shizune, aplicado à sua entrega: rascunho,
              assinatura, verificação.
            </p>
          </div>

          <div className="anim-stagger grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Passo 1 */}
            <div
              style={{ "--i": 0 } as React.CSSProperties}
              className="sz-card space-y-4 rounded-lg bg-surface p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded border border-primary/20 bg-primary/10 text-primary">
                <Code2 className="h-5 w-5" />
              </div>
              <h3 className="font-sans text-lg font-bold text-foreground">
                1. Rascunho
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                A necessidade real vira contexto escrito antes da primeira linha
                de código: quem usa, o que restringe, o que é sucesso. A máquina
                rascunha em cima disso — nunca em cima de suposição.
              </p>
            </div>

            {/* Passo 2 */}
            <div
              style={{ "--i": 1 } as React.CSSProperties}
              className="sz-card space-y-4 rounded-lg bg-surface p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded border border-secondary/20 bg-secondary/10 text-secondary">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="font-sans text-lg font-bold text-foreground">
                2. Assinatura
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Cada escolha que importa vira decisão numerada, com responsável.
                Você vê quem decidiu o quê e quando — inclusive quando quem
                decidiu fui eu, e principalmente quando foi você.
              </p>
            </div>

            {/* Passo 3 */}
            <div
              style={{ "--i": 2 } as React.CSSProperties}
              className="sz-card space-y-4 rounded-lg bg-surface p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded border border-accent-blue/20 bg-accent-blue/10 text-foreground">
                <Cpu
                  className="h-5 w-5"
                  style={{ color: "var(--accent-blue)" }}
                />
              </div>
              <h3 className="font-sans text-lg font-bold text-foreground">
                3. Verificação
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Um comando confere a entrega contra o que foi decidido e reprova
                o que cita decisão inexistente. A entrega vem com a prova, não
                com a promessa.
              </p>
            </div>
          </div>
        </section>

        {/* SEÇÃO F: STACK ATUAL */}
        <section data-reveal className="space-y-8 text-left">
          <div className="space-y-2">
            <h2 data-split className="text-2xl sm:text-3xl font-bold font-sans">
              Ferramentas do meu workspace
            </h2>
            <p className="text-sm text-muted-foreground">
              Tecnologias que utilizo diariamente para construir e testar
              interfaces e fluxos de dados.
            </p>
          </div>

          <div className="anim-stagger grid grid-cols-2 sm:grid-cols-4 gap-4 select-none">
            {[
              { name: "React", desc: "Interfaces dinâmicas" },
              { name: "TypeScript", desc: "Tipagem estrita" },
              { name: "Vite", desc: "Bundler ultrarrápido" },
              { name: "Bun", desc: "Runtime e scripts" },
              { name: "Tailwind CSS v4", desc: "Estilização moderna" },
              { name: "Supabase", desc: "BaaS & Autenticação" },
              { name: "UX/UI Design", desc: "Navegação e fluxos" },
              // "IA Aplicada — eficiência de código" era o discurso que a
              // postura aposentou; o lugar dela na bancada é o Shizune.
              { name: "Shizune", desc: "Registro de decisão" },
            ].map((tech, i) => (
              <div
                key={tech.name}
                style={{ "--i": i } as React.CSSProperties}
                className="sz-card rounded bg-surface/60 p-4"
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
        <section data-reveal className="w-full">
          <TerminalWindow title="cadu@azeredo: ~">
            <div className="space-y-6 py-4 text-center md:text-left md:px-6">
              <div className="space-y-2">
                <p className="text-primary-muted font-bold font-mono text-sm">
                  $ <span className="text-foreground">next_step --contact</span>
                </p>
                <h2
                  data-split
                  className="sz-glow-text text-2xl sm:text-3xl font-bold font-sans text-foreground"
                >
                  Tem uma ideia para construir?
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-xl font-sans">
                  Ela entra como conversa e sai entregue com registro de
                  decisão: você vê quem decidiu o quê, e um comando prova a
                  entrega. Produto digital, front-end moderno, ou ordem numa
                  base que cresceu rápido demais.
                </p>
              </div>

              <div className="flex flex-col items-center gap-3 md:flex-row md:items-baseline">
                <Link
                  to="/contato"
                  className={
                    buttonVariants("primary", "lg") + " w-fit space-x-2"
                  }
                >
                  <TerminalIcon className="w-4 h-4" />
                  <span>Iniciar conversa</span>
                </Link>
                <Link
                  to="/shizune"
                  className="inline-flex items-center py-1.5 -my-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
                >
                  ver como eu entrego →
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
