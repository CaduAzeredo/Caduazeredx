# Design System — caduazeredo.com

Este documento descreve as decisões de design, paleta de cores e tipografia aplicadas na interface do projeto.

## Paleta de Cores (Dark Mode Padrão)

A paleta de acentos baseia-se nos tokens definidos no briefing criativo:

| Token | HSL / Hex | Função Visual |
|---|---|---|
| `--background` | `#0B0D14` | Cor de fundo profunda, base grafite/azulada |
| `--surface` | `#121522` | Fundo de painéis e janelas de terminal |
| `--surface-elevated` | `#181B29` | Fundo de cabeçalhos de terminal e inputs |
| `--foreground` | `#F4F3F7` | Texto principal de leitura (alto contraste) |
| `--muted-foreground` | `#A8A6B2` | Descrições secundárias e subtítulos |
| `--primary` | `#F67280` | Cor de destaque primária (Rosa) e glows de acento |
| `--primary-muted` | `#C06C84` | Acento secundário (Rosa Queimado) para tags e sublinhados |
| `--secondary` | `#6C5B7B` | Detalhes de trajetória e acentos violetas |
| `--accent-blue` | `#355C7D` | Nebulosas de fundo e detalhes azuis profundos |
| `--border` | `#282B3B` | Linhas delimitadoras de baixíssima opacidade |

## Tipografia

A identidade tipográfica usa duas fontes principais carregadas do Google Fonts:

1. **Plus Jakarta Sans** (Sans-serif)
   - *Papel*: Títulos principais, blocos de manifesto, corpo de textos editoriais e botões.
   - *Motivo*: Geometria contemporânea com excelente espaçamento, transmitindo um visual limpo e editorial que foge de fontes padrão do sistema.

2. **JetBrains Mono** (Monospace)
   - *Papel*: Elementos de terminal, tags técnicas, metadados, comandos e status logs.
   - *Motivo*: Fonte técnica desenhada para legibilidade extrema de códigos e comandos, reforçando a identidade "Digital Workshop".

## Estrutura Visual & Efeitos

- **Efeito de Fundo (Grid)**: Feito com `linear-gradient` CSS de `1px` de largura repetido a cada `28px` com opacidade reduzida, criando uma malha digital estável e leve.
- **Nebulosas (Ambient Glow)**: Dois gradientes radiais posicionados de forma absoluta com desfoque de `120px` a `140px` criam áreas de brilho colorido suave no fundo, sem usar imagens de textura pesadas.
- **Micro-interações (Hover)**: Botões primários e cards ativos usam transições de `scale` curtas e sombras com difusão rosa suave (`text-shadow` e `box-shadow` moderados), respondendo de forma reativa a cliques e focos.
