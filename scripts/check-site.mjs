// Confere o build antes de publicar: nada de marcação de maquete, nada de
// link vazio e nenhum script inline (a CSP só aceita script do próprio site).
import { readFileSync, existsSync } from "node:fs";

const erros = [];
const html = readFileSync("dist/index.html", "utf8");

if (html.includes('class="pend"')) erros.push('sobrou marcação de pendência (class="pend") no HTML');
if (/MAQUETE|Maquete DEMPA/.test(html)) erros.push("sobrou a faixa de maquete");
if (/href="#"/.test(html)) erros.push('há link vazio (href="#")');
if (/\son[a-z]+="/.test(html)) erros.push("há evento inline (onclick, onsubmit...), bloqueado pela CSP");
const inline = [...html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>/g)];
if (inline.length) erros.push(`há ${inline.length} script inline, bloqueado pela CSP`);
for (const f of ["dist/_headers", "dist/_redirects", "dist/favicon.svg", "dist/og/caduazeredo-og-1200x630.png"]) {
  if (!existsSync(f)) erros.push(`falta ${f}`);
}

if (erros.length) {
  console.error("check: falhou\n- " + erros.join("\n- "));
  process.exit(1);
}
console.log("check: ok");
