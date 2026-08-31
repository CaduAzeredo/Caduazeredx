# caduazeredo.com — V1

Portfólio e hub pessoal de Carlos Eduardo “Cadu” Azeredo Moura.

Este projeto apresenta meus trabalhos em front-end, produtos digitais, UX/UI e IA aplicada. 
Também atua como base para futura criação de conteúdo e comunidade.

## Estética

O site é projetado sob o conceito **"Space Terminal / Digital Workshop"**, criando um ambiente técnico, minimalista e autoral com visual dark mode sofisticado e detalhes sutis de terminal.

## Stack do Projeto

- **Runtime**: Bun
- **Framework**: React (v19)
- **Compilador**: Vite
- **Estilização**: Tailwind CSS v4 (com `@tailwindcss/vite` nativo)
- **Animações**: `motion` (Framer Motion v12)
- **Roteamento**: React Router (v7)
- **Ícones**: Lucide React
- **Hospedagem**: Vercel

## Estrutura do Código

```text
src/
├── app/          # Bootstrap, provedores e roteador
├── components/   # Componentes modulares
│   ├── background/ # Malha de grid e nebulosas CSS
│   ├── layout/     # Navbar, Footer e transições de rotas
│   ├── project/    # Cards de projetos e badges de status
│   ├── terminal/   # Terminal narrativo e efeitos de escrita
│   └── ui/         # Componentes universais (botões, etc.)
├── content/      # Bancos de dados estáticos (projetos e contatos)
├── lib/          # Utilitários de estilo e animação
├── pages/        # Telas completas (Início, Sobre, Projetos, etc.)
├── styles/       # Estilos globais e tokens de design system
├── types/        # Tipagem TypeScript estrita
└── main.tsx      # Ponto de entrada da aplicação
```

## Desenvolvimento Local

Certifique-se de ter o [Bun](https://bun.sh) instalado.

```bash
# Instalar dependências
bun install

# Iniciar servidor local
bun run dev

# Gerar build estático para produção
bun run build
```

## Scripts Disponíveis

- `bun run dev` - Inicia o servidor local de desenvolvimento.
- `bun run build` - Gera a build otimizada de produção.
- `bun run lint` - Executa o ESLint para auditoria de código.
- `bun run typecheck` - Executa a verificação estrita de tipos do TypeScript.

## Configuração de Contatos

Como nenhuma URL foi inventada na implementação inicial, os links sociais da página `/contato` vêm vazios por padrão. Para ativá-los:
1. Abra o arquivo `src/content/contacts.ts`.
2. Insira suas URLs e e-mail nos campos correspondentes.
3. Os botões de atalho correspondentes serão ativados automaticamente na interface.

## 🤖 Setup de Agentes & Infraestrutura de IA

A infraestrutura de IA e agentes do **caduazeredo.com** segue uma sequência fixa de 11 ferramentas integradas, garantindo controle de custos, consistência de design, auditoria visual, SEO, mobile e segurança:

| Ordem | Ferramenta | Função & Motivo | Comando / Uso | Status |
| :---: | :--- | :--- | :--- | :---: |
| 1 | **OmniRoute** | Gateway centralizador de LLMs. | `pm2 start omniroute` | [-] Omitido |
| 2 | **Graphify** | Mapeia o codebase inteiro em grafo de conhecimento local em `docs/graphify-knowledge-graph.md`. | `/graphify` | [x] Concluído |
| 3 | **Impeccable** | Define e garante regras de design system em `DESIGN.md` e produto em `PRODUCT.md`. | `npx impeccable install` \| `/impeccable init` | [x] Concluído |
| 4 | **Taste Skill** | Gera componentes novos calibrados em `docs/taste-skill.md`. | `/taste variance 2 motion 2 density 4` | [x] Concluído |
| 5 | **Mobile Readiness Skill** | Audita telas contra checklist mobile/PWA em `docs/mobile-readiness-skill.md`. | `/mobile [tela]` | [x] Concluído |
| 6 | **Hallmark** | Audita páginas React contra 65 quality gates visuais em `docs/hallmark-quality-gates.md`. | `/audit [pasta]` | [x] Concluído |
| 7 | **UI/UX Review Agent** | Analisa atritos cognitivos em fluxos em `docs/ui-ux-review-agent.md`. | `python ui_design_assistant.py` | [x] Concluído |
| 8 | **Claude SEO** | SEO técnico, local e GEO/AEO em `docs/claude-seo-spec.md`. | `/seo audit` \| `/seo local` \| `/seo geo` | [x] Concluído |
| 9 | **SEO Audit Skill (SEOmator)** | Auditoria técnica complementar de performance/SEO em `docs/seo-audit-skill.md`. | `seo-audit-skill scan [URL]` | [x] Concluído |
| 10 | **Council Skill** | Painel deliberativo de decisão crítica V1 → V2 em `docs/council-skill.md`. | Acionar antes de refatorações grandes | [x] Concluído |
| 11 | **PentestGPT** | Teste de segurança autônomo em staging em `docs/pentestgpt-security-protocol.md`. | `pentestgpt` | [x] Concluído |

> ⚠️ PentestGPT nunca deve rodar contra produção, apenas contra staging.

