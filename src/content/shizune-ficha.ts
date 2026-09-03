/**
 * A ficha de fatos do Shizune — a ÚNICA fonte da Rei.
 *
 * A Rei responde só com o que está aqui. Fora da ficha, a resposta certa é
 * "não tenho esse dado, o repositório tem" — e é isso que a torna confiável
 * em vez de vendedora. Simular conhecimento seria mentir sobre o que o site
 * faz.
 *
 * Fonte: a bíblia do Cadu (§3, lista fechada), medida em 2026-09-03. Quando a
 * bíblia e o repositório divergirem, o repositório ganha, e esta ficha é
 * corrigida no mesmo dia.
 *
 * EMBARGO: nenhum nome de repositório-alvo da rodada de diagnóstico antes de
 * 2026-09-15 — e o alvo com contribuições aceitas fica fora de material de
 * conteúdo por decisão do operador (2026-09-01), mesmo depois. O fato
 * publicável é a contagem, com os SHAs de merge.
 */
export const fichaShizune = {
  nome: "Shizune",
  nomeComposto: "Shizune — by Cadu Azeredo",
  nomeAnterior: "Brain Framework",
  oQueE:
    "Registro de decisão com autoridade: decisão numerada, com assinante e SHA, que o CI exige antes de deixar o build passar — e que prevalece sobre o que o agente lembra ou infere.",
  oQueNaoE: [
    "Não prova autoria humana: commit sem assinatura confiável reprova na fronteira — a decisão passa a ter um responsável nomeado, o que é outra coisa.",
    "Não é memória de agente: é o registro que a memória do agente obedece.",
    "Não é ferramenta de marca d'água: a marca d'água diz o que a máquina escreveu; o registro diz o que o humano decidiu.",
  ],
  licenca: "Apache-2.0",
  repositorio: "https://github.com/CaduAzeredo/shizune",
  versao: "v0.3.1",
  shaPublicado: "0ccfe4f",
  publicadaEm: "2026-09-03",
  medidoEm: "2026-09-03",
  decisoes: 16,
  commitsAssinados:
    "todos desde a fronteira de autoria (19 de 19 em 2026-09-03)",
  verificadores: 9,
  arquivosNoPacote: 66,
  ciNoShaPublicado: "6 check runs, todos verdes — Node 20, Node 22 e Bun",
  diagnostico: {
    sha: "c248f75",
    achados: 5,
    fechados: 4,
    abertos: 1,
    oAberto:
      "o apex shizune.dev falha o TLS (www responde normalmente) — não é defeito de código, e vai citado sempre",
  },
  contribuicoesAceitas:
    "2 contribuições aceitas em repositório externo (merges ae1ef03 e 0ef321b). O nome do repositório fica fora de material público — divulgação responsável.",
  requisitos:
    "Bun ou Node 20+. Zero dependências: os scripts usam só builtins.",
} as const;

/** O que a Rei diz quando a pergunta sai da ficha. */
export const foraDaFicha =
  "Não tenho esse dado aqui — e inventar seria o defeito que o Shizune denuncia. O repositório tem: cada número de lá vem com o comando que o reproduz.";
