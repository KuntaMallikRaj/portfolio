"use client";

import { useEffect, useState } from "react";

type Line =
  | { type: "cmd"; text: string }
  | { type: "out"; text: string; accent?: boolean };

const SCRIPT: Line[] = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "kunta_mallik_raj — backend software engineer @ eSentire" },
  { type: "cmd", text: "cat focus.txt" },
  { type: "out", text: "scalable · event-driven · distributed systems", accent: true },
  { type: "cmd", text: "ls ~/shipped" },
  { type: "out", text: "heydsa/  creatorhq/  meeting-intel/  splitwise/" },
  { type: "cmd", text: "stats --summary" },
  { type: "out", text: "500+ users · 1719 LC · 1000+ solved · 2 papers", accent: true },
  { type: "cmd", text: "./hire.sh" },
  { type: "out", text: "→ open to backend / distributed-systems roles ✓", accent: true },
];

const TYPE_MS = 38;
const LINE_PAUSE = 420;

export default function HeroTerminal() {
  const [done, setDone] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx >= SCRIPT.length) return;
    const line = SCRIPT[idx];

    if (line.type === "out") {
      const t = setTimeout(() => {
        setDone((d) => [...d, line]);
        setIdx((i) => i + 1);
      }, 260);
      return () => clearTimeout(t);
    }

    // type the command char by char
    let char = 0;
    const interval = setInterval(() => {
      char += 1;
      setTyping(line.text.slice(0, char));
      if (char >= line.text.length) {
        clearInterval(interval);
        setTimeout(() => {
          setDone((d) => [...d, line]);
          setTyping("");
          setIdx((i) => i + 1);
        }, LINE_PAUSE);
      }
    }, TYPE_MS);
    return () => clearInterval(interval);
  }, [idx]);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[#0b0d11] font-mono text-[13px] shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span className="ml-2 text-xs text-faint">mallik@portfolio: ~</span>
      </div>
      <div className="min-h-[230px] space-y-1.5 p-4 leading-relaxed">
        {done.map((l, i) =>
          l.type === "cmd" ? (
            <div key={i} className="flex gap-2">
              <span className="text-accent">$</span>
              <span className="text-foreground/90">{l.text}</span>
            </div>
          ) : (
            <div key={i} className={l.accent ? "text-accent" : "text-muted"}>
              {l.text}
            </div>
          )
        )}
        {idx < SCRIPT.length && (
          <div className="flex gap-2">
            <span className="text-accent">$</span>
            <span className="text-foreground/90">
              {typing}
              <span className="cursor ml-0.5" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
