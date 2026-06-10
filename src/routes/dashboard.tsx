import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { TOOLS, STATIC_TOOLS, allToolCards } from "@/lib/tools-config";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — MarketMate AI" },
      { name: "description", content: "Your AI marketing workspace." },
    ],
  }),
  component: Dashboard,
});

const palette = [
  "bg-tile-pink text-tile-pink-ink",
  "bg-tile-blue text-tile-blue-ink",
  "bg-tile-lavender text-tile-lavender-ink",
  "bg-tile-beige text-tile-beige-ink",
  "bg-tile-grey text-tile-grey-ink",
  "bg-tile-cream text-tile-cream-ink",
];

function Dashboard() {
  return (
    <AppShell>
      <div className="space-y-12">
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
                <span key={p} className={`rounded-full px-3 py-1 text-xs font-semibold ${palette[i % palette.length]}`}>{p}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[["12", "Posts scheduled"], ["3", "In review"], ["87%", "Goal hit"]].map(([n, l]) => (
              <div key={l} className="rounded-2xl bg-white/70 p-4">
                <div className="text-2xl font-extrabold">{n}</div>
                <div className="mt-1 text-[11px] font-semibold opacity-70">{l}</div>
              </div>
            ))}
          </div>
        </section>

        <Section title="Productivity Tools" subtitle="Move faster on the work that matters." cards={allToolCards().filter(c => c.category === "productivity")} />
        <Section title="Content Tools" subtitle="From caption to calendar in one flow." cards={allToolCards().filter(c => c.category === "content")} />
        <Section title="Strategy Tools" subtitle="See the bigger picture and act on it." cards={allToolCards().filter(c => c.category === "strategy")} />
      </div>
    </AppShell>
  );
}

type Card = { slug: string; name: string; desc: string; icon: typeof TOOLS[number]["icon"]; tone: string };

function Section({ title, subtitle, cards }: { title: string; subtitle: string; cards: Card[] }) {
  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map((tool) => (
          <Link
            key={tool.slug}
            to="/tools/$slug"
            params={{ slug: tool.slug }}
            className={`tile-hover group flex h-full flex-col items-start rounded-3xl p-5 text-left ${tool.tone}`}
          >
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 shadow-soft">
              <tool.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-base font-bold leading-tight">{tool.name}</h3>
            <p className="mt-1.5 text-xs leading-relaxed opacity-80">{tool.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold opacity-0 transition group-hover:opacity-100">Open →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
