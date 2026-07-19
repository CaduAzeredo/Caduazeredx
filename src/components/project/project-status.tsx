import React from "react";
import type { ProjectStatus as StatusType } from "@/types";
import { cn } from "@/lib/utils";

export interface ProjectStatusProps {
  status: StatusType;
  className?: string;
}

export const ProjectStatus: React.FC<ProjectStatusProps> = ({
  status,
  className,
}) => {
  const config = {
    building: {
      label: "Em construção",
      class: "bg-primary/10 text-primary border-primary/25",
      dotClass: "bg-primary animate-pulse",
    },
    live: {
      label: "Em produção",
      class: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
      dotClass: "bg-emerald-400",
    },
    archived: {
      label: "Arquivado",
      class:
        "bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20",
      dotClass: "bg-muted-foreground",
    },
    lab: {
      label: "Laboratório",
      class: "bg-secondary/20 text-secondary border-secondary/30",
      dotClass: "bg-secondary",
    },
  };

  const active = config[status] || {
    label: status,
    class: "bg-border text-foreground border-border",
    dotClass: "bg-foreground",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono border",
        active.class,
        className,
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", active.dotClass)} />
      <span>{active.label}</span>
    </span>
  );
};

export default ProjectStatus;
