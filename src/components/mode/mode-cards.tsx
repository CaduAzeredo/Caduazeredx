import React from "react";
import { Building2, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteMode, type SiteMode } from "@/lib/use-site-mode";

const MODOS: {
  id: SiteMode;
  nome: string;
  descricao: string;
  Icone: typeof Code2;
  tags: string[];
}[] = [
  {
    id: "empresa",
    nome: "Empresa",
    descricao:
      "Serviços, escopo e o fluxo da contratação primeiro. Para quem quer resolver um problema, não ler código.",
    Icone: Building2,
    tags: ["consultoria", "escopo", "entrega"],
  },
  {
    id: "dev",
    nome: "Dev",
    descricao:
      "O framework, o repositório e o pipeline primeiro. Para quem quer ler o código antes de acreditar.",
    Icone: Code2,
    tags: ["apache 2.0", "zero deps", "quickstart"],
  },
];

/**
 * Troca do modo de leitura.
 *
 * O padrão visual vem dos cards da Rei: régua esquerda de 3px codificando o
 * estado, que é mais legível de relance que borda inteira ou preenchimento.
 *
 * O que a troca faz é mudar **ordem e ênfase**, nunca visibilidade. Nada é
 * escondido por modo: esconder metade da página seria regressão de busca e de
 * leitor de tela, e quem escolheu "Empresa" ainda pode querer ver o
 * repositório.
 */
export const ModeCards: React.FC<{ className?: string }> = ({ className }) => {
  const [modo, trocar] = useSiteMode();

  return (
    <div
      role="radiogroup"
      aria-label="Modo de leitura do site"
      className={cn("grid grid-cols-1 sm:grid-cols-2 gap-4", className)}
    >
      {MODOS.map(({ id, nome, descricao, Icone, tags }) => {
        const ativo = modo === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={ativo}
            onClick={() => trocar(id)}
            data-mode-surface
            className={cn(
              "flex flex-col gap-3 rounded-xl border border-l-[3px] p-5 text-left",
              ativo
                ? "border-border-accent border-l-primary bg-surface-elevated glow-border"
                : "border-border border-l-border bg-surface hover:border-l-muted-foreground",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2.5">
                <Icone
                  className={cn(
                    "h-4 w-4",
                    ativo ? "text-primary" : "text-muted-foreground",
                  )}
                  aria-hidden="true"
                />
                <strong className="text-[15px] font-semibold text-foreground">
                  {nome}
                </strong>
              </span>
              <span
                className={cn(
                  "font-mono text-[10px] tracking-widest",
                  ativo ? "text-primary" : "text-muted-foreground/60",
                )}
                aria-hidden="true"
              >
                {ativo ? "[×]" : "[ ]"}
              </span>
            </div>

            <p className="text-[13px] leading-relaxed text-muted-foreground">
              {descricao}
            </p>

            <span className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span
                  key={t}
                  className={cn(
                    "rounded-full border px-2.5 py-0.5 font-mono text-[10px]",
                    ativo
                      ? "border-border-accent bg-primary/10 text-primary"
                      : "border-border text-muted-foreground",
                  )}
                >
                  {t}
                </span>
              ))}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ModeCards;
