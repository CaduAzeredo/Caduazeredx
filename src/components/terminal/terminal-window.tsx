import React from "react";
import { cn } from "@/lib/utils";

export interface TerminalWindowProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title = "cadu@azeredo: ~",
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "w-full rounded-lg bg-surface border border-border overflow-hidden terminal-window text-left",
        className,
      )}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center gap-2.5 px-4 py-3 bg-surface-elevated border-b border-border/70 select-none">
        {/* Um glifo no lugar dos três pontinhos de janela: eles são o clichê
            mais genérico que um terminal desenhado pode ter, e eram as três
            últimas cores escritas à mão no projeto. */}
        <span
          className="font-mono text-[11px] leading-none text-primary"
          aria-hidden="true"
        >
          ▓
        </span>
        <div className="text-xs font-mono text-muted-foreground select-none">
          {title}
        </div>
      </div>

      {/* Terminal Content Body */}
      <div className="p-5 md:p-6 font-mono text-sm text-foreground overflow-y-auto leading-relaxed select-text">
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;
