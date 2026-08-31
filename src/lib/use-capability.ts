import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Portão de capacidade — quem recebe a cena pesada e quem não recebe.
 *
 * A falha clássica de site premiado é exatamente esta: uma cena WebGL bonita
 * que trava o celular de quem estava tentando contratar. A cena é enfeite; a
 * página é o produto. Então o padrão é NÃO carregar, e a cena só entra quando
 * o aparelho comprovadamente aguenta.
 *
 * A versão leve — a chuva em CSS que já está no ar e já foi testada — não é um
 * consolo: é o desenho principal para todo mundo que cai fora daqui, e continua
 * bonita sozinha.
 *
 * **A decisão é síncrona.** Tudo o que decide — preferência de movimento,
 * memória, núcleos, ponteiro, economia de dados, WebGL2 — está disponível na
 * primeira renderização, então não há um instante de "decidindo" em que a
 * página apareça de um jeito e troque no seguinte. A bateria é a única
 * informação assíncrona, e ela só sabe **rebaixar**: começa liberada e desliga
 * a cena se o aparelho estiver abaixo de 20% fora da tomada.
 */

export interface Capacidade {
  /** A cena pesada pode rodar. */
  cena: boolean;
  /** Mantido por compatibilidade de leitura: a decisão nunca fica pendente. */
  decidido: boolean;
}

function suportaWebGL2(): boolean {
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2", { failIfMajorPerformanceCaveat: true });
    if (!gl) return false;
    // Devolve o contexto em vez de deixá-lo pendurado: navegadores limitam
    // quantos vivem ao mesmo tempo, e este era só um teste.
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

function aparelhoModesto(): boolean {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };

  // Economia de dados é pedido explícito de quem navega. Respeita-se.
  if (nav.connection?.saveData) return true;
  const tipo = nav.connection?.effectiveType;
  if (tipo === "slow-2g" || tipo === "2g" || tipo === "3g") return true;

  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) return true;
  if (
    typeof nav.hardwareConcurrency === "number" &&
    nav.hardwareConcurrency < 4
  ) {
    return true;
  }

  // Tela pequena com ponteiro grosso é celular. O plano diz, com todas as
  // letras, que o caminho móvel não paga pela cena.
  if (
    window.matchMedia("(pointer: coarse)").matches &&
    window.innerWidth < 1024
  ) {
    return true;
  }

  return false;
}

export function useCapability(): Capacidade {
  const semMovimento = useReducedMotion();
  const [bateriaFraca, setBateriaFraca] = useState(false);

  const apta = useMemo(() => {
    if (typeof window === "undefined") return false;
    if (semMovimento) return false;
    if (aparelhoModesto()) return false;
    return suportaWebGL2();
  }, [semMovimento]);

  useEffect(() => {
    if (!apta) return;

    const obter = (
      navigator as Navigator & {
        getBattery?: () => Promise<{ level: number; charging: boolean }>;
      }
    ).getBattery;
    if (typeof obter !== "function") return;

    let vivo = true;
    obter
      .call(navigator)
      .then((b) => {
        if (vivo && b.level < 0.2 && !b.charging) setBateriaFraca(true);
      })
      .catch(() => {
        // API indisponível ou bloqueada. Segue liberada: não é motivo para
        // rebaixar quem não deu sinal de estar em apuros.
      });

    return () => {
      vivo = false;
    };
  }, [apta]);

  return { cena: apta && !bateriaFraca, decidido: true };
}

export default useCapability;
