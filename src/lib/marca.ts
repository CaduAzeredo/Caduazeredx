/**
 * A marca do Cadu — a logo em linha e a assinatura do kit (15/10) — tingida
 * pela página, sem mudar o desenho.
 *
 * O arquivo do kit vive em `public/brand/`, byte a byte igual ao original, e é
 * ele que a página busca. Esta função só troca as duas tintas:
 *
 * - o texto (`#edf2ef`) passa a `currentColor`, e herda a cor do lugar;
 * - o quadradinho (`#3fa372`) passa à classe `marca-detalhe`, que o CSS pinta
 *   com `--tinta`: verde no modo Dev, azul no Empresa, âmbar em /shizune.
 *
 * Nada mais muda: nem um caminho, nem o `viewBox`, nem o manifesto de
 * procedência (C2PA) que o arquivo carrega — ele continua no DOM. Por isso o
 * SVG não foi colado dentro de um componente: colado, o desenho entraria no
 * pacote de todas as páginas (cerca de 5 KB comprimidos só a logo, acima do
 * teto do primeiro desenho) e a credencial de procedência ficaria para trás.
 *
 * Módulo puro de propósito, para `scripts/test-marca.mjs` o carregar direto,
 * sem o empacotador.
 */

export type PecaDaMarca = "linha" | "assinatura";

export const MARCA: Record<PecaDaMarca, { arquivo: string; largura: number; altura: number; rotulo: string }> = {
  linha: { arquivo: "/brand/cadu-azeredo-linha.svg", largura: 427, altura: 86, rotulo: "Cadu Azeredo" },
  assinatura: {
    arquivo: "/brand/cadu-azeredo-assinatura.svg",
    largura: 483,
    altura: 160,
    rotulo: "Assinatura de Cadu Azeredo",
  },
};

const TEXTO = /fill="#edf2ef"/gi;
const DETALHE = /fill="#3fa372"/gi;

/** Recusa o que não for um SVG de desenho: a página injeta o arquivo no DOM. */
export function tingir(svg: string): string {
  if (!/^\s*<svg[\s>]/.test(svg)) throw new Error("o arquivo da marca não é um SVG");
  if (/<script[\s>]|<foreignObject[\s>]|\son[a-z]+\s*=|javascript:/i.test(svg)) {
    throw new Error("o SVG da marca tem conteúdo executável: recusado");
  }
  return svg.replace(TEXTO, 'fill="currentColor"').replace(DETALHE, 'class="marca-detalhe"');
}

/** Os `d` de todos os caminhos, na ordem do arquivo. */
export function caminhos(svg: string): string[] {
  return [...svg.matchAll(/\sd="([^"]*)"/g)].map((m) => m[1]);
}
