import type { TrocaDoConsole } from "@/types";
import ficha from "@/content/ficha";
import { degrauAtual } from "@/content/degraus";
import { contribuicoes } from "@/content/shizune";

/**
 * O que o console do ecossistema, na home, responde.
 *
 * Não é chat com modelo de linguagem: não há servidor por trás, e simular um
 * seria mentir sobre o que o site faz. É um roteiro curado — perguntas reais,
 * com respostas escritas e verificáveis.
 *
 * Três regras governam cada resposta:
 *
 * 1. **Todo número vem da ficha da release** (`ficha.ts`), a mesma das páginas
 *    do Shizune e do shizune.dev. A única exceção são as contribuições, que
 *    vêm de `shizune.ts`, com o próprio comando e a própria data. Número que
 *    não está lá não entra aqui.
 * 2. **Nenhuma versão.** A resposta diz a data e o SHA da release, nunca o
 *    número da versão: a regra é "sem versão no texto visível".
 * 3. **Toda resposta termina num destino real.** Quando a pessoa pode resolver
 *    sozinha, o destino é o repositório aberto, não o formulário.
 *
 * O QUE SAIU, na troca de 15/10 (o texto antigo continua no histórico do git):
 * a ficha de fatos própria (`shizune-ficha.ts`), que repetia à mão números da
 * release antiga e da instância privada — contagem de decisões, CI, commits
 * assinados —, e os números do autodiagnóstico de setembro, que não foram
 * medidos de novo. Até a v4 deste site, este console tinha nome e avatar de
 * personagem; agora ele é só o console.
 *
 * PROPAGAÇÃO — ver AGENTS.md § Propagação.
 */
const agora = degrauAtual();

export const trocasDoConsole: TrocaDoConsole[] = [
  {
    id: "o-que-e-shizune",
    pergunta: "o que é o Shizune?",
    resposta:
      "Registro de decisão sobre o git: a máquina rascunha, você assina, o comando verifica. Decisão numerada, commit assinado, e um comando que reprova o build quando alguém cita o que não foi decidido. É aberto sob Apache-2.0 e roda sem instalar dependência nenhuma — você clona e verifica hoje, sem falar com ninguém.",
    destino: { rotulo: "abrir o repositório", tipo: "repo" },
    palavras: [
      "shizune",
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
      "registro de decisao",
      "decisao",
    ],
  },
  {
    id: "em-que-pe",
    pergunta: "em que pé está o projeto?",
    resposta: `A release mais recente saiu em ${ficha.data}, no SHA ${ficha.shaCurto}. Num clone do pacote, o doctor fecha com ${ficha.doctor.passaram} etapas que passaram e ${ficha.doctor.na} que respondem n/a; o teste negativo tem ${ficha.asseracoes} asserções; o pacote tem ${ficha.arquivos} arquivos.${agora ? ` O degrau em andamento no roadmap é “${agora.nome}”.` : ""} Cada número tem o comando que o reproduz.`,
    destino: { rotulo: "conferir os números", tipo: "shizune" },
    palavras: [
      "versao",
      "release",
      "numeros",
      "status",
      "em que pe",
      "atualizado",
      "maduro",
      "pronto",
      "estavel",
      "roadmap",
      "degrau",
    ],
  },
  {
    id: "confio-nisso",
    pergunta: "por que eu confiaria nisso?",
    resposta: `Você não precisa confiar: cada afirmação tem o comando que a confere num clone limpo do repositório público, com o SHA e o dia da medição, e o que você não consegue rodar sozinho não entra na página. O que ele não prova também está escrito: a assinatura mostra qual chave assinou, nunca quem escreveu o conteúdo. Fora do clone, as contribuições a quatro repositórios públicos de memória de agente estão listadas com link — ${contribuicoes.abertas} abertas, ${contribuicoes.aceitas} aceitas, medido em ${contribuicoes.medidoEm}.`,
    destino: { rotulo: "ver a evidência", tipo: "shizune" },
    palavras: [
      "confiar",
      "confianca",
      "prova",
      "funciona mesmo",
      "serio",
      "evidencia",
      "contra si",
      "validado",
      "contribuicoes",
    ],
  },
  {
    id: "o-que-nao-e",
    pergunta: "isso prova que um humano escreveu?",
    resposta:
      "Não — e quem te disser que sim está vendendo errado. A assinatura mostra qual chave assinou, nunca quem escreveu o conteúdo: a decisão passa a ter um responsável nomeado, o que é outra coisa. E não é ferramenta de marca d'água: a marca d'água diz o que a máquina escreveu; o registro diz o que o humano decidiu.",
    destino: { rotulo: "ver como o comando verifica", tipo: "shizune" },
    palavras: [
      "autoria",
      "humano escreveu",
      "prova que",
      "marca dagua",
      "watermark",
      "detector",
      "ia escreveu",
      "memoria de agente",
      "nao e",
    ],
  },
  {
    id: "time-pequeno",
    pergunta: "serve para um time pequeno?",
    resposta:
      "Serve, e é onde rende mais. O custo dele é escrever o contexto e a decisão uma vez, em vez de cada pessoa reconstruir o seu a cada sessão — e num time de três ou quatro essa conta se paga rápido. Requisito: Bun ou Node 20+, e nada mais.",
    destino: { rotulo: "ver como aplico no seu caso", tipo: "shizune" },
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
      "requisito",
    ],
  },
  {
    id: "herdei-base",
    pergunta: "herdei um sistema que ninguém documentou",
    resposta:
      "Então o começo é auditoria técnica. Você recebe um relatório com metodologia, escopo e limites declarados — o que foi olhado e, principalmente, o que não foi — com cada achado reconferido no código real, referência de arquivo e linha, e veredito escrito: confirmado, parcial ou refutado. O que não entra é a correção: isso é trabalho separado, decidido depois de você ver o retrato.",
    destino: { rotulo: "começar pela conversa", tipo: "contato" },
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
      "O Shizune é grátis e continua grátis. A consultoria tem preço fechado sobre escopo fechado, definido depois da conversa de diagnóstico — que também não custa. Não publico tabela de preço porque ainda não medi o suficiente para publicar um número honesto, e preço inventado em página é pior que preço nenhum.",
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
      "Dá, e é de graça. O método inteiro está publicado: clona, roda o doctor e o próprio repositório te diz se a estrutura está certa — sem npm install, sem falar com ninguém. Se travar em alguma parte, aí a conversa faz sentido. Mas comece por lá: testa o comando; se passar, me chama.",
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
      "testar",
      "doctor",
    ],
  },
];

/**
 * A frase que separa o console de um chatbot que blefa: quando a pergunta sai
 * do roteiro, ele diz isso — e aponta um destino de verdade.
 */
export const respostaSemDado =
  "Não tenho esse dado aqui — e inventar seria o defeito que o Shizune denuncia. O repositório tem: cada número de lá vem com o comando que o reproduz.";

export const aberturaDoConsole =
  "Posso explicar o que o Shizune faz, mostrar os números com o comando de cada um, ou te levar direto para a conversa. O que te trouxe aqui?";
