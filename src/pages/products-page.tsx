import React, { useEffect } from "react";
import PageShell from "@/components/layout/page-shell";
import ProductCard from "@/components/product/product-card";
import { products } from "@/content/products";

export const ProductsPage: React.FC = () => {
  useEffect(() => {
    document.title =
      "Produtos | Cadu Azeredo — Front-end Developer & Product Builder";
  }, []);

  return (
    <PageShell>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Cabeçalho */}
        <div className="space-y-4 text-left border-b border-border/80 pb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-sans">
            Produtos
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
            Ferramentas que construí primeiro para o meu próprio fluxo de
            trabalho como desenvolvedor. Nenhuma delas é um produto de
            prateleira pronto para autoatendimento — cada uma abaixo tem uma
            lista de espera, porque a aplicação no seu caso começa com uma
            conversa.
          </p>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </PageShell>
  );
};

export default ProductsPage;
