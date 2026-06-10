export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="grid h-9 w-9 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 18V8l4 6 4-10 4 10 4-6v10" />
        </svg>
      </div>
      <span className="text-lg font-extrabold tracking-tight">
        MarketMate<span className="text-primary">.</span>
      </span>
    </div>
  );
}
