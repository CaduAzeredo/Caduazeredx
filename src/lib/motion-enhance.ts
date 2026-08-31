/**
 * Camada de movimento — rolagem suave, revelação por rolagem e título por
 * máscara de linha.
 *
 * Três decisões estruturais:
 *
 * 1. **Carrega depois da primeira pintura, em tempo ocioso.** A página é
 *    inteiramente utilizável sem isto. Nada aqui entra no caminho crítico:
 *    GSAP, ScrollTrigger e Lenis somam ~45 KB, e nenhum deles precisa existir
 *    para alguém ler o texto ou clicar no botão.
 *
 * 2. **Nenhum componente importa animação.** Eles se declaram por atributo —
 *    `data-reveal`, `data-split` — e este arquivo procura. Um `.tsx` que
 *    importa GSAP passa a depender dele para renderizar; um `.tsx` com um
 *    atributo continua funcionando sozinho.
 *
 * 3. **O estado inicial é escrito por JavaScript, nunca por CSS.** Se este
 *    módulo não carregar — rede ruim, erro, movimento reduzido — o conteúdo
 *    está visível, porque nunca foi escondido. Esconder no CSS e revelar no
 *    JavaScript é como se apagam páginas inteiras para quem tem a rede lenta,
 *    e para o rastreador de busca.
 */

let ligado = false;
let desfazer: (() => void) | null = null;

function preferSemMovimento(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/**
 * No toque, esta camada nao entra.
 *
 * Dois motivos, e o primeiro sozinho ja bastaria:
 *
 * 1. **Rolagem suave em tela de toque piora.** O Lenis sequestra o scroll para
 *    interpola-lo, e o sistema operacional ja faz isso melhor, com a inercia
 *    que a pessoa conhece do resto do aparelho. O proprio projeto recomenda
 *    nao ligar em toque.
 * 2. **Sao 49 KB.** O plano fixa o caminho movel em 140 KB, e com esta camada
 *    ele ia a 155. Cortar aqui e o corte certo: e o unico pedaco que custa
 *    caro e devolve pouco justamente onde custa mais.
 *
 * O conteudo nao depende disto para aparecer — o estado inicial e escrito por
 * JavaScript, nunca por CSS. Sem a camada, a pagina simplesmente esta toda la.
 */
function ehToque(): boolean {
  try {
    return (
      window.matchMedia("(pointer: coarse)").matches && window.innerWidth < 1024
    );
  } catch {
    return false;
  }
}

async function ligar(): Promise<void> {
  const [{ gsap }, { ScrollTrigger }, LenisMod] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("lenis"),
  ]);

  gsap.registerPlugin(ScrollTrigger);

  // ── rolagem suave ───────────────────────────────────────────────────────
  // É o que mais muda a sensação do site por quilobyte gasto. `lerp` baixo o
  // bastante para ser suave, alto o bastante para não parecer que a página
  // está presa em melado — o erro mais comum de quem liga isto.
  const Lenis = LenisMod.default;
  const lenis = new Lenis({
    lerp: 0.12,
    wheelMultiplier: 1,
    smoothWheel: true,
  });

  let quadro = 0;
  const passo = (t: number) => {
    lenis.raf(t);
    quadro = requestAnimationFrame(passo);
  };
  quadro = requestAnimationFrame(passo);

  // O ScrollTrigger precisa perguntar ao Lenis onde a página está, senão os
  // dois discordam e as animações disparam no lugar errado.
  lenis.on("scroll", ScrollTrigger.update);
  ScrollTrigger.defaults({ toggleActions: "play none none none" });

  // ── revelação por rolagem ───────────────────────────────────────────────
  const revelaveis = Array.from(
    document.querySelectorAll<HTMLElement>("[data-reveal]"),
  );

  // Elemento que JA esta na tela nao e escondido. Esta camada entra em tempo
  // ocioso, ~200 ms depois da pintura: esconder o que a pessoa ja esta lendo
  // para reanimar produz um piscar, e um piscar e pior que nao ter animacao.
  // So anima o que ainda vai chegar.
  const alturaJanela = window.innerHeight;

  for (const el of revelaveis) {
    if (el.getBoundingClientRect().top < alturaJanela * 0.92) continue;

    const filhos = el.hasAttribute("data-reveal-stagger")
      ? Array.from(el.children)
      : [el];

    gsap.set(filhos, { opacity: 0, y: 18 });
    gsap.to(filhos, {
      opacity: 1,
      y: 0,
      duration: 0.72,
      ease: "power3.out",
      stagger: filhos.length > 1 ? 0.07 : 0,
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  }

  // ── título por máscara de linha ─────────────────────────────────────────
  // O SplitText passou a ser livre depois da compra do GSAP pela Webflow. É a
  // ferramenta certa para isto; a alternativa era imitá-la à mão e errar nos
  // casos de quebra de linha.
  let desfazerSplit: Array<{ revert: () => void }> = [];
  try {
    const { SplitText } = await import("gsap/SplitText");
    gsap.registerPlugin(SplitText);

    const titulos = Array.from(
      document.querySelectorAll<HTMLElement>("[data-split]"),
    );

    for (const t of titulos) {
      if (t.getBoundingClientRect().top < alturaJanela * 0.9) continue;

      const partes = new SplitText(t, {
        type: "lines",
        linesClass: "linha-revelada",
        // A mascara e o que faz a linha SUBIR DE DENTRO de algo em vez de
        // deslizar por cima da pagina. E a diferenca entre parecer caro e
        // parecer um fade.
        mask: "lines",
        // Sem isto, o leitor de tela lê o título letra por letra ou linha por
        // linha solta. Com isto, ele continua lendo a frase.
        aria: "auto",
      });
      desfazerSplit.push(partes);

      gsap.set(partes.lines, { yPercent: 108, opacity: 0 });
      gsap.to(partes.lines, {
        yPercent: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: { trigger: t, start: "top 86%" },
      });
    }
  } catch {
    // SplitText indisponível nesta instalação: os títulos simplesmente não
    // ganham o revelar por linha. Nada quebra, nada some.
    desfazerSplit = [];
  }

  ScrollTrigger.refresh();

  desfazer = () => {
    cancelAnimationFrame(quadro);
    lenis.destroy();
    ScrollTrigger.getAll().forEach((t) => t.kill());
    desfazerSplit.forEach((s) => s.revert());
    gsap.set("[data-reveal], [data-reveal-stagger] > *", {
      clearProps: "all",
    });
  };
}

/**
 * Liga a camada de movimento uma vez, em tempo ocioso, depois da primeira
 * pintura. Chamar de novo não faz nada.
 */
export function ativarMovimento(): () => void {
  if (ligado || typeof window === "undefined") return () => {};
  if (preferSemMovimento() || ehToque()) return () => {};
  ligado = true;

  const agendar =
    window.requestIdleCallback ??
    ((cb: () => void) => window.setTimeout(cb, 220));

  const id = agendar(() => {
    void ligar().catch(() => {
      // A página continua inteira sem movimento realçado. Não há degradação
      // visível: o conteúdo nunca foi escondido esperando por isto.
      ligado = false;
    });
  });

  return () => {
    if (typeof id === "number") {
      (window.cancelIdleCallback ?? window.clearTimeout)(id);
    }
    desfazer?.();
    desfazer = null;
    ligado = false;
  };
}

export default ativarMovimento;
