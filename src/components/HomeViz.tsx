"use client";

import { motion } from "motion/react";

export type HomeVizKind =
  | "orbit"
  | "radar"
  | "bars"
  | "terminal"
  | "wave"
  | "doc"
  | "atom"
  | "grid"
  | "ripple";

// 1 — orbiting bodies around a core ------------------------------------------
function Orbit() {
  return (
    <div className="relative grid h-full place-items-center">
      <div className="absolute h-20 w-20 rounded-full border border-border" />
      <div className="absolute h-11 w-11 rounded-full border border-border opacity-60" />
      <div className="absolute h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
      <motion.div className="absolute h-20 w-20" animate={{ rotate: 360 }} transition={{ duration: 7, ease: "linear", repeat: Infinity }}>
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-accent" />
      </motion.div>
      <motion.div className="absolute h-11 w-11" animate={{ rotate: -360 }} transition={{ duration: 4.5, ease: "linear", repeat: Infinity }}>
        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-muted" />
      </motion.div>
    </div>
  );
}

// 2 — radar: expanding rings + rotating sweep --------------------------------
function Radar() {
  return (
    <div className="relative grid h-full place-items-center overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-20 w-20 rounded-full border border-accent"
          animate={{ scale: [0.2, 1], opacity: [0.55, 0] }}
          transition={{ duration: 2.4, delay: i * 0.8, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
      <motion.div className="absolute h-20 w-20" animate={{ rotate: 360 }} transition={{ duration: 3, ease: "linear", repeat: Infinity }}>
        <div className="absolute left-1/2 top-1/2 h-px w-10 origin-left bg-gradient-to-r from-accent to-transparent" />
      </motion.div>
      <div className="absolute h-2 w-2 rounded-full bg-accent" />
    </div>
  );
}

// 3 — equalizer bars ---------------------------------------------------------
function Bars() {
  const seq = [
    [16, 40], [28, 12], [20, 44], [36, 18], [14, 34],
  ];
  return (
    <div className="flex h-full items-end justify-center gap-2 p-5">
      {seq.map(([a, b], i) => (
        <motion.div
          key={i}
          className="w-3 rounded-t bg-accent"
          animate={{ height: [a, b, a] }}
          transition={{ duration: 1.6, delay: i * 0.14, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// 4 — terminal lines typing --------------------------------------------------
function Terminal() {
  const lines = [110, 70, 140];
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 px-5">
      {lines.map((w, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="font-mono text-xs text-accent">›</span>
          <motion.div
            className="h-1.5 rounded bg-muted/60"
            animate={{ width: [0, w, w, 0] }}
            transition={{ duration: 3, times: [0, 0.3, 0.85, 1], delay: i * 0.4, repeat: Infinity }}
          />
          {i === lines.length - 1 && <span className="h-3 w-1 animate-pulse bg-accent" />}
        </div>
      ))}
    </div>
  );
}

// 5 — traveling waveform -----------------------------------------------------
function Wave() {
  return (
    <div className="flex h-full items-center justify-center gap-1">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-accent"
          animate={{ height: [8, 30, 8] }}
          transition={{ duration: 1.2, delay: i * 0.08, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// 6 — writing lines ----------------------------------------------------------
function Doc() {
  const lines = [
    { w: 70, c: "bg-accent" },
    { w: 150, c: "bg-muted/50" },
    { w: 130, c: "bg-muted/50" },
    { w: 145, c: "bg-muted/50" },
    { w: 90, c: "bg-muted/50" },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2 px-5">
      {lines.map((l, i) => (
        <motion.div
          key={i}
          className={`h-1.5 rounded ${l.c}`}
          animate={{ width: [0, l.w] }}
          transition={{ duration: 0.7, delay: 0.2 + i * 0.4, repeat: Infinity, repeatDelay: (lines.length - i) * 0.4, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// 7 — atom with electrons on tilted orbits -----------------------------------
function Atom() {
  return (
    <div className="relative grid h-full place-items-center">
      {[0, 60, 120].map((deg, i) => (
        <div key={deg} className="absolute h-16 w-16" style={{ transform: `rotate(${deg}deg) scaleY(0.4)` }}>
          <div className="absolute inset-0 rounded-full border border-border" />
          <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 2.6 + i * 0.6, ease: "linear", repeat: Infinity }}>
            <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent" />
          </motion.div>
        </div>
      ))}
      <div className="absolute h-2.5 w-2.5 rounded-full bg-accent" />
    </div>
  );
}

// 8 — dot matrix diagonal wave -----------------------------------------------
function Grid() {
  const cols = 9;
  const rows = 3;
  return (
    <div className="grid h-full place-items-center">
      <div className="grid grid-cols-9 gap-2">
        {Array.from({ length: cols * rows }).map((_, i) => {
          const c = i % cols;
          const r = Math.floor(i / cols);
          return (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-accent"
              animate={{ opacity: [0.12, 1, 0.12] }}
              transition={{ duration: 2, delay: ((c + r) % 9) * 0.16, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        })}
      </div>
    </div>
  );
}

// 9 — emanating ripples ------------------------------------------------------
function Ripple() {
  return (
    <div className="relative grid h-full place-items-center overflow-hidden">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute h-16 w-16 rounded-full bg-accent"
          animate={{ scale: [0, 1.6], opacity: [0.35, 0] }}
          transition={{ duration: 2.8, delay: i * 0.7, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
      <motion.div
        className="absolute h-3 w-3 rounded-full bg-accent"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      />
    </div>
  );
}

const MAP = {
  orbit: Orbit,
  radar: Radar,
  bars: Bars,
  terminal: Terminal,
  wave: Wave,
  doc: Doc,
  atom: Atom,
  grid: Grid,
  ripple: Ripple,
};

export default function HomeViz({ kind }: { kind: HomeVizKind }) {
  const C = MAP[kind];
  return (
    <div className="mb-4 h-24 overflow-hidden rounded-xl border border-border bg-background/60">
      <C />
    </div>
  );
}
