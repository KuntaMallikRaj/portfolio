"use client";

import AnimatedCounter from "@/components/AnimatedCounter";
import { profile, leetcodeStats } from "@/lib/data";

const USER = profile.socials.leetcode.replace(/\/$/, "").split("/").pop() ?? "";

export default function LeetCodeStats() {
  return (
    <a
      href={profile.socials.leetcode}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent-dim"
    >
      <div className="mb-4 flex items-center gap-2 font-mono text-xs text-faint">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        leetcode · @{USER}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {leetcodeStats.map((c) => (
          <div key={c.label}>
            <div className="font-mono text-2xl font-semibold text-accent">
              <AnimatedCounter value={c.value} />
            </div>
            <div className="mt-1 text-xs leading-snug text-muted">{c.label}</div>
          </div>
        ))}
      </div>
    </a>
  );
}
