/* A casca de boot — o comportamento.
 *
 * Arquivo externo e `defer`, nao inline: a politica de seguranca declara
 * script-src 'self' sem unsafe-inline, e afrouxa-la para acomodar aparencia
 * seria trocar seguranca por conveniencia. `defer` roda logo depois da
 * analise do HTML, entao o botao de pular fica clicavel em milissegundos.
 *
 * A casca em si e HTML e CSS dentro do index.html. Isso e o ponto: ela pinta
 * no PRIMEIRO quadro, antes dos ~106 KB da aplicacao. Uma tela de
 * carregamento so melhora o desempenho percebido quando ela E a primeira
 * pintura; carregada junto com a aplicacao, ela e apenas atraso encenado.
 *
 * Este arquivo expoe `window.__boot` para a aplicacao marcar as etapas. Sao
 * etapas REAIS — cada uma corresponde a uma promessa que resolveu de fato —
 * e a barra reflete etapas concluidas, nunca tempo decorrido. */
(function () {
  var casca = document.getElementById("boot");
  if (!casca) return;

  var ETAPAS = ["css", "fontes", "app", "cena"];
  var feitas = Object.create(null);
  var encerrado = false;

  var barra = document.getElementById("boot-fill");
  var pct = document.getElementById("boot-pct");

  function pintar() {
    var n = 0;
    for (var i = 0; i < ETAPAS.length; i++) if (feitas[ETAPAS[i]]) n++;
    var p = Math.round((n / ETAPAS.length) * 100);
    if (barra) barra.style.width = p + "%";
    if (pct) pct.textContent = p + "%";
  }

  function marcar(id) {
    if (encerrado || feitas[id]) return;
    feitas[id] = true;
    var li = casca.querySelector('[data-step="' + id + '"]');
    if (li) li.setAttribute("data-feito", "1");
    pintar();
  }

  function encerrar() {
    if (encerrado) return;
    encerrado = true;
    try {
      localStorage.setItem("cadu.boot", "1");
    } catch (e) {
      /* sem persistencia: quem voltar ve de novo, e tudo bem */
    }
    casca.setAttribute("data-saindo", "1");
    // O tempo aqui casa com a transicao declarada no CSS da casca. Remover em
    // vez de esconder: a casca cobre a pagina inteira e, esquecida no DOM,
    // roubaria o clique de tudo.
    setTimeout(function () {
      if (casca.parentNode) casca.parentNode.removeChild(casca);
    }, 420);
  }

  var pular = document.getElementById("boot-skip");
  if (pular) pular.addEventListener("click", encerrar);

  // A folha de estilo ja chegou: se este script esta rodando e a casca esta
  // desenhada, o CSS critico esta aplicado.
  marcar("css");

  // Tipografia: promessa real do navegador.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      marcar("fontes");
    });
  } else {
    marcar("fontes");
  }

  // Rede de seguranca. Se a aplicacao quebrar ao carregar, a casca NAO pode
  // ficar cobrindo a pagina para sempre — melhor um site sem cena do que uma
  // tela de carregamento eterna.
  var socorro = setTimeout(encerrar, 8000);

  window.__boot = {
    marcar: marcar,
    encerrar: function () {
      clearTimeout(socorro);
      encerrar();
    },
    ativa: function () {
      return !encerrado;
    },
  };
})();
