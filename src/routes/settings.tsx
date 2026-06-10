import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  const [profile, setProfile] = useState({ name: "Maya M.", email: "maya@marketmate.ai", brand: "MarketMate AI" });
  const [prefs, setPrefs] = useState({ notifications: true, weeklyDigest: true });

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl space-y-8">
        <header><h1 className="text-3xl font-extrabold tracking-tight">Settings</h1></header>

        <form onSubmit={(e) => { e.preventDefault(); toast.success("Profile saved"); }} className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-lg font-bold">Profile</h2>
          {(["name", "email", "brand"] as const).map((k) => (
            <div key={k}>
              <label className="mb-1.5 block text-sm font-semibold capitalize">{k}</label>
              <input value={profile[k]} onChange={e=>setProfile({...profile, [k]: e.target.value})} className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"/>
            </div>
          ))}
          <button className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground">Save changes</button>
        </form>

        <div className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-lg font-bold">Preferences</h2>
          {([["notifications", "Email notifications"], ["weeklyDigest", "Weekly performance digest"]] as const).map(([k, label]) => (
            <label key={k} className="flex items-center justify-between">
              <span className="text-sm font-semibold">{label}</span>
              <input type="checkbox" checked={prefs[k]} onChange={e=>setPrefs({...prefs, [k]: e.target.checked})} className="h-5 w-5 rounded accent-primary"/>
            </label>
          ))}
        </div>

        <div className="rounded-3xl bg-tile-cream p-6 text-tile-cream-ink">
          <h3 className="font-bold">Responsible AI</h3>
          <p className="mt-1 text-sm opacity-80">AI-generated content may contain inaccuracies. Users should review and verify outputs before use.</p>
        </div>
      </div>
    </AppShell>
  );
}
