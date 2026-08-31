# Diretrizes para Agentes de IA — caduazeredo.com

Este arquivo estabelece as regras de desenvolvimento, design e qualidade para qualquer agente que realize alterações neste repositório.

## Regras Absolutas de Conteúdo

1. **Nunca Invente Dados**: Não adicione projetos fictícios, clientes simulados, depoimentos falsos, capturas de tela geradas por IA representando produtos inexistentes, ou métricas sem comprovação.
2. **Canais de Contato**: Links sociais, WhatsApp e E-mail devem ser lidos exclusivamente de `src/content/contacts.ts`. Se vazios, oculte o botão correspondente ou exiba a tela de configuração do sistema; nunca crie links fictícios ou placeholders genéricos.
3. **Protagonismo do DiáriaBr**: O único projeto real ativo na V1 é o **DiáriaBr / DiáriaPalmas** (status `building`). Ele deve reter o maior foco visual na Home e na página de projetos. Projetos futuros ou ideias devem usar o formato de laboratório (`isPlaceholder: true`), sendo muito mais discretos e em baixa opacidade.

## Regras de Design e Acessibilidade

1. **Estética "Wired Terminal" (v2.0)**: dark mode com fundo `#0A0E10`, grid sutil de `28px` e glows em CSS puro. Não adicione WebGL, Three.js ou Canvas 3D pesados sem aprovação e fallback. **A regra que governa a cor: o verde é elemento, nunca atmosfera** — ver `DESIGN.md` §1.
1a. **Proibido acento hard-coded**: nenhum hex ou `rgba()` de cor em `.tsx`. Verificação: `grep -rEn "rgba?\(|#[0-9a-fA-F]{6}" src/components src/pages` deve voltar vazio. Foi assim que o rosa fixo sobreviveu em cinco lugares que a troca de token não alcançava.
1b. **Orçamento de peso — por camada, medido no `dist/` com gzip nível 9.** O teto único de 92 KB caiu em 2026-08-31 por decisão explícita do operador, que escolheu qualidade visual sobre peso ao aprovar a v3. O orçamento não sumiu: mudou de forma, porque uma regra trocada por nenhuma regra é como o peso volta a crescer em silêncio.

    | Camada | Teto | Medido |
    | --- | --- | --- |
    | Primeiro desenho (entry + CSS + runtime) | **≤ 115 KB** | 106,0 KB |
    | Caminho móvel / sem WebGL | **≤ 140 KB** | 106,0 KB |
    | Desktop com a camada de movimento | **≤ 175 KB** | 154,8 KB |
    | Home completa, com a cena | **≤ 420 KB** | 281,2 KB |

    **O teto de primeiro desenho mudou de 25 para 115 KB, e isso precisa ser dito em voz alta.** O plano da v3 escreveu 25 KB imaginando uma casca de boot em HTML puro, embutida no `index.html` e removida depois — arquitetura que este site não tem. Numa aplicação React de página única, o primeiro desenho **é** o pacote da aplicação; 25 KB era um número impossível por construção, não uma meta perdida. 115 KB é o número medido com 9 KB de folga. Encolher isso de verdade exige a casca embutida, que é trabalho próprio e ainda não foi feito.

1c. **Biblioteca de animação e WebGL: permitidos, e presos ao lugar.** A regra antiga proibia; a v3 os trouxe por decisão do operador. O que continua valendo é onde eles podem morar: **nunca no caminho crítico**. GSAP, ScrollTrigger e Lenis entram em tempo ocioso, depois da primeira pintura, e não entram em toque nenhum (`src/lib/motion-enhance.ts`). O three.js entra só atrás do portão de `src/lib/use-capability.ts`, num pedaço próprio. Toda cena pesada tem versão estática que funciona sozinha — se a cena não carregar, ninguém vê buraco.
1d. **Nunca `addEventListener("keydown")` em `document` ou `window`**: rouba teclas de quem navega por teclado.
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
