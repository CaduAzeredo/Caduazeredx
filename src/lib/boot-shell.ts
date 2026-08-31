/**
 * Ponte para a casca de boot que vive no `index.html`.
 *
 * A tela de carregamento **não é um componente React** — e isso é o ponto, não
 * um detalhe. Ela é HTML e CSS embutidos no documento, desenhados no primeiro
 * quadro, antes dos ~106 KB da aplicação existirem. Uma versão em React só
 * apareceria depois que o pacote inteiro tivesse baixado e montado: ou seja,
 * exatamente quando não há mais nada para cobrir.
 *
 * Foi assim na primeira tentativa, e o resultado foi uma tela de carregamento
 * que praticamente nunca aparecia. Por isso ela desceu para o documento, e a
 * aplicação passou a apenas *reportar* o que já concluiu.
 *
 * As etapas são reais — cada uma corresponde a uma promessa que resolveu de
 * fato — e a barra reflete etapas concluídas, nunca tempo decorrido.
 */

export type EtapaBoot = "css" | "fontes" | "app" | "cena";

interface CascaBoot {
  marcar: (id: EtapaBoot) => void;
  encerrar: () => void;
  ativa: () => boolean;
}

function casca(): CascaBoot | null {
  if (typeof window === "undefined") return null;
  return (window as unknown as { __boot?: CascaBoot }).__boot ?? null;
}

/** Marca uma etapa como concluída. Silencioso se a casca já saiu. */
export function marcarBoot(id: EtapaBoot): void {
  casca()?.marcar(id);
}

/** Fecha a casca. Chamar de novo não faz nada. */
export function encerrarBoot(): void {
  casca()?.encerrar();
}

/** Se ainda há casca na tela — usado para não disputar o foco com ela. */
export function bootAtiva(): boolean {
  return casca()?.ativa() ?? false;
}
