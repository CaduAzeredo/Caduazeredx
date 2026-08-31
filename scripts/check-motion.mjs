#!/usr/bin/env node
/**
 * Auditoria de movimento.
 *
 * A v3 acrescenta muita animação. Sem uma rede, cada uma nasce descoberta e
 * o problema só aparece na mão de quem tem sensibilidade a movimento — que é
 * quem menos pode reclamar depois.
 *
 * Três coisas, todas mecânicas:
 *
 * 1. `transition: all` (e o `transition-all` do Tailwind). Anima propriedades
 *    que ninguém escolheu animar, inclusive as caras de compor, e é a causa
 *    clássica de transição pisando em layout.
 * 2. `animation` escrita em `style` inline de `.tsx`. Cor e movimento moram no
 *    CSS; em componente eles escapam do bloco global e do troca de tema.
 * 3. O bloco global de `prefers-reduced-motion` tem de existir e atingir `*`.
 *    É ele que cobre o que alguém esquecer de tratar amanhã.
 *
 * A ideia vem da auditoria de movimento do `codeswithroh/tastemaker` (MIT).
 * A implementação é nossa.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FONTE = path.join(RAIZ, "src");
const GLOBAIS = path.join(RAIZ, "src/styles/globals.css");

function arquivos(dir, exts) {
  const saida = [];
  for (const nome of readdirSync(dir)) {
    const p = path.join(dir, nome);
    if (statSync(p).isDirectory()) saida.push(...arquivos(p, exts));
    else if (exts.some((e) => nome.endsWith(e))) saida.push(p);
  }
  return saida;
}

const rel = (p) => path.relative(RAIZ, p).replace(/\\/g, "/");

const achados = [];

// ── 1. transition: all ──────────────────────────────────────────────────────

for (const arq of arquivos(FONTE, [".css", ".tsx", ".ts"])) {
  const linhas = readFileSync(arq, "utf8").split("\n");
  linhas.forEach((linha, i) => {
    if (/transition:\s*all\b/.test(linha) || /\btransition-all\b/.test(linha)) {
      achados.push({
        regra: "transition-all",
        arq: rel(arq),
        linha: i + 1,
        texto: linha.trim().slice(0, 96),
        porque:
          "anima propriedade que ninguém escolheu — nomeie o que deve animar",
      });
    }
  });
}

// ── 2. animação escrita em componente ───────────────────────────────────────

for (const arq of arquivos(FONTE, [".tsx"])) {
  const linhas = readFileSync(arq, "utf8").split("\n");
  linhas.forEach((linha, i) => {
    // `style={{ animation: ... }}` ou `style={{ animationDuration: ... }}`
    if (/style=\{\{[^}]*\banimation[A-Za-z]*\s*:/.test(linha)) {
      achados.push({
        regra: "animação em .tsx",
        arq: rel(arq),
        linha: i + 1,
        texto: linha.trim().slice(0, 96),
        porque: "movimento mora no CSS, onde o bloco global o alcança",
      });
    }
  });
}

// ── 3. a rede global existe e cobre tudo ────────────────────────────────────

const globais = readFileSync(GLOBAIS, "utf8");
const bloco = globais.match(
  /@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)\s*\{([\s\S]*?)\n\}/,
);

if (!bloco) {
  achados.push({
    regra: "rede global",
    arq: rel(GLOBAIS),
    linha: 0,
    texto: "(ausente)",
    porque:
      "sem o bloco @media (prefers-reduced-motion: reduce), toda animação nova nasce descoberta",
  });
} else if (!/^\s*\*\s*,/m.test(bloco[1]) && !/^\s*\*\s*\{/m.test(bloco[1])) {
  achados.push({
    regra: "rede global",
    arq: rel(GLOBAIS),
    linha: 0,
    texto: "(não atinge `*`)",
    porque:
      "o bloco existe mas não é universal — o que ninguém lembrar de listar fica de fora",
  });
}

// ── saída ───────────────────────────────────────────────────────────────────

if (achados.length === 0) {
  console.log(
    "movimento: transition-all, animação em componente e a rede global. Resultado: OK",
  );
  process.exit(0);
}

for (const a of achados) {
  const onde = a.linha ? `${a.arq}:${a.linha}` : a.arq;
  console.error(`  FALHA  [${a.regra}]  ${onde}`);
  console.error(`         ${a.texto}`);
  console.error(`         ↑ ${a.porque}`);
}
console.error(`\nmovimento: ${achados.length} achado(s). Resultado: FALHOU`);
process.exit(1);
