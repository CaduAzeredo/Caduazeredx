import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PageShell from "@/components/layout/page-shell";
import { buttonVariants } from "@/components/ui/button";
import TerminalWindow from "@/components/terminal/terminal-window";
import { AlertCircle, Home } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  // Atualizar título para SEO
  useEffect(() => {
    document.title = "404 Rota Não Encontrada | Cadu Azeredo";
  }, []);

  return (
    <PageShell>
      <div className="max-w-2xl mx-auto px-4 py-20 flex flex-col justify-center items-center">
        <TerminalWindow
          title="error-logger --status-code-404"
          className="border-red-500/20 shadow-red-500/5"
        >
          <div className="space-y-6 font-mono text-xs sm:text-sm">
            <div className="flex items-start space-x-3 text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">SYSTEM ERROR: ROTA NÃO ENCONTRADA</p>
                <p className="text-muted-foreground">
                  O endereço solicitado não foi mapeado no roteador da aplicação
                  ou foi movido temporariamente.
                </p>
              </div>
            </div>

            <div className="border-t border-border/40 pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-[11px] text-muted-foreground/60">
                <span>$ cd /home && npm run start</span>
              </div>
              <Link
                to="/"
                className={buttonVariants("primary", "sm") + " space-x-2"}
              >
                <Home className="w-3.5 h-3.5 inline-block" />
                <span>Voltar ao início</span>
              </Link>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </PageShell>
  );
};

export default NotFoundPage;
