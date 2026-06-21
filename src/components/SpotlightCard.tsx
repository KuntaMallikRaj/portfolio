"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

// Card with cursor-following spotlight glow + subtle 3D tilt toward the pointer.
export default function SpotlightCard({
  children,
  className = "",
  as = "article",
  tilt = true,
}: {
  children: ReactNode;
  className?: string;
  as?: "article" | "div";
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 150, damping: 18 });

  function onMove(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (tilt) {
      px.set(x / rect.width);
      py.set(y / rect.height);
    }
  }

  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  const MotionTag = as === "div" ? motion.div : motion.article;

  return (
    <MotionTag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={tilt ? { rotateX: rx, rotateY: ry, transformPerspective: 900 } : undefined}
      className={`spotlight group relative overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-accent-dim ${className}`}
    >
      <span className="spotlight-glow" aria-hidden />
      <div className="relative z-10">{children}</div>
    </MotionTag>
  );
}
