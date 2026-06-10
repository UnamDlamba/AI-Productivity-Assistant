import { Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { allToolCards } from "@/lib/tools-config";

export function CategoryPage({
  category,
  title,
  subtitle,
}: {
  category: "productivity" | "content" | "strategy";
  title: string;
  subtitle: string;
}) {
  const cards = allToolCards().filter((c) => c.category === category);
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-8">
        <header>
          <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((tool) => (
            <Link
              key={tool.slug}
              to="/tools/$slug"
              params={{ slug: tool.slug }}
              className={`tile-hover group flex h-full flex-col items-start rounded-3xl p-6 text-left ${tool.tone}`}
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/70 shadow-soft">
                <tool.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{tool.name}</h3>
              <p className="mt-1.5 text-sm opacity-80">{tool.desc}</p>
              <span className="mt-5 text-xs font-bold opacity-70 group-hover:opacity-100">Open →</span>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
