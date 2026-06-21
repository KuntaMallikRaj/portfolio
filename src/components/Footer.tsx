import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
        <p className="font-mono text-xs text-faint">
          © {new Date().getFullYear()} {profile.name} · built with Next.js
        </p>
        <div className="flex gap-5 text-sm text-muted">
          <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            GitHub
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            LinkedIn
          </a>
          <a href={profile.socials.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            LeetCode
          </a>
          <a href={profile.socials.gfg} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            GfG
          </a>
        </div>
      </div>
    </footer>
  );
}
