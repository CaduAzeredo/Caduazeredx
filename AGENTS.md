# Diretrizes para Agentes de IA — caduazeredo.com

Este arquivo estabelece as regras de desenvolvimento, design e qualidade para qualquer agente que realize alterações neste repositório.

## Regras Absolutas de Conteúdo

1. **Nunca Invente Dados**: Não adicione projetos fictícios, clientes simulados, depoimentos falsos, capturas de tela geradas por IA representando produtos inexistentes, ou métricas sem comprovação.
2. **Canais de Contato**: Links sociais, WhatsApp e E-mail devem ser lidos exclusivamente de `src/content/contacts.ts`. Se vazios, oculte o botão correspondente ou exiba a tela de configuração do sistema; nunca crie links fictícios ou placeholders genéricos.
3. **Projetos: cada um diz em que pé está, sem cartão de "em breve".** Os projetos da home e da `/projetos` são o **DiáriaBr / DiáriaPalmas** (status `building`) e o **Shizune** (o selo "agora" sai da ficha da release). A variante "ocioso" do cartão (`isPlaceholder`) saiu na troca de 15/10; ideia sem projeto não vira cartão.
4. **Os números do Shizune vêm da ficha da release, nunca de digitação.** `src/content/ficha-release.json` é cópia byte a byte do `shizune-release.json` anexado à release mais recente do pacote — a mesma ficha que o shizune.dev lê (DEC-026 no Brain: a release é a fonte, os sites são cópias). `src/content/ficha.ts` a lê, e cada número sai com o comando que o reproduz. Quem troca a ficha é a cadeia, num PR em `preview/*`, ou `node scripts/ficha.mjs <arquivo>`, à mão. A única exceção são as contribuições (`shizune.ts`), que rodam contra o GitHub (`gh api`) e trazem o próprio comando e a própria data.
4a. **Sem versão no texto visível.** A versão do Shizune vive só no `softwareVersion` do JSON-LD da `/shizune` (único import de `version` no site). Depois do build, `grep -rEo "v?0\.[0-9]+\.[0-9]+" dist --include=*.html --include=*.js` só pode achar esse valor.
4b. **Regra de publicação.** Linha que afirma algo sobre o mundo de fora sem fonte conferida (um vizinho, a citação da Block, o relatório "contra nós mesmos", um verbete ainda não assinado) aparece marcada como rascunho no preview e **não aparece em produção** (`src/lib/publicacao.ts`, decidido por `VERCEL_ENV`/`PUBLICACAO` no build). O teste é `scripts/test-publicacao.mjs` e roda no `check`.
4c. **Nenhum personagem no site.** O console da home se chama pelo que é ("console do ecossistema", `src/components/console/`); nos bastidores das `/novidades`, o assistente é "o assistente local". A marca do operador vai em texto ("Cadu Azeredo") até a assinatura nova existir — nem o lockup antigo, nem caixa tracejada no lugar.
5. **Propagação — um fato que muda arrasta todas as superfícies que o afirmam, na mesma passada.** Os mesmos fatos vivem em quatro lugares deste repositório e em dois do site do produto: a ficha (`src/content/ficha-release.json`, lida por `ficha.ts` — páginas do Shizune, cartão da home e console), `src/content/shizune.ts` (texto das três páginas do Shizune e as contribuições), `src/content/respostas-console.ts` (o console da home — o mais fácil de esquecer, porque não é rota), `src/content/novidades.ts` (um verbete por fato novo, **na mesma passada**, nunca depois), e `ficha-release.json`/`method.ts` em `D:\Dev\shizune-site`. Foi por atualizar um lugar por vez que a `/novidades` ficou uma semana atrás e que um badge de versão cravado no JSX sobreviveu a uma passada inteira de correção. A regra completa, por tipo de mudança (tag publicada, número medido, fato novo, trava), está no Brain em `projects/cadu-azeredo/regra-de-propagacao-entre-superficies.md`; a ordem é sempre Brain → medir → site do produto → este site → `/novidades` → console → contratos → verificar pelo corpo. **Quando uma superfície não puder acompanhar, o atraso é declarado** — no registro datado do Brain, num comentário `ATRASADO desde <data>` no topo do arquivo, e na fila se passar de uma passada. Nunca em silêncio.

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
3. **Tipografia do kit de marca (15/10)**: **Newsreader Italic 400** nos títulos grandes (classe `titulo-serif`), **DM Sans** no corpo e **JetBrains Mono** em números, comandos, metadados e tags técnicas. A Plus Jakarta Sans saiu. Mantenha os tokens de fonte centralizados.
4. **Uma tinta por peça.** Verde no modo Dev, azul no modo Empresa, âmbar só em `/shizune`, `/shizune/roadmap` e `/shizune/evidencia`. Componente e página escrevem `tinta` (`text-tinta`, `bg-tinta`, `border-tinta-deep`), nunca `accent-amber`; o escopo `[data-rota="shizune"]` em `tokens.css` é o único lugar onde a tinta vira âmbar. Cor de estado (reproduzido, falhou, rascunho, o `$` do terminal) não é tinta. `scripts/test-tinta.mjs` confere, nas fontes e no `dist/`.
5. **A marca do kit.** A logo em linha fica no cabeçalho de todas as páginas; a assinatura fecha o rodapé, acima da linha legal, e nunca abre uma peça. As duas vêm dos arquivos intactos em `public/brand/` (iguais ao kit, com o manifesto de procedência), e `src/lib/marca.ts` troca só as duas tintas. Não cole o SVG num componente. `scripts/test-marca.mjs` reprova se um caminho mudar. A linha legal é "Cadu Azeredo · ano"; Termos e Privacidade usam o nome legal por extenso. Nenhum link de Instagram até a conta existir.

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
