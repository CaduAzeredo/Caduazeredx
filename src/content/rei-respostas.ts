import type { ReiTroca } from "@/types";

/**
 * O que a Rei responde.
 *
 * Não é chat com modelo de linguagem: não há servidor por trás, e simular um
 * seria mentir sobre o que o site faz. É um roteiro curado — perguntas reais
 * que gente real faz, com respostas escritas e verificáveis.
 *
 * A regra que governa cada resposta: **ela sempre termina num destino real.**
 * E quando a pessoa pode resolver sozinha, o destino é o repositório aberto,
 * não o formulário. Mandar para o grátis primeiro é o que torna a Rei
 * confiável em vez de vendedora.
 */
export const reiTrocas: ReiTroca[] = [
  {
    id: "o-que-e-brain",
    pergunta: "o que é o Brain Framework?",
    resposta:
      "Um sistema de governança para agentes de IA: contexto confiável por projeto, decisões registradas, um pipeline de skills, e validadores que reprovam a própria estrutura quando ela está errada. É aberto sob Apache 2.0 e roda sem instalar dependência nenhuma — você clona e verifica hoje, sem falar com ninguém.",
    destino: { rotulo: "abrir o repositório", tipo: "repo" },
    palavras: [
      "brain",
      "framework",
      "o que e",
      "que e isso",
      "governanca",
      "metodo",
      "sistema",
      "como funciona",
      "apache",
      "licenca",
      "open source",
      "aberto",
    ],
  },
  {
    id: "time-pequeno",
    pergunta: "serve para um time pequeno?",
    resposta:
      "Serve, e é onde rende mais. O custo dele é escrever o contexto uma vez, em vez de cada pessoa reconstruir o seu a cada sessão. Num time de três ou quatro isso se paga rápido, porque a conta que ele elimina é a de repetição.",
    destino: { rotulo: "ver como aplico no seu caso", tipo: "produtos" },
    palavras: [
      "time",
      "equipe",
      "pequeno",
      "sozinho time",
      "startup",
      "poucos",
      "dois",
      "tres",
      "escala",
      "serve para",
    ],
  },
  {
    id: "herdei-base",
    pergunta: "herdei um sistema que ninguém documentou",
    resposta:
      "Então o começo é auditoria técnica. Você recebe um relatório com metodologia, escopo e limites declarados — o que foi olhado e, principalmente, o que não foi — com cada achado reconferido no código real, referência de arquivo e linha, e veredito escrito: confirmado, parcial ou refutado. O que não entra é a correção: isso é trabalho separado, decidido depois de você ver o retrato.",
    destino: { rotulo: "ver o escopo completo", tipo: "produtos" },
    palavras: [
      "herdei",
      "legado",
      "documentacao",
      "documentado",
      "auditoria",
      "auditar",
      "sistema antigo",
      "codigo antigo",
      "ninguem sabe",
      "bagunca",
      "tecnica",
      "divida",
    ],
  },
  {
    id: "quanto-custa",
    pergunta: "quanto custa?",
    resposta:
      "O framework é grátis e continua grátis. A consultoria tem preço fechado sobre escopo fechado, definido depois da conversa de diagnóstico — que também não custa. Não publico tabela de preço porque ainda não medi o suficiente para publicar um número honesto, e preço inventado em página é pior que preço nenhum.",
    destino: { rotulo: "começar pela conversa", tipo: "contato" },
    palavras: [
      "preco",
      "custa",
      "custo",
      "valor",
      "orcamento",
      "quanto",
      "pagar",
      "investimento",
      "tabela",
      "contratar",
    ],
  },
  {
    id: "faco-sozinho",
    pergunta: "e se eu quiser fazer sozinho?",
    resposta:
      "Dá, e é de graça. O método inteiro está publicado: clona, roda o comando de verificação e o próprio repositório te diz se a estrutura está certa. Se travar em alguma parte, aí a conversa faz sentido — mas comece por lá.",
    destino: { rotulo: "clonar o repositório", tipo: "repo" },
    palavras: [
      "sozinho",
      "eu mesmo",
      "instalar",
      "clonar",
      "baixar",
      "gratis",
      "de graca",
      "usar sem",
      "por conta",
    ],
  },
];

/**
 * O que ela diz quando nao sabe.
 *
 * Esta e a frase mais importante do roteiro. Um chat sem servidor que finge
 * entender qualquer pergunta e mentira sobre o que o site faz — e a pessoa
 * descobre na segunda tentativa. Admitir custa uma frase e compra a confianca
 * que faz valer a pena ler as outras cinco respostas.
 */
export const reiNaoSei =
  "Essa eu não sei responder — o que eu tenho aqui é um roteiro escrito, não um modelo que inventa resposta. Mas posso te levar a quem sabe:";

export const reiAbertura =
  "Posso explicar o que eu faço, mostrar o Brain por dentro, ou te levar direto para o escopo da consultoria. O que te trouxe aqui?";
