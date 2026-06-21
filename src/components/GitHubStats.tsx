"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

type Stats = { repos: number; followers: number; stars: number };

const USER = profile.socials.github.split("/").pop() ?? "";

export default function GitHubStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [u, repos] = await Promise.all([
          fetch(`https://api.github.com/users/${USER}`).then((r) => r.json()),
          fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`).then((r) =>
            r.json()
          ),
        ]);
        if (!alive) return;
        const stars = Array.isArray(repos)
          ? repos.reduce((s: number, r: { stargazers_count?: number }) => s + (r.stargazers_count ?? 0), 0)
          : 0;
        setStats({
          repos: u.public_repos ?? 0,
          followers: u.followers ?? 0,
          stars,
        });
      } catch {
        if (alive) setFailed(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (failed) return null;

  const cells = [
    { label: "public repos", value: stats?.repos },
    { label: "total stars", value: stats?.stars },
    { label: "followers", value: stats?.followers },
  ];

  return (
    <a
      href={profile.socials.github}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent-dim"
    >
      <div className="mb-4 flex items-center gap-2 font-mono text-xs text-faint">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        live from github · @{USER}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {cells.map((c) => (
          <div key={c.label}>
            <div className="font-mono text-2xl font-semibold text-accent">
              {c.value === undefined ? (
                <span className="inline-block h-7 w-10 animate-pulse rounded bg-surface-2" />
              ) : (
                c.value.toLocaleString()
              )}
            </div>
            <div className="mt-1 text-xs text-muted">{c.label}</div>
          </div>
        ))}
      </div>
    </a>
  );
}
