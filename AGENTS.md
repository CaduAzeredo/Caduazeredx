# Diretrizes para Agentes de IA — caduazeredo.com

Este arquivo estabelece as regras de desenvolvimento, design e qualidade para qualquer agente que realize alterações neste repositório.

## Regras Absolutas de Conteúdo

1. **Nunca Invente Dados**: Não adicione projetos fictícios, clientes simulados, depoimentos falsos, capturas de tela geradas por IA representando produtos inexistentes, ou métricas sem comprovação.
2. **Canais de Contato**: Links sociais, WhatsApp e E-mail devem ser lidos exclusivamente de `src/content/contacts.ts`. Se vazios, oculte o botão correspondente ou exiba a tela de configuração do sistema; nunca crie links fictícios ou placeholders genéricos.
3. **Protagonismo do DiáriaBr**: O único projeto real ativo na V1 é o **DiáriaBr / DiáriaPalmas** (status `building`). Ele deve reter o maior foco visual na Home e na página de projetos. Projetos futuros ou ideias devem usar o formato de laboratório (`isPlaceholder: true`), sendo muito mais discretos e em baixa opacidade.

## Regras de Design e Acessibilidade

1. **Estética "Space Terminal"**: Mantenha o tema dark mode com fundo `#0B0D14`, grid sutil de `28px` e glows nebulosos via gradients em CSS puro. Não adicione WebGL, Three.js ou Canvas 3D pesados sem aprovação e fallback.
2. **Acessibilidade do Typewriter**: Todo texto de efeito terminal ou digitação animada precisa estar completo e visível no HTML (DOM) para leitores de tela (usando classes de acessibilidade como `sr-only`). O cursor piscante e o atraso de digitação devem ser desativados caso `prefers-reduced-motion` seja verdadeiro.
3. **Tipografia Consistente**: Use **Plus Jakarta Sans** para títulos e textos de leitura gerais, e **JetBrains Mono** para elementos de terminal, metadados e tags técnicas. Mantenha os tokens de fonte centralizados.

## Qualidade Técnica do Código

1. **TypeScript Estrito**:
   - Proibido o uso de tipos `any`.
   - Utilize a tipagem definida em `src/types/index.ts`.
2. **Validação Pré-Commit**:
   Antes de finalizar qualquer tarefa, execute e garanta que os seguintes comandos passem sem erros:
   ```bash
   bun run dev       # Teste local
   bun run format    # Formatação com Prettier
   bun run lint      # Linting do código com ESLint
   bun run typecheck # Verificação estrita de tipos
   bun run build     # Compilação estática de produção
   ```
3. **Estrutura de Importação**: Use sempre aliases com o prefixo `@/*` mapeando para `src/*` (configurado em `vite.config.ts` e `tsconfig.app.json`).
