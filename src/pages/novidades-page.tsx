import React, { useEffect, useState } from "react";
import PageShell from "@/components/layout/page-shell";
import { MarcaRascunho } from "@/components/shizune/marcas";
import { novidades, proximosPassos } from "@/content/novidades";
import { secaoDoChangelog } from "@/content/ficha";
import type { NovidadeCategoria, NovidadeEntry } from "@/types";
import { PUBLICACAO } from "@/lib/ambiente";
import { oQueAparece } from "@/lib/publicacao";
import { cn } from "@/lib/utils";
import { Compass } from "lucide-react";

const CATEGORIA: Record<NovidadeCategoria, { rotulo: string; classe: string }> = {
  modelo: { rotulo: "Modelo", classe: "text-accent-blue border-accent-blue/30" },
  interface: { rotulo: "Interface", classe: "text-primary border-primary/30" },
  lancamento: { rotulo: "Lançamento", classe: "text-status-live border-status-live/30" },
  seguranca: { rotulo: "Segurança", classe: "text-status-security border-status-security/30" },
  arquitetura: { rotulo: "Arquitetura", classe: "text-secondary border-secondary/40" },
};

const AREA: Record<NovidadeEntry["area"], string> = { shizune: "Shizune", bastidores: "Bastidores" };

const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

/** "2026-09-16" → "16 set 2026", sem depender do fuso nem do locale do navegador. */
function formatarData(iso: string): string {
  const [ano, mes, dia] = iso.split("-");
  return `${dia} ${MESES[Number(mes) - 1]} ${ano}`;
}

function formatarCusto(valor: number): string {
  return valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

type Filtro = "todas" | NovidadeEntry["area"];

/**
 * A rota `/novidades` — a tela 19a.
 *
 * Um registro com data, filtrado por área: o Shizune e os bastidores. O
 * resumo fica à vista e o verbete inteiro abre num `details`. Verbete com
 * `conferido: false` passa pela regra de publicação: rascunho no preview, fora
 * da produção.
 */
export const NovidadesPage: React.FC = () => {
  useEffect(() => {
    document.title = "Novidades | Cadu Azeredo — Front-end Developer & Product Builder";
  }, []);
  const [filtro, setFiltro] = useState<Filtro>("todas");

  const visiveis = oQueAparece(
    [...novidades].sort((a, b) => (a.data < b.data ? 1 : a.data > b.data ? -1 : 0)),
    (e) => e.conferido !== false,
    PUBLICACAO,
  );
  const filtros: { id: Filtro; rotulo: string; total: number }[] = [
    { id: "todas", rotulo: "Todas", total: visiveis.length },
    { id: "shizune", rotulo: "Shizune", total: visiveis.filter((v) => v.item.area === "shizune").length },
    { id: "bastidores", rotulo: "Bastidores", total: visiveis.filter((v) => v.item.area === "bastidores").length },
  ];
  const lista = filtro === "todas" ? visiveis : visiveis.filter((v) => v.item.area === filtro);

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl space-y-10 px-4 py-14 text-left sm:px-6 lg:px-8">
        <div className="space-y-4">
          <h1 className="titulo-serif text-[40px] leading-[1.04] text-foreground sm:text-[56px]">Novidades</h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Registro do que foi construído e validado. Cada item tem data e é um fato verificável, não
            texto de venda.
          </p>
        </div>

        <div role="group" aria-label="Filtrar por área" className="flex flex-wrap gap-2">
          {filtros.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filtro === f.id}
              onClick={() => setFiltro(f.id)}
              className={cn(
                "min-h-9 rounded-full border px-3.5 font-mono text-[12px] transition-colors",
                filtro === f.id
                  ? "border-primary/50 bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {f.rotulo} · {f.total}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {lista.map(({ item: entry, rascunho }) => {
            const categoria = CATEGORIA[entry.categoria];
            const temRodape = entry.custoUsd !== undefined || Boolean(entry.promptResumido);
            return (
              <article key={entry.id} className="space-y-3 rounded-lg border border-border bg-surface p-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="font-mono text-[12px] text-muted-foreground">{formatarData(entry.data)}</span>
                  <span className={cn("rounded-full border px-2.5 py-0.5 font-mono text-[11px]", categoria.classe)}>
                    {categoria.rotulo}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">{AREA[entry.area]}</span>
                  {rascunho && <MarcaRascunho>rascunho · texto a assinar</MarcaRascunho>}
                </div>

                <h2 className="font-sans text-lg font-bold leading-snug text-foreground sm:text-xl">{entry.titulo}</h2>
                <p className="font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">{entry.resumo}</p>

                <div className="flex flex-wrap items-start gap-x-6 gap-y-2">
                  <details className="group min-w-0 flex-1 basis-full">
                    <summary className="inline-flex min-h-8 cursor-pointer items-center text-sm text-primary">
                      ▸ ler o verbete inteiro
                    </summary>
                    <p className="mt-2 border-t border-border/60 pt-3 font-sans text-sm leading-relaxed text-muted-foreground">
                      {entry.detalhe}
                    </p>
                    {temRodape && (
                      <p className="pt-2 font-mono text-xs text-muted-foreground">
                        {entry.custoUsd !== undefined && <span>custo real: US$ {formatarCusto(entry.custoUsd)}</span>}
                        {entry.custoUsd !== undefined && entry.promptResumido && " · "}
                        {entry.promptResumido && <span>tarefa: {entry.promptResumido}</span>}
                      </p>
                    )}
                  </details>
                  {entry.notas && (
                    <a
                      href={secaoDoChangelog(entry.notas)}
                      className="inline-flex min-h-8 items-center text-sm text-primary underline underline-offset-2"
                    >
                      notas da release no GitHub →
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <section data-reveal className="space-y-6 border-t border-border/80 pt-6">
          <div className="space-y-2">
            <h2 data-split className="flex items-center gap-2 font-sans text-xl font-bold text-foreground sm:text-2xl">
              <Compass className="h-5 w-5 text-primary-muted" aria-hidden="true" />
              <span>O que vem a seguir</span>
            </h2>
            <p className="max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground">
              Os itens abaixo são intenção registrada, não um roteiro com data prometida.
            </p>
          </div>

          <ul className="space-y-4">
            {proximosPassos.map((passo) => (
              <li key={passo.id} className="space-y-2 rounded-lg border border-dashed border-border bg-surface/60 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-sans text-sm font-bold text-foreground sm:text-base">{passo.titulo}</h3>
                  <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                    intenção · sem data
                  </span>
                </div>
                <p className="font-sans text-sm leading-relaxed text-muted-foreground">{passo.descricao}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageShell>
  );
};

export default NovidadesPage;
