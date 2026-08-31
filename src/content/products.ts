import type { Product } from "../types";

export const products: Product[] = [
  {
    slug: "brain",
    name: "Brain Framework",
    tagline:
      "Um sistema operacional de governança para agentes de IA — contexto confiável antes de qualquer linha de código.",
    description:
      "Repositório de documentação estruturado que dá a agentes de codificação (como o Claude Code) contexto confiável, um pipeline de skills de desenvolvimento e regras de escrita verificáveis antes de tocarem em qualquer código. Nasceu para resolver a degradação de agentes sem estrutura: sem um contrato explícito, cada sessão reinventa o contexto, contradiz decisões anteriores e mistura hipótese com fato. O framework em si é aberto (Apache 2.0, zero dependências); o que está em jogo aqui é aplicar essa metodologia — auditoria técnica e governança de projeto — no seu caso. A conformidade da própria base não é aspiracional: um validador de estrutura, sem dependências externas, já confirmou mais de 140 documentos em conformidade com o contrato de metadados, e falha a verificação se um segredo aparecer solto no texto.",
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
    // TODO(operador): confirmar o formato exato do que está sendo oferecido aqui
    // (auditoria pontual? implantação do framework? mentoria?) e o prazo típico
    // de entrega antes de detalhar isso na copy de vendas.
    waitlistCopy:
      "Quer uma auditoria ou uma implantação do Brain Framework no seu projeto? Entre na lista de espera para conversarmos sobre o seu caso.",
  },
  {
    slug: "rei",
    name: "Rei",
    tagline:
      "Um console de conversa que memoriza só com sua aprovação e nunca escreve sozinho.",
    description:
      "Rei é o console de um ecossistema de projetos: conversa, decide o que lembra só com aprovação humana explícita, e monta pedidos de trabalho para um agente escritor separado (o Claude Code CLI) — sem nunca, ela mesma, escrever uma linha no repositório de governança que a sustenta. Não é um chatbot genérico com plugins nem um agente autônomo que age sozinho: ela pede, um agente escritor faz, e um humano decide em cada ponto de virada. Até 29 de agosto de 2026, a suíte de testes do projeto chegava a 163 casos verdes, cobrindo desde a fronteira que impede escrita não autorizada até o alarme que aponta escrita fora do escopo combinado de uma tarefa.",
    features: [
      "Memória com trava propose → confirm/reject: toda memória nova nasce como proposta e só é persistida depois de confirmação humana, memória a memória.",
      "Orquestração de tarefas com aprovação humana obrigatória: toda tarefa nasce pendente e só executa depois que você confirma, com narrativa ao vivo do que o agente escritor está fazendo.",
      "Seis modos de conversa (geral, dev, produto, planner, teacher, cadu) que moldam como ela responde — nunca o que ela tem permissão de fazer.",
      "Conversar não consome cota de assinatura: o chat roda num provedor separado (Groq); só confirmar e executar uma tarefa usa o agente escritor pago.",
      "Alarme de escrita fora do escopo: o orquestrador vigia os diretórios declarados por uma tarefa e reporta qualquer mudança fora do esperado.",
    ],
    idealFor: [
      "Quem já usa o ecossistema Brain e quer conversar sobre o estado dos projetos sem abrir um editor de código para cada pergunta.",
      "Quem quer supervisionar um agente de codificação por aprovação explícita, tarefa a tarefa, em vez de execução autônoma.",
    ],
    status: "active",
    // TODO(operador): confirmar se e em que condições a Rei ficará disponível
    // fora do uso pessoal do autor (deploy próprio? acesso hospedado? custo?)
    // antes de comprometer isso na copy de vendas.
    waitlistCopy:
      "Quer saber quando — e como — vai dar para usar a Rei no seu próprio fluxo de trabalho? Entre na lista de espera.",
  },
  {
    slug: "combo",
    name: "Brain + Rei",
    tagline:
      "A governança do Brain, acompanhada no dia a dia pelo console de conversa da Rei.",
    description:
      "O pacote conjunto do Brain Framework com a Rei: a governança estruturada de projeto entregue pelo Brain, acompanhada no dia a dia através do console conversacional da Rei — que nunca escreve sozinha no Brain, apenas monta pedidos de trabalho que só rodam depois da sua confirmação explícita.",
    features: [
      "As duas frentes lado a lado: metodologia de auditoria e governança (Brain) mais um console conversacional para acompanhar e pedir trabalho sobre o que foi decidido (Rei).",
      "A mesma trava de segurança do ecossistema nas duas partes: nenhuma escrita acontece sem confirmação humana explícita.",
      "Um único ponto de contato para alinhar as duas frentes — o Brain para levantar o estado real do projeto, a Rei para o acompanhamento contínuo.",
    ],
    idealFor: [
      "Quem quer aplicar o Brain Framework num projeto e, desde o primeiro dia, acompanhar isso por conversa em vez de abrir um editor de código a cada dúvida.",
    ],
    status: "invite-only",
    // TODO(operador): confirmar se existe condição comercial específica para a
    // combinação (desconto de pacote) ou se é apenas a soma das duas contratações
    // separadas, antes de prometer qualquer coisa na copy de vendas.
    waitlistCopy:
      "Quer contratar Brain e Rei juntos? Entre na lista de espera e alinhamos escopo e condições para o seu caso.",
  },
];
