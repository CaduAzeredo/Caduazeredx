import type { TipoDeSite } from "@/types";

/**
 * Trabalho de cliente, quase todo sem autorização para citar nome ou link.
 *
 * O que se mostra é a **classe do problema e a stack** — nunca a assinatura de
 * um produto específico. Isso não é timidez comercial: um projeto continua
 * identificável mesmo sem o nome quando se descreve a combinação exata de
 * características, e a regra de quarentena de cliente vale igual aqui.
 *
 * A régua é deliberada: cobre os tipos de site que um cliente comum procura,
 * para quem chegar reconhecer o próprio caso na lista.
 */
export const tiposDeSite: TipoDeSite[] = [
  {
    slug: "loja-curadoria",
    titulo: "Loja de roupas com curadoria",
    descricao:
      "Vitrine própria alimentada por catálogo de marketplace, com recomendação de produto e link direto para a compra.",
    stack: ["React", "catálogo externo", "afiliados"],
    icone: "shopping-bag",
  },
  {
    slug: "loja-plataforma",
    titulo: "Loja em plataforma",
    descricao:
      "Loja montada e personalizada em Nuvemshop — tema, catálogo, frete e checkout prontos para operar no dia seguinte.",
    stack: ["Nuvemshop", "tema custom"],
    icone: "store",
  },
  {
    slug: "atacado",
    titulo: "Catálogo com venda em lote",
    descricao:
      "Loja completa de produtos artesanais, organizada para atacado: faixa de preço por quantidade, kit fechado e pedido mínimo.",
    stack: ["e-commerce", "atacado"],
    icone: "boxes",
  },
  {
    slug: "restaurante",
    titulo: "Restaurante",
    descricao:
      "Cardápio que o dono edita sozinho, pedido pelo WhatsApp, horário e localização — feito para abrir rápido no celular, que é onde ele é lido.",
    stack: ["cardápio", "mobile-first"],
    icone: "utensils",
  },
  {
    slug: "links",
    titulo: "Página de links",
    descricao:
      "O hub de bio com cara própria em vez de template genérico, com medição de clique por link.",
    stack: ["landing", "analytics"],
    icone: "link",
  },
  {
    slug: "institucional-agenda",
    titulo: "Institucional com agendamento",
    descricao:
      "Clínica, estúdio ou profissional autônomo: serviços, prova social e horário marcado direto na página.",
    stack: ["institucional", "agenda"],
    icone: "calendar-check",
  },
];
