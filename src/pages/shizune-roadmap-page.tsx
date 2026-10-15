import React from "react";
import PageShell from "@/components/layout/page-shell";
import useSeo from "@/lib/use-seo";
import ficha, { estadoDaCadeia, estadoDoDegrau, secaoDoChangelog, type EstadoDegrau } from "@/content/ficha";
import { DEGRAUS, ROTULO_DO_ESTADO, itemConferido, textoDoItem } from "@/content/degraus";
import { MarcaRascunho } from "@/components/shizune/marcas";
import { PUBLICACAO } from "@/lib/ambiente";
import { oQueAparece } from "@/lib/publicacao";
import { changelog, roadmap } from "@/content/shizune";
import SubmenuShizune from "@/components/shizune/submenu";
import PaginaComSumario from "@/components/shizune/pagina-com-sumario";
import FaixaDaFicha from "@/components/shizune/faixa-da-ficha";
import { useEscopoShizune } from "@/components/shizune/escopo";
import { cn } from "@/lib/utils";

const { cabeca, degraus, feito, cadeia, depois } = roadmap;

const SUMARIO = [
  { ancora: degraus.ancora, rotulo: "Os seis degraus" },
  { ancora: feito.ancora, rotulo: "Já feito" },
  { ancora: cadeia.ancora, rotulo: "Fora dos degraus" },
  { ancora: depois.ancora, rotulo: "Depois dos degraus" },
];

/** A forma (●◐○◆) diz o estado; a cor só acompanha. */
const COR_DO_ESTADO: Record<EstadoDegrau, string> = {
  done: "text-primary",
  now: "text-tinta",
  todo: "text-muted-foreground",
  blocked: "text-status-alert",
};

const ROTULO = "font-mono text-[12px] text-muted-foreground";

/**
 * A rota `/shizune/roadmap` — a tela 18b: o espelho em português do `/roadmap`
 * do shizune.dev.
 *
 * Seis degraus, cada um com o nome da ameaça que fecha. O estado de cada um sai
 * da ficha da release: quando a próxima release sai, a cadeia abre o PR com a
 * ficha nova e o degrau muda de estado nesse mesmo PR — nunca à mão.
 */
export const ShizuneRoadmapPage: React.FC = () => {
  useSeo({
    titulo: "Roadmap — Shizune | Cadu Azeredo",
    descricao:
      "Os seis degraus do Shizune: cada um fecha uma ameaça e publica uma prova. O estado de cada degrau sai da ficha da release.",
    caminho: "/shizune/roadmap",
  });
  useEscopoShizune();
  const feitos = DEGRAUS.filter((d) => estadoDoDegrau(d.id) === "done");

  return (
    <PageShell>
      <SubmenuShizune />
      <PaginaComSumario sumario={SUMARIO}>
        <section className="flex flex-col gap-4">
          <p className={ROTULO}>{cabeca.rotulo}</p>
          <h1 className="titulo-serif text-[40px] leading-[1.04] text-foreground sm:text-[56px]">
            {cabeca.titulo}
          </h1>
          <p className="max-w-[70ch] text-lg leading-relaxed text-foreground">{cabeca.texto}</p>
          <FaixaDaFicha comEstado />
        </section>

        <section id={degraus.ancora} className="flex scroll-mt-24 flex-col gap-5">
          <h2 className="titulo-serif text-[30px] leading-[1.1] text-foreground sm:text-[40px]">{degraus.titulo}</h2>
          <nav aria-label="Degraus" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {DEGRAUS.map((d) => {
              const e = estadoDoDegrau(d.id);
              return (
                <a
                  key={d.id}
                  href={`#${d.id}`}
                  className={cn(
                    "flex min-h-6 flex-col gap-1 border-t-2 pt-2 text-sm text-foreground",
                    e === "now" ? "border-tinta" : e === "done" ? "border-primary" : "border-border",
                  )}
                >
                  <span className={cn("font-mono text-[11px]", COR_DO_ESTADO[e])}>{ROTULO_DO_ESTADO[e]}</span>
                  <span>{d.nome}</span>
                </a>
              );
            })}
          </nav>
          <p className="max-w-[70ch] text-sm text-muted-foreground">{degraus.nota}</p>

          <div className="flex flex-col gap-3.5">
            {DEGRAUS.map((d) => {
              const e = estadoDoDegrau(d.id);
              return (
                <article
                  key={d.id}
                  id={d.id}
                  className={cn(
                    "flex scroll-mt-24 flex-col gap-5 rounded-xl border bg-surface p-5 md:p-6",
                    e === "now" ? "border-tinta-deep/60" : e === "done" ? "border-primary/40" : "border-border",
                  )}
                >
                  <div className="flex flex-col gap-1.5">
                    <span className={cn("font-mono text-[12px]", COR_DO_ESTADO[e])}>{ROTULO_DO_ESTADO[e]}</span>
                    <h3 className="text-xl font-semibold text-foreground">{d.nome}</h3>
                    <p className="text-sm text-muted-foreground">{d.ameaca}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <p className={ROTULO}>{degraus.oQueFecha}</p>
                      <ul className="m-0 flex list-disc flex-col gap-1.5 pl-5 text-sm text-foreground">
                        {oQueAparece(d.fecha, itemConferido, PUBLICACAO).map(({ item, rascunho }) => (
                          <li key={textoDoItem(item)}>
                            {textoDoItem(item)}
                            {rascunho && (
                              <>
                                {" "}
                                <MarcaRascunho>{degraus.rascunhoFornecedor}</MarcaRascunho>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className={ROTULO}>{degraus.prova}</p>
                      <p className="text-sm text-foreground">{d.prova}</p>
                      {(e === "now" || e === "done") && (
                        <>
                          <p className={cn(ROTULO, "mt-1.5")}>{degraus.quandoFeito}</p>
                          <p className="text-sm text-muted-foreground">{degraus.registro}</p>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id={feito.ancora} className="flex scroll-mt-24 flex-col gap-4">
          <h2 className="titulo-serif text-[30px] leading-[1.1] text-foreground sm:text-[40px]">{feito.titulo}</h2>
          {feitos.map((d) => (
            <div key={d.id} className="flex flex-col gap-1.5 rounded-xl border border-primary/40 bg-surface p-5">
              <span className="font-mono text-[12px] text-primary">{ROTULO_DO_ESTADO.done}</span>
              <h3 className="text-lg font-semibold text-foreground">{d.nome}</h3>
              <p className="text-sm text-muted-foreground">{feito.degrauFeito(ficha.data)}</p>
              <a
                href={secaoDoChangelog(ficha.changelog)}
                className="inline-flex min-h-6 items-center self-start font-mono text-[12px] text-tinta underline underline-offset-2"
              >
                {feito.notas}
              </a>
            </div>
          ))}
          <div className="flex flex-col gap-1.5 rounded-xl border border-primary/40 bg-surface p-5">
            <span className="font-mono text-[12px] text-primary">{ROTULO_DO_ESTADO.done}</span>
            <h3 className="text-lg font-semibold text-foreground">{feito.antes.titulo}</h3>
            <p className="text-sm text-muted-foreground">{feito.antes.texto}</p>
            <a
              href={secaoDoChangelog(feito.antes.ancoraNoChangelog)}
              className="inline-flex min-h-6 items-center self-start font-mono text-[12px] text-tinta underline underline-offset-2"
            >
              {feito.notas}
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            {feito.rodape}{" "}
            <a href={changelog} className="text-tinta underline underline-offset-2">
              CHANGELOG.md
            </a>
          </p>
        </section>

        <section
          id={cadeia.ancora}
          className="flex scroll-mt-24 flex-col gap-4 rounded-xl border border-border p-5 md:p-6"
        >
          <div className="flex flex-col gap-1.5">
            <p className={ROTULO}>{cadeia.rotulo}</p>
            <h2 className="text-xl font-semibold text-foreground">{cadeia.titulo}</h2>
          </div>
          <p className="max-w-[66ch] text-sm text-muted-foreground">{cadeia.texto}</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <p className={ROTULO}>{cadeia.ameacaRotulo}</p>
              <p className="text-sm text-foreground">{cadeia.ameaca}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className={ROTULO}>{cadeia.provaRotulo}</p>
              <p className="text-sm text-foreground">{cadeia.prova}</p>
            </div>
          </div>
          <span className={cn("font-mono text-[12px]", COR_DO_ESTADO[estadoDaCadeia])}>
            {ROTULO_DO_ESTADO[estadoDaCadeia]}
          </span>
        </section>

        <section id={depois.ancora} className="flex scroll-mt-24 flex-col gap-4">
          <h2 className="titulo-serif text-[30px] leading-[1.1] text-foreground sm:text-[40px]">{depois.titulo}</h2>
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">{depois.item.titulo}</h3>
            <p className="text-sm text-muted-foreground">{depois.item.texto}</p>
          </div>
        </section>
      </PaginaComSumario>
    </PageShell>
  );
};

export default ShizuneRoadmapPage;
