/**
 * A ficha da release do Shizune, lida — só os campos que as páginas mostram.
 *
 * A fonte é `ficha-release.json`, cópia byte a byte do `shizune-release.json`
 * anexado à release mais recente do pacote (DEC-026 no Brain: a release é a
 * fonte, os sites são cópias). É a MESMA ficha que o shizune.dev lê. Quem troca
 * o arquivo é a cadeia, num PR em `preview/*`, ou `node scripts/ficha.mjs
 * <arquivo>`, à mão. Nada aqui é digitado: cada número, data e SHA das páginas
 * do Shizune neste site sai do arquivo, com o comando que o reproduz.
 *
 * A versão e a tag NÃO são importadas aqui: a regra é "sem versão no texto
 * visível", e o JSON é importado campo a campo para que o empacotador deixe fora
 * do pacote o que nenhuma página lê. A versão entra num lugar só: o JSON-LD da
 * `/shizune`.
 *
 * PROPAGAÇÃO — ver AGENTS.md § Propagação.
 */
import { chain, changelog, date, evidence, sha, steps } from "./ficha-release.json";
import { sha as shaDaReleaseMaisRecente } from "./release-mais-recente.json";

export type IdDegrau =
  | "agent-signs-for-owner"
  | "poisoned-index-or-memory"
  | "forged-attestation"
  | "tampered-generated-rules"
  | "approval-on-autopilot"
  | "long-lived-leaked-key";

export type EstadoDegrau = "done" | "now" | "todo" | "blocked";

/** Medida no SHA da release mais recente é reproduzida; em outro SHA, desatualizada. */
export type EstadoDaAfirmacao = "reproduzida" | "desatualizada" | "nao-medida";

interface Afirmacao {
  readonly id: string;
  readonly value: number | string;
  readonly command: string;
  readonly sha: string;
  readonly measured_at: string;
  readonly capture?: string;
}

const afirmacoes = evidence as readonly Afirmacao[];
const afirmacao = (id: string): Afirmacao | undefined =>
  afirmacoes.find((a) => a.id === id);

function exigir(id: string): Afirmacao {
  const a = afirmacao(id);
  if (!a) throw new Error(`ficha-release.json sem a afirmação "${id}"`);
  return a;
}

/** As duas formas da linha final do `doctor`. Outra forma falha alto. */
function lerDoctor(valor: string): { passaram: number; na: number } {
  const comNa = valor.match(/^(\d+) passaram, (\d+) n\/a$/);
  if (comNa) return { passaram: Number(comNa[1]), na: Number(comNa[2]) };
  const semNa = valor.match(/^os (\d+) verificadores passaram$/);
  if (semNa) return { passaram: Number(semNa[1]), na: 0 };
  throw new Error(`linha do doctor que a página não sabe ler: "${valor}"`);
}

const doctor = String(exigir("doctor-summary").value);

export const ficha = {
  sha,
  shaCurto: sha.slice(0, 7),
  data: date,
  changelog,
  desatualizada: shaDaReleaseMaisRecente !== sha,
  asseracoes: Number(exigir("negative-test-assertions").value),
  arquivos: Number(exigir("package-files").value),
  doctor: { ...lerDoctor(doctor), linha: `Resultado: OK — ${doctor}.` },
  captura: (exigir("negative-test-output").capture ?? "").replace(/\r\n/g, "\n"),
} as const;

export function comandoDe(id: string): string {
  return exigir(id).command;
}

export function estadoDe(id: string): EstadoDaAfirmacao {
  const a = afirmacao(id);
  if (!a) return "nao-medida";
  return a.sha === sha ? "reproduzida" : "desatualizada";
}

export function medicaoDe(id: string): { data: string; shaCurto: string } {
  const a = exigir(id);
  return { data: a.measured_at, shaCurto: a.sha.slice(0, 7) };
}

const estados = new Map(
  (steps as ReadonlyArray<{ id: string; state: string }>).map((s) => [s.id, s.state]),
);

export function estadoDoDegrau(id: IdDegrau): EstadoDegrau {
  const e = estados.get(id);
  if (e === "done" || e === "now" || e === "todo" || e === "blocked") return e;
  throw new Error(`ficha-release.json sem estado válido para o degrau "${id}"`);
}

/** A cadeia release → sites fica fora dos degraus, com estado próprio na ficha. */
export const estadoDaCadeia = chain.state as EstadoDegrau;

/** O link para a seção do CHANGELOG que a ficha aponta (`CHANGELOG.md#…`). */
export const secaoDoChangelog = (ancoraDaFicha: string): string =>
  `https://github.com/CaduAzeredo/shizune/blob/main/${ancoraDaFicha}`;

/** Uma seção inteira da captura, do marcador até a linha antes do próximo. */
export function trechoDaSecao(saida: string, secao: string): string {
  const linhas = saida.split("\n");
  const inicio = linhas.findIndex((l) => l.startsWith(secao));
  if (inicio < 0) return "";
  let fim = linhas.length;
  for (let i = inicio + 1; i < linhas.length; i++) {
    if (/^\[[^\]]+\]/.test(linhas[i]) || /^test-validate-decisions:/.test(linhas[i])) {
      fim = i;
      break;
    }
  }
  return linhas.slice(inicio, fim).join("\n").replace(/\s+$/, "");
}

export default ficha;
