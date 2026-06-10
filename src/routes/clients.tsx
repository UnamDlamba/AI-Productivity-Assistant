import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/clients")({ component: ClientsPage });

type Client = { id: string; name: string; industry: string; email: string };

function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([
    { id: "1", name: "Aero Coffee", industry: "F&B", email: "hello@aero.co" },
    { id: "2", name: "Northstar SaaS", industry: "Tech", email: "team@northstar.io" },
    { id: "3", name: "Bloom Beauty", industry: "Beauty", email: "press@bloom.com" },
  ]);
  const [form, setForm] = useState({ name: "", industry: "", email: "" });

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setClients(c => [...c, { id: crypto.randomUUID(), ...form }]);
    setForm({ name: "", industry: "", email: "" });
    toast.success("Client added");
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-6">
        <header><h1 className="text-3xl font-extrabold tracking-tight">Clients</h1></header>
        <form onSubmit={add} className="grid gap-2 rounded-3xl border border-border bg-card p-3 shadow-soft sm:grid-cols-[1fr_1fr_1fr_auto]">
          <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" className="rounded-2xl bg-background px-3 py-2 text-sm outline-none"/>
          <input value={form.industry} onChange={e=>setForm({...form, industry:e.target.value})} placeholder="Industry" className="rounded-2xl bg-background px-3 py-2 text-sm outline-none"/>
          <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" className="rounded-2xl bg-background px-3 py-2 text-sm outline-none"/>
          <button className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"><Plus className="h-4 w-4"/>Add</button>
        </form>
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Industry</th><th className="px-4 py-3">Email</th></tr>
            </thead>
            <tbody>
              {clients.map(c => (
                <tr key={c.id} className="border-t border-border"><td className="px-4 py-3 font-semibold">{c.name}</td><td className="px-4 py-3">{c.industry}</td><td className="px-4 py-3">{c.email}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
