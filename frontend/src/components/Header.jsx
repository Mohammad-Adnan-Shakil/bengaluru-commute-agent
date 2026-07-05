export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-center gap-3 py-3 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/50">
      <div className="group relative">
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none" className="shrink-0 transition-transform duration-300 group-hover:scale-110">
          <circle cx="24" cy="24" r="3" fill="#f59e0b" />
          <path d="M18 24L22 20L26 24" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M30 24L26 28L22 24" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4" />
          <circle cx="24" cy="24" r="18" stroke="#f59e0b" strokeWidth="1.5" opacity="0.15" />
        </svg>
      </div>
      <div className="flex flex-col items-start">
        <h1 className="text-base font-semibold tracking-tight text-neutral-100 leading-tight">
          Bengaluru Commute Agent
        </h1>
        <span className="text-[10px] text-neutral-600 font-normal leading-tight">
          Powered by Gemini AI
        </span>
      </div>
    </header>
  );
}
