import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PageShell from "@/components/layout/page-shell";
import { buttonVariants } from "@/components/ui/button";
import { Terminal, BookOpen, Settings } from "lucide-react";

export const AboutPage: React.FC = () => {
  // Atualizar título para SEO
  useEffect(() => {
    document.title =
      "Sobre | Cadu Azeredo — Front-end Developer & Product Builder";
  }, []);

  return (
    <PageShell>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left">
        {/* Cabeçalho */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-sans">
            Sobre Mim
          </h1>
          <p className="text-xl text-primary font-mono font-medium">
            Desenvolvedor Front-end & Product Builder
          </p>
        </div>

        <hr className="border-border/60" />

        {/* INTRODUÇÃO */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-sans text-foreground flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-primary" />
            <span>Perfil Profissional</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
            Olá, sou Carlos Eduardo Moura, profissionalmente conhecido como
            **Cadu Azeredo**. Sou graduado em **Sistemas para Internet** com
            cursos focados em **UX e UI Design**. Tenho mais de 5 anos de
            experiência no desenvolvimento web, iniciando no ecossistema
            WordPress e progredindo de forma consistente para desenvolvimento
            front-end moderno utilizando **React** e **TypeScript**.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
            Minha abordagem foca em unir a rigorosa engenharia de código
            front-end moderno ao cuidado estético e usabilidade de interfaces
            digitais, sempre orientando as decisões pela resolução de problemas
            reais de produto.
          </p>
        </section>

        {/* FILOSOFIA DE PRODUTO */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-sans text-foreground flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-secondary" />
            <span>Como Penso Produtos</span>
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 rounded-lg bg-surface/50 border border-border/80">
              <span className="block font-mono text-xs text-primary font-semibold uppercase mb-1">
                Problema antes de Tecnologia
              </span>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Nenhum código avançado salva um produto que ninguém quer usar.
                Entender profundamente o problema, a jornada do usuário e a
                necessidade comercial vem sempre em primeiro lugar.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-surface/50 border border-border/80">
              <span className="block font-mono text-xs text-primary-muted font-semibold uppercase mb-1">
                Clareza e Usabilidade
              </span>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Interfaces digitais precisam ser simples, diretas e acessíveis a
                todas as pessoas. Trabalho para reduzir a fricção cognitiva e
                entregar telas limpas e fluidas.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-surface/50 border border-border/80">
              <span className="block font-mono text-xs text-secondary font-semibold uppercase mb-1">
                Engenharia Sustentável
              </span>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Código estruturado, TypeScript estrito, componentes
                reutilizáveis focados e ausência de dependências desnecessárias
                ajudam a manter o código sustentável e escalável a longo prazo.
              </p>
            </div>
          </div>
        </section>

        {/* INTERESSES & HOBBIES (HONESTO) */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-sans text-foreground flex items-center space-x-2">
            <Settings className="w-5 h-5 text-primary-muted" />
            <span>Interesses do Workspace</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
            Além do ecossistema React/TS, dedico meu tempo de estudo e testes a:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-4 list-disc text-xs sm:text-sm text-muted-foreground">
            <li>Sistemas operacionais Linux e personalização de terminal.</li>
            <li>
              Automações locais de tarefas utilizando scripts e shell scripting.
            </li>
            <li>Configurações de produtividade no ecossistema Git/GitHub.</li>
            <li>
              Estudos práticos de IA aplicada ao desenvolvimento de software.
            </li>
          </ul>
        </section>

        {/* CHAMADA PARA AÇÃO */}
        <section className="pt-6 border-t border-border/60 flex flex-wrap gap-4 items-center justify-between">
          <div className="space-y-1">
            <span className="block text-xs font-mono text-muted-foreground">
              [sys.next_step]
            </span>
            <span className="block text-sm font-sans text-muted-foreground">
              Quer conhecer meus trabalhos na prática?
            </span>
          </div>
          <div className="flex gap-3">
            <Link to="/projetos" className={buttonVariants("primary", "md")}>
              Ver projetos
            </Link>
            <Link to="/contato" className={buttonVariants("outline", "md")}>
              Contato
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
};

export default AboutPage;
