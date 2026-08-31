import React, { useEffect } from "react";
import PageShell from "@/components/layout/page-shell";
import { novidades, proximosPassos } from "@/content/novidades";
import type { NovidadeCategoria } from "@/types";
import { cn } from "@/lib/utils";
import {
  Cpu,
  LayoutPanelTop,
  ShieldCheck,
  Network,
  Compass,
} from "lucide-react";

const categoriaConfig: Record<
  NovidadeCategoria,
  {
    label: string;
    badgeClass: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  modelo: {
    label: "Modelo",
    badgeClass: "bg-accent-blue/10 text-accent-blue border-accent-blue/25",
    icon: Cpu,
  },
  interface: {
    label: "Interface",
    badgeClass: "bg-primary/10 text-primary border-primary/25",
    icon: LayoutPanelTop,
  },
  seguranca: {
    label: "Segurança",
    badgeClass: "bg-status-security/10 text-status-security border-status-security/30",
    icon: ShieldCheck,
  },
  arquitetura: {
    label: "Arquitetura",
    badgeClass: "bg-secondary/20 text-secondary border-secondary/30",
    icon: Network,
  },
};

function formatarData(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatarCusto(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export const NovidadesPage: React.FC = () => {
  useEffect(() => {
    document.title =
      "Novidades | Cadu Azeredo — Front-end Developer & Product Builder";
  }, []);

  const novidadesOrdenadas = [...novidades].sort((a, b) =>
    a.data < b.data ? 1 : a.data > b.data ? -1 : 0,
  );

  return (
    <PageShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left">
        {/* Cabeçalho */}
        <div className="space-y-4 text-left border-b border-border/80 pb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-sans">
            Novidades
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
            Registro do que já foi construído e validado de verdade no Brain e
            na Rei. Cada item abaixo tem data de medição e é um fato
            verificável, não copy de venda — é o histórico técnico do produto,
            não material de marketing.
          </p>
        </div>

        {/* Lista cronológica de novidades */}
        <div className="space-y-6">
          {novidadesOrdenadas.map((entry) => {
            const categoria = categoriaConfig[entry.categoria];
            const Icon = categoria.icon;
            const temRodape =
              entry.custoUsd !== undefined || Boolean(entry.promptResumido);

            return (
              <article
                key={entry.id}
                className="rounded-lg bg-surface border border-border p-6 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-[11px] text-muted-foreground/70 uppercase tracking-wide">
                    {formatarData(entry.data)}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono border",
                      categoria.badgeClass,
                    )}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{categoria.label}</span>
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold font-sans text-foreground leading-snug">
                  {entry.titulo}
                </h2>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
                  {entry.resumo}
                </p>

                <p className="text-sm text-muted-foreground/90 leading-relaxed font-sans pt-3 border-t border-border/60">
                  {entry.detalhe}
                </p>

                {temRodape && (
                  <p className="text-xs font-mono text-muted-foreground/60 pt-2">
                    {entry.custoUsd !== undefined && (
                      <span>
                        custo real: US$ {formatarCusto(entry.custoUsd)}
                      </span>
                    )}
                    {entry.custoUsd !== undefined &&
                      entry.promptResumido &&
                      " · "}
                    {entry.promptResumido && (
                      <span>tarefa: {entry.promptResumido}</span>
                    )}
                  </p>
                )}
              </article>
            );
          })}
        </div>

        {/* O que vem a seguir */}
        <section className="space-y-6 pt-4 border-t border-border/80">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold font-sans flex items-center space-x-2 text-foreground">
              <Compass className="w-5 h-5 text-primary-muted" />
              <span>O que vem a seguir</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed font-sans max-w-2xl">
              Os itens abaixo são intenção registrada, não um roteiro com data
              prometida.
            </p>
          </div>

          <ul className="space-y-4">
            {proximosPassos.map((passo) => (
              <li
                key={passo.id}
                className="rounded-lg bg-surface/60 border border-dashed border-border p-5 space-y-2"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-sans font-bold text-sm sm:text-base text-foreground">
                    {passo.titulo}
                  </h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wide border border-border text-muted-foreground/70">
                    Intenção · sem data
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                  {passo.descricao}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageShell>
  );
};

export default NovidadesPage;
