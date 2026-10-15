import React from "react";
import ficha from "@/content/ficha";
import { faixa } from "@/content/shizune";

/**
 * A faixa "lido da ficha": de onde vêm os números e os estados da página. A
 * variante âmbar aparece quando a cadeia gravou um SHA de release mais recente
 * que o da ficha. O navegador não descobre isso sozinho — não busca nada ao
 * vivo —, e por isso quem liga a faixa é a cadeia, num PR.
 */
export const FaixaDaFicha: React.FC<{ comEstado?: boolean }> = ({ comEstado = false }) => (
  <>
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg border border-border bg-surface px-4 py-3 font-mono text-[12px] leading-relaxed text-muted-foreground">
      <span>{faixa.lido(ficha.shaCurto, ficha.data)}</span>
      {comEstado && !ficha.desatualizada && <span className="text-primary">{faixa.emDia}</span>}
    </div>
    {ficha.desatualizada && (
      <div
        role="note"
        className="rounded-lg border border-status-wait/50 bg-surface px-4 py-3 font-mono text-[12px] leading-relaxed text-status-wait"
      >
        {faixa.atrasada}
      </div>
    )}
  </>
);

export default FaixaDaFicha;
