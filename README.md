# caduazeredo.com

Site do Cadu Azeredo no estilo DEMPA.98: canais, specs à venda, comunidade e o Círculo. Produto em `PRODUCT.md`, visual em `DESIGN.md`, regras para quem mexe no código em `AGENTS.md`.

## Rodar

```bash
bun install
bun run dev       # http://localhost:5173
bun run build     # gera dist/
bun run check     # confere o dist/ (sem maquete, sem script inline, arquivos públicos)
bun run lint
bun run preview   # serve o dist/
```

## Como é montado

- `index.html`: toda a marcação das páginas (`<div class="pg" id="...">`).
- `src/dempa/motor.js`: rotas com `history.pushState`, quiz, listas de espera, animações.
- `src/dempa/dempa.css`: tokens e componentes.
- `src/dempa/icones.json`: ícones em pixel.
- `public/_headers`: CSP e cabeçalhos de segurança. `public/_redirects`: rotas antigas para as novas.

Sem framework e sem dependência em produção.

## Publicar (Cloudflare Pages)

1. Cloudflare → Workers & Pages → Create → Pages → conectar este repositório.
2. Build command `bun run build`, output `dist`.
3. Variável de ambiente `VITE_LEAD_FORM_ENDPOINT` com o endpoint do Formspree.
4. Domínio personalizado `www.caduazeredo.com` (e o domínio sem `www` redirecionando para ele).

O site antigo (v4) está em `docs/v4/` e na tag `arquivo/v4-shizune`.
