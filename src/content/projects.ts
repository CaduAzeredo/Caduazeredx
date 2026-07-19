import type { Project } from "../types";

export const projects: Project[] = [
  {
    slug: "diariabr",
    title: "DiáriaBr / DiáriaPalmas",
    shortDescription:
      "Marketplace de serviços por diária nascido da experiência prática com eventos e demandas de prestadores de serviço em Palmas, Tocantins.",
    status: "building",
    featured: true,
    category: "product",
    stack: ["React", "TypeScript", "Vite", "Bun", "Supabase (futuro)"],
    role: ["Desenvolvedor Front-end", "Product Builder", "UX/UI Designer"],
    year: 2026,
    problem:
      "Dificuldade na contratação ágil de prestadores de serviço confiáveis para diárias e eventos locais, além da falta de um canal unificado e profissional para quem oferece esses serviços em Palmas.",
    solution:
      "Um marketplace completo e ágil estruturado como produto digital, conectando contratantes e prestadores de serviço com fluxos de contratação otimizados e foco total na experiência do usuário.",
    process: [
      "Mapeamento de dores locais com prestadores de serviço e organizadores de eventos em Palmas.",
      "Desenho de fluxos UX essenciais para simplificar a oferta e aceitação de diárias.",
      "Desenvolvimento da interface de front-end com React, TypeScript e Tailwind CSS para máxima fluidez e responsividade.",
      "Preparação da arquitetura e modelo de dados para acoplamento com serviços Supabase.",
    ],
    learnings: [
      "A importância de focar na resolução de um problema real local antes de pensar na escala tecnológica.",
      "Como estruturar um front-end altamente responsivo e simples para prestadores de serviço no ambiente móvel.",
    ],
    nextSteps: [
      "Conclusão das interfaces de onboarding de prestadores.",
      "Integração com Supabase Auth e Banco de Dados.",
      "Testes piloto com primeiros usuários em Palmas.",
    ],
  },
];
