// Depois do build: copia o index.html para cada página do sitemap (canal.html, specs.html...) e para o 404.html.
// Assim o Cloudflare Pages responde 200 nas páginas que existem e 404 de verdade no resto,
// e o motor mostra a página certa pelo endereço.
import { copyFileSync, readFileSync } from "node:fs";
const mapa = readFileSync("public/sitemap.xml", "utf8");
const paginas = [...mapa.matchAll(/<loc>https:\/\/www\.caduazeredo\.com\/([a-z0-9-]+)<\/loc>/g)].map((m) => m[1]);
if (paginas.length < 5) throw new Error("sitemap sem as páginas do site");
for (const p of paginas) copyFileSync("dist/index.html", `dist/${p}.html`);
copyFileSync("dist/index.html", "dist/404.html");
console.log("páginas copiadas:", paginas.join(", "), "+ 404");
