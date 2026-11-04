# Design — DEMPA.98

Estilo: computador de 98, anime de fim dos anos 90, colagem e terminal. Fundo de tubo de CRT, verde fósforo firme, ossos e ruído. A versão anterior está em `docs/v4/DESIGN.md`.

## Cores (tokens em `src/dempa/dempa.css`)

| Token | Hex | Uso |
| --- | --- | --- |
| `--crt` | `#060908` | fundo |
| `--placa` | `#0c2a1c` | placas e cabeçalhos de cartão |
| `--trilha` | `#1f7a4b` | bordas e trilhas |
| `--fosforo` | `#3dff7e` | ação principal, destaque. Elemento, nunca atmosfera |
| `--osso` | `#e9e6d6` | texto e barra superior |
| `--cinza` | `#8f9a93` | texto secundário |
| `--sinal` | `#ff3a6e` | área fechada (Círculo), erro, sombra do fóssil |
| `--ciano` | `#3fd8ff` | tag "internet" e estados no ar |
| `--ambar` | `#ffb21e` | "pausado" e avisos |

Nenhum hex de cor fora dos tokens no CSS de componente.

## Fontes

- **Silkscreen**: títulos e botões (caixa alta, espaçada).
- **VT323**: terminal, metadados, preços e comandos.
- **Archivo**: texto corrido.

## Peças

- **Janela (`.win`)**: barra de título em osso com três quadrados, corpo escuro, sombra deslocada verde.
- **Botões**: `.btn.pri` verde cheio; `.btn` contorno osso; sombra dura deslocada, sem desfoque.
- **Tags (`.tag`)**: caixa pequena com borda na cor do estado.
- **Borrão (`.cens`)**: blocos de pixel que tremem; esconde o que ainda não foi revelado (canais 03/04, lotes 02 a 04, números do Círculo).
- **Fóssil**: crânio de T-rex em pixel 32x14, símbolo do Círculo. Osso com olho verde e sombra rosa.
- **Robô do quiz**: canto inferior direito, abre o `cadu.exe · quiz`.
- **Fundo**: grade de "01" em verde quase invisível.

## Movimento

Digitação, cursor piscando e loops de 9:16 nas specs. Tudo para com `prefers-reduced-motion`. Sem WebGL.
