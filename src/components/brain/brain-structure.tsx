import React, { useCallback, useRef, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { camadasBrain } from "@/content/brain-estrutura";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * A estrutura do Brain, em três dimensões.
 *
 * **Por que CSS 3D e não WebGL.** O plano previa three.js aqui, aproveitando
 * que a cena do hero já o carrega. Ao construir, ficou claro que seria a
 * escolha errada por três motivos concretos:
 *
 * 1. **O texto é o conteúdo.** A peça existe para mostrar seis nomes de pasta
 *    reais. Em WebGL, texto vira textura: borra ao aproximar, não é
 *    selecionável, não é lido por leitor de tela e não é encontrado pela busca
 *    do navegador. Em CSS 3D continua sendo HTML.
 * 2. **A rota do produto não paga 126 KB.** Quem abre `/produtos/brain` veio
 *    ler sobre o produto, e pode nunca ter passado pela home.
 * 3. **Funciona em todo lugar.** Sem portão de capacidade, sem fallback, sem
 *    contexto perdido: `transform` com `preserve-3d` roda até onde WebGL não
 *    roda, inclusive no celular.
 *
 * O que se perde é iluminação e perspectiva de câmera real. Para seis planos
 * empilhados, não se perde nada que alguém fosse notar.
 *
 * A pilha responde ao ponteiro, e cada rótulo ao lado levanta a própria
 * camada. O botão separa todas de uma vez e revela o que cada uma guarda.
 */

const REPOUSO = { x: 56, z: -42 };

export const BrainStructure: React.FC<{ className?: string }> = ({
  className,
}) => {
  const semMovimento = useReducedMotion();
  const [aberto, setAberto] = useState(false);
  const [emFoco, setEmFoco] = useState<number | null>(null);
  const [orbita, setOrbita] = useState(REPOUSO);
  const palco = useRef<HTMLDivElement>(null);

  const mover = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (semMovimento) return;
      const r = palco.current?.getBoundingClientRect();
      if (!r) return;
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      // Amplitude curta de propósito: a pilha inclina, não gira. Girar muito
      // faz os rótulos ao lado deixarem de apontar para a camada certa.
      setOrbita({ x: REPOUSO.x - dy * 16, z: REPOUSO.z + dx * 18 });
    },
    [semMovimento],
  );

  const sair = useCallback(() => setOrbita(REPOUSO), []);

  const separacao = aberto ? 74 : 30;

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[10.5px] tracking-[0.16em] text-muted-foreground">
          ESTRUTURA REAL DO REPOSITÓRIO
        </span>
        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          data-mode-surface
          className="inline-flex items-center gap-2 rounded-full border border-border-accent bg-primary/[0.07] px-4 py-2 font-mono text-[11px] text-primary hover:bg-primary/10"
        >
          {aberto ? (
            <Minimize2 className="h-3 w-3" aria-hidden="true" />
          ) : (
            <Maximize2 className="h-3 w-3" aria-hidden="true" />
          )}
          {aberto ? "recolher" : "explodir estrutura"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
        {/* ── a pilha ────────────────────────────────────────────────────── */}
        <div
          ref={palco}
          onPointerMove={mover}
          onPointerLeave={sair}
          aria-hidden="true"
          className="relative order-2 h-[340px] select-none sm:h-[420px] lg:order-1 lg:col-span-7 lg:h-[520px]"
          style={{ perspective: "1400px" }}
        >
          <div
            className="absolute left-1/2 top-1/2 h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] lg:h-[360px] lg:w-[360px]"
            style={{
              transformStyle: "preserve-3d",
              transform: `translate(-50%, -50%) rotateX(${orbita.x}deg) rotateZ(${orbita.z}deg)`,
              transition: "transform 620ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {camadasBrain.map((c, i) => {
              const z = (camadasBrain.length - 1 - i) * separacao;
              const ativo = emFoco === i;
              return (
                <div
                  key={c.pasta}
                  className={cn(
                    "absolute inset-0 rounded-xl border",
                    ativo
                      ? "border-primary bg-primary/15"
                      : i === 0
                        ? "border-primary/55 bg-primary/10"
                        : "border-primary/25 bg-surface/80",
                  )}
                  style={{
                    transform: `translateZ(${z + (ativo ? 26 : 0)}px)`,
                    transition:
                      "transform 620ms cubic-bezier(0.16, 1, 0.3, 1), background-color 260ms ease, border-color 260ms ease",
                  }}
                >
                  {/* Sugestão dos arquivos dentro da camada. Aparece só quando
                      a pilha está aberta: fechada, viraria ruído sob as
                      outras cinco. */}
                  <div
                    className="grid grid-cols-4 gap-2 p-5"
                    style={{
                      opacity: aberto ? 1 : 0,
                      transition: "opacity 420ms ease",
                    }}
                  >
                    {Array.from({ length: 8 }).map((_, k) => (
                      <span
                        key={k}
                        className={cn(
                          "h-3 rounded-[3px]",
                          k % 3 === 0 ? "bg-primary/30" : "bg-primary/15",
                        )}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── os rótulos: texto de verdade, fora do 3D ───────────────────── */}
        <ul className="order-1 flex flex-col gap-1 lg:order-2 lg:col-span-5">
          {camadasBrain.map((c, i) => (
            <li key={c.pasta}>
              <button
                type="button"
                onMouseEnter={() => setEmFoco(i)}
                onMouseLeave={() => setEmFoco(null)}
                onFocus={() => setEmFoco(i)}
                onBlur={() => setEmFoco(null)}
                data-mode-surface
                className={cn(
                  "flex w-full flex-col items-start gap-1 rounded-lg border-l-[3px] py-2.5 pl-4 pr-3 text-left",
                  emFoco === i
                    ? "border-l-primary bg-surface"
                    : "border-l-border hover:border-l-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[13px]",
                    emFoco === i ? "text-primary" : "text-foreground",
                  )}
                >
                  {c.pasta}
                </span>
                <span className="text-[12px] leading-relaxed text-muted-foreground">
                  {c.papel}
                </span>
                <span
                  className="text-[12px] leading-relaxed text-muted-foreground/85"
                  style={{
                    display: aberto ? "block" : "none",
                  }}
                >
                  {c.dentro}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-mono text-[10.5px] leading-relaxed text-muted-foreground">
        seis pastas reais do repositório público — estrutura, não decoração
      </p>
    </div>
  );
};

export default BrainStructure;
