import React from "react";
import { Link } from "react-router-dom";
import type { Product, ProductStatus } from "@/types";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  product: Product;
}

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

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const status = statusConfig[product.status];

  return (
    <div className="h-full rounded-lg bg-surface border border-border p-6 flex flex-col justify-between hover:border-primary/50 transition-[border-color,box-shadow] duration-300 relative group glow-border">
      <div className="space-y-4">
        {/* Categoria & Status */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-wider uppercase text-primary font-medium">
            Produto
          </span>
          <span
            className={cn(
              "inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono border",
              status.badgeClass,
            )}
          >
            <span className={cn("w-1.5 h-1.5 rounded-full", status.dotClass)} />
            <span>{status.label}</span>
          </span>
        </div>

        {/* Título & Tagline */}
        <div className="space-y-2">
          <h3 className="font-sans text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          {/* Tamanho maior é intencional - solicitado para melhorar legibilidade dos cards */}
          <p className="text-base text-muted-foreground leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Features (prévia) */}
        <ul className="space-y-1.5 pt-1">
          {product.features.slice(0, 3).map((feature) => (
            <li
              key={feature}
              className="flex items-start space-x-2 text-sm text-muted-foreground"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-primary-muted mt-0.5 flex-shrink-0" />
              <span className="line-clamp-2">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 pt-4 border-t border-border/80">
        <Link
          to={`/produtos/${product.slug}`}
          className="inline-flex items-center space-x-2 text-sm text-primary font-medium hover:text-primary-muted transition-colors"
        >
          <span>Ver detalhes</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
