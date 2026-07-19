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
    variant === "primary" &&
      "bg-primary text-[#0B0D14] hover:bg-primary-muted border-glow hover:shadow-[0_0_12px_rgba(246,114,128,0.3)] active:scale-[0.98] transition-shadow",
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
