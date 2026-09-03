import type { ReiTroca } from "@/types";
import { fichaShizune, foraDaFicha } from "@/content/shizune-ficha";

/**
 * O que a Rei responde.
 *
 * Não é chat com modelo de linguagem: não há servidor por trás, e simular um
 * seria mentir sobre o que o site faz. É um roteiro curado — perguntas reais
 * que gente real faz, com respostas escritas e verificáveis.
 *
 * Duas regras governam cada resposta:
 *
 * 1. **Todo fato vem da ficha** (`shizune-ficha.ts`). Se um número não está
 *    lá, ele não entra aqui — entra na ficha primeiro, com comando e data.
 * 2. **Toda resposta termina num destino real.** E quando a pessoa pode
 *    resolver sozinha, o destino é o repositório aberto, não o formulário.
 *    Mandar para o grátis primeiro é o que torna a Rei confiável em vez de
 *    vendedora.
 *
 * Nenhum alvo da rodada de diagnóstico aparece pelo nome — embargo até
 * 2026-09-15, e o alvo com contribuições aceitas fica fora de material de
 * conteúdo por decisão do operador.
 */
export const reiTrocas: ReiTroca[] = [
  {
    id: "o-que-e-shizune",
    pergunta: "o que é o Shizune?",
    resposta: `${fichaShizune.oQueE} Era o ${fichaShizune.nomeAnterior}; o nome mudou, o método não. É aberto sob ${fichaShizune.licenca} e roda sem instalar dependência nenhuma — você clona e verifica hoje, sem falar com ninguém.`,
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
    id: "versao-e-numeros",
    pergunta: "em que pé está o projeto?",
    resposta: `${fichaShizune.versao} publicada em ${fichaShizune.publicadaEm}, SHA ${fichaShizune.shaPublicado}, com ${fichaShizune.ciNoShaPublicado}. No registro: ${fichaShizune.decisoes} decisões assinadas, ${fichaShizune.verificadores} verificadores rodando em sequência, e ${fichaShizune.commitsAssinados}. Cada número desses tem o comando que o reproduz no repositório.`,
    destino: { rotulo: "conferir os números", tipo: "produtos" },
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
      "quantas decisoes",
      "ci",
    ],
  },
  {
    id: "confio-nisso",
    pergunta: "por que eu confiaria nisso?",
    resposta: `Porque ele apanha em público: o Shizune foi diagnosticado com o próprio Shizune. Primeira passada (${fichaShizune.diagnostico.sha}): ${fichaShizune.diagnostico.achados} achados. ${fichaShizune.diagnostico.fechados} foram fechados e verificados no clone publicado — e ${fichaShizune.diagnostico.abertos} continua aberto: ${fichaShizune.diagnostico.oAberto}. Além disso, ${fichaShizune.contribuicoesAceitas}`,
    destino: { rotulo: "ler os relatórios", tipo: "repo" },
    palavras: [
      "confiar",
      "confianca",
      "prova",
      "funciona mesmo",
      "serio",
      "diagnostico",
      "auditoria do proprio",
      "contra si",
      "achado",
      "erro",
      "validado",
    ],
  },
  {
    id: "o-que-nao-e",
    pergunta: "isso prova que um humano escreveu?",
    resposta: `Não — e quem te disser que sim está vendendo errado. ${fichaShizune.oQueNaoE[0]} ${fichaShizune.oQueNaoE[2]}`,
    destino: { rotulo: "ver como o comando verifica", tipo: "produtos" },
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
 * A frase que separa a Rei de um chatbot que blefa: quando a pergunta sai da
 * ficha, ela diz isso — e aponta um destino de verdade.
 */
export const reiNaoSei = foraDaFicha;

export const reiAbertura =
  "Posso explicar o que o Shizune faz, mostrar os números com o comando de cada um, ou te levar direto para a conversa. O que te trouxe aqui?";
