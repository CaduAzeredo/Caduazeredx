import React, { useEffect } from "react";
import PageShell from "@/components/layout/page-shell";
import TerminalWindow from "@/components/terminal/terminal-window";
import useSeo from "@/lib/use-seo";
import {
  contraNosMesmos,
  discussoes,
  fatos,
  fronteira,
  limiteDoDiagnostico,
  medidoEm,
  placarDoDiagnostico,
  recortes,
  repositorio,
  shaDiagnostico,
  shaPublicado,
  totalDoPlacar,
  versaoPublicada,
} from "@/content/shizune";

const FONTE_SERIFADA =
  "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,400&display=swap";

/**
 * JSON-LD com campos verificáveis, e só eles. Versão e licença vêm do
 * repositório público; nada aqui afirma o que um comando não reproduz.
 * Vive fora do componente para o `useSeo` não re-rodar a cada render.
 */
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Shizune",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Bun ou Node 20+",
  softwareVersion: "v0.3.1",
  license: "https://www.apache.org/licenses/LICENSE-2.0",
  codeRepository: "https://github.com/CaduAzeredo/shizune",
  author: { "@type": "Person", name: "Cadu Azeredo" },
  description:
    "Registro de decisão com autoridade para agentes de IA: decisão numerada, assinada e exigida pelo CI antes de o build passar.",
};

/**
 * O símbolo: muitos estados colapsando num só.
 *
 * Quatro ondas em fases diferentes — a decisão em superposição — achatam numa
 * linha reta, e só então os dois nós acendem. É a tese do produto em
 * movimento, não ornamento: se a animação não rodar, o estado final é a linha
 * desenhada, que é a leitura correta.
 */
const SimboloDoColapso: React.FC = () => (
  <svg
    viewBox="0 0 360 260"
    fill="none"
    role="img"
    aria-label="O símbolo do Shizune: uma onda em superposição colapsando numa linha reta — a decisão sendo assinada"
    className="w-full max-w-[360px] h-auto"
  >
    <g className="sz-wave">
      <path
        d="M20 130c26 0 26-84 52-84s26 168 52 168 26-84 52-84 26 168 52 168 26-84 52-84 26 42 60 42"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="text-accent-amber opacity-90"
      />
      <path
        d="M20 130c26 0 26-62 52-62s26 124 52 124 26-62 52-62 26 124 52 124 26-62 52-62 26 31 60 31"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="text-muted-foreground opacity-70"
      />
      <path
        d="M20 130c26 0 26-104 52-104s26 208 52 208 26-104 52-104 26 208 52 208 26-104 52-104 26 52 60 52"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        className="text-muted-foreground opacity-40"
      />
      <path
        d="M20 130c26 0 26-42 52-42s26 84 52 84 26-42 52-42 26 84 52 84 26-42 52-42 26 21 60 21"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        className="text-muted-foreground opacity-25"
      />
    </g>
    <g className="sz-line">
      <path
        d="M20 130h320"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-foreground"
      />
    </g>
    <g className="sz-node text-accent-amber">
      <circle cx="20" cy="130" r="3" fill="currentColor" />
      <circle cx="340" cy="130" r="3" fill="currentColor" />
    </g>
  </svg>
);

const Kicker: React.FC<{ children: React.ReactNode; acento?: boolean }> = ({
  children,
  acento,
}) => (
  <p
    className={`font-mono text-[11px] tracking-[0.15em] uppercase ${
      acento ? "text-accent-amber" : "text-muted-foreground"
    }`}
  >
    {children}
  </p>
);

/**
 * O prompt do terminal. Só a estrutura veio do componente de referência: as
 * cores de lá tinham quase 100% de saturação — o vício "near-black +
 * acid-green" que o teto do `check-slop` existe para barrar. Aqui o usuário lê
 * `--primary` e o caminho lê `--accent-blue`, então o prompt acompanha o modo
 * de leitura do site em vez de ter cor própria.
 */
const Prompt: React.FC<{ path?: string }> = ({ path = "~" }) => (
  <>
    <span className="text-primary">cadu@shizune</span>
    <span className="text-muted-foreground">:</span>
    <span className="text-accent-blue">{path}</span>
    <span className="text-muted-foreground">$</span>{" "}
  </>
);

export const ShizunePage: React.FC = () => {
  useSeo({
    titulo: "Shizune — registro de decisão com autoridade | Cadu Azeredo",
    descricao:
      "Registro de decisão para código feito com agentes de IA: decisão numerada, commit assinado, e um comando que reprova o build quando alguém cita o que não foi decidido. Quem decidiu, assinado — governança de código com IA, aberta sob Apache-2.0.",
    caminho: "/shizune",
    jsonLd: JSON_LD,
  });

  /**
   * O escopo da rota. Sai na desmontagem: se ficasse, o âmbar e a serifada
   * vazariam para a home quando alguém navegasse de volta.
   */
  useEffect(() => {
    document.documentElement.dataset.rota = "shizune";
    return () => {
      delete document.documentElement.dataset.rota;
    };
  }, []);

  /**
   * A serifada entra aqui, e não no `index.html`, porque só esta rota a usa.
   * Fica no documento depois da saída — remover e recolocar a cada visita
   * causaria um repinte de texto sem ganho nenhum.
   */
  useEffect(() => {
    if (document.querySelector('link[data-fonte="shizune-serif"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONTE_SERIFADA;
    link.dataset.fonte = "shizune-serif";
    document.head.appendChild(link);
  }, []);

  return (
    <PageShell>
      <div className="w-full">
        {/* ── 1 · Hero: a frase e o símbolo ── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-12 items-center">
            <div className="anim-stagger">
              <div className="flex items-center gap-3 mb-8">
                <span
                  className="w-6 h-px bg-border-accent"
                  aria-hidden="true"
                />
                <Kicker>Registro de decisão com autoridade</Kicker>
              </div>

              <h1 className="font-sans font-extrabold tracking-[-0.04em] leading-[1.03] text-4xl sm:text-5xl lg:text-6xl text-foreground">
                A máquina rascunha.
                <br />
                <span className="font-light text-muted-foreground">
                  Você assina.
                </span>
                <br />
                <span className="text-primary">O comando verifica.</span>
              </h1>

              <p className="mt-8 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-[42ch]">
                Seu agente de IA lembra — mas obedece ao que foi decidido.
                Decisão numerada, commit assinado, e um comando que reprova o
                build quando alguém cita o que não foi decidido.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#comecar"
                  className="inline-flex items-center gap-3 rounded-lg bg-primary px-6 py-4 font-sans text-sm font-bold text-background transition-colors hover:bg-primary-muted"
                >
                  Testar o comando agora
                  <span aria-hidden="true" className="font-mono opacity-60">
                    →
                  </span>
                </a>
                <a
                  href="#fecho"
                  className="inline-flex items-center rounded-lg border border-border px-6 py-4 font-sans text-sm font-medium text-foreground transition-colors hover:border-border-accent hover:bg-surface"
                >
                  Ou faça comigo
                </a>
              </div>

              <p className="mt-5 font-mono text-xs text-muted-foreground">
                Apache-2.0 · zero dependências · {versaoPublicada}
              </p>
            </div>

            <div className="flex items-center justify-center">
              <SimboloDoColapso />
            </div>
          </div>
        </section>

        {/* ── 2 · Os números, cada um com o comando ── */}
        <section
          data-reveal
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground max-w-[20ch]">
              Cada número tem o comando que o reproduz
            </h2>
            <span className="font-mono text-xs text-muted-foreground">
              medido em {medidoEm}
            </span>
          </div>
          <p className="mt-3 mb-10 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-[62ch]">
            Número sem comando vira estimativa rotulada. Aqui não existe número
            solto — cole qualquer um destes no clone e ele responde.
          </p>

          <ul className="anim-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0">
            {fatos.map((f, i) => (
              <li
                key={f.rotulo}
                style={{ "--i": i } as React.CSSProperties}
                className="sz-card flex flex-col overflow-hidden rounded-xl bg-surface"
              >
                <div className="flex flex-grow flex-col gap-2 px-6 pt-7 pb-5">
                  <span className="font-sans text-4xl font-extrabold tracking-[-0.04em] leading-none text-primary">
                    {f.valor}
                  </span>
                  <span className="text-sm leading-snug text-foreground">
                    {f.rotulo}
                  </span>
                  {f.ressalva ? (
                    <span className="text-xs leading-relaxed text-muted-foreground">
                      {f.ressalva}
                    </span>
                  ) : null}
                </div>
                <p className="mt-auto border-t border-border bg-background px-5 py-3 font-mono text-[11px] leading-relaxed text-muted-foreground break-all">
                  <span className="text-muted-foreground">$ </span>
                  {f.comando}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── 3 · As três perguntas ── */}
        <section
          data-reveal
          className="mt-24 border-y border-border bg-surface py-16"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
            <Kicker>As três perguntas</Kicker>
            <h2 className="sz-glow-text mt-4 font-serif text-3xl sm:text-4xl font-normal leading-tight text-foreground max-w-[26ch]">
              A marca d’água diz o que a máquina escreveu. A chave diz quem
              enviou. O registro diz o que o humano decidiu.
            </h2>
          </div>

          <ul className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 list-none m-0">
            {fronteira
              .filter((c) => !c.aberto)
              .map((c) => (
                <li
                  key={c.ordem}
                  className="sz-card rounded-2xl bg-background p-8 sm:p-10 flex flex-col"
                >
                  <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
                    <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
                      {c.estado}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {c.ordem}
                    </span>
                  </div>

                  <p className="mt-8 font-serif text-2xl sm:text-3xl font-light leading-snug text-muted-foreground">
                    {c.frase}{" "}
                    <em className="italic text-foreground">{c.enfase}</em>.
                  </p>

                  <p className="mt-6 max-w-[38ch] text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {c.detalhe}
                  </p>

                  <p className="mt-auto pt-8 border-t border-border font-mono text-[11px] text-muted-foreground">
                    {c.fonte}
                  </p>
                </li>
              ))}
          </ul>

          {/* A terceira pergunta é o produto — sozinha, larga e centrada. */}
          {fronteira
            .filter((c) => c.aberto)
            .map((c) => (
              <div
                key={c.ordem}
                className="sz-glow relative mx-auto mt-6 max-w-4xl overflow-hidden rounded-2xl bg-surface-elevated p-8 sm:p-12"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px overflow-hidden"
                >
                  <span className="sz-sweep block h-px w-[38%]" />
                </span>

                <div className="flex items-center justify-between gap-4 border-b border-accent-amber-deep pb-4">
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-accent-amber">
                    {c.estado}
                  </span>
                  <span className="font-mono text-[10px] text-accent-amber">
                    {c.ordem}
                  </span>
                </div>

                <p className="mt-8 text-center font-serif text-3xl sm:text-5xl font-normal leading-tight text-foreground">
                  {c.frase}{" "}
                  <em className="italic text-accent-amber">{c.enfase}</em>.
                </p>

                <p className="mx-auto mt-6 max-w-[52ch] text-center text-sm sm:text-base leading-relaxed text-muted-foreground">
                  {c.detalhe}
                </p>

                <p className="mt-8 border-t border-accent-amber-deep pt-6 text-center font-mono text-[11px] text-accent-amber">
                  {c.fonte}
                </p>
              </div>
            ))}
        </section>

        {/* ── 4 · Onde o Shizune entra, e onde não entra ── */}
        <section
          data-reveal
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20"
        >
          <Kicker>Onde ele entra — e onde não entra</Kicker>
          <h2 className="sz-glow-text mt-4 font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground max-w-[22ch]">
            Preparar o repositório é commodity. Fazer a decisão valer não é.
          </h2>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <article className="sz-card rounded-2xl bg-surface p-8">
              <header className="flex items-baseline gap-3 mb-4">
                <span className="font-mono text-xs text-muted-foreground">
                  01
                </span>
                <h3 className="font-sans text-lg font-semibold text-muted-foreground">
                  Scaffold — onde ele não compete
                </h3>
                <span className="ml-auto rounded-md border border-border px-2.5 py-1 font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                  commodity
                </span>
              </header>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Pastas, templates, arquivos de instrução: isso o ecossistema já
                faz em escala, de graça, e bem. O Shizune não vende estrutura de
                pastas — a camada de preparo é o chão, não o produto.
              </p>
            </article>

            <article className="sz-glow rounded-2xl bg-surface-elevated p-8">
              <header className="flex items-baseline gap-3 mb-4">
                <span className="font-mono text-xs text-primary">02</span>
                <h3 className="sz-glow-text font-sans text-lg font-bold text-foreground">
                  Decisão com autoridade — o que ele é
                </h3>
                <span className="ml-auto rounded-md bg-accent-amber px-2.5 py-1 font-mono text-[10px] font-bold tracking-widest uppercase text-background">
                  o produto
                </span>
              </header>
              <p className="mb-6 text-sm sm:text-base leading-relaxed text-foreground">
                Decisão numerada, assinada e exigida pelo CI, que prevalece
                sobre o que o agente lembra ou infere.
              </p>
              <p className="border-t border-accent-amber-deep pt-6 text-sm leading-relaxed text-muted-foreground">
                Existe muita ferramenta que guarda decisão e nenhuma com tração
                que a faz valer. A diferença entre um arquivo que o agente
                deveria ler e uma regra que reprova o build é a diferença entre
                as duas camadas.
              </p>
            </article>
          </div>
        </section>

        {/* ── 5 · Não é opinião nossa ── */}
        <section
          data-reveal
          className="relative mt-24 overflow-hidden border-t border-border bg-surface py-16"
        >
          <span aria-hidden="true" className="sz-veil" />
          <div className="relative z-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-end justify-between gap-6 mb-9">
              <div>
                <Kicker>Recortes — o contexto, dito por terceiros</Kicker>
                <h2 className="sz-glow-text mt-3.5 font-serif text-2xl sm:text-3xl font-normal leading-tight text-foreground max-w-[26ch]">
                  Não é opinião nossa que a pergunta ficou sem dono.
                </h2>
              </div>
              <p className="font-mono text-[11px] text-muted-foreground">
                arraste para o lado →
              </p>
            </div>

            <ul
              tabIndex={0}
              aria-label="Recortes de terceiros — a lista rola lateralmente"
              className="sz-rail flex gap-5 list-none m-0 px-4 sm:px-6 lg:px-8 pb-6"
            >
              {recortes.map((r) => (
                <li
                  key={r.fonte}
                  className={
                    r.vaga
                      ? "flex-none w-[80vw] max-w-[420px] rounded-2xl border border-dashed border-border p-8 flex flex-col justify-center gap-3.5"
                      : "sz-glass flex-none w-[80vw] max-w-[420px] rounded-2xl p-8 flex flex-col"
                  }
                >
                  {r.vaga ? null : (
                    <header className="flex items-center gap-2.5 border-b border-border pb-4">
                      <span
                        aria-hidden="true"
                        className="flex-none w-7 h-7 rounded-full border border-accent-amber-deep flex items-center justify-center font-mono text-[10px] text-accent-amber"
                      >
                        {r.sigla}
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {r.fonte}
                      </span>
                      <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                        {r.quando}
                      </span>
                    </header>
                  )}

                  {r.vaga ? (
                    <>
                      <Kicker>Vaga reservada</Kicker>
                      <p className="font-serif text-lg font-light leading-relaxed text-muted-foreground">
                        {r.citacao}
                      </p>
                    </>
                  ) : (
                    <p className="mt-6 font-serif text-xl font-light leading-relaxed text-foreground">
                      {r.citacao}{" "}
                      <em className="italic text-foreground">{r.enfase}</em>
                      {r.sigla === "◇" ? " passos e custo de inferência." : "."}
                    </p>
                  )}

                  <p
                    className={`text-xs sm:text-sm leading-relaxed text-muted-foreground ${
                      r.vaga ? "" : "mt-auto pt-6"
                    }`}
                  >
                    {r.fecho}
                  </p>
                </li>
              ))}
            </ul>

            <p className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 font-mono text-[11px] text-muted-foreground">
              Os repositórios da rodada de diagnóstico seguem sem nome até
              2026-09-15 — divulgação responsável. O fato publicável é a
              contagem.
            </p>
          </div>
        </section>

        {/* ── 6 · Contra nós mesmos ── */}
        <section
          data-reveal
          className="mt-0 border-b border-border bg-surface pb-16 pt-16"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <Kicker acento>Contra nós mesmos</Kicker>
              <h2 className="sz-glow-text-amber mt-4 mb-7 font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground max-w-[18ch]">
                O mesmo instrumento, virado para dentro
              </h2>

              <ol className="list-none m-0 p-0 flex flex-col gap-5">
                {contraNosMesmos.map((linha, i) => (
                  <li key={linha} className="flex gap-4 items-start">
                    <span className="flex-none font-mono text-xs leading-7 text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm sm:text-base leading-relaxed text-foreground">
                      {linha}
                    </span>
                  </li>
                ))}
              </ol>

              <a
                href={repositorio}
                className="mt-8 inline-flex items-center gap-2.5 py-1.5 font-sans text-sm font-medium text-primary hover:text-primary-muted"
              >
                Ler os dois relatórios no repositório
                <span aria-hidden="true" className="font-mono opacity-60">
                  →
                </span>
              </a>
            </div>

            <div>
              <TerminalWindow
                title={`cadu@shizune: ~ · diagnóstico ${shaDiagnostico} → ${shaPublicado}`}
              >
                <pre
                  tabIndex={0}
                  aria-label="Comandos do diagnóstico — o bloco rola lateralmente"
                  className="m-0 overflow-x-auto font-mono text-xs leading-loose text-foreground"
                >
                  <Prompt />
                  <span className="text-primary">git</span> clone {repositorio}
                  .git{"\n"}
                  <Prompt />
                  <span className="text-primary">HOME</span>=/vazio{" "}
                  <span className="text-primary">node</span> scripts/doctor.mjs
                </pre>

                <div className="mt-5">
                  <p className="border-b border-border pt-3 pb-3 font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground">
                    O arco, apurado
                  </p>
                  {placarDoDiagnostico.map((p) => (
                    <details
                      key={p.severidade}
                      className="sz-linha group border-b border-border py-4"
                    >
                      <summary className="cursor-pointer list-none">
                        <span className="flex items-baseline justify-between gap-4">
                          <span className="flex items-baseline gap-2.5 font-mono text-xs tracking-wider text-muted-foreground">
                            <span
                              aria-hidden="true"
                              className="sz-chevron inline-block text-primary"
                            >
                              ›
                            </span>
                            {p.severidade}
                          </span>
                          <span
                            className={`font-sans text-2xl font-bold leading-none ${
                              p.destaque
                                ? "text-accent-amber"
                                : "text-muted-foreground"
                            }`}
                          >
                            {p.quantidade}
                          </span>
                        </span>

                        <span
                          aria-hidden="true"
                          className="mt-2.5 block h-px w-full bg-border"
                        >
                          <span
                            className={`block h-px ${
                              p.destaque ? "bg-accent-amber" : "bg-primary-deep"
                            }`}
                            style={{
                              width: `${Math.round(p.proporcao * 100)}%`,
                            }}
                          />
                        </span>
                      </summary>

                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground break-words">
                        {p.define}
                      </p>
                    </details>
                  ))}

                  <div className="flex items-baseline justify-between gap-4 pt-4">
                    <span className="font-mono text-xs tracking-wider text-foreground">
                      Hoje
                    </span>
                    <span className="font-sans text-3xl font-extrabold leading-none tracking-tight text-foreground">
                      {totalDoPlacar.valor}
                    </span>
                  </div>
                  <p className="mt-1.5 font-mono text-[11px] text-muted-foreground">
                    {totalDoPlacar.rotulo}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {totalDoPlacar.ressalva}
                  </p>
                </div>
              </TerminalWindow>

              <blockquote className="mt-6 border-l-2 border-accent-amber-deep pl-5 m-0">
                <p className="font-serif text-lg font-light leading-relaxed text-muted-foreground">
                  {limiteDoDiagnostico}
                </p>
                <cite className="mt-2.5 block not-italic font-mono text-[11px] text-muted-foreground">
                  o limite, dito pelo próprio relatório
                </cite>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ── 7 · Fácil de começar: três comandos ── */}
        <section
          data-reveal
          id="comecar"
          className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          <div>
            <h2 className="sz-glow-text font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground max-w-[14ch]">
              Fácil de começar: três comandos
            </h2>
            <p className="mt-5 mb-7 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-[42ch]">
              Sem npm install, sem package.json. Os scripts usam só builtins —
              roda em qualquer máquina com Bun ou Node 20+, sem falar com
              ninguém.
            </p>
            <ul className="list-none m-0 p-0 flex flex-col gap-4">
              <li className="flex gap-3.5 items-start">
                <span className="flex-none font-mono text-xs leading-7 text-primary">
                  01
                </span>
                <span className="text-sm leading-relaxed text-foreground">
                  Um <code className="font-mono text-primary">CONTEXT.md</code>{" "}
                  por projeto é a fonte da verdade — o agente lê antes de agir,
                  em vez de inferir.
                </span>
              </li>
              <li className="flex gap-3.5 items-start">
                <span className="flex-none font-mono text-xs leading-7 text-primary">
                  02
                </span>
                <span className="text-sm leading-relaxed text-foreground">
                  Decisão vira linha com número, assinante e SHA — e o CI recusa
                  commit que cite decisão inexistente.
                </span>
              </li>
              <li className="flex gap-3.5 items-start">
                <span className="flex-none font-mono text-xs leading-7 text-primary">
                  03
                </span>
                <span className="text-sm leading-relaxed text-foreground">
                  Exemplo completo em{" "}
                  <code className="font-mono text-primary">
                    examples/course-platform-demo/
                  </code>{" "}
                  — com um ticket deliberadamente bloqueado.
                </span>
              </li>
            </ul>
          </div>

          <div>
            <TerminalWindow title="cadu@shizune: ~">
              <pre
                tabIndex={0}
                aria-label="Os três comandos para começar — o bloco rola lateralmente"
                className="m-0 overflow-x-auto font-mono text-xs sm:text-sm leading-loose text-foreground"
              >
                <Prompt />
                <span className="text-primary">git</span> clone {repositorio}
                .git{"\n"}
                <Prompt />
                <span className="text-primary">cd</span> shizune{"\n"}
                {"\n"}
                <Prompt path="~/shizune" />
                <span className="text-primary">bun</span> scripts/doctor.mjs
                {"\n"}
                <span className="text-muted-foreground">
                  {"  "}9 verificadores · nenhuma escrita
                </span>
                {"\n"}
                <Prompt path="~/shizune" />
                <span className="text-primary">bun</span>{" "}
                scripts/new-project.mjs my-project
                <span
                  aria-hidden="true"
                  className="terminal-cursor inline-block align-middle w-[5px] h-3.5 bg-primary ml-2"
                />
              </pre>
              <p className="mt-5 border-t border-border pt-4 font-mono text-[11px] text-primary">
                Nada é apagado. Registro superado vai para archive/.
              </p>
            </TerminalWindow>

            <a
              href={repositorio}
              className="sz-shine mt-6 inline-flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-surface-elevated px-6 py-3.5 font-sans text-sm font-semibold text-foreground transition-colors hover:border-border-accent"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-4 h-4 text-primary"
              >
                <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49l-.01-1.72c-2.78.62-3.37-1.37-3.37-1.37-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.28 9.28 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.59.69.49A10.06 10.06 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
              </svg>
              Ver o repositório no GitHub
            </a>
          </div>
        </section>

        {/* ── 8 · Fecho: faça, ou faça comigo ── */}
        <section
          data-reveal
          id="fecho"
          className="scroll-mt-24 mt-20 border-t border-border-accent bg-surface py-16"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="sz-glow-text mb-5 font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.035em] leading-tight text-foreground max-w-[14ch]">
                Faça, ou faça comigo.
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-[48ch]">
                O core é livre sob Apache 2.0 e continua assim: clonar e
                verificar não pede conversa com ninguém. Auditoria técnica,
                dossiê governado, ou a camada de decisão de pé no seu código —
                isso é uma conversa.
              </p>
            </div>

            <div className="flex flex-col items-start gap-4">
              <a
                href="/contato"
                className="inline-flex items-center gap-3 rounded-lg bg-primary px-7 py-4 font-sans text-base font-bold text-background transition-colors hover:bg-primary-muted"
              >
                Testa o comando. Se passar, me chama.
                <span aria-hidden="true" className="font-mono opacity-60">
                  →
                </span>
              </a>
              <a
                href={discussoes}
                className="inline-flex items-center py-1.5 -my-1.5 font-sans text-sm text-foreground underline underline-offset-4 hover:text-primary"
              >
                Ou abrir uma discussion no repositório
              </a>
              <p className="text-xs leading-relaxed text-muted-foreground max-w-[40ch]">
                Não existe tabela de preço publicada: preço que ninguém validou
                é hipótese.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
};

export default ShizunePage;
