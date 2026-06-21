"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, profile } from "@/lib/data";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || pathname !== "/"
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
        <Link href="/" className="font-mono text-sm font-medium tracking-tight">
          <span className="text-accent">~/</span>
          {profile.name.split(" ")[0].toLowerCase()}
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-sm transition-colors ${
                isActive(item.href) ? "text-accent" : "text-muted hover:text-foreground"
              }`}
            >
              {item.label}
              {isActive(item.href) && <span className="absolute -bottom-1.5 left-0 h-px w-full bg-accent" />}
            </Link>
          ))}
          <a
            href={profile.resumeUrl}
            className="rounded-md border border-accent-dim bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
          >
            Resume
          </a>
        </div>

        <button className="md:hidden text-muted" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 px-5 py-3 md:hidden">
          <div className="flex flex-col gap-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm ${isActive(item.href) ? "text-accent" : "text-muted hover:text-foreground"}`}
              >
                {item.label}
              </Link>
            ))}
            <a href={profile.resumeUrl} className="text-sm font-medium text-accent">
              Resume ↓
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
