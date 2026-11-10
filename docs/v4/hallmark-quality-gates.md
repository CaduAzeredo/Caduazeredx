# Hallmark — Quality Gates Visuais & Validação React

Este documento estabelece as 65 diretrizes visuais e computacionais para verificação de qualidade de páginas React no **caduazeredo.com**.

---

## 1. Núcleo dos Quality Gates (Visual & React)

### A. Estética & Layout (Gates 1-20)
- **Contraste de Texto**: Todos os elementos de texto cumprem a razão mínima de contraste de 4.5:1 (WCAG AA).
- **Zero Layout Shifts (CLS)**: Imagens e slots (como o avatar) possuem dimensões ou containers estruturados para evitar saltos visuais durante o carregamento.
- **Espaçamento Sistemático**: Uso exclusivo dos tokens de grid (`gap-4`, `gap-6`, `gap-8`, `py-10`, `py-12`) mantendo ritmos verticais limpos.

### B. Componentes & Código (Gates 21-45)
- **Modo Estrito de Tipos**: Proibição total de `any` em arquivos TypeScript.
- **Navegação SPA**: Uso de `React.lazy()` e `<Suspense>` com indicador de terminal para carregamento sob demanda.
- **Fallbacks Nulos**: O componente `ContactPage` e `ProjectsPage` tratam cenários sem dados com mensagens explicativas no terminal, sem quebrar o layout.

### C. Acessibilidade & Animações (Gates 46-65)
- **Typewriter Acessível**: Todo texto animado de console traz versão completa oculta em `<span className="sr-only">`.
- **Media Query reduced-motion**: Desativação total de digitações e pulsos para usuários que solicitam redução de movimento.
- **Teclado**: Foco visível com `focus:ring-1 focus:ring-primary` em todos os elementos interativos.
