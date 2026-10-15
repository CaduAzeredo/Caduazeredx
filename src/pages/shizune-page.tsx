import React from "react";
import { Link } from "react-router-dom";
import PageShell from "@/components/layout/page-shell";
import { buttonVariants } from "@/components/ui/button";
import useSeo from "@/lib/use-seo";
import { version } from "@/content/ficha-release.json";
import ficha, { comandoDe, estadoDe, medicaoDe, trechoDaSecao } from "@/content/ficha";
import {
  checkoutDaUltima,
  clone,
  discussoes,
  quickstartSetup,
  repositorio,
  visaoGeral,
} from "@/content/shizune";
import GlifoShizune from "@/components/shizune/glifo";
import BlocoDeComando from "@/components/shizune/bloco-de-comando";
import LinhasDaCaptura from "@/components/shizune/linhas-da-captura";
import { MarcaRascunho, Medicao } from "@/components/shizune/marcas";
import SubmenuShizune from "@/components/shizune/submenu";
import { useEscopoShizune } from "@/components/shizune/escopo";
import { PUBLICACAO } from "@/lib/ambiente";
import { blocoAparece, oQueAparece } from "@/lib/publicacao";
import { cn } from "@/lib/utils";

/**
 * JSON-LD com campos verificáveis, e só eles.
 *
 * `softwareVersion` vem da ficha da release, e este é o ÚNICO lugar do site em
 * que a versão do Shizune aparece: a regra é "sem versão no texto visível", e o
 * JSON-LD não é texto visível. Este é também o único import de `version` no
 * site — a busca de versão no build só pode achá-la aqui. Vive fora do
 * componente para o `useSeo` não re-rodar a cada render.
 */
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Shizune",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Bun ou Node 20+",
  softwareVersion: version,
  license: "https://www.apache.org/licenses/LICENSE-2.0",
  codeRepository: repositorio,
  author: { "@type": "Person", name: "Cadu Azeredo" },
  description:
    "Registro de decisão sobre o git: a máquina rascunha, você assina, o comando verifica. Decisão numerada, commit assinado, e um comando que reprova o build quando alguém cita o que não foi decidido.",
};

const { hero, configurar, comoFunciona, exemplo, contraNos, recortes, comecar, comigo } = visaoGeral;

function Cabeca({ rotulo, titulo, texto }: { rotulo: string; titulo: string; texto?: string }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-[12px] text-muted-foreground">{rotulo}</p>
      <h2 className="titulo-serif text-[30px] leading-[1.1] text-foreground sm:text-[40px]">{titulo}</h2>
      {texto && <p className="max-w-[64ch] text-base leading-relaxed text-muted-foreground sm:text-lg">{texto}</p>}
    </div>
  );
}

/**
 * A rota `/shizune` — a tela 17: o espelho em português da home do shizune.dev.
 *
 * Os números e as capturas saem da ficha da release, a mesma do shizune.dev. O
 * que vem de fora (a citação da Block, o relatório "contra nós mesmos") passa
 * pela regra de publicação: rascunho marcado no preview, fora da produção até a
 * fonte ser conferida.
 */
export const ShizunePage: React.FC = () => {
  useSeo({
    titulo: "Shizune — registro de decisão com autoridade | Cadu Azeredo",
    descricao:
      "Registro de decisão para código feito com agentes de IA: decisão numerada, commit assinado, e um comando que reprova o build quando alguém cita o que não foi decidido. Aberto sob Apache-2.0.",
    caminho: "/shizune",
    jsonLd: JSON_LD,
  });
  useEscopoShizune();

  const m = medicaoDe("negative-test-output");
  const recortesVisiveis = oQueAparece(
    recortes.itens,
    // Conferido = link de fonte conferido, ou, na medição nossa, o comando ao
    // lado. Sem um nem outro, rascunho no preview e fora da produção.
    (r) => Boolean(r.link) || ("comando" in r && Boolean(r.comando)),
    PUBLICACAO,
  );

  return (
    <PageShell>
      <SubmenuShizune />

      <div className="mx-auto w-full max-w-6xl space-y-24 px-4 py-14 sm:px-6 md:space-y-32 lg:px-8">
        {/* ── a frase, e como começar ─────────────────────────────────── */}
        <section className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <div className="flex min-w-0 flex-col gap-6">
            <GlifoShizune tamanho={56} className="text-tinta" />
            <h1 className="font-sans text-[38px] font-light leading-[1.05] tracking-[-0.03em] text-muted-foreground sm:text-[56px]">
              {hero.linhas.map((l, i) => (
                <span key={l.verbo}>
                  {i > 0 && <br />}
                  {l.sujeito}
                  <b className="font-bold text-foreground">{l.verbo}</b>
                </span>
              ))}
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl">{hero.subtitulo}</p>
            <p className="max-w-[52ch] text-base leading-relaxed text-foreground sm:text-lg">{hero.texto}</p>
            <div className="flex flex-wrap gap-3">
              <a href={`#${exemplo.ancora}`} className={buttonVariants("primary", "lg")}>
                {hero.reprovar}
              </a>
              <Link to="/contato" className={buttonVariants("outline", "lg")}>
                {hero.comigo}
              </Link>
            </div>
            <p className="font-mono text-[12px] text-muted-foreground">{hero.rodape}</p>
          </div>

          <div className="flex min-w-0 flex-col gap-4">
            <h2 className="text-lg font-semibold text-foreground">{configurar.titulo}</h2>
            <BlocoDeComando
              agente
              rotulo={configurar.rotuloDoPrompt}
              linhas={[configurar.trecho]}
              copiar={configurar.promptCompleto}
              medicao={
                <p className="m-0 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground">
                  <span>{configurar.origem}</span>
                  <a href={quickstartSetup} className="inline-flex min-h-6 items-center text-tinta hover:underline">
                    {configurar.promptInteiro}
                  </a>
                </p>
              }
            />
            <BlocoDeComando linhas={configurar.comandos} />
            <p className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] text-muted-foreground">
              <span>
                <span aria-hidden="true" className="text-primary">$ </span>
                {configurar.legendaTerminal}
              </span>
              <span>
                <span aria-hidden="true" className="text-tinta">› </span>
                {configurar.legendaAgente}
              </span>
            </p>
          </div>
        </section>

        {/* ── as três partes ────────────────────────────────────────────── */}
        <section className="flex flex-col gap-8">
          <Cabeca rotulo={comoFunciona.rotulo} titulo={comoFunciona.titulo} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {comoFunciona.partes.map((p) => (
              <div key={p.quem} className="sz-card flex min-w-0 flex-col gap-3 rounded-xl bg-surface p-5">
                <p className="font-mono text-[12px] text-muted-foreground">{p.quem}</p>
                <h3 className="text-lg font-semibold text-foreground">{p.titulo}</h3>
                <code className="block overflow-x-auto rounded-md border border-border bg-background px-3 py-2.5 font-mono text-[12px] text-foreground">
                  {p.comando && (
                    <span aria-hidden="true" className="text-primary">
                      ${" "}
                    </span>
                  )}
                  {p.linha}
                </code>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {comoFunciona.camadas.map((c) => (
              <div
                key={c.texto}
                className={cn(
                  "flex flex-col gap-1.5 rounded-lg border px-4 py-4",
                  c.produto ? "border-tinta-deep/50 bg-surface" : "border-border",
                )}
              >
                <p className={cn("font-mono text-[12px]", c.produto ? "text-tinta" : "text-muted-foreground")}>
                  {c.rotulo}
                </p>
                <p className="text-foreground">{c.texto}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {comoFunciona.nota}{" "}
            <Link to="/shizune/evidencia#encaixe" className="text-tinta underline underline-offset-2">
              {comoFunciona.vizinhos}
            </Link>
          </p>
        </section>

        {/* ── o exemplo ─────────────────────────────────────────────────── */}
        <section id={exemplo.ancora} className="flex scroll-mt-6 flex-col gap-8">
          <Cabeca rotulo={exemplo.rotulo} titulo={exemplo.titulo} />
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)]">
            <ol className="m-0 flex min-w-0 list-none flex-col gap-7 p-0">
              <li className="flex flex-col gap-2.5">
                <h3 className="text-base font-semibold text-foreground">
                  <span className="font-mono text-tinta">1</span> {exemplo.aposte.titulo}
                </h3>
                <p className="text-sm text-muted-foreground">{exemplo.aposte.texto}</p>
                <div className="flex flex-wrap gap-2.5">
                  {exemplo.aposte.opcoes.map((o) => (
                    <a key={o} href="#saida" className={buttonVariants("outline", "md")}>
                      {o}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex flex-col gap-2.5">
                <h3 className="text-base font-semibold text-foreground">
                  <span className="font-mono text-tinta">2</span> {exemplo.rode.titulo}
                </h3>
                <BlocoDeComando rotulo={exemplo.rode.rotulo} linhas={[comandoDe("negative-test-output")]} />
              </li>
              <li className="flex flex-col gap-2.5">
                <h3 className="text-base font-semibold text-foreground">
                  <span className="font-mono text-tinta">3</span> {exemplo.leia.titulo}
                </h3>
                <p className="text-sm text-muted-foreground">{exemplo.leia.texto}</p>
              </li>
            </ol>

            <figure id="saida" className="m-0 min-w-0 scroll-mt-6 overflow-hidden rounded-lg border border-border bg-surface">
              <div className="flex items-center justify-between gap-3 border-b border-border bg-surface-elevated px-3.5 py-2 font-mono text-[11px] text-muted-foreground">
                <span className="inline-flex min-h-6 items-center gap-2">
                  <span aria-hidden="true" className="h-2 w-2 rounded-[2px] bg-primary" />
                  {exemplo.rotuloSaida}
                </span>
                <span className="text-status-alert">{exemplo.codigo}</span>
              </div>
              <pre
                tabIndex={0}
                role="group"
                aria-label="Saída capturada do teste negativo"
                className="m-0 overflow-x-auto whitespace-pre px-4 py-4 font-mono text-[11.5px] leading-[1.75] text-muted-foreground sm:text-[12.5px]"
              >
                <LinhasDaCaptura texto={trechoDaSecao(ficha.captura, exemplo.secao)} destaques={exemplo.destaques} />
              </pre>
              <figcaption className="border-t border-border px-4 py-2">
                <Medicao estado={estadoDe("negative-test-output")} data={m.data} sha={m.shaCurto} extra={<span>captura sem edição</span>} />
              </figcaption>
            </figure>
          </div>
          <details className="border-y border-border py-3">
            <summary className="inline-flex min-h-8 cursor-pointer items-center text-sm text-tinta">{exemplo.inteira}</summary>
            <pre
              tabIndex={0}
              role="group"
              aria-label="A saída inteira do teste negativo"
              className="mt-3 overflow-x-auto whitespace-pre rounded-lg border border-border bg-surface-elevated px-4 py-4 font-mono text-[11.5px] leading-[1.7] text-muted-foreground"
            >
              <LinhasDaCaptura texto={ficha.captura} />
            </pre>
          </details>
        </section>

        {/* ── contra nós mesmos: rascunho no preview, fora da produção ──── */}
        {blocoAparece(contraNos.conferido, PUBLICACAO) && (
          <section className="flex flex-col gap-8">
            <Cabeca rotulo={contraNos.rotulo} titulo={contraNos.titulo} texto={contraNos.texto} />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {contraNos.passos.map((p) => (
                <div
                  key={p.texto}
                  className={cn(
                    "flex flex-col gap-1.5 rounded-xl border bg-surface p-5",
                    p.fechado ? "border-primary/40" : "border-border",
                  )}
                >
                  <span className={cn("font-mono text-4xl leading-none", p.fechado ? "text-primary" : "text-tinta")}>
                    {p.valor}
                  </span>
                  <p className="text-foreground">{p.texto}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">{p.rodape}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="max-w-[70ch] text-sm text-muted-foreground">{contraNos.limite}</p>
              {!contraNos.conferido && <MarcaRascunho>{contraNos.marca}</MarcaRascunho>}
            </div>
          </section>
        )}

        {/* ── recortes ──────────────────────────────────────────────────── */}
        {recortesVisiveis.length > 0 && (
          <section className="flex flex-col gap-8">
            <Cabeca rotulo={recortes.rotulo} titulo={recortes.titulo} />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {recortesVisiveis.map(({ item: r, rascunho }) => (
                <article key={r.fonte} className="sz-card flex min-w-0 flex-col gap-3 rounded-xl bg-surface p-5">
                  <p className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-muted-foreground">
                    <span>{r.fonte}</span>
                    {r.forma && (
                      <span className="rounded border border-border px-1.5 py-0.5 text-[10.5px]">{r.forma}</span>
                    )}
                  </p>
                  <p className="font-semibold text-foreground">{r.texto}</p>
                  <p className="text-sm text-muted-foreground">{r.fecho}</p>
                  {rascunho && "comando" in r && (
                    <div className="mt-auto flex flex-col gap-2 pt-2">
                      <p className="m-0 font-mono text-[11px] text-muted-foreground">
                        comando <span className="border-b border-dashed border-muted-foreground">{recortes.semComando}</span>
                      </p>
                      <MarcaRascunho className="self-start">{recortes.rascunhoComando}</MarcaRascunho>
                    </div>
                  )}
                  {rascunho && !("comando" in r) && (
                    <div className="mt-auto flex flex-col gap-2 pt-2">
                      <p className="m-0 font-mono text-[11px] text-muted-foreground">
                        fonte <span className="border-b border-dashed border-muted-foreground">{recortes.semFonte}</span>{" "}
                        lida em <span className="border-b border-dashed border-muted-foreground">{recortes.semData}</span>
                      </p>
                      <MarcaRascunho className="self-start">{recortes.rascunho}</MarcaRascunho>
                    </div>
                  )}
                  {!rascunho && r.link && (
                    <a href={r.link} className="mt-auto inline-flex min-h-6 items-center font-mono text-[11px] text-tinta hover:underline">
                      fonte →
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ── começar ───────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="flex min-w-0 flex-col gap-3">
            <p className="font-mono text-[12px] text-muted-foreground">{comecar.rotulo}</p>
            <h2 className="titulo-serif text-[30px] leading-[1.1] text-foreground sm:text-[40px]">{comecar.titulo}</h2>
            <p className="text-base leading-relaxed text-muted-foreground">{comecar.texto}</p>
          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <BlocoDeComando rotulo={comecar.passo1} linhas={[clone, "cd shizune", checkoutDaUltima]} />
            <BlocoDeComando
              rotulo={comecar.passo2}
              linhas={[comandoDe("doctor-summary")]}
              saida={ficha.doctor.linha}
              rotuloDaSaida={comecar.saida}
              medicao={<Medicao extra={<span>{comecar.saida}</span>} />}
            />
            <BlocoDeComando rotulo={comecar.passo3} linhas={[comecar.novoProjeto]} />
          </div>
        </section>

        {/* ── faça comigo ───────────────────────────────────────────────── */}
        <section className="rounded-2xl border border-border bg-surface p-7 sm:p-10">
          <div className="flex max-w-[64ch] flex-col gap-4">
            <p className="font-mono text-[12px] text-muted-foreground">{comigo.rotulo}</p>
            <h2 className="titulo-serif text-[30px] leading-[1.1] text-foreground sm:text-[40px]">{comigo.titulo}</h2>
            <p className="text-base leading-relaxed text-muted-foreground">{comigo.texto}</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link to="/contato" className={buttonVariants("primary", "lg")}>
                {comigo.falar}
              </Link>
              <a href={discussoes} className={buttonVariants("outline", "lg")}>
                {comigo.discussion}
              </a>
            </div>
            <p className="text-sm text-muted-foreground">{comigo.preco}</p>
          </div>
        </section>
      </div>
    </PageShell>
  );
};

export default ShizunePage;
