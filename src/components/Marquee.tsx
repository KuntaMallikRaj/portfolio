"use client";

// Infinite horizontal belt of tech, edges faded into the background.
const ITEMS = [
  "FastAPI", "Python", "Redis", "PostgreSQL", "WebSockets", "AWS SQS", "AWS SNS",
  "Socket.IO", "LangChain", "Snowflake", "Docker", "CDC", "Event-Driven",
  "Distributed Systems", "Concurrency", "Grafana", "C++", "Java",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-border bg-surface/40 py-4">
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(90deg, var(--background), transparent 12%, transparent 88%, var(--background))",
        }}
      />
      <div className="marquee-track flex w-max gap-3">
        {row.map((t, i) => (
          <span
            key={i}
            className="rounded-md border border-border bg-surface-2 px-3 py-1.5 font-mono text-xs text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
