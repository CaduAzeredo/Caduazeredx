# PROMPT KIT COMPLETO — Agentes, README e Onboarding de Projeto

> Arquivo único para colocar temporariamente na raiz do projeto, compartilhar com clientes ou enviar para quem assistir seu vídeo. Ele reúne os prompts mestre, o template de README e o guia de uso para que um agente adapte a stack ao contexto do projeto com segurança.

---

## 1) Quando usar este kit

Use este arquivo quando você quiser que um agente:
- leia um projeto já existente e adapte a stack de agentes;
- crie a documentação inicial de um projeto novo;
- atualize um README com a seção de agentes;
- siga uma ordem segura de implementação;
- retorne ao README oficial como fonte de verdade ao final.

---

## 2) Fluxo recomendado

1. Coloque este arquivo na raiz do projeto temporariamente.
2. Peça ao agente para ler este arquivo primeiro e depois o `README.md`.
3. O agente identifica se o projeto já existe ou se vai começar do zero.
4. Ele aplica o prompt correto, na ordem certa, validando etapa por etapa.
5. Ao final, atualiza o README oficial e este arquivo pode ser removido.

---

## 3) PROMPT MESTRE — PROJETO EXISTENTE

```text
Contexto do projeto:
Nome do projeto: [NOME_DO_PROJETO]
Descrição curta: [O QUE O PROJETO FAZ, EM 1-2 FRASES]
Público-alvo / região: [EX: MARKETPLACE LOCAL EM PALMAS/TO, SAAS B2B, ETC]

Stack fixa do projeto (NÃO questionar nem sugerir troca):
- Framework/Bundler: [EX: VITE 8 / NEXT.JS / OUTRO]
- Framework de UI: [EX: REACT 19 + TYPESCRIPT STRICT]
- Gerenciamento de estado: [EX: ZUSTAND V5 / REDUX / CONTEXT]
- Backend/Banco: [EX: SUPABASE V2 / FIREBASE / POSTGRES]
- Estilização: [EX: TAILWIND CSS V4]
- Ícones: [EX: LUCIDE REACT]
- Package manager: [EX: BUN / PNPM / NPM]
- Deploy: [EX: VERCEL / NETLIFY / RAILWAY]
- Regras absolutas do design: [EX: DARK ONLY, COR PRIMARIA #F97316, FUNDO #171614,
  FONTES ARCHIVO BLACK + DM SANS, NUNCA USAR FRAMER-MOTION]

Primeiro passo obrigatório:
Antes de qualquer ação, leia o README.md completo do projeto (e a pasta
/docs se existir) para entender:
- estrutura de pastas atual;
- rotas e páginas já implementadas;
- fase atual do roadmap;
- regras de commit e validação já definidas (ex: bun tsc --noEmit).

Não sugira mudar nada da arquitetura já definida. Apenas ENCAIXE a stack de
agentes abaixo dentro do que já existe.

Objetivo:
Quero implementar uma stack de 11 ferramentas/agentes de IA para cobrir
infraestrutura de IA, arquitetura, design, geração de UI, auditoria visual,
SEO/GEO, mobile, segurança e governança de decisão — na ordem exata abaixo.
Cada ferramenta só deve ser instalada depois que a anterior estiver validada.

ORDEM DE IMPLEMENTAÇÃO (não alterar a sequência):
1. OmniRoute — Gateway de LLMs
2. Graphify — Grafo de conhecimento do código
3. Impeccable — Design language permanente
4. Taste Skill — Geração de UI com identidade
5. Mobile Readiness Skill — Auditoria mobile/PWA
6. Hallmark — Auditoria de páginas existentes
7. UI/UX Review Agent — Validação visual final
8. Claude SEO — SEO técnico, local e GEO/AEO
9. SEO Audit Skill (SEOmator) — Auditoria técnica complementar
10. Council Skill — Painel deliberativo
11. PentestGPT — Segurança final (apenas staging)

Regras operacionais obrigatórias:
- Não alterar nada da arquitetura já existente sem justificar o motivo.
- Não sair da stack fixa definida acima.
- Sempre validar com [COMANDO DE VALIDAÇÃO] antes de qualquer commit.
- A cada ferramenta instalada, atualize o README.md do projeto com uma
  seção "Setup de Agentes & Infraestrutura de IA" documentando: nome da
  ferramenta, função, comando de uso e status.
- Pare e me peça confirmação antes de avançar para a próxima ferramenta da
  lista.
- Ao final de cada etapa, resuma: o que foi instalado, como usar, quando
  chamar, e qual risco essa ferramenta reduz no projeto.

Comece lendo o README.md do projeto agora e me diga o que encontrou antes
de iniciarmos a Etapa 1 (OmniRoute).
```

---

## 4) PROMPT MESTRE — PROJETO NOVO

```text
Contexto do projeto (NOVO — ainda não existe README):
Nome do projeto: [NOME_DO_PROJETO]
O que o projeto faz: [DESCRIÇÃO EM 2-3 FRASES]
Público-alvo: [EX: PROFISSIONAIS AUTONOMOS E EMPRESAS EM PALMAS/TO]
Problema que resolve: [EX: CONTRATAÇÃO INFORMAL VIA WHATSAPP, SEM SEGURANÇA]

Stack escolhida (defina agora, não muda depois):
- Framework/Bundler: [EX: VITE 8 / NEXT.JS]
- UI: [EX: REACT 19 + TYPESCRIPT STRICT]
- Estado: [EX: ZUSTAND V5]
- Backend/Banco: [EX: SUPABASE V2]
- Estilização: [EX: TAILWIND CSS V4]
- Ícones: [EX: LUCIDE REACT]
- Package manager: [EX: BUN]
- Deploy: [EX: VERCEL]

Design system inicial:
- Tema: [EX: DARK ONLY / LIGHT / AMBOS]
- Cor primária: [EX: #F97316]
- Cor de fundo: [EX: #171614]
- Fontes: [EX: ARCHIVO BLACK (TÍTULOS) + DM SANS (CORPO)]
- Restrições: [EX: NUNCA USAR FRAMER-MOTION, SEMPRE VARIÁVEIS CSS]

PASSO 1 — Criar a documentação base (fazer ANTES de qualquer código)
Crie os seguintes arquivos na raiz do projeto:
1. README.md
2. PRODUCT.md
3. DESIGN.md

Me mostre os 3 arquivos criados antes de seguir para o Passo 2.

PASSO 2 — Implementar a stack de 11 agentes, na ordem exata:
1. OmniRoute
2. Graphify
3. Impeccable
4. Taste Skill
5. Mobile Readiness Skill
6. Hallmark
7. UI/UX Review Agent
8. Claude SEO
9. SEO Audit Skill / SEOmator
10. Council Skill
11. PentestGPT

Regras operacionais:
- Sempre atualizar o README.md após cada instalação.
- Sempre validar com [COMANDO DE VALIDAÇÃO] antes de qualquer commit.
- Parar e pedir confirmação a cada ferramenta instalada.
- Ao final de cada etapa, resumir: o que foi feito, como usar, quando chamar, e por que importa nesse estágio do projeto.

Comece agora pelo Passo 1 — criação da documentação base.
```

---

## 5) TEMPLATE PARA README.md

```markdown
## 🤖 Setup de Agentes & Infraestrutura de IA

A infraestrutura de IA e agentes do **[NOME_DO_PROJETO]** segue uma
sequência fixa de 11 ferramentas integradas, garantindo controle de
custos, consistência de design, auditoria visual, SEO, mobile e segurança:

| Ordem | Ferramenta | Função & Motivo | Comando / Uso | Status |
| :---: | :--- | :--- | :--- | :---: |
| 1 | **OmniRoute** | Gateway centralizador de LLMs. Roteia provedores em endpoint único, evitando reconfiguração em cada ferramenta seguinte. | `pm2 start omniroute` \| `omniroute doctor` | [ ] Pendente |
| 2 | **Graphify** | Mapeia o codebase inteiro em grafo de conhecimento local. | `/graphify` | [ ] Pendente |
| 3 | **Impeccable** | Cria `PRODUCT.md` e `DESIGN.md` com regras fixas de design system. | `npx impeccable install` \| `/impeccable init` | [ ] Pendente |
| 4 | **Taste Skill** | Gera componentes novos com identidade visual (3 dials). | `/taste variance X motion Y density Z` | [ ] Pendente |
| 5 | **Mobile Readiness Skill** | Audita telas contra checklist de mobile/PWA. | `/mobile [tela]` | [ ] Pendente |
| 6 | **Hallmark** | Audita páginas React contra 65 quality gates visuais. | `/audit [pasta]` | [ ] Pendente |
| 7 | **UI/UX Review Agent** | Analisa atritos cognitivos em telas críticas de conversão. | `python ui_design_assistant.py -p [caminho]` | [ ] Pendente |
| 8 | **Claude SEO** | SEO técnico, local e GEO/AEO. | `/seo audit` \| `/seo local` \| `/seo geo` | [ ] Pendente |
| 9 | **SEO Audit Skill (SEOmator)** | Auditoria técnica complementar de performance e segurança. | `seo-audit-skill scan [URL]` | [ ] Pendente |
| 10 | **Council Skill** | Painel deliberativo de decisão crítica. | Acionar antes de refatorações grandes | [ ] Pendente |
| 11 | **PentestGPT** | Teste de segurança autônomo — apenas staging. | `pentestgpt --reasoning_model=[modelo]` | [ ] Pendente |

> ⚠️ PentestGPT nunca deve rodar contra produção, apenas contra staging.
```

---

## 6) Guia temporário para a raiz do projeto

```markdown
# PROMPT-README-AGENTES.md

Coloque este arquivo temporariamente na raiz do projeto.
Peça ao agente para ler este arquivo primeiro e depois o README.md.
Use o prompt de projeto existente se o projeto já tiver estrutura.
Use o prompt de projeto novo se o projeto estiver começando do zero.
Use o template de README se a intenção for só documentar a stack.
Depois que o README oficial estiver pronto e validado, este arquivo pode ser excluído.
```

---

## 7) Ordem de uso recomendada

1. OmniRoute
2. Graphify
3. Impeccable
4. Taste Skill
5. Mobile Readiness Skill
6. Hallmark
7. UI/UX Review Agent
8. Claude SEO
9. SEO Audit Skill
10. Council Skill
11. PentestGPT

A lógica é: infraestrutura, arquitetura, design, geração, mobile, auditoria, UX, SEO, governança e segurança.

---

## 8) Regras finais

- Sempre manter o README oficial como fonte de verdade do projeto.
- Nunca rodar PentestGPT em produção.
- Nunca quebrar a stack já definida.
- Sempre validar antes de commits.
- Sempre pedir confirmação antes de avançar para a próxima ferramenta.

---

## 9) Checklist rápido

- README lido.
- Prompt correto escolhido.
- Stack validada.
- Ferramentas instaladas em ordem.
- README atualizado.
- Projeto pronto para seguir com o fluxo normal.