import React from "react";
import { Terminal } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-border/60 py-8 mt-auto select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Informações da Marca */}
          <div className="flex items-center space-x-2 font-mono text-xs text-muted-foreground">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span>Carlos Eduardo “Cadu” Azeredo Moura • {currentYear}</span>
          </div>

          {/* Detalhe da Variante Visual "Azeredx /" */}
          <div className="font-mono text-[10px] text-muted-foreground/45 hover:text-primary transition-colors cursor-default">
            Cadu Azeredx / v1.0.0
          </div>

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
