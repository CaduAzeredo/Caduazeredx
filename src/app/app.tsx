import React from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import SpaceBackground from "@/components/background/space-background";
import AppRouter from "./router";

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative text-foreground">
      {/* Fundo Espacial com Grid CSS */}
      <SpaceBackground />

      {/* Navegação Principal */}
      <Navbar />

      {/* Conteúdo das Páginas (Gerenciado pelo Roteador) */}
      <div className="flex-grow flex flex-col">
        <AppRouter />
      </div>

      {/* Rodapé da Página */}
      <Footer />
    </div>
  );
};

export default App;
