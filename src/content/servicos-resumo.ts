import type { ServicoResumo } from "@/types";

/**
 * O cartão de visita de cada serviço: slug, nome e a frase que diz para quem é.
 *
 * Vive separado de `services.ts` por um motivo de peso, não de organização: a
 * home mostra só estes três campos, e importar o arquivo completo levava para o
 * caminho crítico o escopo, o entregável e o fora-do-escopo de quatro serviços
 * — texto que só a página de produtos lê.
 *
 * `services.ts` deriva daqui, então nome e resumo têm uma fonte só e não podem
 * divergir.
 */
export const servicosResumo: ServicoResumo[] = [
  {
    slug: "auditoria",
    nome: "Auditoria técnica",
    resumo:
      "Você herdou uma base de código, ou ela cresceu rápido demais, e precisa saber o que realmente tem antes de decidir qualquer coisa.",
  },
  {
    // Era "Implantação do Brain": o nome público do método é Shizune desde
    // 2026-09-03, e a tela 15 do design de 15/10 fechou o texto.
    slug: "implantacao",
    nome: "Implantação do Shizune",
    resumo:
      "O registro de decisão rodando no seu repositório, com a primeira rodada conduzida junto, para o processo continuar depois que a consultoria sai.",
  },
  {
    slug: "criacao",
    nome: "Criação de projeto do zero",
    resumo:
      "Um projeto novo nascendo já governado: do primeiro levantamento de contexto ao código entregue.",
  },
  {
    slug: "acompanhamento",
    nome: "Acompanhamento do time",
    resumo:
      "Seu time operando o método por conta, com revisão periódica de quem já rodou isso em produção.",
  },
];
