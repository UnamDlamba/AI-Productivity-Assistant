import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import {
  LayoutGrid,
  Zap,
  PenLine,
  Target,
  Sparkles,
  Calendar,
  FolderKanban,
  Users,
  BarChart3,
  Settings,
  Search,
  Bell,
  Mail,
  ClipboardList,
  ListChecks,
  BookOpen,
  Hash,
  Lightbulb,
  Megaphone,
  TrendingUp,
  Send,
  Library,
  MessageSquare,
  ShieldCheck,
  Plus,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — MarketMate AI" },
      { name: "description", content: "Your AI marketing workspace: content, strategy, productivity and analytics in one place." },
    ],
  }),
  component: Dashboard,
});

const navItems = [
  { label: "Dashboard", icon: LayoutGrid },
  { label: "Productivity Tools", icon: Zap },
  { label: "Content Tools", icon: PenLine },
  { label: "Strategy Tools", icon: Target },
  { label: "AI Assistant", icon: Sparkles },
  { label: "Calendar", icon: Calendar },
  { label: "Projects", icon: FolderKanban },
  { label: "Clients", icon: Users },
  { label: "Reports", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

const palette = [
  "bg-tile-pink text-tile-pink-ink",
  "bg-tile-blue text-tile-blue-ink",
  "bg-tile-lavender text-tile-lavender-ink",
  "bg-tile-beige text-tile-beige-ink",
  "bg-tile-grey text-tile-grey-ink",
  "bg-tile-cream text-tile-cream-ink",
];

const productivity = [
  { name: "Email Generator", desc: "Draft polished emails in seconds.", icon: Mail },
  { name: "Meeting Summarizer", desc: "Turn calls into clear action items.", icon: ClipboardList },
  { name: "Task Planner", desc: "Plan your week with AI assistance.", icon: ListChecks },
  { name: "Research Assistant", desc: "Gather, cite and summarize sources.", icon: BookOpen },
  { name: "AI Assistant", desc: "Your always-on marketing copilot.", icon: Sparkles },
];

const content = [
  { name: "Caption Generator", desc: "On-brand captions for every platform.", icon: MessageSquare },
  { name: "Hashtag Generator", desc: "Reach the right audience faster.", icon: Hash },
  { name: "Content Ideas", desc: "Never stare at a blank page again.", icon: Lightbulb },
  { name: "Campaign Planner", desc: "Map launches from idea to ship.", icon: Megaphone },
  { name: "Content Calendar", desc: "See the whole month at a glance.", icon: Calendar },
];

const strategy = [
  { name: "Trend Analyzer", desc: "Spot what's rising before it peaks.", icon: TrendingUp },
  { name: "Client Outreach", desc: "Personalized prospecting that lands.", icon: Send },
  { name: "Project Manager", desc: "Keep every campaign on track.", icon: FolderKanban },
  { name: "Analytics Overview", desc: "Performance you can act on.", icon: BarChart3 },
  { name: "Resource Library", desc: "Templates, briefs and brand assets.", icon: Library },
];

function Dashboard() {
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-5 lg:flex">
        <Link to="/" className="mb-8">
          <Logo />
        </Link>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = item.label === active;
            return (
              <button
                key={item.label}
                onClick={() => setActive(item.label)}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <item.icon className="h-4.5 w-4.5 h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Responsible AI card */}
        <div className="mt-6 rounded-2xl bg-tile-cream p-4 text-tile-cream-ink">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-white/70">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <p className="text-sm font-bold">AI works best with you.</p>
          </div>
          <p className="mt-2 text-xs leading-relaxed opacity-80">
            Review, edit and verify AI-generated content before using it.
          </p>
        </div>
      </aside>

      {/* Main */}
      <main className="min-w-0 flex-1">
        {/* Topbar */}
        <header className="sticky top-0 z-10 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border bg-background/80 px-5 py-4 backdrop-blur sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="lg:hidden">
              <Logo />
            </div>
            <div className="relative hidden min-w-0 max-w-md flex-1 lg:block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search tools, campaigns, clients…"
                className="w-full rounded-full border border-border bg-card py-2.5 pl-11 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft sm:inline-flex">
              <Plus className="h-4 w-4" /> New project
            </button>
            <button className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary" />
            </button>
            <div className="flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-tile-lavender text-tile-lavender-ink text-xs font-bold">MM</div>
              <span className="hidden text-sm font-semibold sm:inline">Maya M.</span>
            </div>
          </div>
        </header>

        <div className="space-y-12 px-5 py-8 sm:px-8 sm:py-10">
          {/* Hello banner */}
          <section className="grid items-end gap-6 rounded-3xl bg-tile-pink p-7 text-tile-pink-ink sm:p-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider opacity-70">Welcome back</p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Let's ship your <span className="text-primary">marketing</span> today.
              </h1>
              <p className="mt-3 max-w-xl text-sm opacity-80">
                You have 3 campaigns in review and 12 posts scheduled this week. Pick a tool to keep momentum.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Brands", "Agencies", "Teams", "Creators"].map((p, i) => (
                  <span key={p} className={`rounded-full px-3 py-1 text-xs font-semibold ${palette[i % palette.length]}`}>
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                ["12", "Posts scheduled"],
                ["3", "In review"],
                ["87%", "Goal hit"],
              ].map(([n, l]) => (
                <div key={l} className="rounded-2xl bg-white/70 p-4">
                  <div className="text-2xl font-extrabold">{n}</div>
                  <div className="mt-1 text-[11px] font-semibold opacity-70">{l}</div>
                </div>
              ))}
            </div>
          </section>

          <TileSection title="Productivity Tools" subtitle="Move faster on the work that matters." items={productivity} offset={0} />
          <TileSection title="Content Tools" subtitle="From caption to calendar in one flow." items={content} offset={2} />
          <TileSection title="Strategy Tools" subtitle="See the bigger picture and act on it." items={strategy} offset={4} />
        </div>
      </main>
    </div>
  );
}

function TileSection({
  title,
  subtitle,
  items,
  offset,
}: {
  title: string;
  subtitle: string;
  items: { name: string; desc: string; icon: React.ComponentType<{ className?: string }> }[];
  offset: number;
}) {
  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <button className="shrink-0 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted">
          View all
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {items.map((tool, i) => {
          const tone = palette[(i + offset) % palette.length];
          return (
            <button
              key={tool.name}
              className={`tile-hover group flex h-full flex-col items-start rounded-3xl p-5 text-left ${tone}`}
            >
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 shadow-soft">
                <tool.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-base font-bold leading-tight">{tool.name}</h3>
              <p className="mt-1.5 text-xs leading-relaxed opacity-80">{tool.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold opacity-0 transition group-hover:opacity-100">
                Open →
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
