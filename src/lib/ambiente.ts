import type { Publicacao } from "./publicacao";

/**
 * Preview ou produção — decidido no build, nunca no navegador.
 *
 * `vite.config.ts` lê `VERCEL_ENV` e grava o resultado como constante. Fora da
 * Vercel o build é preview, a não ser que `PUBLICACAO=producao` seja passado.
 * Nenhuma busca ao vivo decide isto: uma página que muda conforme o que o
 * navegador consegue alcançar é uma página que ninguém consegue conferir.
 */
export const PUBLICACAO: Publicacao = __PUBLICACAO__;
