import React from "react";
import { Link, useLocation } from "react-router-dom";
import BrandMark from "@/components/layout/brand-mark";
import { marcasDeRota } from "@/content/rodape-de-rota";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // A marca de produto da rota atual, se houver. É o padrão: nenhuma página
  // desenha rodapé próprio — ela declara a marca em `content/rodape-de-rota.ts`
  // e o rodapé, que é um só em todo o site, a mostra aqui.
  const { pathname } = useLocation();
  const marca = marcasDeRota[pathname];

  return (
    <footer className="w-full bg-background border-t border-border/60 py-8 mt-auto select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* A marca e uma so, em todo lugar. Antes o rodape desenhava a
              propria: um icone de terminal de biblioteca ao lado do nome
              legal, competindo com o lockup da navbar. Agora e o mesmo
              componente, e o nome por extenso desce para a linha do
              copyright, que e onde ele tem funcao. */}
          <div className="flex flex-col items-center gap-1.5 md:items-start">
            {/* A barra do lockup finalmente separa alguma coisa: o segmento
                da rota. Fora das páginas de produto ela segue como estava, um
                shell parado na raiz. */}
            <BrandMark size="sm" segmento={marca?.segmento} />
            {/* Sem o apelido entre aspas: o lockup logo acima já diz "Cadu
                Azeredo", e repeti-lo aqui era a segunda de três aparições do
                mesmo nome no mesmo palmo de tela. */}
            <span className="font-mono text-[11px] text-muted-foreground">
              Carlos Eduardo Azeredo Moura • {currentYear}
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

          {/* Subtexto Técnico */}
          <div className="text-xs font-mono text-muted-foreground text-center md:text-right">
            Construído com React, TypeScript e intenção.
          </div>
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
