import { useEffect } from "react";

export interface SeoDaRota {
  titulo: string;
  descricao: string;
  /** Caminho canônico, começando por "/". O domínio é o do site. */
  caminho: string;
  /** JSON-LD opcional — só entra com campos verificáveis. */
  jsonLd?: Record<string, unknown>;
}

const DOMINIO = "https://www.caduazeredo.com";
const MARCA_DE_ROTA = "seo-de-rota";

/**
 * Head por rota, sem dependência.
 *
 * Um SPA sem pré-render não tem milagre de SEO — o que dá para garantir é que
 * cada rota declare título, descrição, canônica e Open Graph corretos para o
 * render do robô que executa JavaScript. Este hook escreve essas tags na
 * montagem e as REMOVE na desmontagem: meta de uma rota vazando para outra é a
 * versão de SEO do rodapé duplicado.
 */
export function useSeo({ titulo, descricao, caminho, jsonLd }: SeoDaRota) {
  useEffect(() => {
    document.title = titulo;

    const criados: Element[] = [];
    const restauraveis: Array<{ el: Element; antes: string | null }> = [];

    /**
     * O `index.html` já traz description e OG padrão do site. Criar uma
     * segunda tag ao lado da primeira não adianta: quem lê meta lê a
     * primeira. Então, quando a tag já existe, ela é SOBRESCRITA aqui e
     * restaurada na desmontagem; só o que não existe é criado e removido.
     */
    const meta = (attrs: Record<string, string>) => {
      const chave = attrs.name
        ? `meta[name="${attrs.name}"]`
        : `meta[property="${attrs.property}"]`;
      const existente = document.head.querySelector(chave);
      if (existente) {
        restauraveis.push({
          el: existente,
          antes: existente.getAttribute("content"),
        });
        existente.setAttribute("content", attrs.content);
        return;
      }
      const el = document.createElement("meta");
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
      el.setAttribute(`data-${MARCA_DE_ROTA}`, "1");
      document.head.appendChild(el);
      criados.push(el);
    };

    meta({ name: "description", content: descricao });
    meta({ property: "og:title", content: titulo });
    meta({ property: "og:description", content: descricao });
    meta({ property: "og:type", content: "website" });
    meta({ property: "og:url", content: DOMINIO + caminho });
    meta({ name: "twitter:card", content: "summary" });
    meta({ name: "twitter:title", content: titulo });
    meta({ name: "twitter:description", content: descricao });

    const canonica = document.createElement("link");
    canonica.rel = "canonical";
    canonica.href = DOMINIO + caminho;
    canonica.setAttribute(`data-${MARCA_DE_ROTA}`, "1");
    document.head.appendChild(canonica);
    criados.push(canonica);

    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute(`data-${MARCA_DE_ROTA}`, "1");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
      criados.push(script);
    }

    return () => {
      for (const el of criados) el.remove();
      for (const { el, antes } of restauraveis) {
        if (antes === null) el.removeAttribute("content");
        else el.setAttribute("content", antes);
      }
    };
  }, [titulo, descricao, caminho, jsonLd]);
}

export default useSeo;
