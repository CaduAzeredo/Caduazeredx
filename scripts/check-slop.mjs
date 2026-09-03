#!/usr/bin/env node
/**
 * Scanner anti-slop — os vícios visuais de interface gerada por IA.
 *
 * Adaptado do scanner do `codeswithroh/tastemaker` (MIT) às regras que este
 * repositório já escreveu para si. A implementação é nossa; a ideia de que
 * "parecer feito por IA" é detectável mecanicamente é dele.
 *
 * O item 5 nasceu de um achado desconfortável: a skill oficial `frontend-design`
 * da Anthropic lista **"near-black + acid-green"** entre os três padrões que
 * denunciam design gerado por IA — e é perto da nossa paleta. O que separa uma
 * coisa da outra é a saturação: o nosso verde é floresta (~44%), não o verde de
 * terminal falso (~100%). Antes isso dependia de eu lembrar. Agora não.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TOKENS = path.join(RAIZ, "src/styles/tokens.css");

/** Onde cor não pode ser escrita à mão — a regra já documentada no AGENTS.md. */
const SEM_COR = [path.join(RAIZ, "src/components"), path.join(RAIZ, "src/pages")];
/** Onde os demais vícios são procurados. */
const INTERFACE = [
  path.join(RAIZ, "src/components"),
  path.join(RAIZ, "src/pages"),
  path.join(RAIZ, "src/content"),
];

const TETO_SATURACAO = 0.65;

function arquivos(dirs, exts) {
  const saida = [];
  const anda = (dir) => {
    for (const nome of readdirSync(dir)) {
      const p = path.join(dir, nome);
      if (statSync(p).isDirectory()) anda(p);
      else if (exts.some((e) => nome.endsWith(e))) saida.push(p);
    }
  };
  for (const d of dirs) anda(d);
  return saida;
}

const rel = (p) => path.relative(RAIZ, p).replace(/\\/g, "/");
const achados = [];

function acusa(regra, arq, i, linha, porque) {
  achados.push({
    regra,
    arq: rel(arq),
    linha: i + 1,
    texto: linha.trim().slice(0, 96),
    porque,
  });
}

// ── 1. cor escrita à mão em componente ──────────────────────────────────────

for (const arq of arquivos(SEM_COR, [".tsx"])) {
  readFileSync(arq, "utf8")
    .split("\n")
    .forEach((linha, i) => {
      if (/#[0-9a-fA-F]{6}\b/.test(linha) || /\brgba?\(/.test(linha)) {
        acusa(
          "cor em .tsx",
          arq,
          i,
          linha,
          "a cor sai do token e para de acompanhar tema e modo — use uma classe utilitária",
        );
      }
    });
}

// ── 2-4. os vícios de composição ────────────────────────────────────────────

const VICIOS = [
  {
    regra: "gradiente em texto",
    re: /\bbg-clip-text\b|-webkit-background-clip:\s*text/,
    porque: "título com gradiente é o clichê nº 1 de interface gerada por IA",
  },
  {
    regra: "mancha roxa de blur",
    re: /\bblur-(2xl|3xl)\b[^"']*\b(purple|violet|fuchsia|indigo)-|\b(purple|violet|fuchsia|indigo)-\d{3}\b[^"']*\bblur-(2xl|3xl)\b/,
    porque: "o borrão roxo de fundo é o segundo clichê — e aqui não há roxo",
  },
  {
    regra: "emoji na interface",
    re: /\p{Extended_Pictographic}/u,
    porque:
      "o DESIGN.md proíbe emoji: ícone é SVG traçado, que escala e recolore",
  },
];

for (const arq of arquivos(INTERFACE, [".tsx", ".ts"])) {
  readFileSync(arq, "utf8")
    .split("\n")
    .forEach((linha, i) => {
      for (const v of VICIOS) {
        if (v.re.test(linha)) acusa(v.regra, arq, i, linha, v.porque);
      }
    });
}

// ── 5. teto de saturação do acento ──────────────────────────────────────────

function saturacao(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return 0;
  return d / (1 - Math.abs(2 * l - 1));
}

/**
 * O teto de saturacao vale para a PALETA DE MARCA, e nao para o modo de defesa.
 *
 * O bloco `[data-invadido]` e o easter egg: o site fingindo ter sido invadido.
 * Cor de alarme e para alarmar, e desaturar ali seria aplicar a regra sem
 * entender por que ela existe — o teto nasceu para impedir que a marca caia no
 * vicio "near-black + acid-green", nao para proibir vermelho de alerta.
 *
 * A excecao e pelo nome do seletor, e nao por lista de cores: assim ela nao
 * pode ser usada para passar contrabando na paleta de verdade. O contraste
 * daquele bloco continua sendo medido pelo check-contrast, junto com os outros.
 */
const cssBruto = readFileSync(TOKENS, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
const iDefesa = cssBruto.indexOf("[data-invadido]");
const css =
  iDefesa < 0
    ? cssBruto
    : cssBruto.slice(0, iDefesa) +
      cssBruto.slice(cssBruto.indexOf("}", iDefesa) + 1);
// `accent-amber` entra na mesma regua que os `--primary*`. Um acento com nome
// proprio que o teto nao alcancasse seria exatamente o contrabando que a
// excecao por seletor, acima, existe para impedir.
const acentos = [
  ...css.matchAll(
    /--(primary(?:-muted|-deep)?|accent-amber(?:-deep)?)\s*:\s*(#[0-9a-fA-F]{6})/g,
  ),
];

if (acentos.length === 0) {
  console.error("erro: nenhum token --primary encontrado em tokens.css");
  process.exit(1);
}

const saturados = [];
for (const [, nome, hex] of acentos) {
  const s = saturacao(hex.toLowerCase());
  if (s > TETO_SATURACAO) saturados.push({ nome, hex, s });
}

// ── saída ───────────────────────────────────────────────────────────────────

if (achados.length === 0 && saturados.length === 0) {
  const medidas = acentos
    .map(([, n, h]) => `--${n} ${(saturacao(h.toLowerCase()) * 100).toFixed(0)}%`)
    .join(", ");
  console.log(`  saturação dos acentos (teto ${TETO_SATURACAO * 100}%): ${medidas}`);
  console.log(
    "anti-slop: cor em componente, gradiente em texto, blur roxo, emoji e saturação. Resultado: OK",
  );
  process.exit(0);
}

for (const a of achados) {
  console.error(`  FALHA  [${a.regra}]  ${a.arq}:${a.linha}`);
  console.error(`         ${a.texto}`);
  console.error(`         ↑ ${a.porque}`);
}
for (const s of saturados) {
  console.error(
    `  FALHA  [saturação]  --${s.nome} = ${s.hex} → ${(s.s * 100).toFixed(0)}% (teto ${TETO_SATURACAO * 100}%)`,
  );
  console.error(
    "         ↑ acento saturado demais: é o vício 'near-black + acid-green'",
  );
}
console.error(
  `\nanti-slop: ${achados.length + saturados.length} achado(s). Resultado: FALHOU`,
);
process.exit(1);
