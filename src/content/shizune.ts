/**
 * Conteúdo da rota /shizune.
 *
 * Separado do componente pelo mesmo motivo dos outros arquivos de `content/`:
 * o texto desta página é o produto, e ele muda com mais frequência do que o
 * layout. Quem for corrigir uma ressalva não deveria precisar abrir JSX.
 *
 * FONTE DOS NÚMEROS: a bíblia do Cadu (§3, lista fechada), medida em
 * 2026-09-03 no commit `70c3fb0` do repositório de origem e no SHA publicado
 * `0ccfe4f`. Quando a bíblia e o repositório divergirem, o repositório ganha
 * — e este arquivo é corrigido no mesmo dia.
 *
 * REGRA QUE GOVERNA ESTE ARQUIVO: todo número vem com o comando que o
 * reproduz, ou com o SHA que o congela. Número solto não entra. Contagem de
 * commits assinados se diz como PROPORÇÃO ("todos desde a fronteira"), porque
 * o número solto envelhece a cada commit.
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

/** Data em que os números abaixo foram apurados. Move junto com eles. */
export const medidoEm = "2026-09-03";

/** O SHA da origem em que a medição foi feita. */
export const shaMedicao = "70c3fb0";

/** Versão publicada e o SHA que qualquer pessoa recebe ao clonar. */
export const versaoPublicada = "v0.3.1";
export const shaPublicado = "0ccfe4f";

/** SHA da primeira passada do diagnóstico contra si mesmo. */
export const shaDiagnostico = "c248f75";

export const fatos: FatoMedido[] = [
  {
    valor: "16",
    rotulo: "decisões registradas e assinadas",
    comando: "grep -cE '^| *`?DEC-[0-9]+' governance/registro-decisoes.md",
  },
  {
    valor: "todos",
    rotulo: "os commits desde a fronteira de autoria estão assinados",
    comando: "git log --format='%G?' 9ca7a4e..HEAD",
    ressalva:
      "19 de 19 em 2026-09-03, no commit 70c3fb0. O número anda a cada commit; a proporção não.",
  },
  {
    valor: "28",
    rotulo: "asserções no teste negativo do validador de decisões",
    comando: "grep -cE '^\\s*ok\\(' scripts/test-validate-decisions.mjs",
    ressalva:
      "São 28 asserções dentro de um arquivo — não uma suíte de 28 testes.",
  },
  {
    valor: "9",
    rotulo: "verificadores rodam em sequência e reprovam o build",
    comando: "node scripts/doctor.mjs",
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
    comando: "gh api repos/CaduAzeredo/shizune/commits/0ccfe4f/check-runs",
    ressalva: "v0.3.1, publicada em 2026-09-03.",
  },
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
      "Decisão numerada, com assinante e SHA, que o comando exige antes de deixar o build passar. É isso que o Shizune é.",
    fonte: "scripts/validate-decisions.mjs",
    aberto: true,
  },
];

/**
 * Recortes: material de terceiros, só com fonte verificável.
 *
 * A vaga tracejada continua vazia de propósito — não se inventa depoimento
 * numa página cuja tese é integridade de registro. E nenhum alvo da rodada de
 * diagnóstico aparece pelo nome: embargo de divulgação responsável até
 * 2026-09-15, e o alvo com contribuições aceitas fica fora de material de
 * conteúdo por decisão do operador (2026-09-01).
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
  "O que continua aberto: o apex shizune.dev falha o TLS. Não é defeito de código, nenhuma edição do repositório o fecha — e ele vai citado em toda peça, porque esconder o aberto seria o defeito que a tese denuncia.",
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
    severidade: "Aberto em 0ccfe4f",
    quantidade: "1",
    proporcao: 0.2,
    define:
      'O apex shizune.dev devolve HTTP 000 enquanto www responde 200. Reproduz com: curl -s -o /dev/null -w "%{http_code}" -L --max-time 20 https://shizune.dev',
    destaque: true,
  },
];

export const totalDoPlacar = {
  valor: "1",
  rotulo: "achado aberto no SHA publicado",
  ressalva:
    "O aberto vai junto, sempre: uma peça que cite os quatro fechados sem citar o que resta estaria fazendo exatamente o que a tese denuncia.",
};

export const limiteDoDiagnostico =
  "Cinco checagens portáteis não são auditoria. Não houve comparação com nenhum outro projeto.";

export const notaDeMarca =
  "Fork é livre sob a licença, mas não usa o nome composto.";

export const repositorio = "https://github.com/CaduAzeredo/shizune";
export const discussoes = "https://github.com/CaduAzeredo/shizune/discussions";
export const siteDoProduto = "https://www.shizune.dev";
