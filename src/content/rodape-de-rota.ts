/**
 * A marca de produto que aparece no rodapé, por rota.
 *
 * Existe para que nenhuma página desenhe rodapé próprio. A do Shizune desenhava
 * uma faixa de marca acima do rodapé do site, e o fim da página empilhava dois
 * fechos seguidos. Agora há um só: o rodapé global lê este mapa e, se a rota
 * atual tiver uma marca, mostra uma linha antes da linha legal.
 *
 * **É o padrão para todas as páginas de produto, aqui e nos outros sites.**
 * Produto novo entra como uma chave nova neste arquivo — nome, glifo, meta e
 * uma nota. Não se acrescenta rodapé, não se acrescenta seção de encerramento,
 * e o rodapé continua sendo um só em todas as rotas.
 *
 * O `glifo` é o traçado do símbolo em SVG. Path é dado, não marcação: guardá-lo
 * aqui evita que o rodapé importe um componente de dentro de uma página, que é
 * a dependência ao contrário.
 */
export interface MarcaDeRota {
  /**
   * O que vai DEPOIS da barra do lockup: `>_ Cadu Azeredo / shizune`.
   *
   * A barra sempre esteve lá e nunca teve o que separar — o lockup era um
   * shell parado na raiz. Com o segmento ele passa a dizer onde a pessoa está,
   * que é o que uma barra faz. Quando o produto ganhar rota própria, muda aqui
   * e em nenhum outro lugar.
   */
  segmento: string;
  /** Forma composta da marca. Regra do ADR-044: onde couber a linha inteira. */
  nome: string;
  /** Licença e o que mais couber em uma linha curta, separado por ponto médio. */
  meta: string;
  /** Uma nota, e uma só. O resto vive no LICENSE e no NOTICE do repositório. */
  nota: string;
  /** Traçado do símbolo, em viewBox 0 0 24 24. Duas linhas: a onda e a reta. */
  glifo: { onda: string; linha: string };
}

export const marcasDeRota: Record<string, MarcaDeRota> = {
  "/shizune": {
    segmento: "shizune",
    nome: "Shizune — by Cadu Azeredo",
    meta: "Apache-2.0 · 静音 som quieto",
    // A nota NÃO repete o nome composto: ele está na mesma linha, três palavras
    // antes. A versão anterior o escrevia de novo aqui e o rodapé acabava com o
    // nome do operador três vezes no mesmo palmo de tela.
    nota: "Fork é livre sob a licença, mas não usa o nome composto.",
    glifo: {
      onda: "M2 12c2.6 0 2.6-7 5.2-7s2.6 14 5.2 14 2.6-7 5.2-7 2.6 3.5 4.4 3.5",
      linha: "M2 12h20",
    },
  },
};
