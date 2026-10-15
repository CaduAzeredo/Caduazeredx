import React, { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Um comando, para ser lido e copiado — com a barra que diz onde ele roda.
 *
 * Verde para o que roda no terminal, âmbar para o que vai para o agente. O `$` e
 * o `›` são prompt, e não comando: ficam fora da seleção e fora do que o botão
 * copia. Texto real, em monoespaçada, que rola em vez de quebrar linha — um
 * comando quebrado no meio é um comando que não cola. A região rolável recebe
 * foco por teclado e um rótulo.
 *
 * O mesmo bloco do shizune.dev, nos tokens deste site.
 */
export const BotaoCopiar: React.FC<{ texto: string; rotulo?: string }> = ({
  texto,
  rotulo = "Copiar o comando",
}) => {
  const [copiado, setCopiado] = useState(false);
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 1600);
    } catch {
      // Sem permissão de área de transferência o texto segue selecionável.
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={copiar}
        aria-label={rotulo}
        className="min-h-8 rounded-md border border-border bg-surface px-3 font-mono text-[11px] text-foreground transition-colors hover:border-muted-foreground"
      >
        {copiado ? "copiado" : "copiar"}
      </button>
      <span role="status" className="sr-only">
        {copiado ? "Copiado" : ""}
      </span>
    </>
  );
};

export const BlocoDeComando: React.FC<{
  linhas: readonly string[];
  rotulo?: string;
  agente?: boolean;
  copiar?: string;
  saida?: string;
  rotuloDaSaida?: string;
  medicao?: React.ReactNode;
  direita?: React.ReactNode;
  compacto?: boolean;
  className?: string;
}> = ({
  linhas,
  rotulo = "terminal",
  agente = false,
  copiar,
  saida,
  rotuloDaSaida,
  medicao,
  direita,
  compacto = false,
  className,
}) => (
  <div className={cn("min-w-0 overflow-hidden rounded-lg border border-border bg-surface", className)}>
    <div className="flex items-center justify-between gap-3 border-b border-border bg-surface-elevated py-1.5 pl-3.5 pr-1.5 font-mono text-[11px] text-muted-foreground">
      <span className="inline-flex min-h-8 min-w-0 items-center gap-2">
        <span
          aria-hidden="true"
          className={cn("h-2 w-2 shrink-0 rounded-[2px]", agente ? "bg-tinta" : "bg-primary")}
        />
        {rotulo}
      </span>
      {direita ?? (
        <BotaoCopiar
          texto={copiar ?? linhas.join("\n")}
          rotulo={agente ? "Copiar o prompt inteiro" : "Copiar o comando"}
        />
      )}
    </div>
    <pre
      tabIndex={0}
      role="group"
      aria-label={agente ? "Prompt para o seu agente" : "Comando"}
      className={cn(
        "m-0 overflow-x-auto font-mono leading-[1.75] text-foreground",
        compacto ? "px-3.5 py-2.5 text-[12px]" : "px-4 py-3.5 text-[12.5px]",
        agente ? "whitespace-pre-wrap text-muted-foreground" : "whitespace-pre",
      )}
    >
      {linhas.map((l, i) => (
        <span key={i} className="block">
          <span aria-hidden="true" className={cn("select-none", agente ? "text-tinta" : "text-primary")}>
            {agente ? "› " : "$ "}
          </span>
          {l}
        </span>
      ))}
    </pre>
    {saida !== undefined && (
      <pre
        tabIndex={0}
        role="group"
        aria-label={rotuloDaSaida ?? "Saída"}
        className="m-0 overflow-x-auto whitespace-pre border-t border-dashed border-border bg-background px-4 py-3 font-mono text-[12px] leading-[1.75] text-muted-foreground"
      >
        {saida}
      </pre>
    )}
    {medicao && <div className="border-t border-border px-4 py-2">{medicao}</div>}
  </div>
);

export default BlocoDeComando;
