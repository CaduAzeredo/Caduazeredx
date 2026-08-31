import { useCallback, useEffect, useSyncExternalStore } from "react";
import { COMANDOS_INVASAO } from "@/content/invasao";

/**
 * Estado do modo de defesa — o easter egg.
 *
 * Vive fora do React de propósito: quem **dispara** é o console da Rei e quem
 * **desenha** é um componente no topo da aplicação, e os dois não se conhecem.
 * Um contexto novo só para isto obrigaria a envolver a árvore inteira num
 * provedor por causa de uma brincadeira.
 *
 * Duas decisões que valem escrever:
 *
 * 1. **Sobrevive à navegação, não ao navegador.** Fica em `sessionStorage`: se
 *    a pessoa abrir outra página do site, o vermelho continua — a ficção não
 *    quebra ao clicar num link. Mas fechar a aba desfaz tudo, e nunca há um
 *    estado estranho que a pessoa não saiba desfazer.
 * 2. **Nunca é uma armadilha.** Existe sempre um botão visível de restaurar, o
 *    Escape sai, e nada é escondido enquanto está ativo. Um easter egg que
 *    prende quem entrou nele não é engraçado: é um defeito com piada em cima.
 */

const CHAVE = "cadu.invadido";
const COR_NORMAL = "#0A0E10";
const COR_DEFESA = "#120809";

type Ouvinte = (v: boolean) => void;
const ouvintes = new Set<Ouvinte>();
let ativo = false;

function lerGuardado(): boolean {
  try {
    return sessionStorage.getItem(CHAVE) === "1";
  } catch {
    return false;
  }
}

function aplicar(v: boolean) {
  const raiz = document.documentElement;
  if (v) raiz.setAttribute("data-invadido", "1");
  else raiz.removeAttribute("data-invadido");

  // A barra do navegador no celular. É o que faz o "painel inteiro" incluir o
  // aparelho, e não só a página.
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", v ? COR_DEFESA : COR_NORMAL);

  try {
    if (v) sessionStorage.setItem(CHAVE, "1");
    else sessionStorage.removeItem(CHAVE);
  } catch {
    /* sem armazenamento: vale só nesta página, e tudo bem */
  }
}

/**
 * Inscrição para o `useSyncExternalStore`. Precisa ser uma referência estável:
 * uma função nova a cada renderização faria o React reinscrever sem parar.
 */
function inscrever(aoMudar: () => void): () => void {
  const o: Ouvinte = () => aoMudar();
  ouvintes.add(o);
  return () => {
    ouvintes.delete(o);
  };
}

/** Liga ou desliga o modo de defesa, de qualquer lugar da aplicação. */
export function definirInvasao(v: boolean): void {
  if (ativo === v) return;
  ativo = v;
  aplicar(v);
  for (const o of ouvintes) o(v);
}

/** Se o texto digitado é um comando de invasão. */
export function ehComandoDeInvasao(texto: string): boolean {
  const t = texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
  return COMANDOS_INVASAO.some((c) => t === c || t.includes(c));
}

export function useInvasao(): [boolean, (v: boolean) => void] {
  // `useSyncExternalStore` existe exatamente para isto: um estado que mora
  // fora do React e que a interface precisa acompanhar. Sem ele, a alternativa
  // era `setState` dentro de um efeito — que o React em modo concorrente pode
  // rodar mais de uma vez, e que o lint proíbe com razão.
  const v = useSyncExternalStore(
    inscrever,
    () => ativo,
    () => false, // no servidor, nunca invadido
  );

  // O estado guardado é restaurado uma vez, e por fora do React: `definirInvasao`
  // avisa os inscritos, então a interface acompanha sem ninguém chamar setState.
  useEffect(() => {
    if (!ativo && lerGuardado()) definirInvasao(true);
  }, []);

  return [v, useCallback((n: boolean) => definirInvasao(n), [])];
}

export default useInvasao;
