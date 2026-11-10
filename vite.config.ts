import { defineConfig } from "vite";
import path from "path";

// Site estático: o index.html já traz todas as páginas, e o motor
// (src/dempa/motor.js) só troca qual aparece conforme a rota.
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
