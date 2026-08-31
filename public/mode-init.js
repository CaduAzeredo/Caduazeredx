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
})();
