"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

// Animated API request → response, looping. Backend-flavored hero visual.
const BODY: { k: string; v: string }[] = [
  { k: "name", v: '"Kunta Mallik Raj"' },
  { k: "role", v: '"Backend Software Engineer"' },
  { k: "focus", v: '"scalable, event-driven systems"' },
  { k: "stack", v: '["FastAPI", "Redis", "SQS"]' },
  { k: "open_to_work", v: "true" },
];

const STEPS = BODY.length + 6; // send + status + lines + hold

export default function ApiExchange() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS), 520);
    return () => clearInterval(id);
  }, []);

  const sending = step === 0;
  const statusShown = step >= 1;
  const linesShown = Math.max(0, Math.min(BODY.length, step - 1));

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[#0b0d11] font-mono text-[13px] shadow-2xl shadow-black/40">
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span className="ml-2 truncate text-xs text-faint">api.kuntamallikraj.dev</span>
      </div>

      <div className="min-h-[230px] space-y-3 p-4">
        {/* request */}
        <div className="flex items-center gap-2">
          <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[11px] font-semibold text-accent">GET</span>
          <span className="text-foreground/80">/api/me</span>
          <span className="ml-auto text-xs">
            {sending ? (
              <span className="inline-flex items-center gap-1.5 text-[#e0a23c]">
                <motion.span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-[#e0a23c]"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                />
                sending
              </span>
            ) : (
              <span className="text-accent">✓ sent</span>
            )}
          </span>
        </div>

        {/* flow line */}
        <div className="relative h-px w-full bg-border">
          <motion.span
            className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent"
            initial={{ left: "0%", opacity: 0 }}
            animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
          />
        </div>

        {/* response */}
        <div className="text-xs">
          {statusShown ? (
            <span className="text-faint">
              <span className="font-semibold text-accent">200 OK</span> · application/json · 24ms
            </span>
          ) : (
            <span className="text-faint">awaiting response…</span>
          )}
        </div>

        <div className="leading-relaxed">
          <div className="text-faint">{"{"}</div>
          {BODY.slice(0, linesShown).map((b) => (
            <motion.div
              key={b.k}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              className="pl-4"
            >
              <span className="text-muted">&quot;{b.k}&quot;</span>
              <span className="text-faint">: </span>
              <span className="text-accent">{b.v}</span>
              <span className="text-faint">,</span>
            </motion.div>
          ))}
          {linesShown < BODY.length && statusShown && <span className="cursor ml-4" />}
          <div className="text-faint">{"}"}</div>
        </div>
      </div>
    </div>
  );
}
