import React, { useState, useEffect } from "react";

export interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
  showCursor?: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay = 0,
  speed = 20,
  onComplete,
  showCursor = false,
}) => {
  // Inicialização dinâmica do estado evita chamadas síncronas de setState em useEffect
  const [displayText, setDisplayText] = useState(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return prefersReduced ? text : "";
  });

  const [isComplete, setIsComplete] = useState(() => {
    return (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  });

  useEffect(() => {
    if (isComplete) {
      const trigger = setTimeout(() => {
        if (onComplete) onComplete();
      }, 0);
      return () => clearTimeout(trigger);
    }

    let intervalId: ReturnType<typeof setInterval> | undefined = undefined;
    const timeoutId = setTimeout(() => {
      let currentIndex = 0;
      intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          const char = text.charAt(currentIndex);
          setDisplayText((prev) => prev + char);
          currentIndex++;
        } else {
          if (intervalId) clearInterval(intervalId);
          setIsComplete(true);
          if (onComplete) onComplete();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, delay, speed, onComplete, isComplete]);

  return (
    <span className="font-mono">
      {/* Leitores de tela obtêm o texto completo imediatamente */}
      <span className="sr-only">{text}</span>
      {/* Representação visual da digitação */}
      <span aria-hidden="true">
        {displayText}
        {showCursor && (
          <span
            className={`inline-block w-1.5 h-4 bg-primary ml-1 align-middle ${
              isComplete ? "animate-pulse" : ""
            }`}
            style={{
              animationDuration: "1s",
            }}
          />
        )}
      </span>
    </span>
  );
};

export default TypewriterText;
