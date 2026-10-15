import { useLayoutEffect } from "react";

/**
 * O escopo das rotas do Shizune: `data-rota="shizune"` no `<html>` enquanto uma
 * das três páginas está montada. É ele que troca a tinta da peça para o âmbar
 * (`tokens.css`); `--primary`, a cor do modo, não muda. Sai na desmontagem.
 *
 * `useLayoutEffect`, e não `useEffect`: o atributo entra antes da pintura, e a
 * página não pisca na tinta do modo antes de virar âmbar.
 * `scripts/test-tinta.mjs` confere que só as três páginas chamam este hook.
 */
export function useEscopoShizune(): void {
  useLayoutEffect(() => {
    document.documentElement.dataset.rota = "shizune";
    return () => {
      delete document.documentElement.dataset.rota;
    };
  }, []);
}
