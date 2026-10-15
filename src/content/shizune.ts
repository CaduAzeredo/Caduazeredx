/**
 * Conteúdo das páginas do Shizune neste site: `/shizune` (visão geral),
 * `/shizune/evidencia` e `/shizune/roadmap`.
 *
 * Fonte do texto: as telas 17, 18a e 18b do design
 * (`projects/brain-launch/design/` no Brain), conferidas pela verificação de
 * 15/10. São o espelho em português das páginas do shizune.dev. Nenhuma frase
 * do design foi reescrita; as mudanças que a release real exigiu estão nos
 * comentários de cada bloco.
 *
 * FONTE DOS NÚMEROS: a ficha da release (`ficha.ts`), a mesma do shizune.dev. A
 * única exceção são as contribuições, que rodam contra o GitHub e trazem o
 * próprio comando e a própria data.
 *
 * SEM VERSÃO NO TEXTO VISÍVEL. A versão vive só no `softwareVersion` do JSON-LD
 * da `/shizune`, lida da ficha. Até a v4 deste site, a versão estava aqui
 * (`versaoPublicada`) e aparecia num selo da home.
 *
 * O QUE SAIU, na troca para o design de 15/10 (o texto antigo continua no
 * histórico do git): a lista de fatos com comando (os números de produto foram
 * para a `/shizune/evidencia`, lidos da ficha; os números da instância privada
 * saíram, porque não se reproduzem num clone público), as três perguntas da
 * fronteira, o placar retrátil do diagnóstico, a vaga de citação reservada e a
 * frase que dizia que os repositórios "seguem sem nome até 2026-09-15".
 *
 * PROPAGAÇÃO — ver AGENTS.md § Propagação.
 */

export const repositorio = "https://github.com/CaduAzeredo/shizune";
export const discussoes = "https://github.com/CaduAzeredo/shizune/discussions";
/** O apex é o canônico: o `www` redireciona para cá. */
export const siteDoProduto = "https://shizune.dev";
export const quickstartSetup =
  "https://github.com/CaduAzeredo/shizune/blob/main/QUICKSTART.md#setup-prompt";
export const changelog = "https://github.com/CaduAzeredo/shizune/blob/main/CHANGELOG.md";
export const clone = "git clone https://github.com/CaduAzeredo/shizune.git";
export const checkoutDaUltima = 'git checkout "$(git tag --sort=-v:refname | head -1)"';

/** O submenu das três páginas, mais o espelho em inglês. */
export const submenu = [
  { rota: "/shizune", rotulo: "visão geral" },
  { rota: "/shizune/roadmap", rotulo: "roadmap" },
  { rota: "/shizune/evidencia", rotulo: "evidência" },
] as const;

export const espelhoEmIngles: Record<string, string> = {
  "/shizune": "https://shizune.dev/",
  "/shizune/roadmap": "https://shizune.dev/roadmap",
  "/shizune/evidencia": "https://shizune.dev/evidence",
};

// ── /shizune ────────────────────────────────────────────────────────────────

export const visaoGeral = {
  hero: {
    linhas: [
      { sujeito: "A máquina ", verbo: "rascunha." },
      { sujeito: "Você ", verbo: "assina." },
      { sujeito: "O comando ", verbo: "verifica." },
    ],
    subtitulo: "Quem decidiu, e dá para provar?",
    texto:
      "Seu agente de IA lembra, mas obedece ao que foi decidido. Decisão numerada, commit assinado, e um comando que reprova o build quando alguém cita o que não foi decidido.",
    reprovar: "Veja ele reprovar um commit ↓",
    comigo: "Ou faça comigo",
    rodape: "Apache-2.0 · zero dependências · Node 20+ ou Bun",
  },
  configurar: {
    titulo: "Configurar o Shizune",
    rotuloDoPrompt: "seu agente · prompt",
    /** O trecho que a página mostra; o botão copia o prompt inteiro do QUICKSTART. */
    trecho:
      "You are at the root of a Shizune repository. Before doing anything: read AGENTS.md in full, then skills/README.md …",
    /** O prompt inteiro, copiado do QUICKSTART do pacote sem mudança — em inglês, como o pacote. */
    promptCompleto:
      "You are at the root of a Shizune repository. Before doing anything:\n\n" +
      "1. Read AGENTS.md in full — it is the operating contract that governs how you\n" +
      "   write and what you may touch in this repository.\n" +
      "2. Read skills/README.md to learn the available skill pipeline\n" +
      "   (grill-with-docs -> domain-modeling -> to-spec -> implement -> handoff).\n\n" +
      "Then walk me through the pipeline for project <slug>:\n" +
      "- Start with the grill-with-docs skill: interview me until you have enough\n" +
      "  facts, and fill in projects/<slug>/CONTEXT.md, marking as HYPOTHESIS\n" +
      "  anything I do not confirm with evidence.\n" +
      "- Advance one skill at a time, asking for my approval before moving on.\n" +
      "- Every .md file you create is born with the v2 frontmatter defined in\n" +
      "  AGENTS.md. When you finish, run bun scripts/doctor.mjs and fix every\n" +
      "  error before stopping.",
    origem: "do QUICKSTART.md · em inglês, como o pacote",
    promptInteiro: "prompt inteiro →",
    comandos: ["git clone https://github.com/CaduAzeredo/shizune.git", "cd shizune", "bun scripts/doctor.mjs"],
    legendaTerminal: "roda no terminal",
    legendaAgente: "vai para o agente",
  },
  comoFunciona: {
    rotulo: "como funciona",
    titulo: "Três partes. Nenhuma faz o trabalho da outra.",
    partes: [
      { quem: "01 · a máquina", titulo: "Rascunha a decisão", linha: "DEC-‹NNN› · rascunho", comando: false },
      { quem: "02 · você", titulo: "Assina", linha: "DEC-‹NNN› · vigente · ‹sha›", comando: false },
      { quem: "03 · o comando", titulo: "Verifica", linha: "node scripts/validate-decisions.mjs", comando: true },
    ],
    camadas: [
      { rotulo: "● resolvido em outro lugar", texto: "A marca d'água diz o que a máquina escreveu.", produto: false },
      { rotulo: "● resolvido em outro lugar", texto: "A chave diz quem enviou.", produto: false },
      { rotulo: "◆ isto é o Shizune", texto: "O registro diz o que o humano decidiu.", produto: true },
    ],
    nota: "A assinatura mostra qual chave assinou, nunca quem escreveu o conteúdo.",
    vizinhos: "Onde o Shizune se encaixa entre os vizinhos →",
  },
  exemplo: {
    ancora: "exemplo",
    rotulo: "exemplo · um commit cita uma decisão que não existe",
    titulo: "O que acontece quando um commit cita o DEC-999?",
    aposte: { titulo: "Aposte", texto: "O registro não tem DEC-999. O commit passa?", opcoes: ["Passa", "Reprova"] },
    rode: { titulo: "Rode", rotulo: "terminal · clone limpo" },
    leia: {
      titulo: "Leia o que ele disse",
      texto:
        "O validador recusa com código 1 e diz o motivo. Uma recusa que não se explica também reprovaria o teste.",
    },
    rotuloSaida: "saída · teste negativo",
    codigo: "validador · código 1",
    secao: "[negativo]",
    destaques: ["commit que cita DEC inexistente", "explicou que o DEC-999 não existe"],
    inteira: "▸ a execução inteira",
  },
  /**
   * Contra nós mesmos. O design marca os números como "a medir de novo": eles
   * vêm do relatório de uma release antiga, medido na instância. Pela regra de
   * publicação, aparecem como rascunho no preview e ficam fora da produção até
   * a medição nova — a mesma decisão do shizune.dev.
   */
  contraNos: {
    conferido: false,
    rotulo: "contra nós mesmos",
    titulo: "O mesmo instrumento, virado para dentro.",
    texto:
      "Apontamos o Shizune contra o próprio Shizune, em clone limpo e com HOME vazio. O que ele achou, e o que aconteceu com cada achado, fica escrito, inclusive o diagnóstico que erramos.",
    passos: [
      { valor: "5", texto: "achados na primeira passada", rodape: "sha c248f75", fechado: false },
      { valor: "4", texto: "fechados em código e texto", rodape: "release seguinte", fechado: false },
      { valor: "1", texto: "fechado depois; o primeiro diagnóstico estava errado", rodape: "2026-09-09", fechado: false },
      { valor: "0", texto: "abertos no SHA publicado", rodape: "sha 0ccfe4f", fechado: true },
    ],
    limite: "Cinco checagens portáteis não são auditoria. Não houve comparação com nenhum outro projeto.",
    marca: "rascunho · números a medir de novo",
  },
  recortes: {
    rotulo: "recortes",
    titulo: "O contexto, dito por terceiros.",
    itens: [
      {
        fonte: "block.xyz · jul/2026",
        forma: "paráfrase",
        texto: "Cada agente é membro de verdade, com conta própria, chaves criptográficas e permissões.",
        fecho: "Quem fez, resolvido. A autoridade da decisão não entrou na conta.",
        /** A página da Block ainda não foi conferida: rascunho no preview, fora da produção. */
        link: null as string | null,
        lidaEm: null as string | null,
      },
      {
        fonte: "Apache License 2.0, seção 6",
        forma: "",
        texto: "A licença concede patente e cópia, e não concede direito de marca.",
        fecho: "Por isso o código é livre e o nome composto não é.",
        link: "https://www.apache.org/licenses/LICENSE-2.0" as string | null,
        lidaEm: "texto legal" as string | null,
      },
      {
        fonte: "medição própria · 2026",
        forma: "",
        texto: "Arquivo de contexto aumenta passos e custo de inferência.",
        fecho: "O argumento aqui é precisão, nunca economia.",
        link: "" as string | null,
        lidaEm: "" as string | null,
        /**
         * Medição nossa, sem página de terceiro — mas sem o comando que a
         * reproduz. Decisão do operador (15/10, 13h47): rascunho no preview,
         * fora da produção, até o comando entrar aqui, ao lado do número.
         */
        comando: null as string | null,
      },
    ],
    rascunho: "rascunho · fonte a conferir",
    semFonte: "‹link da página da Block›",
    semData: "‹data›",
    rascunhoComando: "rascunho · sem o comando ao lado",
    semComando: "‹o comando que reproduz a medição›",
  },
  comecar: {
    rotulo: "começar",
    titulo: "Três comandos. Nada instalado.",
    texto: "Sem npm install, sem package.json. Os scripts usam só builtins.",
    passo1: "terminal · passo 1 de 3",
    passo2: "terminal · passo 2 de 3",
    passo3: "terminal · passo 3 de 3",
    novoProjeto: "bun scripts/new-project.mjs my-project",
    saida: "linha de fecho esperada · da ficha da release",
  },
  comigo: {
    rotulo: "faça, ou faça comigo",
    titulo: "Testa o comando. Se passar, me chama.",
    texto:
      "O core é livre e continua assim. Auditoria técnica, ou a camada de decisão de pé no seu código: isso é uma conversa.",
    falar: "Falar comigo",
    discussion: "Abrir uma discussion",
    preco: "Não existe tabela de preço publicada: preço que ninguém validou é hipótese.",
  },
} as const;

// ── /shizune/evidencia ──────────────────────────────────────────────────────

/**
 * As contribuições — as duas contagens do design, com o comando de cada uma, e
 * a lista com link. Rodam contra o GitHub, não contra o clone. A soma é por
 * `awk`, e não por `bc` como no design: o `bc` não existe em toda máquina.
 *
 * Medido em 2026-10-15. O que mudou desde 16/09: a issue do cognee foi fechada
 * como concluída pelo mantenedor em 2026-10-04 — é ela que faz as aceitas serem
 * três, e não duas. **Nenhuma contagem de achados** (decisão de 16/09).
 */
const REPOS =
  "rohitg00/agentmemory mem0ai/mem0 topoteretes/cognee TeleAI-UAGI/Awesome-Agent-Memory";

export interface Contribuicao {
  repo: string;
  numero: number;
  tipo: "issue" | "pull request";
  estado: string;
  url: string;
}

export const contribuicoes = {
  medidoEm: "2026-10-15",
  abertas: 7,
  aceitas: 3,
  comandoAbertas: `for r in ${REPOS}; do gh api "search/issues?q=repo:$r+author:CaduAzeredo" --jq '.total_count'; done | awk '{s+=$1} END {print s}'`,
  comandoAceitas: `for r in ${REPOS}; do for q in 'is:pr+is:merged' 'is:issue+reason:completed'; do gh api "search/issues?q=repo:$r+author:CaduAzeredo+$q" --jq '.total_count'; done; done | awk '{s+=$1} END {print s}'`,
  itens: [
    { repo: "TeleAI-UAGI/Awesome-Agent-Memory", numero: 98, tipo: "pull request", estado: "mesclado em 2026-09-01", url: "https://github.com/TeleAI-UAGI/Awesome-Agent-Memory/pull/98" },
    { repo: "TeleAI-UAGI/Awesome-Agent-Memory", numero: 100, tipo: "issue", estado: "fechada como concluída pelo mantenedor em 2026-09-03", url: "https://github.com/TeleAI-UAGI/Awesome-Agent-Memory/issues/100" },
    { repo: "topoteretes/cognee", numero: 4865, tipo: "issue", estado: "fechada como concluída pelo mantenedor em 2026-10-04", url: "https://github.com/topoteretes/cognee/issues/4865" },
    { repo: "mem0ai/mem0", numero: 7202, tipo: "issue", estado: "aberta", url: "https://github.com/mem0ai/mem0/issues/7202" },
    { repo: "rohitg00/agentmemory", numero: 1313, tipo: "issue", estado: "aberta", url: "https://github.com/rohitg00/agentmemory/issues/1313" },
    { repo: "rohitg00/agentmemory", numero: 1314, tipo: "issue", estado: "aberta", url: "https://github.com/rohitg00/agentmemory/issues/1314" },
    { repo: "rohitg00/agentmemory", numero: 1315, tipo: "issue", estado: "aberta", url: "https://github.com/rohitg00/agentmemory/issues/1315" },
  ] as Contribuicao[],
};

export const evidencia = {
  cabeca: {
    rotulo: "shizune / evidência",
    titulo: "Evidência",
    texto:
      "Cada afirmação do produto, o comando que a confere no repositório público e quando ela foi medida pela última vez. O que você não consegue rodar sozinho não entra aqui.",
  },
  comoLer: {
    ancora: "como-ler",
    titulo: "Como ler o estado",
    legenda: [
      { marca: "● reproduzido", estado: "reproduzida" },
      { marca: "◐ desatualizada", estado: "desatualizada" },
      { marca: "◆ falhou", estado: "falhou" },
      { marca: "○ ainda não medido", estado: "nao-medida" },
    ],
    desatualizada: "Desatualizada",
    explicacao:
      " quer dizer que a medição não é do SHA da release mais recente. Não tem a ver com quantos dias passaram.",
  },
  afirmacoes: {
    ancora: "afirmacoes",
    titulo: "Afirmações que você roda",
    texto: "Cada uma roda num clone limpo do repositório público.",
    rotuloDoComando: "terminal · clone público limpo",
    mostra: "mostra:",
    naoMostra: "não mostra:",
    validador: {
      titulo: "O validador recusa o que deve",
      texto: "asserções no próprio teste negativo, dentro de um arquivo. Não é uma suíte de testes separados.",
      mostra: "Quantos casos o validador precisa recusar ou aceitar.",
      naoMostra: "Que ele acerta além desses casos.",
    },
    chaveDeMaquina: {
      titulo: "Chave de máquina não assina decisão",
      texto:
        "O teste negativo aponta uma decisão para um commit assinado por uma chave marcada maquina e espera a recusa, com o nome da chave.",
      mostra: "Que rascunho e decisão são assinados por chaves diferentes.",
      naoMostra: "Quem segurava a chave humana.",
    },
    doctor: {
      titulo: "O doctor não conta n/a como aprovado",
      texto: "é a linha de fecho numa árvore exportada: duas etapas não têm o que conferir ali e dizem isso.",
      mostra: "Que cada etapa rodou ou disse que não podia rodar.",
      naoMostra: "Que as etapas puladas passariam.",
    },
    pacote: {
      titulo: "O que você clona",
      texto: "arquivos no pacote público.",
      mostra: "Quanto você clona.",
      naoMostra: "A qualidade de nada disso.",
    },
    contribuicoes: {
      titulo: "Contribuições abertas em repositórios públicos",
      texto:
        "issues e pull requests abertos por CaduAzeredo em quatro repositórios públicos de memória de agente. O valor sai do comando, não é digitado aqui.",
      mostra:
        "Que cada contribuição é pública, com link. Quantas foram aceitas é outra contagem: pull requests mesclados mais issues fechadas como concluídas.",
      naoMostra:
        "Que os projetos são piores que outros: não houve comparação. Não é a contagem de achados resolvidos por terceiros do caderno de evidências, que conta achados.",
      rotuloDoComando: "terminal · roda contra o GitHub, precisa do gh logado",
      ondeRoda: "roda contra o GitHub, não contra o clone",
      aceitas: "Destas, aceitas:",
      aceitasTexto: "pull requests mesclados mais issues fechadas como concluídas pelo mantenedor.",
      lista: "Cada uma, com link",
      estadoEm: "Estado em 2026-10-15.",
    },
  },
  naoAfirmamos: {
    ancora: "nao-afirmamos",
    titulo: "O que não afirmamos",
    itens: [
      { titulo: "◆ Autoria humana", texto: "A assinatura mostra qual chave assinou, nunca quem escreveu o conteúdo." },
      { titulo: "◆ Economia", texto: "Nenhum ganho de tempo, tokens ou custo foi medido, então nenhum é afirmado." },
      { titulo: "◆ Decisão boa", texto: "O registro prova que uma decisão foi assinada, não que ela estava certa." },
    ],
  },
  encaixe: {
    ancora: "encaixe",
    rotulo: "Onde o Shizune se encaixa",
    titulo: (porExtenso: string): string => `${porExtenso} vizinhos. Uma ligação que falta.`,
    texto:
      "Todos os vizinhos que encontramos registram o que a máquina fez, ou seguram uma ação até alguém aprovar. Nenhum dos que encontramos liga essa ação a uma decisão humana assinada que um comando confere.",
    faixas: [
      { rotulo: "● os vizinhos", texto: "Registram o que a máquina fez.", produto: false },
      { rotulo: "● os vizinhos", texto: "Seguram uma ação até alguém aprovar.", produto: false },
      { rotulo: "◆ Shizune", texto: "Liga essa ação a uma decisão humana assinada, e um comando confere.", produto: true },
    ],
    nota:
      "Um mapa de encaixe, não uma comparação. Cada linha é a leitura de uma fonte pública, com o link e a data em que a lemos. A linha fica marcada como rascunho até o link ser conferido. Se você conhece uma ferramenta que fecha a lacuna, abra uma issue e a linha entra.",
    colunas: ["Vizinho", "O que resolve", "A lacuna", "Por onde o Shizune se conecta", "Degrau"],
    fonte: "fonte",
    lidaEm: "lida em",
    semFonte: "‹link primário›",
    semData: "‹data›",
    rascunho: "rascunho · link a conferir",
    rodape: "A última coluna usa os degraus do roadmap.",
    verDegraus: "Ver os seis degraus →",
  },
} as const;

// ── /shizune/roadmap ────────────────────────────────────────────────────────

/**
 * Uma frase do design mudou, porque foi escrita antes da release: "Estado de
 * hoje, antes da próxima release. Quando ela sair, o primeiro degrau vira feito".
 * Com a release publicada, o primeiro degrau JÁ é feito.
 */
export const roadmap = {
  cabeca: {
    rotulo: "shizune / roadmap",
    titulo: "Roadmap",
    texto: "Cada degrau fecha uma ameaça e publica uma prova. Degrau tem nome, não número.",
  },
  degraus: {
    ancora: "degraus",
    titulo: "Os seis degraus",
    nota:
      "Estado lido da ficha da release mais recente. Quando a próxima release sair, o degrau em andamento vira feito e o seguinte vira agora, no mesmo PR que atualiza esta página.",
    oQueFecha: "O que fecha",
    /** A marca do item que nomeia fornecedor de IA, até a fonte ser conferida. */
    rascunhoFornecedor: "rascunho · nome de fornecedor, fonte a conferir",
    prova: "Prova a publicar",
    quandoFeito: "Quando terminar",
    registro: "As notas da release e a seção do CHANGELOG viram o registro deste degrau.",
  },
  feito: {
    ancora: "feito",
    titulo: "Já feito",
    antes: {
      titulo: "Chave confiável que não é a do dono",
      texto:
        "O validador confere quem assinou contra a chave declarada, e a chave de máquina pode ser declarada. Saiu em 2026-09-10.",
      ancoraNoChangelog: "CHANGELOG.md#041---2026-09-10",
    },
    degrauFeito: (data: string): string =>
      `Fechado na release mais recente, em ${data}. As notas da release e a seção do CHANGELOG são o registro dele.`,
    notas: "Notas da release →",
    rodape: "O histórico em inglês mora nas notas de release e no CHANGELOG. Esta lista aponta para eles.",
  },
  cadeia: {
    ancora: "cadeia",
    rotulo: "fora dos degraus",
    titulo: "A cadeia: release até os sites",
    texto:
      "Cada site consulta a release pública mais recente por agendamento e abre um PR num ramo de prévia, no próprio repositório. O PR traz a diferença da ficha e passa pelo portão do site. O merge continua com o dono. O navegador nunca busca nada ao vivo.",
    ameacaRotulo: "Ameaça",
    ameaca: "Credencial que cruza repositórios; número que muda sem ninguém ver.",
    provaRotulo: "Prova a publicar",
    prova: "Sete testes negativos rodados em repositórios de teste. Sem eles, a cadeia não é afirmada.",
  },
  depois: {
    ancora: "depois",
    titulo: "Depois dos degraus",
    item: {
      titulo: "Painel de aprovação em tempo real",
      texto:
        "Assina no seu dispositivo e nunca guarda chave. Ameaça: a nova superfície do próprio painel. Prova: teste de intrusão antes de abrir.",
    },
  },
} as const;

/** A ficha da release, faixa "lido da ficha". */
export const faixa = {
  lido: (sha: string, data: string): string =>
    `Lido da ficha da release mais recente · sha ${sha} · ${data}`,
  emDia: "● em dia",
  atrasada:
    "Desatualizada: esta página saiu de uma ficha cujo SHA difere da release mais recente. Os estados abaixo podem estar atrasados.",
} as const;
