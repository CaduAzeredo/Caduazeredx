# DESIGN.md — Design System & Diretrizes Visuais

Este documento estabelece o Design System permanente e as regras estéticas para o projeto **caduazeredo.com**.

---

## 1. Conceito Estético: "Space Terminal / Digital Workshop"

O visual evoca o ambiente de trabalho digital de um builder de interfaces e produtos:
- **Atmosfera**: Dark mode técnico, editorial, minimalista e autoral.
- **Evitar**: Visual de site gamer, neon exagerado, dashboards genéricos SaaS ou efeitos pesados de Three.js/WebGL sem fallback.

---

## 2. Tokens de Cores e Hierarquia

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
