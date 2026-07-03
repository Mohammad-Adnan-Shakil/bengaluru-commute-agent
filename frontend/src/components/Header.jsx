export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-center gap-3 pt-6 pb-2 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/50">
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" className="shrink-0">
        <circle cx="24" cy="24" r="3" fill="#f59e0b" />
        <path d="M18 24L22 20L26 24" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M30 24L26 28L22 24" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4" />
        <circle cx="24" cy="24" r="18" stroke="#f59e0b" strokeWidth="1.5" opacity="0.15" />
      </svg>
      <h1 className="text-lg font-semibold tracking-tight text-neutral-100">
        Bengaluru Commute Agent
      </h1>
      <span className="flex items-center gap-1.5 ml-2 text-[11px] font-medium text-neutral-500">
        <span className="relative inline-flex h-2 w-2">
          <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-green-500" />
        </span>
        Agent ready
      </span>
    </header>
  );
}
