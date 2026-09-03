import React, { useCallback, useEffect, useState } from "react";
import { ShieldAlert, X } from "lucide-react";
import { useInvasao } from "@/lib/use-invasao";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { janelasInvasao, barraInvasao } from "@/content/invasao";

/**
 * O modo de defesa — a camada visível do easter egg.
 *
 * A cor inteira do site já trocou pelo `[data-invadido]` em `tokens.css`; o que
 * este componente acrescenta é a encenação: janelas de diálogo de internet
 * velha aparecendo uma a uma, a varredura de tubo por cima de tudo, e a barra
 * que diz o que está acontecendo.
 *
 * As regras que o mantêm um easter egg e não um defeito:
 *
 * - **Nada é bloqueado.** As janelas ficam numa faixa lateral que não cobre o
 *   conteúdo, e o site continua clicável por baixo. Quem caiu aqui sem querer
 *   consegue continuar lendo.
 * - **A saída é sempre visível.** Botão na barra, `Escape` no teclado, e cada
 *   janela fecha sozinha.
 * - **Com movimento reduzido, nada se move.** As janelas aparecem de uma vez,
 *   sem escalonamento e sem varredura.
 */

const INTERVALO = 900;

/**
 * O painel em si. E um componente separado de proposito: ele monta do zero
 * toda vez que o modo liga, entao o escalonamento das janelas comeca sozinho
 * no estado certo. A alternativa era zerar o estado dentro de um efeito ao
 * detectar o desligamento — que e `setState` em efeito, coisa que o React em
 * modo concorrente pode rodar duas vezes.
 */
const Painel: React.FC<{ aoRestaurar: () => void }> = ({ aoRestaurar }) => {
  const semMovimento = useReducedMotion();
  const [visiveis, setVisiveis] = useState(() =>
    semMovimento ? janelasInvasao.length : 0,
  );
  const [fechadas, setFechadas] = useState<string[]>([]);

  // As janelas entram uma a uma. Com movimento reduzido ja nasceram todas.
  useEffect(() => {
    if (semMovimento) return;
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setVisiveis(n);
      if (n >= janelasInvasao.length) clearInterval(id);
    }, INTERVALO);
    return () => clearInterval(id);
  }, [semMovimento]);

  // Escape sai. Um easter egg sem saida de teclado e uma armadilha.
  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") aoRestaurar();
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aoRestaurar]);

  const abertas = janelasInvasao
    .slice(0, visiveis)
    .filter((j) => !fechadas.includes(j.id));

  return (
    <>
      {/* Varredura de tubo antigo. `pointer-events-none` e o que mantem o site
          clicavel por baixo — sem isso, o efeito vira um vidro sobre a pagina. */}
      {!semMovimento && (
        <div
          aria-hidden="true"
          className="invasao-scan pointer-events-none fixed inset-0 z-[80]"
        />
      )}

      {/* As janelas. Faixa lateral, com rolagem propria: elas nunca empurram
          nem cobrem o conteudo da pagina. */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed right-0 top-16 bottom-20 z-[90] flex w-full max-w-[340px] flex-col items-end gap-3 overflow-y-auto px-3 sm:px-4"
      >
        {abertas.map((j) =>
          j.forte ? (
            /* O pop-up vermelho — o principal — virou o card brutalista
               (uiverse/0xnihilism, bloco `.brut-*` em motion.css). Preto e
               branco chapados fazem parte da encenacao: e a unica zona do
               site onde alarme E atmosfera, por decisao escrita. */
            <div
              key={j.id}
              className="invasao-janela brut-card pointer-events-auto w-full"
            >
              <div className="brut-card-cabeca">
                <span className="brut-card-icone" aria-hidden="true">
                  <ShieldAlert className="h-4 w-4" />
                </span>
                <span className="brut-card-titulo grow">{j.titulo}</span>
                <button
                  type="button"
                  onClick={() => setFechadas((f) => [...f, j.id])}
                  aria-label={`Fechar ${j.titulo}`}
                  className="text-current hover:opacity-70"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <pre className="brut-card-corpo m-0 whitespace-pre-wrap font-mono text-[11px] leading-[1.7]">
                {j.linhas.join("\n")}
              </pre>
              <div className="p-3">
                <button
                  type="button"
                  onClick={aoRestaurar}
                  className="brut-btn font-mono text-[12px]"
                >
                  Restaurar o site
                </button>
              </div>
            </div>
          ) : (
            <div
              key={j.id}
              className="invasao-janela pointer-events-auto w-full overflow-hidden rounded-md border border-border-accent bg-surface"
            >
              <div className="flex items-center gap-2 border-b border-border-accent bg-surface-elevated px-3 py-1.5">
                <span className="font-mono text-[10px] text-primary">▓</span>
                <span className="grow font-mono text-[10.5px] text-muted-foreground">
                  {j.titulo}
                </span>
                <button
                  type="button"
                  onClick={() => setFechadas((f) => [...f, j.id])}
                  aria-label={`Fechar ${j.titulo}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </div>
              <pre className="whitespace-pre-wrap px-3 py-2.5 font-mono text-[11px] leading-[1.7] text-foreground">
                {j.linhas.join("\n")}
              </pre>
            </div>
          ),
        )}
      </div>

      {/* A barra. Diz o que esta acontecendo e como sair — nesta ordem. */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[95] flex justify-center px-3 pb-[calc(68px+env(safe-area-inset-bottom))] md:pb-4">
        <div className="glow-strong pointer-events-auto flex items-center gap-3 rounded-full border border-primary bg-surface px-4 py-2">
          <ShieldAlert
            className="h-3.5 w-3.5 shrink-0 text-primary"
            aria-hidden="true"
          />
          <span className="font-mono text-[10.5px] tracking-[0.12em] text-primary">
            {barraInvasao}
          </span>
          <button
            type="button"
            onClick={aoRestaurar}
            className="rounded-full border border-border-accent px-3 py-1 font-mono text-[10.5px] text-foreground hover:bg-primary/10"
          >
            restaurar
          </button>
        </div>
      </div>
    </>
  );
};

export const DefenseMode: React.FC = () => {
  const [ativo, definir] = useInvasao();
  const restaurar = useCallback(() => definir(false), [definir]);
  if (!ativo) return null;
  return <Painel aoRestaurar={restaurar} />;
};

export default DefenseMode;
