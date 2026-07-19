export type ProjectStatus = "building" | "live" | "archived" | "lab";

export type ProjectCategory =
  "product" | "frontend" | "wordpress" | "experiment";

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  status: ProjectStatus;
  featured: boolean;
  category: ProjectCategory;
  stack: string[];
  role: string[];
  year?: number;
  coverImage?: string;
  gallery?: string[];
  liveUrl?: string;
  repositoryUrl?: string;
  problem?: string;
  solution?: string;
  process?: string[];
  learnings?: string[];
  nextSteps?: string[];
}
