"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import HomeViz from "@/components/HomeViz";
import { siteSections } from "@/lib/data";

const variants = {
  enter: (d: number) => ({ x: d > 0 ? 340 : -340, opacity: 0, rotate: d > 0 ? 7 : -7, scale: 0.94 }),
  center: { x: 0, opacity: 1, rotate: 0, scale: 1 },
  exit: (d: number) => ({ x: d > 0 ? -340 : 340, opacity: 0, rotate: d > 0 ? -7 : 7, scale: 0.94 }),
};

const mod = (n: number, m: number) => ((n % m) + m) % m;

export default function SwipeDeck() {
  const cards = siteSections;
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const card = cards[mod(index, cards.length)];
  const paginate = (d: number) => setState([index + d, d]);

  return (
    <div className="mx-auto w-full max-w-sm select-none">
      <div className="relative h-[340px]">
        {/* stacked depth behind */}
        <div className="absolute inset-x-4 top-4 bottom-0 rounded-2xl border border-border bg-surface/40" />
        <div className="absolute inset-x-2 top-2 bottom-0 rounded-2xl border border-border bg-surface/70" />

        <AnimatePresence custom={dir} initial={false}>
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80 || info.velocity.x < -500) paginate(1);
              else if (info.offset.x > 80 || info.velocity.x > 500) paginate(-1);
            }}
            className="absolute inset-0 flex cursor-grab flex-col overflow-hidden rounded-2xl border border-border bg-surface p-5 shadow-2xl shadow-black/40 active:cursor-grabbing"
          >
            <HomeViz kind={card.viz} />
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-accent">{card.num}</span>
              <span className="font-mono text-[10px] uppercase tracking-wide text-faint">{card.meta}</span>
            </div>
            <h3 className="mt-2 text-lg font-semibold">{card.label}</h3>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{card.blurb}</p>
            <Link
              href={card.href}
              draggable={false}
              className="mt-3 inline-flex w-fit items-center gap-1 rounded-md bg-accent px-4 py-2 text-sm font-medium text-[#06281d] transition-opacity hover:opacity-90"
            >
              Open page →
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* controls */}
      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          onClick={() => paginate(-1)}
          aria-label="Previous"
          className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent-dim hover:text-accent"
        >
          ‹
        </button>
        <div className="flex gap-1.5">
          {cards.map((c, i) => {
            const active = mod(index, cards.length) === i;
            return (
              <button
                key={c.href}
                aria-label={`Go to ${c.label}`}
                onClick={() => setState([i, i > mod(index, cards.length) ? 1 : -1])}
                className={`h-1.5 rounded-full transition-all ${active ? "w-5 bg-accent" : "w-1.5 bg-border hover:bg-muted"}`}
              />
            );
          })}
        </div>
        <button
          onClick={() => paginate(1)}
          aria-label="Next"
          className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent-dim hover:text-accent"
        >
          ›
        </button>
      </div>
      <p className="mt-3 text-center font-mono text-xs text-faint">drag to swipe · ‹ › to flip · Open page to dive in</p>
    </div>
  );
}
