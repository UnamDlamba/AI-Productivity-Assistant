import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  MessageSquare,
  BarChart3,
  Hash,
  Mail,
  Lightbulb,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MarketMate AI — Your marketing workflow, powered by AI" },
      { name: "description", content: "Create content, manage campaigns, organize tasks, summarize meetings, and generate professional communications from one intelligent AI workspace." },
    ],
  }),
  component: Landing,
});

const pills = ["Brands", "Agencies", "Clients", "Teams", "Freelancers", "Creators", "Students"];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top nav */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#tools" className="hover:text-foreground">Tools</a>
          <a href="#workflow" className="hover:text-foreground">Workflow</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="hidden text-sm font-semibold text-foreground hover:text-primary sm:inline">
            Log in
          </Link>
          <Link
            to="/dashboard"
            className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90"
          >
            Open workspace
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-6 pt-10 pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground shadow-soft">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-3 w-3" />
              </span>
              Now with AI Assistant v2
            </div>

            <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[78px]">
              Your <span className="text-primary">marketing</span><br />
              workflow,<br />
              automated.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Create content, manage campaigns, organize tasks, summarize meetings, and generate
              professional communications from one intelligent AI workspace.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:translate-y-[-1px]"
              >
                Start for free <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#tools"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                See the tools
              </a>
            </div>

            {/* Pills */}
            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Built for</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {pills.map((p, i) => {
                  const tones = [
                    "bg-tile-pink text-tile-pink-ink",
                    "bg-tile-blue text-tile-blue-ink",
                    "bg-tile-lavender text-tile-lavender-ink",
                    "bg-tile-beige text-tile-beige-ink",
                    "bg-tile-cream text-tile-cream-ink",
                    "bg-tile-grey text-tile-grey-ink",
                  ];
                  return (
                    <span
                      key={p}
                      className={`rounded-full px-4 py-1.5 text-sm font-semibold ${tones[i % tones.length]}`}
                    >
                      {p}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Product mockup */}
          <div className="relative">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-tile-pink blur-2xl opacity-70" />
            <div className="absolute -right-8 top-32 h-48 w-48 rounded-full bg-tile-blue blur-3xl opacity-70" />
            <div className="absolute -bottom-8 left-10 h-40 w-40 rounded-full bg-tile-lavender blur-2xl opacity-60" />

            <ProductMockup />
          </div>
        </div>
      </section>

      {/* Logos / Stats */}
      <section className="border-y border-border bg-card/50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-10 text-center md:grid-cols-4">
          {[
            ["12k+", "Teams onboarded"],
            ["3.4M", "Posts generated"],
            ["88%", "Faster campaigns"],
            ["4.9/5", "Customer rating"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="text-3xl font-extrabold tracking-tight">{n}</div>
              <div className="mt-1 text-sm text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section id="tools" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">The toolkit</p>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Every marketing task, in one calm workspace.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tiles you actually want to open. Soft colors, sharp results.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className={`tile-hover rounded-3xl p-6 ${f.bg} ${f.ink}`}
            >
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 text-current shadow-soft">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed opacity-80">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow band */}
      <section id="workflow" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[2rem] bg-foreground px-8 py-16 text-background sm:px-14">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">Responsible AI</p>
              <h2 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
                AI works best <span className="text-primary">with you</span>.
              </h2>
              <p className="mt-4 max-w-lg text-background/70">
                Review, edit, and verify AI-generated content before using it. MarketMate gives
                you the speed of automation with the judgment of your team.
              </p>
              <Link
                to="/dashboard"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
              >
                Try the workspace <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="space-y-4">
              {[
                "Generate first drafts in seconds, not hours",
                "Centralize captions, hashtags, briefs and reports",
                "Stay in control with human-in-the-loop review",
                "Ship campaigns on time with built-in planning",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 rounded-2xl bg-white/5 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium text-background/90">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
          <Logo />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MarketMate AI. Your marketing workflow, powered by AI.
          </p>
        </div>
      </footer>
    </div>
  );
}

const features = [
  { title: "Caption Generator", desc: "On-brand captions for every platform in seconds.", icon: MessageSquare, bg: "bg-tile-pink", ink: "text-tile-pink-ink" },
  { title: "Hashtag Generator", desc: "Smart, niche-aware tags that actually reach people.", icon: Hash, bg: "bg-tile-blue", ink: "text-tile-blue-ink" },
  { title: "Email Generator", desc: "Pro outreach and follow-ups, drafted instantly.", icon: Mail, bg: "bg-tile-lavender", ink: "text-tile-lavender-ink" },
  { title: "Content Calendar", desc: "Plan a month of posts in a single afternoon.", icon: Calendar, bg: "bg-tile-beige", ink: "text-tile-beige-ink" },
  { title: "Content Ideas", desc: "Endless ideas tuned to your audience and goals.", icon: Lightbulb, bg: "bg-tile-cream", ink: "text-tile-cream-ink" },
  { title: "Analytics Overview", desc: "See what's working at a glance, every week.", icon: BarChart3, bg: "bg-tile-grey", ink: "text-tile-grey-ink" },
];

function ProductMockup() {
  return (
    <div className="relative mx-auto w-full max-w-xl rounded-[2rem] border border-border bg-card p-3 shadow-[0_30px_80px_-30px_oklch(0.2_0.05_20_/_0.25)]">
      <div className="overflow-hidden rounded-[1.6rem] bg-background">
        {/* mini topbar */}
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
            <div className="h-2.5 w-2.5 rounded-full bg-tile-beige" />
            <div className="h-2.5 w-2.5 rounded-full bg-tile-blue" />
          </div>
          <div className="rounded-full bg-muted px-3 py-1 text-[10px] font-semibold text-muted-foreground">marketmate.app/dashboard</div>
          <div className="h-6 w-6 rounded-full bg-tile-lavender" />
        </div>

        <div className="grid grid-cols-[110px_1fr] gap-3 p-4">
          {/* mini sidebar */}
          <div className="space-y-1.5 rounded-2xl bg-muted/60 p-2">
            {["Dashboard", "Content", "Strategy", "AI", "Calendar"].map((s, i) => (
              <div
                key={s}
                className={`flex items-center gap-2 rounded-xl px-2 py-1.5 text-[11px] font-semibold ${
                  i === 0 ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"
                }`}
              >
                <div className="h-2 w-2 rounded-full bg-primary/70" />
                {s}
              </div>
            ))}
          </div>

          {/* mini tiles */}
          <div className="grid grid-cols-2 gap-2.5">
            <MiniTile color="bg-tile-pink" ink="text-tile-pink-ink" label="Caption Generator" lines={2} />
            <MiniTile color="bg-tile-blue" ink="text-tile-blue-ink" label="Hashtag Generator" lines={3} />
            <MiniTile color="bg-tile-lavender" ink="text-tile-lavender-ink" label="AI Assistant" lines={2} />
            <MiniTile color="bg-tile-beige" ink="text-tile-beige-ink" label="Calendar" lines={3} />
            <MiniTile color="bg-tile-cream" ink="text-tile-cream-ink" label="Content Ideas" lines={2} />
            <MiniTile color="bg-tile-grey" ink="text-tile-grey-ink" label="Analytics" lines={3} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniTile({ color, ink, label, lines }: { color: string; ink: string; label: string; lines: number }) {
  return (
    <div className={`rounded-2xl p-3 ${color} ${ink}`}>
      <div className="h-5 w-5 rounded-lg bg-white/70" />
      <div className="mt-3 text-[11px] font-bold leading-tight">{label}</div>
      <div className="mt-2 space-y-1">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-1 rounded-full bg-current opacity-20" style={{ width: `${80 - i * 18}%` }} />
        ))}
      </div>
    </div>
  );
}
