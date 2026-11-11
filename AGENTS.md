# Regras para agentes — caduazeredo.com (DEMPA)

Este arquivo vale para qualquer agente que mexa neste repositório. A versão anterior do site (v4, React + Shizune) está arquivada em `docs/v4/` e no commit `6865c45` (último da v4); as regras dela não valem mais.

## Combinado com o Cadu

1. **Nada muda sem o ok do Cadu.** Trabalho novo vai num branch e num pull request; a `main` só recebe o que ele aprovou.
2. **Comandos de git para a máquina dele vão um por um**, começando com `cd` na pasta.
3. **Nunca leia arquivos `.env`.** Variáveis de ambiente ficam no painel do Cloudflare Pages.
4. Respostas e textos do site em português do Brasil.

## Conteúdo

1. **Nunca invente dados.** Nada de número de inscritos, depoimento, cliente, "mais vendido", contagem de temas ou print de produto que não existe. Se o dado ainda não existe, o lugar fica com um texto honesto ("em breve", "Avise-me") ou some.
2. **Afirmação sobre o mundo de fora precisa de fonte conferida.** Taxa de plataforma, limite de API, regra de plano: confira antes de escrever, ou escreva no futuro ("vou mostrar no vídeo").
3. **O que ainda não funciona é dito no futuro.** Painel com números, login do Círculo, posts: "vai ser", não "é".
4. **Contatos reais:** e-mail `caduazeredo@gmail.com`, YouTube `@CaduAzeredo`, GitHub `CaduAzeredo`. Nenhum link de Instagram até a conta existir. WhatsApp pessoal só para o lote 01 do Círculo, nunca no site aberto.
5. **Preços** vêm da tabela em `PRODUCT.md`. Lotes 02 a 04 do Círculo aparecem borrados (`.cens`).

## Código

1. **Sem React.** O site é `index.html` (toda a marcação) + `src/dempa/motor.js` (rotas, quiz, listas, animações) + `src/dempa/dempa.css`. Ícones em `src/dempa/icones.json`.
2. **Rotas reais:** a tabela `ROTAS` em `motor.js` liga caminho a página (`<div class="pg" id="...">`). Rota nova precisa de entrada em `ROTAS`, `TITULOS` e `CAMINHO`, de linha no `public/sitemap.xml` e, se substituir rota antiga, de linha no `public/_redirects`.
3. **CSP rígida** (`public/_headers`): `script-src 'self'`. Proibido script inline (exceto `application/ld+json`) e `onclick`/`onsubmit` no HTML; os cliques passam por delegação em `motor.js`. Domínio externo novo (fonte, API) precisa entrar na CSP.
4. **Nunca `addEventListener("keydown")` em `document` ou `window`.** Teclas ficam presas ao elemento que precisa delas.
5. **Leads:** formulários `form.lista` com `data-interesse` enviam JSON para o Formspree: `VITE_LEAD_FORM_ENDPOINT` se existir no Cloudflare, senão o endereço padrão escrito em `motor.js` (`https://formspree.io/f/xyewgwnv`, público). A caixa de consentimento nunca vem marcada. Sem endpoint, o site mostra o aviso "Escreva para caduazeredo@gmail.com", nunca um sucesso falso.
6. **Origem por vídeo:** o link da descrição de cada vídeo leva `?v=ep01` (letras, números, `-` e `_`, até 40). O motor guarda o valor na visita e manda como `video` em todo lead. Não troque o nome do parâmetro sem avisar o financeiro, que lê esse campo.
7. **Anti-robô:** todo formulário de lead tem o campo invisível `_gotcha`. Preenchido, o envio é descartado e o robô vê "anotado". O `check` reprova formulário sem ele.
8. **Texto digitado pela pessoa nunca entra por `innerHTML`.** Use `textContent`.
9. **`.pend` é marca de maquete** e não pode chegar ao `dist/`.
10. Respeite `prefers-reduced-motion`: animação de digitação e loops param, e o texto fica inteiro no HTML.

## Segurança

O que o código garante e o que depende de painel (Cloudflare, GitHub, Formspree, Kiwify, domínio) está em `docs/SEGURANCA.md`. Mudança em `_headers` passa pelo `check`, que reprova se a CSP afrouxar ou se o HSTS sumir.

## Visual

Paleta, fontes e componentes em `DESIGN.md`. O verde fósforo é elemento, nunca atmosfera; nada de gradiente de "IA genérica".

## Antes de abrir o pull request

```bash
bun run build   # tsc + vite
bun run check   # scripts/check-site.mjs: sem .pend, sem MAQUETE, sem href="#", sem on*=, sem script inline, arquivos públicos presentes
bun run lint
```

Depois, abra o site com `bun run preview` e passe pelas seis rotas e por uma rota inexistente (tem que dar a página 404), no desktop e no celular.
