import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { Plus, FolderKanban } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/projects")({ component: ProjectsPage });

type Project = { id: string; name: string; status: "Active" | "In Review" | "Done"; due: string };

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    { id: "1", name: "Q4 Holiday Campaign", status: "Active", due: "Dec 12" },
    { id: "2", name: "Brand Refresh", status: "In Review", due: "Nov 28" },
    { id: "3", name: "Newsletter Relaunch", status: "Done", due: "Nov 02" },
  ]);
  const [name, setName] = useState("");

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setProjects((p) => [...p, { id: crypto.randomUUID(), name, status: "Active", due: "—" }]);
    setName("");
    toast.success("Project created");
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-6">
        <header><h1 className="text-3xl font-extrabold tracking-tight">Projects</h1></header>
        <form onSubmit={add} className="flex gap-2 rounded-3xl border border-border bg-card p-3 shadow-soft">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="New project name…" className="flex-1 rounded-2xl bg-background px-4 py-2.5 text-sm outline-none" />
          <button className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"><Plus className="h-4 w-4"/>Add</button>
        </form>
        <div className="space-y-2">
          {projects.map(p => (
            <div key={p.id} className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-tile-blue text-tile-blue-ink"><FolderKanban className="h-4 w-4"/></div>
                <div><p className="font-bold">{p.name}</p><p className="text-xs text-muted-foreground">Due {p.due}</p></div>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${p.status === "Active" ? "bg-tile-pink text-tile-pink-ink" : p.status === "In Review" ? "bg-tile-beige text-tile-beige-ink" : "bg-tile-grey text-tile-grey-ink"}`}>{p.status}</span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
