# DESIGN.md — Design System & Diretrizes Visuais

Este documento estabelece o Design System permanente e as regras estéticas para o projeto **caduazeredo.com**.

---

## 1. Conceito Estético: "Wired Terminal" (v2.0, 2026-08-31)

O visual evoca o ambiente de trabalho digital de um builder de interfaces e produtos:
- **Atmosfera**: Dark mode técnico, editorial, minimalista e autoral.
- **Evitar**: Visual de site gamer, neon exagerado, dashboards genéricos SaaS ou efeitos pesados de Three.js/WebGL sem fallback.

> **A regra que governa tudo abaixo: o verde é ELEMENTO, nunca ATMOSFERA.**
>
> O fundo é quase-preto. O verde aparece só onde tem função — a barra da logo,
> o prompt, o estado ativo, o botão principal, a chuva no topo do hero, a borda
> do Brain. Nunca como banho de cor, nunca na grade, nunca no fundo da página.
>
> Isto **não revoga** a linha "evitar neon exagerado" acima: é a especificação
> dela. Não existe área grande de cor saturada em lugar nenhum, e é justamente
> essa contenção que impede o resultado de virar visual gamer. Uma tentativa
> anterior fez o contrário — fundo tingido de verde-azulado — e foi reprovada
> pelo operador com as palavras "tem verde demais".

### 1.1 Modo de leitura (Empresa / Dev)

Dois modos trocam **apenas os tokens de acento**, via `data-mode` no `<html>`:
Dev em verde-terminal (o padrão do `:root`) e Empresa em azul-aço. A troca muda
**ordem e ênfase de conteúdo, nunca visibilidade** — `order`, jamais
`display:none`, porque esconder metade da página por modo é regressão de busca
e de leitor de tela.

O atributo é escrito por `public/mode-init.js`, **arquivo externo e bloqueante**,
não script inline: a política de segurança declara `script-src 'self'` sem
`unsafe-inline`. Afrouxar a política para acomodar aparência não é uma opção.

---

## 2. Tokens de Cores e Hierarquia

**A fonte da verdade é `src/styles/tokens.css`**, com o contraste medido
anotado linha a linha. Esta tabela é resumo, não original — em caso de
divergência, o arquivo vence.

| Categoria | Token | Valor | Aplicação |
| :--- | :--- | :--- | :--- |
| **Fundo** | `--background` | `#0A0E10` | Base. Quase-preto, cobre ~92% da tela |
| **Superfície** | `--surface` | `#101618` | Cards, janelas de terminal |
| **Superfície Elevada** | `--surface-elevated` | `#161D20` | Cabeçalho do terminal, badges |
| **Borda** | `--border` | `#1E2A2B` | Divisores. **Neutra, nunca de acento** |
| **Texto Principal** | `--foreground` | `#EDF2EF` | 16,3:1 — AAA |
| **Texto Secundário** | `--muted-foreground` | `#8A9A92` | 7,0:1 — AA |
| **Acento** | `--primary` | `#3FA372` | 6,2:1 — texto, link, prompt, botão |
| **Acento Muted** | `--primary-muted` | `#2E8C67` | 4,6:1 — hover e acento secundário |
| **Acento Profundo** | `--primary-deep` | `#2A835F` | 4,1:1 — **reprova para texto pequeno** |
| **Borda de Destaque** | `--border-accent` | `#12544F` | Só no estado ativo |
| **Glow** | `--glow-rgb` | `63 163 114` | Componente RGB para compor alpha |

### 2.1 A regra de contraste que não se negocia

`--primary-deep` **reprova AA para texto pequeno** (4,1:1). Ele existe para
preenchimento, borda e texto grande — nunca para corpo de texto. A separação
entre ele e `--primary` existe só por isso, e foi decidida pelo **uso**, não
pelo nome: `--primary-muted` aparece como cor de texto em vinte lugares.

### 2.2 Cor semântica

Literais do Tailwind (`emerald-400`, `amber-400`, `red-400`) estão **proibidos**:
não acompanham troca de tema nem de modo. Use a família `--status-*`.

"Segurança" **saiu do verde** e virou azul-gelo (`#74C0E8`): com o verde virando
cor de marca, dois verdes no mesmo card brigam. De-colidir é melhor que escolher
um verde parecido-mas-diferente.

### 2.3 Nenhuma cor escrita em `.tsx`

Nenhum hex, nenhum `rgba()`, nenhum valor arbitrário de cor em componente. Os
glows são as classes `.glow-text` / `.glow-border` / `.glow-strong`, que leem
`--glow-rgb` e portanto acompanham tema e modo de graça.

**Comando de verificação:**
```bash
grep -rEn "rgba?\(|#[0-9a-fA-F]{6}" src/components src/pages
```
Deve voltar vazio. Foi assim que o rosa fixo sobreviveu por meses em cinco
lugares que a troca de token não alcançava.

## 2.9 Tabela histórica (v1, superada)



| Categoria | Token | Valor Hex | Aplicação |
| :--- | :--- | :--- | :--- |
| **Fundo** | `--background` | `#0B0D14` | Cor base da aplicação (azul-grafite profundo) |
| **Superfície** | `--surface` | `#121522` | Cards de projetos, janelas de terminal |
| **Superfície Elevada** | `--surface-elevated` | `#181B29` | Cabeçalho do terminal, badges |
| **Texto Principal** | `--foreground` | `#F4F3F7` | Títulos e leitura geral (alto contraste) |
| **Texto Secundário** | `--muted-foreground` | `#A8A6B2` | Subtítulos, explicações, metadados |
| **Acento Primário** | `--primary` | `#F67280` | Cor de destaque (Rosa), cursores, glows |
| **Acento Muted** | `--primary-muted` | `#C06C84` | Rosa queimado para sublinhados e tags |
| **Acento Secundário**| `--secondary` | `#6C5B7B` | Detalhes de trajetória (Violeta) |
| **Acento Azul** | `--accent-blue` | `#355C7D` | Nebulosas e profundidade ambiente |
| **Borda** | `--border` | `#282B3B` | Divisores e contornos de baixa opacidade |

---

## 3. Tipografia

1. **Plus Jakarta Sans** (Sans-serif)
   - *Uso*: Títulos, manifesto, corpo de texto, botões.
   - *Estilo*: Editorial, geométrico, alta legibilidade.

2. **JetBrains Mono** (Monospace)
   - *Uso*: Comandos de terminal, tags de stack, metadados, status.
   - *Estilo*: Técnico e preciso.

---

## 4. Acessibilidade e Motion

- **Acessibilidade do Typewriter**: Todo texto animado de terminal deve ter réplica oculta no DOM (`sr-only`) para leitores de tela.
- **Reduced Motion**: Caso `prefers-reduced-motion` seja verdadeiro, a digitação e cintilações são desativadas e o texto é exibido de forma instantânea.
- **Fundo Espacial**: Construído em CSS puro via gradientes radiais e grid de `28px`. Sem uso de Canvas 3D ou WebGL.
- **Bloco global de `prefers-reduced-motion`**: existe em `globals.css` e neutraliza toda animação e transição da página. Toda animação nova nasce coberta por ele. Consequência a lembrar: ele congela spinners — indicador de progresso deve ser **texto**, não giro.
- **Fonte única da preferência**: `src/lib/use-reduced-motion.ts`. Nada de `matchMedia` espalhado: a versão anterior lia uma vez na montagem e nunca reagia a mudança.
- **Chuva de código**: só `transform`, sem canvas, e **só no hero**. Sem cabeça brilhante — é ela que dá pressa ao Matrix; sem ela a mesma forma lê como silêncio.

## 4.1 Proibições

Escritas para não serem redescobertas caso a caso:

- **A Rei não é mascote.** Ela é presença, não assistente. Nunca persegue o scroll, nunca abre sozinha, nunca pergunta "posso ajudar?", nunca aparece em bolha com rabinho. Quem só quer contratar passa por ela sem ser interrompido.
- **Nada de `display:none` por modo.** Só `order`.
- **Nada de chuva em `<canvas>`**, grão animado, parallax ou scroll-jacking.
- **Nada de aberração cromática global**: destrói o antialiasing do texto. Aceita só escopada a hover, por milissegundos.
- **A biblioteca de animação não volta ao caminho crítico.** Se um dia fizer falta física de mola, entra por carregamento tardio, em rota que não seja a home.
