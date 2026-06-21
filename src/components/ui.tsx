import Link from "next/link";
import type { ReactNode } from "react";
import ScrambleText from "@/components/ScrambleText";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-border bg-surface-2 px-2 py-0.5 font-mono text-xs text-muted">
      {children}
    </span>
  );
}

// Wrapper for a dedicated page's content — leaves room for the fixed nav.
export function PageShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`mx-auto max-w-5xl px-5 pb-24 pt-16 sm:pt-20 ${className}`}>{children}</section>
  );
}

// Page header with a back-home link, index, kicker, title, and optional right slot.
export function PageHeader({
  num,
  title,
  kicker,
  right,
}: {
  num: string;
  title: string;
  kicker?: string;
  right?: ReactNode;
}) {
  return (
    <div className="mb-10">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
      >
        ← back home
      </Link>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-3 font-mono text-xs text-accent">
            <span>{num}</span>
            <span className="h-px w-8 bg-accent-dim" />
            {kicker && <span className="text-faint">{kicker}</span>}
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            <ScrambleText text={title} />
          </h1>
        </div>
        {right}
      </div>
    </div>
  );
}
