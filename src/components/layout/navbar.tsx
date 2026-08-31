import React from "react";
import { NavLink, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import BrandMark from "@/components/layout/brand-mark";
import { contactLinks } from "@/content/contacts";

const navItems = [
  { name: "Projetos", path: "/projetos" },
  { name: "Produtos", path: "/produtos" },
  { name: "Novidades", path: "/novidades" },
  { name: "Sobre", path: "/sobre" },
];

/**
 * Navegação do topo.
 *
 * O menu-sanduíche saiu: no celular a navegação desceu para a barra inferior,
 * na zona do polegar, e manter os dois seria navegação em duplicata. Isso
 * também tirou daqui um estado, dois ícones e o painel deslizante inteiro.
 *
 * O link do repositório vem de `contacts.ts`, nunca escrito à mão: se o campo
 * sumir de lá, o link some daqui em vez de virar um endereço morto.
 */
export const Navbar: React.FC = () => {
  const repoBrain = contactLinks.publicRepos?.find(
    (r) => r.status === "public" && r.url,
  );

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-md"
      aria-label="Navegação principal"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" aria-label="Cadu Azeredo — início">
            <BrandMark size="sm" />
          </Link>

          <div className="flex items-center gap-5 sm:gap-7">
            {/* Os destinos ficam na barra inferior no celular. */}
            <div className="hidden md:flex items-center gap-7">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {repoBrain?.url && (
              <a
                href={repoBrain.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                GitHub&nbsp;↗
              </a>
            )}

            <Link
              to="/contato"
              className="rounded bg-foreground px-4 py-2 text-[13px] font-bold text-background transition-opacity hover:opacity-90"
            >
              Contatar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
