/**
 * Os seis degraus do roadmap do Shizune, em português.
 *
 * Fonte: tela 18b do design (`projects/brain-launch/design/18b-shizune-roadmap-pt.page.html`
 * no Brain) e a DEC-025, que fixa os seis ids e os nomes em inglês e em
 * português. **Os nomes só mudam por decisão assinada.** O estado de cada degrau
 * vem da ficha da release (`ficha.ts`) — a mesma do shizune.dev e do livro razão.
 */
import { estadoDoDegrau, type EstadoDegrau, type IdDegrau } from "./ficha";

/**
 * Um item que nomeia fornecedor de IA (empresa que vende modelo ou agente, ou
 * produto dela). Decisão do operador, 15/10, 13h47: fica como rascunho — no
 * preview aparece marcado, em produção não aparece — até a fonte ser conferida.
 * O texto não muda. Plataforma, protocolo e projeto aberto (GitHub, MCP,
 * in-toto, Cedar, Sigstore, SPIFFE) não entram nesse critério. A mesma marcação
 * vale no `degraus.ts` do shizune.dev.
 */
export interface ItemComFornecedor {
  texto: string;
  fornecedor: true;
}
export type ItemQueFecha = string | ItemComFornecedor;

export const textoDoItem = (i: ItemQueFecha): string => (typeof i === "string" ? i : i.texto);
export const itemConferido = (i: ItemQueFecha): boolean => typeof i === "string";

export interface Degrau {
  id: IdDegrau;
  nome: string;
  ameaca: string;
  fecha: ItemQueFecha[];
  prova: string;
}

export const DEGRAUS: Degrau[] = [
  {
    id: "agent-signs-for-owner",
    nome: "Agente assina pelo dono",
    ameaca: "Um agente faz o merge, ou assina no lugar do dono.",
    fecha: [
      "Merge como assinatura, desligado por padrão: só onde a instância declara e mediu, conferindo que quem fez o merge é humano e não o agente",
      "Guia para medir a credencial do executor",
      "Campo de garantia calculado: chave ou plataforma",
      "Níveis N0, N1 e N2, com autorizado_por",
      "O resumo do doctor deixa de contar n/a como aprovado",
      "Guia da chave de máquina e procedimento para chave vazada",
    ],
    prova:
      "Teste público da matriz assinatura × método de merge × autor, e um caderno de evidências.",
  },
  {
    id: "poisoned-index-or-memory",
    nome: "Índice ou memória envenenados",
    ameaca: "Injeção ou adulteração pelo que o agente lê.",
    fecha: [
      "Camada de leitura com hash por entrada e ordem estável",
      "Validade das decisões e grafo de substituição",
      "Medição reproduzível e releases assinadas",
      "Lint contra instrução escondida em documento",
      "Vetores de conformidade do formato (se aprovado)",
    ],
    prova:
      "Os primeiros números da medição, com o comando ao lado. Nenhum ganho de tokens afirmado antes de medir.",
  },
  {
    id: "forged-attestation",
    nome: "Atestado forjado",
    ameaca: "Um atestado de máquina falso, ou um ponteiro que não aponta para nada.",
    fecha: [
      "Atestado de máquina sobre o índice e a projeção do livro, em in-toto",
      "Teste A/B com modelo pequeno, dados brutos publicados",
    ],
    prova:
      "Um terceiro verifica o atestado com um comando; o resultado do A/B com o tamanho da amostra.",
  },
  {
    id: "tampered-generated-rules",
    nome: "Regra gerada adulterada",
    ameaca:
      "Uma regra gerada que muda depois da decisão, ou um servidor de ferramentas malicioso.",
    fecha: [
      "Federação entre registros, fixada por hash",
      "Gerador de regras (Cedar primeiro) com cabeçalho de procedência e verify-rules",
      {
        texto:
          "Adaptadores que transformam aprovações de LangGraph, OpenAI Agents SDK e Microsoft Agent Framework em rascunho",
        fornecedor: true,
      },
      "Servidor MCP só de leitura",
      "GitHub Action e pre-commit (se aprovado)",
    ],
    prova:
      "O verify-rules reprovando uma regra adulterada, numa demonstração com o comando.",
  },
  {
    id: "approval-on-autopilot",
    nome: "Aprovação no automático",
    ameaca: "Autoaprovação, conluio, aprovar sem ler.",
    fecha: [
      "Quórum N-de-M e delegação com validade",
      "Auditoria de quem propôs contra quem aprovou",
      "Limites contra a fadiga de aprovação",
    ],
    prova: "Relatório de separação de funções gerado sobre o próprio repositório.",
  },
  {
    id: "long-lived-leaked-key",
    nome: "Chave vazada de longa duração",
    ameaca: "Uma chave de assinatura que vaza e continua valendo.",
    fecha: [
      { texto: "Identidade por Sigstore OIDC, Entra ou SPIFFE: chaves de vida curta", fornecedor: true },
      "Exportação para auditoria",
      "Garantia de compatibilidade do formato",
    ],
    prova: "Revisão independente publicada e modelo de ameaças versionado.",
  },
];

export function nomeDoDegrau(id: IdDegrau): string {
  const d = DEGRAUS.find((x) => x.id === id);
  if (!d) throw new Error(`degrau desconhecido: ${id}`);
  return d.nome;
}

/** O degrau em andamento, pela ficha — o selo "agora: ‹degrau›" dos cartões. */
export function degrauAtual(): Degrau | undefined {
  return DEGRAUS.find((d) => estadoDoDegrau(d.id) === "now");
}

/** A forma diz o estado sem depender da cor. */
export const ROTULO_DO_ESTADO: Record<EstadoDegrau, string> = {
  done: "● feito",
  now: "◐ agora",
  todo: "○ a fazer",
  blocked: "◆ travado",
};
