"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { nav, profile } from "@/lib/data";

type Item = { label: string; hint: string; action: () => void };

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const items: Item[] = useMemo(() => {
    const go = (href: string) => () => {
      setOpen(false);
      router.push(href);
    };
    const ext = (href: string) => () => {
      setOpen(false);
      window.open(href, "_blank", "noopener,noreferrer");
    };
    return [
      { label: "Go to Home", hint: "page", action: go("/") },
      ...nav.map((n) => ({ label: `Go to ${n.label}`, hint: "page", action: go(n.href) })),
      { label: "Open source", hint: "page", action: go("/open-source") },
      { label: "Publications", hint: "page", action: go("/publications") },
      { label: "About & achievements", hint: "page", action: go("/about") },
      { label: "Download résumé", hint: "file", action: ext(profile.resumeUrl) },
      { label: "Email me", hint: "mailto", action: () => { setOpen(false); window.location.href = `mailto:${profile.email}`; } },
      { label: "GitHub", hint: "external", action: ext(profile.socials.github) },
      { label: "LinkedIn", hint: "external", action: ext(profile.socials.linkedin) },
      { label: "LeetCode", hint: "external", action: ext(profile.socials.leetcode) },
      { label: "GeeksforGeeks", hint: "external", action: ext(profile.socials.gfg) },
    ];
  }, [router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.label.toLowerCase().includes(q));
  }, [items, query]);

  // global open shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  function onListKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.action();
    }
  }

  return (
    <>
      {/* floating hint button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-lg border border-border bg-surface/90 px-3 py-2 font-mono text-xs text-muted shadow-lg shadow-black/30 backdrop-blur transition-colors hover:border-accent-dim hover:text-accent"
      >
        <kbd className="rounded border border-border bg-surface-2 px-1.5 py-0.5">⌘</kbd>
        <kbd className="rounded border border-border bg-surface-2 px-1.5 py-0.5">K</kbd>
        <span>command</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-start justify-center bg-black/60 px-4 pt-[18vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={onListKey}
              className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-black/50"
            >
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section or link…"
                className="w-full border-b border-border bg-transparent px-4 py-3.5 font-mono text-sm text-foreground outline-none placeholder:text-faint"
              />
              <ul className="max-h-72 overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <li className="px-3 py-6 text-center font-mono text-xs text-faint">no matches</li>
                )}
                {filtered.map((item, i) => (
                  <li key={item.label}>
                    <button
                      onMouseEnter={() => setActive(i)}
                      onClick={item.action}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        i === active ? "bg-accent/10 text-accent" : "text-foreground/85"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-[10px] text-faint">{item.hint}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
