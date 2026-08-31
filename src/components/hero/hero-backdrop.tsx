import React, { useEffect, useState } from "react";
import CodeRain from "@/components/background/code-rain";
import { useCapability } from "@/lib/use-capability";

export type EstadoCena = "decidindo" | "leve" | "carregando" | "pronta";

/**
 * O fundo do hero, nas duas versões.
 *
 * Quem passa pelo portão de capacidade recebe o campo de partículas em WebGL.
 * Todo o resto — sem WebGL, aparelho modesto, celular, economia de dados,
 * bateria fraca, movimento reduzido — recebe a chuva em CSS que já está no ar
 * e já foi testada.
 *
 * A versão leve **não é um consolo**: ela desenha primeiro, sempre, e continua
 * embaixo enquanto a pesada carrega. Se o módulo falhar em chegar, ninguém vê
 * buraco — vê a página que estava lá ontem.
 *
 * O import é manual em vez de `React.lazy` de propósito: a tela de boot precisa
 * saber *quando* o módulo chegou e *quando* o primeiro quadro desenhou, e o
 * Suspense não conta isso para ninguém.
 */
export const HeroBackdrop: React.FC<{
  onEstado?: (e: EstadoCena) => void;
}> = ({ onEstado }) => {
  const cap = useCapability();
  const [Cena, setCena] = useState<React.ComponentType<{
    onPronto?: () => void;
  }> | null>(null);
  const [pronta, setPronta] = useState(false);

  // Avisa quem estiver ouvindo — a tela de boot — em que pé isto está.
  useEffect(() => {
    if (!cap.cena) return onEstado?.("leve");
    onEstado?.(pronta ? "pronta" : "carregando");
  }, [cap.cena, pronta, onEstado]);

  useEffect(() => {
    if (!cap.cena) return;
    let vivo = true;

    import("@/components/hero/hero-scene")
      .then((m) => {
        if (vivo) setCena(() => m.default);
      })
      .catch(() => {
        // Rede caiu no meio, ou o pedaço não existe no servidor. A chuva em
        // CSS já está desenhada por baixo; não há nada a consertar aqui.
        if (vivo) setPronta(true);
      });

    return () => {
      vivo = false;
    };
  }, [cap.decidido, cap.cena]);

  return (
    <>
      {/* A leve sai de cena quando a pesada assume, mas continua no DOM: se o
          contexto WebGL for perdido, ela reaparece sem recarregar nada. */}
      <div
        className="absolute inset-0"
        style={{ opacity: pronta ? 0 : 1, transition: "opacity 900ms ease" }}
      >
        <CodeRain />
      </div>

      {Cena && (
        <div
          className="absolute inset-0"
          style={{ opacity: pronta ? 1 : 0, transition: "opacity 900ms ease" }}
        >
          <Cena onPronto={() => setPronta(true)} />
        </div>
      )}
    </>
  );
};

export default HeroBackdrop;
