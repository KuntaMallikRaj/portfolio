"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

// Animates the numeric part of values like "500+", "1719", "1000+", "2".
export default function AnimatedCounter({ value, duration = 1.4 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseInt(match[2], 10) : 0;
  const suffix = match?.[3] ?? "";

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        node.textContent = `${prefix}${Math.round(v).toLocaleString()}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, target, prefix, suffix, duration]);

  return <span ref={ref}>{`${prefix}0${suffix}`}</span>;
}
