/* Lê o modo antes do primeiro desenho.
 *
 * Arquivo externo, e não script inline no <head>, por um motivo específico: a
 * política de segurança do site declara script-src 'self' sem unsafe-inline.
 * Um inline aqui seria bloqueado — e afrouxar a política para acomodar uma
 * funcionalidade de aparência é trocar segurança por conveniência.
 *
 * Precisa ser bloqueante: se rodar depois da pintura, a página pisca no verde
 * antes de virar azul para quem escolheu Empresa. */
(function () {
  try {
    var m = localStorage.getItem("cadu.mode");
    if (m === "empresa" || m === "dev") {
      document.documentElement.dataset.mode = m;
    }
  } catch (e) {
    /* armazenamento bloqueado: fica o padrão do :root, que é Dev */
  }

  /* A casca de boot: decidida AQUI, antes de qualquer pintura.
   *
   * Ela vive no index.html como HTML e CSS puros, e por isso aparece no
   * primeiro quadro — antes dos 106 KB da aplicação existirem. É o unico
   * jeito honesto de a tela de carregamento MELHORAR o desempenho percebido
   * em vez de so atrasar: ela e a primeira pintura, nao um atraso somado a
   * ela.
   *
   * Quem ja visitou nao ve nada: a classe entra antes do body ser desenhado,
   * entao nao ha piscar. */
  try {
    if (localStorage.getItem("cadu.boot") === "1") {
      document.documentElement.className += " boot-off";
    }
  } catch (e) {
    /* sem armazenamento: mostra a casca, que e o comportamento seguro */
  }
})();
