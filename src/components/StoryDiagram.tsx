"use client";

import { motion } from "motion/react";

export type DiagramKind =
  | "batch"
  | "cdc"
  | "collab"
  | "alert"
  | "txn"
  | "autocomplete"
  | "latency"
  | "reads"
  | "syncasync"
  | "incidents"
  | "heydsa"
  | "creatorhq"
  | "meeting"
  | "splitwise"
  | "algoviz"
  | "urlshort"
  | "fanout"
  | "cacheadapter"
  | "storageadapter"
  | "idempotent"
  | "socket"
  | "security"
  | "randomforest"
  | "regression"
  | "trajectory";

const ACCENT = "var(--accent)";
const BORDER = "var(--border)";
const SURFACE2 = "var(--surface-2)";

function Node({ x, y, w, label, sub }: { x: number; y: number; w: number; label: string; sub?: string }) {
  const h = sub ? 46 : 32;
  return (
    <g>
      <rect x={x} y={y - h / 2} width={w} height={h} rx={9} fill={SURFACE2} stroke="var(--accent-dim)" strokeWidth={1} />
      <text x={x + w / 2} y={sub ? y - 3 : y + 4} textAnchor="middle" className="fill-foreground" fontSize={11} fontWeight={600}>
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + 13} textAnchor="middle" fill="var(--muted)" fontSize={9}>
          {sub}
        </text>
      )}
    </g>
  );
}

function Packet({ from, to, y, delay = 0, dur = 1.5 }: { from: number; to: number; y: number; delay?: number; dur?: number }) {
  return (
    <motion.circle
      r={3.5}
      fill={ACCENT}
      cy={y}
      initial={{ cx: from, opacity: 0 }}
      animate={{ cx: [from, to], opacity: [0, 1, 1, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, repeatDelay: 0.9, ease: "easeInOut" }}
    />
  );
}

function Wire({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return <line x1={x1} y1={y} x2={x2} y2={y} stroke={BORDER} strokeWidth={1.5} />;
}

// packet that can travel diagonally
function P2({
  x1, y1, x2, y2, delay = 0, dur = 1.4, color = ACCENT,
}: { x1: number; y1: number; x2: number; y2: number; delay?: number; dur?: number; color?: string }) {
  return (
    <motion.circle
      r={3.5}
      fill={color}
      initial={{ cx: x1, cy: y1, opacity: 0 }}
      animate={{ cx: [x1, x2], cy: [y1, y2], opacity: [0, 1, 1, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, repeatDelay: 0.9, ease: "easeInOut" }}
    />
  );
}

// 30s -> 3s : slow per-row fill vs fast batched fill ------------------------
function Batch() {
  const trackX = 150;
  const trackW = 470;
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="Latency reduced from 30 seconds to 3 seconds">
      {/* lane A */}
      <text x={10} y={42} fill="var(--muted)" fontSize={11} fontWeight={600}>per-domain</text>
      <text x={10} y={56} fill="var(--faint)" fontSize={9}>N queries</text>
      <rect x={trackX} y={32} width={trackW} height={12} rx={6} fill={SURFACE2} />
      <motion.rect
        x={trackX} y={32} height={12} rx={6} fill="#e0a23c"
        initial={{ width: 0 }} animate={{ width: trackW }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.6, ease: "linear" }}
      />
      <text x={trackX + trackW + 12} y={43} fill="#e0a23c" fontSize={12} fontWeight={700} fontFamily="monospace">30s</text>

      {/* lane B */}
      <text x={10} y={98} fill="var(--muted)" fontSize={11} fontWeight={600}>batched</text>
      <text x={10} y={112} fill="var(--faint)" fontSize={9}>1 query</text>
      <rect x={trackX} y={88} width={trackW} height={12} rx={6} fill={SURFACE2} />
      <motion.rect
        x={trackX} y={88} height={12} rx={6} fill={ACCENT}
        initial={{ width: 0 }} animate={{ width: trackW }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3.1, ease: "easeOut" }}
      />
      <text x={trackX + trackW + 12} y={99} fill={ACCENT} fontSize={12} fontWeight={700} fontFamily="monospace">3s</text>
    </svg>
  );
}

// DB -> CDC -> SQS -> WebSocket -> UI ---------------------------------------
function Cdc() {
  const y = 65;
  const nodes = [
    { x: 20, label: "DB", sub: "change" },
    { x: 180, label: "CDC", sub: "capture" },
    { x: 340, label: "SQS", sub: "queue" },
    { x: 500, label: "WS", sub: "push" },
    { x: 660, label: "UI", sub: "patch" },
  ];
  const w = 80;
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="CDC to SQS to WebSocket pipeline">
      {nodes.slice(0, -1).map((n, i) => (
        <Wire key={i} x1={n.x + w} x2={nodes[i + 1].x} y={y} />
      ))}
      {nodes.slice(0, -1).map((n, i) => (
        <Packet key={i} from={n.x + w} to={nodes[i + 1].x} y={y} delay={i * 0.3} />
      ))}
      {nodes.map((n) => (
        <Node key={n.label} x={n.x} y={y} w={w} label={n.label} sub={n.sub} />
      ))}
    </svg>
  );
}

// Users <-> WS+Redis hub <-> doc, with presence pulses ----------------------
function Collab() {
  const hub = { x: 320, y: 65, w: 120 };
  const users = [25, 65, 105];
  const doc = { x: 620, y: 65, w: 110 };
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="Real-time collaboration over WebSockets and Redis">
      {users.map((uy, i) => (
        <g key={i}>
          <line x1={130} y1={uy} x2={hub.x} y2={hub.y} stroke={BORDER} strokeWidth={1.5} />
          <rect x={60} y={uy - 13} width={70} height={26} rx={8} fill={SURFACE2} stroke="var(--accent-dim)" strokeWidth={1} />
          <text x={95} y={uy + 4} textAnchor="middle" className="fill-foreground" fontSize={10}>user {i + 1}</text>
          <motion.circle
            cx={66} cy={uy - 13} r={3} fill={ACCENT}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.3 }}
          />
          <Packet from={130} to={hub.x} y={(uy + hub.y) / 2} delay={i * 0.35} dur={1.2} />
        </g>
      ))}
      <line x1={hub.x + hub.w} y1={hub.y} x2={doc.x} y2={hub.y} stroke={BORDER} strokeWidth={1.5} />
      <Packet from={hub.x + hub.w} to={doc.x} y={hub.y} delay={0.4} dur={1.2} />
      <Node x={hub.x} y={hub.y} w={hub.w} label="WS · Redis" sub="presence + sync" />
      <Node x={doc.x} y={doc.y} w={doc.w} label="shared doc" sub="live" />
    </svg>
  );
}

// Services -> Grafana spike over threshold -> Slack ping --------------------
function Alert() {
  const y = 65;
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="Proactive alerting from Grafana to Slack">
      {[35, 65, 95].map((sy, i) => (
        <g key={i}>
          <line x1={110} y1={sy} x2={250} y2={y} stroke={BORDER} strokeWidth={1.5} />
          <rect x={20} y={sy - 11} width={90} height={22} rx={7} fill={SURFACE2} stroke="var(--accent-dim)" strokeWidth={1} />
          <text x={65} y={sy + 4} textAnchor="middle" className="fill-foreground" fontSize={9}>service {i + 1}</text>
          <Packet from={110} to={250} y={(sy + y) / 2} delay={i * 0.25} dur={1.1} />
        </g>
      ))}

      {/* grafana panel with spike */}
      <rect x={250} y={35} width={170} height={60} rx={9} fill={SURFACE2} stroke="var(--accent-dim)" strokeWidth={1} />
      <text x={335} y={50} textAnchor="middle" fill="var(--muted)" fontSize={9}>Grafana</text>
      <line x1={262} y1={78} x2={408} y2={78} stroke="#e0a23c" strokeDasharray="3 3" strokeWidth={1} opacity={0.6} />
      <motion.path
        d="M262 85 L290 82 L312 84 L330 60 L348 84 L380 80 L408 83"
        fill="none" stroke={ACCENT} strokeWidth={2}
        initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }}
      />

      {/* slack ping */}
      <line x1={420} y1={y} x2={560} y2={y} stroke={BORDER} strokeWidth={1.5} />
      <Packet from={420} to={560} y={y} delay={1.6} dur={0.9} />
      <Node x={560} y={y} w={120} label="Slack alert" sub="before escalation" />
      <motion.circle
        cx={620} cy={y} r={18} fill="none" stroke={ACCENT} strokeWidth={1.5}
        initial={{ scale: 0, opacity: 0.7 }} animate={{ scale: [0, 1.4], opacity: [0.7, 0] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 1.5, delay: 2 }}
        style={{ transformOrigin: "620px 65px" }}
      />
    </svg>
  );
}

// Distributed transactions: coordinator <-> two services (prepare / commit) --
function Txn() {
  const coord = { x: 320, y: 28, w: 120 };
  const a = { x: 110, y: 100, w: 120 };
  const b = { x: 530, y: 100, w: 120 };
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="Distributed transaction coordinator with two services">
      <line x1={380} y1={44} x2={170} y2={87} stroke={BORDER} strokeWidth={1.5} />
      <line x1={380} y1={44} x2={590} y2={87} stroke={BORDER} strokeWidth={1.5} />
      <P2 x1={380} y1={44} x2={170} y2={87} delay={0} />
      <P2 x1={380} y1={44} x2={590} y2={87} delay={0.2} />
      <P2 x1={170} y1={87} x2={380} y2={44} delay={1.1} color="#e0a23c" />
      <P2 x1={590} y1={87} x2={380} y2={44} delay={1.3} />
      <Node x={coord.x} y={coord.y} w={coord.w} label="Coordinator" sub="2PC / Saga" />
      <Node x={a.x} y={a.y} w={a.w} label="Service A" sub="debit" />
      <Node x={b.x} y={b.y} w={b.w} label="Service B" sub="credit" />
    </svg>
  );
}

// Autocomplete: typed query -> suggestions dropping in -----------------------
function Autocomplete() {
  const suggestions = ["distributed systems", "distributed cache", "distributed lock"];
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="Autocomplete suggestions appearing as you type">
      <rect x={210} y={14} width={340} height={30} rx={8} fill={SURFACE2} stroke="var(--accent-dim)" strokeWidth={1} />
      <text x={228} y={33} fill="var(--foreground)" fontSize={12} fontFamily="monospace">distributed</text>
      <motion.rect
        x={310} y={22} width={2} height={14} fill={ACCENT}
        animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }}
      />
      <text x={520} y={33} fill="var(--faint)" fontSize={11}>⌕</text>
      {suggestions.map((s, i) => (
        <motion.g
          key={s}
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: 3.2, times: [0, 0.15 + i * 0.12, 0.3 + i * 0.12, 0.9, 1], repeat: Infinity }}
        >
          <rect x={210} y={52 + i * 24} width={340} height={20} rx={5} fill={i === 0 ? "rgba(52,211,153,0.08)" : "transparent"} />
          <text x={228} y={66 + i * 24} fill={i === 0 ? ACCENT : "var(--muted)"} fontSize={11} fontFamily="monospace">
            {s}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

// Latency: gauge needle sweeping from high -> low ----------------------------
function Latency() {
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="Latency reduced, gauge needle dropping">
      <path d="M300 110 A 80 80 0 0 1 460 110" fill="none" stroke={SURFACE2} strokeWidth={8} strokeLinecap="round" />
      <path d="M300 110 A 80 80 0 0 1 380 30" fill="none" stroke={ACCENT} strokeWidth={8} strokeLinecap="round" opacity={0.7} />
      <text x={296} y={124} fill="var(--faint)" fontSize={10} textAnchor="middle">low</text>
      <text x={464} y={124} fill="#e0a23c" fontSize={10} textAnchor="middle">high</text>
      <motion.line
        x1={380} y1={110} x2={380} y2={44} stroke={ACCENT} strokeWidth={2.5} strokeLinecap="round"
        style={{ transformOrigin: "380px 110px" }}
        animate={{ rotate: [78, -78, -78, 78] }}
        transition={{ duration: 3, times: [0, 0.4, 0.6, 1], repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx={380} cy={110} r={4} fill={ACCENT} />
      <text x={380} y={128} fill="var(--muted)" fontSize={10} textAnchor="middle" fontFamily="monospace">p99 latency ↓</text>
    </svg>
  );
}

// High reads: request fans out to cache + replicas ---------------------------
function Reads() {
  const read = { x: 20, y: 65, w: 90 };
  const cache = { x: 270, y: 65, w: 120 };
  const rep1 = { x: 540, y: 32, w: 120 };
  const rep2 = { x: 540, y: 98, w: 120 };
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="High read traffic served by cache and replicas">
      <line x1={read.x + read.w} y1={65} x2={cache.x} y2={65} stroke={BORDER} strokeWidth={1.5} />
      <line x1={cache.x + cache.w} y1={60} x2={rep1.x} y2={42} stroke={BORDER} strokeWidth={1.5} />
      <line x1={cache.x + cache.w} y1={70} x2={rep2.x} y2={98} stroke={BORDER} strokeWidth={1.5} />
      {/* hot path: cache hits */}
      <P2 x1={read.x + read.w} y1={65} x2={cache.x} y2={65} delay={0} dur={0.9} />
      <P2 x1={cache.x} y1={65} x2={read.x + read.w} y2={65} delay={0.5} dur={0.9} />
      <P2 x1={read.x + read.w} y1={65} x2={cache.x} y2={65} delay={1.1} dur={0.9} />
      {/* occasional miss to replica */}
      <P2 x1={cache.x + cache.w} y1={60} x2={rep1.x} y2={42} delay={1.6} dur={1} color="#e0a23c" />
      <Node x={read.x} y={read.y} w={read.w} label="reads" sub="millions/s" />
      <Node x={cache.x} y={cache.y} w={cache.w} label="Cache" sub="hot data" />
      <Node x={rep1.x} y={rep1.y} w={rep1.w} label="Replica 1" />
      <Node x={rep2.x} y={rep2.y} w={rep2.w} label="Replica 2" />
    </svg>
  );
}

// Sync vs async: blocking request/response vs fire-and-forget queue ----------
function SyncAsync() {
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="Synchronous versus asynchronous communication">
      {/* sync lane */}
      <text x={12} y={38} fill="#e0a23c" fontSize={11} fontWeight={600}>sync</text>
      <line x1={150} y1={32} x2={300} y2={32} stroke={BORDER} strokeWidth={1.5} />
      <P2 x1={150} y1={32} x2={300} y2={32} delay={0} dur={1} />
      <P2 x1={300} y1={32} x2={150} y2={32} delay={1.1} dur={1} color="#e0a23c" />
      <Node x={70} y={32} w={80} label="client" sub="blocked" />
      <Node x={300} y={32} w={90} label="service" />

      {/* async lane */}
      <text x={12} y={102} fill={ACCENT} fontSize={11} fontWeight={600}>async</text>
      <line x1={150} y1={96} x2={300} y2={96} stroke={BORDER} strokeWidth={1.5} />
      <line x1={390} y1={96} x2={520} y2={96} stroke={BORDER} strokeWidth={1.5} />
      <P2 x1={150} y1={96} x2={300} y2={96} delay={0.2} dur={0.9} />
      <P2 x1={390} y1={96} x2={520} y2={96} delay={0.9} dur={0.9} />
      <Node x={70} y={96} w={80} label="client" sub="continues" />
      <Node x={300} y={96} w={90} label="queue" />
      <Node x={520} y={96} w={100} label="consumer" />
    </svg>
  );
}

// Incident ownership: services across the fleet, one flips fail -> resolved --
function Incidents() {
  const xs = [40, 190, 340, 490, 640];
  const y = 58;
  const w = 80;
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="Production incidents resolved across distributed services">
      <text x={40} y={26} fill="var(--faint)" fontSize={10}>6+ distributed services</text>
      {xs.map((x, i) => (
        <Node key={i} x={x} y={y} w={w} label="svc" sub={`#${i + 1}`} />
      ))}
      {xs.map((x, i) => {
        const incident = i === 2;
        return (
          <motion.circle
            key={`d-${i}`}
            cx={x + 14}
            cy={y - 12}
            r={4}
            initial={{ fill: ACCENT }}
            animate={incident ? { fill: ["#ff5f56", "#ff5f56", ACCENT, ACCENT], scale: [1, 1.4, 1, 1] } : { fill: ACCENT }}
            transition={incident ? { duration: 2.4, times: [0, 0.4, 0.6, 1], repeat: Infinity } : {}}
            style={{ transformOrigin: `${x + 14}px ${y - 12}px` }}
          />
        );
      })}
      <text x={380} y={118} textAnchor="middle" fill="var(--muted)" fontSize={11} fontFamily="monospace">
        40+ P0/P1 · owned end-to-end
      </text>
    </svg>
  );
}

// Window-frame chrome shared by the product mockups -------------------------
function WindowFrame({ label }: { label: string }) {
  return (
    <g>
      <rect x={10} y={8} width={740} height={114} rx={12} fill="#0b0d11" stroke={BORDER} strokeWidth={1} />
      <line x1={10} y1={32} x2={750} y2={32} stroke={BORDER} strokeWidth={1} />
      <circle cx={28} cy={20} r={3.5} fill="#ff5f56" />
      <circle cx={42} cy={20} r={3.5} fill="#ffbd2e" />
      <circle cx={56} cy={20} r={3.5} fill="#27c93f" />
      <text x={74} y={24} fill="var(--faint)" fontSize={10} fontFamily="monospace">{label}</text>
    </g>
  );
}

// HeyDSA — the product screen: a prep roadmap progressing toward an offer ----
function Heydsa() {
  const cells = Array.from({ length: 7 }, (_, i) => 28 + i * 60);
  const cy = 70;
  const ch = 28;
  const trackW = 7 * 60 - 6;
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="HeyDSA product screen progressing a roadmap toward an offer">
      <WindowFrame label="heydsa.com" />
      <text x={28} y={50} fill="var(--muted)" fontSize={10} fontFamily="monospace">Target: Google · Day 12 / 45</text>
      {cells.map((x, i) => (
        <g key={i}>
          <motion.rect
            x={x} y={cy - ch / 2} width={54} height={ch} rx={7}
            stroke="var(--accent-dim)" strokeWidth={1}
            initial={{ fill: SURFACE2 }}
            animate={{ fill: [SURFACE2, "rgba(52,211,153,0.22)", "rgba(52,211,153,0.22)", SURFACE2] }}
            transition={{ duration: 4, times: [0, 0.1, 0.85, 1], delay: 0.3 + i * 0.3, repeat: Infinity }}
          />
          <motion.path
            d={`M ${x + 19} ${cy} l 4 5 l 9 -10`}
            fill="none" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4, times: [0, 0.12, 0.85, 1], delay: 0.3 + i * 0.3, repeat: Infinity }}
          />
        </g>
      ))}
      <rect x={28} y={98} width={trackW} height={6} rx={3} fill={SURFACE2} />
      <motion.rect
        x={28} y={98} height={6} rx={3} fill={ACCENT}
        initial={{ width: 0 }}
        animate={{ width: [0, trackW, trackW, 0] }}
        transition={{ duration: 4, times: [0, 0.85, 0.92, 1], repeat: Infinity, ease: "linear" }}
      />
      <rect x={470} y={58} width={250} height={28} rx={8} fill="rgba(52,211,153,0.10)" stroke="var(--accent-dim)" strokeWidth={1} />
      <text x={595} y={76} textAnchor="middle" fill={ACCENT} fontSize={11} fontWeight={600}>Interview-ready ★</text>
    </svg>
  );
}

// CreatorHQ — the product dashboard: deals managed + creator growth ----------
function Creatorhq() {
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="CreatorHQ product dashboard showing deals and creator growth">
      <WindowFrame label="CreatorHQ · dashboard" />
      {/* stat tiles */}
      <rect x={28} y={44} width={190} height={32} rx={7} fill={SURFACE2} stroke="var(--accent-dim)" strokeWidth={1} />
      <text x={40} y={58} fill="var(--muted)" fontSize={9}>active brand deals</text>
      <text x={40} y={71} fill={ACCENT} fontSize={13} fontWeight={700} fontFamily="monospace">12</text>
      <rect x={28} y={84} width={190} height={30} rx={7} fill={SURFACE2} stroke="var(--accent-dim)" strokeWidth={1} />
      <text x={40} y={97} fill="var(--muted)" fontSize={9}>revenue this month</text>
      <text x={40} y={110} fill={ACCENT} fontSize={12} fontWeight={700} fontFamily="monospace">▲ trending up</text>

      {/* growth chart */}
      <text x={250} y={50} fill="var(--faint)" fontSize={9} fontFamily="monospace">creator growth</text>
      <line x1={250} y1={110} x2={720} y2={110} stroke={BORDER} strokeWidth={1} />
      <motion.path
        d="M250 104 L320 96 L388 100 L456 80 L524 86 L592 60 L660 66 L720 44"
        fill="none" stroke={ACCENT} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 4, times: [0, 0.7, 0.9, 1], repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        r={4} fill={ACCENT}
        initial={{ cx: 250, cy: 104, opacity: 0 }}
        animate={{ cx: [250, 720], cy: [104, 44], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, times: [0, 0.1, 0.7, 0.9], repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

// Meeting intelligence: transcript -> SQS -> LLM -> attendees ---------------
function Meeting() {
  const y = 65;
  const nodes = [
    { x: 20, w: 110, label: "Transcript", sub: "live" },
    { x: 200, w: 90, label: "SQS", sub: "queue" },
    { x: 360, w: 110, label: "LangChain", sub: "LLM" },
    { x: 540, w: 120, label: "Attendees", sub: "summary" },
  ];
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="Meeting transcript through SQS and an LLM to attendees">
      {nodes.slice(0, -1).map((n, i) => (
        <Wire key={i} x1={n.x + n.w} x2={nodes[i + 1].x} y={y} />
      ))}
      {nodes.slice(0, -1).map((n, i) => (
        <Packet key={i} from={n.x + n.w} to={nodes[i + 1].x} y={y} delay={i * 0.3} />
      ))}
      {nodes.map((n) => (
        <Node key={n.label} x={n.x} y={y} w={n.w} label={n.label} sub={n.sub} />
      ))}
    </svg>
  );
}

// SplitWise: a debt graph collapsing to minimal settlements -----------------
function Splitwise() {
  const pts = [
    { x: 200, y: 30 },
    { x: 470, y: 30 },
    { x: 200, y: 100 },
    { x: 470, y: 100 },
  ];
  const before = [[0, 1], [1, 3], [3, 2], [2, 0], [0, 3]];
  const after = [[0, 3], [1, 3]];
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="Debt graph simplified to fewer settlements">
      {before.map(([a, b], i) => (
        <motion.line
          key={`b-${i}`}
          x1={pts[a].x} y1={pts[a].y} x2={pts[b].x} y2={pts[b].y}
          stroke="#e0a23c" strokeWidth={1.5}
          animate={{ opacity: [0.55, 0.55, 0, 0, 0.55] }}
          transition={{ duration: 4, times: [0, 0.25, 0.4, 0.85, 1], repeat: Infinity }}
        />
      ))}
      {after.map(([a, b], i) => (
        <motion.line
          key={`a-${i}`}
          x1={pts[a].x} y1={pts[a].y} x2={pts[b].x} y2={pts[b].y}
          stroke={ACCENT} strokeWidth={2.5}
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: 4, times: [0, 0.4, 0.5, 0.85, 1], repeat: Infinity }}
        />
      ))}
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={14} fill={SURFACE2} stroke="var(--accent-dim)" strokeWidth={1} />
          <text x={p.x} y={p.y + 4} textAnchor="middle" className="fill-foreground" fontSize={11} fontWeight={600}>
            {String.fromCharCode(65 + i)}
          </text>
        </g>
      ))}
      <text x={560} y={62} fill="var(--muted)" fontSize={11} fontFamily="monospace">5 debts</text>
      <text x={560} y={78} fill={ACCENT} fontSize={11} fontFamily="monospace">→ 2 settle</text>
    </svg>
  );
}

// Algoviz: bars sorting into order ------------------------------------------
function Algoviz() {
  const unsorted = [34, 58, 22, 70, 44, 64, 28, 52, 38, 66];
  const sorted = [...unsorted].sort((a, b) => a - b);
  const barW = 18;
  const gap = 8;
  const x0 = 250;
  const base = 112;
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="Bars sorting into order">
      <text x={20} y={62} fill="var(--muted)" fontSize={11} fontFamily="monospace">sorting</text>
      <text x={20} y={78} fill="var(--faint)" fontSize={11} fontFamily="monospace">+ search</text>
      {unsorted.map((u, i) => {
        const s = sorted[i];
        const x = x0 + i * (barW + gap);
        return (
          <motion.rect
            key={i}
            x={x} width={barW} rx={3} fill={ACCENT}
            initial={{ height: u, y: base - u }}
            animate={{ height: [u, s, s, u], y: [base - u, base - s, base - s, base - u] }}
            transition={{ duration: 4, times: [0, 0.45, 0.8, 1], repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}
    </svg>
  );
}

// URL shortener: long link -> short code -> redirect ------------------------
function Urlshort() {
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="Long URL shortened to a code and redirected">
      <rect x={20} y={40} width={300} height={30} rx={7} fill={SURFACE2} stroke="var(--accent-dim)" strokeWidth={1} />
      <text x={34} y={59} fill="var(--muted)" fontSize={10} fontFamily="monospace">site.com/very/long/path?q=…</text>

      <line x1={320} y1={55} x2={380} y2={55} stroke={BORDER} strokeWidth={1.5} />
      <Packet from={320} to={380} y={55} dur={1} />
      <Node x={380} y={55} w={86} label="encode" sub="hash" />
      <line x1={466} y1={55} x2={520} y2={55} stroke={BORDER} strokeWidth={1.5} />
      <Packet from={466} to={520} y={55} delay={0.5} dur={1} />

      <rect x={520} y={40} width={200} height={30} rx={7} fill="rgba(52,211,153,0.10)" stroke="var(--accent-dim)" strokeWidth={1} />
      <text x={620} y={59} textAnchor="middle" fill={ACCENT} fontSize={12} fontWeight={600} fontFamily="monospace">sho.rt/aB3x</text>

      {/* redirect back */}
      <motion.path
        d="M620 78 C 620 102, 180 102, 170 74"
        fill="none" stroke="var(--accent-dim)" strokeWidth={1.5} strokeDasharray="4 4"
        animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}
      />
      <text x={395} y={112} textAnchor="middle" fill="var(--faint)" fontSize={10} fontFamily="monospace">301 redirect</text>
    </svg>
  );
}

// Fan-out: one event -> many subscribers ------------------------------------
function Fanout() {
  const src = { x: 30, y: 65, w: 110 };
  const subs = [
    { label: "WebSocket", y: 22 },
    { label: "Email", y: 65 },
    { label: "Webhook", y: 108 },
  ];
  const sx = 540;
  const sw = 130;
  const sh = 26;
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="One event fanning out to many subscribers">
      {subs.map((s, i) => (
        <g key={i}>
          <line x1={src.x + src.w} y1={65} x2={sx} y2={s.y + sh / 2} stroke={BORDER} strokeWidth={1.5} />
          <P2 x1={src.x + src.w} y1={65} x2={sx} y2={s.y + sh / 2} delay={i * 0.25} dur={1} />
          <rect x={sx} y={s.y} width={sw} height={sh} rx={7} fill={SURFACE2} stroke="var(--accent-dim)" strokeWidth={1} />
          <text x={sx + sw / 2} y={s.y + 17} textAnchor="middle" className="fill-foreground" fontSize={10}>{s.label}</text>
        </g>
      ))}
      <Node x={src.x} y={src.y} w={src.w} label="1 event" sub="published" />
    </svg>
  );
}

// One interface fronting swappable backends (cache / storage adapters) -------
function Adapter({ center, backends }: { center: string; backends: string[] }) {
  const app = { x: 20, y: 65, w: 90 };
  const hub = { x: 210, y: 65, w: 160 };
  const ys = [22, 65, 108];
  const bx = 560;
  const bw = 175;
  const bh = 24;
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label={`${center} adapter fronting swappable backends`}>
      <line x1={app.x + app.w} y1={65} x2={hub.x} y2={65} stroke={BORDER} strokeWidth={1.5} />
      <Packet from={app.x + app.w} to={hub.x} y={65} />
      {backends.map((b, i) => (
        <g key={b}>
          <line x1={hub.x + hub.w} y1={65} x2={bx} y2={ys[i] + bh / 2} stroke={BORDER} strokeWidth={1.5} />
          <P2 x1={hub.x + hub.w} y1={65} x2={bx} y2={ys[i] + bh / 2} delay={i * 1.2} dur={1} />
          <motion.rect
            x={bx} y={ys[i]} width={bw} height={bh} rx={7}
            stroke="var(--accent-dim)" strokeWidth={1}
            initial={{ fill: SURFACE2 }}
            animate={{ fill: [SURFACE2, "rgba(52,211,153,0.22)", SURFACE2] }}
            transition={{ duration: 3.6, times: [i / 3, i / 3 + 0.12, i / 3 + 0.3], repeat: Infinity }}
          />
          <text x={bx + bw / 2} y={ys[i] + 16} textAnchor="middle" className="fill-foreground" fontSize={10}>{b}</text>
        </g>
      ))}
      <Node x={app.x} y={app.y} w={app.w} label="app" />
      <Node x={hub.x} y={hub.y} w={hub.w} label={center} sub="one interface" />
    </svg>
  );
}
// cache: fast hits, occasional miss to source, with a hit-rate bar ----------
function CacheAdapter() {
  const req = { x: 20, y: 46, w: 90 };
  const cache = { x: 270, y: 46, w: 150 };
  const src = { x: 600, y: 46, w: 120 };
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="Cache serving fast hits with occasional miss to source">
      <Wire x1={req.x + req.w} x2={cache.x} y={46} />
      <Wire x1={cache.x + cache.w} x2={src.x} y={46} />
      <Packet from={req.x + req.w} to={cache.x} y={46} dur={0.8} />
      <Packet from={cache.x} to={req.x + req.w} y={46} delay={0.9} dur={0.8} />
      <P2 x1={cache.x + cache.w} y1={46} x2={src.x} y2={46} delay={1.8} dur={1} color="#e0a23c" />
      <motion.text
        x={cache.x + cache.w / 2}
        y={20}
        textAnchor="middle"
        fill={ACCENT}
        fontSize={11}
        fontWeight={700}
        fontFamily="monospace"
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.8, times: [0, 0.1, 0.7, 1], repeat: Infinity }}
      >
        HIT
      </motion.text>
      <Node x={req.x} y={req.y} w={req.w} label="request" />
      <Node x={cache.x} y={cache.y} w={cache.w} label="Cache" sub="in-memory" />
      <Node x={src.x} y={src.y} w={src.w} label="source" sub="on miss" />
      <rect x={270} y={92} width={330} height={6} rx={3} fill={SURFACE2} />
      <rect x={270} y={92} width={310} height={6} rx={3} fill={ACCENT} />
      <text x={270} y={116} fill="var(--muted)" fontSize={10} fontFamily="monospace">94% hit rate</text>
    </svg>
  );
}
function StorageAdapter() {
  return <Adapter center="kasper-storage" backends={["Local FS", "S3", "Supabase"]} />;
}

// Idempotency: duplicate requests, executed once -----------------------------
function Idempotent() {
  const reqs = [24, 65, 106];
  const check = { x: 290, y: 65, w: 160 };
  const handler = { x: 560, y: 65, w: 150 };
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="Idempotent handler executing duplicate requests once">
      {reqs.map((y, i) => (
        <g key={i}>
          <line x1={130} y1={y} x2={check.x} y2={65} stroke={BORDER} strokeWidth={1.5} />
          <rect x={20} y={y - 12} width={110} height={24} rx={7} fill={SURFACE2} stroke="var(--accent-dim)" strokeWidth={1} />
          <text x={75} y={y + 4} textAnchor="middle" className="fill-foreground" fontSize={10} fontFamily="monospace">key=k</text>
          <P2 x1={130} y1={y} x2={check.x} y2={65} delay={i * 0.7} dur={0.9} color={i === 0 ? ACCENT : "#e0a23c"} />
        </g>
      ))}
      <line x1={check.x + check.w} y1={65} x2={handler.x} y2={65} stroke={BORDER} strokeWidth={1.5} />
      <Packet from={check.x + check.w} to={handler.x} y={65} delay={0.5} dur={0.9} />
      <Node x={check.x} y={check.y} w={check.w} label="idempotency" sub="dedupe by key" />
      <Node x={handler.x} y={handler.y} w={handler.w} label="handler" sub="runs once" />
      <text x={290} y={124} fill="var(--muted)" fontSize={10} fontFamily="monospace">1 run · 2 deduped</text>
    </svg>
  );
}

// Random forest: data -> trees -> aggregate -> score -------------------------
function RandomForest() {
  const ty = [28, 65, 102];
  const tx = 300;
  const agg = { x: 470, y: 65, w: 110 };
  const out = { x: 640, y: 65, w: 100 };
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="Random forest ensemble predicting a score">
      {ty.map((y, i) => (
        <g key={i}>
          <line x1={130} y1={65} x2={tx} y2={y} stroke={BORDER} strokeWidth={1.5} />
          <line x1={tx + 40} y1={y} x2={agg.x} y2={65} stroke={BORDER} strokeWidth={1.5} />
          <P2 x1={130} y1={65} x2={tx} y2={y} delay={i * 0.2} dur={0.9} />
          <P2 x1={tx + 40} y1={y} x2={agg.x} y2={65} delay={0.6 + i * 0.2} dur={0.9} />
          <polygon points={`${tx + 20},${y - 12} ${tx},${y + 8} ${tx + 40},${y + 8}`} fill={SURFACE2} stroke="var(--accent-dim)" strokeWidth={1} />
          <rect x={tx + 17} y={y + 8} width={6} height={7} fill="var(--accent-dim)" />
        </g>
      ))}
      <Node x={20} y={65} w={110} label="match data" sub="features" />
      <Node x={agg.x} y={agg.y} w={agg.w} label="aggregate" sub="avg of trees" />
      <line x1={agg.x + agg.w} y1={65} x2={out.x} y2={65} stroke={BORDER} strokeWidth={1.5} />
      <Packet from={agg.x + agg.w} to={out.x} y={65} delay={1.4} dur={0.8} />
      <Node x={out.x} y={out.y} w={out.w} label="score" sub="predicted" />
    </svg>
  );
}

// Regression: scattered points fit by a line -> price ------------------------
function Regression() {
  const pts = [
    [70, 100], [130, 92], [190, 96], [250, 80], [310, 84],
    [370, 70], [430, 66], [490, 58], [550, 54], [610, 44],
  ];
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="Regression line fitting points to predict house price">
      <line x1={50} y1={112} x2={680} y2={112} stroke={BORDER} strokeWidth={1} />
      <line x1={50} y1={20} x2={50} y2={112} stroke={BORDER} strokeWidth={1} />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3.5} fill="var(--muted)" />
      ))}
      <motion.path
        d="M60 104 L630 40"
        fill="none" stroke={ACCENT} strokeWidth={2.5} strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 4, times: [0, 0.6, 0.9, 1], repeat: Infinity, ease: "easeInOut" }}
      />
      <text x={650} y={42} fill={ACCENT} fontSize={11} fontFamily="monospace">price ↗</text>
      <text x={60} y={128} fill="var(--faint)" fontSize={10} fontFamily="monospace">compare ML models → best fit</text>
    </svg>
  );
}

// Achievements: a rising trajectory with milestones --------------------------
function Trajectory() {
  const milestones = [
    [70, 100], [210, 84], [350, 64], [490, 50], [630, 28],
  ];
  const d = `M ${milestones.map((m) => m.join(" ")).join(" L ")}`;
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="An upward achievement trajectory">
      <line x1={50} y1={112} x2={710} y2={112} stroke={BORDER} strokeWidth={1} />
      <motion.path
        d={d}
        fill="none" stroke={ACCENT} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 4.5, times: [0, 0.7, 0.92, 1], repeat: Infinity, ease: "easeInOut" }}
      />
      {milestones.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x} cy={y} r={5} fill={ACCENT}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.3, 1, 1, 0], opacity: [0, 1, 1, 1, 0] }}
          transition={{ duration: 4.5, times: [i * 0.14, i * 0.14 + 0.08, i * 0.14 + 0.14, 0.92, 1], repeat: Infinity }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}
      <text x={648} y={32} fill={ACCENT} fontSize={11} fontFamily="monospace">↗ onward</text>
    </svg>
  );
}

// websocket: a persistent connection with a message bouncing client<->server -
function Socket() {
  const client = { x: 60, y: 62, w: 120 };
  const server = { x: 560, y: 62, w: 140 };
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="Persistent WebSocket connection exchanging messages in real time">
      <line x1={client.x + client.w} y1={62} x2={server.x} y2={62} stroke={BORDER} strokeWidth={1.5} />
      <text x={(client.x + client.w + server.x) / 2} y={48} textAnchor="middle" fill="var(--faint)" fontSize={10} fontFamily="monospace">
        ⇄ realtime
      </text>
      <motion.circle
        r={4.5}
        fill={ACCENT}
        cy={62}
        animate={{ cx: [client.x + client.w, server.x] }}
        transition={{ duration: 0.9, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <Node x={client.x} y={client.y} w={client.w} label="client" sub="ws://" />
      <Node x={server.x} y={server.y} w={server.w} label="WS server" sub="rooms · presence" />
      <motion.circle
        cx={server.x + server.w - 14}
        cy={48}
        r={3}
        fill={ACCENT}
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </svg>
  );
}

// security: a guard validating + rate-limiting requests (some blocked) ------
function Security() {
  const src = { x: 20, y: 65, w: 110 };
  const gate = { x: 290, y: 65, w: 180 };
  const svc = { x: 600, y: 65, w: 130 };
  return (
    <svg viewBox="0 0 760 130" className="w-full" role="img" aria-label="Request guard validating and rate-limiting traffic">
      <Wire x1={src.x + src.w} x2={gate.x} y={65} />
      <Wire x1={gate.x + gate.w} x2={svc.x} y={65} />
      {/* valid traffic passes */}
      <Packet from={src.x + src.w} to={gate.x} y={65} delay={0} dur={0.8} />
      <Packet from={gate.x + gate.w} to={svc.x} y={65} delay={0.7} dur={0.8} />
      <Packet from={src.x + src.w} to={gate.x} y={65} delay={1.6} dur={0.8} />
      {/* blocked: bounced back in amber */}
      <P2 x1={gate.x} y1={65} x2={src.x + src.w} y2={65} delay={2.2} dur={0.7} color="#ff5f56" />
      <motion.text
        x={gate.x + gate.w / 2}
        y={22}
        textAnchor="middle"
        fill="#ff5f56"
        fontSize={11}
        fontWeight={700}
        fontFamily="monospace"
        animate={{ opacity: [0, 0, 1, 0] }}
        transition={{ duration: 3, times: [0, 0.6, 0.75, 1], repeat: Infinity }}
      >
        ✕ 429
      </motion.text>
      <Node x={src.x} y={src.y} w={src.w} label="requests" />
      <Node x={gate.x} y={gate.y} w={gate.w} label="guard" sub="validate · rate-limit" />
      <Node x={svc.x} y={svc.y} w={svc.w} label="service" sub="protected" />
    </svg>
  );
}

const MAP = {
  incidents: Incidents,
  heydsa: Heydsa,
  creatorhq: Creatorhq,
  socket: Socket,
  security: Security,
  meeting: Meeting,
  splitwise: Splitwise,
  algoviz: Algoviz,
  urlshort: Urlshort,
  fanout: Fanout,
  cacheadapter: CacheAdapter,
  storageadapter: StorageAdapter,
  idempotent: Idempotent,
  randomforest: RandomForest,
  regression: Regression,
  trajectory: Trajectory,
  batch: Batch,
  cdc: Cdc,
  collab: Collab,
  alert: Alert,
  txn: Txn,
  autocomplete: Autocomplete,
  latency: Latency,
  reads: Reads,
  syncasync: SyncAsync,
};

export default function StoryDiagram({ kind }: { kind: DiagramKind }) {
  const Cmp = MAP[kind];
  return (
    <div className="mb-4 overflow-hidden rounded-xl border border-border bg-background/60 p-3">
      <Cmp />
    </div>
  );
}
