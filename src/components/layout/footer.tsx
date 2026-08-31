import React from "react";
import { Link } from "react-router-dom";
import BrandMark from "@/components/layout/brand-mark";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

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
            <BrandMark size="sm" />
            <span className="font-mono text-[11px] text-muted-foreground">
              Carlos Eduardo “Cadu” Azeredo Moura • {currentYear}
            </span>
          </div>

          {/* Paginas legais — alcancaveis de qualquer rota */}
          <nav className="flex items-center gap-4 font-mono text-[11px] text-muted-foreground">
            <Link
              to="/privacidade"
              className="hover:text-primary transition-colors"
            >
              Privacidade
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <Link to="/termos" className="hover:text-primary transition-colors">
              Termos
            </Link>
          </nav>

          {/* Subtexto Técnico */}
          <div className="text-xs font-mono text-muted-foreground/60 text-center md:text-right">
            Construído com React, TypeScript e intenção.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
