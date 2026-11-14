import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

// O motor (src/dempa/motor.js) veio da maquete aprovada e ainda não foi
// reescrito em TypeScript; por isso fica fora do lint até a refatoração.
// O jogo (public/jogo) é uma página à parte, com o Three.js já minificado.
export default defineConfig([
  globalIgnores(["dist", "src/dempa/motor.js", "public/jogo"]),
  {
    files: ["**/*.{ts,js,mjs}"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
]);
