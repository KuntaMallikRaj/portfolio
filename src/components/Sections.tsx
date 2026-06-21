import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import StoryDiagram from "@/components/StoryDiagram";
import CopyButton from "@/components/CopyButton";
import AnimatedCounter from "@/components/AnimatedCounter";
import LeetCodeStats from "@/components/LeetCodeStats";
import HomeViz, { type HomeVizKind } from "@/components/HomeViz";
import ScrambleText from "@/components/ScrambleText";

const SKILL_VIZ: HomeVizKind[] = ["terminal", "wave", "radar", "atom"];
import { Tag, PageShell, PageHeader } from "@/components/ui";
import {
  profile,
  experience,
  products,
  tools,
  projects,
  stories,
  storiesBlogUrl,
  articlesBlogUrl,
  publications,
  skills,
  articles,
  achievements,
  openSource,
} from "@/lib/data";

export type SectionVariant = "page" | "inline";
type SectionProps = { variant?: SectionVariant };

function HashnodeLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mb-1 shrink-0 font-mono text-xs text-muted transition-colors hover:text-accent"
    >
      {label} ↗
    </a>
  );
}

// Renders a section either as a standalone page or inline on the landing page.
function SectionFrame({
  variant,
  id,
  num,
  title,
  kicker,
  right,
  children,
}: {
  variant: SectionVariant;
  id: string;
  num: string;
  title: string;
  kicker?: string;
  right?: ReactNode;
  children: ReactNode;
}) {
  if (variant === "inline") {
    return (
      <section id={id} className="mx-auto max-w-5xl scroll-mt-20 px-5 py-16 sm:py-20">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-3 font-mono text-xs text-accent">
                <span>{num}</span>
                <span className="h-px w-8 bg-accent-dim" />
                {kicker && <span className="text-faint">{kicker}</span>}
              </div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                <ScrambleText text={title} />
              </h2>
            </div>
            {right}
          </div>
        </Reveal>
        {children}
      </section>
    );
  }
  return (
    <PageShell>
      <Reveal>
        <PageHeader num={num} title={title} kicker={kicker} right={right} />
      </Reveal>
      {children}
    </PageShell>
  );
}

// 01 — FOUNDED PRODUCTS ------------------------------------------------------
export function ProductsSection({ variant = "page" }: SectionProps = {}) {
  return (
    <SectionFrame variant={variant} id="products" num="01" title="Founded products" kicker="shipped & live">
      <div className="grid gap-5">
        {products.map((p, i) => (
          <Reveal key={p.name} delay={i * 80}>
            <SpotlightCard tilt={false} className="p-6 sm:p-8">
              <StoryDiagram kind={p.diagram} />
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold">{p.name}</h3>
                    <span className="rounded-full border border-accent-dim bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-accent">
                      {p.role.split("·")[0].trim()}
                    </span>
                  </div>
                  <p className="mt-1 text-muted">{p.tagline}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-border bg-surface-2 px-3 py-1.5 text-sm text-foreground transition-colors hover:border-accent-dim hover:text-accent"
                    >
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              </div>

              <p className="mt-4 max-w-2xl leading-relaxed text-foreground/85">{p.description}</p>

              {p.metrics && (
                <div className="mt-6 flex flex-wrap gap-6">
                  {p.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="font-mono text-lg font-semibold text-accent">
                        <AnimatedCounter value={m.value} />
                      </div>
                      <div className="text-xs text-muted">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <p className="mt-6 font-mono text-xs text-faint">built with {p.stack.join(" · ")}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}

// 02 — EXPERIENCE ------------------------------------------------------------
export function ExperienceSection({ variant = "page" }: SectionProps = {}) {
  return (
    <SectionFrame variant={variant} id="experience" num="02" title="Experience" kicker="production, at scale">
      <Reveal className="mb-5">
        <SpotlightCard tilt={false} className="p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-xl font-semibold">
              {experience.role} · <span className="text-accent">{experience.company}</span>
            </h3>
            <span className="font-mono text-sm text-muted">
              {experience.period} · {experience.type}
            </span>
          </div>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">{experience.summary}</p>
        </SpotlightCard>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2">
        {experience.highlights.map((h, i) => (
          <Reveal key={h.text} delay={i * 70}>
            <SpotlightCard className="flex h-full flex-col p-6">
              <StoryDiagram kind={h.diagram} />
              <p className="text-sm leading-relaxed text-foreground/85">{h.text}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}

// 03 — PROJECTS --------------------------------------------------------------
export function ProjectsSection({ variant = "page" }: SectionProps = {}) {
  return (
    <SectionFrame variant={variant} id="projects" num="03" title="Projects" kicker="things I build">
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 70}>
            <SpotlightCard className="flex h-full flex-col p-6">
              <StoryDiagram kind={p.diagram} />
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold leading-snug">{p.name}</h3>
                {p.status === "wip" && (
                  <span className="shrink-0 rounded-full border border-border bg-surface-2 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-faint">
                    in progress
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
              <ul className="mt-4 space-y-2">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-xs leading-relaxed text-foreground/75">
                    <span className="text-accent">›</span>
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <div className="mt-5 flex gap-3 border-t border-border pt-4">
                {p.links.length > 0 ? (
                  p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground transition-colors hover:text-accent"
                    >
                      {l.label} ↗
                    </a>
                  ))
                ) : (
                  <span className="text-sm text-faint">links coming soon</span>
                )}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}

// 04 — DEV TOOLS -------------------------------------------------------------
export function ToolsSection({ variant = "page" }: SectionProps = {}) {
  return (
    <SectionFrame variant={variant} id="tools" num="04" title="Developer tools" kicker="pip-installable">
      <div className="grid gap-5 sm:grid-cols-3">
        {tools.map((t, i) => (
          <Reveal key={t.name} delay={i * 70}>
            <SpotlightCard className="flex h-full flex-col p-6">
              <StoryDiagram kind={t.diagram} />
              <h3 className="font-mono font-semibold text-accent">{t.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{t.description}</p>
              <div className="mt-4 flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2">
                <code className="flex-1 truncate font-mono text-xs text-foreground/80">$ {t.install}</code>
                <CopyButton text={t.install} />
              </div>
              {t.links.length > 0 && (
                <div className="mt-3 flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    live on pypi
                  </span>
                  {t.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-muted transition-colors hover:text-accent"
                    >
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}

// 05 — PRODUCTION STORIES ----------------------------------------------------
export function StoriesSection({ variant = "page" }: SectionProps = {}) {
  return (
    <SectionFrame
      variant={variant}
      id="stories"
      num="05"
      title="Production stories"
      kicker="published engineering case studies"
      right={<HashnodeLink href={storiesBlogUrl} label="all stories on Hashnode" />}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {stories.map((s, i) => (
          <Reveal key={s.title} delay={i * 70}>
            <SpotlightCard as="div" className="flex h-full flex-col p-6 sm:p-7">
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="flex h-full flex-col">
                <StoryDiagram kind={s.diagram} />
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-xs text-faint">{s.context}</p>
                  {s.metric && (
                    <span className="shrink-0 rounded-full border border-accent-dim bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-medium text-accent">
                      {s.metric}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-accent">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <span className="mt-5 border-t border-border pt-4 text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                  Read the full story ↗
                </span>
              </a>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}

// 06 — TECHNICAL WRITING -----------------------------------------------------
export function WritingSection({ variant = "page" }: SectionProps = {}) {
  return (
    <SectionFrame
      variant={variant}
      id="writing"
      num="06"
      title="Technical writing"
      kicker="distributed-systems deep-dives"
      right={<HashnodeLink href={articlesBlogUrl} label="all articles on Hashnode" />}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {articles.map((a, i) => (
          <Reveal key={a.href} delay={i * 70}>
            <SpotlightCard as="div" className="flex h-full flex-col p-6 sm:p-7">
              <a href={a.href} target="_blank" rel="noopener noreferrer" className="flex h-full flex-col">
                <StoryDiagram kind={a.diagram} />
                <p className="font-mono text-xs text-faint">{a.context}</p>
                <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-accent">{a.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{a.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {a.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <span className="mt-5 border-t border-border pt-4 text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                  Read the article ↗
                </span>
              </a>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}

// 07 — OPEN SOURCE -----------------------------------------------------------
export function OpenSourceSection({ variant = "page" }: SectionProps = {}) {
  const badge = (status: (typeof openSource)[number]["status"]) => {
    if (status === "open") return { label: "open", cls: "border-border bg-surface-2 text-faint" };
    return { label: status === "published" ? "✓ published" : "✓ merged", cls: "border-accent-dim bg-accent/10 text-accent" };
  };
  return (
    <SectionFrame variant={variant} id="open-source" num="07" title="Open source" kicker="merged PRs & published work">
      <div className="grid gap-4 sm:grid-cols-2">
        {openSource.map((c, i) => {
          const b = badge(c.status);
          return (
            <Reveal key={c.href} delay={i * 60}>
              <a href={c.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                <SpotlightCard as="div" className="flex h-full flex-col p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-sm text-accent">{c.repo}</span>
                    <span className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${b.cls}`}>
                      {b.label}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-faint">{c.repoNote}</p>
                  <p className="mt-3 font-mono text-sm text-foreground/90">{c.title}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.summary}</p>
                  <span className="mt-4 inline-block border-t border-border pt-4 text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                    {c.status === "published" ? "Read the article ↗" : "View pull request ↗"}
                  </span>
                </SpotlightCard>
              </a>
            </Reveal>
          );
        })}
      </div>
    </SectionFrame>
  );
}

// 08 — PUBLICATIONS ----------------------------------------------------------
export function PublicationsSection({ variant = "page" }: SectionProps = {}) {
  return (
    <SectionFrame variant={variant} id="publications" num="08" title="Publications" kicker="peer-reviewed research">
      <div className="grid gap-5">
        {publications.map((p, i) => (
          <Reveal key={p.title} delay={i * 80}>
            <SpotlightCard as="div" tilt={false} className="p-6 sm:p-7">
              <StoryDiagram kind={p.diagram} />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-xs text-faint">
                  {p.venue}
                  {p.date ? ` · ${p.date}` : ""}
                </p>
                <span
                  className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${
                    p.status === "Published"
                      ? "border-accent-dim bg-accent/10 text-accent"
                      : p.status === "Accepted"
                        ? "border-border bg-surface-2 text-faint"
                        : "border-[#e0a23c]/40 bg-[#e0a23c]/10 text-[#e0a23c]"
                  }`}
                >
                  {p.status === "Published" ? "published" : p.status === "Accepted" ? "accepted" : "in progress"}
                </span>
              </div>
              <h3 className="mt-2 text-lg font-semibold leading-snug">{p.title}</h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{p.abstract}</p>
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block border-t border-border pt-4 text-sm font-medium text-foreground transition-colors hover:text-accent"
                >
                  Show publication ↗
                </a>
              )}
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}

// 09 — ABOUT & ACHIEVEMENTS --------------------------------------------------
export function AboutSection({ variant = "page" }: SectionProps = {}) {
  return (
    <SectionFrame variant={variant} id="about" num="09" title="About & achievements" kicker="who I am · the track record">
      {/* intro: bio + leetcode highlight */}
      <div className="mb-12 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <SpotlightCard as="div" tilt={false} className="h-full p-6 sm:p-8">
            <p className="font-mono text-xs text-accent">{"// whoami"}</p>
            <p className="mt-4 text-lg leading-relaxed text-foreground/90">{profile.bio}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Tag>{profile.title}</Tag>
              <Tag>{profile.location}</Tag>
              <Tag>open to work</Tag>
            </div>
          </SpotlightCard>
        </Reveal>
        <Reveal delay={80}>
          <LeetCodeStats />
        </Reveal>
      </div>

      {/* stack */}
      <Reveal>
        <h3 className="mb-1 text-xl font-semibold tracking-tight">Stack &amp; skills</h3>
        <p className="mb-5 font-mono text-xs text-faint">what I work with</p>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 60}>
            <SpotlightCard as="div" className="p-6">
              <HomeViz kind={SKILL_VIZ[i % SKILL_VIZ.length]} />
              <h3 className="font-mono text-sm text-accent">{g.group}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      {/* achievements */}
      <Reveal className="mt-12">
        <h3 className="mb-1 text-xl font-semibold tracking-tight">Achievements</h3>
        <p className="mb-5 font-mono text-xs text-faint">the track record</p>
        <StoryDiagram kind="trajectory" />
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal key={a} delay={i * 60}>
            <SpotlightCard as="div" className="relative h-full overflow-hidden p-6">
              <span className="pointer-events-none absolute -right-1 -top-3 select-none font-mono text-6xl font-bold text-accent/10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="relative text-sm leading-relaxed text-foreground/90">{a}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}

// 10 — CONTACT ---------------------------------------------------------------
export function ContactSection({ variant = "page" }: SectionProps = {}) {
  return (
    <SectionFrame variant={variant} id="contact" num="10" title="Contact" kicker="let's talk">
      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        {/* CTA */}
        <Reveal>
          <SpotlightCard as="div" tilt={false} className="glow flex h-full flex-col justify-center p-8 sm:p-10">
            <p className="inline-flex items-center gap-2 font-mono text-xs text-accent">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              open to work
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              Building something that needs to scale?
            </h3>
            <p className="mt-3 max-w-md leading-relaxed text-muted">{profile.bio}</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-[#06281d] transition-opacity hover:opacity-90"
            >
              {profile.email} →
            </a>
          </SpotlightCard>
        </Reveal>

        {/* social cards */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "LinkedIn", handle: "in/kuntamallikraj", href: profile.socials.linkedin, slug: "linkedin" },
            { label: "GitHub", handle: "@KuntaMallikRaj", href: profile.socials.github, slug: "github" },
            { label: "LeetCode", handle: "@mallik_1503 · 1719", href: profile.socials.leetcode, slug: "leetcode" },
            { label: "GeeksforGeeks", handle: "rank #1 · institute", href: profile.socials.gfg, slug: "geeksforgeeks" },
          ].map((s, i) => (
            <Reveal key={s.href} delay={i * 60}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                <SpotlightCard className="flex h-full flex-col justify-between p-5">
                  <div className="flex items-center justify-between">
                    {s.slug === "linkedin" ? (
                      <svg
                        viewBox="0 0 24 24"
                        className="h-6 w-6 fill-muted opacity-80 transition group-hover:opacity-100"
                        aria-label="LinkedIn logo"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                      </svg>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`https://cdn.simpleicons.org/${s.slug}/8b919e`}
                        alt={`${s.label} logo`}
                        width={26}
                        height={26}
                        className="h-6 w-6 opacity-80 transition group-hover:opacity-100"
                      />
                    )}
                    <span className="text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-accent">↗</span>
                  </div>
                  <div className="mt-5">
                    <p className="font-mono text-sm text-accent">{s.label}</p>
                    <p className="mt-0.5 font-mono text-xs text-muted">{s.handle}</p>
                  </div>
                </SpotlightCard>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
