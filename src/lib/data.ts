// =============================================================================
// PORTFOLIO CONTENT — edit everything here. Components read from this file.
// =============================================================================

export const profile = {
  name: "Kunta Mallik Raj",
  title: "Backend Software Engineer",
  tagline:
    "I design and ship scalable, event-driven systems — and the products built on top of them.",
  bio: "I'm a backend software engineer focused on scalable, event-driven systems. I've shipped production infrastructure handling real-time pipelines at scale, founded products with real users, and I write about the engineering behind it all. I care about systems that hold up under load and code that's clean enough to defend in a code review.",
  location: "Hyderabad, India",
  openToWork: true,
  email: "kuntamallikraj@gmail.com",
  resumeUrl: "/resume.png",
  socials: {
    github: "https://github.com/KuntaMallikRaj",
    linkedin: "https://www.linkedin.com/in/kuntamallikraj/",
    leetcode: "https://leetcode.com/u/mallik_1503/",
    gfg: "https://www.geeksforgeeks.org/profile/kuntamallikraj",
  },
};

// Headline stats shown under the hero ----------------------------------------
export const stats: { value: string; label: string }[] = [
  { value: "5K+", label: "product page views" },
  { value: "1719", label: "LeetCode rating · top 12%" },
  { value: "1000+", label: "DSA problems solved" },
  { value: "2", label: "research publications" },
];

export const experience = {
  role: "Software Engineer I",
  company: "eSentire",
  type: "Remote",
  period: "May 2025 – Present",
  summary:
    "Backend engineer on a distributed, multi-tenant SOC platform — owning production reliability across real-time WebSocket pipelines, SNS messaging, and core microservices.",
  highlights: [
    {
      text: "Owned investigation and resolution of P0/P1 production incidents across distributed backend services — debugging failures spanning SNS pipelines, microservices, ServiceNow, and Slack integrations.",
      diagram: "incidents" as const,
    },
    {
      text: "Re-architected a multi-tenant WebSocket platform for real-time SOC collaboration — adding schema validation, backpressure handling, and Redis-backed session isolation for reliability under high concurrency.",
      diagram: "socket" as const,
    },
    {
      text: "Identified inefficient database queries and contention in DarkWeb asset-processing workflows, cutting 18+ second latency and improving production API response times.",
      diagram: "latency" as const,
    },
    {
      text: "Designed distributed state synchronization keeping “Awaiting Customer Actions” and findings status consistent across Executive Reports and live SOC dashboards.",
      diagram: "cdc" as const,
    },
    {
      text: "Implemented concurrent-editor detection with optimistic locking to prevent conflicting updates in collaborative investigation pipelines.",
      diagram: "collab" as const,
    },
    {
      text: "Strengthened platform security with input validation, rate limiting, and tenant-aware Redis session management in the socket services.",
      diagram: "security" as const,
    },
    {
      text: "Built event-driven backend workflows propagating severity, confidence, and category updates across SOC investigation pipelines.",
      diagram: "fanout" as const,
    },
  ],
};

// FOUNDED PRODUCTS -----------------------------------------------------------
export type Product = {
  name: string;
  tagline: string;
  role: string;
  description: string;
  metrics?: { value: string; label: string }[];
  stack: string[];
  links: { label: string; href: string }[];
  status?: "live" | "wip";
  diagram: "heydsa" | "creatorhq";
};

export const products: Product[] = [
  {
    name: "HeyDSA",
    diagram: "heydsa",
    tagline: "Company-wise DSA prep that actually gets you interview-ready.",
    role: "Founder",
    description:
      "Turns the chaos of DSA prep into a clear, day-by-day path. Pick your target company, follow a structured roadmap, and unlock each day as you make progress — covering 50+ companies across 5 languages. Built to keep learners consistent and focused instead of drowning in random problem lists.",
    metrics: [
      { value: "500+", label: "active users" },
      { value: "5K+", label: "page views" },
      { value: "10K+", label: "interactions" },
    ],
    stack: ["React", "TypeScript", "FastAPI", "SQLite", "Google OAuth", "Nginx", "Oracle Cloud"],
    links: [{ label: "Live · heydsa.com", href: "https://heydsa.com" }],
    status: "live",
  },
  {
    name: "CreatorHQ",
    diagram: "creatorhq",
    tagline: "The all-in-one operating system for Instagram creators.",
    role: "Founder",
    description:
      "Everything a creator needs to run their business in one place — track brand deals, see analytics, generate professional rate cards, and share a polished media kit with brands. Replaces the messy spreadsheet-and-DMs workflow creators juggle today with a single, organized home base.",
    stack: ["Next.js 14", "FastAPI", "Supabase", "Instagram API", "Netlify", "Render"],
    links: [{ label: "Live · createhq.netlify.app", href: "https://createhq.netlify.app/" }],
    status: "live",
  },
];

// DEVELOPER TOOLS (PyPI) -----------------------------------------------------
export type Tool = {
  name: string;
  install: string;
  description: string;
  links: { label: string; href: string }[];
  status: "live" | "soon";
  diagram: "cacheadapter" | "socket" | "idempotent";
};

export const tools: Tool[] = [
  {
    name: "kasper-cache",
    install: "pip install kasper-cache",
    description:
      "Pluggable cache adapter — swap Redis, in-memory, or Memcached behind one clean interface.",
    links: [{ label: "PyPI", href: "https://pypi.org/project/kasper-cache/" }],
    status: "live",
    diagram: "cacheadapter",
  },
  {
    name: "kasper-socket",
    install: "pip install kasper-socket",
    description:
      "Lightweight WebSocket service helper — manage connections and rooms, broadcast to subscribers, and track presence behind a clean async API.",
    links: [{ label: "PyPI", href: "https://pypi.org/project/kasper-socket/" }],
    status: "live",
    diagram: "socket",
  },
  {
    name: "kasper-idempotent",
    install: "pip install kasper-idempotent",
    description:
      "Idempotency-key decorator with a Redis backend for exactly-once event handlers.",
    links: [{ label: "PyPI", href: "https://pypi.org/project/kasper-idempotent/" }],
    status: "live",
    diagram: "idempotent",
  },
];

// PROJECTS -------------------------------------------------------------------
export type Project = {
  name: string;
  description: string;
  highlights: string[];
  stack: string[];
  links: { label: string; href: string }[];
  status: "live" | "wip";
  diagram: "meeting" | "splitwise" | "algoviz" | "urlshort" | "fanout";
};

export const projects: Project[] = [
  {
    name: "Real-Time Meeting Intelligence Pipeline",
    diagram: "meeting",
    description:
      "An LLM-powered pipeline that turns live meeting transcripts into structured summaries and action items, pushed to attendees in real time.",
    highlights: [
      "LangChain consumer processes queued transcript events and streams summaries over Socket.IO.",
      "CDC-driven event pipeline on Amazon SQS decouples ingestion from processing.",
      "Dead-letter queues, exponential-backoff retry, and idempotency keys for exactly-once, zero-loss processing.",
    ],
    stack: ["Python", "Flask", "Socket.IO", "SQS", "LangChain", "Redis"],
    links: [
      { label: "Live demo", href: "https://ai-meeting-minutes-2xc4.onrender.com" },
      { label: "GitHub", href: "https://github.com/KuntaMallikRaj/ai-meeting-minutes" },
    ],
    status: "live",
  },
  {
    name: "SplitWise — Expense Sharing with Debt Simplification",
    diagram: "splitwise",
    description:
      "A group expense-sharing platform with real-time balance computation and a graph-based debt-simplification engine.",
    highlights: [
      "Supports equal, exact, and percentage-based splits across group members.",
      "Models member balances as a graph and applies a greedy heap-based algorithm to minimize settlement transactions.",
    ],
    stack: ["FastAPI", "PostgreSQL", "Redis"],
    links: [
      { label: "Live demo", href: "https://split-wise-c77s.onrender.com" },
      { label: "GitHub", href: "https://github.com/KuntaMallikRaj/split-wise" },
    ],
    status: "live",
  },
  {
    name: "Algoviz — Algorithm Visualizer",
    diagram: "algoviz",
    description:
      "An interactive web app that teaches algorithms through animated, step-by-step visual demonstrations.",
    highlights: [
      "Visualizes sorting algorithms — bubble, selection, and merge sort.",
      "Visualizes search algorithms — linear and binary search.",
      "Built for learners, with guided animations for each algorithm.",
    ],
    // TODO: confirm exact stack + add GitHub repo link
    stack: ["JavaScript", "HTML", "CSS"],
    links: [{ label: "Live · algovizualization", href: "https://algovizualization.netlify.app/" }],
    status: "live",
  },
  {
    name: "URL Shortener",
    diagram: "urlshort",
    description:
      "A web service that turns long links into short, shareable codes and redirects visitors to the original URL.",
    highlights: [
      "Generates compact short codes and maps them back to the original URL.",
      "Handles redirects and basic link management through a simple web UI.",
    ],
    stack: ["Python", "Flask", "HTML"],
    links: [
      { label: "Live demo", href: "https://url-shortener-bck7.onrender.com" },
      { label: "GitHub", href: "https://github.com/KuntaMallikRaj/URLShortener" },
    ],
    status: "live",
  },
  {
    name: "fan-out-notifier — Event Fan-Out System",
    diagram: "fanout",
    description:
      "Pub/sub fan-out delivering one event to many subscribers over WebSocket, email, and webhooks, with retries and a DLQ.",
    highlights: [
      "One event → many subscribers across multiple channels.",
      "Retry + dead-letter handling for reliable delivery.",
    ],
    stack: ["FastAPI", "SQS/SNS", "WebSockets", "Redis"],
    links: [],
    status: "wip",
  },
];

// PRODUCTION STORIES — published engineering case studies --------------------
export const storiesBlogUrl = "https://productionstoriesbymallik.hashnode.dev";

export type Story = {
  title: string;
  context: string;
  summary: string;
  metric?: string;
  tags: string[];
  href: string;
  diagram: "batch" | "cdc" | "collab" | "alert";
};

export const stories: Story[] = [
  {
    title: "Reducing domain ingestion latency from 30s to 3s via data-model redesign",
    context: "Domain management platform · thousands of domains per org",
    summary:
      "A simple update was taking 30+ seconds — not from database capacity, but from how we talked to the database. Per-domain processing across thousands of domains was the bottleneck. A data-model redesign cut it to 3 seconds.",
    metric: "30s → 3s",
    tags: ["PostgreSQL", "Data Modeling", "Batch Processing", "Latency"],
    href: "https://productionstoriesbymallik.hashnode.dev/reducing-domain-ingestion-latency-from-30-seconds-to-3-seconds-through-data-model-redesign",
    diagram: "batch",
  },
  {
    title: "Eliminating full-page refreshes with CDC, SQS & WebSockets",
    context: "Operational dashboard · growing datasets",
    summary:
      "A single field update was refetching thousands of records — fetched, serialized, transmitted, and re-rendered. We replaced full-page refreshes with a CDC → SQS → WebSocket pipeline that pushes only the changes that matter.",
    tags: ["CDC", "SQS", "WebSockets", "Event-Driven"],
    href: "https://productionstoriesbymallik.hashnode.dev/from-full-page-refreshes-to-real-time-updates-how-cdc-sqs-and-websockets-eliminated-our-biggest-performance-bottleneck",
    diagram: "cdc",
  },
  {
    title: "Building a distributed real-time collaboration platform",
    context: "Multi-tenant collaboration layer · WebSockets + Redis",
    summary:
      "Users expect to see updates instantly — who's online, who's editing, what changed. We moved from API polling and periodic refreshes to true real-time collaboration with live presence and conflict-free concurrent editing.",
    tags: ["WebSockets", "Redis", "Presence", "Concurrency Control"],
    href: "https://productionstoriesbymallik.hashnode.dev/building-a-distributed-real-time-collaboration-platform-with-websockets-and-redis",
    diagram: "collab",
  },
  {
    title: "From reactive troubleshooting to proactive incident detection",
    context: "Hundreds of users across multiple services",
    summary:
      "In distributed systems, failure is inevitable — the real challenge is detecting it before customers feel it. We closed a critical operational gap with Grafana + Slack alerting that surfaces issues before they escalate.",
    tags: ["Grafana", "Observability", "Alerting", "Slack"],
    href: "https://productionstoriesbymallik.hashnode.dev/from-reactive-troubleshooting-to-proactive-incident-detection-implementing-grafana-slack-alerts-at-scale",
    diagram: "alert",
  },
];

// PUBLICATIONS ---------------------------------------------------------------
export type Publication = {
  title: string;
  venue: string;
  date?: string;
  status: "Published" | "Accepted" | "In progress";
  abstract: string;
  href?: string;
  diagram: "randomforest" | "regression" | "cdc";
};

export const publications: Publication[] = [
  {
    title: "IPL Score Prediction Using Random Forest",
    venue: "Atlantis Press",
    date: "Nov 4, 2025",
    status: "Published",
    diagram: "randomforest",
    abstract:
      "An automated system for predicting Indian Premier League (IPL) match scores using machine learning — specifically the Random Forest algorithm. It leverages statistical and historical data analysis to deliver precise, reliable score predictions without complex computation or intricate model training, using ensemble learning for accuracy.",
    href: "https://www.atlantis-press.com/proceedings/iccsce-25/126017490",
  },
  {
    title: "House Price Prediction Using Multiple Machine Learning Algorithms",
    venue: "IEEE",
    date: "Expected 2026",
    status: "Accepted",
    abstract:
      "A comparative study of multiple machine-learning algorithms for house-price prediction, evaluating model performance across approaches. Accepted; publication expected in 2026.",
    href: "https://github.com/KuntaMallikRaj/house_price_prediction/blob/main/docs/paper.pdf",
    diagram: "regression",
  },
  {
    title: "Targeted UI Updates over Change Data Capture: Refreshing Only What Changed to Reduce Latency",
    venue: "In progress",
    date: "2026",
    status: "In progress",
    abstract:
      "Instead of reloading an entire page on every change, this work propagates only the changed data through Change Data Capture to refresh a single UI section — eliminating redundant fetching, serialization, and re-rendering, and cutting perceived latency in real-time dashboards.",
    diagram: "cdc",
  },
];

// SKILLS ---------------------------------------------------------------------
export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["C++", "Java", "Python", "SQL"] },
  {
    group: "Backend",
    items: ["FastAPI", "Flask", "REST APIs", "WebSockets", "Socket.IO", "Redis", "PostgreSQL", "MySQL"],
  },
  {
    group: "Cloud & Tools",
    items: ["AWS (SQS, SNS, CloudWatch)", "Snowflake", "Docker", "CI/CD", "Grafana", "LangChain"],
  },
  {
    group: "Concepts",
    items: [
      "Distributed Systems",
      "Event-Driven Architecture",
      "CDC",
      "System Design",
      "Concurrency Control",
      "Rate Limiting",
    ],
  },
];

// WRITING (distributed-systems articles) -------------------------------------
export const articlesBlogUrl = "https://distributedsystemsbymallik.hashnode.dev";

export type Article = {
  title: string;
  context: string;
  summary: string;
  tags: string[];
  href: string;
  diagram: "txn" | "autocomplete" | "latency" | "reads" | "syncasync";
};

export const articles: Article[] = [
  {
    title: "Distributed Transactions in Distributed Systems",
    context: "Consistency · no single database to roll back",
    summary:
      "Monoliths get ACID for free — distributed systems don't. Why cross-service transactions are hard, and the patterns (2PC, Saga) that keep money moving correctly when there's no single database to roll back.",
    tags: ["2PC", "Saga", "ACID", "Consistency"],
    href: "https://distributedsystemsbymallik.hashnode.dev/distributed-transactions-in-distributed-systems",
    diagram: "txn",
  },
  {
    title: "Autocomplete in Distributed Systems",
    context: "Millions of concurrent users · billions of queries",
    summary:
      "Generating suggestions for a few users is easy; serving millions of concurrent users at single-digit-millisecond latency over billions of queries — with rankings updating in real time — is the real problem.",
    tags: ["Trie", "Caching", "Low Latency", "Ranking"],
    href: "https://distributedsystemsbymallik.hashnode.dev/autocomplete-in-distributed-systems",
    diagram: "autocomplete",
  },
  {
    title: "Top 15 Strategies to Reduce Latency in Distributed Systems",
    context: "A correct system is still unusable if it's slow",
    summary:
      "The real sources of latency — network calls, disk I/O, serialization, lock contention, cache misses, queue backlogs — and 15 concrete strategies to cut each one.",
    tags: ["Latency", "Caching", "Batching", "Performance"],
    href: "https://distributedsystemsbymallik.hashnode.dev/top-15-strategies-to-reduce-latency-in-distributed-systems",
    diagram: "latency",
  },
  {
    title: "Handling High Reads in Distributed Systems",
    context: "Feeds · catalogs · search · millions of reads/sec",
    summary:
      "Read-heavy systems face millions of reads/sec on the same hot data. Without the right layers the database becomes the bottleneck and failures cascade. How to absorb read load with caching and replicas.",
    tags: ["Read Replicas", "Caching", "Fan-out", "Scaling"],
    href: "https://distributedsystemsbymallik.hashnode.dev/handling-high-reads-in-distributed-systems",
    diagram: "reads",
  },
  {
    title: "Synchronous vs Asynchronous Communication in Microservices",
    context: "Scalability · latency · reliability trade-offs",
    summary:
      "Synchronous calls block on a response; async hands off and moves on. The choice directly shapes scalability, latency, and reliability — here's when to pick each in a microservices architecture.",
    tags: ["Microservices", "Messaging", "Queues", "Reliability"],
    href: "https://distributedsystemsbymallik.hashnode.dev/synchronous-vs-asynchronous-communication-in-microservices",
    diagram: "syncasync",
  },
];

export const achievements: string[] = [
  "Secured the highest placement package in my college batch.",
  "Became the #2 contributor in one team repository and #3 in another — within my first year on the team.",
  "LeetCode 1719 rating (top 12%) · 1000+ problems solved across platforms.",
  "Rank 1102 / 27,473 in LeetCode Biweekly Contest 143.",
  "GeeksforGeeks Institute Rank #1.",
  "Department Topper three consecutive years · awarded Silver Medal.",
  "2 research papers — 1 published (Atlantis Press), 1 accepted (2026).",
];

// OPEN SOURCE contributions --------------------------------------------------
export type Contribution = {
  repo: string;
  repoNote: string;
  title: string;
  summary: string;
  href: string;
  status: "merged" | "open";
};

export const openSource: Contribution[] = [
  {
    repo: "grimmory-tools/grimmory",
    repoNote: "community fork of Booklore · 3.5k★",
    title: "fix(author-browser): convert AuthorMatchComponent state to signals",
    summary:
      "Fixed author search not auto-loading results by migrating the component's state to reactive signals — a cleaner, conflict-free update path.",
    href: "https://github.com/grimmory-tools/grimmory/pull/1581",
    status: "merged",
  },
  {
    repo: "mxm-mrz/backend_failure_lab",
    repoNote: "real-world backend failure case studies",
    title: "Add Mermaid diagrams for the BFL-0002 N+1 queries case",
    summary:
      "Documented the N+1 query failure case with clear Mermaid diagrams explaining how the problem arises and how it's resolved.",
    href: "https://github.com/mxm-mrz/backend_failure_lab/pull/3",
    status: "merged",
  },
  {
    repo: "carlos-emr/carlos",
    repoNote: "open-source Canadian EMR · HL7/FHIR · Spring",
    title: "fix: enable RateLimitFilter by default when WAF_RATE_LIMIT_ENABLED is absent",
    summary:
      "Made rate limiting secure-by-default — the WAF filter now engages when the config flag is absent, closing a gap where traffic could go unthrottled.",
    href: "https://github.com/carlos-emr/carlos/pull/2414",
    status: "open",
  },
  {
    repo: "ReginaldErzoah/Aniwa",
    repoNote: "open-source dataset profiling tool",
    title: "Add docstring to read_dataset() in io/readers.py",
    summary: "Documented the dataset reader's public API to improve contributor experience.",
    href: "https://github.com/ReginaldErzoah/Aniwa/pull/59",
    status: "merged",
  },
];

// LeetCode highlight stats (real, from profile) ------------------------------
export const leetcodeStats: { value: string; label: string }[] = [
  { value: "1719", label: "contest rating · top 12%" },
  { value: "1000+", label: "problems solved" },
  { value: "1102", label: "best contest rank" },
];

export const nav = [
  { label: "Products", href: "/products" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Tools", href: "/tools" },
  { label: "Stories", href: "/stories" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Cards on the home page that link to each dedicated page --------------------
import type { HomeVizKind } from "@/components/HomeViz";

export type SiteSection = {
  num: string;
  label: string;
  href: string;
  blurb: string;
  meta: string;
  viz: HomeVizKind;
};

export const siteSections: SiteSection[] = [
  { num: "01", label: "Founded products", href: "/products", blurb: "Products I built and shipped to real users.", meta: `${products.length} live`, viz: "orbit" },
  { num: "02", label: "Experience", href: "/experience", blurb: "Production work — incidents, real-time pipelines, scale.", meta: experience.company, viz: "radar" },
  { num: "03", label: "Projects", href: "/projects", blurb: "Backend & systems projects I build.", meta: `${projects.length} projects`, viz: "bars" },
  { num: "04", label: "Developer tools", href: "/tools", blurb: "pip-installable libraries for backend teams.", meta: `${tools.length} tools`, viz: "terminal" },
  { num: "05", label: "Production stories", href: "/stories", blurb: "Published engineering case studies.", meta: `${stories.length} case studies`, viz: "wave" },
  { num: "06", label: "Technical writing", href: "/writing", blurb: "Distributed-systems deep-dives.", meta: `${articles.length} articles`, viz: "doc" },
  { num: "07", label: "Publications", href: "/publications", blurb: "Peer-reviewed machine-learning research.", meta: `${publications.length} papers`, viz: "atom" },
  { num: "08", label: "About & achievements", href: "/about", blurb: "Stack, achievements, and what I'm about.", meta: "profile", viz: "grid" },
  { num: "09", label: "Contact", href: "/contact", blurb: "Let's talk — I'm open to work.", meta: "get in touch", viz: "ripple" },
];
