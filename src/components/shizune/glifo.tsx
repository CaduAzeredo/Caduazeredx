import React from "react";

/**
 * O símbolo do Shizune — a onda que colapsa numa reta, na variante compacta.
 *
 * O traçado é o mesmo do shizune.dev (`src/lib/glifo.ts` de lá) e das telas de
 * 15/10. Ele entra no cabeçalho do console da home, no cartão do produto e no
 * topo da `/shizune`. Não escreve cor: `currentColor`, e quem usa decide — o
 * âmbar do produto, nos lugares contados.
 */
export const GlifoShizune: React.FC<{ tamanho?: number; className?: string }> = ({
  tamanho = 24,
  className,
}) => (
  <svg
    viewBox="0 0 24 24"
    width={tamanho}
    height={tamanho}
    fill="none"
    stroke="currentColor"
    strokeWidth={tamanho >= 40 ? 1.25 : 1.6}
    strokeLinecap="round"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <path d="M1.5 12C1.5 6.5 3 3.5 5 3.5C7 3.5 7 18 8.5 18C10 18 10 9 11.5 9C12.7 9 13.4 12 14.5 12L22.5 12" />
  </svg>
);

export default GlifoShizune;
