import React, { useEffect } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import SpaceBackground from "@/components/background/space-background";
import BottomNav from "@/components/layout/bottom-nav";
import AppRouter from "./router";
import { ativarMovimento } from "@/lib/motion-enhance";
import { marcarBoot, encerrarBoot } from "@/lib/boot-shell";
import DefenseMode from "@/components/invasao/defense-mode";

export const App: React.FC = () => {
  // Rolagem suave, revelacao por rolagem e titulo por mascara de linha. Entra
  // em tempo ocioso, DEPOIS da primeira pintura: a pagina inteira funciona sem
  // isto, e nada aqui pode atrasar o primeiro desenho.
  useEffect(() => ativarMovimento(), []);

  // A aplicacao montou: e uma etapa real da casca de boot. Fora da home nao ha
  // cena pesada para cobrir, entao a casca sai assim que a pagina existe — o
  // dono do fechamento na home e a propria home, que sabe da cena.
  useEffect(() => {
    marcarBoot("app");
    if (window.location.pathname !== "/") encerrarBoot();
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative text-foreground">
      {/* Pular para o conteúdo — invisível até receber foco pelo teclado.
          A navegação tem sete destinos; sem isto, quem navega por tabulação
          atravessa os sete em toda página antes de chegar no texto.
          O destino é o id em PageShell. */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-background"
      >
        Pular para o conteúdo
      </a>

      {/* Fundo Espacial com Grid CSS */}
      <SpaceBackground />

      {/* Navegação Principal */}
      <Navbar />

      {/* Conteúdo das Páginas (Gerenciado pelo Roteador) */}
      <div className="flex-grow flex flex-col pb-[calc(60px+env(safe-area-inset-bottom))] md:pb-0">
        <AppRouter />
      </div>

      {/* Rodapé da Página */}
      <Footer />

      {/* Navegação do celular — fixa na zona do polegar. O respiro inferior
          está no contêiner acima: sem ele esta barra cobre o fim do conteúdo. */}
      <BottomNav />

      {/* O modo de defesa. Nao renderiza nada ate alguem escrever o comando
          no console da Rei — e, quando renderiza, nao bloqueia a pagina. */}
      <DefenseMode />
    </div>
  );
};

export default App;
