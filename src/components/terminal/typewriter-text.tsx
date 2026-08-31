import React, { useState, useEffect } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

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
  const semMovimento = useReducedMotion();

  // Inicialização dinâmica do estado evita chamadas síncronas de setState em useEffect
  const [displayText, setDisplayText] = useState(() =>
    semMovimento ? text : "",
  );
  const [isComplete, setIsComplete] = useState(() => semMovimento);

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
        {showCursor && !semMovimento && (
          <span
            className={`inline-block w-1.5 h-4 bg-primary ml-1 align-middle ${
              isComplete ? "terminal-cursor" : ""
            }`}
          />
        )}
      </span>
    </span>
  );
};

export default TypewriterText;
