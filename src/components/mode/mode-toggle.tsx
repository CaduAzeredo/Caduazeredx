import React from "react";
import { cn } from "@/lib/utils";
import { useSiteMode } from "@/lib/use-site-mode";

/**
 * Troca de modo, versão compacta — a que mora na navbar.
 *
 * v4: virou um interruptor físico com o miolo que desliza, gira e solta uma
 * faísca (adaptado do uiverse/MuhammadHasann — ver o bloco `.mt-*` em
 * motion.css para o que mudou e por quê). O que NÃO mudou é o contrato de
 * acessibilidade: os dois rótulos continuam visíveis dos dois lados, o
 * controle é um `switch` de verdade (`role`, `aria-checked`), e o input
 * escondido continua focável — Espaço e Enter operam, e o anel de foco
 * aparece ao redor do trilho.
 *
 * O motivo de existir é um furo real: até a v3 o seletor vivia só em
 * /produtos. Quem abrisse a home — a maioria — nunca via que o site tem dois
 * modos de leitura.
 */
export const ModeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const [modo, trocar] = useSiteMode();
  const empresa = modo === "empresa";

  return (
    <div className={cn("mt-cont", className)}>
      <span className="mt-rotulo" data-ativo={!empresa} aria-hidden="true">
        Dev
      </span>

      <input
        id="modo-de-leitura"
        type="checkbox"
        role="switch"
        className="mt-input"
        checked={empresa}
        aria-checked={empresa}
        aria-label="Modo de leitura: desligado é Dev, ligado é Empresa"
        onChange={(e) => trocar(e.target.checked ? "empresa" : "dev")}
      />
      <label htmlFor="modo-de-leitura" className="mt-label" data-mode-surface>
        <span className="mt-knob" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="h-3 w-3"
          >
            {/* O prompt da marca, no miolo: > */}
            <path d="M8 6l8 6-8 6" />
          </svg>
        </span>
      </label>

      <span className="mt-rotulo" data-ativo={empresa} aria-hidden="true">
        Empresa
      </span>
    </div>
  );
};

export default ModeToggle;
