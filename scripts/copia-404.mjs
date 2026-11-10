// Gera o 404.html a partir do index.html pronto. Com ele, o Cloudflare Pages responde 404 de verdade
// para endereço que não existe, e o motor mostra a página de erro.
import { copyFileSync } from "node:fs";
copyFileSync("dist/index.html", "dist/404.html");
