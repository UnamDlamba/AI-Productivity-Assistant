import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { AppShell } from "@/components/AppShell";
import { Send, Sparkles, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/assistant")({
  head: () => ({ meta: [{ title: "AI Assistant — MarketMate AI" }] }),
  component: AssistantPage,
});

function AssistantPage() {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (e) => toast.error(e.message || "Chat error"),
  });

  const loading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { if (!loading) inputRef.current?.focus(); }, [loading]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    await sendMessage({ text });
  }

  return (
    <AppShell>
      <div className="mx-auto flex h-[calc(100vh-7rem)] max-w-4xl flex-col">
        <header className="mb-4 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-tile-lavender text-tile-lavender-ink">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">AI Assistant</h1>
            <p className="text-sm text-muted-foreground">Your always-on marketing copilot.</p>
          </div>
        </header>

        <div
          ref={scrollRef}
          className="flex-1 space-y-4 overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-soft"
        >
          {messages.length === 0 && (
            <div className="grid h-full place-items-center text-center">
              <div>
                <p className="text-sm font-semibold">Ask anything marketing.</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Try: "Write a launch plan for a new coffee subscription."
                </p>
              </div>
            </div>
          )}
          {messages.map((m: UIMessage) => (
            <Message key={m.id} role={m.role}>
              {m.parts.map((p, i) => (p.type === "text" ? <span key={i}>{p.text}</span> : null))}
            </Message>
          ))}
          {loading && messages[messages.length - 1]?.role !== "assistant" && (
            <Message role="assistant">
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
              </span>
            </Message>
          )}
        </div>

        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" />
          AI-generated content may contain inaccuracies. Review before use.
        </p>

        <form onSubmit={onSubmit} className="mt-3 flex items-end gap-2 rounded-3xl border border-border bg-card p-3 shadow-soft">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSubmit(e);
              }
            }}
            placeholder="Message MarketMate…"
            rows={1}
            className="min-h-[44px] flex-1 resize-none rounded-2xl bg-background px-4 py-3 text-sm outline-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft transition disabled:opacity-50"
            aria-label="Send"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </form>
      </div>
    </AppShell>
  );
}

function Message({ role, children }: { role: string; children: React.ReactNode }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
