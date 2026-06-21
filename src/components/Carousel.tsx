"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, type PanInfo } from "motion/react";
import HomeViz from "@/components/HomeViz";
import { siteSections } from "@/lib/data";

const mod = (n: number, m: number) => ((n % m) + m) % m;
const STEP = 150; // px of drag per card

export default function Carousel() {
  const cards = siteSections;
  const n = cards.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragFrac, setDragFrac] = useState(0);
  const [dragging, setDragging] = useState(false);
  const didPan = useRef(false);

  // auto-rotate
  useEffect(() => {
    if (paused || dragging) return;
    const id = setInterval(() => setActive((a) => mod(a + 1, n)), 3800);
    return () => clearInterval(id);
  }, [paused, dragging, n]);

  const pos = active + dragFrac;
  const wrappedOffset = (i: number) => {
    let d = i - pos;
    d = ((d % n) + n) % n;
    if (d > n / 2) d -= n;
    return d;
  };

  const onPanStart = () => {
    didPan.current = true;
    setDragging(true);
    setPaused(true);
  };
  const onPan = (_: PointerEvent, info: PanInfo) => {
    setDragFrac(-info.offset.x / STEP);
  };
  const onPanEnd = (_: PointerEvent, info: PanInfo) => {
    let target = active - info.offset.x / STEP;
    if (Math.abs(info.velocity.x) > 500) target += info.velocity.x < 0 ? 0.5 : -0.5; // flick momentum
    setActive(mod(Math.round(target), n));
    setDragFrac(0);
    setDragging(false);
    setTimeout(() => (didPan.current = false), 0);
  };

  return (
    <div className="w-full" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <motion.div
        className="relative mx-auto h-[330px] w-full cursor-grab select-none overflow-hidden [perspective:1200px] active:cursor-grabbing"
        style={{ touchAction: "pan-y" }}
        onPanStart={onPanStart}
        onPan={onPan}
        onPanEnd={onPanEnd}
      >
        {cards.map((c, i) => {
          const off = wrappedOffset(i);
          const abs = Math.abs(off);
          const visible = abs <= 2.6;
          const isCenter = abs < 0.5;
          return (
            <motion.div
              key={c.href}
              className="absolute left-1/2 top-0 -ml-[130px] h-full w-[260px]"
              animate={{
                x: off * STEP,
                scale: Math.max(0.5, 1 - abs * 0.13),
                rotateY: off * -22,
                opacity: visible ? Math.max(0, 1 - abs * 0.28) : 0,
              }}
              transition={dragging ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ zIndex: 100 - Math.round(abs), pointerEvents: visible ? "auto" : "none" }}
            >
              <div
                onClick={() => {
                  if (!didPan.current && !isCenter) setActive(i);
                }}
                className={`flex h-full flex-col overflow-hidden rounded-2xl bg-surface p-5 transition-colors ${
                  isCenter ? "border border-accent-dim shadow-2xl shadow-black/40" : "cursor-pointer border border-border hover:border-accent-dim"
                }`}
              >
                <HomeViz kind={c.viz} />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-accent">{c.num}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wide text-faint">{c.meta}</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold">{c.label}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{c.blurb}</p>
                {isCenter ? (
                  <Link
                    href={c.href}
                    onClick={(e) => {
                      if (didPan.current) e.preventDefault();
                    }}
                    className="mt-3 inline-flex w-fit items-center gap-1 rounded-md bg-accent px-4 py-2 text-sm font-medium text-[#06281d] transition-opacity hover:opacity-90"
                  >
                    Open page →
                  </Link>
                ) : (
                  <span className="mt-3 font-mono text-xs text-faint">click to bring forward</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setActive((a) => mod(a - 1, n))}
          aria-label="Previous"
          className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent-dim hover:text-accent"
        >
          ‹
        </button>
        <div className="flex gap-1.5">
          {cards.map((c, i) => (
            <button
              key={c.href}
              aria-label={`Go to ${c.label}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${mod(active, n) === i ? "w-5 bg-accent" : "w-1.5 bg-border hover:bg-muted"}`}
            />
          ))}
        </div>
        <button
          onClick={() => setActive((a) => mod(a + 1, n))}
          aria-label="Next"
          className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent-dim hover:text-accent"
        >
          ›
        </button>
      </div>
      <p className="mt-3 text-center font-mono text-xs text-faint">grab and slide · or use ‹ ›</p>
    </div>
  );
}
