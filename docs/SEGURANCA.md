# Segurança — caduazeredo.com

Site aberto, ligado a um canal e a dinheiro: vai ter gente tentando derrubar, encher a lista de lixo ou roubar conta. A defesa tem duas metades, o que o código já garante e o que só se liga no painel de cada serviço.

## O que o código já garante (v1)

| Ameaça | Defesa | Onde |
| --- | --- | --- |
| Script injetado (XSS) | CSP `script-src 'self'`, sem script inline nem `on*=`; texto digitado vai por `textContent` | `public/_headers`, `motor.js` |
| Site embutido em outro para enganar clique | `frame-ancestors 'none'` + `X-Frame-Options: DENY` | `_headers` |
| Rebaixar para HTTP | HSTS de 1 ano + `upgrade-insecure-requests` | `_headers` |
| Vazamento de origem e de recursos | `Referrer-Policy`, `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`, `Permissions-Policy` sem câmera, microfone, localização e pagamento | `_headers` |
| Robô enchendo a lista | campo-armadilha `_gotcha`; e-mail com até 254 caracteres; botão trava no envio | `index.html`, `motor.js` |
| Parâmetro `?v=` malicioso | só aceita letras, números, `-` e `_`, até 40 | `motor.js` |
| Servidor para atacar | não existe: o site é estático, sem banco, sem login e sem chave no navegador | arquitetura |
| Dependência comprometida | zero dependência em produção | `package.json` |
| Alguém afrouxar a CSP sem querer | `bun run check` reprova | `scripts/check-site.mjs` |
| Pesquisador achar falha e não ter a quem avisar | `/.well-known/security.txt` | `public/` |

## O que o Cadu liga no painel

Em ordem de importância. Nada disso está no código, e a maioria leva menos de cinco minutos.

### 1. Contas (o ataque mais provável é roubar uma conta, não derrubar o site)

- [ ] **Google** (`caduazeredo@gmail.com`, que é público no site): verificação em duas etapas com chave de acesso (passkey) ou app, nunca SMS.
- [ ] **GitHub**: verificação em duas etapas.
- [ ] **Cloudflare**: verificação em duas etapas.
- [ ] **Kiwify**: verificação em duas etapas.
- [ ] **Formspree**: verificação em duas etapas, se o plano oferecer.
- [ ] **Registrador do domínio**: verificação em duas etapas, trava de transferência ligada e renovação automática.

A política de privacidade afirma que "as contas que guardam os dados usam verificação em duas etapas". Isso precisa ser verdade antes de o site ir ao ar.

### 2. Cloudflare (antes de apontar o domínio)

- [ ] DNS do domínio no Cloudflare, com o proxy ligado (nuvem laranja). É isso que põe a proteção contra derrubada (DDoS) na frente do site, em todos os planos.
- [ ] SSL/TLS em **Full (strict)**, **Always Use HTTPS** ligado, TLS mínimo **1.2**.
- [ ] Security → **Bot Fight Mode** ligado.
- [ ] Security → WAF → regras gerenciadas grátis ligadas.
- [ ] Uma regra de limite de requisições (o plano grátis tem uma): por exemplo, mais de 100 requisições em 10 segundos do mesmo IP vira desafio.
- [ ] Opcional: proteger as prévias (`*.pages.dev` dos branches) com Cloudflare Access, para que só você veja versão que não foi aprovada.

### 3. GitHub

- [ ] Branch `main` protegido: só entra por pull request, sem push direto e sem apagar.
- [ ] Settings → Code security: alertas do Dependabot e varredura de segredos ligados.

### 4. Formspree

- [ ] Restringir o formulário ao domínio `caduazeredo.com`, se o plano permitir.
- [ ] Conferir o limite de envios por mês do plano. Uma enxurrada de robô come esse limite, e a armadilha só segura os robôs simples.
- [ ] Ligar a notificação por e-mail de envio, para perceber enxurrada cedo.

### 4a. Chave da API do YouTube (números do canal)

- [ ] Criar a chave no Google Cloud, restrita à **YouTube Data API v3**.
- [ ] Guardar no Cloudflare Pages como variável secreta `YT_API_KEY`. Ela é lida só pela função `functions/api/canal.js`, nunca vai para o navegador nem para o repositório.
- [ ] Sem a chave, a função responde 503 e o site simplesmente não mostra o placar.

### 5. Kiwify (quando a loja abrir, v1.1)

- [ ] O aviso de compra que a Kiwify manda para o site vai ter um segredo próprio, guardado só no painel do Cloudflare, nunca no repositório.

## Próximas versões

- **v1.1 (Kiwify, Brevo, `/obrigado`)**: a página de obrigado não libera nada sozinha; quem libera o acesso é a Kiwify. Segredos de webhook ficam nas variáveis do Cloudflare.
- **v1.2 (API do YouTube, login do Círculo)**: o token do Google fica só no servidor (função do Cloudflare), nunca no navegador; login com link mágico por e-mail e sessão em cookie `HttpOnly`, `Secure`, `SameSite=Lax`. Rodar esta revisão de novo antes de abrir.
- **Depois de tudo em HTTPS por alguns meses**: considerar o `preload` do HSTS. É difícil de desfazer, por isso não está ligado agora.

## Pendência conhecida

`bun audit` aponta um aviso moderado no `minimatch`, que vem pelo ESLint. É ferramenta de desenvolvimento, não vai para o site publicado. Atualizar quando o ESLint subir a versão.
