import React from "react";

/**
 * As páginas de leitura do Shizune — `/shizune/evidencia` e `/shizune/roadmap` —
 * têm a mesma forma: um sumário à esquerda e o texto à direita. No celular o
 * sumário vira uma linha de links acima do texto.
 *
 * O sumário NÃO marca a seção em que a pessoa está: marcar exigiria observar a
 * rolagem, e o `check-motion` deste site não deixa nada reagir à rolagem. É um
 * índice, não um efeito — a mesma decisão do shizune.dev.
 */
export interface ItemDoSumario {
  readonly ancora: string;
  readonly rotulo: string;
}

export const PaginaComSumario: React.FC<{
  sumario: readonly ItemDoSumario[];
  children: React.ReactNode;
}> = ({ sumario, children }) => (
  <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-14 lg:px-8">
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <nav aria-label="Nesta página" className="flex flex-wrap gap-x-5 gap-y-1 lg:flex-col lg:gap-1.5">
        <p className="w-full font-mono text-[12px] text-muted-foreground">Nesta página</p>
        {sumario.map((s) => (
          <a
            key={s.ancora}
            href={`#${s.ancora}`}
            className="inline-flex min-h-6 items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {s.rotulo}
          </a>
        ))}
      </nav>
    </aside>
    <div className="flex min-w-0 flex-col gap-16">{children}</div>
  </div>
);

export default PaginaComSumario;
