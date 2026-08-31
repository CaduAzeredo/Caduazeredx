#!/usr/bin/env node
/**
 * Contraste — medido, não anotado.
 *
 * `tokens.css` traz o contraste de cada cor escrito à mão em comentário. Isso
 * era verdade no instante em que foi digitado e nada o mantém verdade: trocar
 * um hex não atualiza o comentário ao lado, e ninguém percebe até alguém não
 * conseguir ler a página.
 *
 * Este script lê os tokens de verdade, resolve os `var()`, calcula a razão de
 * contraste WCAG 2.1 de cada par que existe na interface, e **reprova** o que
 * não passa. Roda nos três modos: `:root` (Dev), `[data-mode="empresa"]` e
 * `[data-invadido]` (o modo de defesa do easter egg) — um easter egg ilegível
 * é um bug com piada em cima.
 *
 * A ideia vem do `codeswithroh/tastemaker` (MIT), que valida uma matriz de
 * contraste antes de deixar um agente escolher cor. A implementação é nossa.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ARQ = path.join(RAIZ, "src/styles/tokens.css");

/**
 * Os pares que existem de fato na interface, com o mínimo que cada um deve
 * atingir. A tabela é declarada aqui, e não inferida do CSS, porque só quem
 * lê os componentes sabe o que vira texto pequeno e o que vira preenchimento
 * — e é exatamente essa distinção que decide entre 4,5:1 e 3:1.
 */
const PARES = [
  { fg: "foreground", bg: "background", min: 4.5, uso: "corpo de texto" },
  {
    fg: "muted-foreground",
    bg: "background",
    min: 4.5,
    uso: "texto secundário",
  },
  {
    fg: "muted-foreground",
    bg: "surface",
    min: 4.5,
    uso: "texto secundário em card",
  },
  {
    fg: "muted-foreground",
    bg: "surface-elevated",
    min: 4.5,
    uso: "texto em cabeçalho de card",
  },
  { fg: "primary", bg: "background", min: 4.5, uso: "link, prompt, rótulo" },
  { fg: "primary", bg: "surface", min: 4.5, uso: "acento dentro de card" },
  {
    fg: "primary-muted",
    bg: "background",
    min: 4.5,
    uso: "acento secundário — vira TEXTO em ~20 lugares",
  },
  {
    fg: "primary-deep",
    bg: "background",
    min: 3.0,
    grande: true,
    uso: "só texto grande, borda e preenchimento",
  },
  {
    fg: "background",
    bg: "primary",
    min: 4.5,
    uso: "texto sobre o botão principal",
  },
  { fg: "status-security", bg: "background", min: 4.5, uso: "estado" },
  { fg: "status-wait", bg: "background", min: 4.5, uso: "estado" },
  { fg: "status-alert", bg: "background", min: 4.5, uso: "estado" },
  { fg: "secondary", bg: "background", min: 4.5, uso: "acento de apoio" },
  { fg: "accent-blue", bg: "background", min: 4.5, uso: "acento de apoio" },
];

// ── leitura dos tokens ──────────────────────────────────────────────────────

function semComentarios(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

function bloco(css, seletor) {
  const i = css.indexOf(seletor);
  if (i < 0) return null;
  const abre = css.indexOf("{", i);
  const fecha = css.indexOf("}", abre);
  if (abre < 0 || fecha < 0) return null;
  return css.slice(abre + 1, fecha);
}

function tokens(texto) {
  const mapa = new Map();
  for (const m of texto.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) {
    mapa.set(m[1], m[2].trim());
  }
  return mapa;
}

function resolver(mapa, nome, vistos = new Set()) {
  if (vistos.has(nome)) return null; // ciclo de var() — não trava, reprova
  vistos.add(nome);
  const bruto = mapa.get(nome);
  if (!bruto) return null;
  const ref = bruto.match(/^var\(\s*--([\w-]+)\s*\)$/);
  if (ref) return resolver(mapa, ref[1], vistos);
  return /^#[0-9a-fA-F]{6}$/.test(bruto) ? bruto.toLowerCase() : null;
}

// ── contraste WCAG 2.1 ──────────────────────────────────────────────────────

function canal(v) {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function luminancia(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);
}

function razao(a, b) {
  const la = luminancia(a);
  const lb = luminancia(b);
  const [alto, baixo] = la > lb ? [la, lb] : [lb, la];
  return (alto + 0.05) / (baixo + 0.05);
}

// ── execução ────────────────────────────────────────────────────────────────

const css = semComentarios(readFileSync(ARQ, "utf8"));

const raiz = bloco(css, ":root");
if (!raiz) {
  console.error("erro: não achei o bloco :root em src/styles/tokens.css");
  process.exit(1);
}

const base = tokens(raiz);
const empresaTexto = bloco(css, '[data-mode="empresa"]');
if (!empresaTexto) {
  console.error(
    'erro: não achei o bloco [data-mode="empresa"] em src/styles/tokens.css',
  );
  process.exit(1);
}
const empresa = new Map(base);
for (const [k, v] of tokens(empresaTexto)) empresa.set(k, v);

// O modo de defesa (o easter egg) e medido junto com os outros dois. Um easter
// egg ilegivel e um bug com piada em cima.
const invadidoTexto = bloco(css, "[data-invadido]");
if (!invadidoTexto) {
  console.error("erro: nao achei o bloco [data-invadido] em src/styles/tokens.css");
  process.exit(1);
}
const invadido = new Map(base);
for (const [k, v] of tokens(invadidoTexto)) invadido.set(k, v);

const MODOS = [
  ["Dev  (:root)", base],
  ['Empresa ([data-mode="empresa"])', empresa],
  ["Defesa ([data-invadido])", invadido],
];

let falhas = 0;
let naoResolvidos = 0;

for (const [rotulo, mapa] of MODOS) {
  console.log(`\n  ${rotulo}`);
  console.log(`  ${"─".repeat(74)}`);

  for (const par of PARES) {
    const fg = resolver(mapa, par.fg);
    const bg = resolver(mapa, par.bg);

    if (!fg || !bg) {
      naoResolvidos++;
      console.log(
        `  ??     --${par.fg} sobre --${par.bg}  — token ausente ou não resolvido`,
      );
      continue;
    }

    const r = razao(fg, bg);
    const passa = r >= par.min;
    if (!passa) falhas++;

    const marca = passa ? "ok  " : "FALHA";
    const alvo = par.grande ? `>=${par.min} (texto grande)` : `>=${par.min}`;
    console.log(
      `  ${marca}  ${r.toFixed(2).padStart(5)}:1  ${alvo.padEnd(22)} ` +
        `--${par.fg} sobre --${par.bg}`,
    );
    if (!passa) console.log(`         ↑ ${par.uso}`);
  }
}

console.log("");
if (falhas || naoResolvidos) {
  console.error(
    `contraste: ${falhas} par(es) reprovando, ${naoResolvidos} não resolvido(s). Resultado: FALHOU`,
  );
  process.exit(1);
}
console.log(
  `contraste: ${PARES.length * MODOS.length} pares medidos em ${MODOS.length} modos. Resultado: OK`,
);
