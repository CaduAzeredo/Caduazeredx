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
      <div className="flex items-center justify-between px-4 py-3 bg-surface-elevated border-b border-border/70 select-none">
        <div className="flex items-center space-x-2">
          {/* Linux window dots */}
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-75" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-75" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] opacity-75" />
        </div>
        <div className="text-xs font-mono text-muted-foreground select-none">
          {title}
        </div>
        <div className="w-12" /> {/* Empty block to center align title bar */}
      </div>

      {/* Terminal Content Body */}
      <div className="p-5 md:p-6 font-mono text-sm text-foreground overflow-y-auto leading-relaxed select-text">
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;
