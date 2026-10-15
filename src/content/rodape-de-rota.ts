/**
 * A marca de produto que aparece no rodapé, por rota.
 *
 * Existe para que nenhuma página desenhe rodapé próprio. A do Shizune desenhava
 * uma faixa de marca acima do rodapé do site, e o fim da página empilhava dois
 * fechos seguidos. Agora há um só: o rodapé global lê este mapa e, se a rota
 * atual tiver uma marca, mostra uma linha antes da linha legal.
 *
 * **É o padrão para todas as páginas de produto, aqui e nos outros sites.**
 * Produto novo entra como uma chave nova neste arquivo — nome, meta e uma nota.
 * Não se acrescenta rodapé, não se acrescenta seção de encerramento, e o rodapé
 * continua sendo um só em todas as rotas.
 *
 * O que saiu na troca de 15/10: o `segmento` (o que ia depois da barra do
 * lockup antigo, `>_ Cadu Azeredo / shizune`) e o `glifo`, que ninguém lia. O
 * lockup antigo saiu do site; até a assinatura nova existir, o nome vai em
 * texto.
 *
 * Sem DCO na meta: o design de 15/10 a escreve, mas o pacote público não
 * menciona DCO em lugar nenhum — o rodapé não afirma o que o repositório não
 * diz. A mesma decisão vale no shizune.dev.
 */
export interface MarcaDeRota {
  /** Forma composta da marca. Regra do ADR-044: onde couber a linha inteira. */
  nome: string;
  /** Licença e o que mais couber em uma linha curta, separado por ponto médio. */
  meta: string;
  /** Uma nota, e uma só. O resto vive no LICENSE e no NOTICE do repositório. */
  nota: string;
}

const SHIZUNE: MarcaDeRota = {
  nome: "Shizune — by Cadu Azeredo",
  meta: "Apache-2.0 · 静音 som quieto",
  // A nota NÃO repete o nome composto: ele está na mesma linha, três palavras
  // antes.
  nota: "Fork é livre sob a licença, mas não usa o nome composto.",
};

export const marcasDeRota: Record<string, MarcaDeRota> = {
  "/shizune": SHIZUNE,
  "/shizune/roadmap": SHIZUNE,
  "/shizune/evidencia": SHIZUNE,
};
