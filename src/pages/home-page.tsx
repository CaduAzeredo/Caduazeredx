import React, { useCallback, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import PageShell from "@/components/layout/page-shell";
import { buttonVariants } from "@/components/ui/button";
import TerminalWindow from "@/components/terminal/terminal-window";
import ProjectCard from "@/components/project/project-card";
import HeroBackdrop, { type EstadoCena } from "@/components/hero/hero-backdrop";
import GlifoShizune from "@/components/shizune/glifo";
import BlocoDeComando from "@/components/shizune/bloco-de-comando";
import { Medicao } from "@/components/shizune/marcas";
import { marcarBoot, encerrarBoot } from "@/lib/boot-shell";
import { useSiteMode } from "@/lib/use-site-mode";
import { tiposDeSite } from "@/content/tambem-construi";
import { servicosResumo } from "@/content/servicos-resumo";
import { projects } from "@/content/projects";
import { repositorio } from "@/content/shizune";
import ficha, { comandoDe, estadoDe, medicaoDe } from "@/content/ficha";
import { degrauAtual } from "@/content/degraus";
import {
  Terminal as TerminalIcon,
  ShoppingBag,
  Store,
  Boxes,
  Utensils,
  Link as LinkIcon,
  CalendarCheck,
  ArrowUpRight,
} from "lucide-react";

// O console é interativo e carrega o próprio roteiro de respostas. Nada nele
// precisa existir no primeiro desenho, então ele sai do caminho crítico. O
// espaço reservado tem a altura do painel, para a página não pular quando ele
// chega.
const ConsoleEcossistema = lazy(() => import("@/components/console/console-ecossistema"));

const ICONES_TIPO = {
  "shopping-bag": ShoppingBag,
  store: Store,
  boxes: Boxes,
  utensils: Utensils,
  link: LinkIcon,
  "calendar-check": CalendarCheck,
} as const;

/** O selo "◐ agora: ‹degrau›" dos cartões do Shizune — lido da ficha, nunca digitado. */
const SeloDoDegrau: React.FC = () => {
  const agora = degrauAtual();
  if (!agora) return null;
  return (
    <span className="rounded border border-tinta-deep/60 px-2 py-1 font-mono text-[10.5px] text-tinta">
      ◐ agora: {agora.nome}
    </span>
  );
};

const PASSOS_DO_METODO = [
  {
    rotulo: "1 · rascunho",
    cor: "text-tinta",
    texto:
      "A necessidade real vira contexto escrito antes da primeira linha de código: quem usa, o que restringe, o que é sucesso. A máquina rascunha em cima disso, nunca em cima de suposição.",
  },
  {
    rotulo: "2 · assinatura",
    cor: "text-tinta",
    texto:
      "Cada escolha que importa vira decisão numerada, com responsável. Você vê quem decidiu o quê e quando, inclusive quando quem decidiu fui eu.",
  },
  {
    rotulo: "3 · verificação",
    cor: "text-tinta",
    texto:
      "Um comando confere a entrega contra o que foi decidido e reprova o que cita decisão inexistente. A entrega vem com a prova, não com a promessa.",
  },
] as const;

const TRAJETORIA = [
  {
    rotulo: "WordPress e web base",
    titulo: "Início prático na web",
    texto:
      "Portais e sites institucionais em WordPress: HTML, CSS, layouts adaptáveis e a dinâmica real de colocar sistemas no ar para clientes.",
    atual: false,
  },
  {
    rotulo: "React e TypeScript",
    titulo: "Front-end moderno e componentização",
    texto: "Interfaces dinâmicas e com tipagem robusta, focadas em aplicações de página única.",
    atual: false,
  },
  {
    rotulo: "Produto e IA",
    titulo: "Construção de SaaS e eficiência",
    texto:
      "Projetos próprios, UX/UI para refinar a usabilidade e IA em todas as etapas do ciclo de desenvolvimento.",
    atual: false,
  },
  {
    rotulo: "2026 · Shizune",
    titulo: "O método vira produto",
    texto:
      "O jeito de trabalhar que eu usava por dentro foi publicado como Shizune: registro de decisão com autoridade, aberto sob Apache 2.0, e diagnosticado contra si mesmo antes de ser anunciado.",
    atual: true,
  },
] as const;

const FERRAMENTAS = [
  { name: "React", desc: "Interfaces dinâmicas" },
  { name: "TypeScript", desc: "Tipagem estrita" },
  { name: "Vite", desc: "Bundler" },
  { name: "Bun", desc: "Runtime e scripts" },
  { name: "Tailwind CSS", desc: "Estilização" },
  { name: "Supabase", desc: "Banco e autenticação" },
  { name: "UX/UI Design", desc: "Navegação e fluxos" },
  { name: "Shizune", desc: "Registro de decisão" },
] as const;

/**
 * A home — a tela 15 do design de 15/10.
 *
 * O que mudou da v4 (o texto antigo continua no histórico do git): o console
 * do ecossistema no lugar do painel com personagem; o cartão do Shizune sem o
 * selo de versão e sem o selo de lançamento, com os números lidos da ficha da
 * release; os dois cartões "ocioso" trocados pelo cartão do Shizune; a seção
 * de manifesto saiu (o design não a tem); e os rótulos em caixa alta viraram
 * texto normal.
 *
 * NENHUM número do Shizune se escreve aqui: todos vêm de `content/ficha.ts`,
 * que lê a ficha da release — a mesma do shizune.dev.
 */
export const HomePage: React.FC = () => {
  const [modo] = useSiteMode();
  useEffect(() => {
    // O título da seção 7 do kit de marca, o mesmo do index.html.
    document.title = "Cadu Azeredo — dev em Palmas-TO, software com IA";
  }, []);

  // ── o que a casca de boot está cobrindo ─────────────────────────────────
  // A home é a única página com cena pesada, então é ela quem sabe quando não
  // há mais o que cobrir. As etapas de tipografia e de aplicação são marcadas
  // pela própria casca e pelo App: aqui só entra a cena.
  const aoMudarCena = useCallback((e: EstadoCena) => {
    if (e === "pronta") {
      marcarBoot("cena");
      encerrarBoot();
    } else if (e === "leve") {
      // Sem cena pesada não há espera real. Manter a casca aqui seria
      // exatamente o atraso encenado que ela existe para evitar.
      encerrarBoot();
    }
  }, []);

  const diariaBrProject = projects.find((p) => p.slug === "diariabr");
  const medicaoDoDoctor = medicaoDe("doctor-summary");

  return (
    <PageShell>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-24 md:space-y-36">
        {/* ═══ HERO ═══
            O fundo vive só aqui: espalhado pela página ele some; concentrado no
            topo, é a primeira coisa que se vê e desaparece ao rolar. */}
        <section className="relative -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 pt-4 pb-8">
          <HeroBackdrop onEstado={aoMudarCena} />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-status-live" aria-hidden="true" />
                <span className="font-mono text-[11px] text-muted-foreground">aceitando projetos</span>
              </span>

              {/* O <h1> é o maior texto da tela e o LCP da página: entra
                  inteiro, de primeira. O nome está na logo do cabeçalho; aqui
                  fica a frase, em Newsreader Italic (rodada 3 do design). */}
              <h1 className="titulo-serif max-w-[15ch] text-[40px] leading-[1.04] text-foreground sm:text-[52px] lg:text-[60px]">
                Construo produtos e ponho ordem em bases que cresceram rápido demais.
              </h1>

              <p className="max-w-[52ch] text-base sm:text-lg leading-relaxed text-muted-foreground">
                Aponto a ferramenta para mim antes de apontar para os outros: o que eu entrego, site,
                produto ou consultoria, sai com registro de decisão, assinado e verificável por comando.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link to="/shizune" className={buttonVariants("primary", "lg")}>
                  Ver a ferramenta
                </Link>
                <Link to="/projetos" className={buttonVariants("outline", "lg")}>
                  O que eu construo
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex min-w-0 flex-col gap-3.5">
              {/* A cena do avatar, pelo modo de leitura: o Cadu de dev no modo
                  Dev, o Cadu falando com a empresa no Empresa (kit de marca). */}
              <figure className="relative m-0 overflow-hidden rounded-[14px] border border-border bg-surface">
                <img
                  src={modo === "empresa" ? "/avatar/cadu-azeredo-empresa-480.webp" : "/avatar/cadu-azeredo-dev-480.webp"}
                  alt="Avatar ilustrado de Cadu Azeredo, dev de Palmas-TO, com dreads e camisa preta"
                  width={modo === "empresa" ? 387 : 480}
                  height={modo === "empresa" ? 480 : 270}
                  decoding="async"
                  className="block h-[220px] w-full object-cover object-[center_30%]"
                />
              </figure>
              <Suspense
                fallback={<div className="min-h-[336px] rounded-xl border border-border bg-surface" aria-hidden="true" />}
              >
                <ConsoleEcossistema />
              </Suspense>
            </div>
          </div>
        </section>

        {/* ═══ O QUE EU CONSTRUO ═══ */}
        <section data-reveal className="space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <h2 data-split className="titulo-serif text-[30px] leading-[1.1] text-foreground sm:text-[40px]">
              O que eu construo
            </h2>
            <Link
              to="/projetos"
              className="inline-flex items-center py-1.5 -my-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              ver todos
              <ArrowUpRight className="ml-1 inline h-3 w-3" aria-hidden="true" />
            </Link>
          </div>

          {/* O único elemento que respira na home é o produto. */}
          <div className="sz-glow overflow-hidden rounded-xl bg-surface">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 flex flex-col gap-4 p-7 sm:p-9">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded border border-border px-2 py-1 font-mono text-[10.5px] text-muted-foreground">
                    Apache 2.0
                  </span>
                  <span className="rounded border border-border px-2 py-1 font-mono text-[10.5px] text-muted-foreground">
                    zero dependências
                  </span>
                  <SeloDoDegrau />
                </div>

                <h3 className="titulo-serif flex items-center gap-2.5 text-[26px] leading-none text-foreground sm:text-[30px]">
                  <GlifoShizune tamanho={26} className="text-tinta" />
                  Shizune
                </h3>

                {/* As dores do cliente entram como pergunta, uma vez cada —
                    nunca como acusação. */}
                <p className="max-w-[52ch] text-base leading-relaxed text-foreground">
                  Quem decidiu isso? O que a IA mudou sem ninguém ver? Quem assinou?
                </p>

                <p className="max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
                  Registro de decisão com autoridade: decisão numerada, commit assinado, e um comando
                  que reprova o build quando alguém cita o que não foi decidido. Aberto, e verificável
                  sem instalar nada.
                </p>

                <dl className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-3">
                  {[
                    { valor: String(ficha.asseracoes), rotulo: "asserções no teste negativo" },
                    {
                      valor: `${ficha.doctor.passaram} · ${ficha.doctor.na}`,
                      rotulo: "etapas do doctor: passaram · n/a",
                    },
                    { valor: String(ficha.arquivos), rotulo: "arquivos no pacote" },
                  ].map((n) => (
                    <div key={n.rotulo} className="flex flex-col gap-1 rounded-lg border border-border px-4 py-3">
                      <dd className="m-0 font-mono text-[26px] leading-none text-tinta">{n.valor}</dd>
                      <dt className="text-[12px] leading-snug text-muted-foreground">{n.rotulo}</dt>
                    </div>
                  ))}
                </dl>

                <div className="flex flex-wrap gap-3 pt-3">
                  <Link to="/shizune" className={buttonVariants("primary", "md")}>
                    Conhecer o Shizune
                  </Link>
                  <a
                    href={repositorio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants("outline", "md") + " sz-shine"}
                  >
                    Clonar de graça
                    <ArrowUpRight className="ml-1 inline h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center gap-3 border-t lg:border-t-0 lg:border-l border-border bg-surface-elevated/40 p-6">
                <BlocoDeComando
                  rotulo="terminal · num clone do pacote"
                  linhas={[comandoDe("doctor-summary")]}
                  saida={ficha.doctor.linha}
                  rotuloDaSaida="Linha de fecho do doctor"
                  medicao={
                    <Medicao
                      estado={estadoDe("doctor-summary")}
                      data={medicaoDoDoctor.data}
                      sha={medicaoDoDoctor.shaCurto}
                    />
                  }
                />
                <p className="text-[12.5px] leading-relaxed text-muted-foreground">
                  Até a release anterior, esta linha contava os n/a como aprovados. O defeito estava
                  declarado, e a correção saiu com teste próprio.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TAMBÉM CONSTRUÍ ═══ */}
        <section data-reveal className="space-y-5">
          <h2 data-split className="titulo-serif text-[30px] leading-[1.1] text-foreground sm:text-[40px]">
            Também construí
          </h2>
          <p className="max-w-[66ch] text-sm leading-relaxed text-muted-foreground">
            Trabalho de cliente, quase todo sem autorização para citar nome ou link. O que dá para
            mostrar é a stack e o tipo de problema.
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
                    <Icone className="h-4 w-4 text-primary" aria-hidden="true" />
                    <h3 className="text-sm font-semibold text-foreground">{t.titulo}</h3>
                  </div>
                  <p className="text-[12.5px] leading-relaxed text-muted-foreground">{t.descricao}</p>
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
            <Link to="/contato" className="text-primary underline underline-offset-2">
              Descreve o caso
            </Link>
            : o trabalho é o mesmo, entender antes, escrever o escopo, entregar com o que você precisa
            para tocar sozinho depois.
          </p>
        </section>

        {/* ═══ O QUE EU RESOLVO ═══ */}
        <section data-reveal className="space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <h2 data-split className="titulo-serif text-[30px] leading-[1.1] text-foreground sm:text-[40px]">
              O que eu resolvo
            </h2>
            <Link
              to="/shizune"
              className="inline-flex items-center py-1.5 -my-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              entregue com registro de decisão
              <ArrowUpRight className="ml-1 inline h-3 w-3" aria-hidden="true" />
            </Link>
          </div>

          <div className="anim-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {servicosResumo.map((s, i) => (
              <article
                key={s.slug}
                style={{ "--i": i } as React.CSSProperties}
                className="sz-card flex flex-col gap-2.5 rounded-xl bg-surface p-5"
              >
                <span className={`font-mono text-lg font-bold ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-semibold text-foreground">{s.nome}</h3>
                <p className="text-[12.5px] leading-relaxed text-muted-foreground">{s.resumo}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ═══ EM CONSTRUÇÃO E EM PRODUÇÃO ═══
            Os dois cartões "ocioso" saíram: o lugar deles é do Shizune, que
            aponta para o roadmap, onde cada degrau diz em que pé está. */}
        <section data-reveal className="space-y-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 data-split className="titulo-serif text-[30px] leading-[1.1] text-foreground sm:text-[40px]">
              Em construção e em produção
            </h2>
            <Link
              to="/projetos"
              className="inline-flex items-center py-1.5 -my-1.5 text-xs font-mono text-primary hover:text-primary-muted transition-colors"
            >
              explorar todos os projetos →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {diariaBrProject && <ProjectCard project={diariaBrProject} />}

            <article className="flex h-full flex-col gap-4 rounded-lg border border-tinta-deep/50 bg-surface p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[11px] text-muted-foreground">produto · ferramenta aberta</span>
                <SeloDoDegrau />
              </div>
              <h3 className="titulo-serif text-[26px] leading-tight text-foreground">Shizune</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Registro de decisão sobre o git. O roadmap mostra os seis degraus, cada um com o nome da
                ameaça que fecha.
              </p>
              <Link
                to="/shizune/roadmap"
                className="mt-auto inline-flex min-h-6 items-center self-start text-sm font-medium text-primary underline underline-offset-2"
              >
                ver o roadmap →
              </Link>
            </article>
          </div>
        </section>

        {/* ═══ TRAJETÓRIA ═══ */}
        <section data-reveal className="space-y-12 text-left">
          <div className="space-y-2">
            <h2 data-split className="titulo-serif text-[30px] leading-[1.1] text-foreground sm:text-[40px]">
              Do WordPress aos produtos digitais
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              Uma evolução profissional baseada em aprendizado prático e adaptação tecnológica.
            </p>
          </div>

          <ol className="relative m-0 list-none border-l border-border pl-6 ml-3 space-y-12">
            {TRAJETORIA.map((e) => (
              <li key={e.rotulo} className="relative">
                <span
                  className={`absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-background ${e.atual ? "border-tinta" : "border-border"}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${e.atual ? "bg-tinta" : "bg-muted-foreground/60"}`} />
                </span>
                <div className="space-y-2">
                  <span className="block font-mono text-[11px] text-muted-foreground">{e.rotulo}</span>
                  <h3 className="font-sans text-lg font-bold text-foreground">{e.titulo}</h3>
                  <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">{e.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ═══ FORMA DE TRABALHAR ═══
            O mesmo ciclo da página do produto, dito como serviço. */}
        <section data-reveal className="space-y-12 text-left">
          <div className="space-y-2">
            <h2 data-split className="titulo-serif text-[30px] leading-[1.1] text-foreground sm:text-[40px]">
              Do problema ao produto, com o método que publiquei
            </h2>
            <p className="text-sm text-muted-foreground">O mesmo ciclo do Shizune, aplicado à sua entrega.</p>
          </div>

          <div className="anim-stagger grid grid-cols-1 md:grid-cols-3 gap-8">
            {PASSOS_DO_METODO.map((p, i) => (
              <div
                key={p.rotulo}
                style={{ "--i": i } as React.CSSProperties}
                className="sz-card space-y-3 rounded-lg bg-surface p-6"
              >
                <p className={`font-mono text-[12px] ${p.cor}`}>{p.rotulo}</p>
                <p className="text-sm leading-relaxed text-foreground">{p.texto}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ FERRAMENTAS ═══ */}
        <section data-reveal className="space-y-8 text-left">
          <h2 data-split className="titulo-serif text-[30px] leading-[1.1] text-foreground sm:text-[40px]">
            Ferramentas do meu workspace
          </h2>

          <div className="anim-stagger grid grid-cols-2 sm:grid-cols-4 gap-4 select-none">
            {FERRAMENTAS.map((tech, i) => (
              <div key={tech.name} style={{ "--i": i } as React.CSSProperties} className="sz-card rounded bg-surface/60 p-4">
                <span className="block font-sans text-sm font-bold text-foreground">{tech.name}</span>
                <span className="block font-mono text-[10.5px] text-muted-foreground">{tech.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ CTA FINAL ═══ */}
        <section data-reveal className="w-full">
          <TerminalWindow title="cadu@azeredo: ~">
            <div className="space-y-6 py-4 text-center md:text-left md:px-6">
              <div className="space-y-2">
                <p className="text-primary-muted font-bold font-mono text-sm">
                  $ <span className="text-foreground">next_step --contact</span>
                </p>
                <h2 data-split className="sz-glow-text titulo-serif text-[30px] leading-[1.1] text-foreground sm:text-[40px]">
                  Tem uma ideia para construir?
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-xl font-sans">
                  Ela entra como conversa e sai entregue com registro de decisão: você vê quem decidiu o
                  quê, e um comando prova a entrega.
                </p>
              </div>

              <div className="flex flex-col items-center gap-3 md:flex-row">
                <Link to="/contato" className={buttonVariants("primary", "lg") + " w-fit space-x-2"}>
                  <TerminalIcon className="w-4 h-4" aria-hidden="true" />
                  <span>Iniciar conversa</span>
                </Link>
                <Link to="/shizune" className={buttonVariants("outline", "lg")}>
                  ver como eu entrego
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
