# Mobile Readiness Skill — Auditoria Mobile & PWA

Este documento define os critérios obrigatórios de responsividade, usabilidade móvel e suporte a PWA para o **caduazeredo.com**.

---

## 1. Quality Gates de Usabilidade Mobile

- **Áreas de Toque (Touch Targets)**: Todos os botões, links de navegação e controles móveis possuem altura/largura mínima de `44px` ou espaçamento equivalente para evitar cliques acidentais.
- **Scroll Horizontal**: Proibido qualquer transbordo (`overflow-x`) em telas a partir de `320px`.
- **Desempenho no Mobile**:
  - O componente `SpaceBackground` desativa animações pesadas e reduz o tamanho dos gradientes radiais em telas pequenas para economizar CPU e bateria.
  - Interações baseadas em posição do cursor (`hover`) são desativadas ou adaptadas para eventos de toque no mobile.

---

## 2. Checklist de Auditoria (`/mobile [tela]`)

| Critério | Status | Detalhes no Projeto |
| :--- | :---: | :--- |
| **Viewport Meta Tag** | `[x] Passou` | Configurada em `index.html` com `width=device-width, initial-scale=1.0`. |
| **Drawer de Navegação** | `[x] Passou` | `Navbar.tsx` com gaveta móvel expansível e acessível por teclado. |
| **Cards Adaptáveis** | `[x] Passou` | `ProjectCard.tsx` usa grid de 1 coluna em `sm` e 3 colunas em `md`. |
| **Tipografia Fluida** | `[x] Passou` | Uso de classes responsivas `text-3xl sm:text-4xl md:text-5xl`. |
| **CTAs Acessíveis** | `[x] Passou` | Botões principais com padding generoso e rótulos claros. |
