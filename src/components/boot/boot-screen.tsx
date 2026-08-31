import React, { useEffect, useRef, useState } from "react";
import BrandMark from "@/components/layout/brand-mark";

/**
 * A tela de boot.
 *
 * O operador tinha vetado esta tela, e com razão: o site abria em menos de um
 * segundo, e uma tela de carregamento seria atraso encenado. A premissa mudou
 * quando entrou uma cena WebGL para compilar — agora existe espera de verdade,
 * e a tela cobre trabalho que está acontecendo.
 *
 * Quatro regras que a mantêm honesta, e nenhuma é negociável:
 *
 * 1. **Só aparece se a cena pesada for carregar.** Quem cai fora do portão de
 *    capacidade nunca vê esta tela: não haveria o que cobrir.
 * 2. **Cada linha é uma etapa real** — uma promessa que resolve de fato. Não há
 *    contador falso, e a barra reflete etapas concluídas, não tempo decorrido.
 * 3. **Sai no instante em que termina.** Não há duração mínima. Se tudo chegar
 *    em menos de 180 ms, ela nem é desenhada — piscar uma tela de carregamento
 *    é pior que não ter.
 * 4. **Só na primeira visita**, e sempre com botão de pular.
 */

export interface EtapaBoot {
  rotulo: string;
  feito: boolean;
  valor?: string;
}

const CHAVE = "cadu.boot";
const ATRASO_ATE_APARECER = 180;

function jaViu(): boolean {
  try {
    return localStorage.getItem(CHAVE) === "1";
  } catch {
    // Navegação privada. Melhor mostrar a tela do que quebrar a página.
    return false;
  }
}

function marcarVisto() {
  try {
    localStorage.setItem(CHAVE, "1");
  } catch {
    /* sem persistência: quem voltar vê de novo, e tudo bem */
  }
}

export const BootScreen: React.FC<{
  etapas: EtapaBoot[];
  /** Falso enquanto ainda houver o que cobrir. */
  concluido: boolean;
  /** Verdadeiro quando não há cena pesada — a tela não deve nem existir. */
  dispensada: boolean;
}> = ({ etapas, concluido, dispensada }) => {
  const [visivel, setVisivel] = useState(false);
  const [saindo, setSaindo] = useState(false);
  const [encerrada, setEncerrada] = useState(() => jaViu());
  const jaApareceu = useRef(false);

  // Só desenha se a espera passar de ATRASO_ATE_APARECER. Carregamento rápido
  // não merece uma tela; merece a página.
  useEffect(() => {
    if (encerrada || dispensada || concluido) return;
    const t = setTimeout(() => {
      jaApareceu.current = true;
      setVisivel(true);
    }, ATRASO_ATE_APARECER);
    return () => clearTimeout(t);
  }, [encerrada, dispensada, concluido]);

  useEffect(() => {
    if (encerrada) return;
    if (dispensada || concluido) {
      marcarVisto();
      if (!jaApareceu.current) {
        setEncerrada(true); // nunca foi desenhada: some sem transição
        return;
      }
      setSaindo(true);
      const t = setTimeout(() => setEncerrada(true), 460);
      return () => clearTimeout(t);
    }
  }, [concluido, dispensada, encerrada]);

  const pular = () => {
    marcarVisto();
    setSaindo(true);
    setTimeout(() => setEncerrada(true), 260);
  };

  if (encerrada || !visivel) return null;

  const feitas = etapas.filter((e) => e.feito).length;
  const pct = Math.round((feitas / Math.max(etapas.length, 1)) * 100);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Carregando o site"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background px-6"
      style={{
        opacity: saindo ? 0 : 1,
        transition: "opacity 420ms ease",
      }}
    >
      <button
        type="button"
        onClick={pular}
        className="absolute right-5 top-5 rounded-full border border-border px-4 py-2 font-mono text-[11px] text-muted-foreground transition-colors hover:border-border-accent hover:text-foreground"
      >
        pular
      </button>

      <div className="flex w-full max-w-[520px] flex-col items-center gap-9">
        <BrandMark size="md" />

        <ul className="flex w-full flex-col gap-2.5">
          {etapas.map((e) => (
            <li key={e.rotulo} className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={
                  e.feito
                    ? "h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    : "h-1.5 w-1.5 shrink-0 rounded-full bg-border"
                }
              />
              <span
                className={
                  e.feito
                    ? "grow font-mono text-[12.5px] text-muted-foreground"
                    : "grow font-mono text-[12.5px] text-foreground"
                }
              >
                {e.rotulo}
              </span>
              {e.valor && e.feito && (
                <span className="font-mono text-[11px] text-primary-muted">
                  {e.valor}
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="flex w-full flex-col gap-2.5">
          <div className="h-px w-full overflow-hidden bg-border">
            <div
              className="h-full bg-primary"
              style={{ width: `${pct}%`, transition: "width 320ms ease" }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
              PROGRESSO REAL — SAI QUANDO ESTIVER PRONTO
            </span>
            <span className="font-mono text-[10px] text-primary-muted">
              {pct}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
