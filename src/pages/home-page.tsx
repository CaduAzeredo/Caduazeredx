import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import PageShell from "@/components/layout/page-shell";
import { buttonVariants } from "@/components/ui/button";
import TerminalWindow from "@/components/terminal/terminal-window";
import TypewriterText from "@/components/terminal/typewriter-text";
import ProjectCard from "@/components/project/project-card";
import { projects } from "@/content/projects";
import {
  ArrowRight,
  Terminal as TerminalIcon,
  Sparkles,
  Code2,
  Layers,
  Cpu,
} from "lucide-react";

export const HomePage: React.FC = () => {
  const [activeLine, setActiveLine] = useState(1);
  const [brandName, setBrandName] = useState(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return prefersReduced ? "Cadu Azeredo" : "Cadu Azeredx /";
  });

  // Atualizar título para SEO
  useEffect(() => {
    document.title = "Cadu Azeredo — Front-end Developer & Product Builder";
  }, []);

  // Animação do nome da marca: Cadu Azeredx / -> Cadu Azeredo
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const timer = setTimeout(() => {
      setBrandName("Cadu Azeredo");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Encontra o DiáriaBr para destacar
  const diariaBrProject = projects.find((p) => p.slug === "diariabr");

  return (
    <PageShell>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-24 md:space-y-36">
        {/* SEÇÃO A: HERO & TERMINAL */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[70vh] pt-4 md:pt-10">
          {/* Apresentação Textual */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center space-x-2 text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Disponível para novos projetos</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-sans select-none">
                <span className="text-glow text-foreground transition-all duration-500">
                  {brandName}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-primary font-mono tracking-tight">
                Front-end Developer & Product Builder
              </p>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed font-sans">
              Crio interfaces e produtos digitais focados na experiência do
              usuário, aliando desenvolvimento front-end moderno (React/TS),
              design de produto e inteligência artificial aplicada.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/projetos" className={buttonVariants("primary", "lg")}>
                <span>Ver projetos</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link to="/contato" className={buttonVariants("outline", "lg")}>
                Entrar em contato
              </Link>
            </div>
          </div>

          {/* Slot de Avatar & Terminal Narrativo */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* Slot de Avatar Abstrato */}
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-surface/50 border border-border/80 w-fit select-none">
              <div className="relative w-12 h-12 rounded bg-gradient-to-br from-primary/20 via-secondary/10 to-accent-blue/30 border border-border flex items-center justify-center overflow-hidden">
                <div
                  className="absolute inset-0 border border-dashed border-primary/30 rounded animate-spin"
                  style={{ animationDuration: "20s" }}
                />
                <span className="font-mono text-[10px] text-muted-foreground/60">
                  Avatar
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="block font-mono text-[10px] text-muted-foreground/60">
                  [sys.avatar_slot]
                </span>
                <span className="block text-xs font-sans text-muted-foreground">
                  Carlos Eduardo Moura
                </span>
              </div>
            </div>

            {/* Terminal Narrativo */}
            <TerminalWindow title="cadu@azeredo: ~">
              <div className="space-y-4 text-xs sm:text-sm">
                {/* Linha 1 */}
                <div className="space-y-1">
                  <p className="text-primary-muted font-bold">
                    ${" "}
                    <TypewriterText
                      text="whoami"
                      speed={30}
                      onComplete={() => setActiveLine(2)}
                      showCursor={activeLine === 1}
                    />
                  </p>
                  {activeLine >= 2 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-muted-foreground pl-3"
                    >
                      Cadu Azeredo (Carlos Eduardo Azeredo Moura)
                    </motion.p>
                  )}
                </div>

                {/* Linha 2 */}
                {activeLine >= 2 && (
                  <div className="space-y-1">
                    <p className="text-primary-muted font-bold">
                      ${" "}
                      <TypewriterText
                        text="stack --current"
                        delay={200}
                        speed={30}
                        onComplete={() => setActiveLine(3)}
                        showCursor={activeLine === 2}
                      />
                    </p>
                    {activeLine >= 3 && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-muted-foreground pl-3"
                      >
                        React • TypeScript • UX/UI • IA aplicada
                      </motion.p>
                    )}
                  </div>
                )}

                {/* Linha 3 */}
                {activeLine >= 3 && (
                  <div className="space-y-1">
                    <p className="text-primary-muted font-bold">
                      ${" "}
                      <TypewriterText
                        text="status"
                        delay={200}
                        speed={30}
                        onComplete={() => setActiveLine(4)}
                        showCursor={activeLine === 3}
                      />
                    </p>
                    {activeLine >= 4 && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-muted-foreground pl-3 border-l-2 border-primary/40"
                      >
                        Construindo produtos digitais a partir de problemas
                        reais_
                      </motion.p>
                    )}
                  </div>
                )}
              </div>
            </TerminalWindow>
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
