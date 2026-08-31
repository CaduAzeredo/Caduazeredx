import React from "react";

export interface PageShellProps {
  children: React.ReactNode;
}

/**
 * Casca de página. A transição de entrada é CSS puro — ver
 * `.anim-page-enter` em `src/styles/motion.css`.
 *
 * Este componente era o único motivo de a biblioteca de animação estar no
 * caminho crítico da home, por causa de um fade de 0,25s. O bloco global de
 * `prefers-reduced-motion` cuida de desligar a animação, então não há mais
 * nada a decidir em tempo de execução.
 */
export const PageShell: React.FC<PageShellProps> = ({ children }) => (
  <main
    id="conteudo"
    className="anim-page-enter flex-grow flex flex-col w-full"
  >
    {children}
  </main>
);

export default PageShell;
