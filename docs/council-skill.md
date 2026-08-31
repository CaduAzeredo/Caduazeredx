# Council Skill — Painel Deliberativo & Governança V1 → V2

Este documento estabelece o protocolo de deliberação para grandes alterações de arquitetura, adição de dependências ou evolução do roadmap do **caduazeredo.com**.

---

## 1. Regras do Conselho de IA

Antes de realizar qualquer refatoração estrutural (ex: transição V1 $\to$ V2):

1. **Validação de Necessidade Real**: Nenhuma funcionalidade da V2 (como Supabase Auth, Banco de Dados, Área de Membros) deve ser implementada antes que a audiência e o canal de captura estejam ativos na V1.5.
2. **Impacto de Dependência**: Qualquer biblioteca nova precisa ter justificativa técnica explicada (tamanho de bundle, impacto de CPU, estratégia de fallback).
3. **Preservação de Regras**: Respeito incondicional às regras do `AGENTS.md` (nunca inventar dados, manter DiáriaBr em destaque, dark mode Space Terminal).

---

## 2. Pauta de Transição para a V2

- [ ] **Integração com Supabase**: Ativar cliente Supabase apenas para a lista de espera de comunidade na V2.
- [ ] **Área de Vídeos / YouTube**: Adicionar leitores de feed apenas via páginas estáticas ou APIs leves sem poluir o bundle principal.
- [ ] **Preservação de Testes**: Garantir que `bun run typecheck && bun run lint && bun run build` continuem passando sem qualquer erro a cada alteração deliberada.
