/**
 * Onde o Shizune se encaixa — os vizinhos, em português.
 *
 * Fonte: tela 18a do design (`projects/brain-launch/design/18a-shizune-evidencia-pt.page.html`
 * no Brain), que parte de `projects/brain-launch/mapa-de-vizinhos-2026-10-15.md`
 * com a ligação de cada vizinho à ameaça que ele toca, feita pela verificação de
 * 15/10. As mesmas treze linhas vivem em inglês em `vizinhos.ts` do shizune.dev.
 *
 * **Nenhuma linha tem fonte conferida ainda.** A regra (comando do Bloco B,
 * 15/10): linha sem link de fonte conferido aparece marcada como rascunho no
 * preview e não aparece em produção (`lib/publicacao.ts`). Com todas sem fonte,
 * a seção inteira some em produção, inclusive o título, que conta as linhas que
 * aparecem. Quando uma fonte for conferida, `fonte` e `lidaEm` entram aqui E no
 * shizune.dev, na mesma passada.
 */
import type { IdDegrau } from "./ficha";

export interface Vizinho {
  nome: string;
  exemplos: string;
  resolve: string;
  lacuna: string;
  conecta: string;
  degrau: IdDegrau;
  fonte: string | null;
  lidaEm: string | null;
}

export const VIZINHOS: Vizinho[] = [
  {
    nome: "Registros de decisão",
    exemplos: "MADR, adr-tools, log4brains",
    resolve: "Formato e ferramenta para escrever decisões.",
    lacuna: "“Quem decidiu” é texto declarado. Ninguém confere.",
    conecta: "Um validador lê o mesmo formato e confere a assinatura.",
    degrau: "agent-signs-for-owner",
    fonte: null,
    lidaEm: null,
  },
  {
    nome: "Decisão escrita pelo agente",
    exemplos: "AgDR",
    resolve: "O agente registra o que decidiu.",
    lacuna: "A autoria é do agente.",
    conecta: "O registro do agente vira rascunho de nível máquina; o humano assina.",
    degrau: "tampered-generated-rules",
    fonte: null,
    lidaEm: null,
  },
  {
    nome: "Portões de aprovação dos frameworks",
    exemplos: "LangGraph, OpenAI Agents SDK, Microsoft Agent Framework",
    resolve: "Pausar o agente até alguém aprovar.",
    lacuna: "A aprovação some no estado salvo, sem assinatura nem regra durável.",
    conecta: "Um adaptador transforma a aprovação em rascunho de decisão.",
    degrau: "tampered-generated-rules",
    fonte: null,
    lidaEm: null,
  },
  {
    nome: "Permissões dos agentes de código",
    exemplos: "Claude Code, Codex",
    resolve: "Perguntar antes de cada ação arriscada.",
    lacuna: "As pessoas aprovam quase tudo e detectam pouco.",
    conecta: "O humano assina a decisão e o plano, não cada clique.",
    degrau: "approval-on-autopilot",
    fonte: null,
    lidaEm: null,
  },
  {
    nome: "Buzz, da Block",
    exemplos: "workspace for humans and agents",
    resolve: "Chave por agente e portões de aprovação.",
    lacuna: "O portão registra quem aprovou, não o que foi decidido.",
    conecta: "A camada de decisão por cima da identidade.",
    degrau: "tampered-generated-rules",
    fonte: null,
    lidaEm: null,
  },
  {
    nome: "Memória de agente",
    exemplos: "mem0, cognee, Letta, agentmemory",
    resolve: "Lembrar contexto entre sessões.",
    lacuna: "Memória é derivada e não tem autoridade.",
    conecta: "O registro decide; a memória contextualiza.",
    degrau: "poisoned-index-or-memory",
    fonte: null,
    lidaEm: null,
  },
  {
    nome: "Procedência",
    exemplos: "Sigstore, in-toto, SLSA",
    resolve: "Provar de onde um artefato saiu.",
    lacuna: "Prova a origem, não a decisão.",
    conecta: "O formato in-toto para o atestado da máquina.",
    degrau: "forged-attestation",
    fonte: null,
    lidaEm: null,
  },
  {
    nome: "Identidade de agente",
    exemplos: "Entra Agent ID, SPIFFE, MCP OAuth",
    resolve: "Quem é o agente.",
    lacuna: "Não diz o que o autorizou.",
    conecta: "Identidade de vida curta no lugar da chave fixa.",
    degrau: "long-lived-leaked-key",
    fonte: null,
    lidaEm: null,
  },
  {
    nome: "Política como código",
    exemplos: "OPA, Cedar",
    resolve: "Avaliar regras em tempo de execução.",
    lacuna: "Ninguém sabe qual decisão criou a regra.",
    conecta: "Regra gerada com cabeçalho de procedência, conferida pelo verify-rules.",
    degrau: "tampered-generated-rules",
    fonte: null,
    lidaEm: null,
  },
  {
    nome: "Trilhas de auditoria de agentes",
    exemplos: "AgentTrail and others",
    resolve: "Recibo assinado do que o agente fez.",
    lacuna: "Registram a ação, não a decisão que a liberou.",
    conecta: "O Shizune fica antes: a decisão que autoriza.",
    degrau: "approval-on-autopilot",
    fonte: null,
    lidaEm: null,
  },
  {
    nome: "Ferramentas de plano e tarefa",
    exemplos: "Beads, Backlog.md, Task Master, Spec Kit",
    resolve: "Planejar e executar.",
    lacuna: "Sem histórico imutável, sem separar quem revisa, sem assinatura humana.",
    conecta: "Livro razão por eventos: só acréscimo, encadeado por hash.",
    degrau: "poisoned-index-or-memory",
    fonte: null,
    lidaEm: null,
  },
  {
    nome: "Microdecisão por modelo",
    exemplos: "Jev, Laya",
    resolve: "Decidir coisas pequenas rápido.",
    lacuna: "Categoria diferente: decidem, não provam.",
    conecta: "O nível micro, sob delegação assinada.",
    degrau: "agent-signs-for-owner",
    fonte: null,
    lidaEm: null,
  },
  {
    nome: "Regulação",
    exemplos: "EU AI Act, articles 12, 14 and 26",
    resolve: "Exige registro e supervisão humana.",
    lacuna: "Não diz o formato.",
    conecta: "Exportação da prova de supervisão.",
    degrau: "long-lived-leaked-key",
    fonte: null,
    lidaEm: null,
  },
];

export const fonteConferida = (v: Vizinho): boolean => Boolean(v.fonte && v.lidaEm);

const POR_EXTENSO = [
  "Nenhum", "Um", "Dois", "Três", "Quatro", "Cinco", "Seis", "Sete", "Oito", "Nove", "Dez",
  "Onze", "Doze", "Treze", "Catorze", "Quinze", "Dezesseis", "Dezessete", "Dezoito",
  "Dezenove", "Vinte",
];

export function contagemPorExtenso(n: number): string {
  return POR_EXTENSO[n] ?? String(n);
}
