import React from "react";

export const SpaceBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-background pointer-events-none select-none">
      {/* Ambient Glow 1 - Top Left Pink */}
      <div
        className="absolute top-[-20%] left-[-15%] w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full opacity-[0.08] mix-blend-screen blur-[100px] md:blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
        }}
      />

      {/* Ambient Glow 2 - Bottom Right Blue/Purple */}
      <div
        className="absolute bottom-[-20%] right-[-15%] w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full opacity-[0.07] mix-blend-screen blur-[100px] md:blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, var(--accent-blue) 0%, transparent 70%)",
        }}
      />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.18]"
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
