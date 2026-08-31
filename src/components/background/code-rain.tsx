import React from "react";

/**
 * Chuva de código — melancólica, não agressiva.
 *
 * Três decisões que separam isto do clichê:
 *
 * 1. **Vive só onde é montada**, no topo da página, e não no fundo inteiro.
 *    Espalhada, ela some; concentrada, é a primeira coisa que se vê — e
 *    desaparece assim que você rola. É o verde como elemento, não como
 *    atmosfera.
 * 2. **Não tem cabeça brilhante.** O gradiente claro na ponta da coluna é o
 *    que dá pressa ao Matrix. Sem ele, a mesma forma lê como silêncio.
 * 3. **É lenta e irregular.** Cada coluna leva de 15 a 30 segundos e começa em
 *    ponto diferente, então o padrão nunca se fecha visivelmente.
 *
 * Custo: só `transform`, que a GPU compõe sem repintar. Nenhuma dependência,
 * nenhum canvas, nenhum quadro por segundo gasto em JavaScript. O bloco global
 * de `prefers-reduced-motion` congela tudo isto sem precisar de código aqui.
 */

const GLIFOS = "ｱ7ﾐ2ﾂ9ｹ4ﾜ1ﾊ6ｿ3ﾆ8ﾒ5ｳ0ﾘ7ﾏ2ｾ9ﾁ4ﾔ1ﾋ6";

// Posição, duração e defasagem fixas e escolhidas a dedo: sorteio em tempo de
// execução mudaria o desenho a cada visita e impediria comparar uma versão com
// a outra. As colunas mais fracas quebram o ritmo para não virar listra.
const COLUNAS = [
  { esq: "3%", dur: "15s", atraso: "-2s", op: 1 },
  { esq: "9%", dur: "22s", atraso: "-9s", op: 0.55 },
  { esq: "16%", dur: "18s", atraso: "-14s", op: 1 },
  { esq: "24%", dur: "26s", atraso: "-5s", op: 0.5 },
  { esq: "33%", dur: "20s", atraso: "-17s", op: 1 },
  { esq: "44%", dur: "24s", atraso: "-3s", op: 0.45 },
  { esq: "57%", dur: "17s", atraso: "-11s", op: 1 },
  { esq: "68%", dur: "28s", atraso: "-20s", op: 0.5 },
  { esq: "79%", dur: "19s", atraso: "-6s", op: 1 },
  { esq: "88%", dur: "23s", atraso: "-15s", op: 0.55 },
  { esq: "95%", dur: "30s", atraso: "-8s", op: 1 },
];

export const CodeRain: React.FC = () => (
  <div
    className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    aria-hidden="true"
  >
    <div className="absolute inset-0 opacity-[0.30]">
      {COLUNAS.map((c) => (
        <span
          key={c.esq}
          className="code-rain-col"
          style={{
            left: c.esq,
            animationDuration: c.dur,
            animationDelay: c.atraso,
            opacity: c.op,
          }}
        >
          {GLIFOS}
        </span>
      ))}
    </div>

    {/* Desvanece a chuva para dentro do fundo, para ela terminar em vez de ser
        cortada pela borda da seção. */}
    <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/90 to-background" />
  </div>
);

export default CodeRain;
