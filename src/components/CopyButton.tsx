"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <button
      onClick={copy}
      aria-label="Copy to clipboard"
      className="shrink-0 rounded-md border border-border bg-surface-2 px-2.5 py-1 text-xs text-muted transition-colors hover:text-accent hover:border-accent-dim"
    >
      {copied ? "copied ✓" : "copy"}
    </button>
  );
}
