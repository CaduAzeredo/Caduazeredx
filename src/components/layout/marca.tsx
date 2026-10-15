import React, { useEffect, useState } from "react";
import { MARCA, tingir, type PecaDaMarca } from "@/lib/marca";
import { cn } from "@/lib/utils";

/** Um pedido por arquivo por visita: cabeçalho e rodapé leem o mesmo cache. */
const cache = new Map<string, Promise<string>>();

function carregar(arquivo: string): Promise<string> {
  let p = cache.get(arquivo);
  if (!p) {
    p = fetch(arquivo).then((r) => {
      if (!r.ok) throw new Error(`${arquivo}: ${r.status}`);
      return r.text();
    });
    cache.set(arquivo, p);
  }
  return p;
}

/**
 * A logo em linha ou a assinatura do kit, na tinta da página.
 *
 * O desenho vem do arquivo do kit em `public/brand/`, intacto; `lib/marca.ts`
 * troca só as duas tintas. O espaço é reservado pela proporção do `viewBox`,
 * para a página não pular quando o desenho chega. Se o arquivo não carregar, o
 * nome entra em texto, na serifada — a marca nunca some.
 *
 * Regra do kit: a assinatura fecha a peça, nunca abre. Ela vive só no rodapé.
 */
export const Marca: React.FC<{ peca: PecaDaMarca; altura: number; className?: string }> = ({
  peca,
  altura,
  className,
}) => {
  const { arquivo, largura, altura: alturaDoDesenho, rotulo } = MARCA[peca];
  const [svg, setSvg] = useState<string | null>(null);
  const [falhou, setFalhou] = useState(false);

  useEffect(() => {
    let vivo = true;
    carregar(arquivo)
      .then((t) => vivo && setSvg(tingir(t)))
      .catch(() => vivo && setFalhou(true));
    return () => {
      vivo = false;
    };
  }, [arquivo]);

  const caixa = cn("marca inline-block align-middle text-foreground", className);
  const tamanho = { height: altura, width: (altura * largura) / alturaDoDesenho };

  if (falhou) {
    return (
      <span className={cn(caixa, "font-serif italic leading-none")} style={{ fontSize: altura * 0.8 }}>
        {rotulo}
      </span>
    );
  }
  // O SVG do kit traz role="img" e aria-label próprios: o nome acessível vem dele.
  return svg ? (
    <span className={caixa} style={tamanho} dangerouslySetInnerHTML={{ __html: svg }} />
  ) : (
    <span className={caixa} style={tamanho} role="img" aria-label={rotulo} />
  );
};

export default Marca;
