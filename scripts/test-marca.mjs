#!/usr/bin/env node
/**
 * Teste da marca: a logo em linha e a assinatura que a página desenha têm os
 * mesmos caminhos do arquivo do kit, e só as duas tintas mudam.
 *
 * A página busca o arquivo de `public/brand/` e o passa por `tingir()`
 * (`src/lib/marca.ts`). Este teste prova três coisas:
 *
 * 1. os `d` de cada caminho saem de `tingir()` idênticos aos do arquivo;
 * 2. desfeita a troca das duas tintas, o resultado é o arquivo byte a byte —
 *    nada mais mudou, nem o manifesto de procedência (C2PA) que ele carrega;
 * 3. os caminhos do arquivo são os do kit de 15/10: o resumo SHA-256 deles está
 *    fixado aqui, e reprova se alguém trocar o desenho. Kit novo, resumo novo,
 *    num commit que diga isso. Se o kit original estiver nesta máquina, os
 *    caminhos também são comparados com ele.
 *
 * Roda o TypeScript direto, pela remoção de tipos do Node, como o
 * `test-publicacao.mjs`.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MARCA, caminhos, tingir } from "../src/lib/marca.ts";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const KIT = "D:/Azeredx-files/inbox/brand-kit-cadu-azeredo/logos";

/** Resumo dos caminhos do kit v1 (fechado em 03/10, aplicado em 15/10). */
const FIXADO = {
  linha: { kit: "cadu-azeredo-linha-claro.svg", caminhos: "88d7433661220e5d11db636599387b0b1c7c271deefbcfd99ccd1d5f1243f60b" },
  assinatura: {
    kit: "cadu-azeredo-assinatura-claro.svg",
    caminhos: "1fd9c6500812114acaa68b8de982376fae032a6c03ead9b878dc3ea7a1aaa313",
  },
};

let falhas = 0;
const ok = (cond, msg) => {
  console.log(cond ? `  ok     ${msg}` : `  FALHA  ${msg}`);
  if (!cond) falhas++;
};
const resumo = (lista) => createHash("sha256").update(lista.join("\n")).digest("hex");

for (const [peca, def] of Object.entries(MARCA)) {
  console.log(`\n[${peca}] ${def.arquivo}\n`);
  const arquivo = path.join(RAIZ, "public", def.arquivo);
  if (!existsSync(arquivo)) {
    ok(false, `o arquivo existe em public${def.arquivo}`);
    continue;
  }
  const original = readFileSync(arquivo, "utf8");
  const tingido = tingir(original);

  const antes = caminhos(original);
  const depois = caminhos(tingido);
  ok(antes.length > 0, `o arquivo tem caminhos (${antes.length})`);
  ok(antes.length === depois.length && antes.every((d, i) => d === depois[i]), "os caminhos desenhados são os do arquivo, um a um");

  const desfeito = tingido.replace(/fill="currentColor"/g, 'fill="#edf2ef"').replace(/class="marca-detalhe"/g, 'fill="#3fa372"');
  ok(desfeito === original, "desfeitas as duas tintas, o resultado é o arquivo byte a byte");
  ok(/<c2pa:manifest>/.test(tingido), "o manifesto de procedência continua no SVG desenhado");
  ok(/fill="currentColor"/.test(tingido) && /class="marca-detalhe"/.test(tingido), "o texto vai em currentColor e o quadradinho na tinta");
  ok(!/#3fa372|#edf2ef/i.test(tingido), "nenhuma cor do kit ficou escrita no desenho");

  const viewBox = original.match(/viewBox="0 0 (\d+) (\d+)"/);
  ok(viewBox !== null && Number(viewBox[1]) === def.largura && Number(viewBox[2]) === def.altura, `o viewBox é ${def.largura}x${def.altura}, a proporção que o componente reserva`);

  const fixado = FIXADO[peca];
  ok(resumo(antes) === fixado.caminhos, `os caminhos são os do kit de 15/10 (resumo ${resumo(antes).slice(0, 12)}…)`);
  const doKit = path.join(KIT, fixado.kit);
  if (existsSync(doKit)) {
    ok(resumo(caminhos(readFileSync(doKit, "utf8"))) === resumo(antes), `os caminhos batem com o original do kit (${fixado.kit})`);
  } else {
    console.log(`  —      o kit original não está nesta máquina; valeu o resumo fixado`);
  }
}

console.log("\n[recusa] o que a página nunca injeta\n");
let recusou = false;
try {
  tingir('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>');
} catch {
  recusou = true;
}
ok(recusou, "um SVG com <script> é recusado");
recusou = false;
try {
  tingir('<svg xmlns="http://www.w3.org/2000/svg"><rect onload="x()"/></svg>');
} catch {
  recusou = true;
}
ok(recusou, "um SVG com atributo de evento é recusado");

console.log(falhas ? `\ntest-marca: ${falhas} falha(s). Resultado: FALHOU` : "\ntest-marca: tudo passou. Resultado: OK");
process.exit(falhas ? 1 : 0);
