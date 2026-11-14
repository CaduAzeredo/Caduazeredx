# Produto — caduazeredo.com

"Eu comecei. Vamos começar?" O site do Cadu Azeredo mostra os canais, vende specs e abre o Círculo, tudo construído em público. A versão anterior (portfólio + Shizune) está em `docs/v4/PRODUCT.md`.

## Páginas

| Rota | O que tem |
| --- | --- |
| `/` | céu que muda com a hora (clicar no relógio troca), atalhos, canais oficiais, minha rede de canais (borrada até cada vídeo revelar), primeiro vídeo, 3 specs |
| `/canal` | vídeos do canal lidos de `public/dados/cadu.json` (gerado pelo painel) e números públicos do YouTube pela função `/api/canal` |
| `/specs` | o comercial, as 13 specs (6 de formato e 7 de cinema), pacotes e extras |
| `/dempa` | Pasta DEMPA: wallpapers grátis em troca de e-mail, leia-me e a pasta oculta `.bastidores` |
| `/comunidade` | parte aberta (grupo, mural, posts) e o Círculo (parte paga) |
| `/dev` | projetos e "Como este site foi feito" (aparece no EP 01) |
| `/privacidade`, `/termos` | textos legais com o nome legal por extenso |
| qualquer outra | página 404 ("Essa página foi extinta") |

## Specs (lançamento)

| Spec | Preço |
| --- | --- |
| Short em 2D | R$ 47 |
| Dossiê investigativo | R$ 67 |
| Checagem de roteiro | R$ 27 |
| Narração com tela | R$ 47 |
| Miniatura e título | R$ 27 |
| Cortes em Shorts | R$ 37 |

Pacotes: Shorts R$ 77 · Vídeo longo R$ 97 · Cadeia de cinema R$ 97 · Todas as 13 R$ 197 (recomendado). Preços de lançamento aprovados pelo Cadu em 10/11; sobem conforme precisar, sem data fixa.
Extras: Guia do nicho R$ 19 · Kit visual R$ 17 · Banco de temas R$ 27.

## Círculo (nome provisório)

Preço único, 12 meses de acesso, até 12x na Kiwify, vendido por **turmas com data** (decisão de 14/11/2026): cada turma tem 10 vagas e uma data para fechar. Depois da data, a próxima turma abre mais cara. O preço fica travado para quem já entrou.

| Turma | Preço | Fecha |
|---|---|---|
| 01 | R$ 397 | 31/12/2026 |
| 02 | R$ 497 (borrado no site) | a definir |
| 03 | R$ 597 (borrado) | a definir |

Só na turma 01: WhatsApp pessoal do Cadu para as 10 vagas. As próximas turmas ficam recolhidas na página ("Como as próximas turmas funcionam").

Dentro: painel com os números dos canais, vídeos só para o Círculo, todas as specs (inclusive as novas), auditoria do canal do membro, grupo de troca e os bônus.

## Pilha

Cloudflare Pages (grátis, permite uso comercial) · Kiwify (pagamento e entrega) · Formspree (listas de espera; Brevo depois) · sem banco de dados por enquanto.

## Próximas versões

- **v1.1**: botões de compra ligados à Kiwify, página `/obrigado`, quiz enviando o e-book pelo Brevo.
- **v1.2**: números dos canais pela API do YouTube; login do Círculo (até lá, a área de membros é a da Kiwify).
