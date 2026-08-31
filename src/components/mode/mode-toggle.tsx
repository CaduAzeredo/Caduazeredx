import React from "react";
import { cn } from "@/lib/utils";
import { useSiteMode, type SiteMode } from "@/lib/use-site-mode";

const MODOS: { id: SiteMode; rotulo: string }[] = [
  { id: "dev", rotulo: "Dev" },
  { id: "empresa", rotulo: "Empresa" },
];

/**
 * Troca de modo, versão compacta — a que mora na navbar.
 *
 * Os cards em `/produtos` explicam o que cada modo faz e continuam sendo a
 * porta de entrada do conceito. Este controle é para quem já sabe: mudar de
 * ideia em qualquer página, sem voltar até lá.
 *
 * O motivo de existir é um furo real: até aqui o seletor vivia **só** em
 * `/produtos`. Quem abrisse a home — a maioria — nunca via que o site tem dois
 * modos de leitura, e o recurso simplesmente não existia para essa pessoa.
 *
 * `radiogroup` e não dois botões soltos: são opções mutuamente exclusivas de um
 * mesmo campo, e é assim que um leitor de tela anuncia "2 de 2, selecionado".
 */
export const ModeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const [modo, trocar] = useSiteMode();

  return (
    <div
      role="radiogroup"
      aria-label="Modo de leitura do site"
      className={cn(
        "flex items-center rounded-full border border-border p-[3px]",
        className,
      )}
    >
      {MODOS.map(({ id, rotulo }) => {
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
              "rounded-full px-3 py-1.5 font-mono text-[11px] leading-none",
              ativo
                ? "border border-border-accent bg-primary/10 text-primary"
                : "border border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {rotulo}
          </button>
        );
      })}
    </div>
  );
};

export default ModeToggle;
