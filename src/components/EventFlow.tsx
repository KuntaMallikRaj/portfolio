"use client";

import { motion } from "motion/react";

// Animated event-driven pipeline: Producers → Queue → Consumers → WebSocket → Clients
// Packets travel left→right along the wires on a loop.
const NODES = [
  { id: "prod", label: "Producers", sub: "events in", x: 40 },
  { id: "queue", label: "SQS / SNS", sub: "durable queue", x: 220 },
  { id: "cons", label: "Consumers", sub: "idempotent", x: 400 },
  { id: "ws", label: "WebSocket", sub: "fan-out", x: 580 },
  { id: "client", label: "Clients", sub: "live UI", x: 760 },
];

function Packet({ delay, fromX, toX, y }: { delay: number; fromX: number; toX: number; y: number }) {
  return (
    <motion.circle
      r={3.5}
      fill="var(--accent)"
      cy={y}
      initial={{ cx: fromX, opacity: 0 }}
      animate={{ cx: [fromX, toX], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.4, delay, repeat: Infinity, repeatDelay: 1.1, ease: "easeInOut" }}
    />
  );
}

export default function EventFlow() {
  const y = 60;
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-surface p-5">
      <div className="mb-4 flex items-center gap-2 font-mono text-xs text-faint">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        live event pipeline · how I think about systems
      </div>
      <svg viewBox="0 0 840 120" className="w-full min-w-[680px]" role="img" aria-label="Event-driven architecture diagram">
        {/* wires */}
        {NODES.slice(0, -1).map((n, i) => (
          <line
            key={n.id}
            x1={n.x + 80}
            y1={y}
            x2={NODES[i + 1].x}
            y2={y}
            stroke="var(--border)"
            strokeWidth={1.5}
          />
        ))}

        {/* moving packets on each wire */}
        {NODES.slice(0, -1).map((n, i) => (
          <g key={`p-${n.id}`}>
            <Packet delay={i * 0.35} fromX={n.x + 80} toX={NODES[i + 1].x} y={y} />
            <Packet delay={i * 0.35 + 0.55} fromX={n.x + 80} toX={NODES[i + 1].x} y={y} />
          </g>
        ))}

        {/* nodes */}
        {NODES.map((n, i) => (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <rect
              x={n.x}
              y={y - 26}
              width={80}
              height={52}
              rx={10}
              fill="var(--surface-2)"
              stroke="var(--accent-dim)"
              strokeWidth={1}
            />
            <text x={n.x + 40} y={y - 4} textAnchor="middle" className="fill-foreground" fontSize={11} fontWeight={600}>
              {n.label}
            </text>
            <text x={n.x + 40} y={y + 12} textAnchor="middle" fill="var(--muted)" fontSize={9}>
              {n.sub}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
