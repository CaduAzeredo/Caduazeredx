import type { Product } from "../types";
import { contactLinks } from "./contacts";

/**
 * Catalogo de produtos.
 *
 * A oferta comercial em torno deles nasce em
 * `projects/brain-launch/specs/spec-001-oferta-comercial-v1.md`, no repositorio de
 * governanca, e esta refletida em `src/content/services.ts`. Escopo, entregavel e
 * condicao mudam la primeiro.
 *
 * Regras de escrita desta copy (ADR-035): o texto fala COM quem le, nao narra a
 * experiencia de quem construiu — o credito de autoria vive no rodape, nao na voz.
 * E nome de fornecedor de IA so aparece em construcao aberta, nunca como se houvesse
 * uma unica ferramenta possivel.
 */

/**
 * O endereco do repositorio publico vem de `contacts.ts`, nunca escrito a mao
 * aqui — mesma regra que a navbar segue. Se a entrada sumir de la, ou deixar
 * de estar publica, `externalUrl` fica indefinido e o botao desaparece em vez
 * de virar um endereco morto.
 */
const repoPublico = (nome: string): string | undefined =>
  contactLinks.publicRepos?.find(
    (r) => r.name === nome && r.status === "public",
  )?.url;

export const products: Product[] = [
  {
    slug: "brain",
    name: "Brain Framework",
    externalUrl: repoPublico("Brain Framework"),
    visual: "brain-estrutura",
    tagline:
      "Um sistema operacional de governança para agentes de IA — contexto confiável antes de qualquer linha de código.",
    description:
      "Repositório de documentação estruturado que dá ao seu agente de codificação — Claude Code, Cursor ou equivalente — contexto confiável, um pipeline de skills e regras de escrita verificáveis antes de ele tocar em qualquer linha. Resolve a degradação que aparece quando não existe contrato explícito: cada sessão reinventa o contexto, contradiz decisões anteriores e mistura hipótese com fato. O framework é aberto (Apache 2.0, zero dependências) e você pode adotá-lo sozinho hoje; o que se contrata aqui é aplicar a metodologia no seu caso. A conformidade não é aspiracional: em 31 de agosto de 2026, um validador sem dependências externas confirmava 161 documentos em conformidade com o contrato de metadados, e reprova a verificação se um segredo aparecer solto no texto.",
    features: [
      "Verificação adversarial: nenhum achado entra no backlog só por parecer plausível — cada um é reconferido no código real, com referência arquivo:linha, e recebe um veredito explícito (Confirmado, Parcial ou Refutado).",
      "Governança real, não aspiracional: ADRs numerados e nunca renumerados, registros datados e imutáveis, quarentena formal de dados de cliente.",
      "Fato vs. hipótese: todo número não medido nasce marcado como hipótese — o agente não finge certeza sobre o que não foi medido.",
      "Pipeline replicável: do levantamento de contexto até o handoff (grill-with-docs → domain-modeling → to-spec → implement → handoff), o mesmo processo aplicado a projetos de domínios diferentes.",
    ],
    idealFor: [
      "Desenvolvedores que herdam bases de código e precisam saber, em dias e não em meses, o que funciona, o que é inseguro e o que falta antes do lançamento.",
      "Consultores que vendem auditoria técnica e governança e precisam de um entregável padronizado e auditável, replicável entre clientes.",
      "Produtores de software que querem validar qualidade e segurança antes do lançamento.",
    ],
    status: "active",
    // Escopo, entregavel e duracao de cada servico: src/content/services.ts,
    // derivado da spec-001 no repositorio de governanca.
    waitlistCopy:
      "Auditoria técnica, implantação no seu repositório, criação de projeto do zero ou acompanhamento do seu time — quatro formas de aplicar o método. Conte o seu caso e a primeira conversa é de diagnóstico, sem compromisso.",
  },
  {
    slug: "rei",
    name: "Rei",
    tagline:
      "Um console de conversa que memoriza só com sua aprovação e nunca escreve sozinho.",
    description:
      "Rei é o console de um ecossistema de projetos: conversa, decide o que lembra só com aprovação humana explícita, e monta pedidos de trabalho para um agente escritor separado, de linha de comando — sem nunca, ela mesma, escrever uma linha no repositório de governança que a sustenta. Não é um chatbot genérico com plugins nem um agente autônomo que age sozinho: ela pede, um agente escritor faz, e um humano decide em cada ponto de virada. Até 29 de agosto de 2026, a suíte de testes do projeto chegava a 163 casos verdes, cobrindo desde a fronteira que impede escrita não autorizada até o alarme que aponta escrita fora do escopo combinado de uma tarefa.",
    features: [
      "Memória com trava propose → confirm/reject: toda memória nova nasce como proposta e só é persistida depois de confirmação humana, memória a memória.",
      "Orquestração de tarefas com aprovação humana obrigatória: toda tarefa nasce pendente e só executa depois que você confirma, com narrativa ao vivo do que o agente escritor está fazendo.",
      "Seis modos de conversa que moldam como ela responde — nunca o que ela tem permissão de fazer.",
      "Conversar não consome cota de assinatura: o chat roda num provedor separado; só confirmar e executar uma tarefa usa o agente escritor pago.",
      "Alarme de escrita fora do escopo: o orquestrador vigia os diretórios declarados por uma tarefa e reporta qualquer mudança fora do esperado.",
    ],
    idealFor: [
      "Quem usa o ecossistema Brain e quer conversar sobre o estado dos projetos sem abrir um editor de código para cada pergunta.",
      "Quem quer supervisionar um agente de codificação por aprovação explícita, tarefa a tarefa, em vez de execução autônoma.",
    ],
    status: "em-breve",
    // Em breve, e nada mais: a forma de distribuicao (instalacao propria, acesso
    // hospedado, custo) ainda nao esta decidida, e prometer um formato agora criaria
    // obrigacao antes da decisao. A lista serve para avisar quando estiver.
    waitlistCopy:
      "A Rei ainda não está disponível fora do uso interno, e a forma de distribuição ainda não foi decidida. Entre na lista e você é avisado quando ela abrir — sem promessa de formato ou data.",
  },
  {
    slug: "combo",
    name: "Brain + Rei",
    tagline:
      "A governança do Brain, acompanhada no dia a dia pelo console de conversa da Rei.",
    description:
      "O pacote conjunto do Brain Framework com a Rei: a governança estruturada de projeto entregue pelo Brain, acompanhada no dia a dia através do console conversacional da Rei — que nunca escreve sozinha no Brain, apenas monta pedidos de trabalho que só rodam depois da sua confirmação explícita. Enquanto a Rei não abrir, o combo existe como intenção registrada, não como contratação disponível.",
    features: [
      "As duas frentes lado a lado: metodologia de auditoria e governança (Brain) mais um console conversacional para acompanhar e pedir trabalho sobre o que foi decidido (Rei).",
      "A mesma trava de segurança do ecossistema nas duas partes: nenhuma escrita acontece sem confirmação humana explícita.",
      "Um único ponto de contato para alinhar as duas frentes — o Brain para levantar o estado real do projeto, a Rei para o acompanhamento contínuo.",
    ],
    idealFor: [
      "Quem quer aplicar o Brain Framework num projeto e, desde o primeiro dia, acompanhar isso por conversa em vez de abrir um editor de código a cada dúvida.",
    ],
    status: "invite-only",
    // Sem condicao comercial de pacote por enquanto: sem preco publicado para
    // nenhuma das partes, um desconto de combinacao nao teria sobre o que incidir.
    // Segue como soma de duas contratacoes, alinhada caso a caso.
    waitlistCopy:
      "Quer as duas frentes juntas? Entre na lista e alinhamos escopo e condições para o seu caso — hoje é a soma de duas contratações, sem condição de pacote.",
  },
];
