import type { Service, ServiceStep } from "@/types";
import { servicosResumo } from "@/content/servicos-resumo";

const r = Object.fromEntries(servicosResumo.map((s) => [s.slug, s]));

/**
 * Oferta de consultoria.
 *
 * Origem desta definição: `projects/brain-launch/specs/spec-001-oferta-comercial-v1.md`
 * no repositório de governança. A oferta nasce lá e este arquivo a reflete — não o
 * contrário. Mudou o escopo de um serviço? A spec muda primeiro.
 *
 * Nenhum preço aparece aqui, e isso é decisão, não omissão: as faixas registradas
 * na governança seguem marcadas como hipótese não validada. Publicar um número que
 * ninguém mediu ancora o mercado num valor inventado, e desancorar depois custa mais
 * caro do que descobrir o número certo nas primeiras conversas.
 */

export const services: Service[] = [
  {
    ...r["auditoria"],
    paraQuem: [
      "Quem assumiu um sistema que outra pessoa construiu e não confia no que está documentado.",
      "Quem vai lançar e quer saber o que quebra antes que o usuário descubra.",
      "Quem precisa levar a um sócio, investidor ou cliente um retrato honesto do estado técnico.",
    ],
    entregavel: [
      "Relatório imutável com metodologia, escopo e limites declarados — o que foi olhado e, principalmente, o que não foi.",
      "Achados com referência arquivo:linha e veredito explícito: Confirmado, Parcial ou Refutado.",
      "As hipóteses que caíram, escritas. Saber o que não é problema vale tanto quanto saber o que é.",
      "Backlog priorizado em specs e tickets, pronto para execução por quem for.",
    ],
    foraDoEscopo: [
      "Correção do que for encontrado — isso é trabalho separado, decidido depois de você ver o retrato.",
      "Acesso a produção. A auditoria é somente leitura, e qualquer comando que escreva passa por autorização sua, caso a caso.",
    ],
    duracaoTipica: "Uma rodada fechada, com data de início e de entrega combinadas antes de começar.",
    status: "disponivel",
  },
  {
    ...r["implantacao"],
    paraQuem: [
      "Times que já usam agentes de codificação e cansaram de cada sessão reinventar o contexto.",
      "Quem quer manter o método funcionando sozinho, sem depender de quem instalou.",
      "Consultorias e agências que precisam de um entregável padronizado que se repete entre clientes.",
    ],
    entregavel: [
      "O Brain instalado e adaptado ao seu repositório: contexto canônico por projeto, registro de decisões, pipeline de skills e validadores rodando na sua integração contínua.",
      "Uma rodada completa conduzida em conjunto, do levantamento de contexto até o handoff — treinando pelo uso, não por slide.",
      "As regras de escrita e as travas de segurança calibradas para o seu caso, incluindo o que nunca pode sair do repositório.",
      "Handoff formal: o que ficou pronto, o que ficou aberto e o que decidir em seguida.",
    ],
    foraDoEscopo: [
      "Escrever o produto por você. A implantação instala o método e conduz uma rodada; o volume seguinte é do seu time ou de outra contratação.",
    ],
    duracaoTipica: "Algumas semanas, terminando num handoff — não num acesso permanente.",
    status: "disponivel",
  },
  {
    ...r["criacao"],
    paraQuem: [
      "Quem vai começar um produto e não quer descobrir daqui a um ano por que cada decisão foi tomada.",
      "Quem já tentou tocar um projeto com agente de IA e viu o contexto se perder entre uma sessão e outra.",
      "Quem prefere pagar organização no começo, quando ela é barata, em vez de auditoria depois, quando não é.",
    ],
    entregavel: [
      "Contexto e domínio do projeto levantados por entrevista, não por suposição — com as lacunas nomeadas em vez de preenchidas por palpite.",
      "Especificações com critérios de aceitação verificáveis antes de existir código.",
      "Implementação em incrementos fechados: uma funcionalidade por vez, testada, com o diário de execução registrando cada desvio e o motivo.",
      "O repositório entregue com a governança já dentro — decisões registradas, validadores rodando, handoff pronto para o próximo executor.",
    ],
    foraDoEscopo: [
      "Design de interface e identidade visual, salvo se combinados à parte.",
      "Operação e suporte contínuo depois da entrega.",
    ],
    duracaoTipica: "Definida junto com o escopo, em rodadas fechadas com entrega verificável em cada uma.",
    status: "disponivel",
  },
  {
    ...r["acompanhamento"],
    paraQuem: [
      "Times que já implantaram e querem calibrar a prática antes que ela vire ritual vazio.",
      "Quem quer subir o nível de quem já escreve código, sem parar a entrega para treinar.",
    ],
    entregavel: [
      "Revisão periódica dos artefatos que o time produziu — contexto, specs, tickets e handoffs — com correção de rota por escrito.",
      "Ajuste das regras e das travas conforme o time e o produto mudam.",
    ],
    foraDoEscopo: [
      "Execução do backlog. O acompanhamento revisa e corrige o método; quem entrega é o seu time.",
    ],
    duracaoTipica: "Recorrente, com cadência combinada e saída livre.",
    status: "disponivel",
  },
];

/**
 * O fluxo é o mesmo para qualquer um dos serviços acima. Está escrito porque a
 * pergunta que todo mundo faz antes de mandar mensagem é "e aí, como funciona?" —
 * e um funil que não responde isso perde a conversa antes de ela começar.
 */
export const fluxo: ServiceStep[] = [
  {
    id: "contato",
    titulo: "1. Você conta o caso",
    descricao:
      "Uma mensagem pelo formulário, com o que precisa resolver. Não precisa estar organizado — organizar é parte do trabalho.",
  },
  {
    id: "conversa",
    titulo: "2. Conversa de diagnóstico",
    descricao:
      "Uma conversa para entender o que existe, o que dói e o que já foi tentado. Sem compromisso e sem custo. Se o seu caso não for para mim, você sai dela sabendo disso e com uma direção.",
  },
  {
    id: "proposta",
    titulo: "3. Proposta com escopo escrito",
    descricao:
      "Qual serviço se aplica, o que está dentro, o que está fora, o que você recebe no fim e em quanto tempo. Preço fechado sobre escopo fechado — nada de escopo aberto por hora.",
  },
  {
    id: "execucao",
    titulo: "4. Execução em rodadas",
    descricao:
      "O trabalho acontece em rodadas fechadas, cada uma com critério de conclusão verificável. Toda ação de risco para no seu aval antes de acontecer — nada que toque produção, dado real ou repositório de cliente roda sem sua autorização explícita.",
  },
  {
    id: "entrega",
    titulo: "5. Entrega e handoff",
    descricao:
      "Você recebe os artefatos e um handoff: o que ficou pronto, o que ficou aberto de propósito, e o que decidir em seguida. Escrito para quem não participou da execução conseguir continuar.",
  },
];
