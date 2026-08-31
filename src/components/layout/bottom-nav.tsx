import React from "react";
import { NavLink } from "react-router-dom";
import { Home, FolderGit2, Package, Radio, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const abas = [
  { name: "início", path: "/", Icone: Home, exact: true },
  { name: "projetos", path: "/projetos", Icone: FolderGit2 },
  { name: "produtos", path: "/produtos", Icone: Package },
  { name: "novidades", path: "/novidades", Icone: Radio },
  { name: "contato", path: "/contato", Icone: Mail },
];

/**
 * Navegação inferior — só no celular.
 *
 * Substitui o menu-sanduíche: eram dois toques para chegar em qualquer lugar e
 * nenhuma pista de onde você estava. Aqui os cinco destinos ficam na zona do
 * polegar e a rota atual fica sempre visível.
 *
 * Dois detalhes decidem se isto fica bom ou irritante, e ambos estão tratados:
 * a área segura do iPhone (sem ela a barra fica sob o indicador de home), e o
 * respiro inferior que o `AppShell` dá ao conteúdo — sem ele a barra cobre o
 * fim do texto de toda página.
 *
 * "Sobre", "Privacidade" e "Termos" não cabem nos cinco e vivem no rodapé, que
 * no celular passa a ser o lugar canônico do secundário.
 */
export const BottomNav: React.FC = () => (
  <nav
    aria-label="Navegação principal (celular)"
    className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-md md:hidden"
    style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
  >
    <div className="flex items-stretch px-1 pt-1.5">
      {abas.map(({ name, path, Icone, exact }) => (
        <NavLink
          key={path}
          to={path}
          end={exact}
          className={({ isActive }) =>
            cn(
              // 52px de altura mínima mantém o alvo de toque acima do piso de
              // 44px mesmo com o rótulo em 9px.
              "flex min-h-[52px] flex-1 flex-col items-center justify-center gap-1 font-mono text-[9px] tracking-wide transition-colors",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )
          }
        >
          {({ isActive }) => (
            <>
              <Icone className="h-5 w-5" aria-hidden="true" />
              <span aria-current={isActive ? "page" : undefined}>{name}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  </nav>
);

export default BottomNav;
