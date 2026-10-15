import React from "react";
import { Link, useLocation } from "react-router-dom";
import { espelhoEmIngles, submenu } from "@/content/shizune";
import { cn } from "@/lib/utils";

/**
 * O submenu das páginas do Shizune: visão geral, roadmap, evidência, e o
 * espelho em inglês no shizune.dev.
 *
 * É navegação, e não um segundo cabeçalho: uma linha curta logo abaixo do topo
 * do site, nas três rotas, com a atual marcada por `aria-current`.
 */
export const SubmenuShizune: React.FC = () => {
  const { pathname } = useLocation();
  const ingles = espelhoEmIngles[pathname];

  return (
    <nav aria-label="Páginas do Shizune" className="border-b border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-1 px-4 py-2.5 font-mono text-[12.5px] sm:px-6 lg:px-8">
        {submenu.map((s) => (
          <Link
            key={s.rota}
            to={s.rota}
            aria-current={pathname === s.rota ? "page" : undefined}
            className={cn(
              "inline-flex min-h-6 items-center transition-colors",
              pathname === s.rota ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {s.rotulo}
          </Link>
        ))}
        {ingles && (
          <a
            href={ingles}
            hrefLang="en"
            lang="en"
            className="inline-flex min-h-6 items-center text-muted-foreground transition-colors hover:text-foreground"
          >
            english
          </a>
        )}
      </div>
    </nav>
  );
};

export default SubmenuShizune;
