#!/usr/bin/env node
/**
 * Teste da tinta: o âmbar do Shizune só pinta /shizune, /shizune/roadmap e
 * /shizune/evidencia.
 *
 * A regra do kit de marca (15/10): uma tinta por peça — verde no modo Dev, azul
 * no modo Empresa, âmbar só nas três rotas do Shizune. Cor de estado não conta.
 * Ela vale como estrutura, e não como cuidado de quem edita:
 *
 * - componente e página nunca escrevem `accent-amber`; escrevem `tinta`;
 * - no CSS, `var(--accent-amber…)` só aparece dentro do bloco
 *   `[data-rota="shizune"]`, que é onde a tinta vira âmbar;
 * - o atributo `data-rota="shizune"` só entra pelas três páginas do Shizune.
 *
 * Se existir um `dist/`, o teste confere o CSS e o JS gerados também: é o que
 * vai ao ar. Sem `dist/`, ele diz que pulou essa parte, e não finge que passou.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rel = (p) => path.relative(RAIZ, p).replace(/\\/g, "/");

let falhas = 0;
const ok = (cond, msg) => {
  console.log(cond ? `  ok     ${msg}` : `  FALHA  ${msg}`);
  if (!cond) falhas++;
};

function arquivos(dir, ext) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((nome) => {
    const p = path.join(dir, nome);
    if (statSync(p).isDirectory()) return arquivos(p, ext);
    return ext.some((e) => nome.endsWith(e)) ? [p] : [];
  });
}

const semComentarios = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "");

/** O seletor da regra que contém a posição `i` de um CSS. */
function seletorEm(css, i) {
  let nivel = 0;
  for (let j = i; j >= 0; j--) {
    if (css[j] === "}") nivel++;
    else if (css[j] === "{") {
      if (nivel === 0) {
        const antes = css.lastIndexOf("}", j);
        const abre = css.lastIndexOf("{", j - 1);
        const inicio = Math.max(antes, abre) + 1;
        return css.slice(inicio, j).trim();
      }
      nivel--;
    }
  }
  return "";
}

/** Toda ocorrência de `var(--accent-amber…)` fora do escopo de /shizune. */
function ambarForaDoEscopo(css) {
  const fora = [];
  for (const m of css.matchAll(/var\(--accent-amber/g)) {
    const seletor = seletorEm(css, m.index);
    if (!/\[data-rota=["']?shizune["']?\]/.test(seletor)) fora.push(seletor || "(sem seletor)");
  }
  return fora;
}

// ── fontes ──────────────────────────────────────────────────────────────────

console.log("\n[fontes] componente e página escrevem `tinta`, nunca `accent-amber`\n");
const tsx = arquivos(path.join(RAIZ, "src"), [".ts", ".tsx"]);
const comAmbar = tsx.filter((f) => /accent-amber/.test(readFileSync(f, "utf8")));
ok(comAmbar.length === 0, `nenhum .ts/.tsx em src/ cita accent-amber${comAmbar.length ? `: ${comAmbar.map(rel).join(", ")}` : ""}`);

console.log("\n[fontes] no CSS, o âmbar só entra no bloco da rota /shizune\n");
for (const f of arquivos(path.join(RAIZ, "src/styles"), [".css"])) {
  const fora = ambarForaDoEscopo(semComentarios(readFileSync(f, "utf8")));
  ok(fora.length === 0, `${rel(f)}: var(--accent-amber) só sob [data-rota="shizune"]${fora.length ? ` — achou em: ${fora.join(" | ")}` : ""}`);
}

console.log("\n[fontes] o escopo da rota só entra pelas três páginas do Shizune\n");
const usamEscopo = tsx
  .filter((f) => rel(f) !== "src/components/shizune/escopo.ts")
  .filter((f) => /useEscopoShizune\(\)/.test(readFileSync(f, "utf8")))
  .map(rel)
  .sort();
ok(
  usamEscopo.join(",") ===
    ["src/pages/shizune-evidencia-page.tsx", "src/pages/shizune-page.tsx", "src/pages/shizune-roadmap-page.tsx"].join(","),
  `useEscopoShizune() roda só em /shizune, /shizune/evidencia e /shizune/roadmap (achou: ${usamEscopo.join(", ") || "nenhum"})`,
);
const escrevemRota = tsx.filter((f) => /dataset\.rota\s*=|setAttribute\(\s*["']data-rota/.test(readFileSync(f, "utf8"))).map(rel);
ok(
  escrevemRota.length === 1 && escrevemRota[0] === "src/components/shizune/escopo.ts",
  `só o escopo.ts escreve data-rota (achou: ${escrevemRota.join(", ") || "nenhum"})`,
);

// ── build ───────────────────────────────────────────────────────────────────

const DIST = path.join(RAIZ, "dist");
if (!existsSync(DIST)) {
  console.log("\n[build] sem dist/: a conferência do que vai ao ar foi PULADA (rode o build antes)\n");
} else {
  console.log("\n[build] o CSS e o JS gerados\n");
  for (const f of arquivos(DIST, [".css"])) {
    const fora = ambarForaDoEscopo(readFileSync(f, "utf8"));
    ok(fora.length === 0, `${rel(f)}: var(--accent-amber) só sob [data-rota=shizune]${fora.length ? ` — achou em: ${fora.join(" | ")}` : ""}`);
  }
  const js = arquivos(DIST, [".js", ".html"]).filter((f) => /accent-amber/.test(readFileSync(f, "utf8")));
  ok(js.length === 0, `nenhum JS ou HTML gerado cita accent-amber${js.length ? `: ${js.map(rel).join(", ")}` : ""}`);
}

console.log(falhas ? `\ntest-tinta: ${falhas} falha(s). Resultado: FALHOU` : "\ntest-tinta: tudo passou. Resultado: OK");
process.exit(falhas ? 1 : 0);
