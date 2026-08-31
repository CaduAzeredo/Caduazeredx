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

export type ProductSlug = "brain" | "rei" | "combo";

export type ProductStatus = "active" | "invite-only";

export interface Product {
  slug: ProductSlug;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  idealFor: string[];
  status: ProductStatus;
  waitlistCopy: string;
  externalUrl?: string;
}

export type NovidadeCategoria =
  "modelo" | "interface" | "seguranca" | "arquitetura";

export interface NovidadeEntry {
  id: string;
  data: string;
  titulo: string;
  resumo: string;
  detalhe: string;
  promptResumido?: string;
  custoUsd?: number;
  categoria: NovidadeCategoria;
}

export interface ProximoPasso {
  id: string;
  titulo: string;
  descricao: string;
}
