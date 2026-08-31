import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PageShell from "@/components/layout/page-shell";
import ProductCard from "@/components/product/product-card";
import TerminalWindow from "@/components/terminal/terminal-window";
import { products } from "@/content/products";
import { services, fluxo } from "@/content/services";
import ModeCards from "@/components/mode/mode-cards";

export const ProductsPage: React.FC = () => {
  useEffect(() => {
    document.title =
      "Produtos e consultoria | Cadu Azeredo — Front-end Developer & Product Builder";
  }, []);

  return (
    <PageShell>
      <div className="max-w-6xl mx-auto flex flex-col gap-16 px-4 sm:px-6 lg:px-8 py-12">
        {/* Cabeçalho */}
        <header className="space-y-4 text-left border-b border-border/80 pb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-sans">
            Produtos e consultoria
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
            Duas coisas nesta página. Em cima, as ferramentas — o Brain
            Framework é aberto e você pode adotá-lo hoje, sozinho, sem falar com
            ninguém. Embaixo, as quatro formas de contratar a aplicação do
            método no seu caso, com escopo escrito e entrega verificável.
          </p>
        </header>

        {/* Modo de leitura — muda a ORDEM das duas seções abaixo, e a
            temperatura do site inteiro. Nada é escondido. */}
        <ModeCards />

        {/* Ferramentas */}
        <section
          data-reveal
          data-audience="dev"
          className="space-y-6 order-2 [html[data-mode=empresa]_&]:order-3"
        >
          <div className="space-y-2">
            <h2
              data-split
              className="text-xl font-bold tracking-tight font-sans"
            >
              As ferramentas
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              Nenhuma é produto de prateleira com autoatendimento. O framework é
              livre; o resto começa por uma conversa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        {/* Consultoria */}
        <section
          data-reveal
          data-audience="empresa"
          className="space-y-6 order-3 [html[data-mode=empresa]_&]:order-2"
        >
          <div className="space-y-2">
            <h2
              data-split
              className="text-xl font-bold tracking-tight font-sans"
            >
              A consultoria
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              Quatro serviços, cada um com escopo declarado — o que está dentro,
              o que está fora e o que você recebe no fim. Sem escopo aberto e
              sem cobrança por hora: preço fechado sobre escopo fechado, depois
              da conversa de diagnóstico.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((s) => (
              <article
                key={s.slug}
                className="flex flex-col rounded border border-border/80 bg-surface-elevated/40 p-6 space-y-5"
              >
                <div className="space-y-2">
                  <h3 className="text-base font-bold font-sans tracking-tight">
                    {s.nome}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.resumo}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground/70">
                    Para quem
                  </p>
                  <ul className="space-y-1.5">
                    {s.paraQuem.map((item) => (
                      <li
                        key={item}
                        className="text-xs text-muted-foreground leading-relaxed pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-primary/70"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground/70">
                    O que você recebe
                  </p>
                  <ul className="space-y-1.5">
                    {s.entregavel.map((item) => (
                      <li
                        key={item}
                        className="text-xs text-muted-foreground leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-primary"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground/70">
                    Fora do escopo
                  </p>
                  <ul className="space-y-1.5">
                    {s.foraDoEscopo.map((item) => (
                      <li
                        key={item}
                        className="text-xs text-muted-foreground/80 leading-relaxed pl-4 relative before:content-['×'] before:absolute before:left-0 before:text-muted-foreground/50"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-xs font-mono text-muted-foreground/70 mt-auto border-t border-border/50 pt-4">
                  {s.duracaoTipica}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Fluxo */}
        <section data-reveal className="space-y-6 order-4">
          <div className="space-y-2">
            <h2
              data-split
              className="text-xl font-bold tracking-tight font-sans"
            >
              Como funciona, do começo ao fim
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              O mesmo caminho para qualquer um dos quatro serviços.
            </p>
          </div>

          <TerminalWindow title="fluxo --do-contato-a-entrega">
            <ol className="space-y-5">
              {fluxo.map((passo) => (
                <li key={passo.id} className="space-y-1">
                  <p className="font-bold text-primary">{passo.titulo}</p>
                  <p className="text-muted-foreground leading-relaxed">
                    {passo.descricao}
                  </p>
                </li>
              ))}
            </ol>
          </TerminalWindow>

          <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
            O contato começa pelo formulário de qualquer produto acima, ou pela{" "}
            <Link to="/contato" className="text-primary hover:underline">
              página de contato
            </Link>
            . Ao enviar, você concorda com a{" "}
            <Link to="/privacidade" className="text-primary hover:underline">
              Política de Privacidade
            </Link>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
};

export default ProductsPage;
