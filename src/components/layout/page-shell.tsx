import React from "react";
import { motion, useReducedMotion } from "motion/react";

export interface PageShellProps {
  children: React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="flex-grow flex flex-col w-full"
    >
      {children}
    </motion.main>
  );
};

export default PageShell;
