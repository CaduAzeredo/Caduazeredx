/**
 * A estrutura real do repositório público do Shizune (antes Brain Framework —
 * o repositório foi renomeado para `github.com/CaduAzeredo/shizune` no rebrand
 * de 2026-09-03; os nomes de pasta não mudaram).
 *
 * Os nomes são os verdadeiros, conferidos contra o repositório público. Isto
 * importa: a peça existe para
 * mostrar como o framework é organizado, e inventar uma pasta bonita que não
 * existe transformaria a ilustração em propaganda.
 *
 * A ordem é a de leitura, de cima para baixo na pilha: o que governa primeiro,
 * o que é gerado por último.
 */

export interface CamadaBrain {
  pasta: string;
  papel: string;
  /** O que existe dentro, em uma frase — aparece quando a pilha se abre. */
  dentro: string;
}

export const camadasBrain: CamadaBrain[] = [
  {
    pasta: "governance/",
    papel: "decisões e regras, datadas",
    dentro:
      "ADRs numerados e nunca renumerados. Nada é apagado: o que é superado vai para archive/ com o motivo escrito.",
  },
  {
    pasta: "projects/",
    papel: "contexto canônico por projeto",
    dentro:
      "Um CONTEXT.md por projeto é a fonte única. O agente lê antes de agir, em vez de inferir do código e errar.",
  },
  {
    pasta: "skills/",
    papel: "o pipeline que o agente segue",
    dentro:
      "Da ideia ao código entregue por uma sequência nomeada — grill-with-docs, domain-modeling, to-spec, implement, handoff — e não por improviso.",
  },
  {
    pasta: "logs/",
    papel: "registro imutável do que houve",
    dentro:
      "Datado no nome do arquivo e nunca reescrito. É o que permite perguntar 'o que aconteceu no dia X' sem depender da memória de ninguém.",
  },
  {
    pasta: "scripts/",
    papel: "os validadores do gate",
    dentro:
      "Estrutura, metadados, links e vazamento de segredo. A governança é checável, não aspiracional: o comando reprova quando está errado.",
  },
  {
    pasta: "templates/",
    papel: "o formato que todo documento nasce",
    dentro:
      "Frontmatter obrigatório com id, tipo, projeto, status, data e autor. É o que faz o validador conseguir verificar qualquer documento novo.",
  },
];
