# Taste Skill — Geração de UI Orientada à Marca

Este documento define os 3 eixos de calibração (*dials*) para a geração de novos componentes de interface no **caduazeredo.com** durante as fases V1 e V2.

---

## 1. Dials do Taste System

```text
/taste variance 2 motion 2 density 4
```

### Dial 1: Variance (Variação Estética) — Nível 2 / 5 (Baixa a Moderada)
- **Regra**: Fidelidade estrita ao tema **Space Terminal / Digital Workshop**.
- **Fundo**: Base em `#0B0D14`, superfícies em `#121522` e bordas finas `#282B3B`.
- **Acentos**: Uso controlado do Rosa (`#F67280`), Rosa Queimado (`#C06C84`) e Azul (`#355C7D`).
- **Proibido**: Cores neon saturadas, gradientes arco-íris, estilos skeuomórficos ou temas genéricos de SaaS.

### Dial 2: Motion (Dinamismo & Animação) — Nível 2 / 5 (Sutil & Funcional)
- **Regra**: Micro-interações leves com `motion/react` (hover em botões, escala suave, boot do terminal).
- **Acessibilidade**: Se `prefers-reduced-motion: reduce` for detectado, todas as animações devem ser desativadas e o conteúdo exibido instantaneamente.
- **Proibido**: Scroll-jacking, animações bloqueantes, efeitos 3D pesados sem fallback.

### Dial 3: Density (Densidade de Informação) — Nível 4 / 5 (Média-Alta / Editorial Técnico)
- **Regra**: Layouts limpos, organizados com metadados visíveis, badges de status, tags de stack técnica e janelas estilo terminal Linux.
- **Tipografia**: Títulos e corpo em **Plus Jakarta Sans**; elementos de código, rótulos e tags em **JetBrains Mono**.

---

## 2. Checklist para Novos Componentes (Taste Gate)

Ao criar ou atualizar qualquer componente da interface:
- [ ] O componente respeita o dark mode `#0B0D14` e paleta HSL oficial?
- [ ] O componente usa a fonte **Plus Jakarta Sans** para leitura e **JetBrains Mono** para elementos técnicos?
- [ ] Animações usam `motion/react` com fallback para `prefers-reduced-motion`?
- [ ] O componente tem tipagem TypeScript estrita (sem `any`)?
- [ ] Não foram criados dados fictícios ou placeholders genéricos?
