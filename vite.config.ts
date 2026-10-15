import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { readFileSync } from "fs";

/**
 * Preview ou produção, decidido no build e gravado como constante (ver
 * `src/lib/ambiente.ts`). A Vercel põe `VERCEL_ENV=production` só no deploy de
 * produção; todo o resto é preview, e no preview as linhas sem fonte conferida
 * aparecem marcadas como rascunho. `PUBLICACAO=producao` força a produção num
 * build local. A mesma regra do shizune.dev.
 */
const publicacao =
  process.env.PUBLICACAO === "producao" ||
  process.env.VERCEL_ENV === "production"
    ? "producao"
    : "previa";

/**
 * Os Termos não vão ao ar com a data errada. A data de "Última atualização" é a
 * do deploy (aprovação do operador, 15/10, 11h25): enquanto `terms-page.tsx`
 * guardar a marca "‹data do deploy›", o deploy de produção da Vercel falha aqui
 * e a produção anterior continua no ar. O preview e o build local passam.
 */
if (
  process.env.VERCEL_ENV === "production" &&
  readFileSync(path.resolve(__dirname, "src/pages/terms-page.tsx"), "utf8").includes(
    'ATUALIZADO_EM = "‹data do deploy›"',
  )
) {
  throw new Error(
    "Termos: a data de \"Última atualização\" ainda é ‹data do deploy›. Escreva o dia do deploy em src/pages/terms-page.tsx antes de publicar.",
  );
}

// https://vite.dev/config/
export default defineConfig({
  define: {
    __PUBLICACAO__: JSON.stringify(publicacao),
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
