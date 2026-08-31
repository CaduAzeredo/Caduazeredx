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

export type ProductStatus = "active" | "invite-only" | "em-breve";

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
  /**
   * Peca visual propria deste produto, montada sob demanda na pagina de
   * detalhe. So existe onde ha o que mostrar: a pagina continua desenhando
   * todo produto igual, e esta e a excecao declarada.
   */
  visual?: "brain-estrutura";
}

export type NovidadeCategoria =
  "modelo" | "interface" | "seguranca" | "arquitetura" | "lancamento";

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

export type ServiceStatus = "disponivel" | "em-breve";

export interface ServicoResumo {
  slug: string;
  nome: string;
  resumo: string;
}

export interface Service extends ServicoResumo {
  paraQuem: string[];
  entregavel: string[];
  foraDoEscopo: string[];
  duracaoTipica: string;
  status: ServiceStatus;
}

export interface ServiceStep {
  id: string;
  titulo: string;
  descricao: string;
}

export type IconeTipoDeSite =
  "shopping-bag" | "store" | "boxes" | "utensils" | "link" | "calendar-check";

export interface TipoDeSite {
  slug: string;
  titulo: string;
  descricao: string;
  stack: string[];
  icone: IconeTipoDeSite;
}

export type ReiDestinoTipo = "repo" | "produtos" | "contato";

export interface ReiDestino {
  rotulo: string;
  tipo: ReiDestinoTipo;
}

export interface ReiTroca {
  id: string;
  pergunta: string;
  resposta: string;
  destino: ReiDestino;
  /**
   * Termos que fazem esta troca casar com o que a pessoa digitou. Sem acento e
   * em minusculas — a normalizacao acontece dos dois lados antes de comparar.
   */
  palavras: string[];
}
