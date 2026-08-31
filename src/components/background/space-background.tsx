import React from "react";

export const SpaceBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-background pointer-events-none select-none">
      {/* Halo ambiente — deliberadamente fraco.
          Com o acento verde, um glow forte aqui viraria banho de cor de página
          inteira, que é exatamente o que a regra da paleta proíbe: o verde é
          elemento, nunca atmosfera. Ele fica só como profundidade, sob o limiar
          em que se lê como "cor de fundo". */}
      <div
        className="absolute top-[-20%] left-[-15%] w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full opacity-[0.05] mix-blend-screen blur-[100px] md:blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, var(--primary-deep) 0%, transparent 70%)",
        }}
      />

      {/* Segundo halo — teal frio, para o fundo nao ficar monocromatico verde */}
      <div
        className="absolute bottom-[-20%] right-[-15%] w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full opacity-[0.06] mix-blend-screen blur-[100px] md:blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, var(--accent-blue) 0%, transparent 70%)",
        }}
      />

      {/* Grade — em --border, que e neutro. Nunca em cor de acento. */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Subtle Vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,var(--background)_90%)]" />
    </div>
  );
};
export default SpaceBackground;
