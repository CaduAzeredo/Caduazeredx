# Planejamento do Portal — caduazeredo.com

O projeto `caduazeredo.com` está estruturado para evoluir em fases incrementais. Este documento descreve o escopo de cada fase e as bases arquiteturais necessárias.

---

## V1 — Portfólio, Posicionamento e Estudo de Caso (Escopo Atual)

**Objetivo**: Lançar a fundação da marca pessoal com posicionamento claro de front-end developer e product builder.

- **Páginas**:
  - `Início` com terminal de boot narrativo apresentando stack e status.
  - `Projetos` apresentando o case de maior foco (**DiáriaBr**) e placeholders estruturados do laboratório.
  - `Estudo de Caso` detalhando contexto, proposta e stack técnica do DiáriaBr.
  - `Sobre` com histórico profissional e abordagem.
  - `Contato` com redirecionamentos diretos e estrutura de configuração de links.
- **Técnico**:
  - React + TS + Tailwind CSS v4.
  - Animações leves de carregamento e transição via `motion`.
  - Configuração de SEO e Open Graph estática.
  - Deploy pronto para Cloudflare Pages.

---

## V1.5 — Criação de Conteúdo e Audiência

**Objetivo**: Centralizar e atrair tráfego por meio de conhecimento e insights.

- **Novas Funcionalidades**:
  - Seção de posts técnicos (artigos escritos locais em MD/MDX).
  - Hub de vídeos com integração com YouTube e Instagram.
  - Formulário para Newsletter (captura de e-mails integrada com serviço terceiro leve, ex: ConvertKit ou Loops).
  - Linktree próprio otimizado para postar na bio do Instagram.

---

## V2 — Comunidade e Lista de Espera

**Objetivo**: Concentrar o público vindo das redes sociais e testar demanda de engajamento.

- **Novas Funcionalidades**:
  - Landing page dedicada de apresentação de comunidade técnica.
  - Formulário de cadastro para lista de espera da área de membros.
  - Calendário público de desafios, lives ou eventos futuros.
  - Integração inicial com banco de dados (Supabase) para persistência de leads.

---

## V3 — Recorrência e Área de Membros

**Objetivo**: Monetização e sustentabilidade da comunidade com entregáveis exclusivos.

- **Novas Funcionalidades**:
  - Sistema de login e autenticação (Supabase Auth).
  - Gateway de pagamento integrado (ex: Stripe ou Hotmart).
  - Área de membros restrita com conteúdos em vídeo, apostilas e desafios.
  - Integração de fórum fechado ou chat de apoio para membros assinantes.
