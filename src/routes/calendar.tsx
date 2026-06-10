import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/calendar")({ component: CalendarPage });

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const year = date.getFullYear();
  const month = date.getMonth();
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: first }, () => null).concat(
    Array.from({ length: days }, (_, i) => i + 1) as (number | null)[],
  );
  const events: Record<number, string[]> = { 5: ["IG Reel"], 12: ["Email blast"], 18: ["Launch"], 24: ["Webinar"] };
  const monthName = date.toLocaleString("en", { month: "long" });
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight">{monthName} {year}</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => setDate(new Date(year, month - 1, 1))} className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card"><ChevronLeft className="h-4 w-4" /></button>
            <button onClick={() => setDate(new Date(year, month + 1, 1))} className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 rounded-3xl border border-border bg-card p-4 shadow-soft">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
            <div key={d} className="py-2 text-center text-xs font-bold text-muted-foreground">{d}</div>
          ))}
          {cells.map((d, i) => (
            <div key={i} className={`min-h-24 rounded-2xl border border-border p-2 text-xs ${d ? "bg-background" : "bg-transparent border-transparent"}`}>
              {d && <div className="font-bold">{d}</div>}
              {d && events[d]?.map(e => (
                <div key={e} className="mt-1 rounded-md bg-tile-pink px-1.5 py-0.5 text-tile-pink-ink">{e}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
