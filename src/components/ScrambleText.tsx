"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789#$%&*<>/_";

// Decrypt-on-view: characters scramble, then settle into the final text.
export default function ScrambleText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }
    let frame = 0;
    const total = text.length;
    const id = setInterval(() => {
      frame += 1;
      const revealed = Math.floor(frame / 2);
      const next = text
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (i < revealed) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setDisplay(next);
      if (revealed >= total) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [inView, text]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
