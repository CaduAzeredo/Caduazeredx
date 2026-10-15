import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PageShell from "@/components/layout/page-shell";
import { buttonVariants } from "@/components/ui/button";
import TerminalWindow from "@/components/terminal/terminal-window";

/**
 * A rota que não existe — a tela 19e.
 *
 * O terminal mostra a rota que a pessoa pediu, como ela pediu; abaixo, a frase
 * em texto normal e três saídas. O "SYSTEM ERROR" em caixa alta saiu.
 */
export const NotFoundPage: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = "Página não encontrada | Cadu Azeredo";
  }, []);

  return (
    <PageShell>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-20 sm:px-6">
        <TerminalWindow>
          <p className="m-0 break-all font-mono text-[13px]">
            <span aria-hidden="true" className="text-primary">
              ${" "}
            </span>
            cd {pathname}
          </p>
          <p className="m-0 font-mono text-[13px] text-status-alert">rota não encontrada</p>
        </TerminalWindow>

        <h1 className="titulo-serif text-[40px] leading-[1.04] text-foreground sm:text-[56px]">
          Esta página não existe.
        </h1>
        <p className="text-lg text-muted-foreground">O endereço não está no mapa do site, ou mudou de lugar.</p>

        <div className="flex flex-wrap gap-3">
          <Link to="/" className={buttonVariants("primary", "md")}>
            Voltar ao início
          </Link>
          <Link to="/shizune" className={buttonVariants("outline", "md")}>
            Ver o Shizune
          </Link>
          <Link to="/projetos" className={buttonVariants("outline", "md")}>
            Ver projetos
          </Link>
        </div>
      </div>
    </PageShell>
  );
};

export default NotFoundPage;
