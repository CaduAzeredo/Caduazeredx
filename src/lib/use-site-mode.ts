import { useCallback, useEffect, useState } from "react";

export type SiteMode = "dev" | "empresa";

const CHAVE = "cadu.mode";

function lerArmazenado(): SiteMode | null {
  try {
    const v = localStorage.getItem(CHAVE);
    return v === "dev" || v === "empresa" ? v : null;
  } catch {
    // Navegação privada ou armazenamento bloqueado. Não é erro: o site
    // funciona sem lembrar da escolha.
    return null;
  }
}

/**
 * Modo de leitura do site.
 *
 * O React não é a fonte da verdade aqui — o atributo no `<html>` é, e ele já
 * foi escrito por `public/mode-init.js` antes do primeiro desenho. Este hook
 * lê o que já está lá e passa a mantê-lo. Se ele decidisse o valor inicial
 * sozinho, a página piscaria no padrão antes de assumir a escolha.
 */
export function useSiteMode(): [SiteMode, (m: SiteMode) => void] {
  const [modo, setModo] = useState<SiteMode>(() => {
    if (typeof document === "undefined") return "dev";
    const doDom = document.documentElement.dataset.mode;
    if (doDom === "dev" || doDom === "empresa") return doDom;
    return lerArmazenado() ?? "dev";
  });

  useEffect(() => {
    if (modo === "dev") {
      // O padrão vive no `:root`. Remover o atributo é mais honesto que
      // escrever `data-mode="dev"`: sem ele, o site é o que o CSS já diz.
      delete document.documentElement.dataset.mode;
    } else {
      document.documentElement.dataset.mode = modo;
    }
    try {
      localStorage.setItem(CHAVE, modo);
    } catch {
      /* sem persistência: a escolha vale só nesta visita */
    }
  }, [modo]);

  const trocar = useCallback((m: SiteMode) => setModo(m), []);

  return [modo, trocar];
}

export default useSiteMode;
