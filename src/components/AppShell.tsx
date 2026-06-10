import { Link, useRouterState } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import {
  LayoutGrid, Zap, PenLine, Target, Sparkles, Calendar, FolderKanban,
  Users, BarChart3, Settings, Bell, Search, ShieldCheck, Plus,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

const nav: { label: string; icon: LucideIcon; to: string }[] = [
  { label: "Dashboard", icon: LayoutGrid, to: "/dashboard" },
  { label: "Productivity Tools", icon: Zap, to: "/productivity" },
  { label: "Content Tools", icon: PenLine, to: "/content" },
  { label: "Strategy Tools", icon: Target, to: "/strategy" },
  { label: "AI Assistant", icon: Sparkles, to: "/assistant" },
  { label: "Calendar", icon: Calendar, to: "/calendar" },
  { label: "Projects", icon: FolderKanban, to: "/projects" },
  { label: "Clients", icon: Users, to: "/clients" },
  { label: "Reports", icon: BarChart3, to: "/reports" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-5 lg:flex">
        <Link to="/" className="mb-8">
          <Logo />
        </Link>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          {nav.map((item) => {
            const isActive =
              item.to === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 rounded-2xl bg-tile-cream p-4 text-tile-cream-ink">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-white/70">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <p className="text-sm font-bold">AI works best with you.</p>
          </div>
          <p className="mt-2 text-xs leading-relaxed opacity-80">
            AI-generated content may contain inaccuracies. Review and verify outputs before use.
          </p>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
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
            <Link
              to="/projects"
              className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft sm:inline-flex"
            >
              <Plus className="h-4 w-4" /> New project
            </Link>
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

        <div className="px-5 py-8 sm:px-8 sm:py-10">{children}</div>
      </main>
    </div>
  );
}
