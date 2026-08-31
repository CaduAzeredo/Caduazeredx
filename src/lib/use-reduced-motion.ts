import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Fonte única da preferência por menos movimento.
 *
 * Antes isto vivia copiado em quatro lugares, cada um lendo `matchMedia` uma
 * vez na montagem e nunca mais. Quem mudasse a preferência do sistema com o
 * site aberto continuava vendo animação até recarregar — o que é justamente a
 * situação de quem acabou de sentir enjoo e foi desligar.
 *
 * Aqui a leitura é síncrona no primeiro render (nada de piscar) e assina a
 * mudança. Fora do navegador devolve `false`, que é o padrão certo para
 * renderização no servidor.
 */
export function useReducedMotion(): boolean {
  const [reduzido, setReduzido] = useState(
    () => typeof window !== "undefined" && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(QUERY);
    const aoMudar = (e: MediaQueryListEvent) => setReduzido(e.matches);
    mq.addEventListener("change", aoMudar);
    return () => mq.removeEventListener("change", aoMudar);
  }, []);

  return reduzido;
}

export default useReducedMotion;
