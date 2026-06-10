import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { generateContent } from "@/lib/ai.functions";
import { getTool } from "@/lib/tools-config";
import { Copy, Check, Loader2, Sparkles, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export function ToolPage({ slug }: { slug: string }) {
  const tool = getTool(slug);
  const generate = useServerFn(generateContent);

  const [values, setValues] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!tool) {
    return (
      <div className="rounded-3xl bg-tile-cream p-8 text-tile-cream-ink">
        <h1 className="text-2xl font-bold">Tool not found</h1>
        <p className="mt-2 text-sm opacity-80">The tool "{slug}" does not exist.</p>
      </div>
    );
  }

  const set = (n: string, v: string) => setValues((p) => ({ ...p, [n]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!tool) return;
    for (const f of tool.fields) {
      if (f.required && !values[f.name]?.trim()) {
        toast.error(`${f.label} is required`);
        return;
      }
    }
    setLoading(true);
    setError(null);
    setOutput("");
    try {
      const result = await generate({
        data: { system: tool.system, prompt: tool.buildPrompt(values) },
      });
      setOutput(result.text);
      toast.success("Generated successfully");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Generation failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  async function onCopy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  }

  const Icon = tool.icon;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header className="flex items-start gap-4">
        <div className={`grid h-14 w-14 place-items-center rounded-2xl ${tool.tone}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">{tool.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{tool.desc}</p>
        </div>
      </header>

      <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {tool.fields.map((f) => (
            <div key={f.name} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
              <label className="mb-1.5 block text-sm font-semibold">
                {f.label} {f.required && <span className="text-primary">*</span>}
              </label>
              {f.type === "textarea" ? (
                <textarea
                  value={values[f.name] ?? ""}
                  onChange={(e) => set(f.name, e.target.value)}
                  placeholder={f.placeholder}
                  rows={5}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                />
              ) : f.type === "select" ? (
                <select
                  value={values[f.name] ?? ""}
                  onChange={(e) => set(f.name, e.target.value)}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                >
                  <option value="">Select…</option>
                  {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input
                  value={values[f.name] ?? ""}
                  onChange={(e) => set(f.name, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <AlertTriangle className="h-3.5 w-3.5" /> Review AI output before using it.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-soft transition disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? "Generating…" : "Generate"}
          </button>
        </div>
      </form>

      {error && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {(output || loading) && (
        <section className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold">Output</h2>
            <button
              type="button"
              onClick={onCopy}
              disabled={!output}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:bg-muted disabled:opacity-50"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          {loading && !output ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Thinking…
            </div>
          ) : (
            <textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              rows={Math.max(10, output.split("\n").length + 1)}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 font-mono text-sm leading-relaxed outline-none focus:border-primary"
            />
          )}
        </section>
      )}
    </div>
  );
}
