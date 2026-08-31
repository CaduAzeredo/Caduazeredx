import React, { useEffect, useRef } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  Clock,
  Color,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";

/**
 * A cena do hero — o elemento-assinatura da v3.
 *
 * A regra que governa a página inteira é "gaste sua ousadia num lugar só".
 * Este é o lugar. Tudo em volta fica quieto de propósito, e é essa contenção
 * que impede o resultado de virar site gamer.
 *
 * O que é, tecnicamente: a chuva de código que hoje vive em CSS, promovida a
 * campo de partículas com profundidade real. Cada ponto cai na própria
 * velocidade, some por distância e por altura, e a câmera acompanha o ponteiro
 * de longe. Não há bloom, não há pós-processamento: o brilho e o dithering
 * são camadas de CSS por cima do canvas, o que custa zero e evita arrastar
 * mais 40 KB de biblioteca para dentro da rota.
 *
 * Decisões que valem escrever:
 *
 * - **three.js cru, sem react-three-fiber.** O reconciliador do R3F compensa
 *   em grafo de cena complexo e com muitos componentes; aqui há UM sistema de
 *   partículas. Seriam ~35 KB para não escrever trinta linhas.
 * - **A cor sai do token, não do código.** O shader recebe `--primary` lido em
 *   tempo de execução e um observador refaz a leitura quando o modo troca:
 *   escolher Empresa deixa a chuva azul-aço sem este arquivo saber de cor.
 * - **Ponto quadrado, não redondo.** Círculo lê como estrela; quadrado com
 *   borda suave lê como caractere de terminal, que é o que a chuva é.
 * - **Sem cabeça brilhante.** É ela que dá pressa ao Matrix. Sem ela, a mesma
 *   forma lê como silêncio — que é a leitura que a referência pede.
 * - **Para quando ninguém está vendo.** Fora da tela ou com a aba escondida,
 *   o laço de animação não roda. Cena de fundo que gasta bateria com a aba em
 *   segundo plano é defeito, não enfeite.
 *
 * Este componente só é montado atrás do portão de `use-capability.ts`. Quem
 * cai fora dele fica com a chuva em CSS, que continua completa sozinha.
 */

const QUANTIDADE = 5200;

const VERTEX = `
uniform float uTempo;
uniform float uPixelRatio;
attribute float aVelocidade;
attribute float aTamanho;
varying float vAlfa;

void main() {
  vec3 p = position;

  // Queda contínua: o módulo devolve o ponto ao topo sem costura visível.
  p.y = mod(p.y - uTempo * aVelocidade, 64.0) - 32.0;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aTamanho * uPixelRatio * (16.0 / -mv.z);

  // Duas máscaras: some ao fundo pela distância, e some nas duas pontas pela
  // altura. A simetria da segunda é o que troca a pressa do Matrix pelo
  // silêncio — sem ela, a chuva ganha cabeça e vira urgência.
  float profundidade = smoothstep(-48.0, -8.0, mv.z);
  float altura = 1.0 - smoothstep(7.0, 27.0, abs(p.y));
  vAlfa = profundidade * altura;
}
`;

const FRAGMENT = `
uniform vec3 uCor;
varying float vAlfa;

void main() {
  // Quadrado de borda suave: caractere de terminal, não estrela.
  vec2 d = abs(gl_PointCoord - 0.5);
  float forma = 1.0 - smoothstep(0.32, 0.5, max(d.x, d.y));
  if (forma < 0.01) discard;
  gl_FragColor = vec4(uCor, vAlfa * forma * 0.8);
}
`;

/**
 * A cor sai do token, e nao ha cor de reserva escrita aqui.
 *
 * Uma reserva em hex neste arquivo seria uma segunda fonte da verdade — e
 * envelheceria calada no dia em que a paleta mudasse. Se o token nao puder ser
 * lido, a resposta certa nao e inventar um verde: e nao desenhar a cena e
 * deixar a chuva em CSS, que le o mesmo token pelo caminho normal do CSS.
 */
function corDoToken(): Color | null {
  const bruto = getComputedStyle(document.documentElement)
    .getPropertyValue("--primary")
    .trim();
  if (!bruto) return null;
  try {
    return new Color().setStyle(bruto);
  } catch {
    return null;
  }
}

export const HeroScene: React.FC<{ onPronto?: () => void }> = ({
  onPronto,
}) => {
  const alvo = useRef<HTMLDivElement>(null);

  // O aviso de "primeiro quadro" vive numa ref para que trocar a funcao nao
  // derrube e remonte a cena inteira. A escrita e num efeito, nao no corpo do
  // componente: ref escrita durante a renderizacao quebra em modo concorrente.
  const prontoRef = useRef(onPronto);
  useEffect(() => {
    prontoRef.current = onPronto;
  }, [onPronto]);

  useEffect(() => {
    const host = alvo.current;
    if (!host) return;

    const corInicial = corDoToken();
    if (!corInicial) return;

    const cena = new Scene();
    const camera = new PerspectiveCamera(52, 1, 0.1, 120);
    camera.position.set(0, 0, 16);

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch {
      // O portão já verificou, mas contexto pode falhar mesmo assim (GPU
      // ocupada, aba antiga). Silêncio: a chuva em CSS continua por baixo.
      return;
    }

    renderer.setClearAlpha(0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    host.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    // ── geometria ─────────────────────────────────────────────────────────
    const posicoes = new Float32Array(QUANTIDADE * 3);
    const velocidades = new Float32Array(QUANTIDADE);
    const tamanhos = new Float32Array(QUANTIDADE);

    for (let i = 0; i < QUANTIDADE; i++) {
      posicoes[i * 3] = (Math.random() - 0.5) * 58;
      posicoes[i * 3 + 1] = (Math.random() - 0.5) * 64;
      posicoes[i * 3 + 2] = -Math.random() * 44 + 2;
      velocidades[i] = 1.1 + Math.random() * 3.1;
      tamanhos[i] = 1.0 + Math.random() * 2.4;
    }

    const geometria = new BufferGeometry();
    geometria.setAttribute("position", new BufferAttribute(posicoes, 3));
    geometria.setAttribute("aVelocidade", new BufferAttribute(velocidades, 1));
    geometria.setAttribute("aTamanho", new BufferAttribute(tamanhos, 1));

    const material = new ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTempo: { value: 0 },
        uCor: { value: corInicial },
        uPixelRatio: { value: renderer.getPixelRatio() },
      },
    });

    const pontos = new Points(geometria, material);
    cena.add(pontos);

    // ── tamanho ───────────────────────────────────────────────────────────
    const medir = () => {
      const { clientWidth: l, clientHeight: a } = host;
      if (!l || !a) return;
      camera.aspect = l / a;
      camera.updateProjectionMatrix();
      renderer.setSize(l, a, false);
      material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
    };
    medir();

    const observadorTamanho = new ResizeObserver(medir);
    observadorTamanho.observe(host);

    // ── paralaxe: a câmera acompanha o ponteiro, de longe ─────────────────
    const ponteiro = { x: 0, y: 0 };
    const suave = { x: 0, y: 0 };
    const moveu = (e: PointerEvent) => {
      ponteiro.x = (e.clientX / window.innerWidth - 0.5) * 2;
      ponteiro.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", moveu, { passive: true });

    // ── a cor acompanha o modo de leitura ─────────────────────────────────
    const observadorModo = new MutationObserver(() => {
      const nova = corDoToken();
      if (nova) material.uniforms.uCor.value = nova;
    });
    observadorModo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-mode"],
    });

    // ── laço ──────────────────────────────────────────────────────────────
    const relogio = new Clock();
    let quadro = 0;
    let naTela = true;
    let abaVisivel = !document.hidden;
    let anunciado = false;

    const rodando = () => naTela && abaVisivel;

    const passo = () => {
      quadro = requestAnimationFrame(passo);
      const dt = Math.min(relogio.getDelta(), 0.05);

      material.uniforms.uTempo.value += dt;

      suave.x += (ponteiro.x * 1.5 - suave.x) * 0.035;
      suave.y += (ponteiro.y * 0.9 - suave.y) * 0.035;
      camera.position.x = suave.x;
      camera.position.y = -suave.y;
      camera.lookAt(0, 0, -12);

      renderer.render(cena, camera);

      if (!anunciado) {
        anunciado = true;
        prontoRef.current?.();
      }
    };

    const ligar = () => {
      if (quadro) return;
      relogio.getDelta(); // descarta o intervalo parado
      quadro = requestAnimationFrame(passo);
    };
    const desligar = () => {
      if (!quadro) return;
      cancelAnimationFrame(quadro);
      quadro = 0;
    };
    const reavaliar = () => (rodando() ? ligar() : desligar());

    const observadorTela = new IntersectionObserver(
      ([e]) => {
        naTela = e.isIntersecting;
        reavaliar();
      },
      { threshold: 0 },
    );
    observadorTela.observe(host);

    const mudouVisibilidade = () => {
      abaVisivel = !document.hidden;
      reavaliar();
    };
    document.addEventListener("visibilitychange", mudouVisibilidade);

    // O contexto pode ser perdido pelo sistema. Sem isto, a cena morre
    // congelada na tela em vez de sair de cena.
    const perdeuContexto = (e: Event) => {
      e.preventDefault();
      desligar();
      host.style.opacity = "0";
    };
    renderer.domElement.addEventListener("webglcontextlost", perdeuContexto);

    ligar();

    return () => {
      desligar();
      window.removeEventListener("pointermove", moveu);
      document.removeEventListener("visibilitychange", mudouVisibilidade);
      renderer.domElement.removeEventListener(
        "webglcontextlost",
        perdeuContexto,
      );
      observadorTela.disconnect();
      observadorTamanho.disconnect();
      observadorModo.disconnect();
      geometria.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={alvo}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
};

export default HeroScene;
