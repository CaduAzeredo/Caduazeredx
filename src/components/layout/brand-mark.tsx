import React from "react";
import { cn } from "@/lib/utils";

export interface BrandMarkProps {
  /** Tamanho do lockup. `sm` para navegação e rodapé, `lg` para o hero. */
  size?: "sm" | "md" | "lg";
  /** Só o prompt e a barra — para favicon, avatar e espaços apertados. */
  compact?: boolean;
  /**
   * O que vem DEPOIS da barra: `>_ Cadu Azeredo / shizune`.
   *
   * A barra sempre esteve na marca e nunca teve o que separar. Com um segmento
   * ela passa a fazer o que uma barra faz — dizer onde a pessoa está. Vem da
   * rota, e o componente segue sem saber de rota nenhuma: quem sabe é quem o
   * usa.
   */
  segmento?: string;
  className?: string;
}

const TEXTO = {
  sm: "text-[15.5px]",
  md: "text-2xl",
  lg: "text-4xl sm:text-5xl",
} as const;

const CAIXA = {
  sm: "w-6 h-6 text-[10px] rounded-[5px] border",
  md: "w-8 h-8 text-xs rounded-md border",
  lg: "w-11 h-11 text-[17px] rounded-lg border-[1.5px]",
} as const;

/**
 * A marca.
 *
 * Lida por inteiro é um shell parado na raiz esperando comando: o prompt abre,
 * o nome ocupa o meio, a barra fecha. Não é decoração — é a mesma coisa que o
 * site inteiro afirma sobre o trabalho.
 *
 * Três regras, e elas existem para não serem renegociadas caso a caso:
 *
 * 1. **A barra nunca sai, e é a única parte sempre verde.** Sem ela vira só um
 *    nome escrito.
 * 2. **O prompt é a moldura.** Sozinho com a barra (`compact`) vira ícone de
 *    aplicativo, avatar e favicon, sem redesenhar nada.
 * 3. **O nome vai por extenso.** Nunca abreviado, nunca em versalete: a marca
 *    é o nome.
 */
export const BrandMark: React.FC<BrandMarkProps> = ({
  size = "sm",
  compact = false,
  segmento,
  className,
}) => (
  <span className={cn("inline-flex items-center gap-2", className)}>
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex items-center justify-center border-primary font-mono font-bold leading-none text-primary",
        CAIXA[size],
      )}
    >
      &gt;_
    </span>

    {!compact && (
      <span
        className={cn(
          "font-sans font-semibold tracking-tight text-foreground",
          TEXTO[size],
        )}
      >
        Cadu Azeredo
      </span>
    )}

    <span
      className={cn("font-sans font-light text-primary", TEXTO[size])}
      aria-hidden="true"
    >
      /
    </span>

    {/* O segmento fecha o caminho. Em monoespaçada de propósito: a barra e o
        prompt já estabelecem que aquilo é um shell, e nome de rota é um
        ponteiro como qualquer outro neste site. */}
    {!compact && segmento && (
      <span className="font-mono text-[13px] leading-none text-muted-foreground">
        {segmento}
      </span>
    )}

    {compact && <span className="sr-only">Cadu Azeredo</span>}
  </span>
);

export default BrandMark;
