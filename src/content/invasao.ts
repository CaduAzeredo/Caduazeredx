/**
 * O modo de defesa — o easter egg.
 *
 * A ficção: alguém digita um comando de invasão no console da Rei, e o site
 * responde trancando tudo em vermelho de alarme. Estética de internet velha do
 * Cyberpunk 2077, com a cyberpsicose vazando pela interface.
 *
 * A voz das janelas é a **do site**, não a de um vilão: seca, técnica, e
 * honesta até no meio da brincadeira. A piada boa aqui é o site levar o ataque
 * a sério demais para algo que é literalmente HTML estático — e depois admitir
 * isso.
 */

/**
 * O que dispara. Escrito sem acento e em minúsculas; a comparação normaliza
 * dos dois lados.
 *
 * `hacker.uxe` está aqui de propósito, ao lado de `hacker.exe`: foi assim que o
 * comando nasceu, ditado por voz, e quem for tentar de novo vai digitar o que
 * lembra — não o que está certo. Aceitar as duas grafias custa uma linha.
 */
export const COMANDOS_INVASAO = [
  "hacker.exe",
  "hacker.uxe",
  "hacker",
  "sudo hack",
  "sudo su",
  "rm -rf",
  "invadir",
  "drop table",
  "' or 1=1",
];

export interface JanelaInvasao {
  id: string;
  titulo: string;
  linhas: string[];
  /** Destaca a janela: usada na primeira e na última. */
  forte?: boolean;
}

export const janelasInvasao: JanelaInvasao[] = [
  {
    id: "deteccao",
    titulo: "intrusion.log",
    forte: true,
    linhas: [
      "TENTATIVA DE INTRUSÃO DETECTADA",
      "origem ......... este navegador",
      "vetor .......... a caixa de texto da Rei",
      "sofisticação ... baixa",
    ],
  },
  {
    id: "defesa",
    titulo: "defesa.sys",
    linhas: [
      "MODO DE DEFESA ATIVO",
      "",
      "Todos os tokens de cor foram trocados",
      "por vermelho de alarme.",
      "",
      "É honestamente tudo que eu sei fazer.",
    ],
  },
  {
    id: "rei",
    titulo: "rei.status",
    linhas: [
      "A Rei foi para um lugar seguro.",
      "",
      "Ela pediu para avisar que não guarda",
      "segredo nenhum — as respostas dela são",
      "um arquivo de texto — então isso aqui",
      "não valeu muito a pena.",
    ],
  },
  {
    id: "forense",
    titulo: "forense.txt",
    linhas: [
      "RELATÓRIO PRELIMINAR",
      "",
      "arquivos acessados ....... 0",
      "dados exfiltrados ........ 0",
      "usuários comprometidos ... 0",
      "",
      "Este site é estático. Não há banco de",
      "dados, não há sessão, não há o que levar.",
    ],
  },
  {
    id: "recompensa",
    titulo: "recompensa.txt",
    forte: true,
    linhas: [
      "Mas você chegou até aqui.",
      "",
      "O código-fonte inteiro deste site e do",
      "método que ele vende está aberto no",
      "GitHub — sempre esteve. Você podia ter",
      "clicado no link do topo.",
      "",
      "Vá lá assim mesmo. É mais interessante",
      "que este vermelho.",
    ],
  },
];

/** A linha da barra fixa enquanto o modo está ativo. */
export const barraInvasao = "SISTEMA EM MODO DE DEFESA";

/** O que a Rei diz um instante antes de tudo ficar vermelho. */
export const reiAntesDaInvasao = "Ah. Você é desse tipo. Tudo bem — segura aí.";
