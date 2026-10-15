import React from "react";
import { Link, useLocation } from "react-router-dom";
import Marca from "@/components/layout/marca";
import { marcasDeRota } from "@/content/rodape-de-rota";

/** Nas páginas legais, o nome legal por extenso (decisão do operador, 15/10, 12h27). */
const ROTAS_LEGAIS = new Set(["/termos", "/privacidade"]);

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // A marca de produto da rota atual, se houver. É o padrão: nenhuma página
  // desenha rodapé próprio — ela declara a marca em `content/rodape-de-rota.ts`
  // e o rodapé, que é um só em todo o site, a mostra aqui.
  const { pathname } = useLocation();
  const marca = marcasDeRota[pathname];
  const nomeDaLinhaLegal = ROTAS_LEGAIS.has(pathname) ? "Carlos Eduardo Azeredo Moura" : "Cadu Azeredo";

  return (
    <footer className="w-full bg-background border-t border-border/60 py-8 mt-auto select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* A assinatura do kit fecha a peça, acima da linha legal. A linha
              legal é "Cadu Azeredo · ano"; Termos e Privacidade mantêm o nome
              legal por extenso (decisão do operador, 15/10, 12h27). */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Marca peca="assinatura" altura={64} />
            <span className="text-[12px] text-muted-foreground">
              {nomeDaLinhaLegal} · {currentYear}
            </span>
          </div>

          {/* Paginas legais — alcancaveis de qualquer rota */}
          <nav className="flex items-center gap-4 font-mono text-[11px] text-muted-foreground">
            <Link
              to="/privacidade"
              className="inline-flex items-center py-2 -my-2 hover:text-primary transition-colors"
            >
              Privacidade
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <Link
              to="/termos"
              className="inline-flex items-center py-2 -my-2 hover:text-primary transition-colors"
            >
              Termos
            </Link>
          </nav>
        </div>

        {/* A marca de produto da rota, quando existe: UMA linha, depois da
            linha legal, sem faixa própria e sem fio separando. A versão
            anterior era um bloco com divisória, e um bloco a mais é
            exatamente o que o rodapé unificado veio resolver. */}
        {marca && (
          <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground md:text-left">
            <span className="font-sans font-semibold text-foreground">
              {marca.nome}
            </span>
            <span className="font-mono">, {marca.meta}. </span>
            {marca.nota}
          </p>
        )}
      </div>
    </footer>
  );
};

export default Footer;
