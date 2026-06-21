"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// Soft light that trails the pointer. Additive — never hides the native cursor.
export default function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 220, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 160);
      y.set(e.clientY - 160);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-30 h-80 w-80 rounded-full opacity-60 mix-blend-screen"
    >
      <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.10),transparent_60%)]" />
    </motion.div>
  );
}
