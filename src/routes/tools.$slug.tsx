import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ToolPage } from "@/components/ToolPage";

export const Route = createFileRoute("/tools/$slug")({
  component: ToolRoute,
});

function ToolRoute() {
  const { slug } = Route.useParams();
  if (slug === "analytics-overview") return <AppShell><AnalyticsOverview /></AppShell>;
  if (slug === "resource-library") return <AppShell><ResourceLibrary /></AppShell>;
  return (
    <AppShell>
      <ToolPage slug={slug} />
    </AppShell>
  );
}

function AnalyticsOverview() {
  const stats = [
    { label: "Total Reach", value: "248.3K", delta: "+12.4%" },
    { label: "Engagement", value: "5.8%", delta: "+0.6%" },
    { label: "Followers", value: "18.2K", delta: "+342" },
    { label: "Conversions", value: "1,204", delta: "+18%" },
  ];
  const channels = [
    { name: "Instagram", value: 82 },
    { name: "LinkedIn", value: 64 },
    { name: "TikTok", value: 71 },
    { name: "X (Twitter)", value: 38 },
    { name: "Email", value: 53 },
  ];
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">Analytics Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">A snapshot of how your marketing is performing.</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className="mt-2 text-2xl font-extrabold">{s.value}</p>
            <p className="mt-1 text-xs font-bold text-primary">{s.delta}</p>
          </div>
        ))}
      </div>
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h2 className="text-lg font-bold">Performance by Channel</h2>
        <div className="mt-4 space-y-3">
          {channels.map((c) => (
            <div key={c.name}>
              <div className="flex justify-between text-sm font-semibold"><span>{c.name}</span><span>{c.value}%</span></div>
              <div className="mt-1 h-2 w-full rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${c.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResourceLibrary() {
  const items = [
    { title: "Brand Voice Template", type: "Template", desc: "Document your tone, words to avoid, and examples." },
    { title: "Campaign Brief", type: "Template", desc: "One-page brief covering goal, audience, KPIs, deliverables." },
    { title: "Content Calendar (Monthly)", type: "Spreadsheet", desc: "A ready-to-use planner across all channels." },
    { title: "Social Post Checklist", type: "Checklist", desc: "Pre-publish QA: copy, visuals, links, alt text." },
    { title: "Quarterly Marketing Plan", type: "Template", desc: "Themes, launches, owners, and budget." },
    { title: "Influencer Outreach Email", type: "Email", desc: "Cold and warm outreach scripts that get replies." },
  ];
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">Resource Library</h1>
        <p className="mt-1 text-sm text-muted-foreground">Templates, briefs and brand assets to move faster.</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div key={it.title} className="tile-hover rounded-3xl border border-border bg-card p-5 shadow-soft">
            <span className="rounded-full bg-tile-blue px-2.5 py-1 text-[10px] font-bold uppercase text-tile-blue-ink">{it.type}</span>
            <h3 className="mt-3 text-base font-bold">{it.title}</h3>
            <p className="mt-1.5 text-xs text-muted-foreground">{it.desc}</p>
            <button className="mt-4 text-xs font-bold text-primary">Open →</button>
          </div>
        ))}
      </div>
    </div>
  );
}
