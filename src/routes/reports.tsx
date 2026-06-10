import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/reports")({ component: ReportsPage });

function ReportsPage() {
  const reports = [
    { name: "Monthly Performance Report", desc: "Reach, engagement, and conversions by channel.", date: "Nov 2026" },
    { name: "Campaign ROI Report", desc: "ROAS and revenue attribution per campaign.", date: "Q3 2026" },
    { name: "Audience Insights", desc: "Demographics, locations, and content affinity.", date: "Oct 2026" },
  ];
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Reports</h1>
            <p className="text-sm text-muted-foreground">Performance snapshots and historical reports.</p>
          </div>
          <Link to="/tools/$slug" params={{ slug: "analytics-overview" }} className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">View live analytics</Link>
        </header>
        <div className="grid gap-3">
          {reports.map(r => (
            <div key={r.name} className="flex items-center justify-between rounded-3xl border border-border bg-card p-5 shadow-soft">
              <div>
                <p className="font-bold">{r.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{r.desc}</p>
              </div>
              <span className="text-xs font-bold text-muted-foreground">{r.date}</span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
