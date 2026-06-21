import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import AnimatedCounter from "@/components/AnimatedCounter";
import ApiExchange from "@/components/ApiExchange";
import Carousel from "@/components/Carousel";
import { profile, stats } from "@/lib/data";

export default function Home() {
  return (
    <section className="relative mx-auto max-w-5xl px-5 pb-16 pt-20">
      {/* aurora */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden">
        <span className="aurora left-[6%] top-[12%] h-64 w-64 bg-accent/25" />
        <span className="aurora right-[8%] top-[6%] h-72 w-72 bg-emerald-500/15" style={{ animationDelay: "-6s" }} />
        <span className="aurora bottom-[10%] left-[44%] h-56 w-56 bg-teal-400/15" style={{ animationDelay: "-11s" }} />
      </div>

      {/* hero: identity + terminal */}
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              {profile.openToWork ? "Open to backend / distributed-systems roles" : profile.location}
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">{profile.name}</h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-3 font-mono text-base text-accent sm:text-lg">{profile.title}</p>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-xl leading-relaxed text-muted">{profile.tagline}</p>
          </Reveal>

          <Reveal delay={240}>
            <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {stats.map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <dt className="font-mono text-lg font-semibold text-accent">
                    <AnimatedCounter value={s.value} duration={2.6} />
                  </dt>
                  <dd className="text-[11px] leading-tight text-faint">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href={profile.resumeUrl}
                  download="Kunta-Mallik-Raj-Resume.png"
                  className="inline-block rounded-md bg-accent px-4 py-2 text-sm font-medium text-[#06281d] transition-opacity hover:opacity-90"
                >
                  Download résumé ↓
                </a>
              </Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent-dim"
              >
                Email me
              </a>
              <span className="hidden font-mono text-xs text-faint sm:inline">
                or <kbd className="rounded border border-border bg-surface-2 px-1">⌘K</kbd>
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <ApiExchange />
        </Reveal>
      </div>

      {/* rotating coverflow of sections */}
      <div className="mt-16">
        <Reveal>
          <p className="mb-8 text-center font-mono text-xs text-faint">~ swipe through the work</p>
        </Reveal>
        <Reveal delay={80}>
          <Carousel />
        </Reveal>
      </div>
    </section>
  );
}
