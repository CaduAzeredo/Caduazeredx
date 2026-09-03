import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import BrandMark from "@/components/layout/brand-mark";
import ModeToggle from "@/components/mode/mode-toggle";
import { contactLinks } from "@/content/contacts";
import { marcasDeRota } from "@/content/rodape-de-rota";
import { ArrowUpRight } from "lucide-react";

const navItems = [
  { name: "Projetos", path: "/projetos" },
  { name: "Shizune", path: "/shizune" },
  { name: "Novidades", path: "/novidades" },
  { name: "Sobre", path: "/sobre" },
  // Contato deixou de ser botao de destaque por pedido do operador: vira aba
  // comum, do lado das outras — no celular a barra inferior ja o carrega.
  { name: "Contato", path: "/contato" },
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

  // O segmento da rota, quando ela é uma página de produto. A barra do lockup
  // passa a separar alguma coisa — no topo e no rodapé, com a mesma fonte de
  // verdade, para os dois nunca discordarem.
  const { pathname } = useLocation();
  const segmento = marcasDeRota[pathname]?.segmento;

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-md"
      aria-label="Navegação principal"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" aria-label="Cadu Azeredo — início">
            <BrandMark size="sm" segmento={segmento} />
          </Link>

          <div className="flex items-center gap-3 sm:gap-7">
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

            {/* O modo de leitura vivia so em /produtos, o que na pratica
                significava que quem abria a home nunca soube que ele existe.
                No celular ele fica fora da barra: la o espaco e do nome e a
                navegacao mora na barra inferior. */}
            <ModeToggle className="hidden lg:flex" />

            {repoBrain?.url && (
              <a
                href={repoBrain.url}
                target="_blank"
                rel="noopener noreferrer"
                className="sz-shine sz-card hidden sm:inline-flex items-center rounded-lg border border-border px-3 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-border-accent hover:text-primary"
              >
                GitHub
                <ArrowUpRight
                  className="ml-0.5 inline h-3 w-3"
                  aria-hidden="true"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
