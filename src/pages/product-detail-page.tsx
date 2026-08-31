import React, { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import PageShell from "@/components/layout/page-shell";
import Button from "@/components/ui/button";
import LeadForm from "@/components/product/lead-form";
import { products } from "@/content/products";
import type { ProductStatus } from "@/types";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Target,
  Send,
} from "lucide-react";

const statusConfig: Record<
  ProductStatus,
  { label: string; badgeClass: string; dotClass: string }
> = {
  active: {
    label: "Disponível",
    badgeClass: "bg-status-live/10 text-status-live border-status-live/30",
    dotClass: "bg-status-live",
  },
  "invite-only": {
    label: "Somente convite",
    badgeClass: "bg-secondary/20 text-secondary border-secondary/30",
    dotClass: "bg-secondary",
  },
  "em-breve": {
    label: "Em breve",
    badgeClass: "bg-status-wait/10 text-status-wait border-status-wait/30",
    dotClass: "bg-status-wait",
  },
};

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | Cadu Azeredo`;
    }
  }, [product]);

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  const status = statusConfig[product.status];

  return (
    <PageShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14 text-left">
        {/* Voltar para Produtos */}
        <div>
          <Link
            to="/produtos"
            className="inline-flex items-center space-x-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para produtos</span>
          </Link>
        </div>

        {/* HERO */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono tracking-wider uppercase text-primary font-medium">
              Produto
            </span>
            <span
              className={cn(
                "inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono border",
                status.badgeClass,
              )}
            >
              <span
                className={cn("w-1.5 h-1.5 rounded-full", status.dotClass)}
              />
              <span>{status.label}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-sans">
            {product.name}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-sans max-w-2xl">
            {product.tagline}
          </p>

          <a href="#captura" className="inline-block">
            <Button variant="primary" size="lg" className="space-x-2">
              <span>Entrar na lista de espera</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </header>

        <hr className="border-border/60" />

        {/* O QUE É */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-foreground">
            O que é
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
            {product.description}
          </p>
        </section>

        {/* FEATURES */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold font-sans flex items-center space-x-2 text-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span>O que faz</span>
          </h2>
          <ul className="space-y-3">
            {product.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start space-x-3 text-sm sm:text-base text-muted-foreground leading-relaxed font-sans"
              >
                <CheckCircle2 className="w-4 h-4 text-primary-muted mt-1 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* IDEAL PARA */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold font-sans flex items-center space-x-2 text-foreground">
            <Target className="w-5 h-5 text-secondary" />
            <span>Ideal para</span>
          </h2>
          <ul className="space-y-3">
            {product.idealFor.map((item) => (
              <li
                key={item}
                className="flex items-start space-x-3 text-sm sm:text-base text-muted-foreground leading-relaxed font-sans"
              >
                <Target className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <hr className="border-border/60" />

        {/* CAPTURA DE LEAD */}
        <section id="captura" className="space-y-6 scroll-mt-20">
          <h2 className="text-xl sm:text-2xl font-bold font-sans flex items-center space-x-2 text-foreground">
            <Send className="w-5 h-5 text-primary" />
            <span>Lista de espera</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans max-w-2xl">
            {product.waitlistCopy}
          </p>
          <div className="rounded-lg bg-surface border border-border p-6">
            <LeadForm produto={product.slug} />
          </div>
        </section>
      </div>
    </PageShell>
  );
};

export default ProductDetailPage;
