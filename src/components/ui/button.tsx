/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = (
  variant: "primary" | "secondary" | "outline" | "ghost" = "primary",
  size: "sm" | "md" | "lg" = "md",
) => {
  return cn(
    "inline-flex items-center justify-center font-sans font-medium rounded transition-all duration-200 outline-none cursor-pointer focus:ring-1 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed",
    // Variants
    // Nenhuma cor escrita aqui: a de fundo vem do token, a do texto é o próprio
    // fundo da página, e o brilho sai de .glow-border — que lê --glow-rgb e
    // portanto acompanha o tema sem este arquivo saber de que cor ele é.
    variant === "primary" &&
      "bg-primary text-background hover:bg-primary-muted glow-border active:scale-[0.98]",
    variant === "secondary" &&
      "bg-secondary text-foreground hover:bg-secondary/80 active:scale-[0.98]",
    variant === "outline" &&
      "border border-border bg-transparent text-foreground hover:bg-surface hover:border-muted-foreground active:scale-[0.98]",
    variant === "ghost" &&
      "bg-transparent text-muted-foreground hover:text-foreground hover:bg-surface",
    // Sizes
    size === "sm" && "px-3 py-1.5 text-xs font-mono tracking-tight",
    size === "md" && "px-5 py-2.5 text-sm",
    size === "lg" && "px-7 py-3 text-base",
  );
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants(variant, size), className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
