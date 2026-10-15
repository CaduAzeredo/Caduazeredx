import React from "react";
import type { EstadoDaAfirmacao } from "@/content/ficha";
import { cn } from "@/lib/utils";

/**
 * As marcas de procedência das páginas do Shizune.
 *
 * - `MarcaRascunho`: a linha aparece porque isto é preview, e a fonte dela ainda
 *   não foi conferida. Em produção ela não aparece (`lib/publicacao.ts`).
 * - `Medicao`: o estado, o dia e o SHA de um número. O estado se lê pela forma e
 *   pelo texto, nunca só pela cor.
 *
 * As duas usam cor de ESTADO (`--status-wait`), e não a tinta da peça: rascunho
 * e "desatualizada" são estado, e aparecem iguais em qualquer rota.
 */
export const MarcaRascunho: React.FC<{ children: string; className?: string }> = ({
  children,
  className,
}) => (
  <span
    className={cn(
      "inline-flex items-center rounded border border-dashed border-status-wait px-2 py-0.5 font-mono text-[11px] leading-snug text-status-wait",
      className,
    )}
  >
    {children}
  </span>
);

const ROTULO: Record<EstadoDaAfirmacao, string> = {
  reproduzida: "● reproduzido",
  desatualizada: "◐ desatualizada",
  "nao-medida": "○ ainda não medido",
};

export const Medicao: React.FC<{
  estado?: EstadoDaAfirmacao;
  data?: string;
  sha?: string;
  extra?: React.ReactNode;
}> = ({ estado, data, sha, extra }) => (
  <p className="m-0 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] leading-relaxed text-muted-foreground">
    {estado && (
      <span
        className={cn(
          estado === "reproduzida" && "text-primary",
          estado === "desatualizada" && "text-status-wait",
        )}
      >
        {ROTULO[estado]}
      </span>
    )}
    {data && <span>medido em {data}</span>}
    {sha && <span>sha {sha}</span>}
    {extra}
  </p>
);
