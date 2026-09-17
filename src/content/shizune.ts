/**
 * Conteúdo da rota /shizune.
 *
 * Separado do componente pelo mesmo motivo dos outros arquivos de `content/`:
 * o texto desta página é o produto, e ele muda com mais frequência do que o
 * layout. Quem for corrigir uma ressalva não deveria precisar abrir JSX.
 *
 * FONTE DOS NÚMEROS: medição própria de 2026-09-16, no commit `e575b46` do
 * repositório de origem (remedição da de 2026-09-10 em `b09888c`, mesmos
 * valores) e no SHA publicado `11cfbc2` (v0.4.1). A bíblia do
 * Cadu (§3) mediu em 2026-09-03 e ficou para trás; a regra dela mesma diz que
 * quando a bíblia e o repositório divergirem, o repositório ganha — e este
 * arquivo é corrigido no mesmo dia.
 *
 * REGRA QUE GOVERNA ESTE ARQUIVO: todo número vem com o comando que o
 * reproduz, ou com o SHA que o congela. Número solto não entra. Contagem de
 * commits assinados se diz como PROPORÇÃO ("todos desde a fronteira"), porque
 * o número solto envelhece a cada commit.
 *
 * E A REGRA TEM UMA CONDIÇÃO QUE FALTAVA: o comando precisa **reproduzir** o
 * número. Até 2026-09-10 o comando das decisões trazia `^|` — alternância com
 * o lado esquerdo vazio, que casa toda linha não vazia. Ele contava linhas e
 * devolvia 82 onde a página exibia 16. Imprimir um comando ao lado de um
 * número é oferecê-lo como prova; prova que não fecha é pior que número solto.
 * Quem editar isto: rode cada `comando` e confira contra o `valor` ao lado.
 *
 * DE ONDE O COMANDO RODA: do clone, na maioria — e a `ressalva` diz quando
 * não. O cartão dos check runs roda contra o GitHub (`gh api`), porque os
 * check runs vivem lá, não na árvore; a seção das contribuições também. A
 * frase de apresentação da seção de números dizia "cole qualquer um destes no
 * clone" e era falsa para esse cartão desde 2026-09-10; em 2026-09-16 passou a
 * prometer o que cumpre: cada comando diz de onde roda.
 *
 * PROPAGAÇÃO — este arquivo alimenta a `/shizune` (fatos, contribuições,
 * placar), a home (`badgeDoProduto`, `faixaDaVitrine`, `etapasDoDoctor`,
 * `fechoDoDoctor`) e o JSON-LD; os mesmos fatos vivem em `shizune-ficha.ts`
 * (a Rei), `novidades.ts` (verbetes) e no site do produto (`method.ts`,
 * `ficha.ts`). **Mudou aqui, muda lá na mesma passada** — foi por não ter esta
 * lista que o badge de versão sobreviveu cravado no JSX a uma passada inteira
 * de correção. Ver AGENTS.md § Propagação.
 */

export interface FatoMedido {
  valor: string;
  rotulo: string;
  comando: string;
  ressalva?: string;
}

export interface CardDaFronteira {
  estado: string;
  ordem: string;
  frase: string;
  enfase: string;
  detalhe: string;
  fonte: string;
  aberto: boolean;
}

export interface Recorte {
  sigla: string;
  fonte: string;
  quando: string;
  citacao: string;
  enfase: string;
  fecho: string;
  vaga?: boolean;
}

/**
 * Data em que os números abaixo foram apurados. Move junto com eles.
 *
 * 2026-09-16: os seis comandos da lista foram rodados de novo contra a origem
 * em `e575b46` e devolveram os mesmos valores (20 decisões; 50 commits desde a
 * fronteira, todos `G`; 57 asserções; 66 arquivos; a v0.4.1 não mudou). A data
 * moveu porque a medição foi refeita, não porque um número mudou.
 */
export const medidoEm = "2026-09-16";

/** O SHA da origem em que a medição foi feita. */
export const shaMedicao = "e575b46";

/** Versão publicada e o SHA que qualquer pessoa recebe ao clonar. */
export const versaoPublicada = "v0.4.1";
export const shaPublicado = "11cfbc2";

/** SHA da primeira passada do diagnóstico contra si mesmo. */
export const shaDiagnostico = "c248f75";

export const fatos: FatoMedido[] = [
  {
    valor: "20",
    rotulo: "decisões no registro",
    comando:
      "grep -cE '^\\| DEC-[0-9]{3} \\|' governance/registro-decisoes.md",
    ressalva:
      "15 vigentes e 5 em rascunho, que existem e não contam — a máquina rascunha, o humano assina, o SHA ativa. O comando anterior desta linha não reproduzia o número que ela exibia; foi corrigido em 2026-09-10, e o número mudou junto.",
  },
  {
    valor: "todos",
    rotulo: "os commits desde a fronteira de autoria estão assinados",
    comando: "git log --format='%G?' 9ca7a4e..HEAD",
    ressalva:
      "50 de 50 em 2026-09-16, no commit e575b46 (eram 43 de 43 em 2026-09-10, em b09888c). O número anda a cada commit; a proporção não.",
  },
  {
    valor: "57",
    rotulo: "asserções no teste negativo do validador de decisões",
    comando: "grep -cE '^\\s*ok\\(' scripts/test-validate-decisions.mjs",
    ressalva:
      "São 57 asserções dentro de um arquivo — não uma suíte de 57 testes.",
  },
  {
    valor: "9 · 7 · 2",
    rotulo: "etapas do doctor: 9 no total, 7 executam, 2 respondem n/a",
    comando: "node scripts/doctor.mjs",
    ressalva:
      "Num clone do pacote, duas etapas não têm o que verificar e respondem n/a — e isso é o comportamento certo. O defeito é a linha de fecho do comando dizer que os 9 passaram, contando os n/a como aprovados: está aberto como item 47 da fila e declarado no CHANGELOG da v0.4.1. Por isso o número aqui é 9 · 7 · 2 e não 9.",
  },
  {
    valor: "2",
    rotulo:
      "chaves na lista de confiança: a do operador e a de máquina, que assina rascunho e nunca decisão",
    comando: "git log -1 --format='%G? %GS' <sha da assinatura>",
    ressalva:
      "Desde 2026-09-10 o validador lê qual chave assinou, não só se a assinatura é boa: decisão assinada pela chave de máquina reprova, e assinante declarado que não corresponde ao principal da chave reprova. Isso prova qual chave assinou — não prova autoria humana.",
  },
  {
    valor: "66",
    rotulo: "arquivos no pacote público",
    comando:
      "grep -cE '^[^[:space:]]' governance/public-package/inventario-esperado.txt",
  },
  {
    valor: "6 de 6",
    rotulo: "check runs verdes no SHA publicado — Node 20, Node 22 e Bun",
    comando: "gh api repos/CaduAzeredo/shizune/commits/11cfbc2/check-runs",
    ressalva:
      "v0.4.1, publicada em 2026-09-10. Este é o único desta lista que não roda no clone: roda contra o GitHub, com gh autenticado — os check runs vivem lá, não na árvore.",
  },
];

/**
 * As contribuições da primeira rodada — seção própria, com procedência própria.
 *
 * Não entram na lista `fatos` de propósito: aquela seção se apresenta com
 * "cole qualquer um destes no clone e ele responde", e este comando não roda
 * no clone — roda contra o GitHub, com `gh` autenticado. Misturar os dois
 * tornaria falsa a frase de apresentação da seção, que é exatamente a classe
 * de defeito que esta página existe para apontar. Decisão do operador em
 * 2026-09-16 (opção A das três que estavam na mesa).
 *
 * Até 2026-09-15 os quatro alvos estavam sob embargo de divulgação
 * responsável e nenhum nome aparecia aqui. O embargo venceu; o que entra é o
 * que está público na página de cada alvo — sete issues e pull requests, com
 * link e estado. **Nenhuma contagem de achados**, nem por alvo, nem agregada:
 * o total anunciaria defeitos encontrados e não contados aos mantenedores. O
 * total vive no relatório escrito; a evidência aqui são os links.
 *
 * Quem editar isto: rode o comando e confira o `estado` de cada linha contra
 * o que o GitHub devolve. `estado` é fato do dia da medição.
 */
export interface Contribuicao {
  repo: string;
  numero: number;
  tipo: "issue" | "pull request";
  estado: string;
  url: string;
}

export const contribuicoes = {
  medidoEm: "2026-09-16",
  procedencia:
    "Estes não saem do clone: saem do GitHub. O comando abaixo precisa de gh autenticado e lista as sete para qualquer pessoa.",
  texto:
    "O método rodou pela primeira vez contra quatro repositórios públicos, em 2026-09-01. Sete contribuições foram enviadas — seis issues e um pull request — e duas foram aceitas pelos mantenedores. Cada uma é pública na página do projeto.",
  comando:
    'for r in rohitg00/agentmemory mem0ai/mem0 topoteretes/cognee TeleAI-UAGI/Awesome-Agent-Memory; do gh api "search/issues?q=repo:$r+author:CaduAzeredo" --jq \'.items[] | "\\(.number)\\t\\(.state)\\t\\(.title)"\'; done',
  itens: [
    {
      repo: "TeleAI-UAGI/Awesome-Agent-Memory",
      numero: 98,
      tipo: "pull request",
      estado: "mesclado em 2026-09-01",
      url: "https://github.com/TeleAI-UAGI/Awesome-Agent-Memory/pull/98",
    },
    {
      repo: "TeleAI-UAGI/Awesome-Agent-Memory",
      numero: 100,
      tipo: "issue",
      estado: "fechada como concluída pelo mantenedor em 2026-09-03",
      url: "https://github.com/TeleAI-UAGI/Awesome-Agent-Memory/issues/100",
    },
    {
      repo: "mem0ai/mem0",
      numero: 7202,
      tipo: "issue",
      estado: "aberta",
      url: "https://github.com/mem0ai/mem0/issues/7202",
    },
    {
      repo: "topoteretes/cognee",
      numero: 4865,
      tipo: "issue",
      estado: "aberta",
      url: "https://github.com/topoteretes/cognee/issues/4865",
    },
    {
      repo: "rohitg00/agentmemory",
      numero: 1313,
      tipo: "issue",
      estado: "aberta",
      url: "https://github.com/rohitg00/agentmemory/issues/1313",
    },
    {
      repo: "rohitg00/agentmemory",
      numero: 1314,
      tipo: "issue",
      estado: "aberta",
      url: "https://github.com/rohitg00/agentmemory/issues/1314",
    },
    {
      repo: "rohitg00/agentmemory",
      numero: 1315,
      tipo: "issue",
      estado: "aberta",
      url: "https://github.com/rohitg00/agentmemory/issues/1315",
    },
  ] as Contribuicao[],
};

/**
 * O rótulo do `doctor` na demonstração de terminal.
 *
 * Vive aqui, e não no JSX, porque até 2026-09-10 ele estava cravado em
 * `shizune-page.tsx` — onde nenhum arquivo de conteúdo o governava, e por isso
 * sobreviveu a todas as correções de número que passaram por este arquivo.
 */
export const rotuloDoctorNoTerminal = "9 etapas · 7 executam · 2 n/a";

/**
 * O badge do card do produto na home.
 *
 * Deriva de `versaoPublicada` de propósito: não tem valor próprio, então não
 * pode divergir da fonte. Cravado no JSX, ele ficou em v0.3.1 e sobreviveu à
 * passada que corrigiu todos os outros números da página — o mesmo caminho do
 * "9 verificadores".
 */
export const badgeDoProduto = `no ar · ${versaoPublicada}`;

/**
 * As etapas do `doctor`, com a marca que cada uma recebe **num clone do
 * pacote público** — que é onde o leitor vai rodar o comando.
 *
 * As duas marcadas `n/a` não têm o que verificar fora da instância de onde o
 * pacote é exportado, e responder `n/a` ali é o comportamento certo. A janela
 * de terminal da home mostrava cinco etapas, todas `OK`, e fechava com "os 5
 * verificadores passaram" — retrato de 2026-08-31 que nunca mais foi tocado.
 * Mostrar 9 todas `OK` seria trocar um número velho por uma afirmação falsa.
 *
 * Medido em 2026-09-10, no clone público em v0.4.1 (11cfbc2).
 */
export const etapasDoDoctor: { rotulo: string; marca: "OK" | "n/a" }[] = [
  { rotulo: "estrutura", marca: "OK" },
  { rotulo: "links", marca: "OK" },
  { rotulo: "refs em prosa", marca: "OK" },
  { rotulo: "estado da governança", marca: "OK" },
  { rotulo: "export (dry-run)", marca: "n/a" },
  { rotulo: "issue-lint (teste negativo)", marca: "n/a" },
  { rotulo: "decisões (DEC-NNN)", marca: "OK" },
  { rotulo: "decisões (teste negativo)", marca: "OK" },
  { rotulo: "índice (teste negativo)", marca: "OK" },
];

/** O fecho da janela de terminal — o que a execução fez, não o total. */
export const fechoDoDoctor = "7 executaram e passaram · 2 n/a";

/**
 * A faixa de três números da home.
 *
 * Vive aqui pelo motivo do `rotuloDoctorNoTerminal`: cravada no JSX, ela
 * envelheceu sem que ninguém percebesse — chegou a 2026-09-10 dizendo "16
 * decisões assinadas", "9 verificadores" e "1 achado aberto", este último já
 * fechado desde 2026-09-09 e desmentido pela própria /shizune.
 */
export const faixaDaVitrine = [
  "15 decisões assinadas, 20 no registro",
  "9 etapas no doctor · 7 executam",
  "nenhum achado aberto — o último, e o erro de diagnóstico, publicados",
];

/**
 * As três perguntas. A terceira é o produto — e a tríade agora afirma a
 * resposta em vez de lamentar a ausência: "O registro diz o que o humano
 * decidiu."
 */
export const fronteira: CardDaFronteira[] = [
  {
    estado: "Resolvido",
    ordem: "01 / 03",
    frase: "A marca d’água diz",
    enfase: "o que a máquina escreveu",
    detalhe:
      "Pergunta técnica, resposta técnica. Ela identifica a ferramenta — e nada além.",
    fonte: "2026-08-02",
    aberto: false,
  },
  {
    estado: "Resolvido",
    ordem: "02 / 03",
    frase: "A chave diz",
    enfase: "quem enviou",
    detalhe:
      "O block/buzz dá a cada agente conta, chave criptográfica e permissão próprias. Identidade resolvida.",
    fonte: "jul/2026",
    aberto: false,
  },
  {
    estado: "O produto",
    ordem: "03 / 03",
    frase: "O registro diz",
    enfase: "o que o humano decidiu",
    detalhe:
      "Decisão numerada, com assinante e SHA, que o comando exige antes de deixar o build passar. É isso que o Shizune é. Desde 2026-09-10 o comando também confere qual chave assinou: a chave que o agente usa para rascunho nunca assina decisão, e o nome escrito na linha tem de bater com o principal da chave. Continua sem provar que um humano escreveu o conteúdo — prova quem tinha a chave, e a chave pede senha desde 2026-09-06.",
    fonte: "scripts/validate-decisions.mjs",
    aberto: true,
  },
];

/**
 * Recortes: material de terceiros, só com fonte verificável.
 *
 * A vaga tracejada continua vazia de propósito — não se inventa depoimento
 * numa página cuja tese é integridade de registro.
 *
 * Sobre os alvos da rodada de diagnóstico: o embargo de divulgação
 * responsável venceu em 2026-09-15, e os quatro alvos e as sete contribuições
 * entram com nome e link — na seção `contribuicoes`, não aqui. O que continua
 * fora, em caráter permanente, é todo achado que não foi enviado (as peças
 * pendentes foram abandonadas em 2026-09-16) e qualquer contagem de achados,
 * por alvo ou agregada. O `Awesome-Agent-Memory` segue fora de conteúdo de
 * VÍDEO pela decisão de 2026-09-01 (alvo pequeno, achado sobre o produto do
 * próprio mantenedor); na lista de contribuições ele entra, porque pull
 * request mesclado é fato público.
 */
export const recortes: Recorte[] = [
  {
    sigla: "B",
    fonte: "block.xyz",
    quando: "jul/2026",
    citacao: "Cada agente é membro de verdade, com",
    enfase: "conta própria, chaves criptográficas e permissões",
    fecho:
      "Quem fez, resolvido. A autoridade da decisão — quem mandou fazer, e com que direito — não entrou na conta.",
  },
  {
    sigla: "§",
    fonte: "Apache License 2.0, seção 6",
    quando: "texto legal",
    citacao: "A licença concede patente e cópia, e",
    enfase: "não concede direito de marca",
    fecho:
      "Por isso o código é livre e o nome composto não é. Fork é direito; assinatura é identidade.",
  },
  {
    sigla: "◇",
    fonte: "medição própria",
    quando: "2026",
    citacao: "Arquivo de contexto",
    enfase: "aumenta",
    fecho:
      "O erro é nosso e está publicado. É por isso que o argumento aqui é precisão, nunca economia.",
  },
  {
    sigla: "—",
    fonte: "vaga reservada",
    quando: "a confirmar",
    citacao: "[CITAÇÃO DE TERCEIRO — texto e fonte a confirmar]",
    enfase: "",
    fecho:
      "Entra quando houver uma frase pública, com link, que sustente o argumento. Não se inventa depoimento numa página cuja tese é integridade de registro.",
    vaga: true,
  },
];

/**
 * Contra nós mesmos — o arco inteiro, porque ele só funciona inteiro.
 *
 * Regra dura da bíblia (§3.3): o achado aberto vai junto, SEMPRE. Uma peça
 * que cite os quatro fechados sem citar o aberto está fazendo exatamente o
 * que a tese denuncia.
 */
export const contraNosMesmos = [
  "Apontamos o Shizune contra o próprio Shizune — três passadas no mesmo dia, em clone limpo, com HOME vazio, sem nada da instância.",
  "Primeira passada, no SHA c248f75: cinco achados. Nenhum de segurança, nenhum vazamento.",
  "Quatro foram fechados em código e texto, e a v0.3.1 saiu. O relatório do SHA publicado (0ccfe4f) fecha o placar em um.",
  "O que ficou aberto por mais tempo foi o apex shizune.dev não responder — e o diagnóstico dele estava errado. Dizia falha de TLS; a causa nunca foi TLS. O domínio nunca tinha sido adicionado ao Vercel, e a delegação apontava para nameservers que recusavam a zona. Fechado em 2026-09-09, e o erro de diagnóstico fica escrito aqui: corrigir o placar sem dizer o que se errou seria o defeito que a tese denuncia.",
];

export interface FaixaDoPlacar {
  severidade: string;
  quantidade: string;
  proporcao: number;
  define: string;
  destaque: boolean;
}

/** O arco do diagnóstico, linha a linha retrátil. */
export const placarDoDiagnostico: FaixaDoPlacar[] = [
  {
    severidade: "Achados em c248f75",
    quantidade: "5",
    proporcao: 1,
    define:
      "Primeira passada: nenhuma alta, três médias, duas baixas. Nenhuma de segurança. Nenhum vazamento.",
    destaque: false,
  },
  {
    severidade: "Fechados na v0.3.1",
    quantidade: "4",
    proporcao: 0.8,
    define:
      "Consertados em código e texto e verificados no clone do SHA publicado, não na máquina do autor.",
    destaque: false,
  },
  {
    severidade: "Fechado em 2026-09-09",
    quantidade: "1",
    proporcao: 0.2,
    define:
      'Ficou aberto desde 0ccfe4f: o apex shizune.dev não respondia enquanto o www respondia. O diagnóstico dizia falha de TLS e estava errado — o domínio nunca tinha entrado no Vercel, e a delegação apontava para nameservers que recusavam a zona. Confere com: curl -s -o /dev/null -w "%{http_code}" -L --max-time 20 https://shizune.dev',
    destaque: true,
  },
];

export const totalDoPlacar = {
  valor: "0",
  rotulo: "achado aberto no SHA publicado",
  ressalva:
    "Os cinco estão fechados desde 2026-09-09. O último não era defeito de código e o diagnóstico dele estava errado — fica escrito assim mesmo, porque uma peça que zera o placar sem dizer o que errou faz exatamente o que a tese denuncia.",
};

export const limiteDoDiagnostico =
  "Cinco checagens portáteis não são auditoria. Não houve comparação com nenhum outro projeto.";

export const notaDeMarca =
  "Fork é livre sob a licença, mas não usa o nome composto.";

export const repositorio = "https://github.com/CaduAzeredo/shizune";
export const discussoes = "https://github.com/CaduAzeredo/shizune/discussions";
/** O apex é o canônico: o `www` redireciona para cá, e é este que o README cita. */
export const siteDoProduto = "https://shizune.dev";
